// (Handles all tweet operations)
///app/api/tweets/route.js (DB API Route)
import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import Tweet from "@/models/Tweet";
import { verifyJwt } from "@/lib/useAuth";

// Helper to extract user from Authorization header
function getUserFromRequest(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.replace("Bearer ", "");
  return verifyJwt(token);
}

// GET: Fetch all tweets (public)
export async function GET() {
  await makeSureDbIsReady();
  try {
    const tweets = await Tweet.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ tweets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweets" }, 
      { status: 500 });
  }
}

// POST: Create a new tweet (authenticated)
export async function POST(req) {
  await makeSureDbIsReady();

  // Authenticate user
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { content } = body;
  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "Tweet content is required" }, { status: 400 });
  }

  try {
    const tweet = new Tweet({
      twitterUser: user.username,
      content: content.trim(),
    });
    await tweet.save();


    return NextResponse.json({ tweet }, { status: 201 });
  } catch (error) {
    console.log("Error creating tweet:", error);
    return NextResponse.json({ error: "Failed to create tweet" }, { status: 500 });
  }
}
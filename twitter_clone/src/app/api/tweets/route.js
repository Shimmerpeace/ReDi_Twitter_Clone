// (Handles all tweet operations)
///app/api/tweets/route.js (DB API Route)
import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import Tweet from "@/models/Tweet";
import { verifyJwt } from "@/lib/useAuth";

// Helper to extract user from Authorization header
function getUserFromRequest(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.replace("Bearer ", "");
  return verifyJwt(token);
}

// GET: Fetch all tweets (public)
export async function GET(req) {
  await makeSureDbIsReady();
  try {
    const tweets = await Tweet.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ tweets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json({ error: "Failed to fetch tweets" }, { status: 500 });
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
    console.error("Error creating tweet:", error);
    return NextResponse.json({ error: "Failed to create tweet" }, { status: 500 });
  }
}
/**
 * POST /api/tweets
 * Creates a new tweet
 
export async function POST(request) {
  try {
    await makeSureDbIsReady();
    const token = request.cookies.get("token")?.value;

    let username = "New User";
    if (token) {
      try {
        const { username: jwtUsername } = jwt.verify(
          token,
          process.env.JWT_SECRET
        );
        username = jwtUsername;
      } catch {}
    }
    const { twitterUser, content, likes, dislikes } = await request.json();
    // Basic validation
    if (!tweetContent) {
      return NextResponse.json(
        { success: false, error: "Tweet content is required" },
        { status: 400 }
      );
    }
    const newTweet = await Tweet.create({
      twitterUser: twitterUser || username,
      content,
      likes, 
      dislikes
    });
    // Return the new tweet and use 201 for resource creation
    return NextResponse.json(
      { success: true, data: newTweet.toObject() },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/tweets
// Fetches all tweets sorted by creation date (newest first)
export async function GET() {
  try {
    await makeSureDbIsReady();
    const tweets = await Tweet.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tweets }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
  */
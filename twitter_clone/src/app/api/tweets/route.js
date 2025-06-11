// (Handles all tweet operations)
///app/api/tweets/route.js (DB API Route)
import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import Tweet from "@/models/Tweet";
import jwt from "jsonwebtoken";

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
/**
 * POST /api/tweets
 * Creates a new tweet
 */
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
    const { twitterUser, tweetContent } = await request.json();
    // Basic validation
    if (!tweetContent) {
      return NextResponse.json(
        { success: false, error: "Tweet content is required" },
        { status: 400 }
      );
    }
    const newTweet = await Tweet.create({
      twitterUser: twitterUser || username,
      tweetContent,
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

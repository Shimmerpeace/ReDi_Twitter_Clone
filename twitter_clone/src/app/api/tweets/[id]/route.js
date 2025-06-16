// (Handles individual tweet requests)
//app/api/tweets/[id]/route.js (
  import { makeSureDbIsReady } from "@/lib/dataBase";
  import Tweet from "@/models/Tweet";
  import { NextResponse } from "next/server";
  import { verifyJwt } from "@/lib/useAuth";
  
  // Helper to extract user from Authorization header (reuse from main file)
  function getUserFromRequest(request) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    const token = authHeader.replace("Bearer ", "");
    return verifyJwt(token);
  }
  
  // GET: Fetch a single tweet by ID (public)
  export async function GET(request, { params }) {
    await makeSureDbIsReady();
    try {
      const tweet = await Tweet.findById(params.id).lean();
      if (!tweet) {
        return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
      }
      return NextResponse.json({ tweet }, { status: 200 });
    } catch (error) {
      console.error("Error fetching tweet:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
  // DELETE: Delete a tweet by ID (authenticated)
  export async function DELETE(request, { params }) {
    await makeSureDbIsReady();
  
    // Authenticate user
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const tweet = await Tweet.findById(params.id);
      if (!tweet) {
        return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
      }
  
      // Optional: Only allow the author to delete their tweet
      if (tweet.twitterUser !== user.username) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
  
      await tweet.deleteOne();
      return NextResponse.json({ message: "Tweet deleted" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting tweet:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
// (Handles individual tweet requests)
import { makeSureDbIsReady } from "@/lib/dataBase.js";
import Tweet from "@/models/Tweet";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await makeSureDbIsReady();
    const tweet = await Tweet.findById(params.id.lean()); // .lean() for plain JS object, optional
    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    return NextResponse.json(tweet, { status: 200 });
  } catch (error) {
    console.log("Error fetching tweet:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await makeSureDbIsReady();
    const {id} = await params;
    const deletedTweet = await Tweet.findByIdAndDelete(id);
    
    if (!deletedTweet) {
      return NextResponse.json(
        { error: "Tweet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedTweet, { status: 200 });
  } catch (error) {
    console.log("Error deleting tweet:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

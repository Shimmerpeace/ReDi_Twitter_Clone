import { makeSureDbIsReady } from "@/lib/db";
import User from "@/models/User";


export default async function handler(req, res) {
  await makeSureDbIsReady();
  const { username } = req.query;

  if (req.method === "GET") {
    const user = await User.findOne({ username }, "username name avatar bio");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } else {
    res.status(405).end();
  }
}









//import { NextResponse } from "next/server";

/*
// You'd normally get the user id from session/auth middleware
// For demo, let's assume a fixed user id or get from query

export async function GET(request) {
await makeSureDbIsReady();

  // Example: get user id from query or session
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id"); // fallback if you want to fetch by id

  try {
    let user;
    if (userId) {
      user = await User.findById(userId).select("-password");
    } else {
      // Replace with session user id in a real app
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
  */
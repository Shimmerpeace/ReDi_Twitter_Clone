'use client'
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'super-cool-secret';

export async function POST(request) {
  await makeSureDbIsReady;
  const { twitterUser, password, mode } = await request.json();
  if (!twitterUser || !password || !mode) {
    return new Response(
      JSON.stringify({ error: "Name, password and mode required" }),
      { status: 400 }
    );
  }

  if (mode === "signup") {
    const existing = await User.findOne({ twitterUser });
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
      });
    }
    const user = await User.create({ twitterUser, password });
    const token = jwt.sign({ twitterUser, id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return new Response(
      JSON.stringify({ token, user: { twitterUser, id: user._id } }),
      { status: 201 }
    );
  } else if (mode === "signin") {
    const user = await User.findOne({ twitterUser });
    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }
    const token = jwt.sign({ twitterUser, id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return new Response(
      JSON.stringify({ token, user: { twitterUser, id: user.id } }),
      { status: 200 }
    );
  } else {
    return new Response(JSON.stringify({ error: "Invalid mode" }), {
      status: 400,
    });
  }
}

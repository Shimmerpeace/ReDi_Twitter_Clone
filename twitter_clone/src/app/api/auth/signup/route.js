
// app/api/auth/signup/route.js (Next.js API Route/App Router Route)

import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import { hashPassword, signJwt } from "@/lib/useAuth";

export async function POST(request) {
  try {
    await makeSureDbIsReady();
    const body = await request.json();
    let { name, username, email, password } = body;

    // **1. Input Validation**
    // Here you would validate input and check for existing users
    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    email = email.trim().toLowerCase();
    username = username.trim();
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password too short" },
        { status: 400 }
      );
    }
 // **2. Check if user already exists**
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }
// **3. Hash password (for registration)** Hashes password manually with bcrypt before creating user.
    const hashedPassword = await hashPassword(password);
    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword, // Use "password" field for consistency
    });

 // **4. Generate a token
    const token = signJwt(user);

    // **5. Prepare response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        name: user.name,
      },
      token,
    });

      // **6. Set token as HttpOnly cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.log("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

// Optional: handle GET requests with 405
export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}


/*
// traditional API handler (e.g., pages/api/register.js)
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import { hashPassword } from "@/lib/useAuth"; // Use the correct import path

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await makeSureDbIsReady();

  try {
    let { name, username, email, password } = req.body;
    if (!name || !username || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    email = email.trim().toLowerCase();
    username = username.trim();

    if (password.length < 8)
      return res.status(400).json({ error: "Password too short" });

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword, // Use "password" field for consistency
    });

    res.status(201).json({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
}

*/

import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";

import { verifyPassword, signJwt } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await makeSureDbIsReady();

  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await verifyPassword(password, user.hashedPassword);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signJwt(user);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
}

/*
// app/api/auth/login/route.js
// jsonwebtoken for JWT
// bcryptjs for password hashing

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";


// Use only environment variable for JWT secret in production
const JWT_SECRET = process.env.JWT_SECRET || "super-cool-secret";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set.");
}
// JWT secret (in production, use an environment variable)


export async function POST(request) {
  try {
    await makeSureDbIsReady();
    const { email, password } = await request.json();

    if ( !email || !password ) {
      return NextResponse.json(
        { error: "Missing credentials." },
        { status: 400 }
      );
    }

    // Find user in the database
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "User not found!" },
        { status: 401 }
      );
    }

    // Validate password (implement your own comparePassword logic)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // const isPasswordValid = await verifyPassword(password, user.hashedPassword);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Generate a session/token here (JWT or similar)
    // Example: Issue a session or JWT token here
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // const token = await createSession(user);

    // Set HttpOnly cookie using Next.js cookies helper
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    // Return response
    return NextResponse.json({
      success: true,
      user: { id: user._id.toString(), email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Password Hashing: Never store plain passwords! Use bcrypt to hash and compare.

JWT: Used for stateless authentication. Store the token in an HttpOnly cookie for security.

Environment Variables: Store your JWT secret in .env.local (e.g., JWT_SECRET=your_super_secret).

Production Security: Always use HTTPS and secure cookies in production.
 */

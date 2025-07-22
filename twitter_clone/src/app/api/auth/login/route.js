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
    // const isPasswordValid = await verifyPassword(password, user.passwordHash);
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
    console.log("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



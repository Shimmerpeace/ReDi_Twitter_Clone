// app/api/auth/login/route.js (Next.js API Route)
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import { verifyPassword, signJwt } from "@/lib/useAuth";

export async function POST(request) {
  try {
    await makeSureDbIsReady();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    // Find user in the database
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Validate password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Generate a token
    const token = signJwt(user);

    // Set HttpOnly cookie using Next.js cookies helper
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return NextResponse.json({
     success: true,
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}


/*

// API Route (Express/Next.js API Route style)
// app/api/auth/login/route.js (traditional API handler e.g., pages/api/login.js)
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import { verifyPassword, signJwt } from "@/lib/useAuth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await makeSureDbIsReady();

  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing credentials." });
    }
    email = email.trim().toLowerCase();

    // Always select the hashed password field
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = signJwt(user);

    res.status(200).json({
      token,
      user: {
        id: user._id.toString(),
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
  

/**
 * Password Hashing: Never store plain passwords! Use bcrypt to hash and compare.

JWT: Used for stateless authentication. Store the token in an HttpOnly cookie for security.

Environment Variables: Store your JWT secret in .env.local (e.g., JWT_SECRET=your_super_secret).

Production Security: Always use HTTPS and secure cookies in production.
 */


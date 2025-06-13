
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await makeSureDbIsReady();

  const { username, email, password, name } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: "Missing fields" });

  const exists = await User.findOne({ $or: [{ username }, { email }] });
  if (exists) return res.status(409).json({ error: "User already exists" });

  const passwordHash = await hashPassword(password);
  const user = await User.create({ username, email, passwordHash, name });
  res.status(201).json({ id: user._id, username: user.username, name: user.name });
}
/*
// app/api/auth/register/route.js
// jsonwebtoken for JWT
// bcryptjs for password hashing
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";

// JWT secret (in production, use an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "super-cool-secret";

export async function POST(request) {
  try {
    await makeSureDbIsReady();
    const body = await request.json();
    const { name, username, email, password } = body;
    // **1. Input Validation**
    // Here you would validate input and check for existing users
    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }
    // **2. Check if user already exists**
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use!" },
        { status: 409 } // Conflict
      );
    }

    // **3. Hash password (for registration)** Hashes password manually with bcrypt before creating user.
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    // Note: The model also hashes password in the pre("save") hook, so password may be double-hashed!

    // **4. Generate a session/token here (JWT or similar)
    // Example: Issue a session or JWT token here
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

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
*/
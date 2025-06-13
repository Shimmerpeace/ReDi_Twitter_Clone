// app/api/user/profile/route.js
import { NextResponse } from 'next/server';
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import { hashPassword, verifyJwt } from "@/lib/auth";

// Helper validation functions
function isValidUsername(username) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}
function isValidEmail(email) {
  // Simple regex, consider using a library for stricter validation
  return /^[^@]+@[^@]+\.[^@]+$/.test(email);
}
function isValidPassword(password) {
  return typeof password === "string" && password.length >= 8;
}

// POST /api/user/profile
export async function POST(request) {
  await makeSureDbIsReady();
  const { username, name, email, password } = await request.json();

  // Field presence check
  if (!username || !name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // Field validation
  if (!isValidUsername(username)) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!isValidPassword(password)) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  // Check for existing user
  const existing = await User.findOne({ $or: [{ username }, { email }] });
  if (existing) {
    return NextResponse.json({ error: "User exists" }, { status:409 });
  }

  // Create user
  const hashed = await hashPassword(password);
  const user = await User.create({
    username,
    name,
    email,
    password: hashed,
  });

  return NextResponse.json(
    { id: user._id, username: user.username, name: user.name },
    { status: 201 }
  );
}

// GET /api/user/profile
export async function GET(request) {
  await makeSureDbIsReady();

  // Auth check
  const authToken = request.cookies.get("token")?.value || null;
  const jwtPayload = verifyJwt(authToken);
  if (!authToken || !jwtPayload) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing auth token" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const username = searchParams.get("username");
    const email = searchParams.get("email");

    // Build query object for flexibility
    const query = {};
    if (userId) query._id = userId;
    if (username) query.username = username;
    if (email) query.email = email;

    // Fetch user(s)
    let result;
    if (userId || username || email) {
      // Single user
      const user = await User.findOne(query)
        .select("username name bio image followers following")
        .lean();
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      result = user;
    } else {
      // All users (limit for safety)
      const users = await User.find({})
        .select("username name bio image followers following")
        .limit(50)
        .lean();
      result = users;
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("GET /api/user/profile error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch users",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/*
import { NextResponse } from "next/server";



export async function GET(request) {

  // Check for auth token in cookies
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json(
      { error: "Unauthorized: No auth token provided" },
      { status: 401 }
    );
  }

  try {
    // Fetch user profile from external API
    const res = await fetch("https://dummyjson.com/users/1");
    if (!res.ok) {
      // Handle non-200 responses from the external API
      throw new Error(`Failed to fetch user data: ${res.statusText}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // Handle fetch or parsing errors
    return NextResponse.json(
      { error: "Failed to retrieve user profile", details: error.message },
      { status: 500 }
    );
  }
}
  */


/**
 import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/models/User";

// You'd normally get the user id from session/auth middleware
// For demo, let's assume a fixed user id or get from query

export async function GET(request) {
  await connectToDatabase();

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
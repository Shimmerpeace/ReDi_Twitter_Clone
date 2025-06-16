// app/api/user/profile/route.js
import { NextResponse } from 'next/server';
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import { hashPassword, verifyJwt } from "@/lib/useAuth";

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
      // Wrap in array for consistency
  return NextResponse.json({ users: [user] }, { status: 200 });
    } else {
      // All users (limit for safety)
      const users = await User.find({})
        .select("username name bio image followers following")
        .limit(50)
        .lean();
        return NextResponse.json({ users }, { status: 200 });
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


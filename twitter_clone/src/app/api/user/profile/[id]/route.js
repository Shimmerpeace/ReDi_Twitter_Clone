// app/api/user/profile/[id]/route.js

import { NextResponse } from 'next/server';
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import { verifyJwt } from "@/lib/useAuth";

export async function GET(request, { params }) {
  await makeSureDbIsReady();

  // Auth check (same as in /route.js)
  const authToken = request.cookies.get("token")?.value || null;
  const jwtPayload = verifyJwt(authToken);
  if (!authToken || !jwtPayload) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing auth token" },
      { status: 401 }
    );
  }

  try {
    const user = await User.findById(params.id)
      .select("username name bio image followers following") // same fields
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Wrap user in array to match /route.js response shape
    return NextResponse.json({ users: [user] }, { status: 200 });
  } catch (error) {
    console.error("GET /api/user/profile/[id] error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
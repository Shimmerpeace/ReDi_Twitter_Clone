// app/api/user/profile/[id]/route.js

import { NextResponse } from 'next/server';
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";

export async function GET(request, { params }) {
  await makeSureDbIsReady();
  const user = await User.findById(params.id)
    .select("username name bio image followers following") // Exclude sensitive fields
    .lean();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}

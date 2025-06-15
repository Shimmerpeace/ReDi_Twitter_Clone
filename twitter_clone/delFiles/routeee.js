import { makeSureDbIsReady } from "@/lib/dataBase";
import { NextResponse } from "next/server";
import User from "@/models/User";


export async function POST(request) {
  await makeSureDbIsReady();
  const body = await request.json();
  const { name, username, email, password } = body;
  const user = await User.create({ name, username, email, password });
  return NextResponse.json({ id: user._id, email: user.email });
}

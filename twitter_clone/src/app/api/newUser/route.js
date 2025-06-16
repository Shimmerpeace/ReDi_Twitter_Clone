import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";

export async function GET(request) {
  // Check for auth token in cookies
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await makeSureDbIsReady();
    // Use Mongoose model to find user
    // Find user by auth token (adjust query as needed)
    const user = await User.findOne({ authToken });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Convert Mongoose document to plain object and excluding sensitive info such as password
    const userObj = user.toObject();
    const { password, ...userData } = userObj;
    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

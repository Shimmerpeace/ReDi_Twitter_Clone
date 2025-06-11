// app/api/user/profile/route.js
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

// middleware.js: Protecting Routes with Middleware
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export async function middleware(request) {
  const cookies = await cookies();

  const token = cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL("/login", request.url));
  }

  
}

// Apply middleware only to protected pages
export const config = {
  matcher: ["/api/tweets", "/api/tweets/:path*"], 
};
// matcher: ["/dashboard/:path*", "/profile/:path*"],
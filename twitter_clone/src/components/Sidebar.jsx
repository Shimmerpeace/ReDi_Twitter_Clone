//"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div>
      <Link href="/" className="logo text-[28px]">
        🐦
      </Link>
      <Link href="/" className="link">
        Home
      </Link>
      <Link href="/explore" className="link">
        Explore
      </Link>
      <Link href="/notifications" className="link">
        Notifications
      </Link>
      <Link href="messages" className="link">
        Messages
      </Link>
      <Link href="/user/profile" className="link">
        Communities
      </Link>
      <Link href="/(modal)/user/profile" className="link">
        Profile
      </Link>
      <Link href="#" className="link">
        More
      </Link>
      <Link href="/login" className="link">
        Login
      </Link>
      <Link href="/signup" className="link">
        Sign Up
      </Link>
    </div>
  );
}

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
      <Link href="#" className="link">
        Profile
      </Link>
      <Link href="#" className="link">
        More
      </Link>

      <Link href="/(modal)/user/profile" className="link">
        Open My Profile Modal
      </Link>

      <Link href="/(modal)/user/profile/1234567890" className="link">
        Open User 1234567890 Profile Modal
      </Link>
    </div>
  );
}

//"use client";

import Link from "next/link";



export default function Sidebar() {
  return (
    <div>
       <Link href="/" className="logo text-[28px]" >🐦</Link>
      <Link href="/" className="link" >Home</Link>
      <Link href="#" className="link" >Explore</Link>
      <Link href="#" className="link" >Notifications</Link>
      <Link href="#" className="link" >Messages</Link>
      <Link href="#" className="link" >Grok</Link>
      <Link href="#" className="link" >Communities</Link>
      <Link href="#" className="link" >Profile</Link>
      <Link href="#" className="link" >More</Link>


      <Link href="/(modal)/user/profile">Open My Profile Modal</Link>

<Link href="/(modal)/user/profile/1234567890">Open User 1234567890 Profile Modal</Link>
     
    </div>
  );
}
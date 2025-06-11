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
     
    </div>
  );
}
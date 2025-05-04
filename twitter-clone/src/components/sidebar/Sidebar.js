"use client";

import Link from "next/link";
import "@/components/sidebar/sidebar.css";


export default function Sidebar({ onPostClick }) {
  return (
    <div className="sidebar">
      <Link href="/" className="link" >Home</Link>
      <Link href="#" className="link" >Explore</Link>
      <Link href="#" className="link" >Notifications</Link>
      <Link href="#" className="link" >Messages</Link>
      <Link href="#" className="link" >Grok</Link>
      <Link href="#" className="link" >Communities</Link>
      <Link href="#" className="link" >Profile</Link>
      <Link href="#" className="link" >More</Link>
      <button
        className="w-full bg-black text-white rounded-[10px] font-bold py-2 px-4 mt-4 cursor-pointer"
        onClick={onPostClick}
      >
        Post
      </button>
    </div>
  );
}
// className="col-span-3 p-4 bg-blue-300 text-white py-4 px-6 shadow-md"
// "w-[15%] fixed h-full border-r-2 border-[#e5e5e5] z-30 items-center"
//flex flex-col gap-4
// className="mt-8 space-y-4 "
// w-[15%] fixed h-full border-r-2 border-[#e5e5e5] z-30 items-center

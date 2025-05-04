import Link from "next/link";
import "@/components/header/header.css";

export default function Header() {
  return (
    <div className="header">
         <Link href="/" className="logo" >🐦</Link>
      <Link href="#">For you</Link>
      <Link href="#">Following</Link>
    </div>
  );
}

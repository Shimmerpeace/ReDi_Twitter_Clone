'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Header({ user, onLogout }) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full px-[100px] py-5 flex items-center z-[99] backdrop-blur-[20px]">
      <Link href="/" className="logo text-3xl font-bold text-white mr-auto no-underline">🐦</Link>
      <div className="user-auth ml-10">
        {user ? (
          <div className="relative profile-box inline-block" ref={dropdownRef}>
            <div
              className="avatar-circle w-10 h-10 bg-white rounded-full text-center leading-10 text-2xl text-[#222] font-bold cursor-pointer"
              onClick={() => setDropdown((v) => !v)}
            >
              {user.name[0].toUpperCase()}
            </div>
            <div className={`dropdown absolute top-[85px] right-0 p-2 bg-white rounded-lg flex flex-col shadow transition-all duration-500 ${dropdown ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-5'}`}>
              <Link href="/profile" className="px-3 py-1 rounded text-[#222] font-medium hover:bg-gray-200">My Account</Link>
              <button onClick={onLogout} className="px-3 py-1 rounded text-[#222] font-medium hover:bg-gray-200 text-left">Logout</button>
            </div>
          </div>
        ) : (
          <Link href="/auth/login" className="login-btn-modal h-10 px-9 bg-transparent border-2 border-white rounded-full text-base text-white font-medium cursor-pointer transition-colors duration-500 hover:bg-white hover:text-[#222]">Login</Link>
        )}
      </div>
    </header>
  );
}
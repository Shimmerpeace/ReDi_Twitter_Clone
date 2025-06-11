"use client";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, login, logout } = useAuth();

  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <nav>
        {user ? (
          <>
            <span className="text-white mr-4">Welcome, {user.name}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => login({ name: "John Doe" })}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}

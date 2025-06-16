"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        /* Save the token for direct frontend use
      if (data.token) {
        localStorage.setItem('token', data.token);
      } */

        setSuccess("Registration successful! You can now log in.");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000); // Redirect to login page after 2 seconds
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center flex-col bg-gray-600  ">
      <div className="bg-orange-300 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ChatMaDay</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-80 gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded mt-1"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded mt-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded mt-1"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mt-1"
          />
          <button
            type="submit"
            className=" w-full bg-amber-200 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 "
          >
            Register
          </button>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
        </form>
      </div>
    </main>
  );
}

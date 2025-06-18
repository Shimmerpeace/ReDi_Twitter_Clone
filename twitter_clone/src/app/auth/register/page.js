
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', msg: string }
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setAlert({ type: 'success', msg: 'Registration successful! Redirecting to login...' });
        setForm({ name: '', username: '', email: '', password: '' });
        setTimeout(() => router.push('/auth/login'), 2000);
      } else {
        setAlert({ type: 'error', msg: data.error || 'Registration failed' });
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: 'error', msg: 'Something went wrong. Please try again.' });
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.jpeg')" }}
    >
      {alert && (
        <div
          className={`fixed top-10 left-1/2 -translate-x-1/2 w-[350px] h-[70px] bg-white rounded-md px-4 z-[100] flex items-center font-medium ${
            alert.type === 'success' ? 'border-l-4 border-green-500 text-[#222]' : 'border-l-4 border-red-500 text-[#222]'
          }`}
        >
          <i
            className={`bx ${
              alert.type === 'success' ? 'bxs-check-circle text-green-500' : 'bxs-x-circle text-red-500'
            } text-[35px] mr-2`}
          />
          <span>{alert.msg}</span>
        </div>
      )}

      <div className="relative w-[420px] bg-black/30 border-2 border-white/30 rounded-2xl shadow-lg backdrop-blur-[20px] text-white overflow-hidden p-10">
        <button
          onClick={() => history.back()}
          className="absolute top-0 right-0 w-[45px] h-[45px] bg-white border-none rounded-bl-2xl text-[35px] text-[#222] cursor-pointer z-10 flex items-center justify-center"
          aria-label="Close"
        >
          <IoMdCloseCircle />
        </button>

        <h2 className="text-[35px] text-center mb-5">ChatMaDay</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="input-box relative w-full h-[50px]">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full h-full bg-transparent border-2 border-white/30 outline-none rounded-[40px] text-base text-white pl-5 pr-11 py-5 placeholder-white"
            />
            <FaUser className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
          </div>

          <div className="input-box relative w-full h-[50px]">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full h-full bg-transparent border-2 border-white/30 outline-none rounded-[40px] text-base text-white pl-5 pr-11 py-5 placeholder-white"
            />
            <FaUser className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
          </div>

          <div className="input-box relative w-full h-[50px]">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full h-full bg-transparent border-2 border-white/30 outline-none rounded-[40px] text-base text-white pl-5 pr-11 py-5 placeholder-white"
            />
            <FaEnvelope className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
          </div>

          <div className="input-box relative w-full h-[50px]">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full h-full bg-transparent border-2 border-white/30 outline-none rounded-[40px] text-base text-white pl-5 pr-11 py-5 placeholder-white"
            />
            <FaLock className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
          </div>

          <button
            type="submit"
            className="btn w-full h-[45px] bg-white rounded-[40px] border-none shadow text-[16px] text-[#222] font-medium cursor-pointer hover:bg-gray-200 transition"
          >
            Register
          </button>

          <p className="text-center mt-6 text-[14.5px]">
            Already have an account?
            <Link href="/auth/login" className="text-white font-bold hover:underline ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

/*
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
      } *//*

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
*/
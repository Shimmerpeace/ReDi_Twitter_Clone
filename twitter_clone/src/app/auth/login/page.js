
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdCloseCircle } from "react-icons/io";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    if (!form.email || !form.password) {
      setAlert({ type: "error", msg: "Please enter both email and password." });
      setLoading(false);
      return;
    }

    // Example: Use API, fallback to mock if needed
    try {
      // Replace this with your actual API endpoint
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setAlert({ type: "success", msg: "Login Successful!" });
        setTimeout(() => router.push("/"), 1200);
      } else {
        setAlert({ type: "error", msg: data.error || "Invalid credentials!" });
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", msg: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.jpeg')" }}
    >
      <div className="relative w-[420px] bg-black/30 border-2 border-white/30 rounded-2xl shadow-lg backdrop-blur-[20px] text-white overflow-hidden">
        {alert && (
          <div
            className={`fixed top-10 left-1/2 -translate-x-1/2 w-[350px] h-[70px] bg-white rounded-md px-4 z-[100] flex items-center font-medium text-[#222] transition-all ${
              alert.type === "success"
                ? "border-l-4 border-green-500"
                : "border-l-4 border-red-500"
            }`}
          >
            <span className="mr-2">
              {alert.type === "success" ? "✅" : "❌"}
            </span>
            <span>{alert.msg}</span>
          </div>
        )}
        <button
          onClick={() => history.back()}
          className="absolute top-0 right-0 w-[45px] h-[45px] bg-white border-none rounded-bl-2xl text-[35px] text-[#222] cursor-pointer z-10 flex items-center justify-center"
        >
          <IoMdCloseCircle />
        </button>
        <div className="form-box login w-full p-10">
          <h2 className="text-[35px] text-center mb-5">ChatMaDay</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box relative w-full h-[50px] my-7">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full h-full bg-transparent border-2 border-white/30 outline-none rounded-[40px] text-base text-white pl-5 pr-11 py-5 placeholder-white"
                autoComplete="email"
                disabled={loading}
              />
              <FaEnvelope className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
            </div>
            <div className="input-box relative w-full h-[50px] my-7">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full h-full bg-transparent border-2 border-white/30 outline-none rounded-[40px] text-base text-white pl-5 pr-11 py-5 placeholder-white"
                autoComplete="current-password"
                disabled={loading}
              />
              <FaLock className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
            </div>
            <button
              type="submit"
              className="btn w-full h-[45px] bg-white rounded-[40px] border-none shadow text-[16px] text-[#222] font-medium cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-center mt-6 text-[14.5px]">
              Do not have an account?
              <Link
                href="/auth/register"
                className="text-white font-bold hover:underline ml-1"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}




/*
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/"); // Redirect to home after login
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center flex-col bg-gray-600">
      <div className="bg-orange-300 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ChatMaDay</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2">
              {error}
            </div>
          )}
        
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded mt-1"
            required
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-200 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <span>Do not have an account?</span>{" "}
          <a href="/register" className="hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </main>
  );
}
*/
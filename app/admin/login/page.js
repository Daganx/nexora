"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-100 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/20"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-100 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/20"
          />
          <button
            type="submit"
            className="bg-black text-white text-sm font-medium px-4 py-2.5 rounded-2xl hover:bg-neutral-800 transition-colors"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-thin">DASHBOARD</h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-neutral-500 hover:text-black transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-12 flex items-center justify-center">
          <p className="text-neutral-400">Coming soon</p>
        </div>
      </div>
    </div>
  );
}

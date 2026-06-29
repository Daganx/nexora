"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wallpapers")
      .then((res) => res.json())
      .then((data) => {
        setWallpapers(Array.isArray(data) ? data : []);
      })
      .catch(() => setWallpapers([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this wallpaper?")) return;
    try {
      const res = await fetch("/api/wallpapers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setWallpapers((prev) => prev.filter((wp) => wp._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete");
      }
    } catch {
      alert("Failed to delete wallpaper");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-thin">DASHBOARD</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/new"
              className="bg-black text-white text-sm font-medium px-4 py-2 rounded-2xl hover:bg-neutral-800 transition-colors"
            >
              + New
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-neutral-500 hover:text-black transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-12 flex items-center justify-center">
            <p className="text-neutral-400">Loading...</p>
          </div>
        ) : wallpapers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-12 flex items-center justify-center">
            <p className="text-neutral-400">No wallpapers yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">
                    Title
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">
                    Slug
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">
                    Category
                  </th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">
                    Created
                  </th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {wallpapers.map((wp) => (
                  <tr
                    key={wp._id}
                    className="border-b border-neutral-100 last:border-0"
                  >
                    <td className="px-6 py-3">{wp.title}</td>
                    <td className="px-6 py-3 text-neutral-500">{wp.slug}</td>
                    <td className="px-6 py-3">
                      <span className="bg-gray-100 rounded-full px-3 py-1 text-xs">
                        {wp.category}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-neutral-500">
                      {new Date(wp.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => handleDelete(wp._id)}
                        className="text-red-400 hover:text-red-600 transition-colors text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

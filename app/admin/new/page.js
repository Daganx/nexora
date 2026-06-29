"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function NewWallpaper() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryMode, setCategoryMode] = useState("select");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/wallpapers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const cats = [...new Set(data.map((w) => w.category).filter(Boolean))];
          setCategories(cats);
        }
      })
      .catch(() => {});
  }, []);

  function handleTitleChange(e) {
    const val = e.target.value;
    setTitle(val);
    setSlug(slugify(val));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });

      if (!uploadRes.ok) {
        const data = await uploadRes.json();
        throw new Error(data.error || "Upload failed");
      }

      const { url } = await uploadRes.json();

      const createRes = await fetch("/api/wallpapers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, category: categoryMode === "new" ? newCategory : category, image: url }),
      });

      if (!createRes.ok) {
        const data = await createRes.json();
        throw new Error(data.error || "Failed to create wallpaper");
      }

      router.push("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-thin mb-10">NEW WALLPAPER</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 w-full max-w-lg"
        >
          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              required
              className="w-full bg-gray-100 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/20"
            />
            <input
              type="text"
              placeholder="Slug (auto-generated)"
              value={slug}
              readOnly
              className="w-full bg-gray-100 rounded-2xl px-4 py-2.5 text-sm text-neutral-500 outline-none"
            />
            {categoryMode === "select" ? (
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full bg-gray-100 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/20"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setCategoryMode("new")}
                  className="text-xs text-neutral-400 hover:text-black whitespace-nowrap transition-colors"
                >
                  + New
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                  className="w-full bg-gray-100 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/20"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCategoryMode("select");
                    setNewCategory("");
                  }}
                  className="text-xs text-neutral-400 hover:text-black whitespace-nowrap transition-colors"
                >
                  Back
                </button>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files[0];
                  setFile(f);
                  if (f) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPreview(reader.result);
                    reader.readAsDataURL(f);
                  } else {
                    setPreview(null);
                  }
                }}
                required
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-neutral-800 cursor-pointer"
              />
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  width={800}
                  height={160}
                  unoptimized
                  className="w-full h-40 object-cover rounded-2xl border border-neutral-200"
                />
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white text-sm font-medium px-4 py-2.5 rounded-2xl hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Wallpaper"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

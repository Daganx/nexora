"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import wallpapers from "@/data/wallpapers.json";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const filtered = query.trim()
    ? wallpapers.filter(
        (w) =>
          w.title.toLowerCase().includes(query.toLowerCase()) ||
          w.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedCategories = [
    ...new Set(filtered.map((w) => w.category)),
  ];

  const isSearchablePage =
    pathname === "/explore" || pathname === "/category";

  useEffect(() => {
    function handleClickOutside(e) {
      const inDesktop = searchRef.current?.contains(e.target);
      const inMobile = mobileSearchRef.current?.contains(e.target);
      if (!inDesktop && !inMobile) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") setShowResults(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function handleSearchChange(value) {
    setQuery(value);
    setShowResults(true);

    if (isSearchablePage) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        if (value.trim()) {
          params.set("q", value.trim());
        } else {
          params.delete("q");
        }
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        router.replace(newUrl);
      }, 250);
    }
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter" && query.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      setShowResults(false);
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleResultClick() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setShowResults(false);
  }

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">
            NEX.
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/explore">Explore</Link>
            <Link href="/category" className="flex items-center gap-2">
              Category
            </Link>
          </div>
        </div>

        {/* CENTER SEARCH (desktop only) */}
        <div className="hidden lg:flex flex-1 justify-center px-6" ref={searchRef}>
          <div className="relative w-full max-w-md">
            <input
              type="search"
              placeholder="Search wallpapers or categories..."
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowResults(true)}
              onKeyDown={handleSearchKeyDown}
              className="w-full bg-gray-100 rounded-2xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
            />

            {showResults && query.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-neutral-400">
                    No results found.
                  </p>
                ) : (
                  <ul>
                    {matchedCategories.map((cat) => {
                      const catWallpapers = filtered.filter(
                        (w) => w.category === cat
                      );
                      return (
                        <li key={cat}>
                          <Link
                            href={`/category?cat=${cat}`}
                            onClick={handleResultClick}
                            className="flex items-center gap-3 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:bg-neutral-50"
                          >
                            {cat}
                          </Link>
                          {catWallpapers.map((wp) => (
                            <Link
                              key={wp.id}
                              href={`/wallpaper/${wp.slug}`}
                              onClick={handleResultClick}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 transition-colors"
                            >
                              <div className="relative size-9 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                                <Image
                                  src={wp.image}
                                  alt={wp.title}
                                  fill
                                  sizes="36px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {wp.title}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        href={`/explore?q=${encodeURIComponent(query.trim())}`}
                        onClick={handleResultClick}
                        className="flex items-center justify-center gap-1 px-4 py-3 text-sm font-medium text-neutral-500 border-t border-neutral-100 hover:bg-neutral-50"
                      >
                        See all results →
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            <Link href="https://buymeacoffee.com/" target="new_blank">
              Support
            </Link>
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden cursor-pointer text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-sm font-medium">
          <Link href="/explore">Explore</Link>
          <Link href="/category">Category</Link>

          <div ref={mobileSearchRef}>
            <input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowResults(true)}
              onKeyDown={handleSearchKeyDown}
              className="w-full bg-gray-100 rounded-full px-4 py-2 outline-none"
            />

          {showResults && query.trim() && (
            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-sm text-neutral-400">
                  No results found.
                </p>
              ) : (
                <ul>
                  {matchedCategories.map((cat) => {
                    const catWallpapers = filtered.filter(
                      (w) => w.category === cat
                    );
                    return (
                      <li key={cat}>
                          <Link
                            href={`/category?cat=${cat}`}
                            onClick={() => {
                              if (debounceRef.current) clearTimeout(debounceRef.current);
                              setShowResults(false);
                              setIsOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:bg-neutral-50"
                          >
                            {cat}
                          </Link>
                          {catWallpapers.map((wp) => (
                            <Link
                              key={wp.id}
                              href={`/wallpaper/${wp.slug}`}
                              onClick={() => {
                                if (debounceRef.current) clearTimeout(debounceRef.current);
                                setShowResults(false);
                                setIsOpen(false);
                              }}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 transition-colors"
                            >
                              <div className="relative size-9 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                                <Image
                                  src={wp.image}
                                  alt={wp.title}
                                  fill
                                  sizes="36px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {wp.title}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        href={`/explore?q=${encodeURIComponent(query.trim())}`}
                        onClick={() => {
                          if (debounceRef.current) clearTimeout(debounceRef.current);
                          setShowResults(false);
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-center gap-1 px-4 py-3 text-sm font-medium text-neutral-500 border-t border-neutral-100 hover:bg-neutral-50"
                      >
                        See all results →
                      </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
          </div>

          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Support
          </button>
        </div>
      )}
    </nav>
  );
}

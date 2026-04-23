"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="/articles" className="flex items-center gap-2">
              Blog
              <span className="bg-black text-white text-xs px-2 py-[2px] rounded">
                New
              </span>
            </Link>
          </div>
        </div>

        {/* CENTER SEARCH (desktop only) */}
        <div className="hidden lg:flex flex-1 justify-center px-6">
          <input
            type="search"
            placeholder="Search by inspiration"
            className="w-full max-w-md bg-gray-100 rounded-2xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link href="/articles">Log in</Link>
          <Link href="/articles">Sign Up</Link>

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
          <Link href="/articles">Explore</Link>

          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-100 rounded-full px-4 py-2 outline-none"
          />

          <Link href="/articles">Log in</Link>
          <Link href="/articles">Sign Up</Link>

          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Support
          </button>
        </div>
      )}
    </nav>
  );
}

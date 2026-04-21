"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";

export function Navbar() {
  return (
    <nav>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center font-semibold">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          N.
        </Link>

        {/* Links */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-12 text-base">
          <Link href="/articles">Explore</Link>
          <Link href="/articles">Category</Link>
          <input
            type="search"
            placeholder="Search bar"
            className="border-2"
          ></input>

          <Link href="/articles">Buy a Coffee</Link>
        </div>
      </div>
    </nav>
  );
}

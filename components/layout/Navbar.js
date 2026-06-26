"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearch } from "./Navbar/useSearch";
import SearchOverlay from "./Navbar/SearchOverlay";
import MobileMenu from "./Navbar/MobileMenu";

export function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/auth/verify")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.authenticated))
      .catch(() => {});
  }, []);

  const {
    isOpen,
    setIsOpen,
    query,
    showResults,
    setShowResults,
    searchRef,
    mobileSearchRef,
    filtered,
    matchedCategories,
    handleSearchChange,
    handleSearchKeyDown,
    cancelDebounce,
  } = useSearch();

  function handleDesktopResultClick() {
    cancelDebounce();
    setShowResults(false);
  }

  function handleMobileResultClick() {
    cancelDebounce();
    setShowResults(false);
    setIsOpen(false);
  }

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">
            NEX.
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/explore">Explore</Link>
            <Link href="/category">Category</Link>
            {isAdmin && (
              <Link href="/admin" className="text-neutral-500 hover:text-black transition-colors">
                Dashboard
              </Link>
            )}
          </div>
        </div>

        <SearchOverlay
          query={query}
          showResults={showResults}
          searchRef={searchRef}
          filtered={filtered}
          matchedCategories={matchedCategories}
          onSearchChange={handleSearchChange}
          onSearchKeyDown={handleSearchKeyDown}
          onFocus={() => setShowResults(true)}
          onResultClick={handleDesktopResultClick}
        />

        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            <Link href="https://buymeacoffee.com/" target="new_blank">
              Support
            </Link>
          </button>
        </div>

        <button
          className="md:hidden cursor-pointer text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      <MobileMenu
        isOpen={isOpen}
        isAdmin={isAdmin}
        query={query}
        showResults={showResults}
        mobileSearchRef={mobileSearchRef}
        filtered={filtered}
        matchedCategories={matchedCategories}
        onSearchChange={handleSearchChange}
        onSearchKeyDown={handleSearchKeyDown}
        onFocus={() => setShowResults(true)}
        onResultClick={handleMobileResultClick}
        onClose={() => setIsOpen(false)}
      />
    </nav>
  );
}

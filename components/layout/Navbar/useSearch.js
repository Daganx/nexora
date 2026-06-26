"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [wallpapers, setWallpapers] = useState([]);

  const debounceRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    fetch("/api/wallpapers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWallpapers(data);
      })
      .catch(() => {});
  }, []);

  const filtered = query.trim()
    ? wallpapers.filter(
        (w) =>
          w.title.toLowerCase().includes(query.toLowerCase()) ||
          w.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedCategories = [...new Set(filtered.map((w) => w.category))];

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

  function cancelDebounce() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    showResults,
    setShowResults,
    searchRef,
    mobileSearchRef,
    filtered,
    matchedCategories,
    handleSearchChange,
    handleSearchKeyDown,
    cancelDebounce,
  };
}

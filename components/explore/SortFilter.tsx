"use client";

import { useState } from "react";

export type SortOption = "newest" | "oldest" | "popular" | "alphabetical";

interface SortFilterProps {
  onSortChange?: (sort: SortOption) => void;
  onFilterChange?: (filters: string[]) => void;
}

const filterCategories = [
  "Button",
  "Animation",
  "Toggle",
  "Card",
  "Form",
  "Navigation",
  "Modal",
  "Slider",
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "alphabetical", label: "A-Z" },
];

export function SortFilter({ onSortChange, onFilterChange }: SortFilterProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState<SortOption>("newest");
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter];
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSortChange = (sort: SortOption) => {
    setActiveSort(sort);
    onSortChange?.(sort);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-neutral-500">Filter:</span>
        <div className="flex flex-wrap gap-2">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleFilter(category)}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 cursor-pointer ${
                activeFilters.includes(category)
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-neutral-500">Sort:</span>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-neutral-300 bg-white hover:border-neutral-500 transition-all duration-200 cursor-pointer"
          >
            {sortOptions.find((o) => o.value === activeSort)?.label}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 py-2 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 min-w-[140px]">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 transition-colors cursor-pointer ${
                    activeSort === option.value
                      ? "font-medium text-black"
                      : "text-neutral-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {activeFilters.length > 0 && (
          <button
            onClick={() => {
              setActiveFilters([]);
              onFilterChange?.([]);
            }}
            className="text-sm text-neutral-500 hover:text-black transition-colors underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

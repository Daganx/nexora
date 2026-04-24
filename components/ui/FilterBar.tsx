"use client";

import { ReactNode } from "react";

interface FilterBarProps {
  children: ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {children}
    </div>
  );
}

interface FilterButtonsProps {
  categories: string[];
  activeFilters: string[];
  onToggle: (filter: string) => void;
}

export function FilterButtons({
  categories,
  activeFilters,
  onToggle,
}: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-neutral-500">Filter:</span>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onToggle(category)}
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
  );
}

interface SortControlsProps {
  children: ReactNode;
}

export function SortControls({ children }: SortControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-neutral-500">Sort:</span>
      {children}
    </div>
  );
}
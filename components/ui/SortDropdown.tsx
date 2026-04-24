"use client";

import { useState } from "react";
import { SortOption } from "@/hooks/useSortableList";

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
  options?: { value: SortOption; label: string }[];
}

const defaultOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "alphabetical", label: "A-Z" },
];

export function SortDropdown({
  value,
  onChange,
  options = defaultOptions,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (sort: SortOption) => {
    onChange(sort);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-neutral-300 bg-white hover:border-neutral-500 transition-all duration-200 cursor-pointer"
      >
        {options.find((o) => o.value === value)?.label}
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
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange(option.value)}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 transition-colors cursor-pointer ${
                value === option.value
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
  );
}
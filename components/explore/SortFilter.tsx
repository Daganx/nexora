"use client";

import { SortOption } from "@/hooks/useSortableList";
import { FilterBar, FilterButtons, SortControls } from "@/components/ui/FilterBar";
import { SortDropdown } from "@/components/ui/SortDropdown";

interface SortFilterProps {
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  filterKey?: string;
  activeFilters: string[];
  onFilterToggle?: (filter: string) => void;
  onFilterClear?: () => void;
  showFilters?: boolean;
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

export function SortFilter({
  sortOption,
  onSortChange,
  activeFilters,
  onFilterToggle,
  onFilterClear,
  showFilters = true,
}: SortFilterProps) {
  return (
    <FilterBar>
      {showFilters && (
        <FilterButtons
          categories={filterCategories}
          activeFilters={activeFilters}
          onToggle={onFilterToggle!}
        />
      )}

      <SortControls>
        <SortDropdown value={sortOption} onChange={onSortChange} />
        {showFilters && activeFilters.length > 0 && (
          <button
            onClick={onFilterClear}
            className="text-sm text-neutral-500 hover:text-black transition-colors underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </SortControls>
    </FilterBar>
  );
}
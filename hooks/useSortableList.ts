import { useState, useMemo, useCallback } from "react";

export type SortOption = "newest" | "oldest" | "popular" | "alphabetical";

interface UseSortableListOptions<T> {
  data: T[];
  filterKey?: keyof T;
  sortOptions?: SortOption[];
  defaultSort?: SortOption;
}

export function useSortableList<T>({
  data,
  filterKey,
  sortOptions = ["newest", "oldest", "alphabetical"],
  defaultSort = "newest",
}: UseSortableListOptions<T>) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>(defaultSort);

  const toggleFilter = useCallback((filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters([]);
  }, []);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (activeFilters.length > 0 && filterKey) {
      result = result.filter((item) =>
        activeFilters.includes(item[filterKey] as unknown as string)
      );
    }

    switch (sortOption) {
      case "newest":
        break;
      case "oldest":
        result.reverse();
        break;
      case "alphabetical":
        result.sort((a, b) => {
          const aValue = (a as unknown as { title?: string }).title ?? "";
          const bValue = (b as unknown as { title?: string }).title ?? "";
          return aValue.localeCompare(bValue);
        });
        break;
      case "popular":
        break;
    }

    return result;
  }, [data, activeFilters, sortOption, filterKey]);

  return {
    sortOption,
    setSortOption,
    activeFilters,
    toggleFilter,
    clearFilters,
    filteredAndSortedData,
    sortOptions,
  };
}
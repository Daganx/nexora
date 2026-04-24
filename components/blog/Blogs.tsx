"use client";

import blogsData from "@/data/blog.json";
import { useSortableList } from "@/hooks/useSortableList";
import { SortFilter } from "@/components/explore/SortFilter";
import { BlogsList } from "./BlogsList";

export function Blogs() {
  const {
    sortOption,
    setSortOption,
    activeFilters,
    toggleFilter,
    clearFilters,
    filteredAndSortedData,
  } = useSortableList<typeof blogsData[number]>({
    data: blogsData,
    filterKey: "type",
  });

  return (
    <section className="flex flex-col gap-8 m-2">
      <SortFilter
        sortOption={sortOption}
        onSortChange={setSortOption}
        activeFilters={activeFilters}
        onFilterToggle={toggleFilter}
        onFilterClear={clearFilters}
        showFilters={false}
      />
      <BlogsList blogs={filteredAndSortedData} />
    </section>
  );
}
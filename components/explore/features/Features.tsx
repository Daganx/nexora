"use client";

import { useState, useMemo } from "react";
import featuresData from "@/data/features.json";
import { SortFilter, SortOption } from "../SortFilter";
import { FeaturesList } from "./FeaturesList";

export function Features() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const filteredAndSortedFeatures = useMemo(() => {
    let result = [...featuresData];

    if (activeFilters.length > 0) {
      result = result.filter((feature) =>
        activeFilters.includes(feature.type)
      );
    }

    switch (sortOption) {
      case "newest":
        break;
      case "oldest":
        result.reverse();
        break;
      case "alphabetical":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "popular":
        break;
    }

    return result;
  }, [activeFilters, sortOption]);

  return (
    <section className="flex flex-col gap-8 m-2">
      <SortFilter
        onSortChange={setSortOption}
        onFilterChange={setActiveFilters}
      />
      <FeaturesList features={filteredAndSortedFeatures} />
    </section>
  );
}
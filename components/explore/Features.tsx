"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import featuresData from "@/data/features.json";
import { SortFilter, SortOption } from "./SortFilter";

export function Features() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const filteredAndSortedFeatures = useMemo(() => {
    let result = [...featuresData];

    if (activeFilters.length > 0) {
      result = result.filter((feature) => activeFilters.includes(feature.type));
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
    }

    return result;
  }, [activeFilters, sortOption]);

  return (
    <section className="flex flex-col gap-8 m-2">
      <SortFilter
        onSortChange={setSortOption}
        onFilterChange={setActiveFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedFeatures.map((feature, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="rounded-2xl min-h-[440px] relative overflow-hidden border border-neutral-200 group cursor-pointer">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="px-1">
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                {feature.type}
              </span>
              <h3 className="text-lg font-medium text-black mt-1">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedFeatures.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          No features match your current filters.
        </div>
      )}
    </section>
  );
}

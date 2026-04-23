import { Feature } from "@/types/feature";
import { FeatureCard } from "./FeatureCard";

interface FeaturesListProps {
  features: Feature[];
}

export function FeaturesList({ features }: FeaturesListProps) {
  if (features.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        No features match your current filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
}
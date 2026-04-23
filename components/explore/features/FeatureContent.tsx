import { Feature } from "@/types/feature";

interface FeatureContentProps {
  feature: Feature;
}

export function FeatureContent({ feature }: FeatureContentProps) {
  return (
    <div className="px-1">
      <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
        {feature.type}
      </span>
      <h3 className="text-lg font-medium text-black mt-1">
        {feature.title}
      </h3>
    </div>
  );
}
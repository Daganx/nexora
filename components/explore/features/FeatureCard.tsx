import { Feature } from "@/types/feature";
import { FeatureImage } from "./FeatureImage";
import { FeatureOverlay } from "./FeatureOverlay";
import { FeatureContent } from "./FeatureContent";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl min-h-[440px] relative overflow-hidden border border-neutral-200 group cursor-pointer">
        <FeatureImage feature={feature} />
        <FeatureOverlay />
      </div>
      <FeatureContent feature={feature} />
    </div>
  );
}
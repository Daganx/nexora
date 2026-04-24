import { Feature } from "@/types/feature";
import { FeatureImage } from "./FeatureImage";
import { FeatureOverlay } from "./FeatureOverlay";
import { FeatureContent } from "./FeatureContent";

interface FeatureCardOverlayProps {
  feature: Feature;
  imageObjectFit?: "contain" | "cover";
  showButton?: boolean;
}

export function FeatureCardOverlay({ feature, imageObjectFit = "contain", showButton = true }: FeatureCardOverlayProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl min-h-[440px] relative overflow-hidden border border-neutral-200 group cursor-pointer">
        <FeatureImage feature={feature} objectFit={imageObjectFit} />
        <FeatureOverlay variant="gradient" />
        <FeatureContent feature={feature} variant="overlay" showButton={showButton} />
      </div>
    </div>
  );
}
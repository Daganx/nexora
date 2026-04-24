import { Feature } from "@/types/feature";
import { FeatureCardOverlay } from "@/components/ui/FeatureCardOverlay";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return <FeatureCardOverlay feature={feature} imageObjectFit="contain" showButton={true} />;
}

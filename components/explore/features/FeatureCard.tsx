import { Feature } from "@/types/feature";
import { FeatureCardUI } from "@/components/ui/FeatureCard";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return <FeatureCardUI feature={feature} />;
}
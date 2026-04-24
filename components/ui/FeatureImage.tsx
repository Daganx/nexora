import Image from "next/image";
import { Feature } from "@/types/feature";

interface FeatureImageProps {
  feature: Feature;
  objectFit?: "contain" | "cover";
}

export function FeatureImage({
  feature,
  objectFit = "contain",
}: FeatureImageProps) {
  return (
    <Image
      src={feature.image}
      alt={feature.title}
      fill
      className={`object-${objectFit} object-center transition-transform duration-300 group-hover:scale-105`}
      unoptimized
      loading="eager"
    />
  );
}

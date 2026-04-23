import Image from "next/image";
import { Feature } from "@/types/feature";

interface FeatureImageProps {
  feature: Feature;
}

export function FeatureImage({ feature }: FeatureImageProps) {
  return (
    <Image
      src={feature.image}
      alt={feature.title}
      fill
      className="object-contain object-center"
      unoptimized
    />
  );
}

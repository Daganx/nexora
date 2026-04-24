import { Blog } from "@/types/blog";
import { Feature } from "@/types/feature";
import { FeatureImage } from "./FeatureImage";
import { FeatureOverlay } from "./FeatureOverlay";
import { FeatureContent } from "./FeatureContent";

interface BlogCardProps {
  blog: Blog;
  imageObjectFit?: "contain" | "cover";
}

export function BlogCardUI({ blog, imageObjectFit = "contain" }: BlogCardProps) {
  const feature: Feature = {
    image: blog.image,
    title: blog.title,
    type: blog.type,
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl min-h-[440px] relative overflow-hidden border border-neutral-200 group cursor-pointer">
        <FeatureImage feature={feature} objectFit={imageObjectFit} />
        <FeatureOverlay variant="gradient" />
        <FeatureContent feature={feature} variant="overlay" showButton={true} />
      </div>
    </div>
  );
}
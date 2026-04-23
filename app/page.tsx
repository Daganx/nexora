// app/page.tsx -> Page Home /
import { HeroBanner } from "@/components/home/HeroBanner";
import { LatestFeature } from "@/components/home/LatestFeature";
import { LatestBlog } from "@/components/home/LatestBlog";

export default async function Home() {
  return (
    <>
      <HeroBanner />
      <LatestFeature />
      <LatestBlog />
    </>
  );
}

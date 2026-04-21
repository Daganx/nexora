// app/page.tsx -> Page Home /
import { HeroBanner } from "@/components/home/HeroBanner";
import { LatestArticles } from "@/components/home/LatestArticles";

export default async function Home() {
  return (
    <>
      <HeroBanner />
      <LatestArticles />
    </>
  );
}

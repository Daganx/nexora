import Hero from "@/components/home/Hero";
import FeaturedWallpaper from "@/components/home/FeaturedWallpaper";
import LatestWallpapers from "@/components/home/LatestWallpapers";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Nexora - Home",
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWallpaper />
      <LatestWallpapers />
    </>
  );
}

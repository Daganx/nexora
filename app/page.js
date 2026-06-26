import Hero from "@/components/home/Hero";
import LatestWallpapers from "@/components/home/LatestWallpapers";

export const metadata = {
  title: "Nexora - Home",
};

export default function Home() {
  return (
    <>
      <Hero />
      <LatestWallpapers />
    </>
  );
}

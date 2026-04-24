import { Features } from "@/components/explore/features/Features";

// Explore Page /explore
export default async function Explore() {
  return (
    <main>
      <div className="relative flex flex-col items-center justify-center gap-7 mt-10 mb-10">
        <h2>Explore</h2>
        <h1 className="text-[7vw] leading-none font-bold">FEATURES</h1>
      </div>
      <Features />
    </main>
  );
}

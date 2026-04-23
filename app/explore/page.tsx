import { Features } from "@/components/explore/features/Features";

// Explore Page /explore
export default async function Explore() {
  return (
    <main>
      <div className="relative flex flex-col items-center justify-center gap-7 mt-10 mb-10">
        <h1>Explore</h1>
        <h2 className="text-[7vw] leading-none font-bold">FEATURES</h2>
      </div>
      <Features />
    </main>
  );
}

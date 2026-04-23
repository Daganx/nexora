import { Features } from "@/components/explore/Features";

// Explore Page /explore
export default async function Explore() {
  return (
    <main>
      <div className="relative flex flex-col items-center justify-center gap-7 mt-10 mb-10">
        <h1 className="text-[7vw] leading-none font-bold">Explore</h1>
      </div>
      <Features />
    </main>
  );
}

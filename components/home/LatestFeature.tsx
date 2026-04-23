import featuresData from "@/data/features.json";
import { FeatureCard } from "./features/FeatureCard";

// File for the 2 latest articles on HomePage
export function LatestFeature() {
  const latestFeatures = featuresData.slice(0, 4);

  return (
    <section>
      <div className="relative flex flex-col items-center justify-center gap-7">
        <h3 className="text-base">Latest</h3>
        <h2 className="text-[7vw] leading-none font-bold">FEATURES</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-10">
        {latestFeatures.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
}

import { Feature } from "@/types/feature";

interface FeatureContentProps {
  feature: Feature;
  variant?: "default" | "overlay";
  showButton?: boolean;
}

export function FeatureContent({ feature, variant = "default", showButton = false }: FeatureContentProps) {
  if (variant === "overlay") {
    return (
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-white/70 text-xs font-medium tracking-widest uppercase">
            {feature.type}
          </span>
          <h3 className="text-white text-xl font-semibold leading-tight">
            {feature.title}
          </h3>
        </div>

        {showButton && (
          <div className="hidden md:flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-1">
      <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
        {feature.type}
      </span>
      <h3 className="text-lg font-medium text-black mt-1">
        {feature.title}
      </h3>
    </div>
  );
}
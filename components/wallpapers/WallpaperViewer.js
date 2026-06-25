"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function WallpaperViewer({ wp }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <>
      <div className="relative w-full lg:w-3/5 aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 group cursor-pointer">
        <Image
          src={wp.image}
          alt={wp.title}
          fill
          className="object-contain transition-opacity duration-300 group-hover:opacity-90"
          sizes="(max-width: 1024px) 100vw, 60vw"
          loading="eager"
          onClick={() => setOpen(true)}
        />
        <button
          onClick={() => setOpen(true)}
          className="absolute inset-0 w-full h-full"
          aria-label="View full size"
        />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative w-full h-full max-w-[95vw] max-h-[95vh] m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={wp.image}
              alt={wp.title}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
          </div>

          <button
            onClick={close}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

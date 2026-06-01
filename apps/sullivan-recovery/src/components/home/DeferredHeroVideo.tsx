"use client";

import { useEffect, useState } from "react";

type DeferredHeroVideoProps = {
  mobileSrc: string;
  desktopSrc: string;
  className?: string;
};

/**
 * Loads hero background video after the browser is idle so the poster image
 * can paint first (LCP) without competing for bandwidth with the MP4.
 */
export default function DeferredHeroVideo({
  mobileSrc,
  desktopSrc,
  className = "absolute inset-0 h-full w-full object-cover object-right md:object-center",
}: DeferredHeroVideoProps) {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setLoad(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(start, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!load) return null;

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={`${className} transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      aria-hidden
      onCanPlay={() => setReady(true)}
    >
      <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />
      <source src={desktopSrc} media="(min-width: 768px)" type="video/mp4" />
    </video>
  );
}

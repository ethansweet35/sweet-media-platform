"use client";

import { useEffect, useState } from "react";

type DeferredHeroVideoProps = {
  mobileSrc: string;
  desktopSrc: string;
  className?: string;
};

/**
 * Loads hero background video only after window load + idle so the poster
 * image can finish LCP without competing for bandwidth with the MP4.
 */
export default function DeferredHeroVideo({
  mobileSrc,
  desktopSrc,
  className = "absolute inset-0 h-full w-full object-cover object-right md:object-center",
}: DeferredHeroVideoProps) {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if (cancelled) return;
      setLoad(true);
    };

    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 6000 });
      } else {
        timerId = setTimeout(start, 5000);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) clearTimeout(timerId);
      window.removeEventListener("load", schedule);
    };
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

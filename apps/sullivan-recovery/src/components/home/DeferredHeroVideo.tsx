"use client";

import { useEffect, useState } from "react";

type DeferredHeroVideoProps = {
  mobileSrc: string;
  desktopSrc: string;
  className?: string;
};

function scheduleIdle(callback: () => void, timeoutMs: number): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout: timeoutMs });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, Math.min(timeoutMs, 5000));
  return () => window.clearTimeout(id);
}

/**
 * Loads hero background video only after LCP + idle so the poster image
 * finishes painting without competing for bandwidth with the MP4.
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
    let cancelIdle: (() => void) | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let lcpObserver: PerformanceObserver | undefined;
    let scheduled = false;

    const start = () => {
      if (cancelled) return;
      setLoad(true);
    };

    const scheduleVideo = () => {
      if (scheduled || cancelled) return;
      scheduled = true;
      lcpObserver?.disconnect();
      if (fallbackTimer !== undefined) clearTimeout(fallbackTimer);
      cancelIdle = scheduleIdle(start, 8000);
    };

    const afterLcp = () => {
      if (cancelled) return;

      if (typeof PerformanceObserver === "function") {
        try {
          lcpObserver = new PerformanceObserver((list) => {
            if (list.getEntries().length > 0) scheduleVideo();
          });
          lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

          fallbackTimer = setTimeout(scheduleVideo, 10000);
          return;
        } catch {
          // Fall through to idle scheduling below.
        }
      }

      scheduleVideo();
    };

    const onLoad = () => {
      if (cancelled) return;
      afterLcp();
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelled = true;
      cancelIdle?.();
      if (fallbackTimer !== undefined) clearTimeout(fallbackTimer);
      lcpObserver?.disconnect();
      window.removeEventListener("load", onLoad);
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

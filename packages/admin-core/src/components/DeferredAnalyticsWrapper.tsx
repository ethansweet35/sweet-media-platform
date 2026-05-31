"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AnalyticsWrapper = dynamic(
  () => import("./AnalyticsWrapper").then((m) => ({ default: m.AnalyticsWrapper })),
  { ssr: false },
);

/**
 * Defers Vercel Analytics + Speed Insights until the main thread is idle so
 * marketing pages can paint and become interactive first.
 */
export function DeferredAnalyticsWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onIdle = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(onIdle, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(onIdle, 1500);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;
  return <AnalyticsWrapper />;
}

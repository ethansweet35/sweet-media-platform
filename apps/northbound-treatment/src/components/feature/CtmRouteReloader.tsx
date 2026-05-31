"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { reloadCtmTrackingScript, rescheduleCtmNumberSwap } from "@/lib/ctm";

/**
 * Keeps CTM number replacement in sync with Next.js App Router rendering.
 *
 * - First load: layout.tsx injects t.js; we re-scan after hydration because
 *   afterInteractive can run before client chrome finishes painting tel: links.
 * - Client navigations: re-inject t.js with a cache buster (same URL will not
 *   re-execute otherwise) and schedule follow-up DOM scans.
 */
export default function CtmRouteReloader() {
  const pathname = usePathname();
  const isFirstNav = useRef(true);

  useEffect(() => {
    rescheduleCtmNumberSwap(0);
    rescheduleCtmNumberSwap(400);
    rescheduleCtmNumberSwap(1200);
  }, []);

  useEffect(() => {
    if (isFirstNav.current) {
      isFirstNav.current = false;
      return;
    }

    const timer = setTimeout(() => {
      reloadCtmTrackingScript();
      rescheduleCtmNumberSwap(600);
      rescheduleCtmNumberSwap(1500);
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

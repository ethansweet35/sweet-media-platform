"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { CTM_TRACKING_SRC } from "@/lib/ctm";

/**
 * Re-triggers CTM number replacement on every client-side route change.
 *
 * CTM's t.js sets window.__ctm on first load and skips re-initialization if
 * that guard already exists. To force a full DOM re-scan on navigation we:
 *   1. Wait 250ms for Next.js to finish rendering the new page's DOM
 *   2. Delete window.__ctm to clear the loaded guard
 *   3. Remove any previously injected SPA reload tag
 *   4. Re-inject t.js so it initializes fresh and swaps numbers on this page
 *
 * The initial load (handled by layout.tsx Script) is intentionally skipped.
 */
export default function CtmRouteReloader() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const timer = setTimeout(() => {
      // Clear CTM's loaded guard so the fresh script fully re-initializes
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).__ctm;
      } catch {}

      // Remove previous SPA-injected instance
      document.getElementById("ctm-spa-reload")?.remove();

      // Re-inject t.js — browser executes it fresh since the element is new
      const script = document.createElement("script");
      script.id = "ctm-spa-reload";
      script.src = CTM_TRACKING_SRC;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.head.appendChild(script);
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

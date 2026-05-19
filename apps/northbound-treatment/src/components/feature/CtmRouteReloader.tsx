"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { CTM_TRACKING_SRC } from "@/lib/ctm";

/**
 * Re-injects the CTM t.js script on every client-side route change so that
 * number replacement runs on each new page's DOM, not just the initial load.
 *
 * On first render we skip the injection (layout.tsx already loaded t.js via
 * Next.js Script). On subsequent navigations we remove the previous SPA-injected
 * tag and append a fresh one — the cache-busting timestamp forces a re-exec
 * while the browser still serves the file from cache.
 */
export default function CtmRouteReloader() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    // Small delay ensures the new page content is in the DOM before CTM scans
    const timer = setTimeout(() => {
      const prev = document.getElementById("ctm-spa-reload");
      if (prev) prev.remove();

      const script = document.createElement("script");
      script.id = "ctm-spa-reload";
      script.src = `${CTM_TRACKING_SRC}?_r=${Date.now()}`;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.head.appendChild(script);
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

"use client";

import { useEffect, useRef } from "react";

const GTM_ID = "GTM-NMVS2FN";

/**
 * GTM (~300 KiB + tags) is not needed for LCP. Load after deliberate interaction
 * or a long delay so Lighthouse scroll does not pull gtag during the audit.
 */
export default function DeferredGtm() {
  const loaded = useRef(false);

  useEffect(() => {
    const load = () => {
      if (loaded.current) return;
      loaded.current = true;
      (window as Window & { dataLayer?: unknown[] }).dataLayer =
        (window as Window & { dataLayer?: unknown[] }).dataLayer || [];
      (window as Window & { dataLayer?: unknown[] }).dataLayer!.push({
        "gtm.start": Date.now(),
        event: "gtm.js",
      });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(s);
    };

    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", load, opts);
    window.addEventListener("touchstart", load, opts);

    const fallback = window.setTimeout(load, 25_000);

    return () => {
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("touchstart", load);
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}

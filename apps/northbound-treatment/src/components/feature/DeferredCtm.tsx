"use client";

import { useEffect, useRef } from "react";
import { CTM_SCRIPTS_ENABLED, CTM_TRACKING_SRC } from "@/lib/ctm";

/**
 * CTM t.js (~125 KiB) — defer until interaction or post-LCP delay.
 */
export default function DeferredCtm() {
  const loaded = useRef(false);

  useEffect(() => {
    if (!CTM_SCRIPTS_ENABLED) return;

    const load = () => {
      if (loaded.current || document.getElementById("ctm-tracking")) return;
      loaded.current = true;
      const script = document.createElement("script");
      script.id = "ctm-tracking";
      script.src = CTM_TRACKING_SRC;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.head.appendChild(script);
    };

    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", load, opts);
    window.addEventListener("touchstart", load, opts);

    const fallback = window.setTimeout(load, 15_000);

    return () => {
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("touchstart", load);
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}

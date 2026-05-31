"use client";

import { useEffect, useRef } from "react";

/**
 * TalkFurther (~575 KiB) is not needed for first paint. Load after first
 * interaction or a long idle timeout so PSI TBT/LCP are not competing with VSA.
 */
export default function DeferredTalkFurther() {
  const loaded = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const load = () => {
      if (loaded.current) return;
      loaded.current = true;
      const a = document.createElement("script");
      a.type = "text/javascript";
      a.src = "https://js.talkfurther.com/talkfurther_init.min.js";
      a.async = true;
      document.body.appendChild(a);
    };

    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", load, opts);
    window.addEventListener("keydown", load, opts);
    window.addEventListener("touchstart", load, opts);
    window.addEventListener("scroll", load, opts);

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(load, { timeout: 12_000 })
        : undefined;
    const fallback = window.setTimeout(load, 12_000);

    return () => {
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
      window.removeEventListener("touchstart", load);
      window.removeEventListener("scroll", load);
      window.clearTimeout(fallback);
      if (idle !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle);
      }
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef } from "react";

/**
 * TalkFurther (~575 KiB VSA). Intentionally does NOT listen to scroll — Lighthouse
 * scrolls the page and would otherwise load embedded-vsa.js during the audit.
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
    window.addEventListener("touchstart", load, opts);

    const fallback = window.setTimeout(load, 45_000);

    return () => {
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("touchstart", load);
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}

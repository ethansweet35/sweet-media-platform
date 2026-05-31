"use client";

import { useEffect, useRef } from "react";

/**
 * Loads the AccessiBe overlay only after first user interaction (or a delayed
 * fallback) so the 224KB script does not compete with LCP / TBT on cold load.
 */
export default function DeferredAccessiBe() {
  const loaded = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const load = () => {
      if (loaded.current) return;
      loaded.current = true;

      const s = document.createElement("script");
      s.src = "https://acsbapp.com/apps/app/dist/js/app.js";
      s.async = true;
      s.onload = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const acsb = (window as any).acsbJS;
        if (!acsb?.init) return;
        acsb.init({
          statementLink: "",
          footerHtml: "",
          hideMobile: false,
          hideTrigger: false,
          disableBgProcess: false,
          language: "en",
          position: "right",
          leadColor: "#146FF8",
          triggerColor: "#146FF8",
          triggerRadius: "50%",
          triggerPositionX: "right",
          triggerPositionY: "bottom",
          triggerIcon: "people",
          triggerSize: "bottom",
          triggerOffsetX: 20,
          triggerOffsetY: 20,
          mobile: {
            triggerSize: "small",
            triggerPositionX: "right",
            triggerPositionY: "bottom",
            triggerOffsetX: 10,
            triggerOffsetY: 10,
            triggerRadius: "50%",
          },
        });
      };
      (document.head || document.body).appendChild(s);
    };

    const events = ["pointerdown", "keydown", "touchstart"] as const;
    for (const event of events) {
      window.addEventListener(event, load, { once: true, passive: true });
    }

    const fallback = window.setTimeout(load, 8000);

    return () => {
      for (const event of events) {
        window.removeEventListener(event, load);
      }
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}

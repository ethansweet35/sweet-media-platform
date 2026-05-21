"use client";

import { useEffect, useRef } from "react";
import { OKLAHOMA_GALA_DONORBOX_CAMPAIGN } from "@/lib/oklahoma-gala";

export const DONORBOX_WIDGETS_SCRIPT_URL = "https://donorbox.org/widgets.js";

export { OKLAHOMA_GALA_DONORBOX_CAMPAIGN };

interface DonorboxDboxWidgetProps {
  campaign?: string;
  type?: string;
  enableAutoScroll?: boolean;
  className?: string;
}

/**
 * Donorbox widgets.js embed:
 * <dbox-widget campaign="…" type="donation_form" enable-auto-scroll="true" />
 */
export default function DonorboxDboxWidget({
  campaign = OKLAHOMA_GALA_DONORBOX_CAMPAIGN,
  type = "donation_form",
  enableAutoScroll = true,
  className = "",
}: DonorboxDboxWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    const existing = document.querySelector(
      `script[src="${DONORBOX_WIDGETS_SCRIPT_URL}"]`,
    );
    if (existing) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = DONORBOX_WIDGETS_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const widget = document.createElement("dbox-widget");
    widget.setAttribute("campaign", campaign);
    widget.setAttribute("type", type);
    widget.setAttribute("enable-auto-scroll", enableAutoScroll ? "true" : "false");
    container.appendChild(widget);

    return () => {
      container.replaceChildren();
    };
  }, [campaign, type, enableAutoScroll]);

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`.trim()}
      aria-label="Donation form"
    />
  );
}

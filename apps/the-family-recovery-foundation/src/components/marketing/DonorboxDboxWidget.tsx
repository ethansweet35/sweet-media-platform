"use client";

import { useEffect, useRef } from "react";

export const DONORBOX_WIDGETS_SCRIPT_URL = "https://donorbox.org/widgets.js";

import { OKLAHOMA_GALA_DONORBOX_CAMPAIGN } from "@/lib/oklahoma-gala";

export { OKLAHOMA_GALA_DONORBOX_CAMPAIGN };

interface DonorboxDboxWidgetProps {
  campaign?: string;
  type?: string;
  enableAutoScroll?: boolean;
  className?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "dbox-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        campaign?: string;
        type?: string;
        "enable-auto-scroll"?: string;
      };
    }
  }
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
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

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

  return (
    <div className={`w-full ${className}`.trim()}>
      <dbox-widget
        campaign={campaign}
        type={type}
        enable-auto-scroll={enableAutoScroll ? "true" : "false"}
      />
    </div>
  );
}

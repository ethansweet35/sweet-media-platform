"use client";

import { useEffect, useRef } from "react";

export const DONORBOX_EMBED_URL =
  "https://donorbox.org/embed/the-family-recovery-foundation";
export const DONORBOX_SCRIPT_URL = "https://donorbox.org/widget.js";

interface DonorboxEmbedProps {
  className?: string;
  embedUrl?: string;
}

/**
 * Matches the Squarespace embed:
 * widget.js (paypalExpress=false) + iframe to the-family-recovery-foundation campaign.
 */
export default function DonorboxEmbed({
  className = "",
  embedUrl = DONORBOX_EMBED_URL,
}: DonorboxEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const existingScript = document.querySelector(
      `script[src="${DONORBOX_SCRIPT_URL}"]`,
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = DONORBOX_SCRIPT_URL;
      script.async = true;
      script.setAttribute("paypalExpress", "false");
      container.appendChild(script);
    }

    const iframe = document.createElement("iframe");
    iframe.src = embedUrl;
    iframe.name = "donorbox";
    iframe.title = "Donate to The Family Recovery Foundation";
    iframe.setAttribute("allowpaymentrequest", "allowpaymentrequest");
    iframe.setAttribute("seamless", "seamless");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("height", "900px");
    iframe.setAttribute("width", "100%");
    iframe.style.maxWidth = "500px";
    iframe.style.minWidth = "250px";
    iframe.style.width = "100%";
    iframe.style.height = "900px";
    iframe.style.maxHeight = "none";
    iframe.style.border = "0";
    iframe.style.display = "block";

    container.appendChild(iframe);

    return () => {
      container.replaceChildren();
    };
  }, [embedUrl]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center ${className}`.trim()}
      aria-label="Donation form"
    />
  );
}

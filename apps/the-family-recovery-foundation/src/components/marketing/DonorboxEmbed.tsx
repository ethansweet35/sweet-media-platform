"use client";

import { useEffect, useRef } from "react";

const DONORBOX_EMBED_URL = "https://donorbox.org/embed/the-family-recovery-foundation";
const DONORBOX_SCRIPT_URL = "https://donorbox.org/widget.js";

interface DonorboxEmbedProps {
  className?: string;
  /** Matches live homepage embed height */
  height?: number;
}

/**
 * Donorbox expects widget.js + iframe injected together (see tfrfoundation.org).
 * Client-only mount avoids hydration mismatches and lazy script timing issues.
 */
export default function DonorboxEmbed({
  className = "",
  height = 900,
}: DonorboxEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const existingScript = document.querySelector(
      `script[src="${DONORBOX_SCRIPT_URL}"]`,
    );

    const iframe = document.createElement("iframe");
    iframe.src = DONORBOX_EMBED_URL;
    iframe.name = "donorbox";
    iframe.title = "Donate to The Family Recovery Foundation";
    iframe.setAttribute("allowpaymentrequest", "true");
    iframe.setAttribute("seamless", "seamless");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.style.maxWidth = "500px";
    iframe.style.minWidth = "250px";
    iframe.style.width = "100%";
    iframe.style.height = `${height}px`;
    iframe.style.maxHeight = "none";
    iframe.style.border = "0";
    iframe.style.display = "block";

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = DONORBOX_SCRIPT_URL;
      script.async = true;
      script.setAttribute("paypalexpress", "false");
      container.appendChild(script);
    }

    container.appendChild(iframe);

    return () => {
      container.replaceChildren();
    };
  }, [height]);

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-[320px] flex justify-center ${className}`.trim()}
      aria-label="Donation form"
    />
  );
}

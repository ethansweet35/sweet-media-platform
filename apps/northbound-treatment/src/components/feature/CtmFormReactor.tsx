"use client";

import { CTM_FORM_REACTOR_IFRAME_SRC } from "@/lib/ctm";

export type CtmFormReactorProps = {
  /** Live WP uses 300px (compact) / 460px (full lead forms). */
  height?: number;
  className?: string;
  title?: string;
};

/** CTM FormReactor embed — same iframe as live northboundtreatment.com. */
export default function CtmFormReactor({
  height = 460,
  className = "",
  title = "Northbound Treatment — contact form",
}: CtmFormReactorProps) {
  return (
    /**
     * Wrapper caps the visible height so CTM's formreactor.js resizing the
     * iframe element doesn't cause the card to grow inconsistently on each
     * visit. The iframe can grow inside but the container stays fixed.
     */
    <div
      className="w-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <iframe
        className={`ctm-call-widget w-full border-none ${className}`.trim()}
        src={CTM_FORM_REACTOR_IFRAME_SRC}
        style={{ height: `${height}px`, minHeight: `${height}px` }}
        title={title}
      />
    </div>
  );
}

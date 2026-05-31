"use client";

import { useState } from "react";
import { CTM_FORM_REACTOR_IFRAME_SRC } from "@/lib/ctm";

export type CtmFormReactorProps = {
  /** Compact hero height — matches homepage embed. */
  height?: number;
  className?: string;
  title?: string;
};

/** CTM FormReactor embed — same iframe as live northboundtreatment.com. */
export default function CtmFormReactor({
  height = 290,
  className = "",
  title = "Northbound Treatment — contact form",
}: CtmFormReactorProps) {
  const [src] = useState(CTM_FORM_REACTOR_IFRAME_SRC);

  /*
   * The iframe is absolutely positioned and pinned to all four edges of a
   * fixed-height wrapper. Even when CTM's formreactor.js or its own resize
   * postMessage handler tries to set iframe.style.height, the inset:0
   * anchoring overrides it — the rendered size is dictated by the wrapper.
   * The "ctm-call-widget" class is intentionally omitted so CTM's own
   * querySelector lookups skip this iframe entirely.
   */
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`.trim()}
      style={{ height: `${height}px` }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full border-none"
      />
    </div>
  );
}

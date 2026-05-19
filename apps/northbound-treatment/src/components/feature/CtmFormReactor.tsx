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
    <iframe
      className={`ctm-call-widget w-full border-none ${className}`.trim()}
      src={CTM_FORM_REACTOR_IFRAME_SRC}
      style={{ height: `${height}px` }}
      title={title}
    />
  );
}

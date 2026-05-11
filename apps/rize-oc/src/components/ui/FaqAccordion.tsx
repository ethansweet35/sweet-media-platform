"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-warm">
      {items.map(({ q, a }, i) => (
        <div key={i} className="group">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-6 py-5 text-left"
            aria-expanded={open === i}
          >
            <span
              className={cn(
                "font-[family-name:var(--font-display)] text-[20px] font-normal leading-snug transition-colors",
                open === i ? "text-accent" : "text-ink group-hover:text-accent"
              )}
            >
              {q}
            </span>
            <span
              className={cn(
                "shrink-0 w-8 h-8 rounded-full border flex items-center justify-center mt-0.5 transition-all",
                open === i
                  ? "border-accent bg-accent text-white"
                  : "border-warm text-ink/40 group-hover:border-accent group-hover:text-accent"
              )}
            >
              <i className={cn("text-sm transition-transform duration-200", open === i ? "ri-subtract-line" : "ri-add-line")} />
            </span>
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              open === i ? "max-h-[600px] pb-6" : "max-h-0"
            )}
          >
            <p className="text-[15px] font-light leading-relaxed text-ink/65">{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { useState } from "react";

export type FaqItem = { q: string; a: ReactNode };

type Props = {
  items: FaqItem[];
  /** Default true — numbered 01., 02. prefix (Our Company). Set false for standalone FAQ page. */
  showNumbers?: boolean;
};

export default function CompanyFaqAccordion({ items, showNumbers = true }: Props) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-4 p-5 md:p-5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-[15px] border border-[#166C96]/45 bg-[#0a1428]/80 ${isOpen ? "ring-1 ring-[#166C96]/30" : ""}`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#166C96]/10"
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="font-[var(--font-body)] text-sm font-semibold leading-snug text-white md:text-base">
                {showNumbers ? (
                  <span className="mr-2 tabular-nums text-[#166C96]">{String(i + 1).padStart(2, "0")}.</span>
                ) : null}
                {item.q}
              </span>
              <span className="shrink-0 text-[#166C96]">
                <i className={`${isOpen ? "ri-subtract-line" : "ri-arrow-right-s-line"} text-xl leading-none`} aria-hidden />
              </span>
            </button>
            {isOpen ? (
              <div className="border-t border-[#166C96]/25 bg-[#101E3F]/90 px-5 py-4">
                <div className="max-w-3xl text-sm leading-[1.42] text-white/85 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1.5 [&_strong]:font-semibold [&_strong]:text-white">
                  {item.a}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

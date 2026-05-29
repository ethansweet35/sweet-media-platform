"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function SubstanceFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px w-6 bg-mbh-green" aria-hidden />
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
          FAQ
        </span>
      </div>
      <h2 className="mb-8 font-display text-2xl font-semibold text-mbh-forest lg:text-3xl">
        Frequently asked questions
      </h2>
      <div className="divide-y divide-mbh-forest/8 rounded-2xl border border-mbh-forest/8 bg-cream overflow-hidden">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-[0.9375rem] font-semibold leading-snug text-mbh-ink">
                  {item.q}
                </span>
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isOpen
                      ? "border-mbh-green bg-mbh-green text-white"
                      : "border-mbh-forest/15 text-mbh-body"
                  }`}
                >
                  <i
                    className={`ri-add-line text-sm transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  />
                </span>
              </button>
              {isOpen && (
                <p className="px-6 pb-5 font-body text-sm leading-relaxed text-mbh-body">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

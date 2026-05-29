"use client";

import { useState } from "react";

interface FaqItem { q: string; a: string }

export default function LevelOfCareFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <dl className="divide-y divide-mbh-forest/8">
      {items.map((item, i) => (
        <div key={i} className="py-5">
          <dt>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-start justify-between gap-4 text-left"
              aria-expanded={open === i}
            >
              <span className="font-display text-[0.9375rem] font-semibold leading-snug text-mbh-forest">
                {item.q}
              </span>
              <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-mbh-forest/12 bg-cream transition-colors ${open === i ? "border-mbh-green/30 bg-mbh-green/8" : ""}`}>
                <i className={`ri-${open === i ? "subtract" : "add"}-line text-sm ${open === i ? "text-mbh-green" : "text-mbh-forest/50"}`} aria-hidden />
              </span>
            </button>
          </dt>
          {open === i && (
            <dd className="mt-3 pr-11 font-body text-sm leading-relaxed text-mbh-body">
              {item.a}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

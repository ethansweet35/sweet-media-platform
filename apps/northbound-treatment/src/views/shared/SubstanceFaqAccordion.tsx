"use client";

import { useState, type ReactNode } from "react";

interface SubstanceFaqAccordionProps {
  items: { question: ReactNode; answer: ReactNode }[];
}

/** Substance treatment pages — bordered FAQ accordion with editable slots from server. */
export default function SubstanceFaqAccordion({ items }: SubstanceFaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-sand-dark border border-sand-dark bg-white">
      {items.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-sand/30"
          >
            <span className="font-heading text-sm font-bold text-navy">{faq.question}</span>
            <i
              className={`ri-arrow-down-s-line mt-0.5 shrink-0 text-xl text-terracotta transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i ? (
            <div className="border-t border-sand-dark bg-sand/20 px-6 pb-5 pt-4">{faq.answer}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

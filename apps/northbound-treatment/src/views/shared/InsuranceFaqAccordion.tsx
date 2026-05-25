"use client";

import { useState, type ReactNode } from "react";

interface InsuranceFaqAccordionProps {
  items: { question: ReactNode; answer: ReactNode }[];
}

/** Insurance carrier pages — compact FAQ accordion with editable slots from server. */
export default function InsuranceFaqAccordion({ items }: InsuranceFaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-navy/10">
      {items.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-heading text-base font-bold text-navy">{faq.question}</span>
            <i
              className={`text-lg text-terracotta transition-transform ${
                open === i ? "ri-subtract-line rotate-0" : "ri-add-line"
              }`}
            />
          </button>
          {open === i ? (
            <div className="pb-5 text-sm leading-relaxed text-navy/60">{faq.answer}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

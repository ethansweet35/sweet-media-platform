"use client";

import { useState } from "react";
import type { Faq } from "@/data/faqs";

export default function FaqAccordion({
  eyebrow = "Still Have Questions?",
  title = "Frequently asked questions",
  faqs,
}: {
  eyebrow?: string;
  title?: string;
  faqs: Faq[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <div className="text-center">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-12 divide-y divide-[var(--color-divider)] border-y border-[var(--color-divider)]">
          {faqs.map((faq, i) => {
            const open = openIdx === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? null : i)}
                >
                  <span className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                    {faq.question}
                  </span>
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                    <i
                      className={`text-xl transition-transform duration-200 ${
                        open ? "ri-subtract-line" : "ri-add-line"
                      }`}
                    ></i>
                  </span>
                </button>
                {open && (
                  <div className="pb-6 pr-12">
                    <p className="text-base leading-7 text-[var(--color-ink-muted)]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

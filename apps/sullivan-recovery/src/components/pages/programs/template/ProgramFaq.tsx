"use client";

import { useState } from "react";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import type { ProgramFaq as ProgramFaqItem } from "@/types/programPage";

type Props = {
  items: ProgramFaqItem[];
  title?: string;
  description?: string;
};

export default function ProgramFaq({
  items,
  title = "Detox questions, answered",
  description = "Straightforward answers about withdrawal, insurance, and what happens after detox. Admissions can go deeper on your situation — confidential and available 24/7.",
}: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-14 md:py-20">
      <div className="sr-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="sr-eyebrow mb-4">FAQ</p>
            <h2
              className="mb-4 text-[clamp(2rem,3.5vw,2.75rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h2>
            <p
              className="mb-6 text-[14px] leading-[1.8] text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {description}
            </p>
            <CallRailPhoneLink className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-fern)] transition hover:text-[var(--sr-moss)]">
              <i className="ri-phone-line" aria-hidden />
              Speak with admissions
            </CallRailPhoneLink>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-[var(--sr-sand)] border border-[var(--sr-sand)] bg-[var(--sr-linen)]">
              {items.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left transition hover:bg-[var(--sr-parchment)]/80 md:px-8 md:py-6"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="text-lg font-light leading-snug text-[var(--sr-ink)] md:text-xl"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--sr-sand)] text-[var(--sr-fern)] transition ${isOpen ? "rotate-45 bg-[var(--sr-moss)] text-[var(--sr-parchment)]" : ""}`}
                        aria-hidden
                      >
                        <i className="ri-add-line text-lg" />
                      </span>
                    </button>
                    {isOpen ? (
                      <p
                        className="border-t border-[var(--sr-sand)] px-6 pb-6 pt-4 text-[14px] leading-[1.85] text-[var(--sr-muted)] md:px-8 md:pb-7"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {faq.answer}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

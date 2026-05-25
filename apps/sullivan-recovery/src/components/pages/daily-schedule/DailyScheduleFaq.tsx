"use client";

import { useState } from "react";
import { SCHEDULE_FAQS } from "@/data/dailySchedule";

export default function DailyScheduleFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-14 md:py-20">
      <div className="sr-container">
        <div className="mx-auto max-w-3xl">
          <p className="sr-eyebrow mb-4 text-center">FAQ</p>
          <h2
            className="mb-10 text-center text-[clamp(1.75rem,3.5vw,2.25rem)] font-light text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Questions about daily life in treatment
          </h2>
          <div className="divide-y divide-[var(--sr-sand)] border border-[var(--sr-sand)] bg-[var(--sr-linen)]">
            {SCHEDULE_FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-[var(--sr-parchment)]/80"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="text-lg font-light text-[var(--sr-ink)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--sr-sand)] text-[var(--sr-fern)] ${isOpen ? "rotate-45 bg-[var(--sr-moss)] text-[var(--sr-parchment)]" : ""}`}
                      aria-hidden
                    >
                      <i className="ri-add-line text-lg" />
                    </span>
                  </button>
                  {isOpen ? (
                    <p
                      className="border-t border-[var(--sr-sand)] px-6 pb-6 pt-3 text-[14px] leading-[1.8] text-[var(--sr-body)]"
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
    </section>
  );
}

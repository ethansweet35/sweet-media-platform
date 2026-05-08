"use client";

import { useState } from "react";
import PageHero from "@/components/sections/PageHero";
import BottomCta from "@/components/sections/BottomCta";
import { FAQ_GROUPS } from "@/data/faqs-full";

export default function FaqsPage() {
  const [openKey, setOpenKey] = useState<string | null>(`0-0`);

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Frequently Asked Questions"
        headline="Honest answers from certified interventionists."
        body="The most common questions families ask before, during, and after an intervention. Don't see yours? Pick up the phone — we'll answer it."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          {FAQ_GROUPS.map((group, gi) => (
            <div key={group.title} className="mb-16 last:mb-0">
              <p className="brand-eyebrow text-[var(--color-sage-deep)]">
                {String(gi + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
                {group.title}
              </h2>
              {group.description && (
                <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)]">
                  {group.description}
                </p>
              )}

              <div className="mt-8 divide-y divide-[var(--color-divider)] border-y border-[var(--color-divider)]">
                {group.items.map((q, qi) => {
                  const key = `${gi}-${qi}`;
                  const open = openKey === key;
                  return (
                    <div key={q.question}>
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-6 py-6 text-left"
                        aria-expanded={open}
                        onClick={() => setOpenKey(open ? null : key)}
                      >
                        <span className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                          {q.question}
                        </span>
                        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                          <i
                            className={`text-xl ${
                              open ? "ri-subtract-line" : "ri-add-line"
                            }`}
                          ></i>
                        </span>
                      </button>
                      {open && (
                        <div className="pb-6 pr-12">
                          <p className="text-base leading-7 text-[var(--color-ink-muted)]">
                            {q.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <BottomCta
        title="Don't see your question?"
        body="If something is on your mind that we haven't answered here, we want to hear it. Your first call is free, confidential, and judgment-free."
      />
    </main>
  );
}

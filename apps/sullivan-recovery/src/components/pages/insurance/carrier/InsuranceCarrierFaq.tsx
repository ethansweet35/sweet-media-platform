"use client";

import { useState } from "react";
import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { INSURANCE_VERIFY_BULLETS } from "@/data/insurance";
import { resolveInsurancePageIdentity } from "@/lib/insurancePageIdentity";
import type { InsurancePageData } from "@/types/insurancePage";

type Props = {
  data: InsurancePageData;
  items: InsurancePageData["faqs"];
};

export default function InsuranceCarrierFaq({ data, items }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const identity = resolveInsurancePageIdentity(data);

  return (
    <section className="relative overflow-hidden border-t border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-14 md:py-20">
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[var(--sr-sage)]/15"
        aria-hidden
      />
      <div className="sr-container relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="bg-[var(--sr-moss)] p-8 text-white md:p-9 lg:sticky lg:top-28">
              <p className="sr-eyebrow mb-4 text-[var(--sr-sage)]">FAQ</p>
              <h2
                className="mb-4 text-[clamp(1.75rem,3vw,2.25rem)] font-light leading-[1.08]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {identity.shortName} coverage questions
              </h2>
              <p
                className="mb-8 text-[14px] leading-[1.8] text-white/75"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Every plan is different. Admissions can walk through deductibles,
                authorization, and residential benefits for your specific policy.
              </p>

              <ul className="mb-8 space-y-4 border-t border-white/15 pt-6">
                {INSURANCE_VERIFY_BULLETS.slice(0, 3).map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--sr-sage)]/35 text-[var(--sr-sage)]">
                      <i className={`${icon} text-sm`} aria-hidden />
                    </span>
                    <span
                      className="text-[13px] leading-[1.6] text-white/80"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <Link
                  href="/insurance/#verify-form"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--sr-sage)] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Verify benefits
                  <i className="ri-shield-check-line text-sm" aria-hidden />
                </Link>
                <CallRailPhoneLink className="inline-flex items-center justify-center gap-2 border border-white/35 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10">
                  <i className="ri-phone-fill text-sm" aria-hidden />
                  Call admissions
                </CallRailPhoneLink>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="shadow-sm">
              {items.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={faq.question}
                    className={`border border-[var(--sr-sand)] ${i > 0 ? "-mt-px" : ""} ${isOpen ? "relative z-[1] border-[var(--sr-moss)] bg-[var(--sr-linen)]" : "bg-[var(--sr-linen)]"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start gap-4 px-6 py-5 text-left transition hover:bg-[var(--sr-parchment)]/60 md:gap-6 md:px-8 md:py-6"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center text-[11px] font-semibold tabular-nums ${isOpen ? "bg-[var(--sr-moss)] text-[var(--sr-sage)]" : "border border-[var(--sr-sand)] text-[var(--sr-fern)]"}`}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className="block text-lg font-light leading-snug text-[var(--sr-ink)] md:text-xl"
                          style={{ fontFamily: "var(--font-cormorant)" }}
                        >
                          {faq.question}
                        </span>
                      </span>
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border transition ${isOpen ? "rotate-45 border-[var(--sr-moss)] bg-[var(--sr-moss)] text-[var(--sr-parchment)]" : "border-[var(--sr-sand)] text-[var(--sr-fern)]"}`}
                        aria-hidden
                      >
                        <i className="ri-add-line text-lg" />
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="border-t border-[var(--sr-sand)] px-6 pb-6 pt-1 md:px-8 md:pb-7">
                        <p
                          className="pl-[52px] text-[14px] leading-[1.85] text-[var(--sr-body)] md:pl-[60px]"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {faq.answer}
                        </p>
                      </div>
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

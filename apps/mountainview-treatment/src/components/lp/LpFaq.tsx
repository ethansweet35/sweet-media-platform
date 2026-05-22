"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

const DEFAULT_FAQS = [
  {
    q: "Does Mountain View Treatment accept my insurance?",
    a: "We accept most major PPO insurance plans including Cigna, Aetna, United Health, Anthem, Regence, and Premera. Our admissions team verifies your benefits directly with your insurer — at no cost to you — before treatment begins, so you have a clear picture of your coverage.",
  },
  {
    q: "Can I keep working while in outpatient treatment?",
    a: "Yes — that is precisely what our outpatient programs are designed for. We offer morning, afternoon, and evening scheduling tracks to accommodate full-time work, school, or family responsibilities. Many of our clients maintain their careers throughout the entire course of treatment.",
  },
  {
    q: "What is the difference between IOP and PHP?",
    a: "Partial Hospitalization (PHP) involves 25–30 hours of structured programming per week — typically 5–6 hours a day, 5 days a week. Intensive Outpatient (IOP) is 9–12 hours per week, 3–5 days. IOP allows more flexibility for daily responsibilities and is often used as a step-down from PHP.",
  },
  {
    q: "Do you treat co-occurring mental health conditions?",
    a: "Absolutely. Dual diagnosis — treating addiction and co-occurring mental health conditions simultaneously — is a core part of our clinical model. We treat anxiety, depression, PTSD, trauma, bipolar disorder, and personality disorders alongside substance use disorders.",
  },
  {
    q: "How do I get started or request an assessment?",
    a: `You can call us anytime at ${SITE.phone.display} — our admissions team is available 24/7. You can also submit your information through our insurance verification form and we will reach out within a few hours to schedule your clinical assessment, which is typically available same-day.`,
  },
];

interface LpFaqProps {
  faqs?: { q: string; a: string }[];
}

export default function LpFaq({ faqs = DEFAULT_FAQS }: LpFaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--mvt-cream)] py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid lg:grid-cols-[300px_1fr] gap-14 lg:gap-20 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <p className="mvt-eyebrow mb-5">FAQ</p>
            <h2
              className="font-heading font-light text-[var(--mvt-ink)] leading-[1.05] mb-5"
              style={{ fontSize: "clamp(30px, 3.2vw, 44px)" }}
            >
              Common<br />
              <em className="italic text-[var(--mvt-muted)]">Questions</em>
            </h2>
            <p className="text-[14px] font-light leading-relaxed text-[var(--mvt-muted)]">
              Still have questions? Call our admissions team 24/7 — we are always here to help.
            </p>
            <a
              href={SITE.phone.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--mvt-forest)] hover:text-[var(--mvt-ink)] transition-colors"
            >
              <i className="ri-phone-line text-sm" aria-hidden="true" />
              {SITE.phone.display}
            </a>
          </div>

          {/* Right — accordion */}
          <div className="divide-y divide-[var(--mvt-cream-2)] border-t border-b border-[var(--mvt-cream-2)]">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between px-0 py-5 text-left group gap-4"
                >
                  <span className={`text-[15px] font-light leading-snug transition-colors duration-200 ${open === i ? "text-[var(--mvt-ink)]" : "text-[var(--mvt-text)] group-hover:text-[var(--mvt-ink)]"}`}>
                    {faq.q}
                  </span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-200 mt-0.5 ${open === i ? "bg-[var(--mvt-forest)] border-[var(--mvt-forest)] text-white" : "border-[var(--mvt-cream-2)] text-[var(--mvt-muted)] group-hover:border-[var(--mvt-forest)]/40"}`}>
                    <i className={`text-sm ${open === i ? "ri-subtract-line" : "ri-add-line"}`} aria-hidden="true" />
                  </span>
                </button>
                {open === i && (
                  <div className="pb-5">
                    <p className="text-[14px] font-light leading-relaxed text-[var(--mvt-muted)]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

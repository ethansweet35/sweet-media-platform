"use client";

import { useState } from "react";
import { CONTAINER } from "@/data/site";

/**
 * Section 10 — FAQ accordion
 * Design: white bg, clean accordion — one open at a time.
 */

const FAQS = [
  {
    q: "How do I know if I or a loved one needs treatment?",
    a: "Common indicators include persistent sadness, anxiety, or hopelessness; significant changes in sleep or appetite; difficulty concentrating; loss of interest in activities; increased irritability; social withdrawal; substance misuse; or thoughts of self-harm. If these challenges are impacting daily life, seeking professional help is a positive and courageous step.",
  },
  {
    q: "What types of behavioral health conditions do you treat?",
    a: "We treat a wide range of mental health and substance use disorders including anxiety, depression, trauma and PTSD, bipolar disorder, borderline personality disorder, OCD, ADHD, and addiction to alcohol, opioids, methamphetamine, fentanyl, cocaine, benzodiazepines, and more.",
  },
  {
    q: "What's your approach to treatment and therapy?",
    a: "We use evidence-based, individualized treatment plans combining medical support, behavioral therapy (CBT, DBT, EMDR), group therapy, and holistic modalities. Our trauma-informed team addresses both the symptoms and the underlying issues driving mental health and addiction challenges.",
  },
  {
    q: "What payment options are accepted?",
    a: "We accept most private health insurance plans — including Aetna, Anthem Blue Cross, Blue Cross Blue Shield, Cigna, Beacon, Carelon, GEHA, and Cox Health. We also offer private-pay options. Our administrative team will verify your benefits at no cost before you begin treatment.",
  },
  {
    q: "How do I take the first step?",
    a: "Simply call us at any time — our admissions coordinators are available 24/7. You can also complete our online contact form. All inquiries are 100% confidential and HIPAA-compliant. We'll guide you through every step of the admission process with compassion and clarity.",
  },
] as const;

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-[100px]">
      <div className={CONTAINER}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16 xl:gap-24">

          {/* Left label */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                FAQ
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
              Questions answered.
            </h2>
            <p className="mt-5 font-body text-sm leading-relaxed text-mbh-body">
              Find answers to common questions about our counseling services, therapy sessions, and
              how we can support your mental well-being journey.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="divide-y divide-mbh-forest/8">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-[0.9375rem] font-semibold leading-snug text-mbh-ink">
                      {faq.q}
                    </span>
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isOpen
                          ? "border-mbh-green bg-mbh-green text-white"
                          : "border-mbh-forest/20 text-mbh-body"
                      }`}
                    >
                      <i
                        className={`ri-add-line text-sm transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        aria-hidden
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 font-body text-sm leading-relaxed text-mbh-body">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

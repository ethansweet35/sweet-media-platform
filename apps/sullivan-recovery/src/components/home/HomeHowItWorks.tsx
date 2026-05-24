"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TRAIL_IMAGE =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_process_trail.jpg";

const STEPS = [
  {
    icon: "ri-phone-line",
    num: "01",
    title: "First Contact",
    desc: "Call us or fill out our form. Our team picks up every time — 24 hours a day.",
  },
  {
    icon: "ri-stethoscope-line",
    num: "02",
    title: "Clinical Assessment",
    desc: "A confidential evaluation of your history, health, and needs to build your personalized plan.",
  },
  {
    icon: "ri-shield-check-line",
    num: "03",
    title: "Insurance Verified",
    desc: "We confirm your coverage and maximize your benefits before anything else.",
  },
  {
    icon: "ri-home-heart-line",
    num: "04",
    title: "Same-Day Admission",
    desc: "Move in the same day. Private room, settled in, care begins immediately.",
  },
  {
    icon: "ri-pulse-line",
    num: "05",
    title: "Medical Detox",
    desc: "24/7 monitored detox with medication support to safely clear substances from your body.",
  },
  {
    icon: "ri-mental-health-line",
    num: "06",
    title: "Therapy & Aftercare",
    desc: "CBT, DBT, group sessions, and a full aftercare plan built around your long-term sobriety.",
  },
];

const FAQS = [
  {
    q: "What determines how long detox takes?",
    a: "The substance used, duration of use, and your individual health all play a role. Alcohol and benzodiazepines may require several medically supervised days. Opioids often involve medication-assisted treatment. Our team assesses this on day one and communicates a clear timeline with you.",
  },
  {
    q: "Can I keep my phone during treatment?",
    a: "Yes. Unlike many facilities, we allow you to keep your phone. Staying connected to your support system is part of recovery, not a distraction from it.",
  },
  {
    q: "What therapies are offered?",
    a: "CBT, DBT, Motivational Enhancement Therapy, individual counseling, group therapy, and family therapy. We also offer surf therapy, music therapy, and mindfulness practices as part of our holistic approach.",
  },
  {
    q: "Does insurance cover treatment?",
    a: "Most PPO plans cover a significant portion of detox and residential treatment. We verify benefits before admission and work with you to maximize every dollar of your coverage.",
  },
];

export default function HomeHowItWorks() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[var(--sr-parchment)] py-[100px]">
      <div className="sr-container">

        {/* ── Section header ─────────────────────── */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="sr-eyebrow mb-4">The Process</p>
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              How it <br />
              <span className="italic text-[var(--sr-fern)]">works</span>
            </h2>
          </div>
          <div className="flex items-end lg:col-span-7">
            <p
              className="text-base leading-relaxed text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              From your first call to long-term sobriety — a clear, supported
              path designed around you. Here's exactly what to expect.
            </p>
          </div>
        </div>

        {/* ── Steps + Image (two-column) ────────── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">

          {/* Steps 3-column flush grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-0 border-t border-l border-[var(--sr-sand)] sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className="group flex flex-col gap-5 border-r border-b border-[var(--sr-sand)] bg-white p-7 transition-colors duration-300 hover:bg-[var(--sr-moss)]"
                >
                  {/* Icon + number row */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center bg-[var(--sr-parchment)] transition-colors duration-300 group-hover:bg-[var(--sr-bark)]">
                      <i className={`${step.icon} text-xl text-[var(--sr-moss)] transition-colors duration-300 group-hover:text-[var(--sr-parchment)]`} />
                    </div>
                    <span
                      className="text-3xl font-light text-[var(--sr-sand)] transition-colors duration-300 group-hover:text-[var(--sr-sage)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Text */}
                  <div>
                    <h3
                      className="mb-2 text-xl font-light text-[var(--sr-ink)] transition-colors duration-300 group-hover:text-white"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-[13px] leading-relaxed text-[var(--sr-muted)] transition-colors duration-300 group-hover:text-[var(--sr-parchment)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tall image column */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="relative h-full min-h-[420px] overflow-hidden">
              <Image
                src={TRAIL_IMAGE}
                alt="Person walking a California forest trail at golden hour"
                fill
                className="object-cover object-center"
              />
              {/* Dark bottom fade with CTA */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 bg-gradient-to-t from-[var(--sr-charcoal)]/90 to-transparent px-8 pb-8 pt-24">
                <p
                  className="text-lg italic leading-snug text-white/90"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  "Recovery that feels like living again."
                </p>
                <Link
                  href="/admissions-process/"
                  className="inline-flex items-center gap-2 bg-[var(--sr-parchment)] px-5 py-3 text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--sr-moss)] transition hover:bg-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Get Started
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ strip ─────────────────────────── */}
        <div className="mt-14 border-t border-[var(--sr-sand)]">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-[var(--sr-sand)]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-8 py-6 text-left"
                >
                  <span
                    className={`flex-1 text-lg font-light transition-colors duration-200 md:text-xl ${isOpen ? "text-[var(--sr-moss)]" : "text-[var(--sr-ink)] group-hover:text-[var(--sr-moss)]"}`}
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 text-xl transition-all duration-300 ${isOpen ? "rotate-45 text-[var(--sr-fern)]" : "text-[var(--sr-muted)]"}`}
                  >
                    <i className="ri-add-line" />
                  </span>
                </button>
                {isOpen && (
                  <p
                    className="pb-6 pr-12 text-sm leading-7 text-[var(--sr-body)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

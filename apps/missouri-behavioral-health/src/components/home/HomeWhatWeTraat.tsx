"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTAINER } from "@/data/site";

/**
 * Section 4 — What We Treat
 * Design: cream-alt bg, two-tab switcher (Mental Health / Addiction).
 * Items render as a compact masonry-style pill/tag grid.
 */

const MENTAL_HEALTH = [
  { label: "Anxiety", href: "/anxiety-therapist-springfield-mo-3" },
  { label: "Depression", href: "/depression-therapist-springfield-mo" },
  { label: "Trauma & PTSD", href: "/trauma-therapist-springfield-mo-2" },
  { label: "Bipolar Disorder", href: "/bipolar-treatment-centers-in-missouri-2-2" },
  { label: "Borderline Personality Disorder", href: "/bpd-treatment-missouri" },
  { label: "Dissociative Disorder", href: "/services" },
  { label: "OCD", href: "/ocd-treatment-in-missouri" },
  { label: "ADD / ADHD", href: "/adhd-treatment-springfield-mo" },
  { label: "Personality Disorders", href: "/services" },
];

const ADDICTION = [
  { label: "Alcohol", href: "/alcohol-rehab-center-in-missouri" },
  { label: "Cocaine", href: "/cocaine-detox-in-missouri" },
  { label: "Fentanyl", href: "/fentanyl-rehab-springfield-mo" },
  { label: "Methamphetamine", href: "/meth-rehab-springfield-mo" },
  { label: "Opioids", href: "/drug-rehab-in-springfield-mo" },
  { label: "Benzodiazepines", href: "/benzodiazepine-detox-in-missouri" },
  { label: "Heroin", href: "/heroin-rehab-springfield-mo" },
  { label: "Stimulants", href: "/services" },
  { label: "Marijuana", href: "/services" },
  { label: "Hallucinogens", href: "/services" },
];

const TABS = [
  { id: "mental-health", label: "Mental Health", items: MENTAL_HEALTH },
  { id: "addiction", label: "Addiction", items: ADDICTION },
] as const;

export default function HomeWhatWeTraat() {
  const [active, setActive] = useState<"mental-health" | "addiction">("mental-health");
  const current = TABS.find((t) => t.id === active)!;

  return (
    <section className="bg-cream-alt py-[100px]">
      <div className={CONTAINER}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 xl:gap-20">

          {/* Left — heading + switcher */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  What We Treat
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
                Addiction &amp; mental health disorders.
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-mbh-body">
                Our licensed clinical team treats a wide range of conditions using
                evidence-based, individualized care — for both mental health and
                substance use disorders.
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-2 rounded-full bg-white p-1 shadow-sm ring-1 ring-black/5 w-fit">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`rounded-full px-5 py-2 font-body text-sm font-semibold transition-all ${
                    active === tab.id
                      ? "bg-mbh-forest text-white shadow-sm"
                      : "text-mbh-body hover:text-mbh-forest"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right — conditions grid */}
          <div>
            <div className="flex flex-wrap gap-2.5">
              {current.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 bg-white px-5 py-2.5 font-body text-sm font-medium text-mbh-ink shadow-sm transition-all hover:border-mbh-green hover:bg-mbh-green hover:text-white hover:shadow-md"
                >
                  <i className="ri-arrow-right-up-line text-xs text-mbh-green/60 transition-colors group-hover:text-white" aria-hidden />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-mbh-forest/10 bg-mbh-forest px-6 py-5 text-white">
              <div className="flex items-start gap-4">
                <i className="ri-phone-line mt-0.5 text-xl text-mbh-sage shrink-0" aria-hidden />
                <div>
                  <p className="font-display text-sm font-semibold">
                    Not sure where to start?
                  </p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-white/70">
                    Our admissions team is available 24/7 to help you find the right program.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-sage hover:underline underline-offset-4"
                  >
                    Talk to admissions <i className="ri-arrow-right-line" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

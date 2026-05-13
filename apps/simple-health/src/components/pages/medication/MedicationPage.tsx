"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SideEffect = {
  name: string;
  frequency: "Very Common" | "Common" | "Uncommon";
  severity: string;
  description: string;
};

export type Trial = {
  name: string;
  participants: string;
  duration: string;
  statValue: string;
  statLabel: string;
  description: string;
};

export type DoseStep = {
  weeks: string;
  dose: string;
  note: string;
};

export type MedicationPageData = {
  slug: string;
  efficacyTier: string;
  name: string;
  headline: string;
  startingPrice: string;
  description: string;
  heroImage: string;
  features: { icon: string; title: string; subtitle: string; description: string }[];
  howItWorks: {
    title: string;
    description: string;
    pathways: { label: string; items: string[] }[];
    table: { metric: string; value: string }[];
  };
  trials: Trial[];
  dosingSteps: DoseStep[];
  dosingNote?: string;
  sideEffects: SideEffect[];
  faqs: { q: string; a: string }[];
};

// ── Shared constants ──────────────────────────────────────────────────────────

const SCHEDULE_CTA = "https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13219022";
const cx = "mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12";

const trustBadges = [
  { icon: "ri-shield-check-line", label: "Licensed Metabolic MDs" },
  { icon: "ri-time-line", label: "24hr Review" },
  { icon: "ri-map-pin-2-line", label: "Full U.S. Coverage" },
];

const consultationTiers = [
  {
    label: "Generic Consultation",
    subtitle: "Includes Any & All Services",
    firstVisit: "$400", followUp: "$150",
    includes: ["Complete health assessment", "All service areas covered", "Personalized treatment plan", "Prescription if appropriate"],
  },
  {
    label: "Specialized Consultation",
    subtitle: "Skin, Hair, Wellness, Labs, Galleri",
    firstVisit: "$300", followUp: "$150",
    includes: ["Focused specialty review", "Lab analysis included", "Targeted treatment approach", "Follow-up protocol"],
  },
  {
    label: "Peptide Consultation",
    subtitle: "Weight loss & metabolic therapies",
    firstVisit: "$200", followUp: "$100",
    includes: ["Metabolic assessment", "GLP-1 or peptide evaluation", "Dosing strategy", "Prescription included"],
  },
];

const scienceTabs = ["HOW IT WORKS", "CLINICAL TRIALS", "DOSING SCHEDULE"] as const;
type ScienceTab = (typeof scienceTabs)[number];

// ── Sub-components ────────────────────────────────────────────────────────────

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <i className="ri-check-line mt-0.5 shrink-0 text-[#C67B5C]" aria-hidden />
      <span className="text-sm text-[#3A3A3A]">{text}</span>
    </li>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E2D9] last:border-0">
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-serif text-[1.05rem] text-[#2A2A2A]">{q}</span>
        <i className={`ri-arrow-down-s-line shrink-0 text-xl text-[#C67B5C] transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && <p className="pb-5 text-sm leading-7 text-[#555]">{a}</p>}
    </div>
  );
}

function FrequencyBadge({ freq }: { freq: SideEffect["frequency"] }) {
  const styles: Record<string, string> = {
    "Very Common": "bg-[#C67B5C] text-white",
    "Common": "bg-[#3d4c36] text-white",
    "Uncommon": "bg-[#888] text-white",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${styles[freq] ?? styles["Common"]}`}>
      {freq}
    </span>
  );
}

// ── Main template ─────────────────────────────────────────────────────────────

export function MedicationPage({ data }: { data: MedicationPageData }) {
  const [activeTab, setActiveTab] = useState<ScienceTab>("HOW IT WORKS");

  return (
    <div className="bg-[#FAF7F4] text-[#3A3A3A]">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] pb-16 pt-14 md:pb-20 md:pt-18">
        <div className={cx}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left */}
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#888]">
                {data.efficacyTier}
              </p>
              <h1 className="mt-2 font-serif text-4xl leading-[1.1] md:text-5xl lg:text-[3.2rem]">
                <span className="text-[#C67B5C]">{data.name}</span>
                <br />
                <span className="text-[#2A2A2A]">{data.headline}</span>
              </h1>
              <p className="mt-2 font-serif text-lg text-[#C67B5C]">{data.startingPrice}</p>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#555]">{data.description}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={SCHEDULE_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#C67B5C] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#B86B4E]"
                >
                  <i className="ri-arrow-right-line" aria-hidden />
                  Get Started
                </a>
                <a
                  href="#science"
                  className="inline-flex items-center gap-2 rounded-md bg-[#2A2A2A] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#3A3A3A]"
                >
                  <i className="ri-download-line" aria-hidden />
                  Read The Science
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-5">
                {trustBadges.map((b) => (
                  <span key={b.label} className="flex items-center gap-2 text-sm text-[#555]">
                    <i className={`${b.icon} text-base text-[#C67B5C]`} aria-hidden />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — medication image */}
            <div className="overflow-hidden rounded-3xl bg-[#F5F0EA] shadow-sm">
              <Image
                src={data.heroImage}
                alt={`${data.name} medication`}
                width={680}
                height={520}
                className="h-[420px] w-full object-contain p-8 md:h-[480px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature callouts (dark) ──────────────────────────────────── */}
      <section className="bg-[#2A2A2A] py-14 md:py-16">
        <div className={cx}>
          <div className="grid gap-8 md:grid-cols-3">
            {data.features.map((f) => (
              <div key={f.title}>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C67B5C]/20 text-[#C67B5C]">
                    <i className={`${f.icon} text-sm`} aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-white">{f.title}</span>
                </div>
                <p className="mt-3 font-serif text-xl font-semibold text-[#C67B5C]">{f.subtitle}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Science tabs ─────────────────────────────────────────────── */}
      <section id="science" className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={cx}>
          <div className="text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              The Science, in Full Detail
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              We believe patients deserve to understand exactly how and why their treatment works.
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {scienceTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                  activeTab === tab
                    ? "bg-[#3d4c36] text-white shadow-sm"
                    : "bg-white text-[#555] ring-1 ring-[#D8D3CC] hover:bg-[#F5F0EB]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* HOW IT WORKS */}
          {activeTab === "HOW IT WORKS" && (
            <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
              {/* Left: title + description + CTA + pathway cards (all in left col, matching WP) */}
              <div>
                <h3 className="font-serif text-2xl text-[#2A2A2A] md:text-[1.85rem]">
                  {data.howItWorks.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#555]">{data.howItWorks.description}</p>
                <a
                  href={SCHEDULE_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#C67B5C] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#B86B4E]"
                >
                  <i className="ri-arrow-right-line" aria-hidden />
                  Get Started
                </a>
                {/* Pathway cards — stacked in left col; compact when multiple */}
                <div className={`mt-5 ${data.howItWorks.pathways.length > 1 ? "space-y-3" : ""}`}>
                  {data.howItWorks.pathways.map((pw) => (
                    <div key={pw.label} className="rounded-2xl bg-white p-5 ring-1 ring-[#E8E2D9]">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#C67B5C]" aria-hidden />
                        <p className="font-semibold text-[#2A2A2A]">{pw.label}</p>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {pw.items.map((item) => <CheckItem key={item} text={item} />)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: comparison table */}
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-[#E8E2D9]">
                <div className="grid grid-cols-2 border-b border-[#E8E2D9] px-6 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#888]">
                  <span>Metric</span>
                  <span>{data.name}</span>
                </div>
                {data.howItWorks.table.map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 px-6 py-3.5 ${i % 2 === 0 ? "bg-[#FAFAF8]" : "bg-white"}`}
                  >
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#888]">{row.metric}</span>
                    <span className="text-sm font-medium text-[#2A2A2A]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CLINICAL TRIALS */}
          {activeTab === "CLINICAL TRIALS" && (
            <div className="mt-10 space-y-6">
              {data.trials.map((trial) => (
                <div key={trial.name} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#E8E2D9]">
                  <div className="grid gap-6 lg:grid-cols-[1fr_200px]">
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#888]">
                        {trial.participants} · {trial.duration}
                      </p>
                      <h3 className="mt-1 font-serif text-xl text-[#2A2A2A]">{trial.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#555]">{trial.description}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-[#FAF7F4] px-4 py-5 text-center ring-1 ring-[#E8E2D9]">
                      <p className="font-serif text-3xl font-semibold text-[#C67B5C]">{trial.statValue}</p>
                      <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#888]">
                        {trial.statLabel}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DOSING SCHEDULE */}
          {activeTab === "DOSING SCHEDULE" && (
            <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h3 className="font-serif text-xl text-[#2A2A2A]">Standard Titration Protocol</h3>
                {data.dosingNote && (
                  <p className="mt-2 text-sm leading-6 text-[#555]">{data.dosingNote}</p>
                )}
                {/* Single card with all steps as compact table rows */}
                <div className="mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-[#E8E2D9]">
                  {/* Table header */}
                  <div className="grid grid-cols-[80px_80px_1fr] border-b border-[#E8E2D9] bg-[#FAFAF8] px-5 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#888]">
                    <span>Phase</span>
                    <span>Dose</span>
                    <span>Notes</span>
                  </div>
                  {data.dosingSteps.map((step, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[80px_80px_1fr] items-center px-5 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"} ${i < data.dosingSteps.length - 1 ? "border-b border-[#F0EBE4]" : ""}`}
                    >
                      <span className="text-[0.65rem] font-semibold text-[#C67B5C]">{step.weeks}</span>
                      <span className="font-serif text-lg font-semibold text-[#2A2A2A]">{step.dose}</span>
                      <span className="text-sm text-[#666]">{step.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#2A2A2A] p-7">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#C67B5C]">
                  Important
                </p>
                <h3 className="mt-2 font-serif text-xl text-white">Administration Protocol</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "Once weekly injection on the same day each week",
                    "Rotate injection sites: abdomen, outer thigh, or upper arm",
                    "Gradual titration minimizes GI side effects",
                    "Your provider adjusts your dose based on your response",
                    "Medication prescribed only where clinically appropriate",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <i className="ri-check-line mt-0.5 shrink-0 text-[#C67B5C]" aria-hidden />
                      <span className="text-sm text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Side effects ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className={cx}>
          <div className="text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Full Transparency
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              Side effects, honestly
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-sm leading-7 text-[#555]">
              We believe informed patients get better outcomes. Here&apos;s exactly what clinical
              trials report — with context on how common each effect is and how to manage it.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.sideEffects.map((se) => (
              <div key={se.name} className="rounded-2xl bg-[#FAF7F4] p-6 ring-1 ring-[#E8E2D9]">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-serif text-lg text-[#C67B5C]">{se.name}</p>
                  <FrequencyBadge freq={se.frequency} />
                </div>
                <p className="mt-1 text-xs font-semibold text-[#555]">Severity: {se.severity}</p>
                <p className="mt-3 text-sm leading-6 text-[#666]">{se.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
                Questions about {data.name}
              </h2>
              <p className="mt-3 text-sm text-[#888]">Detailed answers to the most important questions</p>
            </div>
            <div className="mt-8 rounded-3xl bg-white px-8 py-2 shadow-sm ring-1 ring-[#E8E2D9]">
              {data.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Consultation Fees ─────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className={cx}>
          <div className="text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Transparent Pricing
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              Consultation Fees
            </h2>
            <p className="mt-4 text-sm text-[#555]">Physician-guided care with complete pricing clarity.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {consultationTiers.map((tier) => (
              <div key={tier.label} className="flex flex-col rounded-3xl bg-[#FAF7F4] p-7 shadow-sm ring-1 ring-[#E8E2D9]">
                <h3 className="font-serif text-xl text-[#2A2A2A]">{tier.label}</h3>
                <p className="mt-1 text-xs text-[#888]">{tier.subtitle}</p>
                <div className="mt-6 grid grid-cols-2 divide-x divide-[#E8E2D9] rounded-2xl bg-white py-4 ring-1 ring-[#E8E2D9]">
                  <div className="px-5 text-center">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#888]">First Visit</p>
                    <p className="mt-1.5 font-serif text-2xl font-semibold text-[#C67B5C]">{tier.firstVisit}</p>
                  </div>
                  <div className="px-5 text-center">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#888]">Follow-Up</p>
                    <p className="mt-1.5 font-serif text-2xl font-semibold text-[#C67B5C]">{tier.followUp}</p>
                  </div>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.includes.map((item) => <CheckItem key={item} text={item} />)}
                </ul>
                <a
                  href={SCHEDULE_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C67B5C]/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9A5640] transition hover:bg-[#C67B5C]/6"
                >
                  Get Started
                  <i className="ri-arrow-right-line" aria-hidden />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

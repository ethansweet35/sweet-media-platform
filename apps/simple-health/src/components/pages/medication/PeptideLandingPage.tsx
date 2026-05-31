"use client";

import Image from "next/image";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PeptideMechanism = {
  name: string;       // "Pituitary Stimulation"
  badge: string;      // "GH Foundation"
  description: string;
  result: string;     // "Result: ..."
};

export type PeptideBenefit = {
  icon: string;
  title: string;
  description: string;
};

export type TimelinePhase = {
  phase: string;      // "Weeks 1–2"
  title: string;      // "Improved Sleep Quality"
  description: string;
};

export type PeptideLandingData = {
  slug: string;
  efficacyTier: string;
  name: string;
  headline: string;
  startingPrice: string;
  delivery: string;
  resultsIn: string;
  description: string;
  heroImage: string;
  mechanismTitle: string;
  mechanismSubtitle?: string;
  mechanisms: PeptideMechanism[];
  benefits: PeptideBenefit[];
  timeline: TimelinePhase[];
  faqs: { q: string; a: string }[];
};

// ── Shared constants ──────────────────────────────────────────────────────────

const SCHEDULE_CTA = "https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13219022";
const cx = "mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12";

const consultationTiers = [
  { label: "Generic Consultation", subtitle: "Includes Any & All Services", firstVisit: "$400", followUp: "$150", includes: ["Complete health assessment", "All service areas covered", "Personalized treatment plan", "Prescription if appropriate"] },
  { label: "Specialized Consultation", subtitle: "Skin, Hair, Wellness, Labs, Galleri", firstVisit: "$300", followUp: "$150", includes: ["Focused specialty review", "Lab analysis included", "Targeted treatment approach", "Follow-up protocol"] },
  { label: "Peptide Consultation", subtitle: "Weight loss & metabolic therapies", firstVisit: "$200", followUp: "$100", includes: ["Metabolic assessment", "GLP-1 or peptide evaluation", "Dosing strategy", "Prescription included"] },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function CheckItem({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <i className={`ri-check-line mt-0.5 shrink-0 ${light ? "text-white/70" : "text-[#C67B5C]"}`} aria-hidden />
      <span className={`text-sm ${light ? "text-white/80" : "text-[#3A3A3A]"}`}>{text}</span>
    </li>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E2D9] last:border-0">
      <button className="flex w-full items-center justify-between gap-4 py-5 text-left" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span className="font-serif text-[1.05rem] text-[#2A2A2A]">{q}</span>
        <i className={`ri-arrow-down-s-line shrink-0 text-xl text-[#C67B5C] transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && <p className="pb-5 text-sm leading-7 text-[#555]">{a}</p>}
    </div>
  );
}

// ── Main template ─────────────────────────────────────────────────────────────

export function PeptideLandingPage({ data }: { data: PeptideLandingData }) {
  return (
    <div className="bg-[#FAF7F4] text-[#3A3A3A]">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] pb-16 pt-14 md:pb-20 md:pt-18">
        <div className={cx}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
                <a href={SCHEDULE_CTA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#C67B5C] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#B86B4E]">
                  <i className="ri-calendar-check-line" aria-hidden />
                  Schedule Consultation
                </a>
                <a href="#science"
                  className="inline-flex items-center gap-2 rounded-md bg-[#2A2A2A] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#3A3A3A]">
                  <i className="ri-microscope-line" aria-hidden />
                  Read The Science
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-6">
                {[
                  { icon: "ri-shield-check-line", label: "Licensed Metabolic MDs" },
                  { icon: "ri-time-line", label: data.delivery },
                  { icon: "ri-bar-chart-2-line", label: data.resultsIn },
                ].map((b) => (
                  <span key={b.label} className="flex items-center gap-2 text-sm text-[#555]">
                    <i className={`${b.icon} text-base text-[#C67B5C]`} aria-hidden />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl bg-[#F5F0EA] shadow-sm">
              <Image
                src={data.heroImage}
                alt={`${data.name} peptide therapy`}
                width={680}
                height={520}
                className="h-[420px] w-full object-contain p-8 md:h-[480px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mechanism section ─────────────────────────────────────────── */}
      <section id="science" className="bg-white py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              {data.mechanismTitle}
            </h2>
            {data.mechanismSubtitle && (
              <p className="mt-3 text-sm leading-7 text-[#555]">{data.mechanismSubtitle}</p>
            )}
          </div>

          <div className={`mt-10 grid gap-6 ${
            data.mechanisms.length === 2 ? "md:grid-cols-2" :
            data.mechanisms.length === 4 ? "md:grid-cols-2" :
            "md:grid-cols-3"
          }`}>
            {data.mechanisms.map((m, i) => (
              <div key={m.name} className="rounded-2xl bg-[#FAF7F4] p-7 ring-1 ring-[#E8E2D9]">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C67B5C]/15 text-xs font-bold text-[#C67B5C]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#888]">{m.badge}</p>
                    <p className="mt-0.5 font-semibold text-[#2A2A2A]">{m.name}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#555]">{m.description}</p>
                <p className="mt-4 rounded-lg bg-[#C67B5C]/8 px-3 py-2 text-xs font-semibold text-[#9A5640]">
                  {m.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clinical benefits ─────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Clinical Benefits
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              What you can expect from {data.name} therapy
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.benefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E8E2D9]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C67B5C]/12 text-[#C67B5C]">
                  <i className={`${b.icon} text-lg`} aria-hidden />
                </span>
                <h3 className="mt-4 font-semibold text-[#2A2A2A]">{b.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#555]">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              The Process
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              What to expect &amp; when
            </h2>
            <p className="mt-3 text-sm text-[#888]">Realistic timeline for {data.name} results</p>
          </div>

          <div className="mt-10 mx-auto max-w-2xl space-y-4">
            {data.timeline.map((t, i) => (
              <div key={i} className="flex gap-5 rounded-2xl bg-[#FAF7F4] p-5 ring-1 ring-[#E8E2D9]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C67B5C]/15 text-[0.72rem] font-bold text-[#C67B5C]">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#C67B5C]">
                    {t.phase}
                  </p>
                  <p className="mt-0.5 font-semibold text-[#2A2A2A]">{t.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#555]">{t.description}</p>
                </div>
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
                Common questions
              </h2>
              <p className="mt-3 text-sm text-[#888]">
                Everything you need to know about {data.name} therapy
              </p>
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
                <a href={SCHEDULE_CTA} target="_blank" rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C67B5C]/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9A5640] transition hover:bg-[#C67B5C]/6">
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

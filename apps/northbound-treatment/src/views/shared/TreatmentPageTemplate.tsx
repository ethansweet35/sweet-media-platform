"use client";

import Image from "next/image";
import { heroInnerWrap, heroViewportSection } from "@/lib/heroSpacing";
import Link from "next/link";
import { useState } from "react";
import CtmLeadFormCard from "@/components/feature/CtmLeadFormCard";
import CtaBanner from "./CtaBanner";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

/* ─── Types ─────────────────────────────────────────────────── */

export interface TreatmentFact {
  icon: string;
  label: string;
  value: string;
}

export interface TreatmentStep {
  number: string;
  title: string;
  body: string;
  icon: string;
}

export interface TreatmentDifferentiator {
  icon: string;
  title: string;
  body: string;
}

export interface ContinuumStep {
  label: string;
  href: string;
  icon: string;
  current?: boolean;
}

export interface TreatmentFaq {
  q: string;
  a: string;
}

export interface TreatmentPageData {
  /* Hero */
  heroImage: string;
  heroImageAlt: string;
  eyebrow: string;
  programName: string;
  italicWord?: string;
  tagline: string;
  heroBody: string;
  breadcrumbs: Array<{ label: string; href?: string }>;

  /* Overview */
  overviewHeadline: string;
  overviewBody: string[];
  keyFacts: TreatmentFact[];

  /* What to expect — numbered steps */
  stepsHeadline: string;
  stepsIntro?: string;
  steps: TreatmentStep[];

  /* Warning / "why not DIY" block (optional) */
  warningHeadline?: string;
  warningBody?: string[];
  warningPoints?: string[];

  /* Why Northbound */
  differentiators: TreatmentDifferentiator[];

  /* Continuum of care */
  continuum: ContinuumStep[];

  /* FAQ */
  faqs: TreatmentFaq[];

  /* CTA */
  ctaHeadline: string;
  ctaBody?: string;
}

/* ─── Hero with inline form ─────────────────────────────────── */

function TreatmentHero({ data }: { data: TreatmentPageData }) {
  const parts = data.italicWord
    ? data.programName.split(new RegExp(`(${data.italicWord})`, "i"))
    : [data.programName];

  return (
    <section className={heroViewportSection}>
      <Image src={data.heroImage} alt={data.heroImageAlt} fill priority className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/70 to-transparent" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-terracotta/15 blur-3xl" />

      <div className={heroInnerWrap}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: copy */}
          <div>
            {/* Breadcrumb */}
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40">
              <Link href="/" className="transition hover:text-terracotta">Home</Link>
              {data.breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  <i className="ri-arrow-right-s-line" />
                  {crumb.href
                    ? <Link href={crumb.href} className="transition hover:text-terracotta">{crumb.label}</Link>
                    : <span className="text-white/70">{crumb.label}</span>}
                </span>
              ))}
            </nav>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"><AutoLinkedTextClient>{data.eyebrow}</AutoLinkedTextClient></p>

            <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {data.italicWord
                ? parts.map((p, i) =>
                    p.toLowerCase() === data.italicWord!.toLowerCase()
                      ? <span key={i} className="italic text-terracotta">{p}</span>
                      : p)
                : data.programName}
            </h1>

            <p className="mt-2 text-base font-semibold text-white/50"><AutoLinkedTextClient>{data.tagline}</AutoLinkedTextClient></p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70"><AutoLinkedTextClient>{data.heroBody}</AutoLinkedTextClient></p>

            <ul className="mt-7 flex flex-col gap-2.5">
              {[
                "Medically supervised — safe, 24/7 monitored care",
                "Personalized treatment plan from day one",
                "Insurance verified at no cost — 15+ plans accepted",
                "38+ years of clinical expertise in Southern California",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-terracotta/20">
                    <i className="ri-check-line text-xs text-terracotta" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="tel:8663110003" className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light">
                <i className="ri-phone-line" /> (866) 311-0003
              </a>
              <span className="text-xs text-white/35">Available 24/7 · Confidential</span>
            </div>
          </div>
          {/* Right: CTM FormReactor */}
          <div className="relative lg:flex lg:items-start lg:justify-end">
            <CtmLeadFormCard
              eyebrow="Free · No Obligation · Confidential"
              title="Verify Your Coverage"
              subtitle="Fill out the form — we'll call you right away."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main template ─────────────────────────────────────────── */

export default function TreatmentPageTemplate({ data }: { data: TreatmentPageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* 1 — Hero + form */}
      <TreatmentHero data={data} />

      {/* 2 — Overview (white) */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_360px] lg:gap-20">
            {/* Body copy */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Overview</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                {data.overviewHeadline}
              </h2>
              <div className="mt-6 space-y-4">
                {data.overviewBody.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-espresso/70"><AutoLinkedTextClient>{para}</AutoLinkedTextClient></p>
                ))}
              </div>
              <a href="tel:8663110003" className="mt-8 inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta">
                <i className="ri-phone-line" /> Speak with a Counselor
              </a>
            </div>

            {/* Key facts card */}
            <div className="self-start">
              <div className="border border-sand-dark bg-sand">
                <div className="border-b border-sand-dark bg-navy px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-terracotta">At a Glance</p>
                </div>
                <div className="divide-y divide-sand-dark">
                  {data.keyFacts.map((fact) => (
                    <div key={fact.label} className="flex items-center gap-4 px-6 py-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white">
                        <i className={`${fact.icon} text-base text-navy`} />
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-espresso/40"><AutoLinkedTextClient>{fact.label}</AutoLinkedTextClient></p>
                        <p className="mt-0.5 text-sm font-bold text-navy"><AutoLinkedTextClient>{fact.value}</AutoLinkedTextClient></p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-sand-dark px-6 py-5">
                  <Link href="/insurance/" className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.1em] text-terracotta transition hover:text-navy">
                    Verify Your Insurance
                    <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — What to Expect / Steps (navy) */}
      <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-navy-light/50" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-terracotta/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
          {/* Header row */}
          <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">The Process</p>
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">{data.stepsHeadline}</h2>
              {data.stepsIntro && (
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55"><AutoLinkedTextClient>{data.stepsIntro}</AutoLinkedTextClient></p>
              )}
            </div>
            {/* Step count badge */}
            <div className="hidden shrink-0 flex-col items-center justify-center border border-white/10 bg-white/5 px-8 py-5 lg:flex">
              <span className="font-heading text-4xl font-bold text-white">{data.steps.length}</span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-terracotta">Steps</span>
            </div>
          </div>

          {/* Step rows — editorial horizontal layout */}
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[2.375rem] top-0 hidden h-full w-px bg-white/10 lg:block" />

            <div className="flex flex-col divide-y divide-white/10">
              {data.steps.map((step) => (
                <div
                  key={step.number}
                  className="group relative grid gap-6 py-7 transition hover:bg-white/3 lg:grid-cols-[auto_1fr_2fr] lg:items-start lg:gap-10"
                >
                  {/* Number + icon stack */}
                  <div className="flex shrink-0 items-center gap-4 lg:flex-col lg:items-center lg:gap-3">
                    {/* Connector dot on the vertical line */}
                    <div className="relative hidden lg:flex">
                      <div className="h-[5px] w-[5px] rounded-full bg-terracotta ring-4 ring-navy ring-offset-0 transition group-hover:scale-125" />
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-terracotta/15 transition group-hover:bg-terracotta/25">
                      <i className={`${step.icon} text-lg text-terracotta`} />
                    </div>
                  </div>

                  {/* Title + step number */}
                  <div className="flex flex-col justify-center">
                    <span className="mb-1 font-heading text-6xl font-bold leading-none text-white/8 transition group-hover:text-white/12">
                      {step.number}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="flex items-center">
                    <p className="text-sm leading-relaxed text-white/60"><AutoLinkedTextClient>{step.body}</AutoLinkedTextClient></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-8">
            <p className="text-xs font-semibold text-white/30">
              <AutoLinkedTextClient>{"Each step is guided by our clinical team — you are never alone in this process."}</AutoLinkedTextClient>
            </p>
            <a
              href="tel:8663110003"
              className="inline-flex items-center gap-2 bg-terracotta px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-line" /> Start Today
            </a>
          </div>
        </div>
      </section>

      {/* 4 — Warning / Why Not DIY (slate) — optional */}
      {data.warningHeadline && (
        <section className="bg-sand py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Important</p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">{data.warningHeadline}</h2>
                <div className="mt-5 space-y-4">
                  {(data.warningBody ?? []).map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-espresso/70"><AutoLinkedTextClient>{p}</AutoLinkedTextClient></p>
                  ))}
                </div>
              </div>
              {data.warningPoints && (
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/40"><AutoLinkedTextClient>{"Withdrawal Symptoms Without Medical Support"}</AutoLinkedTextClient></p>
                  <div className="grid grid-cols-2 gap-px overflow-hidden border border-sand-dark bg-sand-dark">
                    {data.warningPoints.map((point, i) => (
                      <div key={point} className={`flex items-center gap-3 px-5 py-4 ${i % 2 === 0 ? "bg-white" : "bg-sand"}`}>
                        <i className="ri-error-warning-line text-terracotta" />
                        <span className="text-sm font-semibold text-navy">{point}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-espresso/60">
                    <AutoLinkedTextClient>{"At Northbound, our clinical team is present around the clock to manage every symptom safely — so you never face this alone."}</AutoLinkedTextClient>
                  </p>
                  <a href="tel:8663110003" className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light">
                    <i className="ri-phone-line" /> Get Safe Help Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5 — Why Northbound (white) */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Clinical Excellence</p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
              Why Choose <span className="italic text-terracotta">Northbound</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.differentiators.map((d) => (
              <div key={d.title} className="group border border-sand-dark p-8 transition hover:border-navy/20 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-sand transition group-hover:bg-navy">
                  <i className={`${d.icon} text-xl text-navy transition group-hover:text-terracotta`} />
                </div>
                <h3 className="font-heading text-lg font-bold text-navy">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/65"><AutoLinkedTextClient>{d.body}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Continuum of care (navy) */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"><AutoLinkedTextClient>{"Your Recovery Journey"}</AutoLinkedTextClient></p>
          <div className="relative flex flex-wrap items-stretch justify-center gap-px overflow-hidden border border-white/10">
            {data.continuum.map((step) => (
              <Link
                key={step.label}
                href={step.href}
                className={`group relative flex flex-1 flex-col items-center gap-2 px-5 py-5 text-center transition min-w-[110px] ${
                  step.current
                    ? "bg-terracotta"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <i className={`${step.icon} text-xl ${step.current ? "text-white" : "text-white/50 group-hover:text-terracotta"}`} />
                <span className={`text-xs font-bold leading-tight ${step.current ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                  {step.label}
                </span>
                {step.current && (
                  <span className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 bg-white" />
                )}
              </Link>
            ))}
          </div>
          <p className="mt-5 text-center text-[11px] text-white/30">
            <AutoLinkedTextClient>{"Highlighted step = current program · Click any step to learn more"}</AutoLinkedTextClient>
          </p>
        </div>
      </section>

      {/* 7 — FAQ (slate) */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <div className="lg:pt-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Common Questions</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                Frequently Asked <span className="italic text-terracotta">Questions</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/65">
                <AutoLinkedTextClient>{"Have a question not answered here? Call our admissions team — they're available 24/7."}</AutoLinkedTextClient>
              </p>
              <a href="tel:8663110003" className="mt-7 inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta">
                <i className="ri-phone-line" /> (866) 311-0003
              </a>
            </div>

            <div className="divide-y divide-sand-dark">
              {data.faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-heading text-base font-bold text-navy md:text-lg">{faq.q}</span>
                    <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-sand-dark text-navy transition-transform duration-300 ${openFaq === i ? "rotate-45 border-terracotta bg-terracotta text-white" : ""}`}>
                      <i className="ri-add-line text-sm" />
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96 pb-6" : "max-h-0"}`}>
                    <p className="text-sm leading-relaxed text-espresso/70"><AutoLinkedTextClient>{faq.a}</AutoLinkedTextClient></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 — CTA Banner */}
      <CtaBanner
        headline={data.ctaHeadline}
        body={data.ctaBody}
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
      />
    </>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */


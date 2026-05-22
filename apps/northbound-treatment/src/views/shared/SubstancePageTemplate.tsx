"use client";

/**
 * SubstancePageTemplate — v2
 *
 * High-converting, clinically-toned layout for substance abuse treatment pages.
 * Distinctly different from the signature/treatment-program templates:
 *  - Tighter vertical rhythm (less open space)
 *  - No imbalanced 50/50 splits — every multi-col layout shares height
 *  - More urgent, clinical visual language
 *
 * Sections:
 *  1. Hero — dark image overlay, phone as primary CTA, key-facts sidebar
 *  2. Trust strip
 *  3. Overview — left text panel | right key-facts card (equal height)
 *  4. Warning signs — full-width grid of equal-height symptom tiles
 *  5. Treatment continuum — numbered horizontal steps on dark bg
 *  6. Differentiators — compact 3-col grid
 *  7. Full-bleed closing image with overlay + CTA
 *  8. FAQ accordion (2-col on desktop)
 *  9. Insurance strip
 * 10. Related substances
 */

import { useState } from "react";
import Image from "next/image";
import { heroContentPad, heroOverlayClass } from "@/lib/heroSpacing";
import Link from "next/link";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

/* ─── Types ────────────────────────────────────────────────────────────── */

export type CareStep = {
  phase: string;
  title: string;
  body: string;
  icon: string;
};

export type SubstanceFaq = {
  question: string;
  answer: string;
};

export type SubstancePageData = {
  heroImage: string;
  heroImageAlt: string;
  substanceName: string;
  heroHeadline: string;
  heroItalicWord: string;
  heroBody: string;

  whatItIsHeadline: string;
  whatItIsBody: string[];
  whatItIsImage: string;
  whatItIsImageAlt: string;
  quickStats: { value: string; label: string }[];

  warningBody: string;
  warningSigns: string[];

  recoveryHeadline: string;
  recoveryIntro: string;
  careSteps: CareStep[];

  differentiators: { icon: string; title: string; body: string }[];

  closingImage: string;
  closingImageAlt: string;
  closingHeadline: string;
  closingBody: string[];
  closingQuote: string;

  faqs: SubstanceFaq[];
  relatedSubstances: { label: string; href: string; icon: string }[];
  substanceNameShort: string;
};

/* ─── Template ─────────────────────────────────────────────────────────── */

export default function SubstancePageTemplate({ data }: { data: SubstancePageData }) {
  const heroWords = data.heroHeadline.split(new RegExp(`(${data.heroItalicWord})`, "i"));

  return (
    <>
      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <section className={`relative overflow-hidden bg-navy ${heroOverlayClass}`}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={data.heroImage}
            alt={data.heroImageAlt}
            fill
            className="object-cover object-center opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50" />
        </div>

        <div className={`relative z-10 mx-auto w-full max-w-7xl ${heroContentPad}`}>
          <div className="grid items-stretch gap-10 lg:grid-cols-[1fr_380px]">

            {/* Left — headline + CTAs */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                <AutoLinkedTextClient>{"Addiction Treatment — Northbound Treatment Services"}</AutoLinkedTextClient>
              </p>
              <h1 className="font-heading mt-4 text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
                {heroWords.map((part, i) =>
                  part.toLowerCase() === data.heroItalicWord.toLowerCase() ? (
                    <span key={i} className="italic text-terracotta-light">{part}</span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70"><AutoLinkedTextClient>{data.heroBody}</AutoLinkedTextClient></p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="tel:8663110003"
                  className="inline-flex items-center gap-2 bg-terracotta px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-terracotta-light"
                >
                  <i className="ri-phone-fill text-base" />
                  Call (866) 311-0003
                </Link>
                <Link
                  href="/admissions/"
                  className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/8"
                >
                  Verify Insurance — Free
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
                {["Available 24/7", "Insurance Accepted", "100% Confidential"].map((s) => (
                  <span key={s} className="flex items-center gap-1.5 text-xs text-white/50">
                    <i className="ri-check-line text-terracotta" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — key facts card, same height as left */}
            <div className="hidden lg:flex lg:flex-col">
              <div className="flex flex-1 flex-col border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-terracotta">
                  <AutoLinkedTextClient>{"Free Confidential Consultation"}</AutoLinkedTextClient>
                </p>
                <p className="font-heading mt-3 text-xl font-bold text-white">
                  <AutoLinkedTextClient>{"Ready to take the first step?"}</AutoLinkedTextClient>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  <AutoLinkedTextClient>{"Our admissions team is available around the clock — no cost, no obligation, no judgment."}</AutoLinkedTextClient>
                </p>
                <Link
                  href="tel:8663110003"
                  className="mt-5 flex items-center justify-center gap-2 bg-terracotta py-3.5 text-sm font-bold text-white transition hover:bg-terracotta-light"
                >
                  <i className="ri-phone-fill" />
                  (866) 311-0003
                </Link>

                {/* Stats stacked vertically — avoids horizontal imbalance */}
                <div className="mt-6 flex-1 space-y-4 border-t border-white/10 pt-5">
                  {data.quickStats.map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-xs text-white/50">{s.label}</span>
                      <span className="font-heading text-lg font-bold text-terracotta">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. TRUST STRIP ═══════════════════════════════════════════════ */}
      <div className="border-b border-espresso/20 bg-espresso/90 py-3.5">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 lg:px-10">
          {[
            { icon: "ri-award-line", text: "DHCS Licensed #300661CP" },
            { icon: "ri-group-line", text: "200+ Years Combined Expertise" },
            { icon: "ri-heart-pulse-line", text: "38+ Years in Operation" },
            { icon: "ri-shield-check-line", text: "NAATP Member" },
            { icon: "ri-star-fill", text: "4.6 / 5 Google Rating" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5 text-xs font-semibold text-white/65">
              <i className={`${item.icon} text-terracotta`} />
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* ══ 3. OVERVIEW — equal-height 2-col ═════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[3fr_2fr]">

          {/* Left: text */}
          <div className="border-b border-sand-dark px-6 py-14 lg:border-b-0 lg:border-r lg:px-10 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
              <AutoLinkedTextClient>{"Understanding the Disease"}</AutoLinkedTextClient>
            </p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-navy md:text-5xl">
              {data.whatItIsHeadline}
            </h2>
            {data.whatItIsBody.map((para, i) => (
              <p key={i} className={`${i === 0 ? "mt-5" : "mt-4"} leading-relaxed text-espresso/80`}><AutoLinkedTextClient>{para}</AutoLinkedTextClient></p>
            ))}
          </div>

          {/* Right: image fills the full column, stats pinned below */}
          <div className="flex flex-col">
            <div className="relative min-h-[280px] flex-1">
              <Image
                src={data.whatItIsImage}
                alt={data.whatItIsImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* floating phone badge */}
              <div className="absolute bottom-4 left-4 bg-terracotta px-4 py-3 shadow-lg">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/70">
                  Free Consultation
                </p>
                <Link href="tel:8663110003" className="font-heading text-lg font-bold text-white">
                  (866) 311-0003
                </Link>
              </div>
            </div>
            {/* Stats row — same width, evenly divided */}
            <div className="grid grid-cols-3 divide-x divide-sand-dark border-t border-sand-dark">
              {data.quickStats.map((s) => (
                <div key={s.label} className="px-4 py-5 text-center">
                  <p className="font-heading text-2xl font-bold text-terracotta"><AutoLinkedTextClient>{s.value}</AutoLinkedTextClient></p>
                  <p className="mt-1 text-[10px] leading-snug text-espresso/55"><AutoLinkedTextClient>{s.label}</AutoLinkedTextClient></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. WARNING SIGNS — full-width equal grid ══════════════════════ */}
      <section className="bg-sand py-14 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          {/* Header row — spans full width, no imbalance */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-sand-dark pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                <AutoLinkedTextClient>{"Recognizing the Problem"}</AutoLinkedTextClient>
              </p>
              <h2 className="font-heading mt-2 text-4xl font-bold text-navy md:text-5xl">
                Signs of{" "}
                <span className="italic text-terracotta">{data.substanceName} Addiction</span>
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-espresso/70"><AutoLinkedTextClient>{data.warningBody}</AutoLinkedTextClient></p>
            </div>
            <Link
              href="tel:8663110003"
              className="inline-flex shrink-0 items-center gap-2 bg-terracotta px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-fill" />
              Call Now — (866) 311-0003
            </Link>
          </div>

          {/* Equal 2-col grid — always balanced */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {data.warningSigns.map((sign) => (
              <div
                key={sign}
                className="flex items-start gap-3 border border-sand-dark bg-white px-5 py-4"
              >
                <i className="ri-alert-line mt-0.5 shrink-0 text-base text-terracotta" />
                <span className="text-sm leading-relaxed text-espresso/80">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. TREATMENT CONTINUUM ════════════════════════════════════════ */}
      <section className="bg-navy py-14 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
              <AutoLinkedTextClient>{"The Path to Recovery"}</AutoLinkedTextClient>
            </p>
            <h2 className="font-heading mt-2 text-4xl font-bold text-white md:text-5xl">
              {data.recoveryHeadline}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55"><AutoLinkedTextClient>{data.recoveryIntro}</AutoLinkedTextClient></p>
          </div>

          {/* Steps — compact horizontal cards that stack on mobile */}
          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {data.careSteps.map((step, idx) => (
              <div key={step.phase} className="flex flex-col bg-navy p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-terracotta/20 text-terracotta">
                    <i className={`${step.icon} text-lg`} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-terracotta">
                    Phase {idx + 1}
                  </span>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/35 mb-1"><AutoLinkedTextClient>{step.phase}</AutoLinkedTextClient></p>
                <h3 className="font-heading text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55 flex-1"><AutoLinkedTextClient>{step.body}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. DIFFERENTIATORS — compact 3-col ═══════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                <AutoLinkedTextClient>{"Why Choose Northbound"}</AutoLinkedTextClient>
              </p>
              <h2 className="font-heading mt-2 text-4xl font-bold text-navy md:text-5xl">
                Treatment That Goes{" "}
                <span className="italic text-terracotta">Further</span>
              </h2>
            </div>
            <Link
              href="/admissions/"
              className="inline-flex shrink-0 items-center gap-2 border border-terracotta/30 px-6 py-3 text-sm font-semibold text-terracotta transition hover:border-terracotta hover:bg-terracotta/5"
            >
              Begin Admissions <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="grid gap-px bg-sand-dark sm:grid-cols-2 lg:grid-cols-3">
            {data.differentiators.map((d) => (
              <div key={d.title} className="bg-white px-7 py-8">
                <div className="mb-3 flex h-10 w-10 items-center justify-center bg-terracotta/10">
                  <i className={`${d.icon} text-xl text-terracotta`} />
                </div>
                <h3 className="font-heading text-base font-bold text-navy">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/70"><AutoLinkedTextClient>{d.body}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. CLOSING — full-bleed image with overlay ═══════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.closingImage}
            alt={data.closingImageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            <AutoLinkedTextClient>{"Recovery Is Possible"}</AutoLinkedTextClient>
          </p>
          <h2 className="font-heading mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {data.closingHeadline}
          </h2>
          {data.closingBody.map((para, i) => (
            <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} mx-auto max-w-2xl leading-relaxed text-white/75`}><AutoLinkedTextClient>{para}</AutoLinkedTextClient></p>
          ))}
          <div className="mx-auto mt-8 max-w-lg border border-white/20 px-6 py-5">
            <p className="font-heading text-base italic text-white/85">
              &ldquo;{data.closingQuote}&rdquo;
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-terracotta">
              <AutoLinkedTextClient>{"— Northbound Treatment Services"}</AutoLinkedTextClient>
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="tel:8663110003"
              className="inline-flex items-center gap-2 bg-terracotta px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-fill" />
              Call (866) 311-0003
            </Link>
            <Link
              href="/insurance/"
              className="inline-flex items-center gap-2 border border-white/30 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Verify Insurance Free
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 8. FAQ — 2-col on desktop ════════════════════════════════════ */}
      <section className="bg-sand py-14 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            {/* Left — sticky header */}
            <div className="lg:pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                Common Questions
              </p>
              <h2 className="font-heading mt-2 text-4xl font-bold text-navy md:text-5xl">
                Frequently
                <br />
                <span className="italic text-terracotta">Asked</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-espresso/70">
                <AutoLinkedTextClient>{"Have a question that's not here? Our admissions team answers every question — 24 hours a day, 7 days a week."}</AutoLinkedTextClient>
              </p>
              <Link
                href="tel:8663110003"
                className="mt-6 inline-flex items-center gap-2 bg-navy px-6 py-3.5 text-sm font-bold text-white transition hover:bg-navy-light"
              >
                <i className="ri-phone-fill" />
                (866) 311-0003
              </Link>
            </div>

            {/* Right — accordion */}
            <FaqAccordion faqs={data.faqs} />
          </div>
        </div>
      </section>

      {/* ══ 9. INSURANCE STRIP ════════════════════════════════════════════ */}
      <section className="bg-navy py-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                <AutoLinkedTextClient>{"Don't Let Cost Be a Barrier"}</AutoLinkedTextClient>
              </p>
              <h2 className="font-heading mt-2 text-3xl font-bold text-white md:text-4xl">
                We Work With 15+ Major{" "}
                <span className="italic text-terracotta-light">Insurance Plans</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                <AutoLinkedTextClient>{"Northbound is in-network with Aetna, Anthem, Cigna, Tricare, and more. Our team verifies your benefits and explains your coverage — at no cost to you."}</AutoLinkedTextClient>
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/insurance/"
                className="inline-flex items-center gap-2 bg-terracotta px-7 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-terracotta-light"
              >
                Verify My Insurance <i className="ri-arrow-right-line" />
              </Link>
              <Link
                href="tel:8663110003"
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/8"
              >
                <i className="ri-phone-fill" />
                (866) 311-0003
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10. RELATED SUBSTANCES ══════════════════════════════════════ */}
      <section className="border-t border-sand-dark bg-white py-10">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-espresso/40">
            <AutoLinkedTextClient>{"Other Addictions We Treat"}</AutoLinkedTextClient>
          </p>
          <div className="flex flex-wrap gap-2">
            {data.relatedSubstances.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="inline-flex items-center gap-2 border border-sand-dark px-4 py-2 text-sm font-semibold text-espresso/70 transition hover:border-terracotta/40 hover:text-terracotta"
              >
                <i className={`${s.icon} text-terracotta`} />
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── FAQ Accordion ─────────────────────────────────────────────────────── */
function FaqAccordion({ faqs }: { faqs: SubstanceFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-sand-dark border border-sand-dark bg-white">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-sand/30"
          >
            <span className="font-heading text-sm font-bold text-navy">{faq.question}</span>
            <i
              className={`ri-arrow-down-s-line mt-0.5 shrink-0 text-xl text-terracotta transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <div className="border-t border-sand-dark bg-sand/20 px-6 pb-5 pt-4">
              <p className="text-sm leading-relaxed text-espresso/80"><AutoLinkedTextClient>{faq.answer}</AutoLinkedTextClient></p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

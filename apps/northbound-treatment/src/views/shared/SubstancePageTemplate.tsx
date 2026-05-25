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

import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import { EditableImage, EditableText } from "@sweetmedia/admin-core/page-editor";
import { heroContentPad, heroOverlayClass } from "@/lib/heroSpacing";
import SubstanceFaqAccordion from "./SubstanceFaqAccordion";

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
          <EditableImage
            fieldKey="hero.image"
            defaultSrc={data.heroImage}
            alt={data.heroImageAlt}
            label="Hero image"
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
                <AutoLinkedText>{"Addiction Treatment — Northbound Treatment Services"}</AutoLinkedText>
              </p>
              <h1 className="font-heading mt-4 text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
                <EditableText fieldKey="hero.headline" defaultValue={data.heroHeadline} as="span">
                  {heroWords.map((part, i) =>
                    part.toLowerCase() === data.heroItalicWord.toLowerCase() ? (
                      <span key={i} className="italic text-terracotta-light">
                        {part}
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )}
                </EditableText>
              </h1>
              <EditableText
                fieldKey="hero.body"
                defaultValue={data.heroBody}
                as="p"
                className="mt-5 max-w-xl text-lg leading-relaxed text-white/70"
              >
                <AutoLinkedText>{data.heroBody}</AutoLinkedText>
              </EditableText>
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
                  <AutoLinkedText>{"Free Confidential Consultation"}</AutoLinkedText>
                </p>
                <p className="font-heading mt-3 text-xl font-bold text-white">
                  <AutoLinkedText>{"Ready to take the first step?"}</AutoLinkedText>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  <AutoLinkedText>{"Our admissions team is available around the clock — no cost, no obligation, no judgment."}</AutoLinkedText>
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
                  {data.quickStats.map((s, si) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <EditableText
                        fieldKey={`quickStats.${si}.label`}
                        defaultValue={s.label}
                        as="span"
                        className="text-xs text-white/50"
                      >
                        {s.label}
                      </EditableText>
                      <EditableText
                        fieldKey={`quickStats.${si}.value`}
                        defaultValue={s.value}
                        as="span"
                        className="font-heading text-lg font-bold text-terracotta"
                      >
                        {s.value}
                      </EditableText>
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
              <AutoLinkedText>{"Understanding the Disease"}</AutoLinkedText>
            </p>
            <EditableText
              fieldKey="whatItIs.headline"
              defaultValue={data.whatItIsHeadline}
              as="h2"
              className="font-heading mt-3 text-4xl font-bold text-navy md:text-5xl"
            >
              <AutoLinkedText>{data.whatItIsHeadline}</AutoLinkedText>
            </EditableText>
            {data.whatItIsBody.map((para, i) => (
              <EditableText
                key={i}
                fieldKey={`whatItIs.body.${i}`}
                defaultValue={para}
                as="p"
                className={`${i === 0 ? "mt-5" : "mt-4"} leading-relaxed text-espresso/80`}
              >
                <AutoLinkedText>{para}</AutoLinkedText>
              </EditableText>
            ))}
          </div>

          {/* Right: image fills the full column, stats pinned below */}
          <div className="flex flex-col">
            <div className="relative min-h-[280px] flex-1">
              <EditableImage
                fieldKey="whatItIs.image"
                defaultSrc={data.whatItIsImage}
                alt={data.whatItIsImageAlt}
                label="Overview image"
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
              {data.quickStats.map((s, si) => (
                <div key={s.label} className="px-4 py-5 text-center">
                  <EditableText
                    fieldKey={`quickStats.${si}.value`}
                    defaultValue={s.value}
                    as="p"
                    className="font-heading text-2xl font-bold text-terracotta"
                  >
                    {s.value}
                  </EditableText>
                  <EditableText
                    fieldKey={`quickStats.${si}.label`}
                    defaultValue={s.label}
                    as="p"
                    className="mt-1 text-[10px] leading-snug text-espresso/55"
                  >
                    {s.label}
                  </EditableText>
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
                <AutoLinkedText>{"Recognizing the Problem"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-2 text-4xl font-bold text-navy md:text-5xl">
                Signs of{" "}
                <span className="italic text-terracotta">{data.substanceName} Addiction</span>
              </h2>
              <EditableText
                fieldKey="warning.body"
                defaultValue={data.warningBody}
                as="p"
                className="mt-3 max-w-2xl text-base leading-relaxed text-espresso/70"
              >
                <AutoLinkedText>{data.warningBody}</AutoLinkedText>
              </EditableText>
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
            {data.warningSigns.map((sign, wi) => (
              <div
                key={sign}
                className="flex items-start gap-3 border border-sand-dark bg-white px-5 py-4"
              >
                <i className="ri-alert-line mt-0.5 shrink-0 text-base text-terracotta" />
                <EditableText
                  fieldKey={`warning.signs.${wi}`}
                  defaultValue={sign}
                  as="span"
                  className="text-sm leading-relaxed text-espresso/80"
                >
                  {sign}
                </EditableText>
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
              <AutoLinkedText>{"The Path to Recovery"}</AutoLinkedText>
            </p>
            <EditableText
              fieldKey="recovery.headline"
              defaultValue={data.recoveryHeadline}
              as="h2"
              className="font-heading mt-2 text-4xl font-bold text-white md:text-5xl"
            >
              <AutoLinkedText>{data.recoveryHeadline}</AutoLinkedText>
            </EditableText>
            <EditableText
              fieldKey="recovery.intro"
              defaultValue={data.recoveryIntro}
              as="p"
              className="mt-3 max-w-2xl text-base leading-relaxed text-white/55"
            >
              <AutoLinkedText>{data.recoveryIntro}</AutoLinkedText>
            </EditableText>
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
                <EditableText
                  fieldKey={`careSteps.${idx}.phase`}
                  defaultValue={step.phase}
                  as="p"
                  className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/35"
                >
                  <AutoLinkedText>{step.phase}</AutoLinkedText>
                </EditableText>
                <EditableText
                  fieldKey={`careSteps.${idx}.title`}
                  defaultValue={step.title}
                  as="h3"
                  className="font-heading text-base font-bold text-white"
                >
                  <AutoLinkedText>{step.title}</AutoLinkedText>
                </EditableText>
                <EditableText
                  fieldKey={`careSteps.${idx}.body`}
                  defaultValue={step.body}
                  as="p"
                  className="mt-2 flex-1 text-xs leading-relaxed text-white/55"
                >
                  <AutoLinkedText>{step.body}</AutoLinkedText>
                </EditableText>
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
                <AutoLinkedText>{"Why Choose Northbound"}</AutoLinkedText>
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
            {data.differentiators.map((d, di) => (
              <div key={d.title} className="bg-white px-7 py-8">
                <div className="mb-3 flex h-10 w-10 items-center justify-center bg-terracotta/10">
                  <i className={`${d.icon} text-xl text-terracotta`} />
                </div>
                <EditableText
                  fieldKey={`differentiators.${di}.title`}
                  defaultValue={d.title}
                  as="h3"
                  className="font-heading text-base font-bold text-navy"
                >
                  <AutoLinkedText>{d.title}</AutoLinkedText>
                </EditableText>
                <EditableText
                  fieldKey={`differentiators.${di}.body`}
                  defaultValue={d.body}
                  as="p"
                  className="mt-2 text-sm leading-relaxed text-espresso/70"
                >
                  <AutoLinkedText>{d.body}</AutoLinkedText>
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. CLOSING — full-bleed image with overlay ═══════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <EditableImage
            fieldKey="closing.image"
            defaultSrc={data.closingImage}
            alt={data.closingImageAlt}
            label="Closing image"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            <AutoLinkedText>{"Recovery Is Possible"}</AutoLinkedText>
          </p>
          <EditableText
            fieldKey="closing.headline"
            defaultValue={data.closingHeadline}
            as="h2"
            className="font-heading mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            <AutoLinkedText>{data.closingHeadline}</AutoLinkedText>
          </EditableText>
          {data.closingBody.map((para, i) => (
            <EditableText
              key={i}
              fieldKey={`closing.body.${i}`}
              defaultValue={para}
              as="p"
              className={`${i === 0 ? "mt-6" : "mt-4"} mx-auto max-w-2xl leading-relaxed text-white/75`}
            >
              <AutoLinkedText>{para}</AutoLinkedText>
            </EditableText>
          ))}
          <div className="mx-auto mt-8 max-w-lg border border-white/20 px-6 py-5">
            <EditableText
              fieldKey="closing.quote"
              defaultValue={data.closingQuote}
              as="p"
              className="font-heading text-base italic text-white/85"
            >
              &ldquo;{data.closingQuote}&rdquo;
            </EditableText>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-terracotta">
              <AutoLinkedText>{"— Northbound Treatment Services"}</AutoLinkedText>
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
                <AutoLinkedText>{"Have a question that's not here? Our admissions team answers every question — 24 hours a day, 7 days a week."}</AutoLinkedText>
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
            <SubstanceFaqAccordion
              items={data.faqs.map((faq, i) => ({
                question: (
                  <EditableText fieldKey={`faqs.${i}.question`} defaultValue={faq.question} as="span">
                    <AutoLinkedText>{faq.question}</AutoLinkedText>
                  </EditableText>
                ),
                answer: (
                  <EditableText fieldKey={`faqs.${i}.answer`} defaultValue={faq.answer} as="span">
                    <AutoLinkedText>{faq.answer}</AutoLinkedText>
                  </EditableText>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      {/* ══ 9. INSURANCE STRIP ════════════════════════════════════════════ */}
      <section className="bg-navy py-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                <AutoLinkedText>{"Don't Let Cost Be a Barrier"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-2 text-3xl font-bold text-white md:text-4xl">
                We Work With 15+ Major{" "}
                <span className="italic text-terracotta-light">Insurance Plans</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                <AutoLinkedText>{"Northbound is in-network with Aetna, Anthem, Cigna, Tricare, and more. Our team verifies your benefits and explains your coverage — at no cost to you."}</AutoLinkedText>
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
            <AutoLinkedText>{"Other Addictions We Treat"}</AutoLinkedText>
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

/**
 * Reusable template for mental health sub-pages.
 * Same liquid-glass hero + 8-section layout as addiction ConditionPage,
 * with Mental Health breadcrumb and MH-appropriate related programs.
 */

import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionWrapper from "@/components/ui/SectionWrapper";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import { PAGE_GRID } from "@/components/ui/PageHeroShell";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

export interface MHQuickFact  { value: string; label: string }
export interface MHSymptom    { text: string }
export interface MHConsequence { icon: string; title: string; desc: string }
export interface MHTreatmentStep { title: string; desc: string; detail?: string }
export interface MHRelatedProgram { icon: string; label: string; title: string; desc: string; href: string }

export interface MHConditionData {
  heroImage: string;
  heroImageAlt: string;
  category: string;
  headline: string;
  headlineEmphasis: string;
  subhead: string;
  quickFacts: MHQuickFact[];
  overviewTitle: string;
  overviewCol1: string[];
  overviewCol2: string[];
  signsLabel1: string;
  signsLabel2: string;
  signsIcon1: string;
  signsIcon2: string;
  symptoms1: MHSymptom[];
  symptoms2: MHSymptom[];
  consequences: MHConsequence[];
  treatmentSteps: MHTreatmentStep[];
  faqs: FaqItem[];
  relatedPrograms: MHRelatedProgram[];
}

export default function MHConditionPage({ data }: { data: MHConditionData }) {
  const {
    heroImage, heroImageAlt, category, headline, headlineEmphasis, subhead,
    quickFacts, overviewTitle, overviewCol1, overviewCol2,
    signsLabel1, signsLabel2, signsIcon1, signsIcon2, symptoms1, symptoms2,
    consequences, treatmentSteps, faqs, relatedPrograms,
  } = data;

  return (
    <>
      {/* ①  Full-Bleed Hero with Liquid Glass Card ──────────────────────── */}
      <CinematicHeroSection
        minHeight="min-h-[92vh]"
        contentClassName="justify-center"
        media={
          <>
            <Image
              src={`${BASE}/${heroImage}`}
              alt={heroImageAlt}
              fill
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(44,48,46,0.97) 0%, rgba(44,48,46,0.82) 45%, rgba(44,48,46,0.55) 70%, rgba(44,48,46,0.35) 100%)",
              }}
            />
          </>
        }
      >
        <div className={`${PAGE_GRID} grid lg:grid-cols-[1fr_400px] gap-10 xl:gap-16 items-center py-12 lg:py-16`}>

          {/* Left — text */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-7">
              <Link
                href="/mental-health"
                className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors"
              >
                Mental Health
              </Link>
              <span className="text-white/25 text-xs">/</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">{category}</span>
            </div>

            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mb-6"
              style={{ fontSize: "clamp(48px, 5.5vw, 84px)", lineHeight: 0.95 }}
            >
              {headline}<br />
              <em className="italic text-white/50">{headlineEmphasis}</em>
            </h1>

            <p className="text-[16px] font-light leading-relaxed text-white/65 max-w-[480px] mb-10"><AutoLinkedText>{subhead}</AutoLinkedText></p>

            <div className="flex flex-wrap gap-3">
              <Button href="#treatment" variant="accent" size="md">
                View Treatment Approach
              </Button>
              <Button href="tel:9494612620" variant="outline-white" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> (949)-461-2620
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { icon: "ri-stethoscope-line",     text: "Psychiatrists On-Site" },
                { icon: "ri-shield-check-line",    text: "Dual Diagnosis Care" },
                { icon: "ri-time-line",            text: "Same-Day Admissions" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <i className={`${icon} text-accent text-sm`} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/55">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — liquid glass card */}
          <div
            className="relative self-center rounded-2xl p-8 flex flex-col gap-5 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.45) 60%, transparent 100%)" }}
              aria-hidden
            />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45 mb-2"><AutoLinkedText>{"Free & Confidential"}</AutoLinkedText></p>
              <h2 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-white leading-snug">
                Request a Free Consultation
              </h2>
              <p className="mt-1.5 text-[13px] font-light text-white/55">
                <AutoLinkedText>{"No commitment required. We respond within hours."}</AutoLinkedText>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Full Name", placeholder: "Your name" },
                  { label: "Phone",     placeholder: "(949) 000-0000" },
                ].map(({ label, placeholder }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">{label}</label>
                    <div
                      className="px-3 py-2.5 text-[13px] text-white/35 font-light rounded-sm"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      {placeholder}
                    </div>
                  </div>
                ))}
              </div>
              {[
                { label: "Insurance Provider", placeholder: "e.g. Blue Shield, Aetna, Cigna..." },
                { label: "How Can We Help?",   placeholder: "Tell us a little about what you're going through...", tall: true },
              ].map(({ label, placeholder, tall }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">{label}</label>
                  <div
                    className={`px-3 text-[13px] text-white/35 font-light rounded-sm ${tall ? "pt-2.5 pb-10" : "py-2.5"}`}
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    {placeholder}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/admissions"
              className="relative w-full flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white overflow-hidden transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, var(--color-accent, #C4895A) 0%, rgba(196,137,90,0.85) 100%)",
                boxShadow: "0 4px 20px rgba(196,137,90,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
                aria-hidden
              />
              Request Free Consultation <i className="ri-arrow-right-line" />
            </a>

            <p className="text-[10px] font-light text-white/35 text-center leading-relaxed">
              <AutoLinkedText>{"HIPAA-compliant · Strictly confidential · No obligation"}</AutoLinkedText>
            </p>
          </div>
        </div>
      </CinematicHeroSection>

      {/* ②  Quick Facts bar ─────────────────────────────────────────────── */}
      <div className="bg-accent/10 border-y border-accent/20">
        <div className="mx-auto max-w-[1300px] px-6 grid grid-cols-2 lg:grid-cols-4">
          {quickFacts.map(({ value, label }) => (
            <div key={label} className="py-6 px-6 border-r border-accent/15 last:border-r-0 text-center">
              <p
                className="font-[family-name:var(--font-display)] font-normal text-ink"
                style={{ fontSize: "clamp(26px, 2.5vw, 38px)", lineHeight: 1 }}
              ><AutoLinkedText>{value}</AutoLinkedText></p>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50 mt-1.5"><AutoLinkedText>{label}</AutoLinkedText></p>
            </div>
          ))}
        </div>
      </div>

      {/* ③  Clinical Overview ────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper>
          <div className="mb-10">
            <Eyebrow colorClass="text-ink/45" className="mb-4">Clinical Overview</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(32px, 3.5vw, 50px)", lineHeight: 1.05 }}
            >
              {overviewTitle}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-6">
            <div className="flex flex-col gap-5">
              {overviewCol1.map((para, i) => (
                <p key={i} className="text-[15px] font-light leading-relaxed text-ink/65"><AutoLinkedText>{para}</AutoLinkedText></p>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              {overviewCol2.map((para, i) => (
                <p key={i} className="text-[15px] font-light leading-relaxed text-ink/65"><AutoLinkedText>{para}</AutoLinkedText></p>
              ))}
              <div className="mt-2 border-l-2 border-accent pl-5">
                <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-ink/50 mb-2">Next Step</p>
                <p className="text-[15px] font-light text-ink/70">
                  <AutoLinkedText>{"Our clinical team is available 24/7 for a free, confidential assessment. No commitment required."}</AutoLinkedText>
                </p>
                <a href="tel:9494612620" className="mt-3 inline-flex items-center gap-2 text-accent text-[14px] font-medium hover:text-ink transition-colors">
                  <i className="ri-phone-line" /> (949)-461-2620
                </a>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ④  Signs & Symptoms ─────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <Eyebrow colorClass="text-ink/45" className="mb-4">Recognition</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink mb-10"
            style={{ fontSize: "clamp(30px, 3vw, 44px)", lineHeight: 1.1 }}
          >
            Signs &amp; Symptoms
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              { label: signsLabel1, icon: signsIcon1, items: symptoms1, accent: true },
              { label: signsLabel2, icon: signsIcon2, items: symptoms2, accent: false },
            ].map(({ label, icon, items, accent }) => (
              <div key={label} className="bg-white border border-warm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <IconCircle icon={icon} variant={accent ? "accent-subtle" : "muted-subtle"} size="sm" />
                  <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-ink">{label}</h3>
                </div>
                <div className="flex flex-col gap-0">
                  {items.map(({ text }, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-b border-warm last:border-0">
                      <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] mt-0.5 shrink-0 w-5 ${accent ? "text-accent/70" : "text-ink/30"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] font-light text-ink/75 leading-snug"><AutoLinkedText>{text}</AutoLinkedText></p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] font-light text-ink/50 italic text-center">
            <AutoLinkedText>{"Not every symptom needs to be present. If several are familiar, a clinical assessment is warranted."}</AutoLinkedText>
          </p>
        </SectionWrapper>
      </section>

      {/* ⑤  Why Treatment Matters ───────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          <div className="text-center mb-12">
            <Eyebrow colorClass="text-accent" className="mb-4">Why Treatment Matters</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white"
              style={{ fontSize: "clamp(30px, 3vw, 46px)", lineHeight: 1.1 }}
            >
              Consequences of Untreated Illness
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-px bg-white/5">
            {consequences.map(({ icon, title, desc }, i) => (
              <div key={title} className="relative bg-ink p-8 flex flex-col gap-5">
                <span className="absolute top-6 right-6 font-[family-name:var(--font-display)] text-[64px] font-normal text-white/5 leading-none select-none" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <IconCircle icon={icon} variant="accent" size="sm" />
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-white mb-3 leading-snug">{title}</h3>
                  <p className="text-[14px] font-light text-white/65 leading-relaxed"><AutoLinkedText>{desc}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑥  Treatment Steps ─────────────────────────────────────────────── */}
      <section id="treatment" className="bg-cream-alt">
        <SectionWrapper>
          <Eyebrow colorClass="text-ink/45" className="mb-4">Our Approach</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink mb-12"
            style={{ fontSize: "clamp(30px, 3vw, 46px)", lineHeight: 1.1 }}
          >
            How Rize OC Treats This Condition
          </h2>
          <div className="flex flex-col gap-0">
            {treatmentSteps.map(({ title, desc, detail }, i) => (
              <div key={title} className="grid lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-12 py-8 border-b border-warm last:border-0 items-start">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span
                    className="font-[family-name:var(--font-display)] font-normal text-accent shrink-0"
                    style={{ fontSize: "clamp(36px, 3vw, 48px)", lineHeight: 1 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < treatmentSteps.length - 1 && <div className="hidden lg:block h-8 w-px bg-warm mt-2" />}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-ink mb-2 leading-snug">{title}</h3>
                  <p className="text-[15px] font-light leading-relaxed text-ink/65"><AutoLinkedText>{desc}</AutoLinkedText></p>
                </div>
                {detail && <p className="hidden lg:block text-[14px] font-light leading-relaxed text-ink/50 italic"><AutoLinkedText>{detail}</AutoLinkedText></p>}
              </div>
            ))}
          </div>
          <div className="mt-8 bg-ink px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[15px] font-light text-white/75">
              <span className="text-white font-medium">Ready to start?</span>{" "}
              Our admissions team conducts a free clinical assessment and recommends the right entry point.
            </p>
            <a href="tel:9494612620" className="shrink-0 flex items-center gap-2 text-accent text-[11px] font-medium uppercase tracking-[0.2em] hover:gap-3 transition-all whitespace-nowrap">
              <i className="ri-phone-line" /> Call Now
            </a>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑦  FAQs ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <Eyebrow colorClass="text-ink/45" className="mb-4">Questions</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mb-5"
                style={{ fontSize: "clamp(28px, 2.5vw, 38px)", lineHeight: 1.1 }}
              >
                Common Questions
              </h2>
              <p className="text-[15px] font-light text-ink/55 leading-relaxed mb-6">
                <AutoLinkedText>{"Our admissions counselors are available 24 hours a day, 7 days a week."}</AutoLinkedText>
              </p>
              <div className="flex flex-col gap-3">
                <a href="tel:9494612620" className="flex items-center gap-2 text-accent text-[14px] font-medium hover:text-ink transition-colors">
                  <i className="ri-phone-line" /> (949)-461-2620
                </a>
                <Link href="/admissions" className="flex items-center gap-2 text-ink/50 text-[14px] font-medium hover:text-accent transition-colors">
                  <i className="ri-arrow-right-line" /> Admissions Process
                </Link>
              </div>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </SectionWrapper>
      </section>

      {/* ⑧  Related Programs ─────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <Eyebrow colorClass="text-ink/45" className="mb-4">Treatment Continuum</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink mb-10"
            style={{ fontSize: "clamp(28px, 2.5vw, 40px)", lineHeight: 1.1 }}
          >
            Where This Fits in Your Treatment Journey
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedPrograms.map(({ icon, label, title, desc, href }) => (
              <Link
                key={title}
                href={href}
                className="group bg-white border border-warm p-7 flex flex-col hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <IconCircle icon={icon} variant="accent-subtle" size="sm" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">{label}</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-ink mb-2 group-hover:text-accent transition-colors leading-snug">{title}</h3>
                <p className="text-[13px] font-light text-ink/60 leading-snug flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
                <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  Learn More <i className="ri-arrow-right-line" />
                </p>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑨  CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-ink relative overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #D98A53 0%, transparent 70%)" }}
          aria-hidden
        />
        <SectionWrapper className="text-center relative z-10">
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">Begin Mental Health Treatment</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(34px, 4vw, 58px)", lineHeight: 1.05, maxWidth: "700px" }}
          >
            You Deserve Care That Actually Works
          </h2>
          <p className="mt-6 text-[15px] font-light text-white/55 max-w-lg mx-auto leading-relaxed">
            <AutoLinkedText>{"Our admissions team is available around the clock for a free, confidential consultation. Same-day admissions available."}</AutoLinkedText>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:9494612620" variant="accent" size="lg">
              <i className="ri-phone-line mr-2" /> (949)-461-2620
            </Button>
            <Button href="/levels-of-care" variant="outline-white" size="lg">
              Explore All Programs
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {["Free Insurance Verification", "Psychiatrists On-Site", "100% Confidential"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line text-accent text-base" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65">{item}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>
    </>
  );
}

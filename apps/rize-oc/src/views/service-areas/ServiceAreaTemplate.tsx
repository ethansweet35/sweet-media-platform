"use client";

import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import InsuranceForm from "@/views/home/components/InsuranceForm";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─── Types ──────────────────────────────────────────────────────────────── */

export interface ServiceAreaProgram {
  icon: string;
  label: string;
  title: string;
  desc: string;
  href: string;
}

export interface ServiceAreaData {
  /** Slug used in the route, e.g. "irvine" */
  slug: string;
  /** Display name, e.g. "Irvine" */
  city: string;
  /** Filename only — uploaded to Supabase site-assets/images/, e.g. "irvine_hero01.jpg" */
  heroImage: string;
  heroImageAlt: string;
  /** Short phrase for hero eyebrow, e.g. "Serving Irvine, California" */
  heroEyebrow: string;
  /** Hero h1 line 1 */
  heroHeadline: string;
  /** Hero h1 italic line 2 */
  heroHeadlineEmphasis: string;
  /** Hero sub-paragraph */
  heroBody: string;
  /** Drive/transit time from the city, e.g. "~15 min" */
  driveTime: string;
  /** Pull-quote for the intro section */
  introQuote: string;
  /** 3 narrative paragraphs for the intro section */
  introParagraphs: [string, string, string];
  /** Override default programs list if needed */
  programs?: ServiceAreaProgram[];
  faqs: FaqItem[];
}

/* ─── Shared programs (default for every city) ───────────────────────────── */

const DEFAULT_PROGRAMS: ServiceAreaProgram[] = [
  {
    icon: "ri-pulse-line",
    label: "Level 1",
    title: "Drug & Alcohol Detox",
    desc: "Physician-supervised medically managed withdrawal — the safe, essential first step for anyone with moderate-to-severe dependence.",
    href: "/drug-alcohol-detox",
  },
  {
    icon: "ri-sun-line",
    label: "Level 2",
    title: "Partial Hospitalization (PHP)",
    desc: "Six hours of structured clinical programming per day, with evenings and weekends free for family and rest.",
    href: "/partial-hospitalization-program-orange-county",
  },
  {
    icon: "ri-group-line",
    label: "Level 3",
    title: "Intensive Outpatient (IOP)",
    desc: "Three to five days per week of evidence-based therapy — morning and evening options designed around working schedules.",
    href: "/iop-program-orange-county",
  },
  {
    icon: "ri-leaf-line",
    label: "Level 4",
    title: "Outpatient Program (OP)",
    desc: "Low-intensity, flexible outpatient support that sustains recovery while clients re-integrate into daily life.",
    href: "/outpatient-program",
  },
  {
    icon: "ri-computer-line",
    label: "Remote Option",
    title: "Virtual Outpatient",
    desc: "Clinically equivalent telehealth IOP — ideal for clients who work from home or have limited transportation.",
    href: "/virtual-outpatient-program",
  },
];

const CONDITIONS = [
  { icon: "ri-goblet-line",        label: "Alcohol Addiction",        href: "/addiction/alcohol" },
  { icon: "ri-capsule-line",       label: "Opiate Addiction",         href: "/addiction/opiate" },
  { icon: "ri-pill-line",          label: "Benzodiazepine Addiction",  href: "/addiction/benzodiazepine" },
  { icon: "ri-test-tube-line",     label: "Meth Addiction",           href: "/addiction/meth" },
  { icon: "ri-flask-line",         label: "Cocaine Addiction",        href: "/addiction/cocaine" },
  { icon: "ri-brain-line",         label: "Anxiety",                  href: "/mental-health/anxiety" },
  { icon: "ri-mental-health-line", label: "Depression",               href: "/mental-health/depression" },
  { icon: "ri-focus-3-line",       label: "ADHD",                     href: "/mental-health/adhd" },
  { icon: "ri-psychotherapy-line", label: "PTSD",                     href: "/mental-health/ptsd" },
  { icon: "ri-moon-line",          label: "Insomnia",                 href: "/mental-health/insomnia" },
];

const WHY_RIZE = [
  {
    icon: "ri-award-line",
    title: "Joint Commission Accredited",
    desc: "The gold standard in behavioral healthcare accreditation — objective assurance of clinical excellence for you and your family.",
  },
  {
    icon: "ri-stethoscope-line",
    title: "Physician-Led Medical Team",
    desc: "Board-certified addiction medicine physicians lead every treatment plan. Complex dual-diagnosis cases are a specialty, not an exception.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Individualized Treatment Plans",
    desc: "No cookie-cutter protocols. Every client receives a comprehensive biopsychosocial assessment driving a fully personalized clinical plan.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Most Insurance Plans Accepted",
    desc: "We work with Aetna, Cigna, Anthem, Blue Cross, UHC, and most major PPOs. Benefits verified within hours — free and confidential.",
  },
  {
    icon: "ri-map-pin-2-line",
    title: "Orange County Location",
    desc: "Close enough for family visits, far enough to create the therapeutic separation from daily triggers that recovery requires.",
  },
  {
    icon: "ri-team-line",
    title: "Continuity of Care",
    desc: "Step-down programming, alumni networks, and aftercare coordination keep clients supported long after their last clinical day.",
  },
];

/* ─── Template ────────────────────────────────────────────────────────────── */

export default function ServiceAreaTemplate({ data }: { data: ServiceAreaData }) {
  const {
    slug, city, heroImage, heroImageAlt, heroEyebrow,
    heroHeadline, heroHeadlineEmphasis, heroBody,
    driveTime, introQuote, introParagraphs, faqs,
  } = data;
  const programs = data.programs ?? DEFAULT_PROGRAMS;

  return (
    <main className="min-h-screen">

      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden min-h-[88vh] flex flex-col justify-end">
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
              "linear-gradient(to bottom, rgba(44,48,46,0.45) 0%, rgba(44,48,46,0.20) 35%, rgba(44,48,46,0.65) 65%, rgba(44,48,46,0.97) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 lg:px-10 pb-20 pt-40">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors">
              Home
            </Link>
            <span className="text-white/25 text-xs">/</span>
            <Link href="/service-areas" className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors">
              Service Areas
            </Link>
            <span className="text-white/25 text-xs">/</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">{city}, CA</span>
          </div>

          <div className="max-w-[700px]">
            <Eyebrow colorClass="text-accent">{heroEyebrow}</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mb-6"
              style={{ fontSize: "clamp(46px, 5.5vw, 84px)", lineHeight: 0.95 }}
            >
              {heroHeadline}
              <br />
              <em className="italic text-white/55">{heroHeadlineEmphasis}</em>
            </h1>
            <p className="text-[16px] font-light leading-relaxed text-white/80 max-w-[540px] mb-10">
              {heroBody}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="tel:9494612620" variant="accent" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> Call (949) 461-2620
              </Button>
              <a
                href="#verify"
                className="inline-flex items-center border border-white/30 text-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
              >
                Verify My Insurance
              </a>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 sm:max-w-[700px]">
            {[
              { value: driveTime,  label: `From ${city}` },
              { value: "24/7",     label: "Admissions Line" },
              { value: "1,400+",   label: "Lives Transformed" },
              { value: "98%",      label: "Client Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-ink/60 px-6 py-5 backdrop-blur-sm text-center">
                <p
                  className="font-[family-name:var(--font-display)] font-normal text-white"
                  style={{ fontSize: "clamp(20px, 2.3vw, 32px)" }}
                >
                  {value}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ②  Intro ────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[100px]">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">
            <div className="flex flex-col gap-8">
              <div className="border-l-2 border-accent pl-8">
                <p
                  className="font-[family-name:var(--font-display)] font-normal text-ink leading-snug"
                  style={{ fontSize: "clamp(22px, 2.3vw, 34px)" }}
                >
                  &ldquo;{introQuote}&rdquo;
                </p>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  — Rize OC Clinical Team
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { icon: "ri-map-pin-2-line",   text: `${driveTime} from ${city}` },
                  { icon: "ri-time-line",         text: "Same-day admissions" },
                  { icon: "ri-shield-check-line", text: "Most PPOs accepted" },
                  { icon: "ri-lock-line",         text: "100% confidential" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 bg-cream-tile border border-soft p-4">
                    <i className={`${icon} text-accent text-lg`} />
                    <span className="text-[12px] font-medium text-ink leading-snug">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <Eyebrow colorClass="text-accent">{city}, CA</Eyebrow>
                <h2
                  className="font-[family-name:var(--font-display)] font-normal text-ink mt-3"
                  style={{ fontSize: "clamp(26px, 2.8vw, 40px)", lineHeight: 1.08 }}
                >
                  Premium Care, Close to Home
                </h2>
              </div>
              {introParagraphs.map((para, i) => (
                <p key={i} className="text-[15px] leading-[1.85] text-ink/70">{para}</p>
              ))}
              <div className="mt-2">
                <Button href="/admissions" variant="accent" size="sm">
                  Start the Admissions Process <i className="ri-arrow-right-line ml-2 text-xs" />
                </Button>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ③  Programs ─────────────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper py="py-[100px]">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <Eyebrow colorClass="text-ink/45">Treatment Programs</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
              style={{ fontSize: "clamp(28px, 3.2vw, 46px)", lineHeight: 1.08 }}
            >
              Programs Available to
              <br />
              <em className="italic text-muted font-normal">{city} Residents</em>
            </h2>
            <p className="mt-4 text-[15px] font-light text-ink/60 leading-relaxed">
              A full continuum of care — from medically supervised detox through flexible outpatient recovery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map(({ icon, label, title, desc, href }) => (
              <Link
                key={title}
                href={href}
                className="group bg-white border border-warm p-7 flex flex-col hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <IconCircle icon={icon} colorClass="bg-accent/10 text-accent" size="w-10 h-10 text-base" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">{label}</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-ink mb-2 group-hover:text-accent transition-colors leading-snug">{title}</h3>
                <p className="text-[13px] font-light text-ink/60 leading-snug flex-1">{desc}</p>
                <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  Learn More <i className="ri-arrow-right-line" />
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/levels-of-care" variant="outline-ink" size="md">
              View Full Levels of Care <i className="ri-arrow-right-line ml-2 text-xs" />
            </Button>
          </div>
        </SectionWrapper>
      </section>

      {/* ④  Conditions ───────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden py-[100px]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/5" />

        <div className="relative mx-auto w-full max-w-[1300px] px-6 lg:px-10">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <Eyebrow colorClass="text-accent">Conditions We Treat</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4"
              style={{ fontSize: "clamp(26px, 3vw, 42px)", lineHeight: 1.08 }}
            >
              Addiction &amp; Mental Health
              <br />
              <em className="italic text-white/55">Treatment for {city}</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CONDITIONS.map(({ icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-3 border border-white/8 bg-white/5 px-5 py-4 hover:bg-white/10 hover:border-accent/30 transition-colors"
              >
                <i className={`${icon} text-accent text-lg shrink-0`} />
                <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/75 group-hover:text-white transition-colors leading-tight">{label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center flex flex-wrap items-center justify-center gap-5">
            <Link href="/addiction" className="inline-flex items-center gap-2 text-accent text-[11px] font-medium uppercase tracking-[0.2em] hover:gap-3 transition-all">
              All Addiction Programs <i className="ri-arrow-right-line" />
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/mental-health" className="inline-flex items-center gap-2 text-accent text-[11px] font-medium uppercase tracking-[0.2em] hover:gap-3 transition-all">
              All Mental Health Programs <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </section>

      {/* ⑤  Why Rize ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[100px]">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <Eyebrow colorClass="text-accent">Why Rize OC</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
              style={{ fontSize: "clamp(26px, 3vw, 42px)", lineHeight: 1.08 }}
            >
              What {city} Residents Should Know
              <br />
              <em className="italic text-muted font-normal">Before Choosing a Provider</em>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_RIZE.map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-5 p-8 border border-warm/20 bg-cream-tile">
                <div className="flex items-start gap-4">
                  <IconCircle icon={icon} colorClass="bg-accent/10 text-accent" size="w-10 h-10 text-lg shrink-0" />
                  <h3 className="font-semibold text-ink text-[14px] leading-tight mt-2">{title}</h3>
                </div>
                <p className="text-[14px] text-ink/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑥  Verify Insurance ─────────────────────────────────────────────── */}
      <section id="verify" className="bg-cream-alt scroll-mt-24">
        <SectionWrapper py="py-[100px]">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-0 items-start">
            <div className="px-0 lg:pr-16 pb-10 lg:pb-0">
              <Eyebrow colorClass="text-accent" className="mb-4">Insurance Verification</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mb-5"
                style={{ fontSize: "clamp(26px, 2.8vw, 40px)", lineHeight: 1.08 }}
              >
                Verify Your Coverage
                <br />
                <em className="italic text-muted font-normal">In Minutes, Not Days</em>
              </h2>
              <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-8">
                Our utilization review team calls your insurer directly — for free — and walks you through exactly what your plan covers, your out-of-pocket costs, and what treatment level is authorized.
              </p>
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: "ri-money-dollar-circle-line", title: "Deductibles & co-pays",         desc: "Know your exact costs before committing to anything" },
                  { icon: "ri-file-list-3-line",         title: "Authorization & length of stay",  desc: "What your plan approves and for how long" },
                  { icon: "ri-shield-check-line",        title: "In vs. out-of-network status",   desc: "Whether Rize is in your plan's network" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <IconCircle icon={icon} colorClass="bg-accent/15 text-accent" size="w-8 h-8 text-sm shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-medium text-ink">{title}</p>
                      <p className="text-[13px] font-light text-ink/55 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[13px] font-light text-ink/45 italic">
                We accept most major PPOs. We do not accept Medi-Cal or Medicaid.
              </p>
            </div>
            <div className="bg-white p-10">
              <div className="flex items-center gap-3 mb-6">
                <IconCircle icon="ri-shield-fill" variant="ink" size="sm" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">Free Benefit Check</p>
                  <p className="text-xs text-ink/45 mt-0.5">No obligation · HIPAA compliant</p>
                </div>
              </div>
              <InsuranceForm showNotesField />
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑦  FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[100px]">
          <div className="grid lg:grid-cols-[360px_1fr] gap-16 xl:gap-24">
            <div className="lg:sticky lg:top-28 self-start">
              <Eyebrow colorClass="text-accent">Questions From {city}</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
                style={{ fontSize: "clamp(24px, 2.6vw, 38px)", lineHeight: 1.1 }}
              >
                {city}-Specific
                <br />
                <em className="italic text-muted">Questions, Answered.</em>
              </h2>
              <p className="mt-5 text-[14px] font-light text-ink/60 leading-relaxed">
                Still have questions? Our admissions team is available 24/7.
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <Button href="tel:9494612620" variant="accent" size="sm">
                  <i className="ri-phone-line mr-2 text-xs" /> (949) 461-2620
                </Button>
                <Button href="/admissions" variant="outline-ink" size="sm">
                  Admissions Process <i className="ri-arrow-right-line ml-2 text-xs" />
                </Button>
              </div>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </SectionWrapper>
      </section>

      {/* ⑧  Accreditations ──────────────────────────────────────────────── */}
      <AccreditationsBar />

      {/* ⑨  CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-ink relative overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #D98A53 0%, transparent 70%)" }}
          aria-hidden
        />
        <SectionWrapper className="text-center relative z-10">
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">Serving {city} &amp; All of Orange County</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(30px, 4vw, 56px)", lineHeight: 1.05, maxWidth: "700px" }}
          >
            Recovery Is Possible —
            <br />
            <em className="italic text-white/60">It Starts With One Call</em>
          </h2>
          <p className="mt-6 text-[15px] font-light text-white/65 max-w-lg mx-auto leading-relaxed">
            Speak confidentially with our admissions team — no commitment required. Same-day assessments available for {city} residents.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:9494612620" variant="accent" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
            <Button href="/verify-insurance" variant="outline-white" size="lg">
              Verify My Insurance
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {["Free Insurance Verification", "Same-Day Admissions", "100% Confidential"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line text-accent text-base" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">{item}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

    </main>
  );
}

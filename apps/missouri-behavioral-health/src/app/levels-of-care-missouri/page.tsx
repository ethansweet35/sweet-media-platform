import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF, SITE_IMAGES } from "@/data/site";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";

const HERO_BG =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images/missouri-levels-of-care-hero-bg.jpg";

const fallback: Metadata = {
  title: "Levels of Care | Missouri Behavioral Health",
  description:
    "Missouri Behavioral Health offers a full continuum of care — PHP, IOP, and Outpatient — for addiction and mental health treatment in Springfield, MO.",
  alternates: { canonical: "/levels-of-care-missouri" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/levels-of-care-missouri", fallback);
}

const LEVELS = [
  {
    href: "/php-sober-living",
    icon: "ri-hospital-line",
    abbr: "PHP",
    label: "Partial Hospitalization Program",
    intensity: "Most Intensive",
    hours: "5–7 days per week · 6+ hrs/day",
    desc: "Structured, hospital-level programming without overnight stays. PHP provides the highest level of outpatient care with daily therapeutic groups, psychiatric oversight, and medical monitoring — ideal for those stepping down from residential or detox.",
    ideal: [
      "Recent detox or hospital discharge",
      "High relapse risk requiring daily structure",
      "Co-occurring psychiatric conditions",
      "No stable home environment for IOP",
    ],
  },
  {
    href: "/iop-missouri",
    icon: "ri-team-line",
    abbr: "IOP",
    label: "Intensive Outpatient Program",
    intensity: "Moderate–High Intensity",
    hours: "3–5 days per week · 3 hrs/day",
    desc: "Our IOP offers flexible scheduling so clients can maintain work, school, or family responsibilities while receiving meaningful clinical care. Includes group therapy, individual counseling, and skills-based programming.",
    ideal: [
      "Stable enough for some independence",
      "Work or family commitments to maintain",
      "Stepping down from PHP",
      "Building a recovery community",
    ],
  },
  {
    href: "/outpatient-rehab-springfield-mo",
    icon: "ri-calendar-check-line",
    abbr: "OP",
    label: "Outpatient Program",
    intensity: "Maintenance & Ongoing",
    hours: "1–2 days per week · 1–2 hrs/session",
    desc: "Outpatient counseling supports long-term recovery through regular check-ins, relapse prevention skill reinforcement, and continued therapeutic relationship. Designed for individuals who've completed higher levels and are building life in recovery.",
    ideal: [
      "Completion of PHP or IOP",
      "Stable home and support network",
      "Ongoing accountability and skill building",
      "Mental health maintenance therapy",
    ],
  },
];

const CONTINUUM = [
  { step: "Detox / Residential", desc: "Medical stabilization and safe withdrawal", active: false },
  { step: "PHP", desc: "Daily structured day programming", active: true },
  { step: "IOP", desc: "Flexible multi-day group + individual therapy", active: true },
  { step: "Outpatient", desc: "Weekly counseling & relapse prevention", active: true },
  { step: "Aftercare", desc: "Alumni support & ongoing community", active: false },
];

const APPROACHES = [
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy (CBT)" },
  { icon: "ri-heart-pulse-line", label: "Dialectical Behavior Therapy (DBT)" },
  { icon: "ri-group-line", label: "Group Process Therapy" },
  { icon: "ri-parent-line", label: "Family Systems Therapy" },
  { icon: "ri-medicine-bottle-line", label: "Medication-Assisted Treatment (MAT)" },
  { icon: "ri-leaf-line", label: "Trauma-Informed Care" },
  { icon: "ri-mental-health-line", label: "Dual Diagnosis Treatment" },
  { icon: "ri-discuss-line", label: "Motivational Interviewing" },
];

const INSURANCE = [
  "Aetna", "Anthem Blue Cross", "Blue Cross Blue Shield",
  "Cigna", "Beacon Health", "Carelon",
  "GEHA", "Cox Health",
];

const FAQS = [
  {
    q: "How do I know which level of care is right for me?",
    a: "Our clinical team conducts a comprehensive assessment that evaluates your substance use history, mental health status, home environment, and support network. Based on ASAM criteria, we recommend the most appropriate level of care — and we reassess regularly so you step up or down as needed.",
  },
  {
    q: "Can I transition between levels of care?",
    a: "Absolutely. The continuum of care is designed to flow — from PHP to IOP to Outpatient, and back up if a relapse or crisis occurs. We coordinate all transitions internally so there's no gap in your care.",
  },
  {
    q: "Does insurance cover PHP and IOP?",
    a: "Most major private insurance plans cover PHP and IOP at significant rates. Coverage varies by plan, so we verify your benefits before treatment begins — at no cost to you. Our team handles all insurance communication on your behalf.",
  },
  {
    q: "What is a typical day in PHP like?",
    a: "PHP runs Monday–Friday and includes morning check-ins, structured therapeutic groups (CBT, DBT, process groups), individual therapy sessions, psychoeducation, and skills workshops. Afternoons may include peer support or family sessions. You return home or to sober living each evening.",
  },
  {
    q: "How long does each level of care typically last?",
    a: "PHP usually lasts 2–4 weeks. IOP commonly runs 4–8 weeks. Outpatient is ongoing and varies by individual progress. Sober living is flexible based on housing needs and personal goals. Lengths are driven by clinical progress, not fixed timelines.",
  },
  {
    q: "Can I work or go to school while in IOP?",
    a: "Yes — that's one of IOP's key advantages. We offer morning and evening IOP schedules so you can maintain employment, school, or family obligations while receiving meaningful, structured treatment.",
  },
];

export default function LevelsOfCarePage() {
  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[90vh] flex-col overflow-hidden">
        {/* Background photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        {/* Gradient — warm, earthy tones to match the interior photography */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,22,12,0.78) 0%, rgba(15,22,12,0.30) 28%, rgba(15,22,12,0.14) 50%, rgba(15,22,12,0.68) 70%, rgba(15,22,12,0.97) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-1 flex-col justify-end">
          <div className={CONTAINER}>
            {/* Breadcrumb */}
            <nav
              className="mb-8 flex items-center gap-2 font-body text-[11px] text-white/35"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="transition-colors hover:text-white/65">Home</Link>
              <i className="ri-arrow-right-s-line" aria-hidden />
              <span className="text-white/55">Levels of Care</span>
            </nav>

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
                Treatment Programs · Springfield, MO
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-display font-semibold leading-[1.04] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)" }}
            >
              A full continuum of care,<br className="hidden sm:block" /> built for lasting recovery.
            </h1>

            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-white/65">
              Missouri Behavioral Health offers PHP, IOP, and Outpatient programs — a step-by-step continuum that meets you where you are and moves with you through every stage of recovery.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-mbh-green/20 transition hover:bg-mbh-green-hover"
              >
                <i className="ri-phone-fill" aria-hidden /> Call 24/7 — {PHONE_DISPLAY}
              </a>
              <Link
                href="/verify-insurance"
                className="inline-flex items-center gap-2 rounded-full border border-white/22 px-7 py-3.5 font-body text-sm font-semibold text-white/85 transition hover:border-white/42 hover:bg-white/8"
              >
                <i className="ri-shield-check-line" aria-hidden /> Verify Insurance
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-14 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pb-14 pt-8">
              {[
                { value: "3 Programs", label: "PHP · IOP · Outpatient" },
                { value: "Same-Day", label: "Admissions often available" },
                { value: "Most Insurance", label: "Accepted — verified at no cost" },
              ].map((s) => (
                <div key={s.label} className="px-4 first:pl-0 last:pr-0 sm:px-8">
                  <p className="font-display text-[clamp(1.4rem,2.8vw,2.2rem)] font-semibold text-white">{s.value}</p>
                  <p className="mt-1 font-body text-[11px] leading-snug text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEVELS GRID ───────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]" id="programs">
        <div className={CONTAINER}>
          <div className="mb-14">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Our Programs
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Four levels. One seamless journey.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-mbh-body">
              Each level of care is clinically distinct and designed to provide the right amount of support at the right time — from intensive daily programming to long-term community-based recovery.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {LEVELS.map((lvl) => (
              <Link
                key={lvl.href}
                href={lvl.href}
                className="group flex flex-col gap-6 rounded-3xl border border-mbh-forest/8 bg-cream p-8 transition-all hover:border-mbh-green/25 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-green/70">
                      {lvl.abbr}
                    </span>
                    <span className="rounded-full bg-mbh-forest/5 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-mbh-forest/60">
                      {lvl.intensity}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mbh-green/10 transition-colors group-hover:bg-mbh-green/15">
                      <i className={`${lvl.icon} text-2xl text-mbh-green`} aria-hidden />
                    </span>
                    <p className="font-display text-[1.1rem] font-semibold leading-snug text-mbh-forest">
                      {lvl.label}
                    </p>
                  </div>
                </div>

                <p className="font-body text-sm leading-relaxed text-mbh-body">{lvl.desc}</p>

                <div>
                  <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-mbh-forest/40">
                    Ideal for
                  </p>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {lvl.ideal.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mbh-green/12">
                          <i className="ri-check-line text-[9px] text-mbh-green" aria-hidden />
                        </span>
                        <span className="font-body text-xs leading-snug text-mbh-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex items-center gap-2 font-body text-xs font-semibold text-mbh-green opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-mbh-body/40 mr-auto">
                    {lvl.hours}
                  </span>
                  Learn more <i className="ri-arrow-right-line" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MBH ───────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Why Missouri Behavioral Health
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Clinical quality that stays consistent across every level.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              The level of care changes as you progress. The quality of care never does.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "ri-award-line",
                title: "JCAHO Accredited",
                desc: "Joint Commission accreditation is the national gold standard for behavioral health quality and safety. We earn it — and maintain it.",
              },
              {
                icon: "ri-mental-health-line",
                title: "Dual-diagnosis capable",
                desc: "Every level of care is equipped to treat co-occurring mental health conditions alongside addiction — no splitting care between providers.",
              },
              {
                icon: "ri-refresh-line",
                title: "Internal level transitions",
                desc: "Move between PHP, IOP, and outpatient without changing providers. Your clinical team stays with you across every transition.",
              },
              {
                icon: "ri-user-heart-line",
                title: "Individualized plans",
                desc: "No two treatment plans are the same. Every client is assessed and programmed individually, with weekly clinical reviews and plan updates.",
              },
              {
                icon: "ri-parent-line",
                title: "Family-inclusive care",
                desc: "Families are not an afterthought. Family therapy sessions, educational workshops, and regular updates are built into every level of care.",
              },
              {
                icon: "ri-shield-check-line",
                title: "Insurance maximized",
                desc: "We verify your benefits before day one and handle all insurance communication — so your team is focused on treatment, not paperwork.",
              },
              {
                icon: "ri-computer-line",
                title: "Statewide telehealth",
                desc: "IOP and outpatient are both available via HIPAA-compliant telehealth — making clinical care accessible to every Missouri resident.",
              },
              {
                icon: "ri-time-line",
                title: "Same-day admissions",
                desc: "We routinely complete assessments and begin treatment the same day a client calls. Waiting is not a barrier to starting care at MBH.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${item.icon} text-lg text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-mbh-forest">{item.title}</p>
                  <p className="mt-1.5 font-body text-xs leading-relaxed text-mbh-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTINUUM OF CARE ─────────────────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                The Journey
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
              Recovery is a continuum, not a moment.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-white/55">
              Each step of the treatment continuum builds on the last. We meet you at any point and guide you through as many phases as your recovery requires.
            </p>
          </div>

          <div className="relative mt-10">
            {/* Connector line */}
            <div
              aria-hidden
              className="absolute left-6 top-6 bottom-6 w-px bg-white/10 lg:left-0 lg:top-5 lg:bottom-auto lg:h-px lg:w-full"
            />

            <div className="relative grid gap-6 lg:grid-cols-5">
              {CONTINUUM.map((item, i) => (
                <div key={item.step} className="flex gap-4 lg:flex-col lg:gap-3">
                  <div className="relative flex-shrink-0">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-body text-xs font-bold transition-colors ${
                        item.active
                          ? "border-mbh-green bg-mbh-green text-white"
                          : "border-white/20 bg-white/5 text-white/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <p className={`font-display text-sm font-semibold ${item.active ? "text-white" : "text-white/35"}`}>
                      {item.step}
                    </p>
                    <p className="mt-0.5 font-body text-xs leading-snug text-white/35">{item.desc}</p>
                    {item.active && (
                      <span className="mt-1.5 inline-block rounded-full bg-mbh-green/15 px-2 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.18em] text-mbh-sage">
                        Offered at MBH
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Client Stories
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What recovery looks like at MBH.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                quote: "I came in after a hospital stay with no idea what PHP even was. Within a week, I had a clinical team that actually knew me — my history, my triggers, my goals. I went from PHP to IOP to outpatient without ever feeling like I was starting over.",
                name: "Client, PHP → IOP → Outpatient",
                highlight: "Same-day admission after hospital discharge",
              },
              {
                quote: "The evening IOP track was the only reason I could actually do this. I work full time. I have two kids. Being able to go three evenings a week and come home to my family — that's what made treatment sustainable for me instead of something I'd have to abandon.",
                name: "Client, Evening IOP",
                highlight: "Completed IOP while working full-time",
              },
              {
                quote: "Virtual IOP changed everything. I live 90 minutes from Springfield and there's no way I could have attended in person. I got the same groups, the same therapist, the same clinical experience — just from my living room. I've been sober 14 months.",
                name: "Client, Virtual IOP",
                highlight: "14 months sober via telehealth IOP",
              },
            ].map((t) => (
              <div key={t.name} className="flex flex-col gap-6 rounded-3xl border border-mbh-forest/8 bg-cream p-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="ri-star-fill text-mbh-green text-sm" aria-hidden />
                  ))}
                </div>
                <p className="font-body text-sm leading-relaxed text-mbh-body flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-mbh-forest/8 pt-4">
                  <p className="font-display text-xs font-semibold text-mbh-forest">{t.name}</p>
                  <p className="mt-0.5 font-body text-[11px] text-mbh-green">{t.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLINICAL APPROACHES ───────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Evidence-Based Methods
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Clinically grounded treatment across every level.
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-mbh-body">
                Regardless of which program you're in, the clinical quality at Missouri Behavioral Health remains consistent. Our therapists, counselors, and psychiatric staff draw from a robust toolkit of evidence-based modalities — tailored to each person's diagnosis and treatment goals.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {APPROACHES.map((a) => (
                  <div key={a.label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                      <i className={`${a.icon} text-base text-mbh-green`} aria-hidden />
                    </span>
                    <span className="font-body text-sm text-mbh-body">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={SITE_IMAGES.facilityInterior}
                alt="Missouri Behavioral Health treatment facility"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3", objectPosition: "center" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(18,46,24,0.3) 0%, transparent 50%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── INSURANCE ─────────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                Coverage
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
              Most major insurance accepted.
            </h2>
            <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-white/55">
              We work directly with your insurance company to maximize your benefits. Verification is free and takes just minutes — so nothing stands between you and care.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INSURANCE.map((ins) => (
              <div
                key={ins}
                className="flex items-center justify-center rounded-2xl border border-white/8 bg-white/4 px-4 py-5 text-center font-body text-sm font-semibold text-white/65"
              >
                {ins}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/verify-insurance"
              className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
            >
              <i className="ri-shield-check-line" aria-hidden /> Verify My Insurance
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white/80 transition hover:border-white/40 hover:bg-white/8"
            >
              <i className="ri-phone-line" aria-hidden /> Speak With Admissions
            </a>
          </div>
        </div>
      </section>

      {/* ── ADMISSIONS PROCESS ────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-14">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                How to Start
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              From first call to first session.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Our admissions process is designed to get you or your loved one into care as quickly and smoothly as possible. Most clients complete all four steps within 24 hours.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                icon: "ri-phone-line",
                title: "Call 24/7",
                desc: "A live admissions coordinator answers every call — no recordings, no callbacks. We take your information, answer your questions, and schedule an assessment.",
              },
              {
                step: "02",
                icon: "ri-stethoscope-line",
                title: "Clinical assessment",
                desc: "A free 30–60 minute phone or in-person assessment with a licensed clinician. We evaluate your history, current status, and goals to determine the right level of care.",
              },
              {
                step: "03",
                icon: "ri-shield-check-line",
                title: "Insurance verified",
                desc: "We contact your insurer, confirm your benefits, and explain your coverage clearly before your first day. Verification is completely free with no commitment required.",
              },
              {
                step: "04",
                icon: "ri-calendar-check-line",
                title: "Treatment begins",
                desc: "Arrive, meet your clinical team, and start your individualized program. Same-day and next-morning starts are available. Sober living placement can be coordinated simultaneously.",
              },
            ].map((s) => (
              <div key={s.step} className="relative flex flex-col gap-5 rounded-3xl border border-mbh-forest/8 bg-cream p-7">
                <span className="absolute right-5 top-5 font-display text-[2.5rem] font-bold leading-none text-mbh-forest/5 select-none">
                  {s.step}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${s.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{s.title}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
            >
              <i className="ri-phone-fill" aria-hidden /> Call 24/7 — {PHONE_DISPLAY}
            </a>
            <Link
              href="/verify-insurance"
              className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-green/30 hover:bg-mbh-green/5"
            >
              <i className="ri-shield-check-line" aria-hidden /> Verify insurance free
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={`${CONTAINER} max-w-4xl`}>
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Common Questions
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Questions about our levels of care.
            </h2>
          </div>
          <SubstanceFaq items={FAQS} />
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                Start Today
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white">
                Not sure which program is right for you?
              </h2>
              <p className="mt-2 font-body text-sm text-white/50">
                Our admission coordinators will walk you through every option — no pressure, no commitment required.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-mbh-forest shadow-xl transition hover:bg-mbh-mint"
              >
                <i className="ri-phone-fill" aria-hidden /> Call Now — {PHONE_DISPLAY}
              </a>
              <Link
                href="/verify-insurance"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8"
              >
                Verify Insurance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

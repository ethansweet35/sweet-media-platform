import Link from "next/link";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

/**
 * Landing-page layout for PHP / IOP / Outpatient / Sober Living pages.
 *
 * Hero: full-width background photo with a bottom-anchored two-column layout —
 * large heading + CTAs on the left, floating quick-facts card on the right.
 * Below the hero: a program switcher strip, page-specific content (children),
 * a "Day in the Program" zigzag timeline, other levels nav, and bottom CTA.
 */

const HERO_BG =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images/missouri-levels-of-care-hero-bg.jpg";

const ALL_LEVELS = [
  { label: "PHP", full: "Partial Hospitalization", href: "/php-sober-living", icon: "ri-hospital-line" },
  { label: "IOP", full: "Intensive Outpatient", href: "/iop-missouri", icon: "ri-team-line" },
  { label: "Outpatient", full: "Outpatient Program", href: "/outpatient-rehab-springfield-mo", icon: "ri-calendar-check-line" },
];

export interface QuickFact { icon: string; label: string; value: string }
export interface DayStep   { time: string; activity: string; detail: string }

interface Props {
  /** Short program name e.g. "PHP" */
  abbr: string;
  /** Full program name e.g. "Partial Hospitalization Program" */
  programName: string;
  /** Current page path for nav highlighting */
  currentPath: string;
  /** One-line tagline displayed under the program name in the hero */
  tagline: string;
  /** 3–4 quick-fact rows shown in the hero right card */
  quickFacts: QuickFact[];
  /** Hero body paragraph */
  heroBody: string;
  /** Schedule/intensity badge text e.g. "5–7 days/week · 6+ hrs/day" */
  schedule: string;
  /** Sample day schedule shown in the timeline section */
  daySchedule: DayStep[];
  children: React.ReactNode;
}

export default function LevelOfCareLayout({
  abbr,
  programName,
  currentPath,
  tagline,
  quickFacts,
  heroBody,
  schedule,
  daySchedule,
  children,
}: Props) {
  const otherLevels = ALL_LEVELS.filter((l) => l.href !== currentPath);

  return (
    <>
      {/* ── HERO — full-width photo with bottom content + floating card ──────── */}
      <section className="relative flex min-h-[92vh] flex-col overflow-hidden">

        {/* Background photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />

        {/* Gradient — heavy at top for nav, very transparent midway, crushing dark at bottom */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,22,12,0.82) 0%, rgba(10,22,12,0.22) 35%, rgba(10,22,12,0.10) 55%, rgba(10,22,12,0.75) 75%, rgba(10,22,12,0.97) 100%)",
          }}
        />

        {/* Content — anchored to bottom */}
        <div className="relative z-10 flex flex-1 flex-col justify-end">
          <div className={CONTAINER}>

            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 font-body text-[11px] text-white/35" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white/65">Home</Link>
              <i className="ri-arrow-right-s-line" aria-hidden />
              <Link href="/levels-of-care-missouri" className="transition-colors hover:text-white/65">Levels of Care</Link>
              <i className="ri-arrow-right-s-line" aria-hidden />
              <span className="text-white/55">{abbr}</span>
            </nav>

            {/* Two-column: heading left, card right */}
            <div className="grid gap-10 pb-14 lg:grid-cols-[1fr_380px] lg:gap-16 xl:grid-cols-[1fr_420px]">

              {/* LEFT — heading + CTAs */}
              <div>
                {/* Badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mbh-sage/30 bg-black/20 px-4 py-1.5 backdrop-blur-sm">
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-sage">{abbr}</span>
                  <span className="h-3 w-px bg-mbh-sage/30" aria-hidden />
                  <span className="font-body text-[10px] text-white/50">{schedule}</span>
                </div>

                <h1
                  className="font-display font-semibold leading-[1.03] tracking-[-0.025em] text-white"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}
                >
                  {programName}
                </h1>

                <p className="mt-3 font-body text-base font-medium text-mbh-sage/85">{tagline}</p>

                <p className="mt-5 max-w-lg font-body text-[0.9375rem] leading-relaxed text-white/60">
                  {heroBody}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-mbh-green-hover"
                  >
                    <i className="ri-phone-fill" aria-hidden /> Call 24/7 — {PHONE_DISPLAY}
                  </a>
                  <Link
                    href="/verify-insurance"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-body text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/8"
                  >
                    <i className="ri-shield-check-line" aria-hidden /> Verify Insurance
                  </Link>
                </div>
              </div>

              {/* RIGHT — floating quick-facts card */}
              <div className="hidden lg:flex lg:flex-col lg:justify-end">
                <div className="rounded-3xl border border-white/12 bg-white/10 p-7 shadow-2xl backdrop-blur-md xl:p-8">
                  <p className="mb-5 font-body text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
                    Program at a glance
                  </p>
                  <ul className="space-y-4">
                    {quickFacts.map((f) => (
                      <li key={f.label} className="flex items-center gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/25">
                          <i className={`${f.icon} text-lg text-mbh-sage`} aria-hidden />
                        </span>
                        <div>
                          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                            {f.label}
                          </p>
                          <p className="mt-0.5 font-display text-[0.9375rem] font-semibold text-white">{f.value}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-white/12 pt-5">
                    <Link
                      href="/admissions"
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:bg-mbh-mint"
                    >
                      Start admissions <i className="ri-arrow-right-line" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTINUUM STRIP ─────────────────────────────────────────────────── */}
      <div className="border-b border-mbh-forest/8 bg-white">
        <div className={CONTAINER}>
          <div className="flex items-stretch divide-x divide-mbh-forest/8 overflow-x-auto">
            {ALL_LEVELS.map((lvl) => {
              const active = lvl.href === currentPath;
              return (
                <Link
                  key={lvl.href}
                  href={lvl.href}
                  className={`flex min-w-[140px] flex-col items-center gap-1.5 px-6 py-5 text-center transition-colors ${
                    active
                      ? "bg-mbh-green/8 text-mbh-green"
                      : "text-mbh-body/50 hover:bg-cream hover:text-mbh-forest"
                  }`}
                >
                  <i className={`${lvl.icon} text-xl`} aria-hidden />
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em]">{lvl.label}</span>
                  {active && <span className="h-0.5 w-6 rounded-full bg-mbh-green" aria-hidden />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── TRUST STRIP ─────────────────────────────────────────────────────── */}
      <div className="border-b border-mbh-forest/8 bg-cream py-5">
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {[
              { icon: "ri-award-line",         stat: "Accredited",        label: "Joint Commission accredited" },
              { icon: "ri-shield-check-line",  stat: "Most Insurance",    label: "Accepted & verified free" },
              { icon: "ri-time-line",           stat: "Same-Day",          label: "Admissions often available" },
              { icon: "ri-map-pin-2-line",      stat: "Springfield, MO",   label: "& statewide telehealth" },
            ].map((item) => (
              <div key={item.stat} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${item.icon} text-base text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-mbh-forest">{item.stat}</p>
                  <p className="font-body text-xs text-mbh-body/55">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAGE-SPECIFIC CONTENT ────────────────────────────────────────────── */}
      {children}

      {/* ── A DAY IN THE PROGRAM ─────────────────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                  Sample Schedule
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                A day in {abbr}.
              </h2>
            </div>
            <p className="max-w-xs font-body text-sm leading-relaxed text-white/40 lg:text-right">
              Schedules vary by individual treatment plan. This reflects a typical day.
            </p>
          </div>

          <div className="relative">
            {/* Vertical spine */}
            <div aria-hidden className="absolute left-[23px] top-6 bottom-6 w-px bg-white/8 lg:left-1/2 lg:-translate-x-px" />

            <div className="space-y-6">
              {daySchedule.map((step, i) => (
                <div
                  key={i}
                  className={`relative flex gap-6 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Content bubble */}
                  <div className={`flex-1 ${i % 2 === 0 ? "lg:pr-12 xl:pr-16" : "lg:pl-12 xl:pl-16"} ${i % 2 !== 0 ? "lg:text-right" : ""}`}>
                    <div className={`inline-block rounded-2xl border border-white/8 bg-white/5 px-6 py-5 ${i % 2 !== 0 ? "lg:ml-auto" : ""}`}>
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-sage/60">
                        {step.time}
                      </p>
                      <p className="mt-1 font-display text-[0.9375rem] font-semibold text-white">{step.activity}</p>
                      <p className="mt-1.5 font-body text-sm leading-relaxed text-white/45">{step.detail}</p>
                    </div>
                  </div>

                  {/* Center dot — mobile: left spine, desktop: center */}
                  <div className="absolute left-[15px] top-5 flex h-4 w-4 items-center justify-center rounded-full bg-mbh-green ring-4 ring-mbh-forest-deep lg:left-1/2 lg:-translate-x-1/2" aria-hidden />

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ADMISSIONS PROCESS ───────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-14">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Getting Started
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Starting {abbr} is simpler than you think.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Our admissions team handles everything — from your first call to your first session. Most people complete intake within 24 hours of reaching out.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                icon: "ri-phone-line",
                title: "Call or reach out",
                desc: "Contact our admissions team 24/7. A live coordinator — not a recording — answers every call and schedules a free clinical assessment the same day.",
              },
              {
                step: "02",
                icon: "ri-stethoscope-line",
                title: "Free clinical assessment",
                desc: "A 30–60 minute phone or in-person call with a licensed clinician. We review your history, current situation, and goals to identify the right level of care.",
              },
              {
                step: "03",
                icon: "ri-shield-check-line",
                title: "Insurance verified",
                desc: "We contact your insurance provider and confirm your benefits before anything begins. No surprises — you'll know exactly what's covered before your first session.",
              },
              {
                step: "04",
                icon: "ri-calendar-check-line",
                title: "Treatment begins",
                desc: "Arrive, meet your treatment team, and start your individualized program. Many clients begin the same day or the following morning.",
              },
            ].map((s) => (
              <div key={s.step} className="relative flex flex-col gap-5 rounded-3xl border border-mbh-forest/8 bg-white p-7 shadow-sm">
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
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-green/30 hover:bg-mbh-green/5"
            >
              Learn about admissions <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OTHER LEVELS ─────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16">
        <div className={CONTAINER}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-mbh-forest/35">
                Also Available
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-mbh-forest">
                Other levels of care at MBH.
              </p>
            </div>
            <Link
              href="/levels-of-care-missouri"
              className="hidden font-body text-xs font-semibold text-mbh-green underline-offset-4 hover:underline sm:inline-flex items-center gap-1"
            >
              View all programs <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {otherLevels.map((lvl) => (
              <Link
                key={lvl.href}
                href={lvl.href}
                className="group flex items-center gap-4 rounded-2xl border border-mbh-forest/8 bg-white px-6 py-5 transition-all hover:border-mbh-green/25 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10 transition-colors group-hover:bg-mbh-green/15">
                  <i className={`${lvl.icon} text-lg text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-mbh-forest/40">{lvl.label}</p>
                  <p className="font-display text-sm font-semibold text-mbh-forest">{lvl.full}</p>
                </div>
                <i className="ri-arrow-right-line ml-auto text-mbh-forest/20 transition-colors group-hover:text-mbh-green" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                Ready to Begin?
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white">
                Admission coordinators are available 24/7.
              </h2>
              <p className="mt-2 font-body text-sm text-white/50">
                Confidential · HIPAA-compliant · Same-day admissions available
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
    </>
  );
}

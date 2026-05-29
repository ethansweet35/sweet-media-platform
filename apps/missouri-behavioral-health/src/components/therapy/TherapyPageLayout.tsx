import Link from "next/link";
import TherapyModalityHero, { type TherapyFact } from "@/components/therapy/TherapyModalityHero";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

export type { TherapyFact };

/**
 * Shared layout for all therapy sub-pages.
 *
 * Hero: "Clinical monograph" — arch portrait, modality stamp, inline facts strip,
 * oversized abbreviation watermark (distinct from LOC full-bleed dark heroes).
 * Body sections: white → cream → dark-forest → white rhythm.
 */

const ALL_THERAPIES = [
  { label: "CBT",        full: "Cognitive Behavioral",   href: "/cognitive-behavioral-therapy-springfield-mo",  icon: "ri-brain-line" },
  { label: "DBT",        full: "Dialectical Behavior",    href: "/dialectical-behavioral-therapy-springfield-mo", icon: "ri-heart-pulse-line" },
  { label: "EMDR",       full: "EMDR Therapy",            href: "/emdr-therapy-springfield-mo",                  icon: "ri-eye-line" },
  { label: "Family",     full: "Family Therapy",          href: "/family-therapy-springfield-mo",                icon: "ri-parent-line" },
  { label: "Group",      full: "Group Therapy",           href: "/group-therapy-springfield-mo",                 icon: "ri-group-line" },
  { label: "Holistic",   full: "Holistic Therapy",        href: "/holistic-therapy-springfield",                 icon: "ri-leaf-line" },
  { label: "Music",      full: "Music Therapy",           href: "/music-therapy-springfield",                    icon: "ri-music-line" },
  { label: "Yoga",       full: "Yoga Therapy",            href: "/yoga-therapy-springfield",                     icon: "ri-mental-health-line" },
  { label: "Therapists", full: "Our Therapists",          href: "/therapist-springfield-mo",                     icon: "ri-user-heart-line" },
];

interface Props {
  therapyName: string;
  abbr: string;
  currentPath: string;
  tagline: string;
  heroBody: string;
  heroImage: string;
  heroImageAlt: string;
  facts: TherapyFact[];
  children: React.ReactNode;
}

export default function TherapyPageLayout({
  therapyName,
  abbr,
  currentPath,
  tagline,
  heroBody,
  heroImage,
  heroImageAlt,
  facts,
  children,
}: Props) {
  const otherTherapies = ALL_THERAPIES.filter((t) => t.href !== currentPath).slice(0, 6);

  return (
    <>
      <TherapyModalityHero
        variant="modality"
        therapyName={therapyName}
        abbr={abbr}
        tagline={tagline}
        heroBody={heroBody}
        heroImage={heroImage}
        heroImageAlt={heroImageAlt}
        facts={facts}
      />

      {/* ── THERAPY NAV STRIP ──────────────────────────────────────────────── */}
      <div className="border-y border-mbh-forest/8 bg-white">
        <div className={CONTAINER}>
          <div className="flex items-stretch divide-x divide-mbh-forest/6 overflow-x-auto">
            {ALL_THERAPIES.map((t) => {
              const active = t.href === currentPath;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`flex min-w-[100px] flex-col items-center gap-1 px-4 py-4 text-center transition-colors ${
                    active
                      ? "bg-mbh-green/6 text-mbh-green"
                      : "text-mbh-body/45 hover:bg-cream hover:text-mbh-forest"
                  }`}
                >
                  <i className={`${t.icon} text-lg`} aria-hidden />
                  <span className="font-body text-[9px] font-bold uppercase tracking-[0.2em] leading-tight">{t.label}</span>
                  {active && <span className="h-0.5 w-5 rounded-full bg-mbh-green" aria-hidden />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PAGE-SPECIFIC CONTENT ─────────────────────────────────────────── */}
      {children}

      {/* ── HOW IT FITS YOUR TREATMENT PLAN ──────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                  Integration
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                {therapyName} within your full treatment plan.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Therapy at Missouri Behavioral Health doesn't exist in isolation. {therapyName} is delivered as part of a comprehensive, individualized treatment plan — integrated with your level of care, psychiatric support, and other modalities into a unified clinical approach.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: "ri-file-list-3-line",  label: "Individualized treatment plan",  desc: "Your therapist collaborates with your full clinical team to ensure " + abbr + " objectives align with your broader recovery goals." },
                  { icon: "ri-refresh-line",       label: "Regular clinical reviews",        desc: "Treatment plans are reviewed and updated as you progress — your therapy evolves with you through each phase of recovery." },
                  { icon: "ri-arrow-up-down-line", label: "Continuity across levels of care",desc: "As you step down from PHP to IOP to outpatient, your therapeutic relationship continues — no disruption, no re-starting." },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/15 text-mbh-sage mt-0.5">
                      <i className={`${item.icon} text-lg`} aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-0.5 font-body text-sm leading-relaxed text-white/45">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {[
                { label: "PHP",        desc: "Therapy is woven into 6+ hours of daily programming.",           href: "/php-sober-living",             icon: "ri-hospital-line" },
                { label: "IOP",        desc: "Sessions run 3x weekly alongside group and peer process work.",   href: "/iop-missouri",                  icon: "ri-team-line" },
                { label: "Outpatient", desc: "Weekly individual sessions maintain continuity over the long term.", href: "/outpatient-rehab-springfield-mo", icon: "ri-calendar-check-line" },
              ].map((lvl) => (
                <Link
                  key={lvl.label}
                  href={lvl.href}
                  className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/5 px-5 py-5 transition hover:border-mbh-sage/20 hover:bg-white/8"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mbh-green/15 text-mbh-sage transition group-hover:bg-mbh-green/25">
                    <i className={`${lvl.icon} text-lg`} aria-hidden />
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-sm font-semibold text-white">{lvl.label}</p>
                    <p className="mt-0.5 font-body text-xs leading-snug text-white/40">{lvl.desc}</p>
                  </div>
                  <i className="ri-arrow-right-line text-white/20 transition group-hover:text-mbh-sage" aria-hidden />
                </Link>
              ))}
              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-phone-fill" aria-hidden /> Call 24/7
                </a>
                <Link
                  href="/levels-of-care-missouri"
                  className="inline-flex items-center gap-2 rounded-full border border-white/18 px-6 py-3 font-body text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/6"
                >
                  View levels of care <i className="ri-arrow-right-line" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER THERAPIES ───────────────────────────────────────────────── */}
      <section className="bg-cream py-16">
        <div className={CONTAINER}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-mbh-forest/35">
                Also Available
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-mbh-forest">
                Other therapies at MBH.
              </p>
            </div>
            <Link
              href="/services"
              className="hidden font-body text-xs font-semibold text-mbh-green underline-offset-4 hover:underline sm:inline-flex items-center gap-1"
            >
              View all therapies <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherTherapies.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex items-center gap-4 rounded-2xl border border-mbh-forest/8 bg-white px-6 py-5 transition-all hover:border-mbh-green/25 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10 transition-colors group-hover:bg-mbh-green/15">
                  <i className={`${t.icon} text-lg text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-mbh-forest/40">{t.label}</p>
                  <p className="font-display text-sm font-semibold text-mbh-forest">{t.full}</p>
                </div>
                <i className="ri-arrow-right-line ml-auto text-mbh-forest/20 transition-colors group-hover:text-mbh-green" aria-hidden />
              </Link>
            ))}
          </div>
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
                Ready to begin {therapyName}?
              </h2>
              <p className="mt-2 font-body text-sm text-white/50">
                Admission coordinators available 24/7 — confidential, HIPAA-compliant.
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

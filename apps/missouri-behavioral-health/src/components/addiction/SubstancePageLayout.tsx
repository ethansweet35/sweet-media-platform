import Link from "next/link";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

/**
 * Service-page layout for all substance sub-pages.
 *
 * Structure:
 *  1. Full-viewport cinematic hero — Missouri landscape bg + deep gradient + headline + dual CTAs + stats
 *  2. Page content (children) — passed in as distinct visual sections
 *  3. Related substances — pill grid
 *  4. Bottom admission CTA band
 */

export type SubstanceStat = { value: string; label: string };

const ALL_SUBSTANCES = [
  { label: "Alcohol",       href: "/alcohol-rehab-center-in-missouri",   icon: "ri-goblet-line" },
  { label: "Benzodiazepine",href: "/benzodiazepine-detox-in-missouri",   icon: "ri-capsule-line" },
  { label: "Cocaine",       href: "/cocaine-detox-in-missouri",          icon: "ri-test-tube-line" },
  { label: "Fentanyl",      href: "/fentanyl-rehab-springfield-mo",      icon: "ri-syringe-line" },
  { label: "Heroin",        href: "/heroin-rehab-springfield-mo",        icon: "ri-heart-pulse-line" },
  { label: "Meth",          href: "/meth-rehab-springfield-mo",          icon: "ri-fire-line" },
  { label: "Opioids",       href: "/drug-rehab-in-springfield-mo",       icon: "ri-medicine-bottle-line" },
];

const HERO_BG =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images/missouri-hero-bg.jpg";

interface Props {
  substanceName: string;
  heroHeading: string;
  heroSubcopy: string;
  /** Defaults to Springfield campus line; use for service-area landing pages. */
  heroEyebrow?: string;
  stats: [SubstanceStat, SubstanceStat, SubstanceStat];
  currentPath: string;
  children: React.ReactNode;
}

export default function SubstancePageLayout({
  substanceName,
  heroHeading,
  heroSubcopy,
  heroEyebrow = "Addiction Treatment · Springfield, MO",
  stats,
  currentPath,
  children,
}: Props) {
  const related = ALL_SUBSTANCES.filter((s) => s.href !== currentPath);

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] flex-col overflow-hidden">

        {/* Background photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />

        {/* Gradient system — dark at top (for nav) + heavy crush at bottom for text */}
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,26,14,0.75) 0%, rgba(10,26,14,0.3) 30%, rgba(10,26,14,0.15) 50%, rgba(10,26,14,0.7) 70%, rgba(10,26,14,0.97) 100%)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-end">
          <div className={CONTAINER}>

            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 font-body text-[11px] text-white/35" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white/65">Home</Link>
              <i className="ri-arrow-right-s-line" aria-hidden />
              <Link href="/missouri-addiction-treatment" className="transition-colors hover:text-white/65">Addiction Treatment</Link>
              <i className="ri-arrow-right-s-line" aria-hidden />
              <span className="text-white/55">{substanceName}</span>
            </nav>

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
                {heroEyebrow}
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-display font-semibold leading-[1.04] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
            >
              {heroHeading}
            </h1>

            <p className="mt-5 max-w-2xl font-body text-[1.0625rem] leading-relaxed text-white/65">
              {heroSubcopy}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2.5 rounded-full bg-mbh-green px-8 py-4 font-body text-sm font-semibold text-white shadow-xl shadow-black/30 transition hover:bg-mbh-green-hover active:scale-[0.98]"
              >
                <i className="ri-phone-fill" aria-hidden />
                Call 24/7 — {PHONE_DISPLAY}
              </a>
              <Link
                href="/verify-insurance"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-body text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/8"
              >
                <i className="ri-shield-check-line" aria-hidden />
                Verify insurance
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pb-14 pt-8">
              {stats.map((s) => (
                <div key={s.label} className="px-4 first:pl-0 last:pr-0 sm:px-10">
                  <p className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-semibold text-white">
                    {s.value}
                  </p>
                  <p className="mt-1 font-body text-[11px] leading-snug text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PAGE CONTENT (children) ─────────────────────────────────── */}
      {children}

      {/* ── 3. RELATED SUBSTANCES ──────────────────────────────────────── */}
      <section className="bg-cream-alt py-16">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-mbh-forest/40">
                Also Treating
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-mbh-forest">
                We treat all major substance use disorders.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {related.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/12 bg-white px-5 py-2.5 font-body text-sm font-medium text-mbh-ink shadow-sm transition hover:border-mbh-green hover:bg-mbh-green hover:text-white"
              >
                <i className={`${s.icon} text-xs`} aria-hidden />
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BOTTOM CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-mbh-forest-deep py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: `url('${HERO_BG}')`, backgroundSize: "cover", backgroundPosition: "center 60%" }}
        />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,26,14,0.98) 40%, rgba(10,26,14,0.85) 100%)" }} />
        <div className={`${CONTAINER} relative z-10`}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                Ready to Start?
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight text-white">
                Admission coordinators are available 24/7.
              </h2>
              <p className="mt-3 font-body text-base text-white/50">
                100% confidential · HIPAA-compliant · Same-day admissions available
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-[12px] text-white/35 font-body">
                {["HIPAA-Compliant", "Private Insurance Accepted", "Statewide Virtual Care"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <i className="ri-check-line text-mbh-sage" aria-hidden /> {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-9 py-4 font-body text-sm font-semibold text-mbh-forest shadow-xl transition hover:bg-mbh-mint"
              >
                <i className="ri-phone-fill" aria-hidden />
                Call Now — {PHONE_DISPLAY}
              </a>
              <Link
                href="/verify-insurance"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-9 py-4 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8"
              >
                Verify insurance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { OptimizationStatusBanner } from "@sweetmedia/admin-core";
import HeroContactForm from "@/components/feature/HeroContactForm";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SHARED_CONDITIONS = [
  { label: "Alcohol abuse", href: "/substance-abuse-interventions/alcohol" },
  { label: "Cocaine addiction", href: "/substance-abuse-interventions/cocaine" },
  { label: "Heroin / opioids", href: "/substance-abuse-interventions/heroin" },
  { label: "Meth use", href: "/substance-abuse-interventions/meth" },
  { label: "Ketamine misuse", href: "/substance-abuse-interventions/ketamine" },
  { label: "Prescription drugs", href: "/substance-abuse-interventions/opioid" },
  { label: "Anxiety crises", href: "/mental-health-interventions/anxiety" },
  { label: "Depression", href: "/mental-health-interventions/depression" },
  { label: "Self-medicating", href: "/mental-health-interventions/self-medicating" },
  { label: "Dual diagnosis", href: "/dual-diagnosis-interventions" },
  { label: "Teen interventions", href: "/interventions-for-teens" },
  { label: "Executive interventions", href: "/interventions-for-executives" },
];

export interface StateStat {
  value: string;
  label: string;
  sublabel: string;
}

export interface StateDifferentiator {
  icon: string;
  title: string;
  body: string;
}

export interface StateRegion {
  name: string;
  cities: string;
  href: string;
  icon: string;
}

export interface StateFaq {
  question: string;
  answer: string;
}

export interface StateProcessStep {
  number: string;
  title: string;
  body: string;
}

export interface StatePageConfig {
  stateName: string;
  heroImage: string;
  heroImageAlt: string;
  heroHeadlineSuffix: string;
  heroBody: string;
  anchorId: string;
  trustBullets: { icon: string; text: string }[];
  stats: StateStat[];
  statsEyebrow: string;
  statsHeadline: string;
  familiesHelped: string;
  differentiators: StateDifferentiator[];
  regions: StateRegion[];
  recoveryEyebrow: string;
  recoveryHeadline: string;
  recoveryBody: string;
  faqs: StateFaq[];
  faqTitle: string;
  bottomCtaTitle: string;

  /** Enables California-style sections: split why-us, cities banner, image recovery band */
  fullBleedStateLayout?: boolean;
  /** Replaces generic “geography, insurance…” paragraph under Why Families H2 */
  whyUsLeadParagraph?: string;

  interventionImage?: string;
  interventionImageAlt?: string;
  familiesHelpedLocalStat?: string;
  familiesHelpedLocalLabel?: string;

  citiesRegionImage?: string;
  citiesRegionImageAlt?: string;

  recoveryImage?: string;
  recoveryImageAlt?: string;

  heroSecondaryCtaLabel?: string;

  processSteps?: StateProcessStep[];
  processIntro?: string;

  /**
   * Optional additional H2 section rendered between Conditions and Recovery.
   * Use for state-specific treatment pathway cards (detox, inpatient, outpatient, etc.).
   */
  extraCardsSection?: {
    eyebrow: string;
    headline: string;
    /** A single word or short phrase inside the headline to render in italic sage green */
    italicWord?: string;
    body: string;
    cards: { icon: string; title: string; body: string }[];
  };

  urgencyEyebrow?: string;
  /** When set with urgencyHeadlineAfter, middle span uses urgencyHeadlineItalic */
  urgencyHeadlineBefore?: string;
  urgencyHeadlineItalic?: string;
  urgencyHeadlineAfter?: string;

  regionsSupportingText?: string;

  /**
   * Optional second H2 section rendered between the Recovery Band and FAQs.
   * Uses white background to maintain visual rhythm after the dark Recovery Band.
   */
  evidenceBasedSection?: {
    eyebrow: string;
    headline: string;
    italicWord?: string;
    body: string;
    cards: { icon: string; title: string; body: string }[];
  };
}

interface StatePageTemplateProps {
  config: StatePageConfig;
  /**
   * Canonical route path (e.g. "/service-areas/alaska"). When set, renders
   * an <OptimizationStatusBanner/> at the top of the page so visitors get
   * a subtle signal while a Cursor cloud-agent optimization PR is in flight.
   * The banner auto-disappears once the run completes.
   */
  trackedPagePath?: string;
}

interface ExtraCardsSectionProps {
  section: NonNullable<StatePageConfig["extraCardsSection"]>;
  container: string;
  variant?: "cream" | "white";
}

function ExtraCardsSection({ section, container, variant = "cream" }: ExtraCardsSectionProps) {
  const bg = variant === "white" ? "bg-white" : "bg-[#F5F3E7]";
  const parts = section.italicWord ? section.headline.split(section.italicWord) : null;
  return (
    <section className={`${bg} py-20 md:py-24`}>
      <div className={container}>
        <div className="mb-12 max-w-3xl">
          <p className="brand-eyebrow mb-3 text-[#8FAC87]">{section.eyebrow}</p>
          <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
            {parts ? (
              <>
                {parts[0]}
                <span className="italic text-[#507969]">{section.italicWord}</span>
                {parts[1]}
              </>
            ) : (
              section.headline
            )}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">{section.body}</p>
        </div>
        <div className={`grid gap-6 sm:grid-cols-2 ${section.cards.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {section.cards.map((card) => (
            <div key={card.title} className="rounded-3xl bg-white p-6 ring-1 ring-[#EFEFEF] shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAC87] text-white">
                <i className={`${card.icon} text-lg`} />
              </span>
              <h3 className="mt-5 font-heading text-base font-bold text-[#1A1A17]">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function makeProcess(stateName: string): StateProcessStep[] {
  return [
    {
      number: "01",
      title: "First confidential call",
      body: `Tell us what is happening in your family right now — drinking patterns, mental health, recent crises. We listen first, then explain whether a ${stateName} intervention is the right next step.`,
    },
    {
      number: "02",
      title: "Family preparation",
      body: `We build a private intervention plan that matches your loved one's ${stateName} life: their job, their friend group, their access to substances, and the treatment programs that fit your zip code.`,
    },
    {
      number: "03",
      title: "Interventionist arrives in-state",
      body: `Your interventionist flies in the day before, meets the family privately, conducts a full rehearsal, and stays nearby to answer late-night phone calls before the morning intervention.`,
    },
    {
      number: "04",
      title: "The intervention conversation",
      body: `We lead the conversation in your ${stateName} home, business, or a neutral location. Most loved ones say yes that day. The few who do not get a structured second-attempt plan within the week.`,
    },
    {
      number: "05",
      title: "Direct transport to treatment",
      body: `We physically escort your loved one — by car within ${stateName} or by air to an out-of-state program — and remain on the line with the family during admission.`,
    },
    {
      number: "06",
      title: "Long-term family coaching",
      body: `We do not disappear after admission. We coach the ${stateName} family through 12 months of recovery — the visit weekend, the relapse risk, the return home, and the boundaries that keep recovery alive.`,
    },
  ];
}

export default function StatePageTemplate({ config, trackedPagePath }: StatePageTemplateProps) {
  const { stateName } = config;
  const fullBleed = Boolean(config.fullBleedStateLayout);
  const process = config.processSteps ?? makeProcess(stateName);
  const heroSecondaryLabel =
    config.heroSecondaryCtaLabel ?? `Talk to a ${stateName} specialist`;
  const whyLead =
    config.whyUsLeadParagraph ??
    `${stateName} has its own geography, insurance carriers, treatment culture, and legal landscape. Our team has spent years learning each — so the plan we build for your family actually fits your state.`;
  const regionsBlurb =
    config.regionsSupportingText ??
    `From major metro areas to rural communities — we travel to your family wherever they are in ${stateName}. Click your region below or call us for any community we do not yet have a dedicated page for.`;
  const processIntroDefault = `You do not have to figure this out. We have done it 1,500+ times — and many of those right here in ${stateName}.`;
  const processIntro = config.processIntro ?? processIntroDefault;

  return (
    <main className="min-h-screen bg-white">
      {/* AI optimization status banner — renders only when a Cursor agent
          is actively rewriting this page's tsx. Auto-hides via ISR
          revalidation once the run completes. */}
      {trackedPagePath ? (
        <OptimizationStatusBanner
          trackedPagePath={trackedPagePath}
          brandName="Addiction Interventions"
        />
      ) : null}


      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#1A1A17]">
        <Image
          src={config.heroImage}
          alt={config.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/85 via-[#1A1A17]/65 to-[#3E5B50]/40" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-[#507969]/30 blur-3xl" />

        <div className={`relative ${CONTAINER} py-20 md:py-28`}>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 flex items-center gap-2 text-[#8FAC87]">
                <i className="ri-shield-check-line text-base" />
                Certified Interventionists Serving {stateName} 24/7
              </p>
              <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Interventions across{" "}
                <span className="italic text-[#8FAC87]">{stateName}</span> — {config.heroHeadlineSuffix}.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                {config.heroBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill text-base" />
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={`#${config.anchorId}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
                >
                  {heroSecondaryLabel}
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {config.trustBullets.map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87]/25 text-[#8FAC87]">
                      <i className={`${b.icon} text-xs`} />
                    </span>
                    <span className="text-sm font-medium text-white/85">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id={config.anchorId}>
              <HeroContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ────────────────────────────────────────────────── */}
      <section className="bg-[#3E5B50] py-12 md:py-16">
        <div className={CONTAINER}>
          <p className="brand-eyebrow mb-4 text-center text-[#8FAC87]">{config.statsEyebrow}</p>
          <h2 className="mx-auto mb-10 max-w-3xl text-center font-heading text-2xl font-bold text-white md:text-3xl">
            {config.statsHeadline}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {config.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="font-heading text-3xl font-bold text-[#8FAC87] md:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm font-semibold text-white">{s.label}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-white/55">{s.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FAMILIES CHOOSE US ─────────────────────────────────────── */}
      {fullBleed &&
      config.interventionImage &&
      config.familiesHelpedLocalStat &&
      config.familiesHelpedLocalLabel ? (
        <section className="bg-white py-20 md:py-24">
          <div className={CONTAINER}>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
              <div className="relative order-2 min-h-[380px] overflow-hidden rounded-3xl ring-1 ring-[#EFEFEF] lg:order-1">
                <Image
                  src={config.interventionImage}
                  alt={config.interventionImageAlt ?? ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
                <div className="absolute bottom-5 right-5 rounded-2xl bg-[#3E5B50] px-6 py-5 shadow-xl">
                  <p className="font-heading text-3xl font-bold text-white">{config.familiesHelpedLocalStat}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8FAC87]">
                    {config.familiesHelpedLocalLabel}
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="brand-eyebrow mb-3 text-[#8FAC87]">Why {stateName} Families Choose Us</p>
                <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
                  We don&apos;t run a generic <span className="italic text-[#507969]">national</span> playbook in{" "}
                  {stateName}.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">{whyLead}</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {config.differentiators.map((d) => (
                    <div key={d.title} className="rounded-2xl bg-[#F5F3E7] p-5 ring-1 ring-[#EFEFEF]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FAC87] text-white">
                        <i className={`${d.icon} text-lg`} />
                      </span>
                      <h3 className="mt-4 font-heading text-base font-bold text-[#1A1A17]">{d.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]">{d.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white py-20 md:py-24">
          <div className={CONTAINER}>
            <div className="mb-12 max-w-3xl">
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Why {stateName} Families Choose Us</p>
              <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
                We do not run a generic <span className="italic text-[#507969]">national</span> playbook in{" "}
                {stateName}.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">{whyLead}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {config.differentiators.map((d) => (
                <div key={d.title} className="rounded-3xl bg-[#F5F3E7] p-6 ring-1 ring-[#EFEFEF]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAC87] text-white">
                    <i className={`${d.icon} text-lg`} />
                  </span>
                  <h3 className="mt-5 font-heading text-base font-bold text-[#1A1A17]">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]">{d.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 rounded-2xl bg-[#3E5B50] px-6 py-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#8FAC87]">
                <i className="ri-team-line text-lg" />
              </span>
              <p className="text-sm font-semibold text-white">
                {config.familiesHelped} families helped nationwide — several hundred of those right here in {stateName}.
              </p>
              <a
                href={PHONE_HREF}
                className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-[#8FAC87] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill text-sm" />
                Call now
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── REGIONS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F3E7] py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="mb-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">{stateName} Coverage</p>
              <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
                We cover every <span className="italic text-[#507969]">region</span> of {stateName}.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#4B4B4B] md:text-lg">{regionsBlurb}</p>
          </div>

          {fullBleed && config.citiesRegionImage ? (
            <div className="relative mb-10 aspect-[21/8] w-full overflow-hidden rounded-3xl">
              <Image
                src={config.citiesRegionImage}
                alt={config.citiesRegionImageAlt ?? ""}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A17]/40 via-transparent to-transparent" />
            </div>
          ) : null}

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#EFEFEF] bg-[#EFEFEF] sm:grid-cols-2 lg:grid-cols-3">
            {config.regions.map((r, i) => (
              <Link
                key={r.name}
                href={r.href}
                className={`group p-6 transition hover:bg-white ${i % 2 === 0 ? "bg-white" : "bg-[#F5F3E7]/70"}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                  <i className={`${r.icon} text-lg`} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-[#1A1A17]">{r.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]/80">{r.cities}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#507969] underline-offset-4 group-hover:underline">
                  Learn more
                  <i className="ri-arrow-right-line text-xs transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">The {stateName} Process</p>
            <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
              From first call to one-year recovery, mapped <span className="italic text-[#507969]">step by step</span>.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">{processIntro}</p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {process.map((step) => (
              <div key={step.number} className="flex gap-5 rounded-2xl bg-[#F5F3E7] p-6 ring-1 ring-[#EFEFEF]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3E5B50] font-heading text-base font-bold text-[#8FAC87]">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#1A1A17]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA STRIP ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-16 md:py-20">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">
                {config.urgencyEyebrow ?? `Don't wait for the next ${stateName} crisis`}
              </p>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {config.urgencyHeadlineItalic &&
                config.urgencyHeadlineBefore !== undefined &&
                config.urgencyHeadlineAfter !== undefined ? (
                  <>
                    {config.urgencyHeadlineBefore}
                    <span className="italic text-[#8FAC87]">{config.urgencyHeadlineItalic}</span>
                    {config.urgencyHeadlineAfter}
                  </>
                ) : (
                  <>
                    Most {stateName} families wait <span className="italic text-[#8FAC87]">too long</span> to act.
                  </>
                )}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                Every weekend you wait is another risk — another overdose, another DUI, another fractured relationship.
                The first call is free, judgment-free, and takes about 20 minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8FAC87] px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill text-base" />
                Call {PHONE_DISPLAY} — answered 24/7
              </a>
              <Link
                href={`#${config.anchorId}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
              >
                Use the contact form
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONDITIONS ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Every Kind of {stateName} Case</p>
              <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl">
                What we handle <span className="italic text-[#507969]">across</span> {stateName}.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                Substance use, mental health, dual diagnosis, executive cases, teens — we run interventions for the full
                spectrum of behavioural health crises in {stateName} families.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill text-sm" />
                Talk to a {stateName} specialist
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SHARED_CONDITIONS.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="group flex items-center justify-between rounded-2xl border border-[#EFEFEF] bg-white px-5 py-4 transition hover:border-[#8FAC87] hover:bg-[#F5F3E7]"
                >
                  <span className="text-sm font-semibold text-[#1A1A17]">{c.label}</span>
                  <i className="ri-arrow-right-line text-sm text-[#507969] transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXTRA CARDS SECTION (state-specific, optional) ──────────────── */}
      {config.extraCardsSection && (
        <ExtraCardsSection section={config.extraCardsSection} container={CONTAINER} />
      )}

      {/* ── RECOVERY BAND ───────────────────────────────────────────────── */}
      {fullBleed && config.recoveryImage ? (
        <section className="relative w-full">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src={config.recoveryImage}
              alt={config.recoveryImageAlt ?? ""}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/30 to-transparent" />
            <div className={`absolute inset-0 flex items-center ${CONTAINER}`}>
              <div className="max-w-xl">
                <p className="brand-eyebrow mb-3 text-[#8FAC87]">{config.recoveryEyebrow}</p>
                <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {config.recoveryHeadline}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">{config.recoveryBody}</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden bg-[#3E5B50] py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4RkFDODciIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi02aDZ2LTZoLTZ2NnptLTEyIDZoNnYtNmgtNnY2em0tNi02aDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/30" />
          <div className="pointer-events-none absolute -bottom-0 -left-20 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
          <div className={`relative ${CONTAINER}`}>
            <div className="max-w-2xl">
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">{config.recoveryEyebrow}</p>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {config.recoveryHeadline}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">{config.recoveryBody}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill text-base" />
                  Call {PHONE_DISPLAY}
                </a>
                <Link
                  href={`#${config.anchorId}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
                >
                  Start with the form
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── EVIDENCE-BASED SECTION (state-specific, optional) ───────────── */}
      {config.evidenceBasedSection && (
        <ExtraCardsSection section={config.evidenceBasedSection} container={CONTAINER} variant="white" />
      )}

      {/* ── FAQs ────────────────────────────────────────────────────────── */}
      <FaqAccordion title={config.faqTitle} faqs={config.faqs} />

      <BottomCta
        title={config.bottomCtaTitle}
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next — and we do not disappear after admission."
      />
    </main>
  );
}

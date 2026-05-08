import Image from "next/image";
import Link from "next/link";
import HeroContactForm from "@/components/feature/HeroContactForm";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SHARED_CONDITIONS = [
  { label: "Alcohol abuse", href: "/alcohol-abuse-interventions" },
  { label: "Cocaine addiction", href: "/cocaine-intervention" },
  { label: "Heroin / opioids", href: "/heroin-intervention" },
  { label: "Meth use", href: "/meth-intervention" },
  { label: "Ketamine misuse", href: "/ketamine-addiction" },
  { label: "Prescription drugs", href: "/opioid-intervention" },
  { label: "Anxiety crises", href: "/anxiety" },
  { label: "Depression", href: "/depression" },
  { label: "Self-medicating", href: "/self-medicating" },
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
}

function makeProcess(stateName: string) {
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

export default function StatePageTemplate({ config }: { config: StatePageConfig }) {
  const { stateName } = config;
  const process = makeProcess(stateName);

  return (
    <main className="min-h-screen bg-white">

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
              <p className="brand-eyebrow mb-4 text-[#8FAC87] flex items-center gap-2">
                <i className="ri-shield-check-line text-base" />
                Certified Interventionists Serving {stateName} 24/7
              </p>
              <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Interventions across{" "}
                <span className="italic text-[#8FAC87]">{stateName}</span>
                {" "}— {config.heroHeadlineSuffix}.
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
                  Talk to a {stateName} specialist
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
          <p className="brand-eyebrow text-[#8FAC87] mb-4 text-center">{config.statsEyebrow}</p>
          <h2 className="font-heading text-center text-2xl font-bold text-white md:text-3xl mb-10 max-w-3xl mx-auto">
            {config.statsHeadline}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {config.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <p className="font-heading text-3xl md:text-4xl font-bold text-[#8FAC87]">{s.value}</p>
                <p className="mt-2 text-sm font-semibold text-white">{s.label}</p>
                <p className="mt-1 text-[11px] text-white/55 uppercase tracking-wider">{s.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FAMILIES CHOOSE US ─────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-3xl">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Why {stateName} Families Choose Us</p>
            <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
              We do not run a generic{" "}
              <span className="italic text-[#507969]">national</span> playbook in {stateName}.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
              {stateName} has its own geography, insurance carriers, treatment culture, and legal landscape. Our team
              has spent years learning each — so the plan we build for your family actually fits your state.
            </p>
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
              className="ml-auto shrink-0 inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6F8E68]"
            >
              <i className="ri-phone-fill text-sm" />
              Call now
            </a>
          </div>
        </div>
      </section>

      {/* ── REGIONS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F3E7] py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end mb-12">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">{stateName} Coverage</p>
              <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
                We cover every{" "}
                <span className="italic text-[#507969]">region</span> of {stateName}.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#4B4B4B] md:text-lg">
              From major metro areas to rural communities — we travel to your family wherever they are in {stateName}.
              Click your region below or call us for any community we do not yet have a dedicated page for.
            </p>
          </div>

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
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#507969] group-hover:underline underline-offset-4">
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
          <div className="text-center max-w-3xl mx-auto">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">The {stateName} Process</p>
            <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
              From first call to one-year recovery, mapped{" "}
              <span className="italic text-[#507969]">step by step</span>.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
              You do not have to figure this out. We have done it 1,500+ times — and many of those right here in {stateName}.
            </p>
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
      <section className="relative bg-[#3E5B50] py-16 md:py-20 overflow-hidden">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">
                Do not wait for the next {stateName} crisis
              </p>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Most {stateName} families wait{" "}
                <span className="italic text-[#8FAC87]">too long</span> to act.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg max-w-2xl">
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
                What we handle{" "}
                <span className="italic text-[#507969]">across</span> {stateName}.
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

      {/* ── RECOVERY BAND ───────────────────────────────────────────────── */}
      <section className="relative bg-[#3E5B50] overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4RkFDODciIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi02aDZ2LTZoLTZ2NnptLTEyIDZoNnYtNmgtNnY2em0tNi02aDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/30" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="max-w-2xl">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">{config.recoveryEyebrow}</p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {config.recoveryHeadline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
              {config.recoveryBody}
            </p>
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

      {/* ── FAQs ────────────────────────────────────────────────────────── */}
      <FaqAccordion title={config.faqTitle} faqs={config.faqs} />

      <BottomCta
        title={config.bottomCtaTitle}
        body={`Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next — and we do not disappear after admission.`}
      />
    </main>
  );
}

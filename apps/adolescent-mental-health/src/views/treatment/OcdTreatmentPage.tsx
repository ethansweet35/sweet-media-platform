import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  AmhButton,
  ComparisonTable,
  DarkCtaSection,
  GoodFitSection,
  MarketingPage,
  ProgramHeroSection,
  SessionStructureSection,
  TherapyFaqSection,
} from "@/components/marketing";
import type { TreatmentLandingConfig } from "@/lib/treatment-landing-pages";
import { CONTAINER, SITE, TREATMENT_LANDING_IMGS } from "@/lib/site";

type OcdTreatmentPageProps = {
  config: TreatmentLandingConfig;
};

const ocdStats = [
  { value: "1–3%", label: "of teens meet criteria for OCD", icon: "ri-bar-chart-grouped-line" },
  { value: "ERP", label: "gold-standard treatment for adolescent OCD", icon: "ri-award-line" },
  { value: "9–20", label: "clinical hours per week in Virtual IOP", icon: "ri-time-line" },
  { value: "24–48", label: "hours typical intake timeline", icon: "ri-calendar-check-line" },
];

const ocdProfiles = [
  {
    icon: "ri-brain-line",
    title: "Intrusive thoughts",
    body: "Unwanted thoughts about harm, contamination, morality, or taboo subjects — not intentions.",
  },
  {
    icon: "ri-repeat-line",
    title: "Compulsive rituals",
    body: "Checking, washing, counting, repeating, or mental rituals that temporarily reduce distress.",
  },
  {
    icon: "ri-forbid-line",
    title: "Trigger avoidance",
    body: "Skipping school, social events, or places that activate obsessions and compulsions.",
  },
  {
    icon: "ri-team-line",
    title: "Family accommodation",
    body: "Caregivers providing reassurance, joining rituals, or changing routines to lower OCD anxiety.",
  },
];

const ocdCycleSteps = [
  { label: "Obsession", detail: "Intrusive thought or urge", tone: "text-white/70" },
  { label: "Anxiety", detail: "Distress spikes quickly", tone: "text-accent" },
  { label: "Compulsion", detail: "Ritual or mental neutralizing", tone: "text-white/70" },
  { label: "Relief", detail: "Short drop in anxiety", tone: "text-white/50" },
  { label: "Loop", detail: "Brain learns ritual is necessary", tone: "text-white/90" },
];

const erpSteps = [
  { level: "1", task: "Name triggers and map current rituals without changing behavior yet", distress: 25 },
  { level: "2", task: "Delay a small compulsion or reduce reassurance once with clinician coaching", distress: 45 },
  { level: "3", task: "Face a low-level trigger without performing the usual ritual", distress: 60 },
  { level: "4", task: "Practice ERP at home and school with family support scripts", distress: 80 },
  { level: "5", task: "Maintain gains and prevent relapse with ongoing exposure homework", distress: 100 },
];

const accommodationShifts = [
  { before: "Answering the same reassurance question repeatedly", after: "Supportive response without feeding the ritual" },
  { before: "Participating in washing, checking, or redoing tasks", after: "Encouraging teen to tolerate uncertainty" },
  { before: "Changing family routines to avoid triggers", after: "Gradual re-exposure with clinician guidance" },
  { before: "Taking over tasks the teen avoids due to OCD", after: "Shared ERP goals and praise for effort, not perfection" },
];

const intrusiveThoughtReassurances = [
  {
    icon: "ri-brain-line",
    title: "Thoughts ≠ intentions",
    body: "OCD produces ego-dystonic thoughts — not wishes your teen wants to act on.",
  },
  {
    icon: "ri-lock-line",
    title: "Confidential pacing",
    body: "No forced disclosure before stabilization skills and ERP are in place.",
  },
  {
    icon: "ri-heart-line",
    title: "Parents included safely",
    body: "Caregivers learn supportive language without feeding reassurance rituals.",
  },
];

const intrusiveThoughtClinicalFocus = [
  "Psychoeducation that separates OCD from identity before ERP starts",
  "Private sessions where teens can name thoughts without group pressure",
  "Thought records that untangle obsessions from values and intentions",
  "Family coaching to reduce reassurance that accidentally feeds rituals",
];

export default function OcdTreatmentPage({ config }: OcdTreatmentPageProps) {
  const IMGS = TREATMENT_LANDING_IMGS.ocd;

  return (
    <MarketingPage currentPath={config.path}>
      <ProgramHeroSection
        eyebrow={config.hero.eyebrow}
        headline={
          <>
            {config.hero.headline.before}
            <span className="text-accent">{config.hero.headline.accent}</span>
            {config.hero.headline.after}
          </>
        }
        body={config.hero.body}
        imageSrc={IMGS.hero}
        imageAlt={config.hero.imageAlt}
        imageClassName="object-cover object-center"
        stats={config.hero.stats}
        trustItems={config.hero.trustItems}
      />

      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {ocdStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3 px-6 py-8 sm:px-8">
                <i className={`${stat.icon} text-xl text-accent`} aria-hidden />
                <p className="text-2xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{stat.value}</AutoLinkedText></p>
                <p className="text-xs leading-5 text-body"><AutoLinkedText>{stat.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">OCD in adolescence</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              When rituals and intrusive thoughts start running the day
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Teen OCD often hides behind perfectionism, school avoidance, or shame about taboo thoughts. Our clinicians\n              use ERP — the most evidence-based approach — with enough session frequency for real-world practice."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ocdProfiles.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:border-accent/40 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <i className={`${item.icon} text-xl`} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-body"><AutoLinkedText>{item.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_400px]">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border lg:p-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{config.overview.eyebrow}</AutoLinkedText></p>
              <h3 className="mt-4 text-3xl font-bold leading-[1.1] text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                {config.overview.title}
              </h3>
              {config.overview.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-5 max-w-xl text-sm leading-8 text-body"><AutoLinkedText>{paragraph}</AutoLinkedText></p>
              ))}
              <div className="mt-8 flex flex-wrap gap-2">
                {config.overview.focusItems.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-2 text-xs font-semibold text-ink"
                  >
                    <i className={`${item.icon} text-accent`} aria-hidden />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl ring-1 ring-border lg:min-h-full">
              <Image
                src={IMGS.bento}
                alt={config.overview.bentoAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-6">
                <p className="text-sm font-bold text-white"><AutoLinkedText>{config.overview.calloutTitle}</AutoLinkedText></p>
                <p className="mt-1 text-xs leading-5 text-white/65"><AutoLinkedText>{config.overview.calloutBody}</AutoLinkedText></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OCD cycle */}
      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Why OCD persists</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              The obsession–compulsion loop — and where ERP breaks it
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Compulsions reduce anxiety briefly, which teaches the brain that rituals are required. Weekly therapy often\n              cannot provide enough ERP practice when compulsions happen dozens of times per day. Virtual IOP adds\n              frequent exposure coaching and family accommodation reduction at home."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="flex divide-x divide-white/10 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {ocdCycleSteps.map((step, i) => (
                <div
                  key={step.label}
                  className="flex min-w-[9.5rem] flex-1 flex-col px-4 py-5 sm:min-w-[10.5rem] sm:px-5 lg:min-w-0 lg:py-6"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-accent"
                      style={{ fontFamily: "var(--font-heebo)" }}
                    >
                      {i + 1}
                    </span>
                    {i < ocdCycleSteps.length - 1 ? (
                      <i className="ri-arrow-right-line hidden text-xs text-white/20 lg:inline" aria-hidden />
                    ) : null}
                  </div>
                  <p className={`mt-3 text-sm font-bold leading-snug ${step.tone}`} style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{step.label}</AutoLinkedText></p>
                  <p className="mt-1.5 text-[11px] leading-4 text-white/45"><AutoLinkedText>{step.detail}</AutoLinkedText></p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 bg-accent/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:px-8">
              <div className="flex items-start gap-3 sm:min-w-0 sm:flex-1">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <i className="ri-repeat-line text-lg" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Where IOP helps</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    <AutoLinkedText>{"Daily ERP homework, response prevention coaching, peer accountability, and family scripts that\n                    reduce reassurance — practiced in real home and school settings."}</AutoLinkedText>
                  </p>
                </div>
              </div>
              <a
                href={SITE.phone.href}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <i className="ri-phone-fill text-accent" aria-hidden />
                Free consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ERP hierarchy */}
      <section className="relative overflow-hidden bg-dark px-6 py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Exposure & response prevention"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              A graded ERP plan — paced, never forced
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/50">
              <AutoLinkedText>{"Teens do not start with their hardest obsession. Clinicians build a personalized hierarchy, practicing\n              response prevention at each step with support between IOP sessions."}</AutoLinkedText>
            </p>
          </div>

          <div className="space-y-2">
            {erpSteps.map((step) => (
              <div
                key={step.level}
                className="grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:grid-cols-[auto_1fr_140px] sm:items-center sm:gap-5 sm:p-5"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  {step.level}
                </span>
                <p className="text-sm leading-6 text-white/75"><AutoLinkedText>{step.task}</AutoLinkedText></p>
                <div className="flex items-center gap-2 sm:justify-end">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10 sm:max-w-[72px]">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${step.distress}%` }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Challenge</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-white/35">
            <AutoLinkedText>{"Example ERP sequence — every teen&apos;s hierarchy is built individually during assessment."}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Accommodation reduction */}
      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Family accommodation"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Supporting your teen without feeding the OCD
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Well-intentioned reassurance and ritual participation keep OCD strong. Family sessions teach supportive\n              responses that reduce accommodation while preserving connection."}</AutoLinkedText>
            </p>
          </div>
          <div className="space-y-3">
            {accommodationShifts.map((row) => (
              <div
                key={row.before}
                className="grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-border sm:grid-cols-2 sm:gap-6 sm:p-6"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-body/50">Common pattern</p>
                  <p className="mt-2 text-sm leading-6 text-body"><AutoLinkedText>{row.before}</AutoLinkedText></p>
                </div>
                <div className="border-t border-border pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent">IOP coaching shift</p>
                  <p className="mt-2 text-sm leading-6 text-ink"><AutoLinkedText>{row.after}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{config.pillars.eyebrow}</AutoLinkedText></p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              {config.pillars.title}
            </h2>
            <p className="mt-4 text-sm leading-8 text-body"><AutoLinkedText>{config.pillars.description}</AutoLinkedText></p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {config.pillars.items.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl bg-surface p-8 ring-1 ring-border">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent-dark">
                    {pillar.tag}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-accent">
                    <i className={`${pillar.icon} text-base`} aria-hidden />
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-body"><AutoLinkedText>{pillar.body}</AutoLinkedText></p>
                <ul className="mt-5 space-y-2">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-body">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intrusive thoughts band */}
      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="grid lg:grid-cols-[1fr_320px]">
              <div className="p-8 lg:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Intrusive thoughts</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  Shame keeps OCD hidden — we create space without judgment
                </h2>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"Teens often fear that intrusive thoughts mean something about their character. OCD is a brain-based\n                  condition — thoughts are symptoms, not intentions. Our clinicians normalize this safely before ERP\n                  begins."}</AutoLinkedText>
                </p>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"Many teens hide these thoughts for months — from parents, friends, and even past therapists — which\n                  delays diagnosis and lets rituals grow. Virtual IOP pairs private clinician time with structured\n                  family sessions in the same week, so shame does not have to block care."}</AutoLinkedText>
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {intrusiveThoughtClinicalFocus.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AmhButton href="/online-anxiety-treatment" variant="darkSecondary" icon="ri-arrow-right-line">
                    Co-occurring anxiety
                  </AmhButton>
                  <AmhButton href="/therapy/adolescent-family-therapy" variant="darkSecondary" icon="ri-arrow-right-line">
                    Family therapy
                  </AmhButton>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/[0.03] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"What families need to hear"}</AutoLinkedText></p>
                  <ul className="mt-4 space-y-4">
                    {intrusiveThoughtReassurances.map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                          <i className={`${item.icon} text-base`} aria-hidden />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{item.title}</AutoLinkedText></p>
                          <p className="mt-1 text-xs leading-5 text-white/50"><AutoLinkedText>{item.body}</AutoLinkedText></p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-8 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"What we help teens understand"}</AutoLinkedText></p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Intrusive thoughts are common in OCD — not wishes or plans",
                  "Thought-action fusion is a symptom, not reality",
                  "Secrecy makes rituals stronger; safe disclosure helps treatment",
                  "ERP is paced — distress can rise temporarily before it improves",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
                  >
                    <i className="ri-lightbulb-line mt-0.5 shrink-0 text-accent" aria-hidden />
                    <span className="text-sm leading-6 text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoodFitSection
        eyebrow={config.fit.eyebrow}
        title={config.fit.title}
        description={config.fit.description}
        criteria={config.fit.criteria}
        bg="white"
        asideNote={{ label: "Good to know", body: config.fit.goodToKnow }}
        showCta={false}
      />

      <SessionStructureSection
        eyebrow={config.intake.eyebrow}
        title={config.intake.title}
        description={config.intake.description}
        phases={config.intake.steps.map((step) => ({
          num: step.num,
          icon: step.icon,
          title: step.title,
          body: step.body,
        }))}
        bg="surface"
        footer={
          <p className="mt-6 text-center text-sm text-body">
            <i className="ri-time-line mr-1.5 align-middle text-accent" aria-hidden />
            Typical time from first call to first session:{" "}
            <span className="font-bold text-ink">24–48 hours</span>
          </p>
        }
      />

      <section className="bg-dark px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{config.comparison.eyebrow}</AutoLinkedText></p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              {config.comparison.title}
            </h2>
          </div>
          <ComparisonTable
            baselineLabel="Standard outpatient"
            highlightedLabel="Virtual IOP"
            rows={config.comparison.rows.map((row) => ({
              label: row.label,
              baseline: row.standard,
              highlighted: row.iop,
            }))}
          />
        </div>
      </section>

      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{config.related.eyebrow}</AutoLinkedText></p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              {config.related.title}
            </h2>
            <p className="mt-4 text-sm leading-8 text-body"><AutoLinkedText>{config.related.description}</AutoLinkedText></p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.related.items.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className="group flex flex-col rounded-2xl border border-border bg-surface-muted/50 p-6 transition hover:border-accent/40 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-ink transition group-hover:text-accent" style={{ fontFamily: "var(--font-heebo)" }}>
                    {item.label}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-accent/50 ring-1 ring-border transition group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                    <i className="ri-arrow-right-line text-sm" aria-hidden />
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-7 text-body"><AutoLinkedText>{item.desc}</AutoLinkedText></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TherapyFaqSection title={config.faq.title} items={config.faqs} />

      <DarkCtaSection
        title={config.cta.title}
        description={config.cta.description}
        actions={
          <>
            <AmhButton href={SITE.phone.href} variant="darkPrimary" icon="ri-phone-fill" iconPosition="left">
              Call {SITE.phone.display}
            </AmhButton>
            <AmhButton href="/virtual-iop-for-teens" variant="darkSecondary" icon="ri-arrow-right-line">
              About Virtual IOP
            </AmhButton>
          </>
        }
      />
    </MarketingPage>
  );
}

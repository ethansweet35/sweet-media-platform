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

type AnxietyTreatmentPageProps = {
  config: TreatmentLandingConfig;
};

const anxietyStats = [
  { value: "31%", label: "of teens experience an anxiety disorder", icon: "ri-bar-chart-grouped-line" },
  { value: "Highly", label: "treatable with CBT and exposure", icon: "ri-award-line" },
  { value: "9–20", label: "clinical hours per week in Virtual IOP", icon: "ri-time-line" },
  { value: "24–48", label: "hours typical intake timeline", icon: "ri-calendar-check-line" },
];

const presentations = [
  {
    icon: "ri-question-line",
    title: "Generalized anxiety",
    body: "Persistent worry about school, friendships, health, or the future that feels impossible to shut off.",
  },
  {
    icon: "ri-group-line",
    title: "Social anxiety",
    body: "Fear of judgment, avoidance of class participation, lunchrooms, or social events.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Panic & physical symptoms",
    body: "Racing heart, shortness of breath, dizziness, or dread of the next panic attack.",
  },
  {
    icon: "ri-school-line",
    title: "School-related stress",
    body: "Morning meltdowns, tardiness, perfectionism, or gradual withdrawal from attendance.",
  },
];

const avoidanceSteps = [
  { label: "Trigger", detail: "Test, social event, or separation", tone: "text-white/70" },
  { label: "Spike", detail: "Worry and physical anxiety symptoms", tone: "text-accent" },
  { label: "Avoid", detail: "Skip class, cancel plans, seek reassurance", tone: "text-white/70" },
  { label: "Relief", detail: "Short-term drop in anxiety", tone: "text-white/50" },
  { label: "Loop", detail: "Feared situations feel more dangerous", tone: "text-white/90" },
];

const exposureSteps = [
  { level: "1", task: "Walk past the classroom door with a clinician plan", intensity: 20 },
  { level: "2", task: "Sit in class for 10 minutes with a coping script", intensity: 40 },
  { level: "3", task: "Raise hand once or answer a low-stakes question", intensity: 60 },
  { level: "4", task: "Stay through lunch or a full class period", intensity: 80 },
  { level: "5", task: "Re-engage in avoided activities with family support", intensity: 100 },
];

const schoolSupports = [
  "Gradual attendance plans coordinated with caregivers and school staff",
  "504/IEP documentation support when clinically appropriate",
  "Morning routine and transition strategies for school refusal patterns",
  "Communication scripts so teachers reinforce skills — not accommodation that maintains avoidance",
];

export default function AnxietyTreatmentPage({ config }: AnxietyTreatmentPageProps) {
  const IMGS = TREATMENT_LANDING_IMGS.anxiety;

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

      {/* Stats band */}
      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {anxietyStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3 px-6 py-8 sm:px-8">
                <i className={`${stat.icon} text-xl text-accent`} aria-hidden />
                <p className="text-2xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{stat.value}</AutoLinkedText></p>
                <p className="text-xs leading-5 text-body"><AutoLinkedText>{stat.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Presentations + overview split */}
      <section className="bg-surface px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Anxiety in adolescence"}</AutoLinkedText></p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              More than everyday stress — when worry starts running the schedule
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Teens often hide anxiety behind irritability, perfectionism, or &ldquo;I&apos;m fine.&rdquo; Our clinicians look\n              for the pattern underneath — and match treatment to how anxiety actually shows up at home and school."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {presentations.map((item) => (
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

      {/* Avoidance cycle */}
      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Why anxiety persists"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              The avoidance loop — and where IOP interrupts it
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Avoidance feels like relief in the moment, but it teaches the brain that feared situations are dangerous.\n              Weekly therapy often cannot keep pace when escape happens daily — Virtual IOP adds structured exposure\n              practice and caregiver coaching before the loop tightens."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="flex divide-x divide-white/10 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {avoidanceSteps.map((step, i) => (
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
                    {i < avoidanceSteps.length - 1 ? (
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
                  <i className="ri-focus-3-line text-lg" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Where IOP helps</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    <AutoLinkedText>{"Exposure planning, distress tolerance skills, and family coaching between sessions — so teens\n                    approach feared situations instead of escaping them."}</AutoLinkedText>
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

      {/* Exposure ladder */}
      <section className="relative overflow-hidden bg-dark px-6 py-section lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Exposure therapy</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              A personalized exposure ladder — paced, never pushed
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/50">
              <AutoLinkedText>{"Teens do not start with the hardest situation. Clinicians build a step-by-step hierarchy with your teen,\n              practicing skills at each rung before moving up — often with homework between IOP sessions."}</AutoLinkedText>
            </p>
          </div>

          <div className="space-y-3">
            {exposureSteps.map((step) => (
              <div
                key={step.level}
                className="grid gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:grid-cols-[auto_1fr_120px] sm:items-center sm:gap-6 sm:p-6"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  {step.level}
                </span>
                <p className="text-sm leading-7 text-white/75"><AutoLinkedText>{step.task}</AutoLinkedText></p>
                <div className="flex items-center gap-3 sm:justify-end">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10 sm:max-w-[80px]">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${step.intensity}%` }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Intensity</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-6 text-white/35">
            <AutoLinkedText>{"Example hierarchy for school re-entry — every teen&apos;s ladder is individualized during assessment."}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Treatment pillars — compact grid instead of stacked list */}
      <section className="bg-surface px-6 py-section lg:px-10">
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
              <div key={pillar.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent-dark">
                    {pillar.tag}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-accent">
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

      {/* School anxiety band */}
      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="grid lg:grid-cols-[1fr_340px]">
              <div className="p-8 lg:p-12">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">School anxiety</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  When attendance, mornings, or performance anxiety take over
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"School refusal is one of the most common reasons families call us. We treat the underlying anxiety\n                  while building a realistic re-entry plan — not pressure that backfires."}</AutoLinkedText>
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {schoolSupports.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/60">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <AmhButton href="/conditions/school-avoidance" variant="darkSecondary" icon="ri-arrow-right-line">
                    School avoidance care
                  </AmhButton>
                  <AmhButton href="/virtual-iop-for-teens" variant="darkSecondary" icon="ri-arrow-right-line">
                    About Virtual IOP
                  </AmhButton>
                </div>
              </div>
              <div className="flex flex-col justify-center border-t border-white/10 bg-white/[0.03] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"Families often notice"}</AutoLinkedText></p>
                <div className="mt-6 space-y-4">
                  {[
                    "Stomachaches or headaches before school",
                    "Repeated tardiness or absent days",
                    "Meltdowns over homework perfection",
                    "Withdrawal from activities they used to enjoy",
                  ].map((sign) => (
                    <div key={sign} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <i className="ri-alert-line mt-0.5 text-accent" aria-hidden />
                      <span className="text-sm text-white/70">{sign}</span>
                    </div>
                  ))}
                </div>
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
        bg="surface"
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
        bg="white"
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

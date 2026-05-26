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

type SchizophreniaTreatmentPageProps = {
  config: TreatmentLandingConfig;
};

const schizophreniaStats = [
  { value: "13–17", label: "typical age range for early-onset schizophrenia", icon: "ri-bar-chart-grouped-line" },
  { value: "Structured", label: "therapy + skills in Virtual IOP", icon: "ri-mental-health-line" },
  { value: "9–20", label: "clinical hours per week in Virtual IOP", icon: "ri-time-line" },
  { value: "24–48", label: "hours typical intake timeline", icon: "ri-calendar-check-line" },
];

const schizophreniaProfiles = [
  {
    icon: "ri-mental-health-line",
    title: "Psychotic symptoms",
    body: "Distress from hallucinations, unusual beliefs, or disorganized thinking that disrupt daily life.",
  },
  {
    icon: "ri-user-unfollow-line",
    title: "Social withdrawal",
    body: "Pulling away from friends, activities, or school — often mistaken for typical teen isolation.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Daily functioning",
    body: "Difficulty with routines, self-care, homework, or staying engaged in structured activities.",
  },
  {
    icon: "ri-team-line",
    title: "Family strain",
    body: "Caregivers navigating fear, confusion, and conflict while trying to support their teen.",
  },
];

const functioningCycleSteps = [
  { label: "Stress", detail: "Sleep loss, conflict, or school pressure", tone: "text-white/70" },
  { label: "Symptoms", detail: "Perception or thinking shifts", tone: "text-accent" },
  { label: "Withdraw", detail: "Skip school, peers, or routines", tone: "text-white/70" },
  { label: "Decline", detail: "Functioning and mood worsen", tone: "text-white/50" },
  { label: "Loop", detail: "Isolation makes symptoms harder to manage", tone: "text-white/90" },
];

const iopCarePhases = [
  {
    phase: "01",
    title: "Stabilize & assess",
    subtitle: "Intake + prescriber alignment",
    body: "Clinical assessment of stability, coordination with the psychiatrist, and safety planning before intensive work begins.",
    progress: 35,
  },
  {
    phase: "02",
    title: "Build skills",
    subtitle: "Psychoeducation + social training",
    body: "Illness management, coping for symptom distress, communication skills, and structured routines reinforced across IOP sessions.",
    progress: 70,
  },
  {
    phase: "03",
    title: "Maintain & re-engage",
    subtitle: "Relapse prevention focus",
    body: "Early warning sign monitoring, family education, school re-engagement planning, and ongoing psychiatric coordination.",
    progress: 100,
  },
];

const skillsToolkit = [
  { icon: "ri-book-open-line", label: "Illness psychoeducation", detail: "Understanding symptoms without shame — for teens and caregivers" },
  { icon: "ri-alarm-warning-line", label: "Early warning signs", detail: "Recognizing sleep, mood, and social shifts before a flare worsens" },
  { icon: "ri-group-line", label: "Social skills practice", detail: "Conversation, peer interaction, and community re-engagement in structured settings" },
  { icon: "ri-shield-check-line", label: "Crisis & relapse plans", detail: "Clear steps for families and clinicians when symptoms escalate" },
];

const familyCommunicationShifts = [
  { before: "Arguing about whether experiences are \"real\"", after: "Validating distress while staying grounded in treatment goals" },
  { before: "Removing all expectations to avoid conflict", after: "Structured routines with clinician-guided flexibility" },
  { before: "Expecting IOP to change medication", after: "Therapy and skills while the psychiatrist manages antipsychotics" },
  { before: "Keeping symptoms hidden from the care team", after: "Proactive updates to prescriber and therapist with family consent" },
];

const prescriberCoordination = [
  {
    icon: "ri-capsule-line",
    title: "We don't prescribe",
    body: "Antipsychotic medication management stays with your teen's psychiatrist or psychiatric prescriber.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Shared clinical picture",
    body: "With consent, we communicate about symptom patterns, adherence, side effects, and functioning in sessions.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Therapy fills the gap",
    body: "IOP adds skills training, family education, and frequent contact that weekly therapy alone often cannot provide.",
  },
];

export default function SchizophreniaTreatmentPage({ config }: SchizophreniaTreatmentPageProps) {
  const IMGS = TREATMENT_LANDING_IMGS.schizophrenia;

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
            {schizophreniaStats.map((stat) => (
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Schizophrenia in adolescence"}</AutoLinkedText></p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              When symptoms disrupt development, school, and family life
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Early-onset schizophrenia and related conditions need coordinated care — psychiatric treatment plus\n              structured therapy, psychoeducation, and family support. Virtual IOP bridges the gap between weekly\n              outpatient visits and residential care for medically stable teens."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {schizophreniaProfiles.map((item) => (
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

      {/* Functioning cycle */}
      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Why support needs structure"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              The stress–withdrawal loop — and where IOP interrupts it
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Symptoms often lead teens to pull back from school and relationships — which makes functioning harder to\n              maintain. Weekly therapy may not provide enough contact to rebuild routines. Virtual IOP adds frequent\n              skills practice, family coaching, and prescriber-aligned monitoring."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="flex divide-x divide-white/10 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {functioningCycleSteps.map((step, i) => (
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
                    {i < functioningCycleSteps.length - 1 ? (
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
                  <i className="ri-mental-health-line text-lg" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Where IOP helps</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    <AutoLinkedText>{"Daily structure, social skills rehearsal, family psychoeducation, and relapse monitoring — aligned\n                    with your teen&apos;s psychiatrist, not instead of them."}</AutoLinkedText>
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

      {/* IOP care phases */}
      <section className="relative overflow-hidden bg-dark px-6 py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Coordinated care phases"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              Stabilize first — then skills, then maintenance
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/50">
              <AutoLinkedText>{"Schizophrenia spectrum care is phased. We assess stability and prescriber alignment before intensive skills\n              work — and maintain relapse prevention throughout IOP."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {iopCarePhases.map((phase) => (
              <div
                key={phase.phase}
                className="flex flex-col rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 lg:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent"
                    style={{ fontFamily: "var(--font-heebo)" }}
                  >
                    {phase.phase}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">{phase.subtitle}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                  {phase.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-white/55"><AutoLinkedText>{phase.body}</AutoLinkedText></p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${phase.progress}%` }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Progress</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills toolkit */}
      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Illness management skills"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              What teens and families practice in IOP
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"These tools are rehearsed in individual sessions, reinforced in group, and coached with caregivers —\n              so teens build functioning between clinical contacts."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {skillsToolkit.map((tool) => (
              <div key={tool.label} className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-border">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <i className={`${tool.icon} text-xl`} aria-hidden />
                </span>
                <div>
                  <p className="text-base font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{tool.label}</AutoLinkedText></p>
                  <p className="mt-1.5 text-sm leading-6 text-body"><AutoLinkedText>{tool.detail}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family communication shifts */}
      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Family communication"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Supporting your teen without escalating conflict
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Families often swing between confrontation and avoidance when symptoms flare. IOP family sessions teach\n              communication strategies that preserve connection and align with psychiatric care."}</AutoLinkedText>
            </p>
          </div>
          <div className="space-y-3">
            {familyCommunicationShifts.map((row) => (
              <div
                key={row.before}
                className="grid gap-3 rounded-2xl bg-surface p-5 ring-1 ring-border sm:grid-cols-2 sm:gap-6 sm:p-6"
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
              <div key={pillar.title} className="rounded-3xl bg-white p-8 ring-1 ring-border">
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

      {/* Family education & early warning — single dark band */}
      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="grid lg:grid-cols-[1fr_340px]">
              <div className="p-8 lg:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Family education</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  When families need more than weekly check-ins
                </h2>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"Schizophrenia spectrum conditions affect the whole family system. IOP provides dedicated family\n                  sessions — psychoeducation, communication coaching, and crisis planning alongside your teen&apos;s\n                  psychiatric care."}</AutoLinkedText>
                </p>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"We assess acuity carefully at intake. IOP is for psychiatrically stable teens under active prescriber\n                  care — not a substitute for inpatient stabilization when 24/7 monitoring is required."}</AutoLinkedText>
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Schizophrenia psychoeducation tailored for adolescent caregivers",
                    "Communication scripts during symptomatic episodes",
                    "Relapse prevention planning with early warning sign tracking",
                    "Clear protocols if clinical deterioration requires higher care",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AmhButton href="/therapy/adolescent-family-therapy" variant="darkSecondary" icon="ri-arrow-right-line">
                    Family therapy
                  </AmhButton>
                  <AmhButton href="/teen-depression-treatment" variant="darkSecondary" icon="ri-arrow-right-line">
                    Co-occurring depression
                  </AmhButton>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"Early changes families notice"}</AutoLinkedText></p>
                <div className="mt-5 space-y-3">
                  {[
                    "Unusual beliefs or perceptions the teen cannot easily explain",
                    "Withdrawal from friends, sports, or activities they once enjoyed",
                    "Sleep disruption, flattened mood, or increased irritability",
                    "School focus or attendance declining beyond typical teen stress",
                  ].map((sign) => (
                    <div key={sign} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <i className="ri-alert-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      <span className="text-sm leading-6 text-white/70">{sign}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-5 text-white/40">
                  If your teen is in immediate danger, call <strong className="text-white/60">911</strong> or text{" "}
                  <strong className="text-white/60">988</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prescriber coordination — light layout */}
      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Psychiatric coordination"}</AutoLinkedText></p>
            <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              IOP therapy aligned with your teen&apos;s psychiatrist
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Antipsychotic medication is central to schizophrenia spectrum treatment — and must stay with a\n              psychiatrist. Our role is therapy, psychoeducation, skills training, and proactive communication with the\n              prescribing team when families authorize it."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {prescriberCoordination.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-6 ring-1 ring-border">
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

          <div className="mt-3 rounded-3xl bg-white p-8 ring-1 ring-border lg:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"How coordination works in IOP"}</AutoLinkedText></p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "No standalone schizophrenia diagnostic evaluations — we assess stability and coordinate with prior care",
                "Release-of-information communication with psychiatrists when families authorize it",
                "Symptom and functioning updates shared to support medication decisions",
                "Referrals to inpatient or residential care when IOP is no longer clinically appropriate",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-body">
                  <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <AmhButton href="/psychiatrist-for-teens" variant="primary" icon="ri-arrow-right-line">
                Psychiatrist coordination
              </AmhButton>
              <AmhButton href="/online-anxiety-treatment" variant="secondary" icon="ri-arrow-right-line">
                Co-occurring anxiety
              </AmhButton>
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

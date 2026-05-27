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

type PtsdTreatmentPageProps = {
  config: TreatmentLandingConfig;
};

const traumaStats = [
  { value: "1 in 4", label: "teens exposed to potentially traumatic events", icon: "ri-bar-chart-grouped-line" },
  { value: "Phased", label: "stabilize first, process when ready", icon: "ri-shield-flash-line" },
  { value: "9–20", label: "clinical hours per week in Virtual IOP", icon: "ri-time-line" },
  { value: "24–48", label: "hours typical intake timeline", icon: "ri-calendar-check-line" },
];

const traumaProfiles = [
  {
    icon: "ri-eye-line",
    title: "Intrusive memories",
    body: "Flashbacks, nightmares, or unwanted reminders that pull teens back into the trauma.",
  },
  {
    icon: "ri-alarm-warning-line",
    title: "Hypervigilance",
    body: "Constant alertness, exaggerated startle, or difficulty feeling safe even at home.",
  },
  {
    icon: "ri-forbid-line",
    title: "Avoidance",
    body: "Steering clear of places, people, conversations, or activities tied to what happened.",
  },
  {
    icon: "ri-contrast-2-line",
    title: "Emotional dysregulation",
    body: "Mood swings, numbness, dissociation, irritability, or difficulty trusting others.",
  },
];

const traumaResponseSteps = [
  { label: "Reminder", detail: "Sound, place, date, or conflict", tone: "text-white/70" },
  { label: "Alarm", detail: "Body surges — fight, flight, freeze", tone: "text-accent" },
  { label: "Escape", detail: "Avoid, numb out, or shut down", tone: "text-white/70" },
  { label: "Relief", detail: "Short drop in distress", tone: "text-white/50" },
  { label: "Stuck", detail: "Brain stays on high alert", tone: "text-white/90" },
];

const treatmentPhases = [
  {
    phase: "01",
    title: "Stabilize",
    subtitle: "Weeks 1–2+",
    body: "Grounding, safety planning, sleep and arousal regulation — before any trauma processing.",
    readiness: 35,
  },
  {
    phase: "02",
    title: "Build skills",
    subtitle: "Ongoing in IOP",
    body: "Trauma psychoeducation, distress tolerance, and gradual approach to avoided situations when appropriate.",
    readiness: 65,
  },
  {
    phase: "03",
    title: "Process",
    subtitle: "When clinically ready",
    body: "Trauma-focused CBT or paced processing — only after stabilization, never forced early.",
    readiness: 100,
  },
];

const stabilizationTools = [
  { icon: "ri-focus-3-line", label: "5-senses grounding", detail: "Bring attention back to the present during flashbacks or panic" },
  { icon: "ri-shield-check-line", label: "Safety & crisis plans", detail: "Personalized steps for teens and caregivers when symptoms spike" },
  { icon: "ri-moon-line", label: "Sleep & arousal regulation", detail: "Nightmare management and wind-down routines for hypervigilance" },
  { icon: "ri-parent-line", label: "Caregiver coaching", detail: "How families respond without minimizing or accidentally re-triggering" },
];

const pacingPrinciples = [
  "No forced disclosure — teens share at their own pace with clinician guidance",
  "Flashback protocols practiced in session before harder work begins",
  "Referral to inpatient or residential care when 24/7 monitoring is required",
  "Coordination with schools, prior therapists, and outside specialists",
];

export default function PtsdTreatmentPage({ config }: PtsdTreatmentPageProps) {
  const IMGS = TREATMENT_LANDING_IMGS.ptsd;

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
            {traumaStats.map((stat) => (
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Trauma in adolescence"}</AutoLinkedText></p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              When the nervous system stays on alert long after the event
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Teen trauma can look like anger, withdrawal, school refusal, or risky behavior — not always classic\n              flashbacks. Our clinicians assess the full picture and pace treatment to your teen&apos;s safety and\n              readiness."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {traumaProfiles.map((item) => (
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

      {/* Trauma response cycle */}
      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Why symptoms persist"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              The trauma response loop — and where IOP stabilizes first
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Avoidance and numbness reduce distress briefly, but keep the nervous system from learning safety. Weekly\n              therapy may not offer enough contact when flashbacks, sleep disruption, or school avoidance are daily.\n              Virtual IOP prioritizes stabilization skills before any deeper processing work."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="flex divide-x divide-white/10 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {traumaResponseSteps.map((step, i) => (
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
                    {i < traumaResponseSteps.length - 1 ? (
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
                  <i className="ri-shield-flash-line text-lg" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Where IOP helps</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    <AutoLinkedText>{"Frequent grounding practice, safety monitoring, trauma-informed group support, and family\n                    coaching — so teens stabilize before processing, not after crisis."}</AutoLinkedText>
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

      {/* Phased trauma treatment */}
      <section className="relative overflow-hidden bg-dark px-6 py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Phased care</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              Stabilize first — process only when your teen is ready
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/50">
              <AutoLinkedText>{"Trauma treatment is not one conversation. Our clinicians follow a phased model aligned with adolescent\n              trauma protocols — never pushing disclosure before skills and safety are in place."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {treatmentPhases.map((phase) => (
              <div
                key={phase.phase}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="text-3xl font-bold text-white/15"
                    style={{ fontFamily: "var(--font-heebo)" }}
                  >
                    {phase.phase}
                  </span>
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                    {phase.subtitle}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                  {phase.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-white/55"><AutoLinkedText>{phase.body}</AutoLinkedText></p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${phase.readiness}%` }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Readiness</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stabilization toolkit */}
      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Stabilization skills"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Tools teens practice before any trauma processing
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"These skills are rehearsed in individual sessions, reinforced in group, and coached with caregivers at\n              home — so dysregulation is manageable between IOP contacts."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {stabilizationTools.map((tool) => (
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

      {/* Pacing & safety band */}
      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="grid lg:grid-cols-[1fr_320px]">
              <div className="p-8 lg:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Pacing & safety</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  Healing without re-traumatization
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"Virtual IOP can be effective for trauma when acuity is appropriate — teens stay in a familiar\n                  environment with family nearby. We assess whether virtual care fits; higher levels of care come first\n                  when 24/7 monitoring is needed."}</AutoLinkedText>
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {pacingPrinciples.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AmhButton href="/teen-depression-treatment" variant="darkSecondary" icon="ri-arrow-right-line">
                    Co-occurring depression
                  </AmhButton>
                  <AmhButton href="/conditions/self-harm" variant="darkSecondary" icon="ri-arrow-right-line">
                    Self-harm support
                  </AmhButton>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"Virtual session safety"}</AutoLinkedText></p>
                <div className="mt-5 space-y-3">
                  {[
                    "Grounding protocols if flashbacks occur on video",
                    "Teen can pause or stop — clinician follows their pace",
                    "HIPAA-compliant encrypted sessions from home",
                    "Clear plan for after-hours crisis resources",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <i className="ri-lock-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      <span className="text-sm leading-6 text-white/70">{item}</span>
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
                <p className="mt-3 flex-1 text-sm leading-7 text-body">{item.desc}</p>
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

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
import { BIPOLAR_IMGS, CONTAINER, SITE } from "@/lib/site";

const IMGS = BIPOLAR_IMGS;

const bipolarStats = [
  { value: "~3%", label: "of adolescents meet bipolar spectrum criteria", icon: "ri-bar-chart-grouped-line" },
  { value: "CBT + DBT", label: "plus mood monitoring in Virtual IOP", icon: "ri-award-line" },
  { value: "9–20", label: "clinical hours per week in Virtual IOP", icon: "ri-time-line" },
  { value: "24–48", label: "hours typical intake timeline", icon: "ri-calendar-check-line" },
];

const bipolarProfiles = [
  {
    icon: "ri-emotion-sad-line",
    title: "Depressive episodes",
    body: "Hopelessness, withdrawal, sleep changes, and loss of interest that last days or weeks — not typical teen moodiness.",
  },
  {
    icon: "ri-flashlight-line",
    title: "Elevated or irritable mood",
    body: "Racing thoughts, decreased need for sleep, impulsivity, or extreme irritability that disrupts school and relationships.",
  },
  {
    icon: "ri-contrast-2-line",
    title: "Mixed states",
    body: "Depression and activation at once — often the highest-risk presentation in adolescents.",
  },
  {
    icon: "ri-moon-line",
    title: "Sleep & rhythm disruption",
    body: "Sleep loss can trigger mania; irregular routines make both poles harder to manage.",
  },
];

const moodCycleSteps = [
  { label: "Trigger", detail: "Stress, conflict, or sleep loss", tone: "text-white/70" },
  { label: "Shift", detail: "Mood elevates or crashes", tone: "text-accent" },
  { label: "Disrupt", detail: "School, safety, or relationships strain", tone: "text-white/70" },
  { label: "Relief", detail: "Short stabilization or crash", tone: "text-white/50" },
  { label: "Loop", detail: "Episodes repeat without structure", tone: "text-white/90" },
];

const stabilityPlanSteps = [
  { level: "1", task: "Establish mood and sleep tracking with a clinician baseline", progress: 20 },
  { level: "2", task: "Build early warning sign plans with teen and caregivers", progress: 40 },
  { level: "3", task: "Practice CBT/DBT skills at the edges of episodes — not during crisis peaks", progress: 55 },
  { level: "4", task: "Align routines, school plans, and prescriber communication", progress: 75 },
  { level: "5", task: "Maintain relapse prevention and step-down planning in IOP", progress: 100 },
];

const familyEpisodeShifts = [
  { before: "Treating mood swings as character flaws or defiance", after: "Recognizing episode patterns and responding with clinician-guided structure" },
  { before: "Opposite rules during mania vs depression", after: "Consistent family responses tied to the safety and mood plan" },
  { before: "Expecting IOP to change medication doses", after: "Therapy and monitoring while the prescriber manages medication" },
  { before: "Removing all expectations during low mood", after: "Behavioral activation with compassion — small steps, not pressure" },
];

const treatmentPillars = [
  {
    num: "01",
    icon: "ri-line-chart-line",
    tag: "Monitoring",
    title: "Mood tracking and early warning signs",
    body: "Daily or weekly mood logs help teens and families identify patterns, triggers, and early warning signs before episodes escalate.",
    bullets: ["Personalized mood and sleep log", "Identifying individual episode triggers", "Family-facing warning sign plan"],
  },
  {
    num: "02",
    icon: "ri-heart-pulse-line",
    tag: "Core therapy",
    title: "CBT and DBT for mood regulation",
    body: "Cognitive and dialectical skills help teens manage extreme mood states, interpersonal stress, and impulsivity during episodes.",
    bullets: ["Emotion regulation and distress tolerance", "Interpersonal effectiveness for relationships", "Thought challenging for depressive episodes"],
  },
  {
    num: "03",
    icon: "ri-capsule-line",
    tag: "Coordination",
    title: "Medication coordination and adherence",
    body: "When a prescriber is involved, we coordinate therapy with medication management — supporting adherence and symptom monitoring.",
    bullets: ["Collaboration with prescribers when appropriate", "Adherence support and psychoeducation", "Symptom monitoring across sessions"],
  },
  {
    num: "04",
    icon: "ri-team-line",
    tag: "Family integration",
    title: "Family education and caregiver coaching",
    body: "Caregivers learn to recognize early episode signs and respond effectively during escalations at home.",
    bullets: ["Bipolar psychoeducation for families", "Responding to elevated or depressed episodes", "Communication strategies for high-conflict moments"],
  },
];

const prescriberCoordination = [
  {
    icon: "ri-capsule-line",
    title: "We don't prescribe",
    body: "Mood stabilizers and other bipolar medications stay with your teen's psychiatrist or prescriber.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Shared mood tracking",
    body: "With consent, we communicate sleep, activation, and depressive patterns observed in sessions.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Therapy fills the gap",
    body: "IOP adds skills, family education, and frequent contact that monthly med visits alone often cannot provide.",
  },
];

const fitCriteria = [
  { icon: "ri-emotion-sad-line", label: "Depressive episodes lasting days or weeks", sub: "Hopelessness, withdrawal, sleep changes, and loss of interest that go beyond typical mood shifts" },
  { icon: "ri-flashlight-line", label: "Periods of elevated or irritable mood", sub: "Racing thoughts, decreased need for sleep, risky behavior, or extreme irritability" },
  { icon: "ri-repeat-line", label: "Cycling between mood extremes", sub: "Clear pattern of mood swings that affect school, relationships, and daily functioning" },
  { icon: "ri-alarm-warning-line", label: "Recent hospitalization or crisis episode", sub: "Stepping down from inpatient or emergency care and needing structured outpatient support" },
  { icon: "ri-user-search-line", label: "Diagnosis under review or recently received", sub: "Families navigating new bipolar diagnoses and needing clinical support to understand next steps" },
];

const intakeSteps = [
  { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Describe your teen's mood pattern, any previous treatment or hospitalization, and current prescribers." },
  { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "A licensed clinician evaluates mood history, safety, co-occurring conditions, and appropriateness for IOP." },
  { num: "03", icon: "ri-calendar-check-line", title: "Coordinated care plan", body: "We build an individualized plan including mood monitoring, therapy, family education, and prescriber communication." },
  { num: "04", icon: "ri-video-chat-line", title: "Begin Virtual IOP", body: "Your teen starts individual, group, and family sessions — with frequent clinical contact built into the program." },
];

const comparisonRows = [
  { label: "Contact frequency", standard: "Once weekly", iop: "Multiple days per week" },
  { label: "Mood monitoring", standard: "Reported monthly", iop: "Tracked across sessions" },
  { label: "Family involvement", standard: "Rare or optional", iop: "Structured family track" },
  { label: "Safety monitoring", standard: "Large gaps between contact", iop: "Frequent check-ins" },
  { label: "Prescriber coordination", standard: "Uncommon", iop: "Proactive collaboration" },
];

const relatedPrograms = [
  { label: "Teen depression treatment", path: "/teen-depression-treatment", desc: "Depressive episodes are core to bipolar disorder — integrated treatment and accurate differentiation from unipolar depression." },
  { label: "Online anxiety treatment", path: "/online-anxiety-treatment", desc: "Anxiety co-occurs at high rates with bipolar disorder and requires integrated planning." },
  { label: "Self-harm support", path: "/conditions/self-harm", desc: "Self-harm during depressive episodes is common — safety planning is central to our model." },
  { label: "ADHD treatment", path: "/adhd-treatment-for-teens", desc: "ADHD symptoms often overlap with bipolar presentation — accurate diagnosis guides care." },
  { label: "Insomnia treatment", path: "/online-insomnia-treatment-for-teens", desc: "Sleep disruption is both a symptom and a trigger — sleep stabilization is a core target." },
  { label: "Psychiatrist for teens", path: "/psychiatrist-for-teens", desc: "How we coordinate intensive therapy with outside psychiatric prescribers." },
];

const faqs = [
  { q: "Can teens have bipolar disorder?", a: "Yes. Bipolar disorder can emerge in adolescence and is often initially misdiagnosed as depression, ADHD, or behavioral problems. Accurate diagnosis and early intervention significantly improve long-term outcomes." },
  { q: "Do you diagnose bipolar disorder?", a: "Our licensed clinicians conduct comprehensive assessments as part of intake. We coordinate with prior providers and, when needed, refer for additional psychiatric evaluation. We do not make diagnoses in isolation from a full clinical picture." },
  { q: "Is Virtual IOP safe for teens with bipolar disorder?", a: "IOP is appropriate for medically and psychiatrically stable teens who do not require 24/7 monitoring. We assess acuity carefully at intake and will recommend a higher level of care if inpatient or residential is clinically indicated." },
  { q: "Who manages medication for bipolar disorder?", a: "Prescribing decisions belong with your teen's psychiatrist or medical provider. Our role is to provide therapy, mood monitoring, family education, and to communicate proactively with the prescribing team about symptom patterns." },
  { q: "Can Virtual IOP happen alongside medication management?", a: "Yes — this is our model for most teens with bipolar disorder. Therapy, skills work, and family support in IOP complement medication management. We coordinate with prescribers to ensure care is aligned." },
  { q: "What happens if my teen decompensates during IOP?", a: "We have clear protocols for clinical deterioration. If a teen requires a higher level of care during IOP, we facilitate transition to inpatient or residential programs and maintain family communication throughout." },
];

export default function BipolarTreatmentPage() {
  return (
    <MarketingPage currentPath="/online-bipolar-treatment">
      <ProgramHeroSection
        eyebrow={`Teen Bipolar Treatment · Ages ${SITE.ages}`}
        headline={
          <>
            Teen bipolar treatment <span className="text-accent">with expert mood stabilization</span>
          </>
        }
        body="Intensive outpatient support for teens with bipolar disorder — combining mood monitoring, CBT and DBT skills, family education, and prescriber coordination in a structured virtual program."
        imageSrc={IMGS.hero}
        imageAlt="Teen in virtual therapy session discussing mood management with clinician"
        imageClassName="object-cover object-center"
        stats={[
          { icon: "ri-line-chart-line", label: "Contact", value: "Multiple", unit: "days/wk" },
          { icon: "ri-heart-pulse-line", label: "Format", value: "IOP", unit: "+ monitoring" },
          { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
        ]}
        trustItems={[
          { icon: "ri-shield-check-line", label: "Licensed clinicians" },
          { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
          { icon: "ri-team-line", label: "Family included" },
          { icon: "ri-capsule-line", label: "Prescriber coordination" },
        ]}
      />

      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {bipolarStats.map((stat) => (
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Bipolar in adolescence"}</AutoLinkedText></p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              When mood swings disrupt school, safety, and family life
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Adolescent bipolar disorder is often missed or misdiagnosed as depression or ADHD. Virtual IOP provides\n              frequent mood monitoring, skills training, and family education — coordinated with prescribers when\n              medication is part of the plan."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {bipolarProfiles.map((item) => (
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
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"What is teen bipolar treatment?"}</AutoLinkedText></p>
              <h3 className="mt-4 text-3xl font-bold leading-[1.1] text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                Comprehensive mood stabilization — at home, with your family
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-8 text-body">
                <AutoLinkedText>{"Adolescent bipolar disorder requires more than weekly therapy — frequent clinical contact, structured\n                mood monitoring, skills for managing episodes, and coordination with prescribing providers."}</AutoLinkedText>
              </p>
              <p className="mt-4 max-w-xl text-sm leading-8 text-body">
                <AutoLinkedText>{"Our Virtual IOP provides intensive structure without a residential stay — multiple sessions per week\n                with licensed clinicians and a dedicated family track."}</AutoLinkedText>
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Depressive episodes", "Mania & irritability", "Mixed states", "Relapse prevention"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-2 text-xs font-semibold text-ink"
                  >
                    <i className="ri-contrast-2-line text-accent" aria-hidden />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl ring-1 ring-border lg:min-h-full">
              <Image
                src={IMGS.bento}
                alt="Teen and parent reviewing mood tracking chart together at kitchen table"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-6">
                <p className="text-sm font-bold text-white"><AutoLinkedText>{"Family is part of the clinical team"}</AutoLinkedText></p>
                <p className="mt-1 text-xs leading-5 text-white/65">
                  <AutoLinkedText>{"Caregivers learn warning signs and effective responses — reducing episode severity at home."}</AutoLinkedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Why episodes repeat</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              The mood cycle — and where IOP adds structure
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Stress and sleep loss can shift mood quickly — and disrupted routines make both poles harder to manage.\n              Weekly therapy may not provide enough monitoring when episodes are cycling. Virtual IOP adds mood tracking,\n              skills practice, and family coaching between psychiatric appointments."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="flex divide-x divide-white/10 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {moodCycleSteps.map((step, i) => (
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
                    {i < moodCycleSteps.length - 1 ? (
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
                  <i className="ri-line-chart-line text-lg" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Where IOP helps</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    <AutoLinkedText>{"Mood logs, sleep routines, early warning plans, and prescriber-aligned monitoring — practiced across\n                    multiple sessions each week."}</AutoLinkedText>
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

      <section className="relative overflow-hidden bg-dark px-6 py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Stability planning</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              A paced plan — monitor first, then skills, then maintenance
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/50">
              <AutoLinkedText>{"Teens do not stabilize through willpower alone. Clinicians build a step-by-step mood plan with homework\n              between IOP sessions — especially around sleep, routines, and family responses."}</AutoLinkedText>
            </p>
          </div>

          <div className="space-y-2">
            {stabilityPlanSteps.map((step) => (
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
                    <div className="h-full rounded-full bg-accent" style={{ width: `${step.progress}%` }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Progress</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Family responses</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Supporting your teen through both poles
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Families often swing between over-accommodation and conflict when moods shift. IOP family sessions teach\n              responses that support stability without feeding episode patterns."}</AutoLinkedText>
            </p>
          </div>
          <div className="space-y-3">
            {familyEpisodeShifts.map((row) => (
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Treatment pillars</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              How we stabilize mood in adolescents
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Each pillar addresses a different driver of instability — from internal mood patterns to family\n              environment to medication adherence."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {treatmentPillars.map((pillar) => (
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

      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="grid lg:grid-cols-[1fr_340px]">
              <div className="p-8 lg:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Sleep & rhythm</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  When sleep loss triggers the next episode
                </h2>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"For many teens with bipolar disorder, reduced sleep is both a symptom and a trigger for elevated mood.\n                  IOP builds sleep routines, mood logs, and family monitoring alongside psychiatric care."}</AutoLinkedText>
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Sleep-wake scheduling and wind-down routines",
                    "Tracking sleep changes as early warning signs",
                    "School coordination during episode recovery",
                    "Clear escalation when safety or stability breaks down",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AmhButton href="/online-insomnia-treatment-for-teens" variant="darkSecondary" icon="ri-arrow-right-line">
                    Insomnia treatment
                  </AmhButton>
                  <AmhButton href="/conditions/self-harm" variant="darkSecondary" icon="ri-arrow-right-line">
                    Self-harm support
                  </AmhButton>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"Families often notice"}</AutoLinkedText></p>
                <div className="mt-5 space-y-3">
                  {[
                    "Suddenly needing much less sleep but seeming wired",
                    "Sharp crashes after periods of high energy or irritability",
                    "Mixed symptoms — agitated but hopeless at the same time",
                    "Risky behavior during elevated mood phases",
                  ].map((sign) => (
                    <div key={sign} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <i className="ri-alert-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      <span className="text-sm leading-6 text-white/70">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Psychiatric coordination"}</AutoLinkedText></p>
            <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              IOP therapy aligned with your teen&apos;s prescriber
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Mood stabilizers and other medications are central to bipolar treatment — and must stay with a\n              psychiatrist. Our role is therapy, monitoring, family education, and proactive communication when\n              families authorize it."}</AutoLinkedText>
            </p>
          </div>
          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {prescriberCoordination.map((item) => (
              <div key={item.title} className="rounded-3xl bg-surface p-6 ring-1 ring-border">
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
        </div>
      </section>

      <GoodFitSection
        eyebrow="Is it right for us?"
        title="Signs your teen may need bipolar-specific care"
        description="Bipolar disorder in teens is often missed or misdiagnosed. If these patterns sound familiar, a clinical assessment can clarify diagnosis and recommend the right level of care."
        criteria={fitCriteria}
        bg="surface"
        asideNote={{
          label: "Good to know",
          body: "IOP is appropriate for stable teens who do not require hospitalization. We assess acuity at intake and will refer to a higher level of care if needed — we will not enroll teens who need inpatient stabilization first.",
        }}
        showCta={false}
      />

      <SessionStructureSection
        eyebrow="How it works"
        title="From first call to a coordinated care plan"
        description="We move quickly — most families complete intake within 24–48 hours. We coordinate with prescribers and schools when needed from day one."
        phases={intakeSteps.map((step) => ({
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Why IOP for bipolar</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              More contact than standard outpatient allows
            </h2>
          </div>
          <ComparisonTable
            baselineLabel="Standard outpatient"
            highlightedLabel="Virtual IOP"
            rows={comparisonRows.map((row) => ({
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
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Related programs</p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Conditions we address alongside bipolar disorder
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Bipolar disorder rarely presents alone. Our IOP treats the full clinical picture — not just the primary\n              diagnosis."}</AutoLinkedText>
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPrograms.map((item) => (
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

      <TherapyFaqSection title="Questions about teen bipolar treatment" items={faqs} />

      <DarkCtaSection
        title="Get expert bipolar care for your teen"
        description="Free consultation, no obligation. We will discuss mood history, safety, and whether our Virtual IOP is clinically appropriate — or help you find the right level of care if it isn't."
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

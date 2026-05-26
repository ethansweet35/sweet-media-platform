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
import { CONTAINER, INSOMNIA_IMGS, SITE } from "@/lib/site";

const IMGS = INSOMNIA_IMGS;

const insomniaStats = [
  { value: "CBT-I", label: "evidence-based approach for adolescent insomnia", icon: "ri-moon-line" },
  { value: "Integrated", label: "sleep + anxiety/depression treated together", icon: "ri-links-line" },
  { value: "6–10", label: "weeks typical CBT-I course length", icon: "ri-timer-line" },
  { value: "24–48", label: "hours typical intake timeline", icon: "ri-calendar-check-line" },
];

const insomniaProfiles = [
  {
    icon: "ri-time-line",
    title: "Sleep onset difficulty",
    body: "More than 30 minutes to fall asleep most nights — often driven by racing thoughts, worry, or an overactive mind at bedtime.",
  },
  {
    icon: "ri-sun-line",
    title: "Early waking",
    body: "Waking before the intended time and unable to return to sleep — a common pattern in teen depression and chronic insomnia.",
  },
  {
    icon: "ri-emotion-unhappy-line",
    title: "Daytime impairment",
    body: "Fatigue, irritability, concentration problems, or academic decline that tracks directly with poor sleep quality.",
  },
  {
    icon: "ri-cloud-windy-line",
    title: "Co-occurring anxiety & mood",
    body: "Insomnia alongside anxiety, depression, or school avoidance — where treating sleep alone rarely produces lasting results.",
  },
];

const sleepAnxietyMoodCycleSteps = [
  { label: "Poor sleep", detail: "Short or fragmented rest", tone: "text-white/70" },
  { label: "Hyperarousal", detail: "Anxiety and rumination rise", tone: "text-accent" },
  { label: "Mood shift", detail: "Irritability, low mood, avoidance", tone: "text-white/70" },
  { label: "Bedtime dread", detail: "Sleep anxiety worsens the cycle", tone: "text-white/50" },
  { label: "Loop", detail: "Patterns repeat without structure", tone: "text-white/90" },
];

const cbtiPlanSteps = [
  { level: "1", task: "Establish sleep logs and baseline patterns with clinician review", progress: 20 },
  { level: "2", task: "Set anchor wake time and personalized sleep window recommendations", progress: 40 },
  { level: "3", task: "Apply stimulus control and wind-down routines at home", progress: 55 },
  { level: "4", task: "Address sleep-specific thoughts and pre-sleep hyperarousal with CBT techniques", progress: 75 },
  { level: "5", task: "Integrate family coaching and maintain gains across school weeks", progress: 100 },
];

const bedtimePatternShifts = [
  { before: "Checking on your teen every hour when they can't sleep", after: "Clinician-guided responses that reduce accommodation without abandoning support" },
  { before: "Letting screens stay in the bedroom to avoid bedtime conflict", after: "Realistic device boundaries and wind-down routines built with your teen" },
  { before: "Sleeping in on weekends to 'catch up' after a bad week", after: "Consistent anchor wake times that stabilize the sleep drive" },
  { before: "Treating poor sleep as a separate problem from mood or anxiety", after: "Integrated care that addresses sleep and mental health drivers together" },
];

const treatmentPillars = [
  {
    num: "01",
    icon: "ri-moon-line",
    tag: "Sleep structure",
    title: "Sleep schedule & stimulus control",
    body: "Consistent wake times, sleep restriction protocols, and stimulus control techniques that rebuild the brain's association between bed and sleep — not anxiety or rumination.",
    bullets: ["Personalized sleep window guidance", "Consistent anchor wake time", "Reducing time in bed awake"],
  },
  {
    num: "02",
    icon: "ri-brain-line",
    tag: "Cognitive work",
    title: "Addressing worry and sleep anxiety",
    body: "CBT-based techniques for identifying catastrophic sleep thoughts, testing unhelpful beliefs about sleep, and building more realistic expectations that reduce bedtime anxiety.",
    bullets: ["Sleep-specific thought records", "Decatastrophizing sleep loss", "Reducing pre-sleep hyperarousal"],
  },
  {
    num: "03",
    icon: "ri-phone-off-line",
    tag: "Behavioral strategies",
    title: "Screen, device, and routine guidance",
    body: "Adolescent sleep is deeply affected by device use, social media, and irregular schedules. We help families create practical routines that are realistic for teens — not just idealized recommendations.",
    bullets: ["Evidence-based wind-down routines", "Blue light and device timing guidance", "Weekend schedule management"],
  },
  {
    num: "04",
    icon: "ri-parent-line",
    tag: "Family integration",
    title: "Parent coaching and household support",
    body: "Caregivers play a major role in adolescent sleep. We coach parents on how to respond to nighttime distress, morning refusal, and the family patterns that inadvertently maintain insomnia.",
    bullets: ["Understanding accommodation vs. support", "Morning routine and school readiness", "Managing conflict around sleep"],
  },
];

const eveningRoutineSupports = [
  "Evidence-based wind-down routines tailored to adolescent schedules",
  "Device timing and blue-light guidance that families can actually follow",
  "Pre-sleep cognitive techniques for racing thoughts and worry",
  "Morning anchor routines that reduce school-day conflict",
];

const fitCriteria = [
  { icon: "ri-moon-line", label: "Difficulty falling asleep most nights", sub: "More than 30 minutes to fall asleep three or more nights per week" },
  { icon: "ri-sun-line", label: "Early waking or broken sleep", sub: "Waking before intended time and unable to return to sleep" },
  { icon: "ri-emotion-unhappy-line", label: "Daytime impairment from poor sleep", sub: "Fatigue, mood problems, or academic difficulties tied to sleep" },
  { icon: "ri-cloud-windy-line", label: "Sleep problems and mental health together", sub: "Insomnia alongside anxiety, depression, or school avoidance" },
  { icon: "ri-history-line", label: "Sleep problems lasting weeks or more", sub: "Short-term sleep struggles that have become chronic patterns" },
];

const intakeSteps = [
  { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Describe your teen's sleep patterns and any co-occurring mental health concerns. We will recommend the right level of care." },
  { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "A licensed clinician evaluates sleep history, mental health, and school/family context to determine the best treatment approach." },
  { num: "03", icon: "ri-calendar-check-line", title: "Personalized sleep plan", body: "We build an individualized treatment plan with specific sleep schedule recommendations, cognitive targets, and family guidance." },
  { num: "04", icon: "ri-video-chat-line", title: "Begin treatment", body: "Sleep treatment is often embedded within Virtual IOP when anxiety, depression, or school avoidance is co-occurring." },
];

const comparisonRows = [
  { label: "Approach", generic: "Generic sleep hygiene tips", treated: "CBT-I informed protocol" },
  { label: "Mental health integration", generic: "Sleep treated in isolation", treated: "Sleep + anxiety/depression together" },
  { label: "Family involvement", generic: "Limited to none", treated: "Parent coaching included" },
  { label: "Duration", generic: "Ongoing advice", treated: "Targeted 6–10 week course" },
  { label: "Clinical oversight", generic: "No clinician contact", treated: "Licensed therapist throughout" },
];

const relatedConditions = [
  { label: "Anxiety & panic", path: "/online-anxiety-treatment", desc: "Anxiety is the most common driver of teen insomnia — treating anxiety often resolves sleep difficulties simultaneously." },
  { label: "Depression", path: "/teen-depression-treatment", desc: "Depression disrupts sleep architecture — early waking and hypersomnia are both common presentations we address clinically." },
  { label: "School avoidance", path: "/conditions/school-avoidance", desc: "Sleep disruption and school refusal are frequently interlinked — our treatment addresses both as part of an integrated plan." },
  { label: "ADHD", path: "/adhd-treatment-for-teens", desc: "ADHD and sleep problems co-occur at high rates — stimulant timing, routine structure, and wind-down strategies are key." },
  { label: "Trauma & PTSD", path: "/ptsd-treatment-online", desc: "Trauma frequently manifests as nighttime hyperarousal and nightmares — trauma-informed sleep care addresses both." },
  { label: "Bipolar disorder", path: "/online-bipolar-treatment", desc: "Sleep disruption is both a symptom and a trigger for mood episodes — sleep stabilization is a core part of bipolar care." },
];

const faqs = [
  { q: "Is teen insomnia a clinical condition?", a: "Yes. Chronic insomnia disorder in adolescents is a recognized clinical condition characterized by difficulty initiating or maintaining sleep, lasting at least three nights per week for three or more months, with meaningful daytime impairment. It is not just a phase." },
  { q: "What is CBT-I and can it help teens?", a: "Cognitive Behavioral Therapy for Insomnia (CBT-I) is the gold-standard treatment for insomnia in adults and has strong evidence in adolescents. It addresses the behavioral patterns and thoughts that perpetuate insomnia — without relying on medication." },
  { q: "Do you prescribe sleep medication?", a: "No. We are a therapy-based program. Medication decisions belong with your teen's prescribing physician or psychiatrist. We coordinate with medical providers when appropriate and focus on behavioral and cognitive interventions." },
  { q: "Does my teen need to have a sleep problem to enroll in Virtual IOP?", a: "No. Virtual IOP treats a range of adolescent mental health concerns. Insomnia treatment is often part of a broader plan when sleep is disrupted alongside anxiety, depression, or school avoidance." },
  { q: "Can virtual care address sleep problems effectively?", a: "Yes. Sleep logs, behavioral recommendations, parent coaching, and cognitive work are all well-suited to a telehealth format. The key is consistent clinician contact — which Virtual IOP provides multiple days per week." },
  { q: "How quickly can sleep improve with treatment?", a: "Many teens see meaningful improvement in sleep onset and maintenance within four to six weeks of consistent CBT-I based treatment. Progress depends on adherence to sleep schedule recommendations and co-occurring factors." },
];

export default function InsomniaTreatmentPage() {
  return (
    <MarketingPage currentPath="/online-insomnia-treatment-for-teens">
      <ProgramHeroSection
        eyebrow={`Teen Insomnia Treatment · Ages ${SITE.ages}`}
        headline={
          <>
            Teen insomnia treatment{" "}
            <span className="text-accent">that addresses sleep and mental health together</span>
          </>
        }
        body="Teen insomnia rarely exists alone. Our clinicians treat sleep disruption alongside anxiety, depression, and school avoidance — with CBT-informed approaches that produce lasting results."
        imageSrc={IMGS.hero}
        imageAlt="Teen establishing a healthy screen-free evening routine before sleep"
        imageClassName="object-cover object-center"
        stats={[
          { icon: "ri-moon-line", label: "Approach", value: "CBT-I", unit: "informed" },
          { icon: "ri-heart-pulse-line", label: "Focus", value: "Sleep", unit: "+ mood" },
          { icon: "ri-video-chat-line", label: "Format", value: "100%", unit: "virtual" },
        ]}
        trustItems={[
          { icon: "ri-shield-check-line", label: "Licensed clinicians" },
          { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
          { icon: "ri-parent-line", label: "Family coaching" },
          { icon: "ri-lock-line", label: "HIPAA compliant" },
        ]}
      />

      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {insomniaStats.map((stat) => (
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Insomnia in adolescence"}</AutoLinkedText></p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              When sleep problems affect mood, school, and family life
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Teen insomnia is rarely just a bedtime issue. Device use, anxiety, irregular schedules, and family\n              accommodation patterns all maintain poor sleep — and poor sleep worsens the mental health concerns\n              driving it. Clinical care addresses the full cycle, not just sleep hygiene tips."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {insomniaProfiles.map((item) => (
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
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"What is teen insomnia treatment?"}</AutoLinkedText></p>
              <h3 className="mt-4 text-3xl font-bold leading-[1.1] text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                Treating sleep and the mental health driving it
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-8 text-body">
                <AutoLinkedText>{"Sleep hygiene tips rarely fix adolescent insomnia. Clinical insomnia treatment addresses the behavioral\n                patterns, anxious thoughts, and irregular schedules that maintain poor sleep — plus the anxiety or\n                depression that almost always co-occurs."}</AutoLinkedText>
              </p>
              <p className="mt-4 max-w-xl text-sm leading-8 text-body">
                <AutoLinkedText>{"Our approach uses CBT-informed techniques (CBT-I) delivered within a broader adolescent mental health\n                framework — so your teen&apos;s sleep improves as part of overall recovery, not in isolation."}</AutoLinkedText>
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Sleep onset", "Early waking", "Daytime fatigue", "Co-occurring mood"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-2 text-xs font-semibold text-ink"
                  >
                    <i className="ri-moon-line text-accent" aria-hidden />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl ring-1 ring-border lg:min-h-full">
              <Image
                src={IMGS.bento}
                alt="Teen writing in sleep diary at morning desk with tea nearby"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-6">
                <p className="text-sm font-bold text-white"><AutoLinkedText>{"Sleep logs track progress objectively"}</AutoLinkedText></p>
                <p className="mt-1 text-xs leading-5 text-white/65">
                  <AutoLinkedText>{"Daily sleep diaries guide treatment adjustments and help teens see real improvement over weeks."}</AutoLinkedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Why insomnia persists"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              The sleep–anxiety–mood cycle — and where clinical care breaks it
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Poor sleep worsens anxiety and mood; anxiety and low mood disrupt sleep further. Bedtime dread and\n              family accommodation can lock the pattern in place. Weekly advice rarely provides enough structure to\n              change habits — Virtual IOP adds consistent clinician contact, sleep logs, and family coaching across\n              multiple sessions each week."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="flex divide-x divide-white/10 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {sleepAnxietyMoodCycleSteps.map((step, i) => (
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
                    {i < sleepAnxietyMoodCycleSteps.length - 1 ? (
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
                  <i className="ri-moon-line text-lg" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Where IOP helps</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    <AutoLinkedText>{"Sleep schedules, cognitive techniques for bedtime worry, device routines, and parent coaching —\n                    practiced between sessions so new sleep habits stick."}</AutoLinkedText>
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"CBT-I treatment plan"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              A structured sleep plan — paced, not overwhelming
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/50">
              <AutoLinkedText>{"Teens do not overhaul every sleep habit at once. Clinicians build a step-by-step CBT-I plan with\n              homework between sessions — adapted to school schedules, device use, and co-occurring anxiety or mood\n              concerns."}</AutoLinkedText>
            </p>
          </div>

          <div className="space-y-2">
            {cbtiPlanSteps.map((step) => (
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
          <p className="mt-5 text-xs leading-5 text-white/35">
            <AutoLinkedText>{"Example CBT-I sequence — every teen&apos;s plan is individualized during assessment."}</AutoLinkedText>
          </p>
        </div>
      </section>

      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Family dynamics</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Shifting bedtime patterns without escalating conflict
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Insomnia-related conflict often centers on devices, wake times, and nighttime check-ins. Family sessions\n              teach sleep-informed strategies that support independence instead of accommodation or nightly battles."}</AutoLinkedText>
            </p>
          </div>
          <div className="space-y-3">
            {bedtimePatternShifts.map((row) => (
              <div
                key={row.before}
                className="grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-border sm:grid-cols-2 sm:gap-6 sm:p-6"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-body/50">Common pattern</p>
                  <p className="mt-2 text-sm leading-6 text-body"><AutoLinkedText>{row.before}</AutoLinkedText></p>
                </div>
                <div className="border-t border-border pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent"><AutoLinkedText>{"Clinical coaching shift"}</AutoLinkedText></p>
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Treatment components"}</AutoLinkedText></p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              How we treat insomnia in teens
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Each component targets a different driver of adolescent insomnia — sleep patterns, anxious thoughts,\n              device behavior, and family dynamics."}</AutoLinkedText>
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
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Evening routines & hyperarousal"}</AutoLinkedText></p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  When the brain won&apos;t wind down at bedtime
                </h2>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"Adolescent insomnia is often maintained by pre-sleep hyperarousal — racing thoughts, device use,\n                  and anxiety about not sleeping. IOP builds practical evening routines and cognitive techniques that\n                  reduce arousal without unrealistic perfectionism."}</AutoLinkedText>
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {eveningRoutineSupports.map((item) => (
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
                  <AmhButton href="/conditions/school-avoidance" variant="darkSecondary" icon="ri-arrow-right-line">
                    School avoidance care
                  </AmhButton>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"Families often notice"}</AutoLinkedText></p>
                <div className="mt-5 space-y-3">
                  {[
                    "Hours in bed awake with racing thoughts or scrolling",
                    "Dreading bedtime and asking to sleep in your room",
                    "Wide mood swings tied directly to how the night went",
                    "Weekend catch-up sleep that resets Monday struggles",
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

      <GoodFitSection
        eyebrow="Is it right for us?"
        title="Signs your teen may need clinical insomnia care"
        description="Sleep hygiene alone rarely fixes chronic adolescent insomnia. If these patterns have been going on for weeks, clinical care is likely the right next step."
        criteria={fitCriteria}
        bg="surface"
        asideNote={{
          label: "Good to know",
          body: "Insomnia treatment is commonly embedded in Virtual IOP when sleep disruption is part of a broader anxiety or depressive picture — treating sleep as part of overall recovery.",
        }}
        showCta={false}
      />

      <SessionStructureSection
        eyebrow="How it works"
        title="From first call to treatment start"
        description="We assess sleep and mental health together, then recommend the most appropriate treatment format — which may include Virtual IOP when co-occurring conditions are present."
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

      <section className="bg-surface px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Why clinical treatment"}</AutoLinkedText></p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              More than sleep hygiene advice
            </h2>
          </div>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-border">
            <ComparisonTable
              baselineLabel="Generic advice"
              highlightedLabel="Clinical treatment"
              rows={comparisonRows.map((row) => ({
                label: row.label,
                baseline: row.generic,
                highlighted: row.treated,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Related conditions</p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Conditions commonly treated alongside insomnia
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Teen insomnia is almost always connected to other mental health concerns. We treat sleep and the\n              underlying drivers together in one integrated plan."}</AutoLinkedText>
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedConditions.map((condition) => (
              <Link
                key={condition.path}
                href={condition.path}
                className="group flex flex-col rounded-2xl border border-border bg-surface-muted/50 p-6 transition hover:border-accent/40 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-ink transition group-hover:text-accent" style={{ fontFamily: "var(--font-heebo)" }}>
                    {condition.label}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-accent/50 ring-1 ring-border transition group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                    <i className="ri-arrow-right-line text-sm" aria-hidden />
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-7 text-body"><AutoLinkedText>{condition.desc}</AutoLinkedText></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TherapyFaqSection title="Questions about teen insomnia treatment" items={faqs} />

      <DarkCtaSection
        title="Help your teen sleep — and feel — better"
        description="Free consultation, no obligation. We will discuss sleep patterns, mental health, and recommend whether clinical insomnia treatment or Virtual IOP is the right fit."
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

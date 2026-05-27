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
import { CONTAINER, DBT_IMGS, SITE } from "@/lib/site";

const IMGS = DBT_IMGS;

const dbtStats = [
  { value: "4", label: "core DBT skill modules", icon: "ri-layout-grid-line" },
  { value: "TIPP", label: "distress tolerance focus in crisis moments", icon: "ri-shield-line" },
  { value: "100%", label: "virtual — skills practiced where stress happens", icon: "ri-video-chat-line" },
  { value: "Family", label: "caregiver skills training track", icon: "ri-parent-line" },
];

const dbtProfiles = [
  {
    icon: "ri-emotion-line",
    title: "Emotional dysregulation",
    body: "Mood swings, rage, or distress that feels impossible to tolerate — reactions that seem out of proportion to the situation.",
  },
  {
    icon: "ri-flashlight-line",
    title: "Impulsive behavior",
    body: "Acting without thinking when stressed — conflict, substance use, reckless choices, or words that damage relationships.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Self-harm & safety",
    body: "Non-suicidal self-injury, suicidal thoughts, or crisis behaviors that require structured safety planning and skills.",
  },
  {
    icon: "ri-group-line",
    title: "Interpersonal conflict",
    body: "Frequent blow-ups with family or friends, fear of abandonment, and difficulty maintaining stable connections.",
  },
];

const emotionDysregulationCycleSteps = [
  { label: "Trigger", detail: "Conflict, rejection, or overwhelm", tone: "text-white/70" },
  { label: "Escalation", detail: "Emotions spike past window of tolerance", tone: "text-accent" },
  { label: "Impulse", detail: "Yelling, self-harm, or risky behavior", tone: "text-white/70" },
  { label: "Relief", detail: "Short-term drop in emotional pain", tone: "text-white/50" },
  { label: "Loop", detail: "Brain learns intensity or escape works", tone: "text-white/90" },
];

const dbtSkillsProgressionSteps = [
  { level: "1", task: "Map emotional patterns and current coping without judgment", progress: 20 },
  { level: "2", task: "Build mindfulness foundation — observe thoughts and urges without reacting", progress: 40 },
  { level: "3", task: "Learn distress tolerance skills (TIPP, grounding, radical acceptance)", progress: 55 },
  { level: "4", task: "Practice emotion regulation and interpersonal skills in real situations", progress: 75 },
  { level: "5", task: "Maintain skills with group practice, family coaching, and IOP support", progress: 100 },
];

const familyValidationShifts = [
  { before: "Dismissing intense emotions as overreacting", after: "Validating feelings while still setting limits and expectations" },
  { before: "Escalating during blow-ups and matching your teen's intensity", after: "Using DBT coaching language in calmer moments — not mid-crisis" },
  { before: "Punishing impulsive behavior without teaching alternatives", after: "Pairing consequences with skills practice and safety planning" },
  { before: "Expecting insight alone to change behavior", after: "Practicing mindfulness and distress tolerance together as a family" },
];

const dbtModules = [
  {
    num: "01",
    icon: "ri-focus-3-line",
    tag: "Mindfulness",
    title: "Stay present without judgment",
    body: "Teens learn to observe thoughts and emotions without being controlled by them — the foundation for every other DBT skill.",
    bullets: ["Wise mind exercises", "Observing without reacting", "Present-moment awareness"],
  },
  {
    num: "02",
    icon: "ri-shield-line",
    tag: "Distress tolerance",
    title: "Survive crisis without making it worse",
    body: "When emotions spike, teens need tools that work in the moment — before impulsive behavior or self-harm escalates the situation.",
    bullets: ["TIPP and grounding skills", "Crisis survival strategies", "Radical acceptance practice"],
  },
  {
    num: "03",
    icon: "ri-emotion-line",
    tag: "Emotion regulation",
    title: "Understand and manage intense feelings",
    body: "DBT helps teens identify emotions early, reduce vulnerability, and build a more stable emotional baseline over time.",
    bullets: ["Emotion naming and tracking", "Opposite action skills", "Building positive experiences"],
  },
  {
    num: "04",
    icon: "ri-team-line",
    tag: "Interpersonal effectiveness",
    title: "Communicate needs and set boundaries",
    body: "Teens learn DEAR MAN and GIVE FAST skills to reduce conflict, ask for what they need, and maintain healthier relationships.",
    bullets: ["Assertive communication", "Boundary setting with peers", "Repairing relationship ruptures"],
  },
];

const fitCriteria = [
  { icon: "ri-emotion-unhappy-line", label: "Rapid or extreme mood shifts", sub: "Emotional reactions that feel out of proportion and disrupt daily life" },
  { icon: "ri-flashlight-line", label: "Impulsive or risky behavior", sub: "Acting without thinking when stressed — conflict, substance use, or reckless choices" },
  { icon: "ri-heart-pulse-line", label: "Self-harm or suicidal thoughts", sub: "Non-suicidal self-injury or recurring thoughts that require structured safety planning" },
  { icon: "ri-group-line", label: "Intense relationship conflict", sub: "Frequent blow-ups with family or friends and difficulty maintaining stable connections" },
  { icon: "ri-cloud-windy-line", label: "Chronic emptiness or reactivity", sub: "Feeling disconnected, irritable, or overwhelmed by ordinary stressors" },
];

const intakeSteps = [
  { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Describe your teen's emotional patterns, safety concerns, and prior treatment — we will recommend the right level of care." },
  { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "A licensed clinician evaluates emotional dysregulation, safety, and whether DBT outpatient or Virtual IOP is the best fit." },
  { num: "03", icon: "ri-calendar-check-line", title: "Personalized DBT plan", body: "We set skill targets across mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness." },
  { num: "04", icon: "ri-video-chat-line", title: "Begin online DBT", body: "Your teen starts individual and group DBT sessions — with family skills training when clinically appropriate." },
];

const comparisonRows = [
  { label: "Approach", generic: "Open-ended talk therapy", dbt: "Structured skills training" },
  { label: "Crisis tools", generic: "Limited between sessions", dbt: "Distress tolerance built in" },
  { label: "Family involvement", generic: "Optional", dbt: "Skills training for caregivers" },
  { label: "Focus", generic: "Insight and processing", dbt: "Behavior change + acceptance" },
  { label: "Evidence base", generic: "Varies by modality", dbt: "Strong for emotional dysregulation" },
];

const conditionsServed = [
  { label: "Self-harm & emotional safety", path: "/conditions/self-harm", desc: "DBT is the gold-standard approach for teens with self-injury and emotional dysregulation." },
  { label: "Depression", path: "/teen-depression-treatment", desc: "Emotion regulation and behavioral activation skills support teens with persistent low mood." },
  { label: "Anxiety & panic", path: "/online-anxiety-treatment", desc: "Distress tolerance and mindfulness reduce panic reactivity and avoidance patterns." },
  { label: "Trauma & PTSD", path: "/ptsd-treatment-online", desc: "Stabilization skills precede deeper trauma work — paced to your teen's safety needs." },
  { label: "Emotional dysregulation & self-harm", path: "/conditions/self-harm", desc: "DBT was developed for intense emotional sensitivity, self-harm, and interpersonal instability in adolescents." },
  { label: "School avoidance", path: "/conditions/school-avoidance", desc: "Distress tolerance and exposure planning support gradual school re-entry." },
];

const faqs = [
  { q: "Is online DBT as effective as in-person?", a: "Research shows virtual DBT can be equally effective when delivered by licensed clinicians using structured DBT protocols. Many teens feel more comfortable practicing skills in their home environment — where stress actually occurs." },
  { q: "Do parents participate in DBT?", a: "Yes. Adolescent DBT often includes family skills training so caregivers learn the same vocabulary and tools their teen is practicing — reducing invalidation and conflict at home." },
  { q: "How is DBT different from CBT?", a: "DBT evolved from CBT but adds acceptance-based skills and a focus on emotional dysregulation. It is especially effective for teens with intense mood swings, impulsivity, and self-harm — not just negative thought patterns." },
  { q: "What are the four DBT modules?", a: "Mindfulness, Distress Tolerance, Emotion Regulation, and Interpersonal Effectiveness. Teens practice skills in individual sessions, group skills training, and between-session homework." },
  { q: "Is DBT only for severe cases?", a: "DBT is often recommended when emotions feel unmanageable or behaviors are escalating — but it is also used preventively in IOP for teens who need more structure than weekly therapy provides." },
  { q: "Is online DBT covered by insurance?", a: "When delivered as part of outpatient therapy or Virtual IOP, DBT sessions are typically covered by most major insurance plans. We verify benefits before enrollment." },
];

const overviewFocusItems = [
  { icon: "ri-contrast-2-line", label: "Acceptance + change" },
  { icon: "ri-group-line", label: "Skills group" },
  { icon: "ri-parent-line", label: "Family track" },
  { icon: "ri-video-chat-line", label: "Virtual IOP option" },
];

export default function OnlineDbtPage() {
  return (
    <MarketingPage currentPath="/online-dialectical-behavioral-therapy">
      <ProgramHeroSection
        eyebrow={`Online DBT · Ages ${SITE.ages}`}
        headline={
          <>
            Online DBT <span className="text-accent">for teens who feel emotions intensely</span>
          </>
        }
        body="Dialectical Behavior Therapy teaches adolescents mindfulness, distress tolerance, emotion regulation, and interpersonal skills — delivered online by licensed clinicians."
        imageSrc={IMGS.hero}
        imageAlt="Teen practicing mindfulness during a virtual DBT skills session at home"
        imageClassName="object-cover object-center"
        stats={[
          { icon: "ri-contrast-2-line", label: "Modality", value: "DBT", unit: "skills" },
          { icon: "ri-award-line", label: "Focus", value: "4", unit: "modules" },
          { icon: "ri-video-chat-line", label: "Format", value: "100%", unit: "virtual" },
        ]}
        trustItems={[
          { icon: "ri-shield-check-line", label: "Licensed clinicians" },
          { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
          { icon: "ri-lock-line", label: "HIPAA compliant" },
          { icon: "ri-team-line", label: "Family skills training" },
        ]}
      />

      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {dbtStats.map((stat) => (
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">DBT in adolescence</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              When emotions feel bigger than your teen can manage
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Teen DBT is more than talk therapy — it teaches practical skills for mindfulness, crisis survival, emotion\n              regulation, and relationships. Virtual IOP adds enough session frequency to practice those skills where they\n              matter: at home, online, and in the moments that trigger dysregulation."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dbtProfiles.map((item) => (
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
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">What Is Online DBT?</p>
              <h3
                className="mt-4 text-3xl font-bold leading-[1.1] text-ink md:text-4xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                Skills for emotional storms — practiced where life actually happens
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-8 text-body">
                <AutoLinkedText>{"Dialectical Behavior Therapy balances acceptance and change. Teens learn that their feelings make sense — and\n                that they can still choose different behaviors. DBT is the gold standard for adolescents with intense emotional\n                reactivity, impulsivity, and self-harm."}</AutoLinkedText>
              </p>
              <p className="mt-4 max-w-xl text-sm leading-8 text-body">
                <AutoLinkedText>{"Online DBT delivers the same structured skills training as in-person care: individual sessions, group skills\n                groups, between-session practice, and caregiver coaching — all within our Virtual IOP when teens need more\n                than weekly support."}</AutoLinkedText>
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {overviewFocusItems.map((item) => (
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
                alt="Teen and parent practicing DBT emotion regulation skills together at home"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-6">
                <p className="text-sm font-bold text-white"><AutoLinkedText>{"Skills practiced in real environments"}</AutoLinkedText></p>
                <p className="mt-1 text-xs leading-5 text-white/65">
                  <AutoLinkedText>{"Learning distress tolerance at home means teens can apply TIPP and grounding where sibling conflict or\n                  school stress actually occurs."}</AutoLinkedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Why DBT patterns persist"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              The emotion dysregulation cycle — and where DBT skills break it
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"When emotions spike past what a teen can tolerate, impulsive behavior or self-harm may bring short-term relief\n              — which reinforces the cycle. Weekly therapy may not provide enough repetition to build new responses. Virtual\n              IOP adds frequent skills coaching between home and school stressors."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="flex divide-x divide-white/10 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {emotionDysregulationCycleSteps.map((step, i) => (
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
                    {i < emotionDysregulationCycleSteps.length - 1 ? (
                      <i className="ri-arrow-right-line hidden text-xs text-white/20 lg:inline" aria-hidden />
                    ) : null}
                  </div>
                  <p
                    className={`mt-3 text-sm font-bold leading-snug ${step.tone}`}
                    style={{ fontFamily: "var(--font-heebo)" }}
                  ><AutoLinkedText>{step.label}</AutoLinkedText></p>
                  <p className="mt-1.5 text-[11px] leading-4 text-white/45"><AutoLinkedText>{step.detail}</AutoLinkedText></p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 bg-accent/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:px-8">
              <div className="flex items-start gap-3 sm:min-w-0 sm:flex-1">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <i className="ri-heart-pulse-line text-lg" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Where IOP helps</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    <AutoLinkedText>{"Mindfulness, distress tolerance, emotion regulation, and interpersonal skills — practiced multiple times\n                    per week so teens can respond differently when triggers hit at home or school."}</AutoLinkedText>
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"DBT skills progression"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              A graded skills plan — acceptance and change, step by step
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/50">
              <AutoLinkedText>{"Teens do not master all four DBT modules at once. Clinicians build a paced plan with homework between IOP\n              sessions — adapted to safety needs, family dynamics, and your teen&apos;s current window of tolerance."}</AutoLinkedText>
            </p>
          </div>

          <div className="space-y-2">
            {dbtSkillsProgressionSteps.map((step) => (
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
            <AutoLinkedText>{"Example DBT progression — every teen&apos;s plan is individualized during assessment."}</AutoLinkedText>
          </p>
        </div>
      </section>

      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Family validation</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Reducing invalidation without lowering expectations
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"DBT family sessions teach caregivers the same skills vocabulary their teen is learning — so home responses\n              support change instead of escalating shame or conflict."}</AutoLinkedText>
            </p>
          </div>
          <div className="space-y-3">
            {familyValidationShifts.map((row) => (
              <div
                key={row.before}
                className="grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-border sm:grid-cols-2 sm:gap-6 sm:p-6"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-body/50">Common pattern</p>
                  <p className="mt-2 text-sm leading-6 text-body"><AutoLinkedText>{row.before}</AutoLinkedText></p>
                </div>
                <div className="border-t border-border pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent">DBT coaching shift</p>
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Core DBT modules</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              The four pillars of adolescent DBT
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Each module builds practical tools teens use independently — reducing crisis frequency and improving\n              relationships over time."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {dbtModules.map((module) => (
              <div key={module.title} className="rounded-3xl bg-surface p-8 ring-1 ring-border">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent-dark">
                    {module.tag}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-accent">
                    <i className={`${module.icon} text-base`} aria-hidden />
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-body"><AutoLinkedText>{module.body}</AutoLinkedText></p>
                <ul className="mt-5 space-y-2">
                  {module.bullets.map((bullet) => (
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
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Crisis moments</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  Crisis moments & distress tolerance
                </h2>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"When emotions spike, teens need skills that work in the moment — before impulsive behavior, self-harm, or\n                  conflict makes the situation worse. Virtual IOP builds distress tolerance through repeated practice, not\n                  just discussion."}</AutoLinkedText>
                </p>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"Clinicians assess safety at intake and refer to higher levels of care when 24/7 monitoring is required.\n                  DBT in IOP supports stable teens who need structured skills support between crises."}</AutoLinkedText>
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Collaborative safety plans shared with caregivers when appropriate",
                    "Clear escalation protocols if symptoms worsen during IOP",
                    "Skills for urges and crisis moments — not punishment-based approaches",
                    "Coordination with ER, inpatient, or outside providers after acute events",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AmhButton href="/conditions/self-harm" variant="darkSecondary" icon="ri-arrow-right-line">
                    Self-harm treatment
                  </AmhButton>
                  <AmhButton href="/virtual-iop-for-teens" variant="darkSecondary" icon="ri-arrow-right-line">
                    About Virtual IOP
                  </AmhButton>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"TIPP & crisis skills"}</AutoLinkedText></p>
                <div className="mt-5 space-y-3">
                  {[
                    { skill: "Temperature", detail: "Cold water or ice to quickly shift body arousal" },
                    { skill: "Intense exercise", detail: "Brief movement to burn off adrenaline safely" },
                    { skill: "Paced breathing", detail: "Slow exhale to activate the calming response" },
                    { skill: "Progressive relaxation", detail: "Tensing and releasing muscle groups to reduce tension" },
                  ].map((item) => (
                    <div
                      key={item.skill}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <i className="ri-shield-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      <div>
                        <span className="text-sm font-semibold text-white/80">{item.skill}</span>
                        <p className="mt-0.5 text-xs leading-5 text-white/50"><AutoLinkedText>{item.detail}</AutoLinkedText></p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-5 text-white/40">
                  <AutoLinkedText>{"Plus grounding, distraction, self-soothe, and radical acceptance — practiced in session and at home."}</AutoLinkedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoodFitSection
        eyebrow="Is It Right for Us?"
        title="Signs DBT may be the right fit"
        description="DBT is designed for teens who experience emotions more intensely than peers — our team confirms clinical fit during a free consultation."
        criteria={fitCriteria}
        bg="white"
        asideNote={{
          label: "Good to know",
          body: "If your teen is in acute crisis or requires 24/7 monitoring, we will recommend a higher level of care first. DBT in IOP is appropriate for stable teens who need structured skills support.",
        }}
        showCta={false}
      />

      <SessionStructureSection
        eyebrow="How It Works"
        title="From first call to DBT skills practice"
        description="Most families complete intake within a few days. We handle insurance verification and recommend the right DBT format for your teen."
        phases={intakeSteps.map((step) => ({
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

      <section className="bg-surface px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Why DBT</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Structured skills for emotional dysregulation
            </h2>
          </div>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <ComparisonTable
              baselineLabel="Generic therapy"
              highlightedLabel="Online DBT"
              rows={comparisonRows.map((row) => ({
                label: row.label,
                baseline: row.generic,
                highlighted: row.dbt,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Presentations We Treat"}</AutoLinkedText></p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              When DBT is clinically indicated
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"DBT is especially effective when emotions feel unmanageable and behaviors are escalating — often alongside\n              anxiety, depression, or trauma."}</AutoLinkedText>
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conditionsServed.map((condition) => (
              <Link
                key={condition.label}
                href={condition.path}
                className="group flex flex-col rounded-2xl border border-border bg-surface-muted/50 p-6 transition hover:border-accent/40 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className="text-base font-bold text-ink transition group-hover:text-accent"
                    style={{ fontFamily: "var(--font-heebo)" }}
                  >
                    {condition.label}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-accent/50 ring-1 ring-border transition group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                    <i className="ri-arrow-right-line text-sm" aria-hidden />
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-7 text-body">{condition.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TherapyFaqSection title="Questions about Online DBT" items={faqs} />

      <DarkCtaSection
        title="Help your teen build a life worth living"
        description="Free consultation, no obligation. We will recommend the right level of DBT care — individual outpatient or within our Virtual IOP — and verify insurance before enrollment."
        actions={
          <>
            <AmhButton href={SITE.phone.href} variant="darkPrimary" icon="ri-phone-fill" iconPosition="left">
              Call {SITE.phone.display}
            </AmhButton>
            <AmhButton href="/virtual-iop-for-teens" variant="darkSecondary" icon="ri-arrow-right-line">
              See our Virtual IOP
            </AmhButton>
          </>
        }
      />
    </MarketingPage>
  );
}

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
import { ADOLESCENT_IOP_IMGS, CONTAINER, SITE } from "@/lib/site";

const IMGS = ADOLESCENT_IOP_IMGS;

const programStats = [
  { value: "9–20h", label: "clinical hours per week", icon: "ri-time-line" },
  { value: "12–17", label: "ages served in adolescent IOP", icon: "ri-user-heart-line" },
  { value: "24–48h", label: "typical intake timeline", icon: "ri-calendar-check-line" },
  { value: "100%", label: "virtual — HIPAA-compliant video", icon: "ri-video-chat-line" },
];

const programModalities = [
  {
    num: "01",
    cadence: "2–3 sessions per week",
    title: "Individual Therapy",
    body: "One-on-one sessions with a licensed clinician matched to your teen — building skills, tracking progress, and adjusting the plan as symptoms change.",
    bullets: ["Goal-focused and safety-monitored", "CBT & DBT-informed techniques", "Progress tracked weekly"],
    href: "/therapy/individual-therapy-for-teens",
    image: IMGS.individual,
    alt: "Teen in a one-on-one virtual therapy session at home",
    imageClass: "object-cover object-[center_40%]",
  },
  {
    num: "02",
    cadence: "3–4 sessions per week",
    title: "Group Therapy",
    body: "Small peer groups with teens navigating similar challenges — real skills practice, therapist facilitation, and the connection that comes from being understood.",
    bullets: ["DBT skills & emotion regulation", "Peer support with structure", "Adolescent-specific group topics"],
    href: "/therapy/group-therapy-with-adolescents",
    image: IMGS.group,
    alt: "Teen joining peers in a virtual group therapy session on a laptop",
    imageClass: "object-cover object-center",
  },
  {
    num: "03",
    cadence: "1–2 sessions per week",
    title: "Family Therapy",
    body: "Structured sessions for the whole family system — teaching caregivers how to respond, communicate, and maintain a home environment that supports recovery.",
    bullets: ["Parent coaching & education", "Conflict de-escalation skills", "Discharge planning with family input"],
    href: "/therapy/adolescent-family-therapy",
    image: IMGS.family,
    alt: "Parent and teen together on a virtual family therapy session",
    imageClass: "object-cover object-[center_30%]",
  },
];

const escalationSteps = [
  { label: "Stalled progress", detail: "Symptoms plateau or worsen between weekly sessions", tone: "text-white/70" },
  { label: "Between-session gaps", detail: "Crises or setbacks with days until the next appointment", tone: "text-accent" },
  { label: "Daily disruption", detail: "School, sleep, or home routines breaking down", tone: "text-white/70" },
  { label: "Caregiver strain", detail: "Parents managing alone without clinical backup", tone: "text-white/50" },
  { label: "IOP indicated", detail: "9–20 structured hours with family track", tone: "text-white/90" },
];

const onboardingSteps = [
  { level: "1", task: "Clinical assessment — evaluate symptoms, safety, and the right level of care", progress: 20 },
  { level: "2", task: "Build the schedule — weekly plan around school, activities, and clinical needs", progress: 40 },
  { level: "3", task: "Begin skills work — individual and group sessions with CBT and DBT-informed care", progress: 60 },
  { level: "4", task: "Integrate family — parent coaching and family therapy aligned to home patterns", progress: 80 },
  { level: "5", task: "Step-down planning — transition to weekly outpatient with a structured discharge plan", progress: 100 },
];

const familyPatternShifts = [
  { before: "Waiting until the next weekly session when things spiral at home", after: "Clinician contact and skills practice spread across the week" },
  { before: "Walking on eggshells or escalating conflict when symptoms flare", after: "Structured family responses coached in dedicated sessions" },
  { before: "Missing school or activities without a coordinated plan", after: "Schedule built around attendance with gradual re-engagement when needed" },
  { before: "Hoping one hour per week will be enough for moderate-to-severe symptoms", after: "9–20 hours of individual, group, and family care from home" },
];

const fitCriteria = [
  { icon: "ri-add-line", label: "Needs more than weekly therapy", sub: "Symptoms are escalating or stalled between sessions" },
  { icon: "ri-arrow-down-line", label: "Stepping down from PHP or residential", sub: "Structured support to maintain progress at home" },
  { icon: "ri-computer-line", label: "Intensive care without missing school", sub: "Sessions are scheduled around classes and activities" },
  { icon: "ri-home-2-line", label: "Struggling at home and school", sub: "Daily functioning is affected by emotional or behavioral symptoms" },
  { icon: "ri-links-line", label: "Multiple co-occurring concerns", sub: "Anxiety, trauma, mood disorders, or self-harm alongside a primary diagnosis" },
];

const intakeSteps = [
  { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Talk with our admissions team about your teen's symptoms, history, and schedule — no pressure." },
  { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "A licensed clinician evaluates fit and recommends the appropriate level of care." },
  { num: "03", icon: "ri-calendar-check-line", title: "Build the schedule", body: "We design a weekly plan around school, extracurriculars, and clinical needs." },
  { num: "04", icon: "ri-video-chat-line", title: "Begin Adolescent IOP", body: "Your teen starts individual, group, and family sessions — typically within days." },
];

const comparisonRows = [
  { label: "Weekly hours", outpatient: "~1 hour", iop: "9–20 hours" },
  { label: "Frequency", outpatient: "Once weekly", iop: "Multiple days per week" },
  { label: "Parent involvement", outpatient: "Optional & limited", iop: "Structured family track" },
  { label: "Safety monitoring", outpatient: "Between-session gaps", iop: "Frequent clinician contact" },
  { label: "School disruption", outpatient: "Some missed time", iop: "Scheduled around school" },
];

const conditionsServed = [
  { label: "Anxiety & panic", path: "/online-anxiety-treatment", desc: "Generalized anxiety, social anxiety, and panic attacks interfering with daily functioning." },
  { label: "Depression", path: "/teen-depression-treatment", desc: "Persistent low mood, withdrawal, and loss of motivation requiring more than weekly support." },
  { label: "Trauma & PTSD", path: "/ptsd-treatment-online", desc: "Trauma-informed IOP care for teens processing acute or complex trauma histories." },
  { label: "ADHD", path: "/adhd-treatment-for-teens", desc: "Executive function support, emotional regulation, and co-occurring mood or anxiety concerns." },
  { label: "Self-harm", path: "/conditions/self-harm", desc: "DBT-based IOP with structured safety planning and skills for reducing harmful behaviors." },
  { label: "School avoidance", path: "/conditions/school-avoidance", desc: "Gradual re-engagement approaches paired with IOP-level anxiety treatment." },
];

const clinicalApproaches = [
  { icon: "ri-brain-line", tag: "Core modality", title: "Cognitive Behavioral Therapy (CBT)", body: "Teens learn to identify unhelpful thought patterns, challenge distorted beliefs, and practice healthier coping responses across individual and group sessions." },
  { icon: "ri-heart-pulse-line", tag: "Core modality", title: "Dialectical Behavior Therapy (DBT)", body: "Skills for emotion regulation, distress tolerance, mindfulness, and interpersonal effectiveness — especially effective in IOP group formats." },
  { icon: "ri-group-line", tag: "Peer integration", title: "Group therapy with adolescents", body: "Therapist-led peer groups reduce isolation and build skills in a real social context — reinforcing what is practiced in individual sessions." },
  { icon: "ri-home-heart-line", tag: "Family integration", title: "Family therapy & parent coaching", body: "Parents are active participants in IOP — learning how to communicate, set limits, and support recovery between sessions." },
];

const faqs = [
  { q: "What is Adolescent IOP?", a: "Adolescent IOP (Intensive Outpatient Program) is a structured mental health treatment model providing 9–20 hours of therapy per week — combining individual, group, and family sessions — for teens who need more support than standard weekly therapy." },
  { q: "How is this different from Virtual IOP?", a: "Virtual IOP is how we deliver Adolescent IOP — through HIPAA-compliant video from home. The clinical structure, modalities, and hours are the same. Most families choose the virtual format because it eliminates commute and fits around school." },
  { q: "Can my teen stay in school during IOP?", a: "Yes. Schedules are built specifically around your teen's school and activity commitments. Many families use afternoon or early-evening tracks." },
  { q: "Is IOP covered by insurance?", a: "Most major insurance plans cover adolescent IOP, including telehealth IOP. We verify benefits at no cost before enrollment and walk through any out-of-pocket costs." },
  { q: "How quickly can we start?", a: "Many families complete intake within 24–48 hours of the initial consultation. We handle insurance verification and scheduling so you can focus on your teen." },
  { q: "What if my teen needs more than IOP?", a: "If assessment indicates a higher level of care is needed, we will explain the options and help connect you with the right program. We will not enroll a teen in IOP if a higher level of care is clinically indicated." },
];

export default function AdolescentIopPage() {
  return (
    <MarketingPage currentPath="/adolescent-iop-for-teens">
      <ProgramHeroSection
        eyebrow={`Adolescent IOP · Ages ${SITE.ages}`}
        headline={
          <>
            Adolescent IOP <span className="text-accent">built around your teen&apos;s life</span>
          </>
        }
        body="Structured individual, group, and family therapy for teens who need more than a single weekly session — without a residential stay."
        imageSrc={IMGS.hero}
        imageAlt="Teen participating in adolescent IOP group therapy session from home on laptop"
        imageClassName="object-cover object-center"
        stats={[
          { icon: "ri-time-line", label: "Clinical hours", value: "9–20", unit: "/wk" },
          { icon: "ri-video-chat-line", label: "Format", value: "100%", unit: "virtual" },
          { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
        ]}
        trustItems={[
          { icon: "ri-shield-check-line", label: "Licensed clinicians" },
          { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
          { icon: "ri-lock-line", label: "HIPAA compliant" },
          { icon: "ri-user-heart-line", label: `Ages ${SITE.ages}` },
        ]}
      />

      {/* Stats band */}
      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {programStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3 px-6 py-8 sm:px-8">
                <i className={`${stat.icon} text-xl text-accent`} aria-hidden />
                <p className="text-2xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{stat.value}</AutoLinkedText></p>
                <p className="text-xs leading-5 text-body"><AutoLinkedText>{stat.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Adolescent IOP — bento + levels of care */}
      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="grid gap-3 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border lg:p-12">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"What Is Adolescent IOP?"}</AutoLinkedText></p>
                <h2
                  className="text-3xl font-bold leading-[1.1] text-ink md:text-4xl lg:text-[2.75rem]"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  More support than weekly therapy — without residential placement
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-8 text-body">
                  <AutoLinkedText>{"An Intensive Outpatient Program is a structured mental health treatment model designed for adolescents\n                  who need frequent clinical contact but are stable enough to live at home. It sits directly between\n                  once-a-week outpatient therapy and 24/7 residential care."}</AutoLinkedText>
                </p>
                <p className="mt-4 max-w-xl text-sm leading-8 text-body">
                  <AutoLinkedText>{"Our program delivers IOP virtually — through HIPAA-compliant video — so teens receive the same\n                  clinical intensity from home, around school and family life."}</AutoLinkedText>
                </p>
              </div>

              <div className="mt-10 rounded-2xl border border-border bg-surface-muted p-6 lg:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent"><AutoLinkedText>{"Where Adolescent IOP sits"}</AutoLinkedText></p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Weekly therapy", hours: "~1 hr / week", note: "Mild to moderate symptoms", active: false },
                    { label: "Adolescent IOP", hours: "9–20 hrs / week", note: "Moderate to severe — home-based", active: true },
                    { label: "Residential", hours: "24 / 7", note: "Highest acuity & monitoring", active: false },
                  ].map((level) => (
                    <div
                      key={level.label}
                      className={`rounded-xl px-4 py-4 transition ${
                        level.active
                          ? "border-2 border-accent bg-white shadow-md shadow-accent/10"
                          : "border border-border bg-white/60"
                      }`}
                    >
                      <p className={`text-xs font-bold uppercase tracking-wider ${level.active ? "text-accent" : "text-body"}`}><AutoLinkedText>{level.label}</AutoLinkedText></p>
                      <p className="mt-2 text-lg font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{level.hours}</AutoLinkedText></p>
                      <p className="mt-1 text-[11px] leading-5 text-body"><AutoLinkedText>{level.note}</AutoLinkedText></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:h-full">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-3xl ring-1 ring-border">
                <Image
                  src={IMGS.bento}
                  alt="Teen at structured home setup attending adolescent IOP sessions online"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-border">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <i className="ri-calendar-check-line text-lg" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink"><AutoLinkedText>{"Scheduled around your teen&apos;s life"}</AutoLinkedText></p>
                    <p className="mt-0.5 text-xs leading-5 text-body">
                      <AutoLinkedText>{"Afternoon and evening tracks available — school and activities stay intact."}</AutoLinkedText>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Escalation cycle — when weekly therapy isn't enough */}
      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"When weekly therapy isn&apos;t enough"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              How symptoms outpace a once-a-week cadence
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Many teens arrive at IOP after weekly therapy helped — but could not keep up with how quickly symptoms\n              changed at home and school. Adolescent IOP adds structured contact across the week so progress is not\n              lost between appointments."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="flex divide-x divide-white/10 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {escalationSteps.map((step, i) => (
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
                    {i < escalationSteps.length - 1 ? (
                      <i className="ri-arrow-right-line hidden text-xs text-white/20 lg:inline" aria-hidden />
                    ) : null}
                  </div>
                  <p className={`mt-3 text-sm font-bold leading-snug ${step.tone}`} style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{step.label}</AutoLinkedText></p>
                  <p className="mt-1.5 text-[11px] leading-4 text-white/45"><AutoLinkedText>{step.detail}</AutoLinkedText></p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 bg-accent/[0.08] px-5 py-5 lg:px-8">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <i className="ri-heart-pulse-line text-lg" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent"><AutoLinkedText>{"Where Adolescent IOP fits"}</AutoLinkedText></p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    <AutoLinkedText>{"Structured individual, group, and family therapy — 9–20 hours per week from home — with frequent\n                    clinician contact, safety monitoring, and a dedicated family track."}</AutoLinkedText>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IOP onboarding ladder */}
      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Your teen&apos;s progression"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              From assessment to step-down — what the arc looks like
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Every plan is individualized, but most families move through a consistent onboarding arc — building\n              clinical intensity, family alignment, and a sustainable path back to weekly care."}</AutoLinkedText>
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="space-y-2 p-4 sm:p-5">
              {onboardingSteps.map((step) => (
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Phase</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="border-t border-white/10 px-5 py-4 text-xs leading-5 text-white/35 sm:px-6">
              <AutoLinkedText>{"Typical onboarding arc — pacing and session mix are adjusted throughout treatment based on clinical progress."}</AutoLinkedText>
            </p>
          </div>
        </div>
      </section>

      {/* Family pattern shifts — before / after */}
      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Family patterns</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              When your teen needs more support than weekly therapy provides
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Families often arrive exhausted — managing crises between sessions without a clear plan. IOP family therapy\n              and parent coaching address the patterns that keep everyone stuck until the next appointment."}</AutoLinkedText>
            </p>
          </div>
          <div className="space-y-3">
            {familyPatternShifts.map((row) => (
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

      {/* Program structure — the one full dark band */}
      <section className="relative overflow-hidden bg-dark px-6 py-section lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/5 blur-[80px]" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Program Structure</p>
              <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
                A typical week in Adolescent IOP
              </h2>
              <p className="mt-4 text-sm leading-8 text-white/50">
                <AutoLinkedText>{"Each plan is individualized — this is the framework most teens move through, combining individual,\n                group, and family therapy."}</AutoLinkedText>
              </p>
            </div>
            <div
              className="shrink-0 rounded-2xl px-6 py-5 lg:max-w-sm"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Weekly snapshot</p>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Individual", hours: "3–6 hrs" },
                  { label: "Group", hours: "4–9 hrs" },
                  { label: "Family", hours: "2–4 hrs" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-white/70">{row.label}</span>
                    <div className="flex flex-1 items-center gap-3">
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="text-xs font-bold tabular-nums text-accent">{row.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-5 text-white/35">
                <AutoLinkedText>{"Plus skills modules, check-ins, and crisis support between sessions."}</AutoLinkedText>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {programModalities.map((mod, i) => {
              const imageFirst = i % 2 === 0;
              return (
                <article
                  key={mod.title}
                  className="group grid overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] lg:grid-cols-2"
                >
                  <div
                    className={`relative min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[400px] ${
                      imageFirst ? "" : "lg:order-2"
                    }`}
                  >
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <Image
                        src={mod.image}
                        alt={mod.alt}
                        fill
                        className={mod.imageClass}
                        sizes="(max-width: 1024px) 100vw, 675px"
                      />
                      <div
                        className={`absolute inset-0 ${
                          imageFirst
                            ? "bg-gradient-to-t from-dark/95 via-dark/50 to-dark/10 lg:bg-gradient-to-r lg:from-dark/15 lg:via-dark/45 lg:to-dark/95"
                            : "bg-gradient-to-t from-dark/95 via-dark/50 to-dark/10 lg:bg-gradient-to-l lg:from-dark/15 lg:via-dark/45 lg:to-dark/95"
                        }`}
                      />
                    </div>
                    <span
                      className="pointer-events-none absolute bottom-4 right-6 z-10 select-none text-7xl font-bold leading-none text-white/[0.06] lg:bottom-6 lg:right-8 lg:text-8xl"
                      style={{ fontFamily: "var(--font-heebo)" }}
                      aria-hidden
                    >
                      {mod.num}
                    </span>
                  </div>
                  <div className={`flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14 ${imageFirst ? "" : "lg:order-1"}`}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent"><AutoLinkedText>{mod.cadence}</AutoLinkedText></p>
                    <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "var(--font-heebo)" }}>
                      {mod.title}
                    </h3>
                    <p className="mt-4 text-sm leading-8 text-white/55"><AutoLinkedText>{mod.body}</AutoLinkedText></p>
                    <ul className="mt-6 space-y-2.5">
                      {mod.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-white/45">
                          <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={mod.href}
                      className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent transition hover:text-white"
                    >
                      About {mod.title.toLowerCase()}
                      <i className="ri-arrow-right-line" aria-hidden />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p className="text-sm text-white/45">
              <span className="font-semibold text-white/70">Also included:</span> psychoeducation, between-session skills
              support, and discharge planning.
            </p>
            <div className="flex flex-wrap gap-2">
              {["DBT skills", "CBT tools", "Crisis planning", "Parent coaching"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GoodFitSection
        eyebrow="Is It Right for Us?"
        title="Signs Adolescent IOP may fit your teen"
        description="You don't need a clear diagnosis to call. If any of these patterns sound familiar, our admissions team can help you figure out the right level of care."
        criteria={fitCriteria}
        bg="white"
        showCta={false}
        asideNote={{
          label: "Good to know",
          body: "IOP is often the right step when weekly therapy isn't working — or when stepping down from a higher level of care after inpatient or residential treatment.",
        }}
      />

      <SessionStructureSection
        phases={intakeSteps}
        eyebrow="How It Works"
        title="From first call to first session"
        description="Most families complete intake within a few days. We handle insurance verification and scheduling so you can focus on your teen."
        bg="surface"
        footer={
          <p className="text-center text-sm text-body">
            <i className="ri-time-line mr-1.5 align-middle text-accent" aria-hidden />
            Typical time from first call to first session:{" "}
            <span className="font-bold text-ink">24–48 hours</span>
          </p>
        }
      />

      {/* Comparison — surface section, dark inset table */}
      <section className="bg-surface px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden />
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Why Adolescent IOP</p>
            </div>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              More support than standard outpatient
            </h2>
          </div>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-border">
            <ComparisonTable
              baselineLabel="Weekly therapy"
              highlightedLabel="Adolescent IOP"
              rows={comparisonRows.map((row) => ({
                label: row.label,
                baseline: row.outpatient,
                highlighted: row.iop,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Conditions treated */}
      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Conditions Treated</p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              What we treat in Adolescent IOP
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Our Adolescent IOP is designed for teens ages 12–17 navigating a wide range of emotional and behavioral\n              challenges. Every teen receives an individualized treatment plan."}</AutoLinkedText>
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conditionsServed.map((condition) => (
              <Link
                key={condition.path}
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
          <p className="mt-8 text-sm leading-7 text-body">
            Not sure if your teen&apos;s diagnosis fits?{" "}
            <a href={SITE.phone.href} className="font-semibold text-accent hover:underline">
              Call admissions
            </a>{" "}
            for a free consultation.
          </p>
        </div>
      </section>

      {/* Clinical approach — 2×2 grid */}
      <section className="bg-surface px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Clinical Approach</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Evidence-based care for adolescent mental health
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Licensed clinicians. The same evidence base as in-person IOP — adapted for teens and delivered virtually."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {clinicalApproaches.map((approach) => (
              <div key={approach.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent-dark">
                    {approach.tag}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-accent">
                    <i className={`${approach.icon} text-base`} aria-hidden />
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {approach.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-body"><AutoLinkedText>{approach.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TherapyFaqSection
        title="Questions about Adolescent IOP"
        description="Answers about what IOP is, how it differs from Virtual IOP, and how to get started."
        items={faqs}
      />

      <DarkCtaSection
        title="Give your teen the structure they need"
        description="Free consultations are confidential. We will verify insurance and help determine whether Adolescent IOP is the right next step for your teen."
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

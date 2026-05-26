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
import { CBT_IMGS, CONTAINER, SITE } from "@/lib/site";

const IMGS = CBT_IMGS;

const cbtStats = [
  { value: "Gold-standard", label: "Evidence for anxiety, depression & OCD", icon: "ri-award-line" },
  { value: "Goal-based", label: "Measurable thought & behavior targets", icon: "ri-focus-2-line" },
  { value: "12–20", label: "Typical course in outpatient CBT", icon: "ri-calendar-check-line" },
  { value: "100%", label: "Virtual sessions & homework practice", icon: "ri-video-chat-line" },
];

const cbtProfiles = [
  {
    icon: "ri-cloud-windy-line",
    title: "Persistent worry",
    body: "Generalized anxiety, social anxiety, or panic that disrupts school, friendships, and daily routines.",
  },
  {
    icon: "ri-emotion-sad-line",
    title: "Low mood & withdrawal",
    body: "Depression, anhedonia, or hopelessness — especially when talk therapy alone has not shifted patterns.",
  },
  {
    icon: "ri-repeat-line",
    title: "Avoidance & OCD patterns",
    body: "Intrusive thoughts, compulsions, rumination, or escape behaviors that shrink your teen's world.",
  },
  {
    icon: "ri-parent-line",
    title: "Family accommodation",
    body: "Reassurance, rescuing, or flexibility that unintentionally keeps anxiety or depression going.",
  },
];

const cbtCycleSteps = [
  { label: "Situation", detail: "Trigger at school, home, or online", tone: "text-white/70" },
  { label: "Automatic thought", detail: "\"I'll fail\" or \"Something bad will happen\"", tone: "text-accent" },
  { label: "Emotion", detail: "Anxiety, sadness, shame, or irritability", tone: "text-white/70" },
  { label: "Behavior", detail: "Avoidance, reassurance, or withdrawal", tone: "text-white/70" },
  { label: "Loop", detail: "Short-term relief reinforces the pattern", tone: "text-white/90" },
];

const cbtSkillPlanSteps = [
  { level: "1", task: "Map triggers, thoughts, and avoidance patterns during assessment", progress: 20 },
  { level: "2", task: "Build thought records and balanced-thinking skills in session", progress: 40 },
  { level: "3", task: "Introduce behavioral activation or graduated exposure targets", progress: 55 },
  { level: "4", task: "Practice homework between sessions — school, social, and home contexts", progress: 75 },
  { level: "5", task: "Maintain skills with relapse-prevention and family coaching", progress: 100 },
];

const accommodationShifts = [
  { before: "Answering reassurance questions repeatedly", after: "Coaching teens to tolerate uncertainty with planned responses" },
  { before: "Completing avoided tasks for them when anxiety spikes", after: "Supporting step-by-step exposure — not doing the feared task" },
  { before: "Letting school avoidance continue without a graded plan", after: "Structured re-entry aligned with clinician-led exposure goals" },
  { before: "Framing therapy as \"fixing feelings\" without practice", after: "Reinforcing homework, experiments, and skill use between sessions" },
];

const cbtSkills = [
  {
    icon: "ri-edit-line",
    tag: "Core skill",
    title: "Thought challenging",
    body: "Teens learn to identify automatic negative thoughts, examine the evidence behind them, and build more balanced beliefs — a foundation for reducing anxiety, depression, and rumination.",
    bullets: ["Thought records and journaling", "Identifying cognitive distortions", "Building realistic alternative thoughts"],
  },
  {
    icon: "ri-walk-line",
    tag: "Core skill",
    title: "Behavioral activation",
    body: "When depression drains motivation, behavioral activation helps teens re-engage with activities, routines, and relationships — gradually rebuilding momentum and positive mood.",
    bullets: ["Activity scheduling and mood tracking", "Identifying avoided situations", "Values-based activity planning"],
  },
  {
    icon: "ri-route-line",
    tag: "Core skill",
    title: "Exposure and response prevention",
    body: "For anxiety, OCD, and avoidance, graduated exposure allows teens to face feared situations with therapist support — reducing the anxiety response over time.",
    bullets: ["Personalized fear hierarchies", "Step-by-step exposure practice", "School and social re-entry plans"],
  },
  {
    icon: "ri-parent-line",
    tag: "Family integration",
    title: "Parent training and coaching",
    body: "Caregivers learn how to respond to avoidance, reinforce skill use at home, and avoid accommodation behaviors that maintain anxiety or depression.",
    bullets: ["Understanding CBT concepts as a parent", "Responding to avoidance effectively", "Communication and limit-setting skills"],
  },
];

const exposureHomeworkSupports = [
  "Between-session thought records and behavioral experiments",
  "Graduated exposure for school, social, and health-related fears",
  "ERP-style practice for OCD when clinically indicated",
  "Family coaching so homework is reinforced — not rescued",
];

const exposureContextSigns = [
  "Homework battles driven by perfectionism or fear of failure",
  "Social situations avoided after a panic or embarrassment",
  "Rituals or checking that delay leaving for school",
  "Screens or escape used to shut down difficult emotions",
];

const fitCriteria = [
  { icon: "ri-cloud-windy-line", label: "Persistent anxiety or worry", sub: "Generalized anxiety, social anxiety, or panic affecting school and daily life" },
  { icon: "ri-emotion-sad-line", label: "Low mood and withdrawal", sub: "Depression, anhedonia, or hopelessness that hasn't responded to lower levels of care" },
  { icon: "ri-repeat-line", label: "Repetitive or intrusive thoughts", sub: "OCD patterns, rumination, or compulsive behaviors" },
  { icon: "ri-run-line", label: "Significant avoidance", sub: "School refusal, social withdrawal, or avoidance of feared situations" },
  { icon: "ri-lightbulb-line", label: "Ready to actively practice skills", sub: "CBT works best when teens engage with between-session exercises and homework" },
];

const intakeSteps = [
  { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Tell us about your teen's patterns — anxiety, avoidance, mood — and we will recommend the right level of care." },
  { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "A licensed clinician determines whether focused CBT, CBT within Virtual IOP, or a different approach fits best." },
  { num: "03", icon: "ri-calendar-check-line", title: "Personalized plan", body: "We build a treatment plan with specific CBT goals, skill targets, and between-session assignments." },
  { num: "04", icon: "ri-video-chat-line", title: "Begin CBT sessions", body: "Your teen starts individual CBT sessions — often reinforced in group therapy as part of Virtual IOP." },
];

const comparisonRows = [
  { label: "Approach", generic: "Open-ended talk therapy", cbt: "Structured skill-building" },
  { label: "Homework", generic: "Rarely assigned", cbt: "Core to the model" },
  { label: "Progress tracking", generic: "Subjective / impressionistic", cbt: "Goal-based and measurable" },
  { label: "Duration", generic: "Ongoing, open-ended", cbt: "Time-limited with clear targets" },
  { label: "Evidence base", generic: "Varies by modality", cbt: "Extensive research across diagnoses" },
];

const conditionsServed = [
  { label: "Anxiety & panic", path: "/online-anxiety-treatment", desc: "CBT is the gold-standard treatment for generalized anxiety, social anxiety, and panic disorder in adolescents." },
  { label: "Depression", path: "/teen-depression-treatment", desc: "Behavioral activation and cognitive restructuring target the thought patterns and withdrawal that maintain depression." },
  { label: "OCD", path: "/online-ocd-treatment", desc: "Exposure and response prevention (ERP) — a CBT approach — is the most effective treatment for obsessive-compulsive patterns." },
  { label: "Trauma & PTSD", path: "/ptsd-treatment-online", desc: "Trauma-focused CBT (TF-CBT) is an evidence-based adaptation specifically for teens with trauma histories." },
  { label: "School avoidance", path: "/conditions/school-avoidance", desc: "CBT's graduated exposure approach is central to school refusal and avoidance treatment plans." },
  { label: "ADHD & executive function", path: "/adhd-treatment-for-teens", desc: "CBT skills support organization, time management, and emotional regulation for teens with ADHD." },
];

const faqs = [
  { q: "What is CBT and how does it work?", a: "Cognitive Behavioral Therapy is a structured, skills-based approach to mental health treatment. It teaches teens to notice unhelpful thought patterns, test more balanced beliefs, and practice new behavioral responses — changing both how they think and what they do in difficult situations." },
  { q: "Is online CBT as effective as in-person?", a: "Research shows that online CBT can be equally effective for adolescents when delivered by licensed clinicians using structured protocols. The key factors are therapeutic alliance and skill practice — both of which are achievable in a well-run virtual format." },
  { q: "How long does CBT take?", a: "Standard CBT is typically 12–20 sessions. In our Virtual IOP format — where CBT is delivered multiple times per week across individual and group sessions — teens often see meaningful change faster than in once-weekly outpatient care." },
  { q: "Do parents participate in CBT?", a: "Yes. Parent coaching is an important part of adolescent CBT — caregivers learn how to respond to avoidance, reinforce skills at home, and avoid inadvertently maintaining anxiety or depression patterns." },
  { q: "Is CBT good for all conditions?", a: "CBT has the strongest evidence base for anxiety disorders, depression, OCD, and trauma. It is also used as part of treatment for ADHD, school avoidance, and self-harm. Our clinicians will recommend the most appropriate modalities for your teen's specific presentation." },
  { q: "Is Online CBT covered by insurance?", a: "When delivered as part of outpatient therapy or IOP, CBT sessions are typically covered by most major insurance plans. We verify benefits before enrollment so families understand their coverage up front." },
];

export default function OnlineCbtPage() {
  return (
    <MarketingPage currentPath="/online-cognitive-behavioral-therapy">
      <ProgramHeroSection
        eyebrow={`Online CBT · Ages ${SITE.ages}`}
        headline={
          <>
            Online CBT <span className="text-accent">that changes how your teen thinks and copes</span>
          </>
        }
        body="Cognitive Behavioral Therapy teaches adolescents to challenge unhelpful thoughts, reduce avoidance, and practice healthier responses — delivered online by licensed clinicians."
        imageSrc={IMGS.hero}
        imageAlt="Teen working through CBT thought log exercises at desk"
        imageClassName="object-cover object-center"
        stats={[
          { icon: "ri-brain-line", label: "Modality", value: "CBT", unit: "based" },
          { icon: "ri-award-line", label: "Evidence", value: "Gold", unit: "standard" },
          { icon: "ri-video-chat-line", label: "Format", value: "100%", unit: "virtual" },
        ]}
        trustItems={[
          { icon: "ri-shield-check-line", label: "Licensed clinicians" },
          { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
          { icon: "ri-lock-line", label: "HIPAA compliant" },
          { icon: "ri-focus-3-line", label: "Goal-focused care" },
        ]}
      />

      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {cbtStats.map((stat) => (
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">When CBT helps</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Thought patterns and avoidance that keep teens stuck
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Adolescent anxiety and depression often run on predictable loops — automatic thoughts, strong emotions,\n              and escape behaviors that feel helpful in the moment. Virtual IOP adds enough session frequency to practice\n              CBT skills where they matter: at home, at school, and online."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cbtProfiles.map((item) => (
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
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">What Is Online CBT?</p>
              <h3 className="mt-4 text-3xl font-bold leading-[1.1] text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                A structured, skills-based approach to adolescent mental health
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-8 text-body">
                <AutoLinkedText>{"Cognitive Behavioral Therapy is not open-ended talk therapy. It is a time-limited, goal-oriented\n                approach that teaches teens to recognize and change the thought patterns driving anxiety, depression,\n                and avoidance — then practice new responses in real life."}</AutoLinkedText>
              </p>
              <p className="mt-4 max-w-xl text-sm leading-8 text-body">
                <AutoLinkedText>{"Online CBT works the same way as in-person — individual sessions with a licensed clinician, structured\n                homework between appointments, and clear progress toward specific goals. In our Virtual IOP, CBT is\n                reinforced across individual and group therapy sessions."}</AutoLinkedText>
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  { icon: "ri-list-check-2", label: "Structured sessions" },
                  { icon: "ri-book-open-line", label: "Between-session homework" },
                  { icon: "ri-focus-2-line", label: "Measurable goals" },
                ].map((item) => (
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
                alt="Teen practicing mindfulness and CBT awareness exercises in bedroom"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-6">
                <p className="text-sm font-bold text-white"><AutoLinkedText>{"Skills teens use outside of sessions"}</AutoLinkedText></p>
                <p className="mt-1 text-xs leading-5 text-white/65">
                  <AutoLinkedText>{"Thought records, behavioral experiments, and coping tools that transfer to school and home."}</AutoLinkedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent"><AutoLinkedText>{"Why patterns persist"}</AutoLinkedText></p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              The thought–emotion–behavior loop — and where CBT breaks it
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"When a situation triggers an automatic negative thought, emotions spike and teens often avoid or seek\n              reassurance. Short-term relief teaches the brain that escape works. Weekly therapy may not provide enough\n              repetition to build new responses. Virtual IOP reinforces CBT skills across multiple sessions each week."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="flex divide-x divide-white/10 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {cbtCycleSteps.map((step, i) => (
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
                    {i < cbtCycleSteps.length - 1 ? (
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
                  <i className="ri-brain-line text-lg" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Where IOP helps</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    <AutoLinkedText>{"Thought challenging, behavioral activation, exposure practice, and parent coaching — reinforced\n                    between sessions so new responses stick in real situations."}</AutoLinkedText>
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Graded skill plan</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              A step-by-step CBT plan — structured, not overwhelming
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/50">
              <AutoLinkedText>{"Teens do not overhaul every pattern at once. Clinicians build a graded CBT plan with homework between\n              sessions — adapted to school demands, family dynamics, and your teen&apos;s specific diagnosis."}</AutoLinkedText>
            </p>
          </div>

          <div className="space-y-2">
            {cbtSkillPlanSteps.map((step) => (
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
            <AutoLinkedText>{"Example CBT sequence — every teen&apos;s plan is individualized during assessment."}</AutoLinkedText>
          </p>
        </div>
      </section>

      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Family dynamics</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Reducing accommodation without lowering care
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Well-meaning reassurance and rescue often maintain anxiety and depression. Parent coaching in CBT teaches\n              caregivers how to support skill practice instead of reinforcing avoidance."}</AutoLinkedText>
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
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent">CBT coaching shift</p>
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Core CBT skills</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              What teens learn and practice
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Each skill builds on the last — teens leave treatment with a toolkit they can apply independently to new\n              challenges."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {cbtSkills.map((skill) => (
              <div key={skill.title} className="rounded-3xl bg-surface p-8 ring-1 ring-border">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent-dark">
                    {skill.tag}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-accent">
                    <i className={`${skill.icon} text-base`} aria-hidden />
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {skill.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-body"><AutoLinkedText>{skill.body}</AutoLinkedText></p>
                <ul className="mt-5 space-y-2">
                  {skill.bullets.map((bullet) => (
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
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Real-life practice</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  Exposure & homework in real life
                </h2>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"CBT only works when skills move beyond the session room. Teens practice thought records, behavioral\n                  experiments, and graduated exposure in the same week they face school, social, and family triggers —\n                  with clinician and parent support between appointments."}</AutoLinkedText>
                </p>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>{"Virtual IOP adds enough session frequency to troubleshoot stuck homework, adjust fear hierarchies,\n                  and coach families through accommodation shifts without waiting a full week between visits."}</AutoLinkedText>
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {exposureHomeworkSupports.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AmhButton href="/conditions/school-avoidance" variant="darkSecondary" icon="ri-arrow-right-line">
                    School avoidance care
                  </AmhButton>
                  <AmhButton href="/online-ocd-treatment" variant="darkSecondary" icon="ri-arrow-right-line">
                    OCD & ERP support
                  </AmhButton>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"><AutoLinkedText>{"School & home contexts"}</AutoLinkedText></p>
                <div className="mt-5 space-y-3">
                  {exposureContextSigns.map((sign) => (
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
        eyebrow="Is It Right for Us?"
        title="Signs CBT may be the right fit"
        description="CBT works best for specific presentations — our team will confirm fit during a free initial consultation."
        criteria={fitCriteria}
        bg="white"
        asideNote={{
          label: "Good to know",
          body: "For teens who need more than once-weekly therapy, CBT is woven throughout our Virtual IOP — delivered across individual and group sessions multiple days per week.",
        }}
        showCta={false}
      />

      <SessionStructureSection
        eyebrow="How It Works"
        title="From first call to first session"
        description="Most families complete intake within a few days. We handle insurance and recommend the right level of care — CBT outpatient or within Virtual IOP."
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Why CBT</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Structured care with measurable outcomes
            </h2>
          </div>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-border">
            <ComparisonTable
              baselineLabel="Generic therapy"
              highlightedLabel="Online CBT"
              rows={comparisonRows.map((row) => ({
                label: row.label,
                baseline: row.generic,
                highlighted: row.cbt,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Conditions Treated</p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              What CBT treats in adolescents
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"CBT has the strongest research evidence across a wide range of adolescent mental health presentations. Your\n              teen receives an individualized plan targeting their specific patterns."}</AutoLinkedText>
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
                <p className="mt-3 flex-1 text-sm leading-7 text-body"><AutoLinkedText>{condition.desc}</AutoLinkedText></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TherapyFaqSection
        title="Questions about Online CBT"
        description="Straight answers about how CBT works, what it treats, and how it fits into adolescent mental health care."
        items={faqs}
      />

      <DarkCtaSection
        title="Give your teen tools that actually work"
        description="Free consultation, no obligation. We will recommend the right level of CBT care — individual outpatient or within our Virtual IOP — and verify insurance before enrollment."
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

import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  AmhButton,
  ClinicalMethodsSection,
  ComparisonTable,
  DarkCtaSection,
  GoodFitSection,
  MarketingPage,
  ProgramHeroSection,
  SessionStructureSection,
  TherapyFaqSection,
} from "@/components/marketing";
import { CONTAINER, SITE, VIOP_IMGS } from "@/lib/site";

const IMGS = VIOP_IMGS;

const programModalities = [
  {
    num: "01",
    cadence: "2–3 sessions per week",
    title: "Individual Therapy",
    body: "Private sessions with a licensed clinician who builds rapport quickly with teens — focused on goals, safety, and skills that transfer to school and home.",
    bullets: ["CBT & DBT-informed techniques", "Trauma-informed when needed", "Matched by clinical fit, not availability alone"],
    href: "/therapy/individual-therapy-for-teens",
    image: IMGS.individual,
    alt: "Teen in a one-on-one virtual therapy session at home with a clinician on screen",
    imageClass: "object-cover object-[center_40%]",
  },
  {
    num: "02",
    cadence: "3–4 sessions per week",
    title: "Group Therapy",
    body: "Small peer groups led by therapists who understand adolescent culture — not a lecture, but real conversation, skills practice, and mutual support.",
    bullets: ["DBT skills & emotion regulation", "Peer connection without performance pressure", "Topics teens actually relate to"],
    href: "/therapy/group-therapy-with-adolescents",
    image: IMGS.group,
    alt: "Teen on a laptop joining peers in a virtual group therapy session",
    imageClass: "object-cover object-center",
  },
  {
    num: "03",
    cadence: "1–2 sessions per week",
    title: "Family Therapy",
    body: "Structured family sessions and parent coaching so caregivers know how to de-escalate, communicate, and reinforce progress between appointments.",
    bullets: ["Parent coaching & check-ins", "Conflict and boundary work", "Discharge planning with the whole system"],
    href: "/therapy/adolescent-family-therapy",
    image: IMGS.family,
    alt: "Parent and teen together for a virtual family therapy session on the couch",
    imageClass: "object-cover object-[center_30%]",
  },
];

const fitCriteria = [
  {
    icon: "ri-add-line",
    label: "Needs more than weekly therapy",
    sub: "Symptoms are escalating or progress has plateaued",
  },
  {
    icon: "ri-arrow-down-line",
    label: "Stepping down from PHP or residential",
    sub: "Structured support to maintain gains at home",
  },
  {
    icon: "ri-computer-line",
    label: "Intensive care without missing school",
    sub: "Sessions scheduled around classes and activities",
  },
  {
    icon: "ri-home-2-line",
    label: "Struggling with daily functioning",
    sub: "Difficulty at school, home, or in relationships",
  },
  {
    icon: "ri-links-line",
    label: "Co-occurring mental health needs",
    sub: "Anxiety, trauma, ADHD, mood disorders, and more",
  },
];

const intakeSteps = [
  {
    num: "01",
    icon: "ri-phone-line",
    title: "Free consultation",
    body: "Speak with admissions about your teen's needs, timeline, and insurance.",
  },
  {
    num: "02",
    icon: "ri-clipboard-line",
    title: "Clinical assessment",
    body: "A licensed clinician evaluates fit and recommends the right level of care.",
  },
  {
    num: "03",
    icon: "ri-calendar-check-line",
    title: "Personalized schedule",
    body: "We build a weekly plan around school, family, and clinical goals.",
  },
  {
    num: "04",
    icon: "ri-video-chat-line",
    title: "Begin Virtual IOP",
    body: "Your teen starts individual, group, and family sessions — often within days.",
  },
];

const treatedConditions = [
  {
    label: "Anxiety & panic",
    path: "/online-anxiety-treatment",
    desc: "Generalized anxiety, social anxiety, and panic symptoms that interfere with school and daily life.",
  },
  {
    label: "Depression",
    path: "/teen-depression-treatment",
    desc: "Persistent low mood, withdrawal, and loss of motivation — including when weekly therapy has not been enough.",
  },
  {
    label: "Trauma & PTSD",
    path: "/ptsd-treatment-online",
    desc: "Trauma-informed virtual care for teens processing acute stress, complex trauma, or post-traumatic symptoms.",
  },
  {
    label: "ADHD",
    path: "/adhd-treatment-for-teens",
    desc: "Support for focus, executive function, emotional regulation, and the stress that often accompanies ADHD in adolescence.",
  },
  {
    label: "Self-harm",
    path: "/conditions/self-harm",
    desc: "Structured, non-judgmental intervention with safety planning and skills to reduce harmful coping behaviors.",
  },
  {
    label: "School avoidance",
    path: "/conditions/school-avoidance",
    desc: "Gradual re-engagement strategies paired with clinical care for anxiety driving school refusal.",
  },
];

const clinicalApproaches = [
  {
    icon: "ri-brain-line",
    tag: "Core modality",
    title: "Cognitive Behavioral Therapy (CBT)",
    body: "Teens learn to notice unhelpful thought patterns, test healthier beliefs, and practice coping skills in real situations — during individual sessions and reinforced in group.",
  },
  {
    icon: "ri-heart-pulse-line",
    tag: "Core modality",
    title: "Dialectical Behavior Therapy (DBT)",
    body: "Structured skills for emotion regulation, distress tolerance, interpersonal effectiveness, and mindfulness — especially effective for self-harm, mood instability, and relationship stress.",
  },
  {
    icon: "ri-group-line",
    tag: "Peer connection",
    title: "Group therapy with adolescents",
    body: "Small, therapist-led groups give teens a place to feel understood, practice skills aloud, and hear from peers navigating similar challenges — reducing the isolation that often accompanies mental illness.",
  },
  {
    icon: "ri-home-heart-line",
    tag: "Family integration",
    title: "Family therapy & parent coaching",
    body: "Caregivers are coached on communication, boundaries, and crisis response so the home environment supports — rather than undermines — clinical progress between sessions.",
  },
];

const comparisonRows = [
  { label: "Weekly hours", traditional: "~1 hour", iop: "9–20 hours" },
  { label: "Setting", traditional: "Clinic office", iop: "Secure video from home" },
  { label: "Parent involvement", traditional: "Often limited", iop: "Structured family track" },
  { label: "Intake timeline", traditional: "Weeks to months", iop: "Often 24–48 hours" },
  { label: "School disruption", traditional: "Frequent absences", iop: "Sessions built around school" },
];

const faqs = [
  {
    q: "How is Virtual IOP different from weekly therapy?",
    a: "Weekly therapy typically offers one session per week. Virtual IOP provides 9–20 structured hours of care — individual therapy, group therapy, family sessions, and skills work — designed for teens who need more support than standard outpatient care.",
  },
  {
    q: "Can my teen stay in school during Virtual IOP?",
    a: "Yes. Our schedules are built around school and extracurricular commitments. Many families choose afternoon or early-evening tracks so teens can maintain academics while receiving intensive clinical support.",
  },
  {
    q: "Is online IOP effective for adolescents?",
    a: "Research and clinical experience show that virtual IOP can be as effective as in-person care for medically stable teens when delivered by licensed clinicians using evidence-based modalities like CBT and DBT.",
  },
  {
    q: "What conditions do you treat in Virtual IOP?",
    a: "We treat anxiety, depression, trauma and PTSD, ADHD, bipolar disorder, self-harm, school avoidance, OCD, and related adolescent mental health concerns. Our admissions team confirms clinical fit during your free consultation.",
  },
  {
    q: "Is Virtual IOP covered by insurance?",
    a: "Most major insurance plans cover adolescent IOP, including telehealth. We verify benefits at no cost before enrollment and explain any copay or authorization requirements up front.",
  },
  {
    q: "How involved do parents need to be?",
    a: "Family participation is a core part of our model — not optional add-on care. Parents attend dedicated family therapy sessions and coaching to learn how to support progress, communicate effectively, and respond to challenges between appointments.",
  },
];

export default function VirtualIopPage() {
  return (
    <MarketingPage currentPath="/virtual-iop-for-teens">
      <ProgramHeroSection
        eyebrow={`Virtual IOP · Ages ${SITE.ages}`}
        headline={
          <>
            Virtual IOP for teens, <span className="text-accent">without leaving home</span>
          </>
        }
        body="A Virtual Intensive Outpatient Program combining individual, group, and family therapy — built around school, family, and real life."
        imageSrc={IMGS.hero}
        imageAlt="Teen attending a virtual therapy session from a cozy bedroom at home"
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

      {/* What is Virtual IOP — light bento + care ladder */}
      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="grid gap-3 lg:grid-cols-[1fr_400px]">

            {/* Definition + care ladder */}
            <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border lg:p-12">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
                  <AutoLinkedText>{"What Is Virtual IOP?"}</AutoLinkedText>
                </p>
                <h2
                  className="text-3xl font-bold leading-[1.1] text-ink md:text-4xl lg:text-[2.75rem]"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  The middle ground between weekly therapy and residential care
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-8 text-body">
                  <AutoLinkedText>{"A Virtual Intensive Outpatient Program delivers structured, multi-day clinical support through secure\n                  video. Your teen stays at home, in school, and connected to family while receiving the intensity many\n                  adolescents need to stabilize and heal."}</AutoLinkedText>
                </p>
                <p className="mt-4 max-w-xl text-sm leading-8 text-body">
                  <AutoLinkedText>{"Our program serves teens ages 12–17 with licensed clinicians trained in CBT, DBT, and\n                  adolescent-specific care. It is built for families who need more than a single weekly session, but\n                  not a full hospital or residential stay."}</AutoLinkedText>
                </p>
              </div>

              <div className="mt-10 rounded-2xl border border-border bg-surface-muted p-6 lg:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                  <AutoLinkedText>{"Where virtual IOP sits"}</AutoLinkedText>
                </p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: "Weekly therapy",
                      hours: "~1 hr / week",
                      note: "Maintenance or mild symptoms",
                      active: false,
                    },
                    {
                      label: "Virtual IOP",
                      hours: "9–20 hrs / week",
                      note: "Moderate to severe — home-based",
                      active: true,
                    },
                    {
                      label: "Residential",
                      hours: "24 / 7",
                      note: "Highest acuity & monitoring",
                      active: false,
                    },
                  ].map((level) => (
                    <div
                      key={level.label}
                      className={`rounded-xl px-4 py-4 transition ${
                        level.active
                          ? "border-2 border-accent bg-white shadow-md shadow-accent/10"
                          : "border border-border bg-white/60"
                      }`}
                    >
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${
                          level.active ? "text-accent" : "text-body"
                        }`}
                      ><AutoLinkedText>{level.label}</AutoLinkedText></p>
                      <p
                        className="mt-2 text-lg font-bold text-ink"
                        style={{ fontFamily: "var(--font-heebo)" }}
                      ><AutoLinkedText>{level.hours}</AutoLinkedText></p>
                      <p className="mt-1 text-[11px] leading-5 text-body"><AutoLinkedText>{level.note}</AutoLinkedText></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo panel — grows to match left column height */}
            <div className="flex flex-col gap-3 lg:h-full">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-3xl ring-1 ring-border">
                <Image
                  src={IMGS.bento}
                  alt="Teen at a home study nook attending a virtual therapy session on laptop"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-border">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <i className="ri-video-chat-line text-lg"></i>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink"><AutoLinkedText>{"HIPAA-compliant video sessions"}</AutoLinkedText></p>
                    <p className="mt-0.5 text-xs leading-5 text-body">
                      <AutoLinkedText>{"Private, encrypted, and designed for teens — not a sterile clinic room."}</AutoLinkedText>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat strip — full width below bento */}
          <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                { icon: "ri-user-heart-line", value: "12–17", label: "Ages served" },
                { icon: "ri-time-line", value: "9–20h", label: "Clinical hours / week" },
                { icon: "ri-calendar-check-line", value: "24–48h", label: "Typical intake" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col justify-between rounded-3xl bg-white px-5 py-6 shadow-sm ring-1 ring-border"
                >
                  <i className={`${stat.icon} text-xl text-accent`}></i>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{stat.value}</AutoLinkedText></p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-body"><AutoLinkedText>{stat.label}</AutoLinkedText></p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Program structure — editorial modality rows */}
      <section className="relative overflow-hidden bg-dark px-6 py-section lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/5 blur-[80px]" />

        <div className={`relative ${CONTAINER}`}>
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
                Program Structure
              </p>
              <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
                A typical week in Virtual IOP
              </h2>
              <p className="mt-4 text-sm leading-8 text-white/50">
                <AutoLinkedText>{"Plans are built around your teen&apos;s clinical needs — most adolescents move through a consistent\n                rhythm of individual, group, and family care."}</AutoLinkedText>
              </p>
            </div>

            <div
              className="shrink-0 rounded-2xl px-6 py-5 lg:max-w-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
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
                    >
                      {mod.num}
                    </span>
                  </div>

                  <div
                    className={`flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14 ${
                      imageFirst ? "" : "lg:order-1"
                    }`}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent"><AutoLinkedText>{mod.cadence}</AutoLinkedText></p>
                    <h3
                      className="mt-3 text-2xl font-bold text-white md:text-3xl"
                      style={{ fontFamily: "var(--font-heebo)" }}
                    >
                      {mod.title}
                    </h3>
                    <p className="mt-4 text-sm leading-8 text-white/55"><AutoLinkedText>{mod.body}</AutoLinkedText></p>
                    <ul className="mt-6 space-y-2.5">
                      {mod.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-white/45">
                          <i className="ri-check-line mt-0.5 shrink-0 text-accent"></i>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={mod.href}
                      className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent transition hover:text-white"
                    >
                      About {mod.title.toLowerCase()}
                      <i className="ri-arrow-right-line transition group-hover:translate-x-0.5"></i>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p className="text-sm text-white/45">
              <span className="font-semibold text-white/70">Also woven in:</span>{" "}
              psychoeducation, between-session messaging, and discharge planning.
            </p>
            <div className="flex flex-wrap gap-2">
              {["DBT skills", "CBT tools", "Crisis line", "Parent coaching"].map((tag) => (
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
        title="Signs Virtual IOP may fit your teen"
        description="You don't need a perfect diagnosis to call. If any of these sound familiar, our admissions team can help you understand whether this level of care makes sense."
        criteria={fitCriteria}
        bg="white"
        showCta={false}
        asideNote={{
          label: "Good to know",
          body: "Many families start here when weekly therapy isn't enough — or when stepping down from a higher level of care.",
        }}
      />

      <SessionStructureSection
        phases={intakeSteps}
        eyebrow="How It Works"
        title="From first call to first session"
        description="We handle insurance verification and scheduling so you can focus on your teen."
        bg="surface"
        footer={
          <p className="text-sm text-body">
            <i className="ri-time-line mr-1.5 align-middle text-accent"></i>
            Most families complete intake within a few days.
          </p>
        }
      />

      {/* Comparison */}
      <section className="bg-dark px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden />
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Why Virtual IOP</p>
            </div>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              More support than weekly therapy
            </h2>
          </div>

          <ComparisonTable
            baselineLabel="Weekly therapy"
            highlightedLabel="Virtual IOP"
            rows={comparisonRows.map((row) => ({
              label: row.label,
              baseline: row.traditional,
              highlighted: row.iop,
            }))}
          />
        </div>
      </section>

      {/* Conditions treated */}
      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Conditions Treated</p>
            <h2
              className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              Mental health conditions we treat in Virtual IOP
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Our adolescent Virtual Intensive Outpatient Program is designed for teens ages 12–17 navigating a wide\n              range of emotional and behavioral challenges. Every teen receives an individualized plan — these are\n              among the most common presentations we support."}</AutoLinkedText>
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {treatedConditions.map((condition) => (
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
                    <i className="ri-arrow-right-line text-sm"></i>
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-7 text-body"><AutoLinkedText>{condition.desc}</AutoLinkedText></p>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm leading-7 text-body">
            Not sure if your teen&apos;s diagnosis is listed?{" "}
            <a href={SITE.phone.href} className="font-semibold text-accent hover:underline">
              Call admissions
            </a>{" "}
            for a free consultation — we&apos;ll help determine whether Virtual IOP is clinically appropriate.
          </p>
        </div>
      </section>

      <ClinicalMethodsSection
        eyebrow="Clinical Approach"
        title="Real intensive outpatient care — not a video chat"
        description="Licensed clinicians. HIPAA-compliant sessions. The same evidence base as in-person IOP — adapted for adolescents at home."
        items={clinicalApproaches}
      />

      <TherapyFaqSection
        title="Questions parents ask about Virtual IOP"
        description="Straight answers about fit, school, insurance, and what care looks like week to week."
        items={faqs}
      />

      <DarkCtaSection
        title="Give your teen the structure they need — from home"
        description="Free consultations are confidential. Our team can verify insurance and help you understand whether Virtual IOP is the right next step."
        actions={
          <>
            <AmhButton href={SITE.phone.href} variant="darkPrimary" icon="ri-phone-fill" iconPosition="left">
              Call {SITE.phone.display}
            </AmhButton>
            <AmhButton href="/treatment" variant="darkSecondary" icon="ri-arrow-right-line">
              Conditions we treat
            </AmhButton>
          </>
        }
      />
    </MarketingPage>
  );
}

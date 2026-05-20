import Image from "next/image";
import Link from "next/link";

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";
const SB_ROOT =
  "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images";

const IMGS = {
  hero: `${SB_ROOT}/amh_viop_hero01.jpg`,
  bento: `${SB_ROOT}/amh_viop_bento01.jpg`,
  individual: `${SB_ROOT}/amh_viop_individual05.jpg`,
  group: `${SB_ROOT}/amh_viop_group03.jpg`,
  family: `${SB_ROOT}/amh_viop_family04.jpg`,
};

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
    path: "/conditions/anxiety",
    desc: "Generalized anxiety, social anxiety, and panic symptoms that interfere with school and daily life.",
  },
  {
    label: "Depression",
    path: "/conditions/depression",
    desc: "Persistent low mood, withdrawal, and loss of motivation — including when weekly therapy has not been enough.",
  },
  {
    label: "Trauma & PTSD",
    path: "/conditions/trauma-ptsd",
    desc: "Trauma-informed virtual care for teens processing acute stress, complex trauma, or post-traumatic symptoms.",
  },
  {
    label: "ADHD",
    path: "/conditions/adhd",
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
    num: "01",
    icon: "ri-brain-line",
    tag: "Core modality",
    title: "Cognitive Behavioral Therapy (CBT)",
    body: "Teens learn to notice unhelpful thought patterns, test healthier beliefs, and practice coping skills in real situations — during individual sessions and reinforced in group.",
  },
  {
    num: "02",
    icon: "ri-heart-pulse-line",
    tag: "Core modality",
    title: "Dialectical Behavior Therapy (DBT)",
    body: "Structured skills for emotion regulation, distress tolerance, interpersonal effectiveness, and mindfulness — especially effective for self-harm, mood instability, and relationship stress.",
  },
  {
    num: "03",
    icon: "ri-group-line",
    tag: "Peer connection",
    title: "Group therapy with adolescents",
    body: "Small, therapist-led groups give teens a place to feel understood, practice skills aloud, and hear from peers navigating similar challenges — reducing the isolation that often accompanies mental illness.",
  },
  {
    num: "04",
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
    <main style={{ fontFamily: "var(--font-montserrat)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E8EEF4] bg-[#F0F4F8]">
        <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-[#83B3DC]/15 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#83B3DC]/8 blur-[90px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #83B3DC 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative px-6 pb-16 pt-28 lg:px-10 lg:pb-24 lg:pt-32">
          <div className="mx-auto max-w-[1350px]">
            <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div className="relative z-10 max-w-2xl pb-2 lg:pb-10">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#83B3DC]/25 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#83B3DC] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#83B3DC]" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#54595F]">
                    Virtual IOP · Ages 12–17
                  </span>
                </div>

                <h1
                  className="mt-7 text-[2.75rem] font-bold leading-[1.02] tracking-tight text-[#0A0F14] sm:text-5xl lg:text-[4.25rem]"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  Intensive care for teens,{" "}
                  <span className="text-[#83B3DC]">without leaving home</span>
                </h1>

                <p className="mt-6 max-w-lg text-base leading-8 text-[#54595F]">
                  A Virtual Intensive Outpatient Program with 9–20 hours of weekly individual, group, and family
                  therapy — built around school, family, and real life.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#0A0F14] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#0A0F14]/15 transition hover:bg-[#111111]"
                  >
                    <i className="ri-phone-fill text-[#83B3DC]"></i>
                    Free consultation
                  </a>
                  <Link
                    href="/admissions"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E8EEF4] bg-white px-8 py-4 text-sm font-semibold text-[#0A0F14] shadow-sm transition hover:border-[#83B3DC]/50 hover:shadow-md"
                  >
                    Start online intake
                    <i className="ri-arrow-right-line text-[#83B3DC]"></i>
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  {[
                    { icon: "ri-shield-check-line", label: "Licensed clinicians" },
                    { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
                    { icon: "ri-lock-line", label: "HIPAA compliant" },
                    { icon: "ri-time-line", label: "24–48 hr intake" },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-[11px] font-semibold text-[#54595F] ring-1 ring-[#E8EEF4] backdrop-blur-sm"
                    >
                      <i className={`${item.icon} text-sm text-[#83B3DC]`}></i>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none lg:justify-self-end">
                <div
                  className="pointer-events-none absolute -right-3 top-6 hidden h-[88%] w-[92%] rounded-[2rem] bg-[#83B3DC]/25 lg:block"
                  aria-hidden
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-[#0A0F14]/10 ring-1 ring-white/60 sm:aspect-[5/6]">
                  <Image
                    src={IMGS.hero}
                    alt="Teen attending a virtual therapy session from a cozy bedroom at home"
                    fill
                    className="object-cover object-[center_35%]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14]/25 via-transparent to-transparent" />
                </div>

                <div className="absolute -left-2 bottom-8 z-10 rounded-2xl bg-white/95 px-5 py-4 shadow-xl ring-1 ring-[#E8EEF4] backdrop-blur-md sm:-left-6 sm:bottom-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Clinical hours</p>
                  <p className="mt-1 text-3xl font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>
                    9–20<span className="text-lg font-semibold text-[#7C848B]">/wk</span>
                  </p>
                </div>

                <div className="absolute -right-1 top-6 z-10 hidden rounded-2xl bg-[#0A0F14] px-4 py-3 shadow-xl sm:block lg:-right-4 lg:top-10">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#83B3DC]/20 text-[#83B3DC]">
                      <i className="ri-video-chat-line text-base"></i>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Format</p>
                      <p className="text-xs font-bold text-white">100% virtual</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Virtual IOP — light bento + care ladder */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-3 lg:grid-cols-[1fr_400px]">

            {/* Definition + care ladder */}
            <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E8EEF4] lg:p-12">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
                  What Is Virtual IOP?
                </p>
                <h2
                  className="text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  The middle ground between weekly therapy and residential care
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-8 text-[#54595F]">
                  A Virtual Intensive Outpatient Program delivers structured, multi-day clinical support — usually
                  9–20 hours per week — through secure video. Your teen stays at home, in school, and connected to
                  family while receiving the intensity many adolescents need to stabilize and heal.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-8 text-[#7C848B]">
                  Our program serves teens ages 12–17 with licensed clinicians trained in CBT, DBT, and
                  adolescent-specific care. It is built for families who need more than a single weekly session, but
                  not a full hospital or residential stay.
                </p>
              </div>

              <div className="mt-10 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] p-6 lg:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">
                  Where virtual IOP sits
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
                          ? "border-2 border-[#83B3DC] bg-white shadow-md shadow-[#83B3DC]/10"
                          : "border border-[#E8EEF4] bg-white/60"
                      }`}
                    >
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${
                          level.active ? "text-[#83B3DC]" : "text-[#7C848B]"
                        }`}
                      >
                        {level.label}
                      </p>
                      <p
                        className="mt-2 text-lg font-bold text-[#0A0F14]"
                        style={{ fontFamily: "var(--font-heebo)" }}
                      >
                        {level.hours}
                      </p>
                      <p className="mt-1 text-[11px] leading-5 text-[#7C848B]">{level.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo panel — fixed aspect, no stretch */}
            <div className="flex flex-col gap-3 lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-[#E8EEF4]">
                <Image
                  src={IMGS.bento}
                  alt="Teen at a home study nook attending a virtual therapy session on laptop"
                  fill
                  className="object-cover object-center"
                  sizes="400px"
                />
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-[#E8EEF4]">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#83B3DC]/15 text-[#83B3DC]">
                    <i className="ri-video-chat-line text-lg"></i>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0A0F14]">HIPAA-compliant video sessions</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#7C848B]">
                      Private, encrypted, and designed for teens — not a sterile clinic room.
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
                  className="flex flex-col justify-between rounded-3xl bg-white px-5 py-6 shadow-sm ring-1 ring-[#E8EEF4]"
                >
                  <i className={`${stat.icon} text-xl text-[#83B3DC]`}></i>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7C848B]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Program structure — editorial modality rows */}
      <section className="relative overflow-hidden bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#83B3DC]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#83B3DC]/5 blur-[80px]" />

        <div className="relative mx-auto max-w-[1350px]">
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
                Program Structure
              </p>
              <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
                A typical week in Virtual IOP
              </h2>
              <p className="mt-4 text-sm leading-8 text-white/50">
                Plans are built around your teen&apos;s clinical needs — but most adolescents move through a
                consistent rhythm of individual, group, and family care totaling 9–20 hours per week.
              </p>
            </div>

            <div
              className="shrink-0 rounded-2xl px-6 py-5 lg:max-w-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">Weekly snapshot</p>
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
                      <span className="text-xs font-bold tabular-nums text-[#83B3DC]">{row.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-5 text-white/35">
                Plus skills modules, check-ins, and crisis support between sessions.
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
                            ? "bg-gradient-to-t from-[#0A0F14]/95 via-[#0A0F14]/50 to-[#0A0F14]/10 lg:bg-gradient-to-r lg:from-[#0A0F14]/15 lg:via-[#0A0F14]/45 lg:to-[#0A0F14]/95"
                            : "bg-gradient-to-t from-[#0A0F14]/95 via-[#0A0F14]/50 to-[#0A0F14]/10 lg:bg-gradient-to-l lg:from-[#0A0F14]/15 lg:via-[#0A0F14]/45 lg:to-[#0A0F14]/95"
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
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">
                      {mod.cadence}
                    </p>
                    <h3
                      className="mt-3 text-2xl font-bold text-white md:text-3xl"
                      style={{ fontFamily: "var(--font-heebo)" }}
                    >
                      {mod.title}
                    </h3>
                    <p className="mt-4 text-sm leading-8 text-white/55">{mod.body}</p>
                    <ul className="mt-6 space-y-2.5">
                      {mod.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-white/45">
                          <i className="ri-check-line mt-0.5 shrink-0 text-[#83B3DC]"></i>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={mod.href}
                      className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#83B3DC] transition hover:text-white"
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

      {/* Is it right for us */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Is It Right for Us?</p>
              <h2
                className="mt-3 text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                Signs Virtual IOP may fit your teen
              </h2>
              <p className="mt-4 text-sm leading-8 text-[#54595F]">
                You don&apos;t need a perfect diagnosis to call. If any of these sound familiar, our admissions team
                can help you understand whether this level of care makes sense.
              </p>
              <div className="mt-8 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Good to know</p>
                <p className="mt-2 text-sm leading-7 text-[#54595F]">
                  Many families start here when weekly therapy isn&apos;t enough — or when stepping down from a
                  higher level of care.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {fitCriteria.map((item, i) => (
                <div
                  key={item.label}
                  className={`group relative rounded-2xl border border-[#E8EEF4] bg-[#F0F4F8]/60 p-6 pr-16 transition hover:border-[#83B3DC]/40 hover:bg-white hover:shadow-md hover:shadow-[#83B3DC]/5 sm:pr-20 ${
                    i === 4 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span
                    className="pointer-events-none absolute right-4 top-4 select-none text-5xl font-bold leading-none text-[#E8EEF4] transition group-hover:text-[#83B3DC]/15 sm:text-6xl"
                    style={{ fontFamily: "var(--font-heebo)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#83B3DC] shadow-sm ring-1 ring-[#E8EEF4] transition group-hover:bg-[#83B3DC] group-hover:text-white group-hover:ring-[#83B3DC]">
                    <i className={`${item.icon} text-lg`}></i>
                  </span>
                  <p className="relative mt-5 text-base font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>
                    {item.label}
                  </p>
                  <p className="relative mt-2 text-sm leading-7 text-[#7C848B]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-[#0A0F14]">
            <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-12 lg:py-12">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">Not sure yet?</p>
                <p className="mt-3 text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  A free consultation clarifies next steps
                </p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                  We&apos;ll review your teen&apos;s history, explain how Virtual IOP works, and verify insurance — no
                  obligation and no pressure to enroll.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[260px]">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-[#0A0F14] transition hover:bg-white/90"
                >
                  <i className="ri-phone-fill text-[#83B3DC]"></i>
                  {PHONE}
                </a>
                <Link
                  href="/insurance-coverage"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Verify insurance
                  <i className="ri-arrow-right-line text-[#83B3DC]"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — timeline */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">How It Works</p>
              <h2
                className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                From first call to first session
              </h2>
              <p className="mt-4 text-sm leading-8 text-[#54595F]">
                Most families complete intake within a few days. We handle insurance verification and scheduling so
                you can focus on your teen.
              </p>
            </div>
            <a
              href={PHONE_HREF}
              className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-2xl bg-[#0A0F14] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#111111] lg:self-auto"
            >
              <i className="ri-phone-fill text-[#83B3DC]"></i>
              Start with a free call
            </a>
          </div>

          <div className="relative mt-12 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E8EEF4] lg:p-12">
            {/* Desktop timeline rail */}
            <div className="absolute left-12 right-12 top-[4.25rem] hidden h-px bg-[#E8EEF4] lg:block" />

            {/* Desktop: horizontal timeline */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
              {intakeSteps.map((step) => (
                <div key={step.num} className="relative flex flex-col">
                  <div
                    className="relative z-10 mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-[#83B3DC] text-white"
                    style={{ boxShadow: "0 0 0 5px rgba(131,179,220,0.12)" }}
                  >
                    <i className={`${step.icon} text-base`}></i>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]/70">Step {step.num}</p>
                  <h3 className="mt-2 text-lg font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#54595F]">{step.body}</p>
                </div>
              ))}
            </div>

            {/* Mobile: vertical timeline */}
            <div className="lg:hidden">
              {intakeSteps.map((step, i) => (
                <div key={step.num} className="relative flex gap-5 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#83B3DC] text-white"
                      style={{ boxShadow: "0 0 0 5px rgba(131,179,220,0.12)" }}
                    >
                      <i className={`${step.icon} text-base`}></i>
                    </div>
                    {i < intakeSteps.length - 1 && (
                      <div className="mt-2 w-px flex-1 min-h-[3rem] bg-[#E8EEF4]" />
                    )}
                  </div>
                  <div className="pb-1 pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]/70">
                      Step {step.num}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#54595F]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-[#7C848B]">
            <i className="ri-time-line mr-1.5 align-middle text-[#83B3DC]"></i>
            Typical time from first call to first session:{" "}
            <span className="font-bold text-[#0A0F14]">24–48 hours</span>
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Why Virtual IOP</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              More support than weekly therapy
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/8">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 border-b border-white/8 bg-white/[0.03] px-6 py-4">
              <div />
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/30">Weekly therapy</p>
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Virtual IOP</p>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-white/5 last:border-b-0`}
              >
                <p className="flex items-center text-xs font-bold uppercase tracking-wider text-white/40">{row.label}</p>
                <p className="flex items-center justify-center text-sm text-white/35">{row.traditional}</p>
                <p className="flex items-center justify-center text-sm font-semibold text-white">{row.iop}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions treated */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Conditions Treated</p>
            <h2
              className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              Mental health conditions we treat in Virtual IOP
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#54595F]">
              Our adolescent Virtual Intensive Outpatient Program is designed for teens ages 12–17 navigating a wide
              range of emotional and behavioral challenges. Every teen receives an individualized plan — these are
              among the most common presentations we support.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {treatedConditions.map((condition) => (
              <Link
                key={condition.path}
                href={condition.path}
                className="group flex flex-col rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC]/50 p-6 transition hover:border-[#83B3DC]/40 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className="text-base font-bold text-[#0A0F14] transition group-hover:text-[#83B3DC]"
                    style={{ fontFamily: "var(--font-heebo)" }}
                  >
                    {condition.label}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#83B3DC]/50 ring-1 ring-[#E8EEF4] transition group-hover:bg-[#83B3DC] group-hover:text-white group-hover:ring-[#83B3DC]">
                    <i className="ri-arrow-right-line text-sm"></i>
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#7C848B]">{condition.desc}</p>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm leading-7 text-[#7C848B]">
            Not sure if your teen&apos;s diagnosis is listed?{" "}
            <a href={PHONE_HREF} className="font-semibold text-[#83B3DC] hover:underline">
              Call admissions
            </a>{" "}
            for a free consultation — we&apos;ll help determine whether Virtual IOP is clinically appropriate.
          </p>
        </div>
      </section>

      {/* Clinical approach */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Clinical Approach</p>
              <h2
                className="mt-3 text-3xl font-bold leading-tight text-[#0A0F14] md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                Real intensive outpatient care — not a video chat
              </h2>
            </div>
            <p className="max-w-md text-sm leading-8 text-[#54595F] lg:text-right">
              Licensed clinicians. HIPAA-compliant sessions. The same evidence base as in-person IOP — adapted for
              adolescents at home.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[#E8EEF4] bg-white shadow-sm">
            {clinicalApproaches.map((approach, i) => (
              <div
                key={approach.title}
                className={`grid gap-6 border-[#F0F4F8] px-8 py-9 lg:grid-cols-[72px_1fr] lg:gap-10 lg:px-12 lg:py-11 ${
                  i > 0 ? "border-t" : ""
                }`}
              >
                <p
                  className="text-4xl font-bold leading-none text-[#E8EEF4] lg:pt-1 lg:text-5xl"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  {approach.num}
                </p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#F4F9FC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#83B3DC]">
                      {approach.tag}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#83B3DC]/10 text-[#83B3DC]">
                      <i className={`${approach.icon} text-base`}></i>
                    </span>
                  </div>
                  <h3
                    className="mt-4 text-xl font-bold text-[#0A0F14] md:text-2xl"
                    style={{ fontFamily: "var(--font-heebo)" }}
                  >
                    {approach.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-8 text-[#54595F]">{approach.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: "ri-shield-check-line",
                title: "HIPAA-compliant video",
                body: "Encrypted sessions on a platform built for healthcare — not consumer video chat.",
              },
              {
                icon: "ri-user-star-line",
                title: "Licensed clinicians",
                body: "Therapists trained in adolescent care, CBT, DBT, and family systems work.",
              },
              {
                icon: "ri-lifebuoy-line",
                title: "Between-session support",
                body: "Skills materials, check-ins, and crisis resources so teens are not on their own between appointments.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#E8EEF4] bg-white/80 px-5 py-5 backdrop-blur-sm">
                <i className={`${item.icon} text-xl text-[#83B3DC]`}></i>
                <p className="mt-3 text-sm font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs leading-6 text-[#7C848B]">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#7C848B]">
              Want to know who will work with your teen?{" "}
              <Link href="/about" className="font-semibold text-[#83B3DC] hover:underline">
                Meet our clinical team
              </Link>
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#0A0F14] transition hover:text-[#83B3DC]"
            >
              <i className="ri-phone-fill text-[#83B3DC]"></i>
              Discuss your teen&apos;s needs — {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">FAQ</p>
            <h2
              className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              Questions parents ask about Virtual IOP
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#54595F]">
              Straight answers about fit, school, insurance, and what care looks like week to week.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {faqs.map((faq, i) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] transition open:border-[#83B3DC]/35 open:bg-white open:shadow-md open:shadow-[#83B3DC]/5"
              >
                <summary className="flex cursor-pointer list-none items-start gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F9FC] text-xs font-bold text-[#83B3DC] ring-1 ring-[#E8EEF4] transition group-open:bg-[#83B3DC] group-open:text-white group-open:ring-[#83B3DC]"
                    style={{ fontFamily: "var(--font-heebo)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 pt-0.5">
                    <span
                      className="block text-base font-bold leading-snug text-[#0A0F14] transition group-open:text-[#83B3DC]"
                      style={{ fontFamily: "var(--font-heebo)" }}
                    >
                      {faq.q}
                    </span>
                  </span>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0F4F8] text-[#83B3DC] transition group-open:rotate-45 group-open:bg-[#83B3DC] group-open:text-white">
                    <i className="ri-add-line text-sm"></i>
                  </span>
                </summary>
                <div className="border-t border-[#F0F4F8] px-6 pb-6 pt-4">
                  <p className="text-sm leading-8 text-[#54595F]">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-[#0A0F14]">
            <div className="flex flex-col gap-6 px-8 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-12">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">Still have questions?</p>
                <p className="mt-2 text-xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                  Talk to admissions — free and confidential
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-[#0A0F14] transition hover:bg-white/90"
                >
                  <i className="ri-phone-fill text-[#83B3DC]"></i>
                  {PHONE}
                </a>
                <a
                  href="mailto:admissions@adolescentmentalhealth.com"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  <i className="ri-mail-line text-[#83B3DC]"></i>
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#83B3DC]/8 blur-[100px]" />
        <div className="relative mx-auto max-w-[1350px] text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Get started</p>
          <h2
            className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-heebo)" }}
          >
            Give your teen the structure they need — from home
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50">
            Free consultations are confidential. Our team can verify insurance and help you understand whether Virtual
            IOP is the right next step.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#000000] transition hover:bg-white/90"
            >
              <i className="ri-phone-fill text-[#83B3DC]"></i>
              Call {PHONE}
            </a>
            <Link
              href="/conditions"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Conditions we treat
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

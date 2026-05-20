import Image from "next/image";
import Link from "next/link";

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";
const SB_ROOT =
  "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images";

const IMGS = {
  hero: `${SB_ROOT}/amh_aiop_hero01.jpg`,
  bento: `${SB_ROOT}/amh_aiop_bento01.jpg`,
  individual: `${SB_ROOT}/amh_viop_individual05.jpg`,
  group: `${SB_ROOT}/amh_viop_group03.jpg`,
  family: `${SB_ROOT}/amh_viop_family04.jpg`,
};

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
  { label: "Anxiety & panic", path: "/conditions/anxiety", desc: "Generalized anxiety, social anxiety, and panic attacks interfering with daily functioning." },
  { label: "Depression", path: "/conditions/depression", desc: "Persistent low mood, withdrawal, and loss of motivation requiring more than weekly support." },
  { label: "Trauma & PTSD", path: "/conditions/trauma-ptsd", desc: "Trauma-informed IOP care for teens processing acute or complex trauma histories." },
  { label: "ADHD", path: "/conditions/adhd", desc: "Executive function support, emotional regulation, and co-occurring mood or anxiety concerns." },
  { label: "Self-harm", path: "/conditions/self-harm", desc: "DBT-based IOP with structured safety planning and skills for reducing harmful behaviors." },
  { label: "School avoidance", path: "/conditions/school-avoidance", desc: "Gradual re-engagement approaches paired with IOP-level anxiety treatment." },
];

const clinicalApproaches = [
  { num: "01", icon: "ri-brain-line", tag: "Core modality", title: "Cognitive Behavioral Therapy (CBT)", body: "Teens learn to identify unhelpful thought patterns, challenge distorted beliefs, and practice healthier coping responses across individual and group sessions." },
  { num: "02", icon: "ri-heart-pulse-line", tag: "Core modality", title: "Dialectical Behavior Therapy (DBT)", body: "Skills for emotion regulation, distress tolerance, mindfulness, and interpersonal effectiveness — especially effective in IOP group formats." },
  { num: "03", icon: "ri-group-line", tag: "Peer integration", title: "Group therapy with adolescents", body: "Therapist-led peer groups reduce isolation and build skills in a real social context — reinforcing what is practiced in individual sessions." },
  { num: "04", icon: "ri-home-heart-line", tag: "Family integration", title: "Family therapy & parent coaching", body: "Parents are active participants in IOP — learning how to communicate, set limits, and support recovery between sessions." },
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
    <main style={{ fontFamily: "var(--font-montserrat)" }}>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E8EEF4] bg-[#F0F4F8]">
        <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-[#83B3DC]/15 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#83B3DC]/8 blur-[90px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #83B3DC 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="relative px-6 pb-16 pt-28 lg:px-10 lg:pb-24 lg:pt-32">
          <div className="mx-auto max-w-[1350px]">
            <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#83B3DC]/25 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#83B3DC] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#83B3DC]" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#54595F]">Adolescent IOP · Ages 12–17</span>
                </div>
                <h1 className="mt-7 text-[2.75rem] font-bold leading-[1.02] tracking-tight text-[#0A0F14] sm:text-5xl lg:text-[4.25rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  Adolescent IOP{" "}
                  <span className="text-[#83B3DC]">built around your teen&apos;s life</span>
                </h1>
                <p className="mt-6 max-w-lg text-base leading-8 text-[#54595F]">
                  Adolescent IOP delivers 9–20 hours of weekly individual, group, and family therapy for teens who need
                  more than a single weekly session — without a residential stay.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#0A0F14] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#0A0F14]/15 transition hover:bg-[#111111]">
                    <i className="ri-phone-fill text-[#83B3DC]"></i>
                    Free consultation
                  </a>
                  <Link href="/admissions" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E8EEF4] bg-white px-8 py-4 text-sm font-semibold text-[#0A0F14] shadow-sm transition hover:border-[#83B3DC]/50 hover:shadow-md">
                    Start online intake
                    <i className="ri-arrow-right-line text-[#83B3DC]"></i>
                  </Link>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                  {[
                    { icon: "ri-shield-check-line", label: "Licensed clinicians" },
                    { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
                    { icon: "ri-video-chat-line", label: "Delivered virtually" },
                    { icon: "ri-time-line", label: "24–48 hr intake" },
                  ].map((item) => (
                    <span key={item.label} className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-[11px] font-semibold text-[#54595F] ring-1 ring-[#E8EEF4] backdrop-blur-sm">
                      <i className={`${item.icon} text-sm text-[#83B3DC]`}></i>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-[540px] lg:justify-self-end lg:pt-2">
                <div className="pointer-events-none absolute -right-3 top-0 hidden h-full w-[92%] rounded-[2rem] bg-[#83B3DC]/25 lg:block" aria-hidden />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-[#0A0F14]/10 ring-1 ring-white/60">
                  <Image src={IMGS.hero} alt="Teen participating in adolescent IOP group therapy session from home on laptop" fill className="object-cover object-center" priority quality={90} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 540px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14]/25 via-transparent to-transparent" />
                </div>
                <div className="absolute -left-2 bottom-6 z-10 rounded-2xl bg-white/95 px-5 py-4 shadow-xl ring-1 ring-[#E8EEF4] backdrop-blur-md sm:-left-6 sm:bottom-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Clinical hours</p>
                  <p className="mt-1 text-3xl font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>9–20<span className="text-lg font-semibold text-[#7C848B]">/wk</span></p>
                </div>
                <div className="absolute -right-1 top-4 z-10 hidden rounded-2xl bg-[#0A0F14] px-4 py-3 shadow-xl sm:block lg:-right-4 lg:top-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#83B3DC]/20 text-[#83B3DC]">
                      <i className="ri-group-line text-base"></i>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Format</p>
                      <p className="text-xs font-bold text-white">Individual & group</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Adolescent IOP */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-3 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E8EEF4] lg:p-12">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">What Is Adolescent IOP?</p>
                <h2 className="text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  More support than weekly therapy — without residential placement
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-8 text-[#54595F]">
                  An Intensive Outpatient Program is a structured mental health treatment model designed for adolescents
                  who need frequent clinical contact but are stable enough to live at home. It sits directly between
                  once-a-week outpatient therapy and 24/7 residential care.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-8 text-[#7C848B]">
                  Our program delivers IOP virtually — through HIPAA-compliant video — so teens receive the same
                  clinical intensity from home, around school and family life.
                </p>
              </div>
              <div className="mt-10 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] p-6 lg:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">Where Adolescent IOP sits</p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Weekly therapy", hours: "~1 hr / week", note: "Mild to moderate symptoms", active: false },
                    { label: "Adolescent IOP", hours: "9–20 hrs / week", note: "Moderate to severe — home-based", active: true },
                    { label: "Residential", hours: "24 / 7", note: "Highest acuity & monitoring", active: false },
                  ].map((level) => (
                    <div key={level.label} className={`rounded-xl px-4 py-4 transition ${level.active ? "border-2 border-[#83B3DC] bg-white shadow-md shadow-[#83B3DC]/10" : "border border-[#E8EEF4] bg-white/60"}`}>
                      <p className={`text-xs font-bold uppercase tracking-wider ${level.active ? "text-[#83B3DC]" : "text-[#7C848B]"}`}>{level.label}</p>
                      <p className="mt-2 text-lg font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>{level.hours}</p>
                      <p className="mt-1 text-[11px] leading-5 text-[#7C848B]">{level.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:h-full">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-3xl ring-1 ring-[#E8EEF4]">
                <Image src={IMGS.bento} alt="Teen at structured home setup attending adolescent IOP sessions online" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 400px" />
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-[#E8EEF4]">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#83B3DC]/15 text-[#83B3DC]">
                    <i className="ri-calendar-check-line text-lg"></i>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0A0F14]">Scheduled around your teen&apos;s life</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#7C848B]">Afternoon and evening tracks available — school and activities stay intact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { icon: "ri-user-heart-line", value: "12–17", label: "Ages served" },
              { icon: "ri-time-line", value: "9–20h", label: "Clinical hours / week" },
              { icon: "ri-calendar-check-line", value: "24–48h", label: "Typical intake" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col justify-between rounded-3xl bg-white px-5 py-6 shadow-sm ring-1 ring-[#E8EEF4]">
                <i className={`${stat.icon} text-xl text-[#83B3DC]`}></i>
                <div className="mt-4">
                  <p className="text-xl font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>{stat.value}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7C848B]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program structure */}
      <section className="relative overflow-hidden bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#83B3DC]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#83B3DC]/5 blur-[80px]" />
        <div className="relative mx-auto max-w-[1350px]">
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Program Structure</p>
              <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>A typical week in Adolescent IOP</h2>
              <p className="mt-4 text-sm leading-8 text-white/50">Each plan is individualized — this is the framework most teens move through, combining individual, group, and family therapy.</p>
            </div>
            <div className="shrink-0 rounded-2xl px-6 py-5 lg:max-w-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">Weekly snapshot</p>
              <div className="mt-4 space-y-3">
                {[{ label: "Individual", hours: "3–6 hrs" }, { label: "Group", hours: "4–9 hrs" }, { label: "Family", hours: "2–4 hrs" }].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-white/70">{row.label}</span>
                    <div className="flex flex-1 items-center gap-3">
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="text-xs font-bold tabular-nums text-[#83B3DC]">{row.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-5 text-white/35">Plus skills modules, check-ins, and crisis support between sessions.</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {programModalities.map((mod, i) => {
              const imageFirst = i % 2 === 0;
              return (
                <article key={mod.title} className="group grid overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] lg:grid-cols-2">
                  <div className={`relative min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[400px] ${imageFirst ? "" : "lg:order-2"}`}>
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <Image src={mod.image} alt={mod.alt} fill className={mod.imageClass} sizes="(max-width: 1024px) 100vw, 675px" />
                      <div className={`absolute inset-0 ${imageFirst ? "bg-gradient-to-t from-[#0A0F14]/95 via-[#0A0F14]/50 to-[#0A0F14]/10 lg:bg-gradient-to-r lg:from-[#0A0F14]/15 lg:via-[#0A0F14]/45 lg:to-[#0A0F14]/95" : "bg-gradient-to-t from-[#0A0F14]/95 via-[#0A0F14]/50 to-[#0A0F14]/10 lg:bg-gradient-to-l lg:from-[#0A0F14]/15 lg:via-[#0A0F14]/45 lg:to-[#0A0F14]/95"}`} />
                    </div>
                    <span className="pointer-events-none absolute bottom-4 right-6 z-10 select-none text-7xl font-bold leading-none text-white/[0.06] lg:bottom-6 lg:right-8 lg:text-8xl" style={{ fontFamily: "var(--font-heebo)" }}>{mod.num}</span>
                  </div>
                  <div className={`flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14 ${imageFirst ? "" : "lg:order-1"}`}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">{mod.cadence}</p>
                    <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "var(--font-heebo)" }}>{mod.title}</h3>
                    <p className="mt-4 text-sm leading-8 text-white/55">{mod.body}</p>
                    <ul className="mt-6 space-y-2.5">
                      {mod.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-white/45">
                          <i className="ri-check-line mt-0.5 shrink-0 text-[#83B3DC]"></i>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link href={mod.href} className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#83B3DC] transition hover:text-white">
                      About {mod.title.toLowerCase()}
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p className="text-sm text-white/45"><span className="font-semibold text-white/70">Also included:</span> psychoeducation, between-session skills support, and discharge planning.</p>
            <div className="flex flex-wrap gap-2">
              {["DBT skills", "CBT tools", "Crisis planning", "Parent coaching"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold text-white/50">{tag}</span>
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
              <h2 className="mt-3 text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>Signs Adolescent IOP may fit your teen</h2>
              <p className="mt-4 text-sm leading-8 text-[#54595F]">You don&apos;t need a clear diagnosis to call. If any of these patterns sound familiar, our admissions team can help you figure out the right level of care.</p>
              <div className="mt-8 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Good to know</p>
                <p className="mt-2 text-sm leading-7 text-[#54595F]">IOP is often the right step when weekly therapy isn&apos;t working — or when stepping down from a higher level of care after inpatient or residential treatment.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {fitCriteria.map((item, i) => (
                <div key={item.label} className={`group relative rounded-2xl border border-[#E8EEF4] bg-[#F0F4F8]/60 p-6 pr-16 transition hover:border-[#83B3DC]/40 hover:bg-white hover:shadow-md hover:shadow-[#83B3DC]/5 sm:pr-20 ${i === 4 ? "sm:col-span-2" : ""}`}>
                  <span className="pointer-events-none absolute right-4 top-4 select-none text-5xl font-bold leading-none text-[#E8EEF4] transition group-hover:text-[#83B3DC]/15 sm:text-6xl" style={{ fontFamily: "var(--font-heebo)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#83B3DC] shadow-sm ring-1 ring-[#E8EEF4] transition group-hover:bg-[#83B3DC] group-hover:text-white group-hover:ring-[#83B3DC]">
                    <i className={`${item.icon} text-lg`}></i>
                  </span>
                  <p className="relative mt-5 text-base font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>{item.label}</p>
                  <p className="relative mt-2 text-sm leading-7 text-[#7C848B]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-[#0A0F14]">
            <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-12 lg:py-12">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">Not sure yet?</p>
                <p className="mt-3 text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "var(--font-heebo)" }}>A free consultation clarifies next steps</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">We&apos;ll review your teen&apos;s history, explain how Adolescent IOP works, and verify insurance — no obligation.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[260px]">
                <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-[#0A0F14] transition hover:bg-white/90">
                  <i className="ri-phone-fill text-[#83B3DC]"></i>
                  {PHONE}
                </a>
                <Link href="/insurance-coverage" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10">
                  Verify insurance
                  <i className="ri-arrow-right-line text-[#83B3DC]"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">How It Works</p>
              <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>From first call to first session</h2>
              <p className="mt-4 text-sm leading-8 text-[#54595F]">Most families complete intake within a few days. We handle insurance verification and scheduling so you can focus on your teen.</p>
            </div>
            <a href={PHONE_HREF} className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-2xl bg-[#0A0F14] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#111111] lg:self-auto">
              <i className="ri-phone-fill text-[#83B3DC]"></i>
              Start with a free call
            </a>
          </div>

          <div className="relative mt-12 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E8EEF4] lg:p-12">
            <div className="absolute left-12 right-12 top-[4.25rem] hidden h-px bg-[#E8EEF4] lg:block" />
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
              {intakeSteps.map((step) => (
                <div key={step.num} className="relative flex flex-col">
                  <div className="relative z-10 mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-[#83B3DC] text-white" style={{ boxShadow: "0 0 0 5px rgba(131,179,220,0.12)" }}>
                    <i className={`${step.icon} text-base`}></i>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]/70">Step {step.num}</p>
                  <h3 className="mt-2 text-lg font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#54595F]">{step.body}</p>
                </div>
              ))}
            </div>
            <div className="lg:hidden">
              {intakeSteps.map((step, i) => (
                <div key={step.num} className="relative flex gap-5 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#83B3DC] text-white" style={{ boxShadow: "0 0 0 5px rgba(131,179,220,0.12)" }}>
                      <i className={`${step.icon} text-base`}></i>
                    </div>
                    {i < intakeSteps.length - 1 && <div className="mt-2 w-px flex-1 min-h-[3rem] bg-[#E8EEF4]" />}
                  </div>
                  <div className="pb-1 pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]/70">Step {step.num}</p>
                    <h3 className="mt-1 text-lg font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#54595F]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-[#7C848B]">
            <i className="ri-time-line mr-1.5 align-middle text-[#83B3DC]"></i>
            Typical time from first call to first session: <span className="font-bold text-[#0A0F14]">24–48 hours</span>
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Why Adolescent IOP</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>More support than standard outpatient</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/8">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 border-b border-white/8 bg-white/[0.03] px-6 py-4">
              <div />
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/30">Weekly therapy</p>
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Adolescent IOP</p>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-white/5 last:border-b-0`}>
                <p className="flex items-center text-xs font-bold uppercase tracking-wider text-white/40">{row.label}</p>
                <p className="flex items-center justify-center text-sm text-white/35">{row.outpatient}</p>
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
            <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>What we treat in Adolescent IOP</h2>
            <p className="mt-4 text-sm leading-8 text-[#54595F]">Our Adolescent IOP is designed for teens ages 12–17 navigating a wide range of emotional and behavioral challenges. Every teen receives an individualized treatment plan.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conditionsServed.map((condition) => (
              <Link key={condition.path} href={condition.path} className="group flex flex-col rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC]/50 p-6 transition hover:border-[#83B3DC]/40 hover:bg-white hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-[#0A0F14] transition group-hover:text-[#83B3DC]" style={{ fontFamily: "var(--font-heebo)" }}>{condition.label}</h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#83B3DC]/50 ring-1 ring-[#E8EEF4] transition group-hover:bg-[#83B3DC] group-hover:text-white group-hover:ring-[#83B3DC]">
                    <i className="ri-arrow-right-line text-sm"></i>
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#7C848B]">{condition.desc}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm leading-7 text-[#7C848B]">
            Not sure if your teen&apos;s diagnosis fits?{" "}
            <a href={PHONE_HREF} className="font-semibold text-[#83B3DC] hover:underline">Call admissions</a>
            {" "}for a free consultation.
          </p>
        </div>
      </section>

      {/* Clinical approach */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Clinical Approach</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Evidence-based care for adolescent mental health</h2>
            </div>
            <p className="max-w-md text-sm leading-8 text-[#54595F] lg:text-right">Licensed clinicians. The same evidence base as in-person IOP — adapted for teens and delivered virtually.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#E8EEF4] bg-white shadow-sm">
            {clinicalApproaches.map((approach, i) => (
              <div key={approach.title} className={`grid gap-6 border-[#F0F4F8] px-8 py-9 lg:grid-cols-[72px_1fr] lg:gap-10 lg:px-12 lg:py-11 ${i > 0 ? "border-t" : ""}`}>
                <p className="text-4xl font-bold leading-none text-[#E8EEF4] lg:pt-1 lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>{approach.num}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#F4F9FC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#83B3DC]">{approach.tag}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#83B3DC]/10 text-[#83B3DC]">
                      <i className={`${approach.icon} text-base`}></i>
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#0A0F14] md:text-2xl" style={{ fontFamily: "var(--font-heebo)" }}>{approach.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-8 text-[#54595F]">{approach.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Questions about Adolescent IOP</h2>
            <p className="mt-4 text-sm leading-8 text-[#54595F]">Answers about what IOP is, how it differs from Virtual IOP, and how to get started.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] transition open:border-[#83B3DC]/35 open:bg-white open:shadow-md open:shadow-[#83B3DC]/5">
                <summary className="flex cursor-pointer list-none items-start gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F9FC] text-xs font-bold text-[#83B3DC] ring-1 ring-[#E8EEF4] transition group-open:bg-[#83B3DC] group-open:text-white group-open:ring-[#83B3DC]" style={{ fontFamily: "var(--font-heebo)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-base font-bold leading-snug text-[#0A0F14] transition group-open:text-[#83B3DC]" style={{ fontFamily: "var(--font-heebo)" }}>{faq.q}</span>
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
                <p className="mt-2 text-xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>Talk to admissions — free and confidential</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
                <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-[#0A0F14] transition hover:bg-white/90">
                  <i className="ri-phone-fill text-[#83B3DC]"></i>
                  {PHONE}
                </a>
                <a href="mailto:admissions@adolescentmentalhealth.com" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5">
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
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heebo)" }}>Give your teen the structure they need</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50">Free consultations are confidential. We will verify insurance and help determine whether Adolescent IOP is the right next step for your teen.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={PHONE_HREF} className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#000000] transition hover:bg-white/90">
              <i className="ri-phone-fill text-[#83B3DC]"></i>
              Call {PHONE}
            </a>
            <Link href="/virtual-iop-for-teens" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5">
              About Virtual IOP
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";
const SB_ROOT =
  "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images";

const IMGS = {
  hero: `${SB_ROOT}/amh_cbt_hero01.jpg`,
  bento: `${SB_ROOT}/amh_cbt_bento01.jpg`,
};

const cbtSkills = [
  {
    num: "01",
    icon: "ri-edit-line",
    tag: "Core skill",
    title: "Thought challenging",
    body: "Teens learn to identify automatic negative thoughts, examine the evidence behind them, and build more balanced beliefs — a foundation for reducing anxiety, depression, and rumination.",
    bullets: ["Thought records and journaling", "Identifying cognitive distortions", "Building realistic alternative thoughts"],
  },
  {
    num: "02",
    icon: "ri-walk-line",
    tag: "Core skill",
    title: "Behavioral activation",
    body: "When depression drains motivation, behavioral activation helps teens re-engage with activities, routines, and relationships — gradually rebuilding momentum and positive mood.",
    bullets: ["Activity scheduling and mood tracking", "Identifying avoided situations", "Values-based activity planning"],
  },
  {
    num: "03",
    icon: "ri-route-line",
    tag: "Core skill",
    title: "Exposure and response prevention",
    body: "For anxiety, OCD, and avoidance, graduated exposure allows teens to face feared situations with therapist support — reducing the anxiety response over time.",
    bullets: ["Personalized fear hierarchies", "Step-by-step exposure practice", "School and social re-entry plans"],
  },
  {
    num: "04",
    icon: "ri-parent-line",
    tag: "Family integration",
    title: "Parent training and coaching",
    body: "Caregivers learn how to respond to avoidance, reinforce skill use at home, and avoid accommodation behaviors that maintain anxiety or depression.",
    bullets: ["Understanding CBT concepts as a parent", "Responding to avoidance effectively", "Communication and limit-setting skills"],
  },
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
  { label: "Anxiety & panic", path: "/conditions/anxiety", desc: "CBT is the gold-standard treatment for generalized anxiety, social anxiety, and panic disorder in adolescents." },
  { label: "Depression", path: "/conditions/depression", desc: "Behavioral activation and cognitive restructuring target the thought patterns and withdrawal that maintain depression." },
  { label: "OCD", path: "/conditions/anxiety", desc: "Exposure and response prevention (ERP) — a CBT approach — is the most effective treatment for obsessive-compulsive patterns." },
  { label: "Trauma & PTSD", path: "/conditions/trauma-ptsd", desc: "Trauma-focused CBT (TF-CBT) is an evidence-based adaptation specifically for teens with trauma histories." },
  { label: "School avoidance", path: "/conditions/school-avoidance", desc: "CBT's graduated exposure approach is central to school refusal and avoidance treatment plans." },
  { label: "ADHD & executive function", path: "/conditions/adhd", desc: "CBT skills support organization, time management, and emotional regulation for teens with ADHD." },
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
    <main style={{ fontFamily: "var(--font-montserrat)" }}>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E8EEF4] bg-[#F0F4F8]">
        <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-[#83B3DC]/15 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#83B3DC]/8 blur-[90px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #83B3DC 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative px-6 pb-16 pt-28 lg:px-10 lg:pb-24 lg:pt-32">
          <div className="mx-auto max-w-[1350px]">
            <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#83B3DC]/25 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#83B3DC] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#83B3DC]" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#54595F]">Online CBT · Ages 12–17</span>
                </div>
                <h1 className="mt-7 text-[2.75rem] font-bold leading-[1.02] tracking-tight text-[#0A0F14] sm:text-5xl lg:text-[4.25rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  Online CBT{" "}
                  <span className="text-[#83B3DC]">that changes how your teen thinks and copes</span>
                </h1>
                <p className="mt-6 max-w-lg text-base leading-8 text-[#54595F]">
                  Cognitive Behavioral Therapy teaches adolescents to challenge unhelpful thoughts, reduce avoidance, and
                  practice healthier responses — delivered online by licensed clinicians.
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
                    { icon: "ri-brain-line", label: "Evidence-based" },
                    { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
                    { icon: "ri-shield-check-line", label: "Licensed clinicians" },
                    { icon: "ri-time-line", label: "Structured & goal-focused" },
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
                  <Image src={IMGS.hero} alt="Teen working through CBT thought log exercises at desk" fill className="object-cover object-center" priority quality={90} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 540px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14]/25 via-transparent to-transparent" />
                </div>
                <div className="absolute -left-2 bottom-6 z-10 rounded-2xl bg-white/95 px-5 py-4 shadow-xl ring-1 ring-[#E8EEF4] backdrop-blur-md sm:-left-6 sm:bottom-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Research support</p>
                  <p className="mt-1 text-xl font-bold leading-snug text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>Gold-standard<br /><span className="text-[#7C848B] text-base font-semibold">for anxiety & depression</span></p>
                </div>
                <div className="absolute -right-1 top-4 z-10 hidden rounded-2xl bg-[#0A0F14] px-4 py-3 shadow-xl sm:block lg:-right-4 lg:top-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#83B3DC]/20 text-[#83B3DC]">
                      <i className="ri-brain-line text-base"></i>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Modality</p>
                      <p className="text-xs font-bold text-white">CBT-based</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is online CBT */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-3 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E8EEF4] lg:p-12">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">What Is Online CBT?</p>
                <h2 className="text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  A structured, skills-based approach to adolescent mental health
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-8 text-[#54595F]">
                  Cognitive Behavioral Therapy is not open-ended talk therapy. It is a time-limited, goal-oriented
                  approach that teaches teens to recognize and change the thought patterns driving anxiety, depression,
                  and avoidance — then practice new responses in real life.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-8 text-[#7C848B]">
                  Online CBT works the same way as in-person — individual sessions with a licensed clinician, structured
                  homework between appointments, and clear progress toward specific goals. In our Virtual IOP, CBT is
                  reinforced across individual and group therapy sessions.
                </p>
              </div>
              <div className="mt-10 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] p-6 lg:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">What makes CBT different</p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Sessions", detail: "Structured with an agenda", highlight: false },
                    { label: "Between sessions", detail: "Homework & skill practice", highlight: true },
                    { label: "Goal", detail: "Measurable change in thoughts & behavior", highlight: false },
                  ].map((item) => (
                    <div key={item.label} className={`rounded-xl px-4 py-4 ${item.highlight ? "border-2 border-[#83B3DC] bg-white shadow-md shadow-[#83B3DC]/10" : "border border-[#E8EEF4] bg-white/60"}`}>
                      <p className={`text-xs font-bold uppercase tracking-wider ${item.highlight ? "text-[#83B3DC]" : "text-[#7C848B]"}`}>{item.label}</p>
                      <p className="mt-2 text-sm font-bold leading-snug text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:h-full">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-3xl ring-1 ring-[#E8EEF4]">
                <Image src={IMGS.bento} alt="Teen practicing mindfulness and CBT awareness exercises in bedroom" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 400px" />
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-[#E8EEF4]">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#83B3DC]/15 text-[#83B3DC]">
                    <i className="ri-home-heart-line text-lg"></i>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0A0F14]">Skills teens use outside of sessions</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#7C848B]">Thought records, behavioral experiments, and coping tools that transfer to school and home.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { icon: "ri-medal-line", value: "40+ years", label: "Of research support" },
              { icon: "ri-focus-2-line", value: "Goal-based", label: "Measurable outcomes" },
              { icon: "ri-calendar-check-line", value: "12–20 wks", label: "Typical course" },
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

      {/* CBT Skills — dark section */}
      <section className="relative overflow-hidden bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#83B3DC]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#83B3DC]/5 blur-[80px]" />
        <div className="relative mx-auto max-w-[1350px]">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Core CBT Skills</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>What teens learn and practice</h2>
            <p className="mt-4 text-sm leading-8 text-white/50">Each skill builds on the last — teens leave treatment with a toolkit they can apply independently to new challenges.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            {cbtSkills.map((skill, i) => (
              <div key={skill.title} className={`grid gap-6 px-8 py-9 lg:grid-cols-[72px_1fr] lg:gap-10 lg:px-12 lg:py-11 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}>
                <p className="text-4xl font-bold leading-none text-white/[0.07] lg:pt-1 lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>{skill.num}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[#83B3DC]/25 bg-[#83B3DC]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#83B3DC]">{skill.tag}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[#83B3DC]">
                      <i className={`${skill.icon} text-base`}></i>
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white md:text-2xl" style={{ fontFamily: "var(--font-heebo)" }}>{skill.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-8 text-white/55">{skill.body}</p>
                  <ul className="mt-5 space-y-2">
                    {skill.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-white/35">
                        <i className="ri-check-line mt-0.5 shrink-0 text-[#83B3DC]"></i>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is it right */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Is It Right for Us?</p>
              <h2 className="mt-3 text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>Signs CBT may be the right fit</h2>
              <p className="mt-4 text-sm leading-8 text-[#54595F]">CBT works best for specific presentations — our team will confirm fit during a free initial consultation.</p>
              <div className="mt-8 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Good to know</p>
                <p className="mt-2 text-sm leading-7 text-[#54595F]">For teens who need more than once-weekly therapy, CBT is woven throughout our Virtual IOP — delivered across individual and group sessions multiple days per week.</p>
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
                <p className="mt-3 text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "var(--font-heebo)" }}>Let&apos;s talk through what your teen is dealing with</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">We will help you understand whether CBT alone, CBT within Virtual IOP, or a different approach is clinically appropriate — with no pressure to enroll.</p>
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
              <p className="mt-4 text-sm leading-8 text-[#54595F]">Most families complete intake within a few days. We handle insurance and recommend the right level of care — CBT outpatient or within Virtual IOP.</p>
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
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Why CBT</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Structured care with measurable outcomes</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/8">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 border-b border-white/8 bg-white/[0.03] px-6 py-4">
              <div />
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/30">Generic therapy</p>
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Online CBT</p>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-white/5 last:border-b-0`}>
                <p className="flex items-center text-xs font-bold uppercase tracking-wider text-white/40">{row.label}</p>
                <p className="flex items-center justify-center text-sm text-white/35">{row.generic}</p>
                <p className="flex items-center justify-center text-sm font-semibold text-white">{row.cbt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Conditions Treated</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>What CBT treats in adolescents</h2>
            <p className="mt-4 text-sm leading-8 text-[#54595F]">CBT has the strongest research evidence across a wide range of adolescent mental health presentations. Your teen receives an individualized plan targeting their specific patterns.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conditionsServed.map((condition) => (
              <Link key={condition.label} href={condition.path} className="group flex flex-col rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC]/50 p-6 transition hover:border-[#83B3DC]/40 hover:bg-white hover:shadow-md">
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
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Questions about Online CBT</h2>
            <p className="mt-4 text-sm leading-8 text-[#54595F]">Straight answers about how CBT works, what it treats, and how it fits into adolescent mental health care.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group rounded-2xl border border-[#E8EEF4] bg-white transition open:border-[#83B3DC]/35 open:shadow-md open:shadow-[#83B3DC]/5">
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#83B3DC]/8 blur-[100px]" />
        <div className="relative mx-auto max-w-[1350px] text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Get started</p>
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heebo)" }}>Give your teen tools that actually work</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50">Free consultation, no obligation. We will recommend the right level of CBT care — individual outpatient or within our Virtual IOP — and verify insurance before enrollment.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={PHONE_HREF} className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#000000] transition hover:bg-white/90">
              <i className="ri-phone-fill text-[#83B3DC]"></i>
              Call {PHONE}
            </a>
            <Link href="/virtual-iop-for-teens" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5">
              See our Virtual IOP
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

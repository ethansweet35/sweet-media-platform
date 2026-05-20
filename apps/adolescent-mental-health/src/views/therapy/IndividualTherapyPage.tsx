import Image from "next/image";
import Link from "next/link";

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";
const SB_ROOT =
  "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images";

const IMGS = {
  hero: `${SB_ROOT}/amh_indiv_hero01.jpg`,
  bento: `${SB_ROOT}/amh_indiv_bento01.jpg`,
};

const sessionPhases = [
  {
    num: "01",
    icon: "ri-user-heart-line",
    title: "Building rapport",
    body: "The first sessions are about trust — your teen's clinician learns their history, communication style, and what they want from therapy. No pressure to perform or disclose everything at once.",
    bullets: ["Low-pressure, relationship-first approach", "Clinician matched by clinical fit, not availability", "Clear expectations set from session one"],
  },
  {
    num: "02",
    icon: "ri-focus-3-line",
    title: "Assessment & goal setting",
    body: "Once rapport is established, the clinician conducts a structured assessment and collaborates with your teen to define specific, measurable therapy goals — not vague intentions.",
    bullets: ["Formal clinical assessment of presenting concerns", "Teen-driven goal setting", "Goals shared with the broader care team"],
  },
  {
    num: "03",
    icon: "ri-tools-line",
    title: "Skills & processing work",
    body: "The active phase of therapy: building coping skills, processing difficult experiences, challenging distorted thinking, and practicing new behaviors between sessions.",
    bullets: ["CBT thought records and behavioral experiments", "DBT emotion regulation and distress tolerance", "Between-session practice assignments"],
  },
  {
    num: "04",
    icon: "ri-refresh-line",
    title: "Progress review & adjustment",
    body: "Regular check-ins ensure the treatment plan stays calibrated. If a teen's needs shift or goals are met, the clinician adjusts the focus — nothing is set-it-and-forget-it.",
    bullets: ["Weekly progress monitoring", "Coordination with group and family clinicians", "Plan updated as symptoms and goals evolve"],
  },
];

const fitCriteria = [
  { icon: "ri-emotion-sad-line", label: "Persistent anxiety or depression", sub: "Symptoms that haven't improved with lower levels of support" },
  { icon: "ri-chat-private-line", label: "Needs a private, one-on-one space", sub: "Topics too sensitive to address in a group setting first" },
  { icon: "ri-history-line", label: "Processing past trauma or difficult events", sub: "Experiences that require a trauma-informed relational approach" },
  { icon: "ri-links-line", label: "Part of a Virtual IOP treatment plan", sub: "Individual sessions are a core component of every IOP track" },
  { icon: "ri-seedling-line", label: "Building foundational coping skills", sub: "Learning techniques that transfer to school, home, and relationships" },
];

const approaches = [
  {
    icon: "ri-brain-line",
    tag: "Core modality",
    title: "Cognitive Behavioral Therapy (CBT)",
    body: "CBT helps teens recognize the link between thoughts, feelings, and behaviors. In individual sessions, clinicians use thought records, behavioral experiments, and structured practice to shift unhelpful patterns driving anxiety and depression.",
  },
  {
    icon: "ri-heart-pulse-line",
    tag: "Core modality",
    title: "Dialectical Behavior Therapy (DBT)",
    body: "DBT skills — emotion regulation, distress tolerance, interpersonal effectiveness, mindfulness — are introduced in individual sessions and reinforced in group. Particularly effective for self-harm, mood instability, and intense emotional reactivity.",
  },
  {
    icon: "ri-shield-check-line",
    tag: "Specialized track",
    title: "Trauma-informed care",
    body: "For teens processing trauma, PTSD, or adverse experiences, individual therapy provides the safety and relational consistency that trauma processing requires. Clinicians are trained in trauma-sensitive approaches and pace work carefully.",
  },
  {
    icon: "ri-compass-3-line",
    tag: "Supplemental",
    title: "Acceptance & Commitment Therapy (ACT)",
    body: "ACT helps teens clarify their values and commit to behaviors aligned with who they want to be — even in the presence of difficult thoughts or feelings. Especially useful for chronic anxiety, perfectionism, and avoidance.",
  },
];

const iopContext = [
  {
    icon: "ri-user-line",
    label: "Individual sessions",
    cadence: "2–3× per week",
    desc: "Private one-on-one work with your teen's primary clinician — the relational anchor of the program.",
    active: true,
  },
  {
    icon: "ri-group-line",
    label: "Group therapy",
    cadence: "3–4× per week",
    desc: "Small peer groups for skills practice, peer support, and real-world connection.",
    active: false,
  },
  {
    icon: "ri-home-heart-line",
    label: "Family therapy",
    cadence: "1–2× per week",
    desc: "Caregiver coaching and structured family sessions to reinforce progress at home.",
    active: false,
  },
];

const faqs = [
  { q: "How many individual therapy sessions does my teen get per week?", a: "In our Virtual IOP, teens typically receive 2–3 individual therapy sessions per week alongside 3–4 group sessions and 1–2 family sessions. Individual frequency may adjust based on clinical need and phase of treatment." },
  { q: "How do you match my teen with the right therapist?", a: "We match based on clinical presentation, therapy style, and your teen's specific needs — including identity, cultural background, and the nature of their primary concerns. We prioritize genuine therapeutic fit over schedule convenience." },
  { q: "Can my teen request a different therapist if it's not a good fit?", a: "Yes. Therapeutic fit matters, and we take it seriously. If your teen doesn't feel connected to their clinician after a few sessions, we facilitate a rematch within our team without disruption to the rest of their program." },
  { q: "Are individual sessions confidential?", a: "Yes, with standard limits. Content shared in individual sessions is protected by HIPAA and standard confidentiality rules — with exceptions for safety concerns (self-harm, harm to others, child abuse). We explain this clearly at intake." },
  { q: "What does a typical individual session look like?", a: "Sessions are 45–50 minutes via secure HIPAA-compliant video. Early sessions focus on rapport and assessment. Active treatment sessions involve skills practice, thought challenging, or processing difficult experiences, followed by a between-session assignment." },
  { q: "Do parents have access to what's discussed in individual sessions?", a: "Not by default — teen confidentiality is foundational to therapeutic trust. However, clinicians will share safety-relevant information and general progress with caregivers, and family sessions provide a space for caregiver involvement in a structured way." },
];

export default function IndividualTherapyPage() {
  return (
    <main style={{ fontFamily: "var(--font-montserrat)" }}>

      {/* ── 1. Full-bleed dark hero ── */}
      <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
        <Image
          src={IMGS.hero}
          alt="Teen in a virtual one-on-one therapy session at home"
          fill
          className="object-cover object-[center_40%]"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-transparent" />

        <div className="relative z-10 mt-auto w-full px-6 pb-16 pt-24 lg:px-10 lg:pb-20">
          <div className="mx-auto max-w-[1350px]">

            {/* Eyebrow */}
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
              Individual Therapy · Ages 12–17
            </p>

            <h1
              className="max-w-3xl text-4xl font-bold leading-[1.06] text-white sm:text-5xl lg:text-6xl xl:text-[5rem]"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              Individual therapy for teens,{" "}
              <span className="text-[#83B3DC]">matched to how your teen thinks</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-white/65">
              One-on-one sessions with a licensed clinician who builds real rapport — the relational core of every Virtual IOP treatment plan.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#000000] shadow-xl transition hover:bg-white/90"
              >
                <i className="ri-phone-fill text-base"></i>
                Free Consultation — {PHONE}
              </a>
              <Link
                href="/virtual-iop-for-teens"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/8"
              >
                About Virtual IOP
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Inline stat chips */}
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              {[
                { icon: "ri-calendar-check-line", label: "2–3 sessions / week" },
                { icon: "ri-brain-line",           label: "CBT & DBT trained" },
                { icon: "ri-shield-check-line",    label: "Insurance accepted" },
                { icon: "ri-lock-line",            label: "HIPAA compliant" },
              ].map((c) => (
                <span key={c.label} className="flex items-center gap-2 text-xs font-semibold text-white/50">
                  <i className={`${c.icon} text-[#83B3DC] text-sm`}></i>
                  {c.label}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Stats band ── */}
      <section className="border-b border-[#E8EEF4] bg-white px-6 py-0 lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid grid-cols-2 divide-x divide-[#E8EEF4] lg:grid-cols-4">
            {[
              { value: "2–3×",        unit: "per week",           label: "Individual sessions" },
              { value: "45 min",      unit: "per session",        label: "Session length" },
              { value: "CBT + DBT",   unit: "evidence-based",     label: "Primary modalities" },
              { value: "Insurance",   unit: "most major plans",   label: "Coverage accepted" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-6 py-8 lg:px-10">
                <p
                  className="text-3xl font-bold text-[#0A0F14] lg:text-4xl"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  {s.value}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#83B3DC]">{s.unit}</p>
                <p className="mt-1 text-xs text-[#7C848B]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Editorial prose section ── */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">

          {/* Section header */}
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
                One-on-one care
              </p>
              <h2
                className="text-4xl font-bold leading-[1.08] text-[#0A0F14] md:text-5xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                What happens in<br className="hidden lg:block" /> individual therapy?
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-8 text-[#7C848B] lg:text-right">
              Not just talking — structured clinical work with a consistent clinician, a clear arc, and measurable goals.
            </p>
          </div>

          {/* Two-column prose */}
          <div className="grid gap-6 lg:grid-cols-2">
            <p className="text-sm leading-8 text-[#54595F]">
              Individual therapy gives your teen a private, consistent relationship with one licensed clinician — a space to speak openly, process difficult experiences, and build skills that work in real life. It is the relational anchor of our Virtual IOP model, not an afterthought bolted onto group sessions.
            </p>
            <p className="text-sm leading-8 text-[#54595F]">
              Unlike weekly outpatient therapy, individual sessions within IOP happen 2–3 times per week. That frequency changes everything: progress doesn&apos;t stall between appointments, clinicians catch early warning signs quickly, and teens build skills through repetition rather than relying on one session to carry the whole week.
            </p>
          </div>

          {/* Pullquote */}
          <div className="my-12 border-l-4 border-[#83B3DC] bg-[#F0F4F8] px-8 py-8 lg:px-12 lg:py-10">
            <p className="text-lg font-semibold italic leading-9 text-[#0A0F14] lg:text-xl">
              &ldquo;Therapeutic fit matters more than credentials alone. A teen who trusts their clinician will do the work — and teens who do the work get better.&rdquo;
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-[#83B3DC]">
              Adolescent Mental Health — Clinical Philosophy
            </p>
          </div>

          {/* Third prose paragraph + image side by side */}
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-center">
            <div>
              <p className="text-sm leading-8 text-[#54595F]">
                Every clinician on our team is licensed, trained in adolescent-specific approaches, and matched to your teen based on clinical fit — not schedule availability. If the match isn&apos;t right after the first few sessions, we re-match without disrupting the rest of the program.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#0A0F14] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#111111]"
                >
                  <i className="ri-phone-fill text-[#83B3DC]"></i>
                  Free Consultation
                </a>
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-full border border-[#CBE6EC] px-7 py-3.5 text-sm font-semibold text-[#0A0F14] transition hover:border-[#83B3DC]"
                >
                  Start Intake
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={IMGS.bento}
                alt="Teen connecting with their individual therapist on a laptop screen"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. Chapter timeline ── */}
      <section className="bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">

          <div className="mb-16">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
              Session structure
            </p>
            <h2
              className="text-4xl font-bold text-white md:text-5xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              What to expect in sessions
            </h2>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Connecting rail */}
            <div className="absolute bottom-0 left-[1.75rem] top-0 hidden w-px bg-white/8 lg:block" />

            <div className="flex flex-col gap-0">
              {sessionPhases.map((phase, i) => (
                <div
                  key={phase.num}
                  className={`relative grid grid-cols-1 gap-8 py-10 lg:grid-cols-[4rem_1fr_1fr] lg:gap-12 ${i < sessionPhases.length - 1 ? "border-b border-white/6" : ""}`}
                >
                  {/* Step node + number */}
                  <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:gap-0">
                    <div
                      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#83B3DC]/10"
                      style={{ border: "1px solid rgba(131,179,220,0.2)" }}
                    >
                      <i className={`${phase.icon} text-xl text-[#83B3DC]`}></i>
                    </div>
                    <p
                      className="mt-2 hidden text-[11px] font-bold uppercase tracking-[0.2em] text-white/20 lg:block"
                      style={{ fontFamily: "var(--font-heebo)" }}
                    >
                      {phase.num}
                    </p>
                    {/* Mobile: inline number */}
                    <p className="self-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 lg:hidden">
                      Step {phase.num}
                    </p>
                  </div>

                  {/* Title + body */}
                  <div>
                    <h3
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "var(--font-heebo)" }}
                    >
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-sm leading-8 text-white/55">{phase.body}</p>
                  </div>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-3 lg:pt-1">
                    {phase.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#83B3DC]/15">
                          <i className="ri-check-line text-[9px] text-[#83B3DC]"></i>
                        </span>
                        <span className="text-sm leading-6 text-white/50">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. Two-column checklist ── */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">

            {/* Left — header */}
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
                Good fit
              </p>
              <h2
                className="text-4xl font-bold leading-tight text-[#0A0F14] md:text-5xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                Who benefits from individual therapy?
              </h2>
              <p className="mt-5 text-sm leading-8 text-[#54595F]">
                Individual sessions are well-suited to teens who need a private, consistent therapeutic relationship as the foundation of their care.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#0A0F14] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#111111]"
              >
                <i className="ri-phone-fill text-[#83B3DC]"></i>
                Ask our admissions team
              </a>
            </div>

            {/* Right — clean visual list */}
            <div>
              {fitCriteria.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-start gap-5 py-7 ${i > 0 ? "border-t border-[#E8EEF4]" : ""}`}
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#83B3DC] shadow-sm ring-1 ring-[#E8EEF4]">
                    <i className={`${item.icon} text-lg`}></i>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0A0F14]">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-[#7C848B]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. Approach icon strip ── */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">

          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
                Clinical methods
              </p>
              <h2
                className="text-4xl font-bold leading-tight text-[#0A0F14] md:text-5xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                Approaches we use<br className="hidden lg:block" /> in individual sessions
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-8 text-[#7C848B] lg:text-right">
              Clinicians draw from evidence-based modalities and adapt to your teen&apos;s specific presentation.
            </p>
          </div>

          <div className="divide-y divide-[#E8EEF4] border-y border-[#E8EEF4]">
            {approaches.map((a) => (
              <div
                key={a.title}
                className="grid grid-cols-1 gap-6 py-8 transition hover:bg-[#F0F4F8] lg:grid-cols-[5rem_1fr_2fr] lg:items-center lg:px-6"
              >
                {/* Large icon */}
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0F4F8] text-[#83B3DC] transition group-hover:bg-[#83B3DC]/15">
                  <i className={`${a.icon} text-2xl`}></i>
                </span>

                {/* Title + tag */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#83B3DC]/70">{a.tag}</p>
                  <h3
                    className="mt-1 text-lg font-bold text-[#0A0F14]"
                    style={{ fontFamily: "var(--font-heebo)" }}
                  >
                    {a.title}
                  </h3>
                </div>

                {/* Prose */}
                <p className="text-sm leading-8 text-[#54595F]">{a.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. IOP context band ── */}
      <section className="bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">

          <div className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
              The full picture
            </p>
            <h2
              className="text-4xl font-bold text-white md:text-5xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              Individual therapy within Virtual IOP
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/45">
              Individual sessions don&apos;t exist in isolation. All three modalities coordinate around the same clinical goals.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {iopContext.map((item) => (
              <div
                key={item.label}
                className={`rounded-3xl p-8 ${
                  item.active
                    ? "ring-2 ring-[#83B3DC]/40"
                    : ""
                }`}
                style={{
                  background: item.active ? "rgba(131,179,220,0.07)" : "rgba(255,255,255,0.03)",
                  border: item.active ? undefined : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      item.active ? "bg-[#83B3DC]/15 text-[#83B3DC]" : "bg-white/5 text-white/30"
                    }`}
                  >
                    <i className={`${item.icon} text-xl`}></i>
                  </span>
                  {item.active && (
                    <span className="rounded-full bg-[#83B3DC]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#83B3DC]">
                      This page
                    </span>
                  )}
                </div>

                <h3
                  className={`mt-6 text-lg font-bold ${item.active ? "text-white" : "text-white/50"}`}
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  {item.label}
                </h3>
                <p className={`mt-1 text-sm font-semibold ${item.active ? "text-[#83B3DC]" : "text-white/25"}`}>
                  {item.cadence}
                </p>
                <p className={`mt-3 text-sm leading-7 ${item.active ? "text-white/60" : "text-white/30"}`}>
                  {item.desc}
                </p>

                {!item.active && (
                  <Link
                    href={item.label === "Group therapy" ? "/therapy/group-therapy-with-adolescents" : "/therapy/adolescent-family-therapy"}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/30 transition hover:text-white/60"
                  >
                    Learn more <i className="ri-arrow-right-line"></i>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/virtual-iop-for-teens"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/60 transition hover:border-white/30 hover:text-white"
            >
              See the full Virtual IOP model
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

        </div>
      </section>

      {/* ── 8. Centered FAQ ── */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-3xl">

          <div className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">FAQ</p>
            <h2
              className="text-4xl font-bold leading-tight text-[#0A0F14] md:text-5xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              Questions about individual therapy
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-[#54595F]">
              Still have questions? Our admissions team is available 7 days a week.
            </p>
          </div>

          <div className="divide-y divide-[#E8EEF4] rounded-2xl bg-white shadow-sm ring-1 ring-[#E8EEF4]">
            {faqs.map((faq, i) => (
              <details key={i} className="group px-8 py-0">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6">
                  <span
                    className="text-base font-bold text-[#0A0F14] transition-colors group-open:text-[#83B3DC]"
                    style={{ fontFamily: "var(--font-heebo)" }}
                  >
                    {faq.q}
                  </span>
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F0F4F8] text-[#83B3DC] transition group-open:bg-[#83B3DC] group-open:text-white">
                    <i className="ri-add-line text-sm group-open:hidden"></i>
                    <i className="ri-subtract-line text-sm hidden group-open:block"></i>
                  </span>
                </summary>
                <p className="pb-6 text-sm leading-8 text-[#54595F]">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#0A0F14] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#111111]"
            >
              <i className="ri-phone-fill text-[#83B3DC]"></i>
              {PHONE}
            </a>
            <a
              href="mailto:admissions@adolescentmentalhealth.com"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#CBE6EC] bg-white px-7 py-3.5 text-sm font-semibold text-[#54595F] transition hover:border-[#83B3DC] hover:text-[#0A0F14]"
            >
              <i className="ri-mail-line text-[#83B3DC]"></i>
              Email Admissions
            </a>
          </div>

        </div>
      </section>

      {/* ── 9. Centered CTA ── */}
      <section className="relative overflow-hidden bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#83B3DC]/6 blur-[140px]" />

        <div className="relative mx-auto max-w-2xl text-center">

          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
            Get started today
          </p>

          <h2
            className="text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-heebo)" }}
          >
            Your teen deserves a clinician<br />
            <span className="text-[#83B3DC]">who really gets them.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-sm leading-8 text-white/50">
            One-on-one therapy, matched by clinical fit, delivered virtually 2–3 times per week as part of a comprehensive IOP plan.
          </p>

          {/* Big phone number */}
          <a
            href={PHONE_HREF}
            className="mt-12 block text-4xl font-bold tracking-tight text-white transition hover:text-[#83B3DC] lg:text-5xl"
            style={{ fontFamily: "var(--font-heebo)" }}
          >
            {PHONE}
          </a>
          <p className="mt-2 text-xs font-semibold text-white/30 uppercase tracking-[0.15em]">
            Free · Confidential · No obligation
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0A0F14] shadow-xl transition hover:bg-white/90"
            >
              <i className="ri-phone-fill text-[#83B3DC]"></i>
              Call Now
            </a>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Start Online Intake
              <i className="ri-arrow-right-line text-[#83B3DC]"></i>
            </Link>
          </div>

          {/* Trust chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              { icon: "ri-shield-check-line", label: "HIPAA Compliant" },
              { icon: "ri-time-line",          label: "Same-Week Intake" },
              { icon: "ri-user-heart-line",    label: "Matched by Fit" },
              { icon: "ri-bank-card-line",     label: "Insurance Accepted" },
            ].map((t) => (
              <span key={t.label} className="flex items-center gap-2 text-xs font-semibold text-white/35">
                <i className={`${t.icon} text-[#83B3DC] text-sm`}></i>
                {t.label}
              </span>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";
const SB_ROOT =
  "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images";

const IMGS = {
  hero: `${SB_ROOT}/amh_insomnia_hero01.jpg`,
  bento: `${SB_ROOT}/amh_insomnia_bento01.jpg`,
};

const treatmentPillars = [
  { num: "01", icon: "ri-moon-line", tag: "Sleep structure", title: "Sleep schedule & stimulus control", body: "Consistent wake times, sleep restriction protocols, and stimulus control techniques that rebuild the brain's association between bed and sleep — not anxiety or rumination.", bullets: ["Personalized sleep window guidance", "Consistent anchor wake time", "Reducing time in bed awake"] },
  { num: "02", icon: "ri-brain-line", tag: "Cognitive work", title: "Addressing worry and sleep anxiety", body: "CBT-based techniques for identifying catastrophic sleep thoughts, testing unhelpful beliefs about sleep, and building more realistic expectations that reduce bedtime anxiety.", bullets: ["Sleep-specific thought records", "Decatastrophizing sleep loss", "Reducing pre-sleep hyperarousal"] },
  { num: "03", icon: "ri-phone-off-line", tag: "Behavioral strategies", title: "Screen, device, and routine guidance", body: "Adolescent sleep is deeply affected by device use, social media, and irregular schedules. We help families create practical routines that are realistic for teens — not just idealized recommendations.", bullets: ["Evidence-based wind-down routines", "Blue light and device timing guidance", "Weekend schedule management"] },
  { num: "04", icon: "ri-parent-line", tag: "Family integration", title: "Parent coaching and household support", body: "Caregivers play a major role in adolescent sleep. We coach parents on how to respond to nighttime distress, morning refusal, and the family patterns that inadvertently maintain insomnia.", bullets: ["Understanding accommodation vs. support", "Morning routine and school readiness", "Managing conflict around sleep"] },
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
  { label: "Anxiety & panic", path: "/conditions/anxiety", desc: "Anxiety is the most common driver of teen insomnia — treating anxiety often resolves sleep difficulties simultaneously." },
  { label: "Depression", path: "/conditions/depression", desc: "Depression disrupts sleep architecture — early waking and hypersomnia are both common presentations we address clinically." },
  { label: "School avoidance", path: "/conditions/school-avoidance", desc: "Sleep disruption and school refusal are frequently interlinked — our treatment addresses both as part of an integrated plan." },
  { label: "ADHD", path: "/conditions/adhd", desc: "ADHD and sleep problems co-occur at high rates — stimulant timing, routine structure, and wind-down strategies are key." },
  { label: "Trauma & PTSD", path: "/conditions/trauma-ptsd", desc: "Trauma frequently manifests as nighttime hyperarousal and nightmares — trauma-informed sleep care addresses both." },
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
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#54595F]">Teen Insomnia Treatment · Ages 12–17</span>
                </div>
                <h1 className="mt-7 text-[2.75rem] font-bold leading-[1.02] tracking-tight text-[#0A0F14] sm:text-5xl lg:text-[4.25rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  Teen insomnia treatment{" "}
                  <span className="text-[#83B3DC]">that addresses sleep and mental health together</span>
                </h1>
                <p className="mt-6 max-w-lg text-base leading-8 text-[#54595F]">
                  Teen insomnia rarely exists alone. Our clinicians treat sleep disruption alongside anxiety, depression,
                  and school avoidance — with CBT-informed approaches that produce lasting results.
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
                    { icon: "ri-moon-line", label: "Sleep + mood together" },
                    { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
                    { icon: "ri-parent-line", label: "Family coaching" },
                    { icon: "ri-shield-check-line", label: "Licensed clinicians" },
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
                  <Image src={IMGS.hero} alt="Teen establishing a healthy screen-free evening routine before sleep" fill className="object-cover object-center" priority quality={90} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 540px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14]/25 via-transparent to-transparent" />
                </div>
                <div className="absolute -left-2 bottom-6 z-10 rounded-2xl bg-white/95 px-5 py-4 shadow-xl ring-1 ring-[#E8EEF4] backdrop-blur-md sm:-left-6 sm:bottom-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Approach</p>
                  <p className="mt-1 text-xl font-bold leading-snug text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>CBT-I informed<br /><span className="text-base font-semibold text-[#7C848B]">sleep + mood</span></p>
                </div>
                <div className="absolute -right-1 top-4 z-10 hidden rounded-2xl bg-[#0A0F14] px-4 py-3 shadow-xl sm:block lg:-right-4 lg:top-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#83B3DC]/20 text-[#83B3DC]">
                      <i className="ri-moon-line text-base"></i>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Focus</p>
                      <p className="text-xs font-bold text-white">Sleep + mental health</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is insomnia treatment */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-3 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E8EEF4] lg:p-12">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">What Is Teen Insomnia Treatment?</p>
                <h2 className="text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  Treating sleep and the mental health driving it
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-8 text-[#54595F]">
                  Sleep hygiene tips rarely fix adolescent insomnia. Clinical insomnia treatment addresses the behavioral
                  patterns, anxious thoughts, and irregular schedules that maintain poor sleep — plus the anxiety or
                  depression that almost always co-occurs.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-8 text-[#7C848B]">
                  Our approach uses CBT-informed techniques (CBT-I) delivered within a broader adolescent mental health
                  framework — so your teen&apos;s sleep improves as part of overall recovery, not in isolation.
                </p>
              </div>
              <div className="mt-10 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] p-6 lg:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">The insomnia–anxiety–mood cycle</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  {[
                    { label: "Poor sleep", detail: "Worsens anxiety & mood", dir: "→" },
                    { label: "Anxiety & depression", detail: "Disrupts sleep further", dir: "→" },
                    { label: "Our approach", detail: "Treats both simultaneously", highlight: true },
                  ].map((item, i) => (
                    <div key={item.label} className="flex flex-1 items-center gap-2">
                      <div className={`flex-1 rounded-xl px-4 py-4 ${(item as { highlight?: boolean }).highlight ? "border-2 border-[#83B3DC] bg-white shadow-md shadow-[#83B3DC]/10" : "border border-[#E8EEF4] bg-white/60"}`}>
                        <p className={`text-xs font-bold uppercase tracking-wider ${(item as { highlight?: boolean }).highlight ? "text-[#83B3DC]" : "text-[#7C848B]"}`}>{item.label}</p>
                        <p className="mt-1 text-sm font-semibold leading-snug text-[#0A0F14]">{item.detail}</p>
                      </div>
                      {i < 2 && <span className="shrink-0 text-[#83B3DC] font-bold hidden sm:block">{item.dir}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:h-full">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-3xl ring-1 ring-[#E8EEF4]">
                <Image src={IMGS.bento} alt="Teen writing in sleep diary at morning desk with tea nearby" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 400px" />
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-[#E8EEF4]">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#83B3DC]/15 text-[#83B3DC]">
                    <i className="ri-bar-chart-line text-lg"></i>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0A0F14]">Sleep logs track progress objectively</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#7C848B]">Daily sleep diaries guide treatment adjustments and help teens see real improvement over weeks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { icon: "ri-moon-line", value: "CBT-I", label: "Evidence-based approach" },
              { icon: "ri-links-line", value: "Integrated", label: "Sleep + mood treatment" },
              { icon: "ri-timer-line", value: "6–10 wks", label: "Typical course" },
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

      {/* Treatment pillars — dark */}
      <section className="relative overflow-hidden bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#83B3DC]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#83B3DC]/5 blur-[80px]" />
        <div className="relative mx-auto max-w-[1350px]">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Treatment Components</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>How we treat insomnia in teens</h2>
            <p className="mt-4 text-sm leading-8 text-white/50">Each component targets a different driver of adolescent insomnia — sleep patterns, anxious thoughts, device behavior, and family dynamics.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            {treatmentPillars.map((pillar, i) => (
              <div key={pillar.title} className={`grid gap-6 px-8 py-9 lg:grid-cols-[72px_1fr] lg:gap-10 lg:px-12 lg:py-11 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}>
                <p className="text-4xl font-bold leading-none text-white/[0.07] lg:pt-1 lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>{pillar.num}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[#83B3DC]/25 bg-[#83B3DC]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#83B3DC]">{pillar.tag}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[#83B3DC]">
                      <i className={`${pillar.icon} text-base`}></i>
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white md:text-2xl" style={{ fontFamily: "var(--font-heebo)" }}>{pillar.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-8 text-white/55">{pillar.body}</p>
                  <ul className="mt-5 space-y-2">
                    {pillar.bullets.map((b) => (
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
              <h2 className="mt-3 text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>Signs your teen may need clinical insomnia care</h2>
              <p className="mt-4 text-sm leading-8 text-[#54595F]">Sleep hygiene alone rarely fixes chronic adolescent insomnia. If these patterns have been going on for weeks, clinical care is likely the right next step.</p>
              <div className="mt-8 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Good to know</p>
                <p className="mt-2 text-sm leading-7 text-[#54595F]">Insomnia treatment is commonly embedded in Virtual IOP when sleep disruption is part of a broader anxiety or depressive picture — treating sleep as part of overall recovery.</p>
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
                <p className="mt-3 text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "var(--font-heebo)" }}>Tell us about your teen&apos;s sleep patterns</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">We will listen, ask the right questions, and recommend whether clinical insomnia treatment, Virtual IOP, or a different level of care is the right fit.</p>
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
              <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>From first call to treatment start</h2>
              <p className="mt-4 text-sm leading-8 text-[#54595F]">We assess sleep and mental health together, then recommend the most appropriate treatment format — which may include Virtual IOP when co-occurring conditions are present.</p>
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Why Clinical Treatment</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>More than sleep hygiene advice</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/8">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 border-b border-white/8 bg-white/[0.03] px-6 py-4">
              <div />
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/30">Generic advice</p>
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Clinical treatment</p>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-white/5 last:border-b-0`}>
                <p className="flex items-center text-xs font-bold uppercase tracking-wider text-white/40">{row.label}</p>
                <p className="flex items-center justify-center text-sm text-white/35">{row.generic}</p>
                <p className="flex items-center justify-center text-sm font-semibold text-white">{row.treated}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related conditions */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Related Conditions</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Conditions commonly treated alongside insomnia</h2>
            <p className="mt-4 text-sm leading-8 text-[#54595F]">Teen insomnia is almost always connected to other mental health concerns. We treat sleep and the underlying drivers together in one integrated plan.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedConditions.map((condition) => (
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
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Questions about teen insomnia treatment</h2>
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
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heebo)" }}>Help your teen sleep — and feel — better</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50">Free consultation, no obligation. We will discuss sleep patterns, mental health, and recommend whether clinical insomnia treatment or Virtual IOP is the right fit.</p>
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

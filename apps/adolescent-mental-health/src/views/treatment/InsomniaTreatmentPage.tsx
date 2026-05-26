import Image from "next/image";
import Link from "next/link";
import { AmhButton, ComparisonTable, DarkCtaSection, MarketingPage } from "@/components/marketing";
import { INSOMNIA_IMGS, SITE } from "@/lib/site";

const IMGS = INSOMNIA_IMGS;

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
    <MarketingPage>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/8 blur-[90px]" />
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.35]" />
        <div className="relative px-6 pb-16 pt-28 lg:px-10 lg:pb-24 lg:pt-32">
          <div className="mx-auto max-w-content">
            <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-body">Teen Insomnia Treatment · Ages 12–17</span>
                </div>
                <h1 className="mt-7 text-[2.75rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[4.25rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  Teen insomnia treatment{" "}
                  <span className="text-accent">that addresses sleep and mental health together</span>
                </h1>
                <p className="mt-6 max-w-lg text-base leading-8 text-body">
                  Teen insomnia rarely exists alone. Our clinicians treat sleep disruption alongside anxiety, depression,
                  and school avoidance — with CBT-informed approaches that produce lasting results.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={SITE.phone.href} className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-dark px-8 py-4 text-sm font-bold text-white shadow-lg shadow-ink/15 transition hover:bg-cta-hover">
                    <i className="ri-phone-fill text-accent"></i>
                    Free consultation
                  </a>
                  <Link href="/admissions" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-8 py-4 text-sm font-semibold text-ink shadow-sm transition hover:border-accent/50 hover:shadow-md">
                    Start online intake
                    <i className="ri-arrow-right-line text-accent"></i>
                  </Link>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                  {[
                    { icon: "ri-moon-line", label: "Sleep + mood together" },
                    { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
                    { icon: "ri-parent-line", label: "Family coaching" },
                    { icon: "ri-shield-check-line", label: "Licensed clinicians" },
                  ].map((item) => (
                    <span key={item.label} className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-[11px] font-semibold text-body ring-1 ring-border backdrop-blur-sm">
                      <i className={`${item.icon} text-sm text-accent`}></i>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-[540px] lg:justify-self-end lg:pt-2">
                <div className="pointer-events-none absolute -right-3 top-0 hidden h-full w-[92%] rounded-[2rem] bg-accent/25 lg:block" aria-hidden />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/10 ring-1 ring-white/60">
                  <Image src={IMGS.hero} alt="Teen establishing a healthy screen-free evening routine before sleep" fill className="object-cover object-center" priority quality={90} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 540px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/25 via-transparent to-transparent" />
                </div>
                <div className="absolute -left-2 bottom-6 z-10 rounded-2xl bg-white/95 px-5 py-4 shadow-xl ring-1 ring-border backdrop-blur-md sm:-left-6 sm:bottom-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Approach</p>
                  <p className="mt-1 text-xl font-bold leading-snug text-ink" style={{ fontFamily: "var(--font-heebo)" }}>CBT-I informed<br /><span className="text-base font-semibold text-body">sleep + mood</span></p>
                </div>
                <div className="absolute -right-1 top-4 z-10 hidden rounded-2xl bg-dark px-4 py-3 shadow-xl sm:block lg:-right-4 lg:top-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent">
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
      <section className="bg-surface px-6 py-section lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="grid gap-3 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border lg:p-12">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">What Is Teen Insomnia Treatment?</p>
                <h2 className="text-3xl font-bold leading-[1.1] text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  Treating sleep and the mental health driving it
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-8 text-body">
                  Sleep hygiene tips rarely fix adolescent insomnia. Clinical insomnia treatment addresses the behavioral
                  patterns, anxious thoughts, and irregular schedules that maintain poor sleep — plus the anxiety or
                  depression that almost always co-occurs.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-8 text-body">
                  Our approach uses CBT-informed techniques (CBT-I) delivered within a broader adolescent mental health
                  framework — so your teen&apos;s sleep improves as part of overall recovery, not in isolation.
                </p>
              </div>
              <div className="mt-10 rounded-2xl border border-border bg-surface-muted p-6 lg:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">The insomnia–anxiety–mood cycle</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  {[
                    { label: "Poor sleep", detail: "Worsens anxiety & mood", dir: "→" },
                    { label: "Anxiety & depression", detail: "Disrupts sleep further", dir: "→" },
                    { label: "Our approach", detail: "Treats both simultaneously", highlight: true },
                  ].map((item, i) => (
                    <div key={item.label} className="flex flex-1 items-center gap-2">
                      <div className={`flex-1 rounded-xl px-4 py-4 ${(item as { highlight?: boolean }).highlight ? "border-2 border-accent bg-white shadow-md shadow-accent/10" : "border border-border bg-white/60"}`}>
                        <p className={`text-xs font-bold uppercase tracking-wider ${(item as { highlight?: boolean }).highlight ? "text-accent" : "text-body"}`}>{item.label}</p>
                        <p className="mt-1 text-sm font-semibold leading-snug text-ink">{item.detail}</p>
                      </div>
                      {i < 2 && <span className="shrink-0 text-accent font-bold hidden sm:block">{item.dir}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:h-full">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-3xl ring-1 ring-border">
                <Image src={IMGS.bento} alt="Teen writing in sleep diary at morning desk with tea nearby" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 400px" />
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-border">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <i className="ri-bar-chart-line text-lg"></i>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">Sleep logs track progress objectively</p>
                    <p className="mt-0.5 text-xs leading-5 text-body">Daily sleep diaries guide treatment adjustments and help teens see real improvement over weeks.</p>
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
              <div key={stat.label} className="flex flex-col justify-between rounded-3xl bg-white px-5 py-6 shadow-sm ring-1 ring-border">
                <i className={`${stat.icon} text-xl text-accent`}></i>
                <div className="mt-4">
                  <p className="text-xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>{stat.value}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-body">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment pillars — dark */}
      <section className="relative overflow-hidden bg-dark px-6 py-section lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/5 blur-[80px]" />
        <div className="relative mx-auto max-w-content">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Treatment Components</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>How we treat insomnia in teens</h2>
            <p className="mt-4 text-sm leading-8 text-white/50">Each component targets a different driver of adolescent insomnia — sleep patterns, anxious thoughts, device behavior, and family dynamics.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            {treatmentPillars.map((pillar, i) => (
              <div key={pillar.title} className={`grid gap-6 px-8 py-9 lg:grid-cols-[72px_1fr] lg:gap-10 lg:px-12 lg:py-11 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}>
                <p className="text-4xl font-bold leading-none text-white/[0.07] lg:pt-1 lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>{pillar.num}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent">{pillar.tag}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-accent">
                      <i className={`${pillar.icon} text-base`}></i>
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white md:text-2xl" style={{ fontFamily: "var(--font-heebo)" }}>{pillar.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-8 text-white/55">{pillar.body}</p>
                  <ul className="mt-5 space-y-2">
                    {pillar.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-white/35">
                        <i className="ri-check-line mt-0.5 shrink-0 text-accent"></i>
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
      <section className="bg-white px-6 py-section lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Is It Right for Us?</p>
              <h2 className="mt-3 text-3xl font-bold leading-[1.1] text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>Signs your teen may need clinical insomnia care</h2>
              <p className="mt-4 text-sm leading-8 text-body">Sleep hygiene alone rarely fixes chronic adolescent insomnia. If these patterns have been going on for weeks, clinical care is likely the right next step.</p>
              <div className="mt-8 rounded-2xl border border-border bg-surface-muted px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Good to know</p>
                <p className="mt-2 text-sm leading-7 text-body">Insomnia treatment is commonly embedded in Virtual IOP when sleep disruption is part of a broader anxiety or depressive picture — treating sleep as part of overall recovery.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {fitCriteria.map((item, i) => (
                <div key={item.label} className={`group relative rounded-2xl border border-border bg-surface/60 p-6 pr-16 transition hover:border-accent/40 hover:bg-white hover:shadow-md hover:shadow-accent/5 sm:pr-20 ${i === 4 ? "sm:col-span-2" : ""}`}>
                  <span className="pointer-events-none absolute right-4 top-4 select-none text-5xl font-bold leading-none text-border transition group-hover:text-accent/15 sm:text-6xl" style={{ fontFamily: "var(--font-heebo)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white text-accent shadow-sm ring-1 ring-border transition group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                    <i className={`${item.icon} text-lg`}></i>
                  </span>
                  <p className="relative mt-5 text-base font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>{item.label}</p>
                  <p className="relative mt-2 text-sm leading-7 text-body">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl bg-dark">
            <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-12 lg:py-12">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">Not sure yet?</p>
                <p className="mt-3 text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "var(--font-heebo)" }}>Tell us about your teen&apos;s sleep patterns</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">We will listen, ask the right questions, and recommend whether clinical insomnia treatment, Virtual IOP, or a different level of care is the right fit.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[260px]">
                <a href={SITE.phone.href} className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-ink transition hover:bg-white/90">
                  <i className="ri-phone-fill text-accent"></i>
                  {SITE.phone.display}
                </a>
                <Link href="/insurance-coverage" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10">
                  Verify insurance
                  <i className="ri-arrow-right-line text-accent"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface px-6 py-section lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">How It Works</p>
              <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>From first call to treatment start</h2>
              <p className="mt-4 text-sm leading-8 text-body">We assess sleep and mental health together, then recommend the most appropriate treatment format — which may include Virtual IOP when co-occurring conditions are present.</p>
            </div>
            <a href={SITE.phone.href} className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-2xl bg-dark px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-cta-hover lg:self-auto">
              <i className="ri-phone-fill text-accent"></i>
              Start with a free call
            </a>
          </div>
          <div className="relative mt-12 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border lg:p-12">
            <div className="absolute left-12 right-12 top-[4.25rem] hidden h-px bg-border lg:block" />
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
              {intakeSteps.map((step) => (
                <div key={step.num} className="relative flex flex-col">
                  <div className="relative z-10 mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white" style={{ boxShadow: "0 0 0 5px rgba(131,179,220,0.12)" }}>
                    <i className={`${step.icon} text-base`}></i>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent/70">Step {step.num}</p>
                  <h3 className="mt-2 text-lg font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-body">{step.body}</p>
                </div>
              ))}
            </div>
            <div className="lg:hidden">
              {intakeSteps.map((step, i) => (
                <div key={step.num} className="relative flex gap-5 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white" style={{ boxShadow: "0 0 0 5px rgba(131,179,220,0.12)" }}>
                      <i className={`${step.icon} text-base`}></i>
                    </div>
                    {i < intakeSteps.length - 1 && <div className="mt-2 w-px flex-1 min-h-[3rem] bg-border" />}
                  </div>
                  <div className="pb-1 pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent/70">Step {step.num}</p>
                    <h3 className="mt-1 text-lg font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-body">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-dark px-6 py-section lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Why Clinical Treatment</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>More than sleep hygiene advice</h2>
          </div>
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
      </section>

      {/* Related conditions */}
      <section className="bg-white px-6 py-section lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Related Conditions</p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Conditions commonly treated alongside insomnia</h2>
            <p className="mt-4 text-sm leading-8 text-body">Teen insomnia is almost always connected to other mental health concerns. We treat sleep and the underlying drivers together in one integrated plan.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedConditions.map((condition) => (
              <Link key={condition.path} href={condition.path} className="group flex flex-col rounded-2xl border border-border bg-surface-muted/50 p-6 transition hover:border-accent/40 hover:bg-white hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-ink transition group-hover:text-accent" style={{ fontFamily: "var(--font-heebo)" }}>{condition.label}</h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-accent/50 ring-1 ring-border transition group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                    <i className="ri-arrow-right-line text-sm"></i>
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-7 text-body">{condition.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface px-6 py-section lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Questions about teen insomnia treatment</h2>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group rounded-2xl border border-border bg-white transition open:border-accent/35 open:shadow-md open:shadow-accent/5">
                <summary className="flex cursor-pointer list-none items-start gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-xs font-bold text-accent ring-1 ring-border transition group-open:bg-accent group-open:text-white group-open:ring-accent" style={{ fontFamily: "var(--font-heebo)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-base font-bold leading-snug text-ink transition group-open:text-accent" style={{ fontFamily: "var(--font-heebo)" }}>{faq.q}</span>
                  </span>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-accent transition group-open:rotate-45 group-open:bg-accent group-open:text-white">
                    <i className="ri-add-line text-sm"></i>
                  </span>
                </summary>
                <div className="border-t border-surface px-6 pb-6 pt-4">
                  <p className="text-sm leading-8 text-body">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

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

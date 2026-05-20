import Image from "next/image";
import Link from "next/link";

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";
const SB_ROOT =
  "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images";

const IMGS = {
  hero: `${SB_ROOT}/amh_bipolar_hero01.jpg`,
  bento: `${SB_ROOT}/amh_bipolar_bento01.jpg`,
};

const treatmentPillars = [
  { num: "01", icon: "ri-line-chart-line", tag: "Monitoring", title: "Mood tracking and early warning signs", body: "Daily or weekly mood logs help teens and families identify patterns, triggers, and early warning signs before episodes escalate — enabling faster clinical response and reducing severity.", bullets: ["Personalized mood and sleep log", "Identifying individual episode triggers", "Family-facing warning sign plan"] },
  { num: "02", icon: "ri-heart-pulse-line", tag: "Core therapy", title: "CBT and DBT for mood regulation", body: "Cognitive and dialectical skills help teens manage extreme mood states, interpersonal stress, and the impulsivity or emotional dysregulation that accompanies bipolar episodes.", bullets: ["Emotion regulation and distress tolerance", "Interpersonal effectiveness for relationships", "Thought challenging for depressive episodes"] },
  { num: "03", icon: "ri-capsule-line", tag: "Coordination", title: "Medication coordination and adherence", body: "When a prescriber is involved, we coordinate therapy with medication management — supporting adherence, monitoring symptom changes, and communicating with medical providers as needed.", bullets: ["Collaboration with prescribers when appropriate", "Adherence support and psychoeducation", "Symptom monitoring across sessions"] },
  { num: "04", icon: "ri-team-line", tag: "Family integration", title: "Family education and caregiver coaching", body: "Caregivers learn to recognize early episode signs, respond effectively during escalations, and create a home environment that supports mood stability rather than inadvertently destabilizing it.", bullets: ["Bipolar psychoeducation for families", "Responding to elevated or depressed episodes", "Communication strategies for high-conflict moments"] },
];

const fitCriteria = [
  { icon: "ri-emotion-sad-line", label: "Depressive episodes lasting days or weeks", sub: "Hopelessness, withdrawal, sleep changes, and loss of interest that go beyond typical mood shifts" },
  { icon: "ri-flashlight-line", label: "Periods of elevated or irritable mood", sub: "Racing thoughts, decreased need for sleep, risky behavior, or extreme irritability" },
  { icon: "ri-repeat-line", label: "Cycling between mood extremes", sub: "Clear pattern of mood swings that affect school, relationships, and daily functioning" },
  { icon: "ri-alarm-warning-line", label: "Recent hospitalization or crisis episode", sub: "Stepping down from inpatient or emergency care and needing structured outpatient support" },
  { icon: "ri-user-search-line", label: "Diagnosis under review or recently received", sub: "Families navigating new bipolar diagnoses and needing clinical support to understand next steps" },
];

const intakeSteps = [
  { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Describe your teen's mood pattern, any previous treatment or hospitalization, and current prescribers." },
  { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "A licensed clinician evaluates mood history, safety, co-occurring conditions, and appropriateness for IOP." },
  { num: "03", icon: "ri-calendar-check-line", title: "Coordinated care plan", body: "We build an individualized plan including mood monitoring, therapy, family education, and prescriber communication." },
  { num: "04", icon: "ri-video-chat-line", title: "Begin Virtual IOP", body: "Your teen starts individual, group, and family sessions — with frequent clinical contact built into the program." },
];

const comparisonRows = [
  { label: "Contact frequency", standard: "Once weekly", iop: "Multiple days per week" },
  { label: "Mood monitoring", standard: "Reported monthly", iop: "Tracked across sessions" },
  { label: "Family involvement", standard: "Rare or optional", iop: "Structured family track" },
  { label: "Safety monitoring", standard: "Large gaps between contact", iop: "Frequent check-ins" },
  { label: "Prescriber coordination", standard: "Uncommon", iop: "Proactive collaboration" },
];

const relatedConditions = [
  { label: "Bipolar I", path: "/conditions/depression", desc: "Characterized by full manic episodes alongside depression — the most acute presentation of bipolar disorder in adolescents." },
  { label: "Bipolar II", path: "/conditions/depression", desc: "Hypomanic episodes (less severe than full mania) paired with depressive episodes — often misdiagnosed as depression alone." },
  { label: "Depression", path: "/conditions/depression", desc: "Depressive episodes are a core feature of bipolar disorder and require clinical differentiation from unipolar depression." },
  { label: "Anxiety", path: "/conditions/anxiety", desc: "Anxiety disorders co-occur with bipolar disorder at high rates and require integrated treatment planning." },
  { label: "Self-harm", path: "/conditions/self-harm", desc: "Self-harming behavior during depressive episodes is common in adolescent bipolar — safety planning is central to our model." },
  { label: "Insomnia", path: "/online-insomnia-treatment-for-teens", desc: "Sleep disruption is both a symptom and a trigger for bipolar episodes — sleep stabilization is a core treatment target." },
];

const faqs = [
  { q: "Can teens have bipolar disorder?", a: "Yes. Bipolar disorder can emerge in adolescence and is often initially misdiagnosed as depression, ADHD, or behavioral problems. Accurate diagnosis and early intervention significantly improve long-term outcomes." },
  { q: "Do you diagnose bipolar disorder?", a: "Our licensed clinicians conduct comprehensive assessments as part of intake. We coordinate with prior providers and, when needed, refer for additional psychiatric evaluation. We do not make diagnoses in isolation from a full clinical picture." },
  { q: "Is Virtual IOP safe for teens with bipolar disorder?", a: "IOP is appropriate for medically and psychiatrically stable teens who do not require 24/7 monitoring. We assess acuity carefully at intake and will recommend a higher level of care if inpatient or residential is clinically indicated." },
  { q: "Who manages medication for bipolar disorder?", a: "Prescribing decisions belong with your teen's psychiatrist or medical provider. Our role is to provide therapy, mood monitoring, family education, and to communicate proactively with the prescribing team about symptom patterns." },
  { q: "Can Virtual IOP happen alongside medication management?", a: "Yes — this is our model for most teens with bipolar disorder. Therapy, skills work, and family support in IOP complement medication management. We coordinate with prescribers to ensure care is aligned." },
  { q: "What happens if my teen decompensates during IOP?", a: "We have clear protocols for clinical deterioration. If a teen requires a higher level of care during IOP, we facilitate transition to inpatient or residential programs and maintain family communication throughout." },
];

export default function BipolarTreatmentPage() {
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
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#54595F]">Teen Bipolar Treatment · Ages 12–17</span>
                </div>
                <h1 className="mt-7 text-[2.75rem] font-bold leading-[1.02] tracking-tight text-[#0A0F14] sm:text-5xl lg:text-[4.25rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  Teen bipolar treatment{" "}
                  <span className="text-[#83B3DC]">with expert mood stabilization</span>
                </h1>
                <p className="mt-6 max-w-lg text-base leading-8 text-[#54595F]">
                  Intensive outpatient support for teens with bipolar disorder — combining mood monitoring, CBT and DBT
                  skills, family education, and prescriber coordination in a structured virtual program.
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
                    { icon: "ri-line-chart-line", label: "Mood monitoring" },
                    { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
                    { icon: "ri-team-line", label: "Family included" },
                    { icon: "ri-capsule-line", label: "Prescriber coordination" },
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
                  <Image src={IMGS.hero} alt="Teen in virtual therapy session discussing mood management with clinician" fill className="object-cover object-center" priority quality={90} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 540px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14]/25 via-transparent to-transparent" />
                </div>
                <div className="absolute -left-2 bottom-6 z-10 rounded-2xl bg-white/95 px-5 py-4 shadow-xl ring-1 ring-[#E8EEF4] backdrop-blur-md sm:-left-6 sm:bottom-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Contact frequency</p>
                  <p className="mt-1 text-xl font-bold leading-snug text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>Multiple days<br /><span className="text-base font-semibold text-[#7C848B]">per week</span></p>
                </div>
                <div className="absolute -right-1 top-4 z-10 hidden rounded-2xl bg-[#0A0F14] px-4 py-3 shadow-xl sm:block lg:-right-4 lg:top-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#83B3DC]/20 text-[#83B3DC]">
                      <i className="ri-line-chart-line text-base"></i>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Format</p>
                      <p className="text-xs font-bold text-white">IOP + mood monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is bipolar treatment */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-3 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E8EEF4] lg:p-12">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">What Is Teen Bipolar Treatment?</p>
                <h2 className="text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
                  Comprehensive mood stabilization — at home, with your family
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-8 text-[#54595F]">
                  Adolescent bipolar disorder requires more than weekly therapy. It needs frequent clinical contact,
                  structured mood monitoring, skills for managing episodes, family education, and coordination with any
                  prescribing providers — all delivered in a consistent, predictable format.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-8 text-[#7C848B]">
                  Our Virtual IOP provides the intensive structure adolescents with bipolar disorder need — without a
                  residential stay — through multiple sessions per week with licensed clinicians and a dedicated family track.
                </p>
              </div>
              <div className="mt-10 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] p-6 lg:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">Episode types we address</p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { label: "Depressive episodes", detail: "Low mood, withdrawal, hopelessness, sleep changes", icon: "ri-arrow-down-line" },
                    { label: "Elevated / manic episodes", detail: "Decreased sleep need, racing thoughts, irritability, risky behavior", icon: "ri-flashlight-line" },
                    { label: "Mixed states", detail: "Concurrent depression and activation — often the highest-risk presentation", icon: "ri-contrast-2-line" },
                    { label: "Maintenance phase", detail: "Stability monitoring, relapse prevention, and long-term skill building", icon: "ri-shield-check-line" },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3 rounded-xl border border-[#E8EEF4] bg-white/60 p-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#83B3DC]/10 text-[#83B3DC]">
                        <i className={`${item.icon} text-sm`}></i>
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#0A0F14]">{item.label}</p>
                        <p className="mt-0.5 text-[11px] leading-4 text-[#7C848B]">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:h-full">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-3xl ring-1 ring-[#E8EEF4]">
                <Image src={IMGS.bento} alt="Teen and parent reviewing mood tracking chart together at kitchen table" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 400px" />
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-[#E8EEF4]">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#83B3DC]/15 text-[#83B3DC]">
                    <i className="ri-team-line text-lg"></i>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0A0F14]">Family is part of the clinical team</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#7C848B]">Caregivers learn to recognize warning signs and respond effectively — reducing episode severity at home.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { icon: "ri-user-heart-line", value: "12–17", label: "Ages served" },
              { icon: "ri-time-line", value: "9–20h", label: "Clinical hours / week" },
              { icon: "ri-links-line", value: "Integrated", label: "Therapy + coordination" },
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Treatment Pillars</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>How we stabilize mood in adolescents</h2>
            <p className="mt-4 text-sm leading-8 text-white/50">Each pillar addresses a different driver of instability — from internal mood patterns to family environment to medication adherence.</p>
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
              <h2 className="mt-3 text-3xl font-bold leading-[1.1] text-[#0A0F14] md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>Signs your teen may need bipolar-specific care</h2>
              <p className="mt-4 text-sm leading-8 text-[#54595F]">Bipolar disorder in teens is often missed or misdiagnosed. If these patterns sound familiar, a clinical assessment can clarify diagnosis and recommend the right level of care.</p>
              <div className="mt-8 rounded-2xl border border-[#E8EEF4] bg-[#F4F9FC] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Good to know</p>
                <p className="mt-2 text-sm leading-7 text-[#54595F]">IOP is appropriate for stable teens who do not require hospitalization. We assess acuity at intake and will refer to a higher level of care if needed — we will not enroll teens who need inpatient stabilization first.</p>
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
                <p className="mt-3 text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "var(--font-heebo)" }}>Walk us through what your teen has been experiencing</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">We will listen to the history, explain what clinical assessment involves, and tell you honestly whether IOP is the right fit — or whether a different level of care is needed first.</p>
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
              <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>From first call to a coordinated care plan</h2>
              <p className="mt-4 text-sm leading-8 text-[#54595F]">We move quickly — most families complete intake within 24–48 hours. We coordinate with prescribers and schools when needed from day one.</p>
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Why IOP for Bipolar</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>More contact than standard outpatient allows</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/8">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 border-b border-white/8 bg-white/[0.03] px-6 py-4">
              <div />
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/30">Standard outpatient</p>
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Virtual IOP</p>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-white/5 last:border-b-0`}>
                <p className="flex items-center text-xs font-bold uppercase tracking-wider text-white/40">{row.label}</p>
                <p className="flex items-center justify-center text-sm text-white/35">{row.standard}</p>
                <p className="flex items-center justify-center text-sm font-semibold text-white">{row.iop}</p>
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
            <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Conditions we address alongside bipolar disorder</h2>
            <p className="mt-4 text-sm leading-8 text-[#54595F]">Bipolar disorder rarely presents alone. Our IOP is built to treat the full picture — not just the primary diagnosis.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedConditions.map((condition) => (
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
            <h2 className="mt-3 text-3xl font-bold text-[#0A0F14] md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>Questions about teen bipolar treatment</h2>
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
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heebo)" }}>Get expert bipolar care for your teen</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50">Free consultation, no obligation. We will discuss mood history, safety, and whether our Virtual IOP is clinically appropriate — or help you find the right level of care if it isn&apos;t.</p>
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

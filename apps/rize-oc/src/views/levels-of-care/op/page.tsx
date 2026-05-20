import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import PageHeroShell from "@/components/ui/PageHeroShell";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─────────────────────────────────────────────────── Section data ─────── */

const ongoingStructure = [
  {
    frequency: "Weekly or Bi-Weekly",
    icon: "ri-user-smile-line",
    title: "Individual Therapy Sessions",
    body: "The core of OP — ongoing one-on-one sessions with your primary clinician. Frequency is adjusted based on clinical need and personal preference. Sessions address current challenges, celebrate progress, refine relapse prevention strategies, and deepen the therapeutic work that began at higher levels of care.",
    tags: ["Individual Therapy", "Progress Review", "Relapse Prevention"],
  },
  {
    frequency: "As Needed",
    icon: "ri-team-line",
    title: "Alumni Group Participation",
    body: "Access to Rize OC&apos;s continuing care groups — open to all alumni, facilitated by licensed clinicians. Alumni groups provide peer community, shared experience, and mutual accountability in a structured-yet-flexible format that complements individual work.",
    tags: ["Alumni Community", "Peer Support", "Continuing Care"],
  },
  {
    frequency: "As Indicated",
    icon: "ri-stethoscope-line",
    title: "Psychiatric Continuity",
    body: "Clients on medication management continue regular check-ins with the Rize psychiatry team. Medication is adjusted as needed, side effects are monitored, and the psychiatric picture evolves alongside your recovery. Psychiatric support is never abruptly discontinued at step-down.",
    tags: ["Medication Management", "Psychiatric Follow-up", "Continuity of Care"],
  },
  {
    frequency: "Immediately Available",
    icon: "ri-arrow-up-circle-line",
    title: "Step-Up Access",
    body: "If life circumstances change — a significant stressor, a relapse, or a deterioration in mental health — stepping back up to IOP or PHP is always available without barriers or judgment. The Rize clinical team monitors your progress and will recommend step-up before a crisis, not after.",
    tags: ["Crisis Response", "Step-Up Protocol", "Clinical Safety Net"],
  },
];

const pillars = [
  {
    icon: "ri-shield-check-line",
    title: "Relapse Prevention",
    desc: "Ongoing refinement of your relapse prevention plan as life circumstances evolve — new triggers, new stressors, new situations that require updated strategies.",
    accent: true,
  },
  {
    icon: "ri-user-smile-line",
    title: "Identity & Meaning",
    desc: "Deep individual work on identity reconstruction — building a sense of self, purpose, and meaning that is not organized around substance use.",
    accent: true,
  },
  {
    icon: "ri-team-line",
    title: "Relationship Repair",
    desc: "Structured support for rebuilding damaged relationships — with family, partners, and communities — as part of long-term recovery and life reintegration.",
    accent: false,
  },
  {
    icon: "ri-trophy-line",
    title: "Life Goals & Milestones",
    desc: "Therapeutic support for navigating the practical and emotional dimensions of reintegration — employment, finances, education, and building a purposeful life.",
    accent: false,
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Emotional Regulation",
    desc: "Continued development of the emotional regulation and distress tolerance skills that are most tested when life's full complexity returns.",
    accent: false,
  },
  {
    icon: "ri-community-line",
    title: "Alumni Community",
    desc: "Connection to the Rize alumni network — events, continuing care groups, peer mentorship, and the sustained human connection that is one of recovery&apos;s most powerful protective factors.",
    accent: false,
  },
];

const whyStats = [
  { stat: "2×",  detail: "longer average sustained sobriety for individuals in ongoing outpatient care versus those who discharge without continuing support" },
  { stat: "60%", detail: "of long-term relapse events occur within the first year after completing treatment — the exact period OP is designed to protect" },
  { stat: "78%", detail: "of Rize OP clients report meaningful improvement in primary relationships at 12-month follow-up" },
  { stat: "Open", detail: "ended duration — OP continues for as long as it is clinically valuable, with no arbitrary end date or insurance-driven discharge" },
];

const candidacyItems = [
  { icon: "ri-check-line",          label: "Stepped down from IOP with demonstrated stability" },
  { icon: "ri-briefcase-line",      label: "Fully reintegrated into work, school, or family life" },
  { icon: "ri-shield-check-line",   label: "Committed to long-term recovery as an ongoing practice" },
  { icon: "ri-team-line",           label: "Building or maintaining a strong sober support network" },
  { icon: "ri-road-map-line",       label: "Navigating life transitions that benefit from therapeutic support" },
  { icon: "ri-stethoscope-line",    label: "Requires occasional medication management follow-up" },
  { icon: "ri-community-line",      label: "Seeking alumni community connection and peer accountability" },
  { icon: "ri-heart-2-line",        label: "Rebuilding significant relationships as part of recovery" },
];

const faqs: FaqItem[] = [
  {
    q: "What is Standard Outpatient and how does it differ from IOP?",
    a: "Standard Outpatient (OP) is the lowest-intensity structured level of clinical care — typically one to two individual therapy sessions per week, with optional alumni group participation. IOP, by contrast, involves three group sessions plus individual therapy each week, totaling 5 to 9 hours of clinical contact. OP is appropriate for individuals who have achieved meaningful stability — usually after completing IOP — and are ready to maintain recovery with less intensive clinical scaffolding. The shift from IOP to OP is a significant clinical milestone.",
  },
  {
    q: "When am I ready to step down to OP?",
    a: "Readiness to step down to OP is a clinical decision made collaboratively between you and your treatment team. Key indicators include consistent attendance and engagement throughout IOP, demonstrated ability to manage triggers and stressors without clinical crisis, a stable living environment and support system, the presence of meaningful recovery capital (employment, relationships, community), and a well-developed relapse prevention plan. Your team will never push you to step down prematurely — if clinical indicators suggest you need more time at IOP, that recommendation is made without hesitation.",
  },
  {
    q: "How long does OP last?",
    a: "OP at Rize OC is open-ended — there is no fixed duration. Some clients benefit from several months of weekly individual therapy. Others maintain an ongoing therapeutic relationship with their Rize clinician for years, adjusting frequency as life circumstances evolve. The decision to reduce or conclude OP is made collaboratively, based on your goals, clinical stability, and personal judgment. Recovery is a lifelong practice — ongoing therapeutic support is a strength, not a dependency.",
  },
  {
    q: "Do I see the same therapist I had in IOP?",
    a: "Yes. Therapeutic continuity is a core principle at Rize OC — we do not reassign clients at step-down unless clinically indicated. Your primary therapist follows you through the continuum, maintaining the therapeutic relationship and clinical narrative that provides the deepest and most effective work. The step-down to OP is a change in frequency and structure, not a change in relationship.",
  },
  {
    q: "What are the alumni groups?",
    a: "Rize OC alumni groups are clinician-facilitated continuing care groups open to all former PHP, IOP, and OP clients. Groups meet regularly and cover topics relevant to sustained recovery — navigating relationships, managing life stressors, celebrating milestones, and providing peer support during difficult periods. Alumni groups are not required as part of OP, but they are strongly encouraged. The peer community that forms in these groups is one of the most powerful long-term protective factors available.",
  },
  {
    q: "What happens if I relapse while in OP?",
    a: "A relapse while in OP is a clinical signal, not a failure. Your clinical team will conduct a prompt assessment to understand the context and recommend the appropriate response — which may mean continuing OP with adjusted focus, stepping up to IOP for a period, or in more serious situations, recommending PHP or a higher level of care. Transparency with your clinician is essential and always the right choice. Rize&apos;s door is never closed after a relapse — it is the moment we can be most useful.",
  },
  {
    q: "Is OP covered by insurance?",
    a: "Individual outpatient therapy is covered by most major PPO plans, though coverage levels vary significantly by plan. Session frequency, out-of-pocket costs, and authorization requirements differ by provider. Our billing team works directly with your insurance to maximize coverage and provide you with a clear picture of expected costs. We also offer a sliding scale for uninsured clients in specific circumstances — contact our admissions team to discuss.",
  },
];

/* ─────────────────────────────────────────────────── Page component ────── */

export default function OpPage() {
  return (
    <>
      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden min-h-[88vh] flex flex-col justify-end">
        <Image
          src={`${BASE}/op_hero03.jpg`}
          alt="Serene outdoor courtyard at Rize OC outpatient wellness center in Orange County California"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(44,48,46,1) 0%, rgba(44,48,46,0.92) 30%, rgba(44,48,46,0.65) 55%, rgba(44,48,46,0.2) 100%)" }}
        />

        <PageHeroShell
          topSlot={<Eyebrow colorClass="text-accent">Levels of Care — Step 4</Eyebrow>}
          bottomBar={
            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
              {[
                { value: "1–2",    label: "Sessions Per Week" },
                { value: "Open",   label: "Ended Duration" },
                { value: "Alumni", label: "Community Access" },
                { value: "100%",   label: "Therapeutic Continuity" },
              ].map(({ value, label }) => (
                <div key={label} className="px-8 py-5 border-r border-white/10 last:border-r-0 bg-ink/50 backdrop-blur-sm">
                  <p className="font-[family-name:var(--font-display)] text-[28px] font-normal text-white leading-none"><AutoLinkedText>{value}</AutoLinkedText></p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50 mt-1.5"><AutoLinkedText>{label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          }
        >
          <div className="flex-1 max-w-3xl">
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white"
              style={{ fontSize: "clamp(52px, 6.5vw, 96px)", lineHeight: 0.95 }}
            >
              Outpatient<br />
              <em className="italic text-white/60">Program (OP)</em>
            </h1>
            <p className="mt-6 text-[16px] font-light leading-relaxed text-white/80 max-w-[520px]">
              <AutoLinkedText>{"Long-term recovery sustainment — one to two sessions weekly, ongoing alumni community, and the clinical partnership that extends recovery indefinitely."}</AutoLinkedText>
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
            <div className="flex flex-wrap gap-3">
              <Button href="#verify" variant="accent" size="md">Verify Insurance — Free</Button>
              <Button href="tel:9494612620" variant="outline-white" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> (949)-461-2620
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                { icon: "ri-checkbox-circle-line", text: "Joint Commission Accredited" },
                { icon: "ri-shield-check-line",    text: "DHCS Licensed" },
                { icon: "ri-infinity-line",        text: "Open-Ended Duration" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <i className={`${icon} text-accent text-sm`} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </PageHeroShell>
      </section>

      {/* ②  What Is OP? ───────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_400px] gap-16 items-stretch">
          <div className="flex flex-col h-full">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Understanding Outpatient</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Long-Term Recovery Sustainment
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Standard Outpatient represents the final structured level of care in the clinical continuum — and in many ways, the most important. The work done in detox, PHP, and IOP creates a foundation. Outpatient is where that foundation becomes a life."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The transition from IOP to OP is a meaningful clinical milestone — a marker of stability, capacity, and readiness to lead your own recovery with professional support alongside rather than in front. Rather than intensive programming, OP provides the ongoing therapeutic relationship, relapse prevention support, and community connection that sustains recovery through the full complexity of daily life."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"At Rize OC, OP is not a bureaucratic formality before discharge — it is a genuine ongoing clinical relationship. Your primary therapist remains the same. The depth of individual work deepens. And the Rize alumni community becomes a permanent resource rather than a transitional one."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"OP at Rize is open-ended by design. Duration is determined entirely by clinical value and personal judgment — not by insurance timelines or arbitrary program endpoints. Recovery is a lifelong practice, and the therapeutic relationship available in OP is designed to match that commitment."}</AutoLinkedText>
              </p>
            </div>

            <blockquote className="mt-auto pt-8 border-l-2 border-accent pl-6">
              <p className="text-[17px] font-[family-name:var(--font-display)] font-normal text-ink/70 leading-snug italic">
                <AutoLinkedText>{"\"The clients I'm most proud of are the ones who stayed. Not in PHP, not in IOP — in relationship. Outpatient is where the real identity work happens, away from the scaffolding.\""}</AutoLinkedText>
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">
                <AutoLinkedText>{"Rize OC Primary Therapist"}</AutoLinkedText>
              </p>
            </blockquote>
          </div>

          <div className="flex flex-col gap-5 h-full">
            <div className="bg-ink p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-4">
                Why OP Matters
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "ri-time-2-line",     point: "60% of long-term relapses occur in the first year after treatment — OP spans exactly this window" },
                  { icon: "ri-refresh-line",    point: "Ongoing therapeutic contact allows immediate response to emerging risk before crisis develops" },
                  { icon: "ri-team-line",       point: "Alumni community provides the peer support that research identifies as recovery&apos;s strongest protective factor" },
                  { icon: "ri-user-heart-line", point: "Therapeutic continuity with the same clinician preserves the relationship that produces the deepest work" },
                ].map(({ icon, point }) => (
                  <div key={point} className="flex items-start gap-3">
                    <i className={`${icon} text-accent text-base shrink-0 mt-0.5`} />
                    <p className="text-sm font-light text-white/65 leading-snug"><AutoLinkedText>{point}</AutoLinkedText></p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-warm p-7 flex flex-col gap-5 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/60">Quick Facts</p>
              {[
                { label: "Session Frequency", value: "1–2 Per Week" },
                { label: "Duration",          value: "Open-Ended" },
                { label: "Individual Therapy",value: "Included" },
                { label: "Alumni Groups",     value: "Included" },
                { label: "Insurance",         value: "Most PPO Plans" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center border-b border-warm pb-3 last:border-0 last:pb-0">
                  <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink/60">{label}</span>
                  <span className="text-[15px] font-medium text-ink">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ③  Ongoing Support Structure ────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="The OP Structure"
            heading="What Ongoing Outpatient Looks Like"
            body="OP is less a formal program and more a sustained clinical partnership. Here is how it works in practice — flexible, responsive, and designed for the long term."
            headingStyle={{ fontSize: "clamp(38px, 4vw, 56px)", lineHeight: 1.05 }}
            mb="mb-14"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {ongoingStructure.map(({ frequency, icon, title, body, tags }, i) => (
              <div
                key={i}
                className={`p-8 flex flex-col border ${
                  i === 0 || i === 1 ? "border-accent/30 bg-white" : "border-warm bg-white"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    i === 0 || i === 1 ? "bg-accent" : "bg-ink"
                  }`}>
                    <i className={`${icon} text-white text-lg`} />
                  </div>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.25em] text-accent">{frequency}</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-ink leading-snug mb-3">{title}</h3>
                <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-5 flex-1"
                   dangerouslySetInnerHTML={{ __html: body }} />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium uppercase tracking-[0.15em] border border-warm px-3 py-1.5 text-ink/65">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ④  Pillars of Long-Term Recovery ───────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          <div className="text-center mb-12">
            <Eyebrow colorClass="text-accent" className="mb-4">What We Focus On</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mb-5"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05 }}
            >
              Pillars of <em className="italic text-white/60">Long-Term Recovery</em>
            </h2>
            <p className="text-[15px] font-light text-white/65 max-w-2xl mx-auto">
              OP addresses the full architecture of sustained recovery — not just abstinence, but the identity, relationships, and life structure that make it lasting.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map(({ icon, title, desc, accent }) => (
              <div key={title} className="bg-white/5 border border-white/10 p-7 flex flex-col hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-5">
                  <IconCircle icon={icon} variant="accent" size="sm" />
                  {accent && (
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm bg-accent/15 text-accent">
                      Core Focus
                    </span>
                  )}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-white mb-3">{title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-white/75 flex-1"
                   dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑤  Why OP Matters — Stats ───────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-stretch">
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">The Evidence</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Why Ongoing Support Changes Long-Term Outcomes
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                The first year after completing intensive treatment is the highest-risk period in early recovery. Social reintegration, professional pressures, relationship challenges, and the absence of the clinical structure that provided safety during treatment all converge simultaneously.
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Ongoing outpatient support during this critical window is not a crutch — it is the single most evidence-supported intervention for preventing long-term relapse among individuals who have completed higher levels of care. The therapeutic relationship provides both the ongoing processing of challenges and the early warning system that allows the clinical team to respond before a crisis develops."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The alumni community is equally important. Human connection — belonging to a community of people with shared experience and shared commitment — is what the research consistently identifies as recovery's most powerful protective factor over time."}</AutoLinkedText>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Ongoing therapeutic contact provides early detection of relapse risk",
                "Alumni community creates lasting peer recovery capital",
                "Open-ended duration matches recovery's lifelong nature",
                "Psychiatric continuity prevents medication-related destabilization",
                "Relationship repair work deepens over time with a consistent therapist",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <p className="text-[15px] font-light text-ink/70"><AutoLinkedText>{item}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 h-full">
            {whyStats.map(({ stat, detail }) => (
              <div key={stat} className="bg-white border border-warm px-8 py-7 flex items-center gap-6 flex-1">
                <p
                  className="font-[family-name:var(--font-display)] font-normal text-accent shrink-0"
                  style={{ fontSize: "clamp(40px, 4vw, 56px)", lineHeight: 1 }}
                ><AutoLinkedText>{stat}</AutoLinkedText></p>
                <p className="text-[15px] font-light leading-relaxed text-ink/65 pt-2"><AutoLinkedText>{detail}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑥  Who Is OP For? ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[400px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Candidacy</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              Who Benefits From Outpatient?
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-8">
              <AutoLinkedText>{"OP is ideal for individuals who have completed a higher level of care and are ready to take the lead in their recovery — with ongoing professional support alongside, not in front."}</AutoLinkedText>
            </p>
            <Button href="tel:9494612620" variant="ink" size="sm">
              Speak With Admissions
            </Button>
            <p className="mt-4 text-[12px] font-light text-ink/50 leading-relaxed">
              <AutoLinkedText>{"Free &middot; Confidential &middot; No obligation &middot; Same-day response"}</AutoLinkedText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {candidacyItems.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-4 border border-warm px-5 py-4">
                <IconCircle icon={icon} variant="accent-subtle" size="xs" className="shrink-0" />
                <p className="text-[14px] font-light text-ink/75 leading-snug"><AutoLinkedText>{label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑦  The Full Continuum ───────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="Where OP Fits"
            heading="OP in the Full Recovery Continuum"
            body="Standard Outpatient is the final chapter of structured clinical care — but the story of recovery extends well beyond it. The alumni community, ongoing therapeutic access, and the skills built across the continuum become permanent assets."
            headingStyle={{ fontSize: "clamp(36px, 4vw, 54px)", lineHeight: 1.05 }}
            mb="mb-10"
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "ri-building-4-line",
                label: "Came From",
                title: "Intensive Outpatient (IOP)",
                desc: "Three sessions weekly, structured groups, and individual therapy — the level of care that built the stability and skills that make OP successful.",
                href: "/iop-program-orange-county",
                cta: "Learn About IOP",
                accent: false,
              },
              {
                icon: "ri-calendar-line",
                label: "You Are Here",
                title: "Standard Outpatient (OP)",
                desc: "Ongoing individual therapy, alumni groups, and the open-ended clinical partnership that sustains recovery through the full complexity of life.",
                href: "/outpatient-program",
                cta: "Current Level",
                accent: true,
              },
              {
                icon: "ri-video-line",
                label: "Remote Option",
                title: "Virtual Outpatient",
                desc: "If life takes you out of Orange County or you prefer the flexibility of telehealth, virtual OP offers the same clinical depth from anywhere in California.",
                href: "/virtual-outpatient-program",
                cta: "Learn About Virtual",
                accent: false,
              },
            ].map(({ icon, label, title, desc, href, cta, accent }) => (
              <div key={title} className={`flex flex-col p-7 border ${accent ? "border-accent/30 bg-white" : "border-warm bg-white"}`}>
                <div className="flex items-center justify-between mb-5">
                  <IconCircle icon={icon} variant={accent ? "accent-subtle" : "muted-subtle"} size="sm" />
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm ${
                    accent ? "bg-accent/10 text-accent" : "bg-muted/10 text-muted"
                  }`}>
                    {label}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-ink mb-3 leading-snug">{title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-ink/70 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
                <div className="mt-6">
                  <Link href={href} className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-1.5 hover:gap-3 transition-all">
                    {cta} <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑧  FAQs ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Common Questions</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(30px, 3vw, 42px)", lineHeight: 1.1 }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/60 mb-8">
              <AutoLinkedText>{"Our admissions team is available to answer anything you don't find here."}</AutoLinkedText>
            </p>
            <a href="tel:9494612620" className="flex items-center gap-2 text-accent text-[14px] font-medium hover:text-ink transition-colors">
              <i className="ri-phone-line" /> (949)-461-2620
            </a>
          </div>
          <FaqAccordion items={faqs} />
        </SectionWrapper>
      </section>

      {/* ⑨  CTA Banner ───────────────────────────────────────────────────── */}
      <section id="verify" className="bg-ink relative overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #D98A53 0%, transparent 70%)" }}
          aria-hidden
        />
        <SectionWrapper className="text-center relative z-10">
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">
            Continue Your Recovery
          </Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: 1.05, maxWidth: "760px" }}
          >
            Recovery Is a Practice, Not a Destination
          </h2>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-white/55 max-w-xl mx-auto">
            <AutoLinkedText>{"Our admissions team is available 24/7 to discuss your situation, verify insurance, and help you find the right level of ongoing support. All conversations are completely confidential."}</AutoLinkedText>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:9494612620" variant="accent" size="lg">
              <i className="ri-phone-line mr-2" /> Call Now — (949)-461-2620
            </Button>
            <Button href="/levels-of-care" variant="outline-white" size="lg">
              Explore All Programs
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {["Free Insurance Verification", "Open-Ended Duration", "100% Confidential"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line text-accent text-base" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65">{item}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>
    </>
  );
}

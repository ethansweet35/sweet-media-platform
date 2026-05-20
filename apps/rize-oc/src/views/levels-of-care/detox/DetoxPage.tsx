import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import PageHeroShell from "@/components/ui/PageHeroShell";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─────────────────────────────────────────────────── Section data ─────── */

const timelineSteps = [
  {
    day: "Hours 1–12",
    icon: "ri-pulse-line",
    title: "Arrival & Stabilization",
    body: "Within the first hours, our medical team conducts a comprehensive intake assessment — reviewing your substance history, vital signs, and medical background. Your personalized detox protocol begins immediately. Medications are administered as needed, and your comfort and safety are our primary focus.",
    tags: ["Medical Assessment", "Protocol Initiated", "Vitals Monitored"],
  },
  {
    day: "Days 1–2",
    icon: "ri-heart-pulse-line",
    title: "Peak Withdrawal",
    body: "This is typically the most physically intense period. Depending on the substance, you may experience anxiety, nausea, sweating, or more serious symptoms. Our licensed medical team monitors you continuously — adjusting medications and interventions in real time to minimize discomfort and prevent complications.",
    tags: ["24/7 Nurse Coverage", "Medication Management", "Comfort Measures"],
  },
  {
    day: "Days 3–5",
    icon: "ri-leaf-line",
    title: "Physical Stabilization",
    body: "Acute symptoms begin to subside. Sleep patterns start to normalize, appetite returns, and most clients report feeling clearer. Therapeutic introductions begin — you'll meet your primary therapist for the first time, and a gentle initial session establishes the foundation for deeper work ahead.",
    tags: ["Symptoms Subsiding", "Therapy Introduction", "Nutritional Support"],
  },
  {
    day: "Days 6–10",
    icon: "ri-seedling-line",
    title: "Transition Planning",
    body: "As physical stability is achieved, the clinical team collaborates with you on a comprehensive step-down plan. For most clients, this means a seamless handoff to Residential or PHP treatment. Continuity of care is built into every discharge — no gaps, no interruption in therapeutic momentum.",
    tags: ["Clinical Discharge Plan", "Next Level Arranged", "Family Communication"],
  },
];

const substances = [
  {
    icon: "ri-goblet-line",
    title: "Alcohol",
    desc: "Alcohol withdrawal can be medically serious — including seizures and delirium tremens (DTs). Medical supervision is essential. We use evidence-based protocols including benzodiazepine tapering to ensure safe, comfortable withdrawal.",
    urgency: "High Medical Risk",
    urgencyColor: "text-rose-600 bg-rose-50",
  },
  {
    icon: "ri-capsule-line",
    title: "Opioids",
    desc: "Heroin, fentanyl, oxycodone, and other opioids cause intense physical withdrawal. Our team uses Buprenorphine (Suboxone) and other MAT protocols to dramatically reduce cravings and discomfort from day one.",
    urgency: "High Discomfort Risk",
    urgencyColor: "text-orange-600 bg-orange-50",
  },
  {
    icon: "ri-medicine-bottle-line",
    title: "Benzodiazepines",
    desc: "Benzo withdrawal (Xanax, Klonopin, Valium) is among the most medically dangerous of all detox processes. A slow, monitored taper under physician guidance is critical to prevent potentially life-threatening complications.",
    urgency: "Critical Medical Risk",
    urgencyColor: "text-rose-700 bg-rose-50",
  },
  {
    icon: "ri-flashlight-line",
    title: "Stimulants",
    desc: "Cocaine, methamphetamine, and prescription stimulants produce a distinctive psychological withdrawal — intense depression, fatigue, and powerful cravings. Psychiatric support is woven into detox from the first day.",
    urgency: "Psychiatric Risk",
    urgencyColor: "text-purple-600 bg-purple-50",
  },
  {
    icon: "ri-drop-line",
    title: "Marijuana",
    desc: "While not physically dangerous, cannabis withdrawal produces anxiety, insomnia, irritability, and appetite disruption that can derail early recovery. Clinical support and sleep management make a significant difference.",
    urgency: "Psychological Risk",
    urgencyColor: "text-yellow-700 bg-yellow-50",
  },
  {
    icon: "ri-layers-line",
    title: "Polysubstance",
    desc: "Multiple simultaneous dependencies require complex, highly individualized medical management. Our team is experienced in the layered presentation of polysubstance withdrawal and designs protocols accordingly.",
    urgency: "Complex Management",
    urgencyColor: "text-white/70 bg-white/10",
  },
];

const whyStats = [
  { stat: "1 in 8", detail: "people experience life-threatening seizures during unmanaged alcohol withdrawal" },
  { stat: "3–5×",  detail: "higher complication rate in unsupervised detox vs. medically managed care" },
  { stat: "37%",   detail: "of people who attempt unsupervised opioid detox relapse within the first 24 hours" },
  { stat: "90%+",  detail: "reduction in severe withdrawal symptoms with proper medication-assisted protocols" },
];

const candidacyItems = [
  { icon: "ri-goblet-line",          label: "History of heavy or daily alcohol use" },
  { icon: "ri-capsule-line",         label: "Opioid dependence or prescription medication misuse" },
  { icon: "ri-medicine-bottle-line", label: "Benzodiazepine use of any duration or dose" },
  { icon: "ri-heart-pulse-line",     label: "Past withdrawal complications (seizures, delirium)" },
  { icon: "ri-layers-line",          label: "Multiple substances being used simultaneously" },
  { icon: "ri-building-4-line",      label: "Previous failed attempts at home or outpatient detox" },
  { icon: "ri-mental-health-line",   label: "Co-occurring medical or psychiatric conditions" },
  { icon: "ri-user-heart-line",      label: "Desire for professional support through the first days" },
];

const afterDetox = [
  {
    icon: "ri-building-4-line",
    label: "Most Intensive",
    title: "Partial Hospitalization (PHP)",
    desc: "Six hours of daily clinical programming — the natural next step for most detox clients. Deep individual therapy, group process, psychiatric oversight, and holistic modalities in a structured daytime format.",
    href: "/partial-hospitalization-program-orange-county",
    cta: "Learn About PHP",
    accent: true,
  },
  {
    icon: "ri-home-2-line",
    label: "Moderate Intensity",
    title: "Intensive Outpatient (IOP)",
    desc: "For clients with strong home support and lower intensity needs, IOP provides structured group and individual therapy several times per week while living at home or in sober living.",
    href: "/iop-program-orange-county",
    cta: "Learn About IOP",
    accent: false,
  },
  {
    icon: "ri-video-line",
    label: "Remote Option",
    title: "Virtual Outpatient",
    desc: "Continue clinical care from anywhere in California via our secure telehealth platform. All the depth of in-person programming, delivered to wherever you are.",
    href: "/virtual-outpatient-program",
    cta: "Learn About Virtual",
    accent: false,
  },
];

const faqs: FaqItem[] = [
  {
    q: "Is medical detox always necessary before treatment?",
    a: "Not always, but it is essential for anyone with significant physical dependence on alcohol, opioids, or benzodiazepines. These substances carry real medical risk during withdrawal — including seizures and cardiovascular complications. For stimulant and cannabis users, the physical risk is lower, but clinical support still makes a measurable difference in early outcomes. Our admissions team will conduct a thorough assessment to determine whether medically supervised detox is indicated for your specific situation.",
  },
  {
    q: "What does withdrawal actually feel like?",
    a: "Withdrawal varies significantly by substance, duration of use, and individual physiology. Alcohol and benzo withdrawal typically involve anxiety, tremors, sweating, elevated heart rate, and in serious cases, seizures. Opioid withdrawal produces intense flu-like symptoms — nausea, muscle cramps, insomnia, and powerful cravings. Stimulant withdrawal is primarily psychological — deep fatigue, depression, and anhedonia. At Rize OC, medications and comfort measures are tailored to your specific withdrawal profile from day one.",
  },
  {
    q: "How long does detox take?",
    a: "Most detox programs run 3 to 10 days, depending on the substance, the severity of dependence, and how your body responds to the withdrawal management protocol. Alcohol detox typically resolves within 5–7 days. Opioid detox peaks at 2–3 days and largely resolves by day 7–10. Benzo detox may require a longer, more gradual taper spanning weeks. Our team monitors your progress daily and will not discharge you to the next level of care until you are medically and psychologically ready.",
  },
  {
    q: "Will I be in pain during detox?",
    a: "Our priority is your safety and comfort. We use evidence-based medications — including Buprenorphine for opioid withdrawal, Librium or Ativan for alcohol/benzo withdrawal, and adjunctive medications for sleep, nausea, and anxiety — to reduce the intensity of withdrawal significantly. Complementary comfort measures including IV hydration, massage therapy, nutritional support, and private suite accommodations further ease the process. Detox at Rize is not about enduring — it is about healing.",
  },
  {
    q: "Can I bring my phone or laptop?",
    a: "During detox, we encourage minimal outside contact during the first 24–48 hours to allow your nervous system to stabilize without additional stimulation. After the initial acute phase, our team will discuss a structured communication plan based on your clinical needs, family situation, and professional responsibilities. Executive clients often have customized plans that accommodate essential work duties while preserving the integrity of the detox process.",
  },
  {
    q: "What happens after detox?",
    a: "Detox addresses the physical dimension of addiction — but the psychological, behavioral, and relational dimensions require structured clinical work that begins after medical stabilization. Most Rize OC detox clients transition directly into our Partial Hospitalization Program (PHP), which delivers six hours of daily clinical programming including individual therapy, group process, trauma work, and psychiatric support. Our clinical team handles the entire transition, ensuring there is no gap in care from your last day of detox to your first day of treatment.",
  },
  {
    q: "Does insurance cover medical detox?",
    a: "Yes — medical detox is typically covered as a medically necessary service by most major PPO insurance plans. Coverage levels vary by plan, deductible, and network status. Our dedicated insurance verification team contacts your provider directly to determine your specific benefits, out-of-pocket responsibilities, and authorization requirements before admission. We do not accept Medicaid or Medi-Cal at this time.",
  },
  {
    q: "What if I have a co-occurring mental health condition?",
    a: "Co-occurring disorders — such as depression, anxiety, PTSD, or bipolar disorder — are extremely common among individuals with substance use disorders. In fact, more than half of our detox clients present with a diagnosable co-occurring condition. Our psychiatric team is embedded in the detox process from day one, assessing and treating both dimensions simultaneously. This integrated approach sets the foundation for the dual-diagnosis treatment that continues in PHP and beyond.",
  },
];

/* ─────────────────────────────────────────────────── Page component ────── */

export default function DetoxPage() {
  return (
    <>
      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <CinematicHeroSection
        media={
          <>
            <Image
              src="https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images/detox_hero04.jpg"
              alt="Luxury coastal recovery facility outdoor terrace at Rize OC, Orange County"
              fill
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(44,48,46,1) 0%, rgba(44,48,46,0.92) 30%, rgba(44,48,46,0.65) 55%, rgba(44,48,46,0.2) 100%)" }}
            />
          </>
        }
      >
        <PageHeroShell
          topSlot={<Eyebrow colorClass="text-accent">Levels of Care — Step 1</Eyebrow>}
          bottomBar={
            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
              {[
                { value: "24/7",  label: "Medical Coverage" },
                { value: "3–10",  label: "Day Average Stay" },
                { value: "1:3",   label: "Max Client Ratio" },
                { value: "100%",  label: "Confidential" },
              ].map(({ value, label }) => (
                <div key={label} className="px-8 py-5 border-r border-white/10 last:border-r-0 bg-ink/50 backdrop-blur-sm">
                  <p className="font-[family-name:var(--font-display)] text-[28px] font-normal text-white leading-none"><AutoLinkedText>{value}</AutoLinkedText></p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50 mt-1.5"><AutoLinkedText>{label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          }
        >
            {/* Left — headline */}
            <div className="flex-1 max-w-3xl">
              <h1
                className="font-[family-name:var(--font-display)] font-normal text-white"
                style={{ fontSize: "clamp(52px, 6.5vw, 96px)", lineHeight: 0.95 }}
              >
                Drug &amp; Alcohol<br />
                <em className="italic text-white/60">Medical Detox</em>
              </h1>

              <p className="mt-6 text-[16px] font-light leading-relaxed text-white/80 max-w-[520px]">
                <AutoLinkedText>{"The medically supervised first step — eliminating substances from the body safely so that lasting recovery work can begin."}</AutoLinkedText>
              </p>
            </div>

            {/* Right — CTAs + trust */}
            <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
              <div className="flex flex-wrap gap-3">
                <Button href="#verify" variant="accent" size="md">
                  Verify Insurance — Free
                </Button>
                <Button href="tel:9494612620" variant="outline-white" size="md">
                  <i className="ri-phone-line mr-2 text-sm" /> (949)-461-2620
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {[
                  { icon: "ri-checkbox-circle-line", text: "Joint Commission Accredited" },
                  { icon: "ri-shield-check-line",    text: "DHCS Licensed" },
                  { icon: "ri-time-line",            text: "Same-Day Admissions" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <i className={`${icon} text-accent text-sm`} />
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
        </PageHeroShell>
      </CinematicHeroSection>

      {/* ②  What Is Detox? ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_400px] gap-16 items-stretch">
          {/* Left — rich text */}
          <div className="flex flex-col h-full">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Understanding Detox</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              What Happens in the Body During Detox
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"When someone uses a substance repeatedly over time, the brain adapts — recalibrating its chemistry to function in the presence of that substance. Neurotransmitter systems are suppressed or amplified to compensate. The brain, in a sense, rewires itself around the substance."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"When the substance is suddenly absent, the brain's compensation mechanisms are exposed — driving withdrawal symptoms that can range from uncomfortable to life-threatening, depending on the substance and the degree of physical dependence."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Medical detox provides a structured, supervised environment where withdrawal is actively managed. Physicians monitor vital signs, administer evidence-based medications, and adjust protocols in real time — dramatically reducing both the danger and the discomfort of the process."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"It is equally important to understand what detox is not. Detox alone does not treat addiction — it addresses the acute physical dimension only. The psychological patterns, behavioral habits, and emotional roots of substance use require the structured clinical work that begins in the next level of care. At Rize OC, detox and treatment are designed as a seamless continuum, not two separate events."}</AutoLinkedText>
              </p>
            </div>

            <blockquote className="mt-auto pt-8 border-l-2 border-accent pl-6">
              <p className="text-[17px] font-[family-name:var(--font-display)] font-normal text-ink/70 leading-snug italic">
                <AutoLinkedText>{"\"Detox without medical supervision is not bravery — it is unnecessary risk. Science has given us the tools to make this process significantly safer and more humane.\""}</AutoLinkedText>
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">
                <AutoLinkedText>{"Rize OC Medical Director"}</AutoLinkedText>
              </p>
            </blockquote>
          </div>

          {/* Right — stat callouts */}
          <div className="flex flex-col gap-5 h-full">
            {/* Why it matters card */}
            <div className="bg-ink p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-4">
                <AutoLinkedText>{"Why Supervision Matters"}</AutoLinkedText>
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "ri-stethoscope-line",  point: "Prevents life-threatening complications like seizures and cardiac events" },
                  { icon: "ri-capsule-line",       point: "Medication management reduces withdrawal severity by up to 90%" },
                  { icon: "ri-emotion-happy-line", point: "Comfort-focused protocols dramatically improve treatment retention" },
                  { icon: "ri-refresh-line",       point: "Proper detox sets the neurological foundation for lasting recovery" },
                ].map(({ icon, point }) => (
                  <div key={point} className="flex items-start gap-3">
                    <i className={`${icon} text-accent text-base shrink-0 mt-0.5`} />
                    <p className="text-sm font-light text-white/65 leading-snug"><AutoLinkedText>{point}</AutoLinkedText></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="border border-warm p-7 flex flex-col gap-5 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/60">
                Quick Facts
              </p>
              {[
                { label: "Program Length",   value: "3–10 Days" },
                { label: "Medical Coverage", value: "24/7 On-Site" },
                { label: "Client Ratio",     value: "1:3 Maximum" },
                { label: "Admissions",       value: "Same Day" },
                { label: "Insurance",        value: "Most PPO Plans" },
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

      {/* ③  What to Expect — Timeline ────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="The Detox Process"
            heading="What to Expect — Day by Day"
            body="Every detox experience is shaped by individual physiology and substance history. This is a general guide — your medical team will walk you through your specific protocol before it begins."
            headingStyle={{ fontSize: "clamp(38px, 4vw, 56px)", lineHeight: 1.05 }}
            mb="mb-14"
          />

          {/* Timeline — 2-column grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {timelineSteps.map(({ day, icon, title, body, tags }, i) => (
              <div
                key={i}
                className={`p-8 flex flex-col border ${
                  i === 0 || i === 1 ? "border-accent/30 bg-white" : "border-warm bg-white"
                }`}
              >
                {/* Step header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    i === 0 || i === 1 ? "bg-accent" : "bg-ink"
                  }`}>
                    <i className={`${icon} text-white text-lg`} />
                  </div>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.25em] text-accent">{day}</span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-ink leading-snug mb-3">
                  {title}
                </h3>
                <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-5 flex-1"><AutoLinkedText>{body}</AutoLinkedText></p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium uppercase tracking-[0.15em] border border-warm px-3 py-1.5 text-ink/65">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ④  Substances We Treat ──────────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          {/* Manual header — SectionHeader hardcodes text-ink, unusable on bg-ink */}
          <div className="text-center mb-12">
            <Eyebrow colorClass="text-accent" className="mb-4">Detox Programs</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mb-5"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05 }}
            >
              Substances We <em className="italic text-white/60">Treat</em>
            </h2>
            <p className="text-[15px] font-light text-white/65 max-w-2xl mx-auto">
              <AutoLinkedText>{"Our medical team is experienced in managing withdrawal from every major substance — including complex polysubstance presentations."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {substances.map(({ icon, title, desc, urgency, urgencyColor }) => (
              <div key={title} className="bg-white/5 border border-white/10 p-7 flex flex-col hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-5">
                  <IconCircle icon={icon} variant="accent" size="sm" />
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm ${urgencyColor}`}>
                    {urgency}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-white mb-3">
                  {title}
                </h3>
                <p className="text-[14px] font-light leading-relaxed text-white/75 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-white/10 bg-white/5 px-8 py-5 text-center">
            <p className="text-[15px] font-light text-white/70">
              <span className="text-white font-medium">Don&apos;t see your substance listed?</span>{" "}
              Call our admissions team — we conduct individualized assessments and can treat a wide range of dependencies and polysubstance presentations.
            </p>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑤  Why Medical Detox Matters ────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-stretch">
          {/* Left — content */}
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">Safety First</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Why Detoxing Alone Is Dangerous
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Withdrawal is not simply uncomfortable — for alcohol, benzodiazepines, and some opioid presentations, it can be life-threatening. Seizures, cardiac arrhythmias, and delirium tremens are medical emergencies that occur without warning in unmanaged withdrawal."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Even when withdrawal is not medically dangerous, the intensity of symptoms is the most common reason people relapse in the first days of a recovery attempt. Returning to use to relieve withdrawal symptoms is not a moral failure — it is a predictable physiological response that medical support can prevent."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Medical detox changes the calculus entirely. Evidence-based withdrawal management medications — combined with continuous medical monitoring — dramatically reduce both the danger and the discomfort, giving you the best possible foundation for the treatment work that follows."}</AutoLinkedText>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Seizure prevention and management",
                "Cardiac monitoring and intervention",
                "Delirium tremens (DT) recognition and treatment",
                "Medication-assisted relief of acute withdrawal symptoms",
                "Immediate psychiatric support for co-occurring conditions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <p className="text-[15px] font-light text-ink/70"><AutoLinkedText>{item}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bold stats */}
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

      {/* ⑥  Who This Is For ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[400px_1fr] gap-16 items-start">
          {/* Left — intro */}
          <div className="lg:sticky lg:top-28">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Candidacy</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              Who Is Medical Detox For?
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-8">
              <AutoLinkedText>{"Medical detox is indicated for any individual with significant physical dependence on a substance. If you're unsure whether you need detox, our admissions team will assess your situation and give you an honest recommendation."}</AutoLinkedText>
            </p>
            <Button href="tel:9494612620" variant="ink" size="sm">
              Speak With Admissions
            </Button>
            <p className="mt-4 text-[12px] font-light text-ink/50 leading-relaxed">
              <AutoLinkedText>{"Free &middot; Confidential &middot; No obligation &middot; Same-day response"}</AutoLinkedText>
            </p>
          </div>

          {/* Right — icon cards */}
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

      {/* ⑦  What Comes After Detox ───────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="The Continuum"
            heading="Detox Is Step One — Not the Only Step"
            body="Detox addresses the physical dimension of addiction. The psychological, behavioral, and relational healing that sustains long-term recovery requires structured clinical treatment that begins immediately after."
            headingStyle={{ fontSize: "clamp(36px, 4vw, 54px)", lineHeight: 1.05 }}
            mb="mb-10"
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {afterDetox.map(({ icon, label, title, desc, href, cta, accent }) => (
              <div key={title} className={`flex flex-col p-7 border ${accent ? "border-accent/30 bg-white" : "border-warm bg-white"}`}>
                <div className="flex items-center justify-between mb-5">
                  <IconCircle
                    icon={icon}
                    variant={accent ? "accent-subtle" : "muted-subtle"}
                    size="sm"
                  />
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm ${
                    accent ? "bg-accent/10 text-accent" : "bg-muted/10 text-muted"
                  }`}>
                    {label}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-ink mb-3 leading-snug">
                  {title}
                </h3>
                <p className="text-[14px] font-light leading-relaxed text-ink/70 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
                <div className="mt-6">
                  <Link
                    href={href}
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-1.5 hover:gap-3 transition-all"
                  >
                    {cta} <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-ink px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[15px] font-light text-white/75">
              <span className="text-white font-medium">Seamless transition guaranteed.</span>{" "}
              Our clinical team arranges every step — so you never have to navigate the transition alone.
            </p>
            <Link
              href="/levels-of-care"
              className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap"
            >
              View All Levels <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑧  FAQs ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
          {/* Left — sticky intro */}
          <div className="lg:sticky lg:top-28">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Common Questions</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(30px, 3vw, 42px)", lineHeight: 1.1 }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/60 mb-8">
              <AutoLinkedText>{"Questions are a natural part of this process. Our admissions team is also available to answer anything you don't find here."}</AutoLinkedText>
            </p>
            <a
              href="tel:9494612620"
              className="flex items-center gap-2 text-accent text-[14px] font-medium hover:text-ink transition-colors"
            >
              <i className="ri-phone-line" /> (949)-461-2620
            </a>
          </div>

          {/* Right — accordion */}
          <FaqAccordion items={faqs} />
        </SectionWrapper>
      </section>

      {/* ⑨  CTA Banner ───────────────────────────────────────────────────── */}
      <section id="verify" className="bg-ink relative overflow-hidden">
        {/* Subtle amber glow */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #D98A53 0%, transparent 70%)" }}
          aria-hidden
        />
        <SectionWrapper className="text-center relative z-10">
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">
            Begin Your Recovery
          </Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: 1.05, maxWidth: "760px" }}
          >
            You Don&apos;t Have to Navigate This Alone
          </h2>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-white/55 max-w-xl mx-auto">
            <AutoLinkedText>{"Our admissions team is available 24 hours a day, 7 days a week — to answer your questions, verify your insurance, and help you understand every option. All conversations are completely confidential."}</AutoLinkedText>
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
            {[
              "Free Insurance Verification",
              "Same-Day Admissions Available",
              "100% Confidential",
            ].map((item) => (
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

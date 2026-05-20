import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import { CINEMATIC_PHP_HERO_GRADIENT } from "@/lib/cinematicHeroStyles";
import { PAGE_GRID } from "@/components/ui/PageHeroShell";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─────────────────────────────────────────────────── Section data ─────── */

const daySchedule = [
  {
    time: "8:00 – 9:00 AM",
    icon: "ri-sun-line",
    title: "Morning Mindfulness & Check-in",
    body: "Each day begins with a grounding group — mindfulness practice, intention-setting, and a brief clinical check-in to assess emotional state and goals for the day. This sets the tone and ensures the clinical team is aware of each client's starting point.",
    tags: ["Mindfulness", "Group Check-in", "Goal Setting"],
  },
  {
    time: "9:00 AM – 12:00 PM",
    icon: "ri-mental-health-line",
    title: "Core Therapy Block",
    body: "The morning's primary clinical work. Individual therapy sessions run alongside structured group therapy — covering trauma processing, CBT and DBT skill development, and evidence-based modalities such as EMDR. This is where the deepest clinical work happens.",
    tags: ["Individual Therapy", "Group Process", "EMDR / CBT / DBT"],
  },
  {
    time: "12:00 – 1:00 PM",
    icon: "ri-restaurant-line",
    title: "Meal & Community Time",
    body: "A shared, supported meal provides nutritional restoration and an opportunity for natural peer connection in a clinical setting. Nutritional education and mindful eating practices are woven into this time.",
    tags: ["Nutritional Support", "Community Building", "Mindful Eating"],
  },
  {
    time: "1:00 – 3:00 PM",
    icon: "ri-seedling-line",
    title: "Experiential & Holistic Programming",
    body: "Afternoons rotate between art therapy, somatic movement, equine-assisted therapy, meditation, yoga, and community outings. These modalities address the dimensions of healing that talk therapy alone cannot reach — the body, the creative mind, and the relational self.",
    tags: ["Art Therapy", "Movement", "Somatic Work"],
  },
];

const modalities = [
  {
    icon: "ri-mental-health-line",
    title: "EMDR Therapy",
    desc: "Eye Movement Desensitization and Reprocessing — the gold-standard trauma protocol — delivered by licensed EMDR-trained therapists.",
    accent: true,
  },
  {
    icon: "ri-brain-line",
    title: "CBT & DBT",
    desc: "Cognitive Behavioral and Dialectical Behavior Therapy provide practical, evidence-based frameworks for changing thought patterns and emotional regulation.",
    accent: true,
  },
  {
    icon: "ri-leaf-line",
    title: "Somatic Therapy",
    desc: "Body-based approaches addressing the physiological dimension of trauma and addiction that is stored in the nervous system.",
    accent: false,
  },
  {
    icon: "ri-palette-line",
    title: "Art & Expressive Therapy",
    desc: "Creative modalities that allow clients to process experiences that are difficult to articulate through language alone.",
    accent: false,
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Equine-Assisted Therapy",
    desc: "Working with horses in structured, therapeutically guided sessions builds self-awareness, emotional regulation, and relational capacity.",
    accent: false,
  },
  {
    icon: "ri-medicine-bottle-line",
    title: "Psychiatric Oversight",
    desc: "Embedded psychiatrists manage medication, monitor co-occurring mental health conditions, and provide crisis intervention as needed.",
    accent: false,
  },
];

const whyStats = [
  { stat: "2–4×", detail: "higher treatment completion rate in PHP versus outpatient-only approaches for dual-diagnosis clients" },
  { stat: "68%",  detail: "of clients who complete PHP report sustained sobriety at 12-month follow-up versus 34% for lower levels of care" },
  { stat: "87%",  detail: "reduction in psychiatric hospitalization risk with intensive PHP treatment for co-occurring mental health conditions" },
  { stat: "6hrs", detail: "of daily clinical programming — equivalent to what residential treatment provides, with home evening transition" },
];

const candidacyItems = [
  { icon: "ri-capsule-line",        label: "Recently completed medical detox or residential treatment" },
  { icon: "ri-mental-health-line",  label: "Significant anxiety, depression, or trauma alongside substance use" },
  { icon: "ri-heart-pulse-line",    label: "Co-occurring psychiatric condition requiring daily monitoring" },
  { icon: "ri-home-2-line",         label: "Stable sober living or supportive home environment each evening" },
  { icon: "ri-refresh-line",        label: "History of relapse at lower levels of care" },
  { icon: "ri-shield-check-line",   label: "Motivated for intensive work but does not require 24/7 supervision" },
  { icon: "ri-calendar-check-line", label: "Able to commit to 5–6 hours of programming per day" },
  { icon: "ri-team-line",           label: "Benefits from a strong peer community and shared group process" },
];

const afterPhp = [
  {
    icon: "ri-group-line",
    label: "Next Step",
    title: "Intensive Outpatient (IOP)",
    desc: "The natural step-down from PHP — 3 to 9 hours of weekly clinical programming that integrates recovery into your daily life while maintaining work, family, and community connections.",
    href: "/iop-program-orange-county",
    cta: "Learn About IOP",
    accent: true,
  },
  {
    icon: "ri-calendar-line",
    label: "Continued Care",
    title: "Standard Outpatient (OP)",
    desc: "For clients with strong stability and home support, OP provides ongoing individual therapy and relapse prevention planning at one to two sessions per week.",
    href: "/outpatient-program",
    cta: "Learn About OP",
    accent: false,
  },
  {
    icon: "ri-video-line",
    label: "Remote Option",
    title: "Virtual Outpatient",
    desc: "Continue PHP or IOP-level clinical work from anywhere in California — same clinicians, same evidence-based curriculum, delivered via secure telehealth.",
    href: "/virtual-outpatient-program",
    cta: "Learn About Virtual",
    accent: false,
  },
];

const faqs: FaqItem[] = [
  {
    q: "What exactly is a Partial Hospitalization Program?",
    a: "PHP is the most intensive outpatient level of behavioral health treatment — typically 5 to 6 hours of daily clinical programming, 5 to 7 days per week. You attend structured therapy during the day and return to a sober living or home environment each evening. It provides the full clinical breadth of inpatient treatment without the around-the-clock residential component. PHP is widely considered the most effective step-down from residential treatment and the most appropriate first level for clients with significant co-occurring psychiatric conditions.",
  },
  {
    q: "How is PHP different from IOP?",
    a: "The primary difference is intensity and structure. PHP provides 5 to 6 hours of daily programming, typically five or more days per week — approximately 25 to 30 hours of clinical contact per week. IOP typically involves 3 to 9 hours of programming per week, usually spread across three sessions. PHP is appropriate for clients who require a higher degree of structure, psychiatric monitoring, and clinical intensity. IOP is appropriate for clients who have achieved a foundation of stability and are ready to integrate recovery more deeply into their daily lives.",
  },
  {
    q: "Do I need to complete detox before PHP?",
    a: "For clients with substance use disorders, medical detox is almost always completed before entering PHP. Detox addresses the acute physical dimension of withdrawal — it is a medical process, not a therapeutic one. PHP addresses the psychological, behavioral, and relational dimensions that require stability to engage with productively. Attempting to do deep trauma or CBT work while in acute physical withdrawal is neither safe nor effective. Our admissions team assesses each situation individually and will recommend the appropriate entry point.",
  },
  {
    q: "Where do I stay while in PHP?",
    a: "Most Rize OC PHP clients stay in one of several affiliated sober living residences close to our program site — structured, supportive, and monitored environments that provide the evening stability that complements the intensity of daytime PHP programming. Some clients with strong home support and appropriate family environments choose to return home each evening. Our clinical team will discuss what's right for your situation during the admissions assessment.",
  },
  {
    q: "What mental health conditions does PHP treat?",
    a: "Rize OC's PHP treats a wide range of co-occurring conditions alongside substance use disorders — including depression, generalized anxiety disorder, PTSD and complex trauma, bipolar disorder, ADHD, social anxiety, panic disorder, and borderline personality features. Our integrated treatment model addresses both dimensions simultaneously, recognizing that treating addiction without addressing underlying mental health conditions dramatically reduces the likelihood of lasting recovery.",
  },
  {
    q: "Does insurance cover PHP?",
    a: "Yes. PHP is classified as a medically necessary, intensive behavioral health service by most major PPO insurance providers. Coverage levels vary by plan, deductible, and network status — but the majority of our clients receive meaningful insurance benefits toward PHP treatment. Our insurance verification team contacts your provider directly, determines your specific coverage, and provides a transparent breakdown of estimated out-of-pocket costs before admission. We do not accept Medicaid or Medi-Cal.",
  },
  {
    q: "How long does PHP last?",
    a: "The average PHP stay at Rize OC is two to four weeks, but duration is determined entirely by clinical progress — not by insurance pre-authorization or arbitrary time limits. Our team assesses readiness to step down based on stability, skill acquisition, and clinical assessment. Some clients with complex trauma or severe co-occurring conditions benefit from longer PHP engagement before stepping down. We will always advocate for the level and duration of care that gives you the best clinical outcome.",
  },
  {
    q: "Can I continue working while in PHP?",
    a: "PHP programming runs from approximately 8 AM to 3 PM, which makes evening and weekend work possible for some clients. However, PHP is an intensive level of care — most clients find that meaningful engagement with the therapeutic process requires significant mental and emotional energy. Working while in PHP is possible in some cases, particularly for executive clients with highly structured situations, but it is discussed individually during admissions. The clinical team will provide an honest assessment of what is feasible without compromising treatment.",
  },
];

/* ─────────────────────────────────────────────────── Page component ────── */

export default function PhpPage() {
  return (
    <>
      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <CinematicHeroSection
        minHeight="min-h-screen"
        contentClassName="justify-between"
        media={
          <>
            <Image
              src={`${BASE}/php_hero03.jpg`}
              alt="Bright premium group therapy room at Rize OC Partial Hospitalization Program in Orange County"
              fill
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: CINEMATIC_PHP_HERO_GRADIENT }}
            />
            <span
              className="pointer-events-none absolute right-[3%] top-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] italic font-normal leading-none text-white/[0.04]"
              style={{ fontSize: "clamp(160px, 22vw, 320px)" }}
              aria-hidden
            >02</span>
          </>
        }
      >
        <div className="flex flex-1 flex-col justify-center">
          <div className={`${PAGE_GRID} py-16 lg:py-20`}>
            <Eyebrow colorClass="text-accent" className="mb-6">Levels of Care — Step 2</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white max-w-[760px]"
              style={{ fontSize: "clamp(48px, 6vw, 92px)", lineHeight: 0.95 }}
            >
              Partial Hospitalization<br />
              <em className="italic text-white/60">Program (PHP)</em>
            </h1>
            <p className="mt-6 text-[16px] font-light leading-relaxed text-white/75 max-w-[520px]">
              <AutoLinkedText>{"Six hours of daily intensive clinical programming — the full therapeutic depth of residential treatment, with the healing freedom of home each evening."}</AutoLinkedText>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#verify" variant="accent" size="md">Verify Insurance — Free</Button>
              <Button href="tel:9494612620" variant="outline-white" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> (949)-461-2620
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8">
              {[
                { value: "6hrs", label: "Daily Programming" },
                { value: "5–7",  label: "Days Per Week" },
                { value: "2–4",  label: "Week Average Stay" },
                { value: "1:3",  label: "Staff-to-Client Ratio" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-[family-name:var(--font-display)] text-[28px] font-normal text-white leading-none"><AutoLinkedText>{value}</AutoLinkedText></p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45 mt-1.5"><AutoLinkedText>{label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continuum progress strip */}
        <div className="border-t border-white/10">
          <div className={`${PAGE_GRID} flex`}>
            {[
              { num: "01", label: "Detox",   href: "/drug-alcohol-detox",                          active: false },
              { num: "02", label: "PHP",     href: "/partial-hospitalization-program-orange-county", active: true  },
              { num: "03", label: "IOP",     href: "/iop-program-orange-county",                    active: false },
              { num: "04", label: "OP",      href: "/outpatient-program",                            active: false },
              { num: "05", label: "Virtual", href: "/virtual-outpatient-program",                    active: false },
            ].map(({ num, label, href, active }) => (
              <Link
                key={href}
                href={href}
                className={`relative flex-1 flex flex-col items-center justify-center py-4 border-r border-white/10 last:border-r-0 transition-colors ${
                  active ? "bg-accent/10" : "hover:bg-white/5"
                }`}
              >
                <span className="text-[9px] font-medium tracking-[0.3em] text-white/25">{num}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] mt-0.5 transition-colors ${
                  active ? "text-accent" : "text-white/40 hover:text-white/70"
                }`}>{label}</span>
                {active && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />}
              </Link>
            ))}
          </div>
        </div>
      </CinematicHeroSection>

      {/* ②  What Is PHP? ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_400px] gap-16 items-stretch">
          <div className="flex flex-col h-full">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Understanding PHP</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Hospital-Level Care, Without the Hospital
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Partial Hospitalization is a classification recognized by every major insurance provider and behavioral health licensing body — it represents the highest intensity of outpatient care available. At Rize OC, PHP delivers the full clinical breadth of residential programming in a structured daytime format."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Five to six hours of programming per day, five or more days per week, means a PHP client at Rize is receiving 25 to 30 hours of direct clinical contact every week — more than most residential programs actually deliver, when you subtract meals, sleep, and unstructured time."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The evening transition component is not a compromise — it is a clinical advantage. Returning to a real environment each evening means PHP clients practice newly learned skills in real situations, with the safety net of returning to the program the next morning to process what happened."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"For clients with dual-diagnosis presentations — substance use alongside depression, trauma, anxiety, or bipolar disorder — PHP's embedded psychiatric team provides the medication management and daily monitoring that makes comprehensive integrated treatment possible."}</AutoLinkedText>
              </p>
            </div>

            <blockquote className="mt-auto pt-8 border-l-2 border-accent pl-6">
              <p className="text-[17px] font-[family-name:var(--font-display)] font-normal text-ink/70 leading-snug italic">
                <AutoLinkedText>{"\"PHP is not a step down from residential — for dual-diagnosis clients, it is often where the real work begins. The combination of intensive daytime programming and real-world evening application is uniquely powerful.\""}</AutoLinkedText>
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">
                <AutoLinkedText>{"Rize OC Clinical Director"}</AutoLinkedText>
              </p>
            </blockquote>
          </div>

          <div className="flex flex-col gap-5 h-full">
            <div className="bg-ink p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-4">
                Why PHP Works
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "ri-time-2-line",       point: "25–30 hours of clinical contact weekly — more than most residential programs" },
                  { icon: "ri-refresh-line",       point: "Real-world evening application of skills learned in daytime programming" },
                  { icon: "ri-stethoscope-line",   point: "Embedded psychiatric oversight and daily medication management" },
                  { icon: "ri-group-line",         point: "Strong peer community with shared context and mutual accountability" },
                ].map(({ icon, point }) => (
                  <div key={point} className="flex items-start gap-3">
                    <i className={`${icon} text-accent text-base shrink-0 mt-0.5`} />
                    <p className="text-sm font-light text-white/65 leading-snug"><AutoLinkedText>{point}</AutoLinkedText></p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-warm p-7 flex flex-col gap-5 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/60">
                Quick Facts
              </p>
              {[
                { label: "Daily Hours",     value: "5–6 Hours" },
                { label: "Days Per Week",   value: "5–7 Days" },
                { label: "Average Stay",    value: "2–4 Weeks" },
                { label: "Staff Ratio",     value: "1:3 Maximum" },
                { label: "Insurance",       value: "Most PPO Plans" },
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

      {/* ③  A Typical PHP Day ────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="The PHP Day"
            heading="What a Day in PHP Actually Looks Like"
            body="No two days are identical — programming rotates to address different therapeutic dimensions. But each day follows this intentional rhythm, balancing intensity with restoration."
            headingStyle={{ fontSize: "clamp(38px, 4vw, 56px)", lineHeight: 1.05 }}
            mb="mb-14"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {daySchedule.map(({ time, icon, title, body, tags }, i) => (
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
                  <span className="text-[13px] font-semibold uppercase tracking-[0.25em] text-accent">{time}</span>
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

      {/* ④  Therapies & Modalities ───────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          <div className="text-center mb-12">
            <Eyebrow colorClass="text-accent" className="mb-4">Clinical Approach</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mb-5"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05 }}
            >
              Therapies &amp; <em className="italic text-white/60">Modalities</em>
            </h2>
            <p className="text-[15px] font-light text-white/65 max-w-2xl mx-auto">
              <AutoLinkedText>{"Rize OC PHP integrates the most evidence-based clinical modalities available — delivered by licensed clinicians with specialized training in each approach."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modalities.map(({ icon, title, desc, accent }) => (
              <div key={title} className="bg-white/5 border border-white/10 p-7 flex flex-col hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-5">
                  <IconCircle icon={icon} variant="accent" size="sm" />
                  {accent && (
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm bg-accent/15 text-accent">
                      Core Protocol
                    </span>
                  )}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-white mb-3">{title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-white/75 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-white/10 bg-white/5 px-8 py-5 text-center">
            <p className="text-[15px] font-light text-white/70">
              <span className="text-white font-medium">Individualized treatment planning.</span>{" "}
              Your specific modality mix is determined during intake assessment and adjusted throughout your PHP stay based on clinical progress and therapeutic response.
            </p>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑤  Why PHP Matters — Stats ──────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-stretch">
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">The Evidence</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Why PHP Produces Better Outcomes
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The research on PHP outcomes is clear: intensive outpatient treatment with structured daily programming produces significantly better long-term recovery outcomes than standard outpatient care for moderate-to-severe substance use and co-occurring disorders."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The mechanism is straightforward — daily therapeutic contact creates genuine momentum. Problems are identified and addressed within 24 hours, not at a weekly appointment. Skills are practiced, reinforced, and refined continuously rather than in isolation."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"For clients with co-occurring mental health conditions, the availability of daily psychiatric support means medication can be titrated appropriately, crises can be caught early, and the clinical picture can evolve in real time — leading to better psychiatric stabilization and dramatically reduced hospitalization risk."}</AutoLinkedText>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Daily clinical contact creates therapeutic momentum unavailable in weekly treatment",
                "Faster identification and response to relapse triggers and psychiatric changes",
                "Peer community provides social recovery infrastructure from day one",
                "Integrated dual-diagnosis treatment addresses root causes, not symptoms alone",
                "Step-down planning begins immediately, ensuring seamless IOP transition",
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

      {/* ⑥  Who Is PHP For? ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[400px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Candidacy</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              Is PHP Right for You?
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-8">
              <AutoLinkedText>{"PHP is appropriate for individuals who are medically stable but require intensive daily clinical support. If you're unsure which level of care is right for you, our admissions team will conduct a thorough assessment and make an honest recommendation."}</AutoLinkedText>
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

      {/* ⑦  What Comes After PHP ─────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="The Continuum"
            heading="PHP Is a Step — Not the Destination"
            body="PHP provides the intensive foundation. The work of recovery deepens and extends through the step-down levels that follow — each designed to build on the stability PHP creates."
            headingStyle={{ fontSize: "clamp(36px, 4vw, 54px)", lineHeight: 1.05 }}
            mb="mb-10"
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {afterPhp.map(({ icon, label, title, desc, href, cta, accent }) => (
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

          <div className="mt-6 bg-ink px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[15px] font-light text-white/75">
              <span className="text-white font-medium">Seamless transition guaranteed.</span>{" "}
              Your clinical team arranges every step-down — so you never navigate the continuum alone.
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
          <div className="lg:sticky lg:top-28">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Common Questions</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(30px, 3vw, 42px)", lineHeight: 1.1 }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/60 mb-8">
              <AutoLinkedText>{"Questions are a natural part of this process. Our admissions team is available to answer anything you don't find here."}</AutoLinkedText>
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
            Begin PHP at Rize OC
          </Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: 1.05, maxWidth: "760px" }}
          >
            The Most Important Step Is the First One
          </h2>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-white/55 max-w-xl mx-auto">
            <AutoLinkedText>{"Our admissions team is available 24/7 to answer questions, verify your insurance, and help you understand every option. All conversations are completely confidential and carry no obligation."}</AutoLinkedText>
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
            {["Free Insurance Verification", "Same-Day Admissions Available", "100% Confidential"].map((item) => (
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

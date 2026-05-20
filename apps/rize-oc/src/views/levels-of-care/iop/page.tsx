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

const weekStructure = [
  {
    day: "Monday / Wednesday / Friday",
    icon: "ri-group-line",
    title: "Group Therapy Sessions",
    body: "Three structured group sessions per week form the core of IOP. Each session runs approximately 90 minutes and covers rotating therapeutic themes — relapse prevention, DBT skills, peer processing, trauma psychoeducation, and communication skills. Groups are kept small (8 clients maximum) to preserve depth and safety.",
    tags: ["DBT Skills", "Relapse Prevention", "Peer Processing"],
  },
  {
    day: "Weekly",
    icon: "ri-user-heart-line",
    title: "Individual Therapy Session",
    body: "A dedicated 50-minute session with your primary therapist each week provides continuity, personalization, and the depth of individual therapeutic work. Your therapist tracks your progress across sessions, adjusts focus areas, and maintains the thread of your treatment narrative.",
    tags: ["Individual Therapy", "Progress Review", "Treatment Planning"],
  },
  {
    day: "As Scheduled",
    icon: "ri-stethoscope-line",
    title: "Psychiatric Check-ins",
    body: "For clients on medication or with co-occurring psychiatric conditions, regular check-ins with the Rize OC psychiatry team maintain appropriate medication management, address side effects, and respond to any emerging mental health concerns between sessions.",
    tags: ["Medication Management", "Psychiatric Support", "Co-occurring Care"],
  },
  {
    day: "Ongoing",
    icon: "ri-map-2-line",
    title: "Step-Down Planning",
    body: "From the first week of IOP, your clinical team is already planning your eventual step-down to standard outpatient care. Discharge planning is a continuous process — identifying triggers, strengthening recovery supports, and ensuring you have every tool needed to thrive in the next phase.",
    tags: ["Discharge Planning", "Recovery Capital", "Alumni Preparation"],
  },
];

const focusAreas = [
  {
    icon: "ri-shield-check-line",
    title: "Relapse Prevention",
    desc: "Systematic identification of triggers, high-risk situations, and evidence-based strategies for navigating them — the practical core of sustained recovery.",
    accent: true,
  },
  {
    icon: "ri-brain-line",
    title: "DBT Skills Training",
    desc: "Dialectical Behavior Therapy's four modules — mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness — provide a comprehensive coping toolkit.",
    accent: true,
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Trauma Processing",
    desc: "Structured psychoeducation and evidence-based trauma work addresses the underlying experiences that drive substance use and emotional dysregulation.",
    accent: false,
  },
  {
    icon: "ri-team-line",
    title: "Interpersonal Skills",
    desc: "Communication, boundary-setting, and relationship rebuilding — the relational dimensions of recovery that are often as important as the clinical work.",
    accent: false,
  },
  {
    icon: "ri-parent-line",
    title: "Family Systems Work",
    desc: "Structured family sessions and psychoeducation address the relational system around the client — engaging the people whose support is essential to long-term recovery.",
    accent: false,
  },
  {
    icon: "ri-trophy-line",
    title: "Life Skills & Reintegration",
    desc: "Practical skills for navigating recovery in the real world — employment, finances, social situations, and building a life with sustained recovery at its center.",
    accent: false,
  },
];

const whyStats = [
  { stat: "3×",   detail: "higher long-term sobriety rates for IOP completers versus those who attempt recovery without structured outpatient support" },
  { stat: "74%",  detail: "of IOP clients report sustained employment or school attendance at 6-month follow-up — a key recovery capital marker" },
  { stat: "82%",  detail: "reduction in emergency room visits and crisis interventions for clients who complete a full IOP course of treatment" },
  { stat: "9hrs", detail: "maximum weekly clinical contact — enough to produce meaningful therapeutic change without disrupting your full daily life" },
];

const candidacyItems = [
  { icon: "ri-building-4-line",    label: "Stepping down from PHP or residential treatment" },
  { icon: "ri-home-2-line",        label: "Stable at home or in a sober living environment" },
  { icon: "ri-briefcase-line",     label: "Able to maintain employment, school, or family responsibilities" },
  { icon: "ri-mental-health-line", label: "No active medical or psychiatric crisis requiring daily supervision" },
  { icon: "ri-heart-2-line",       label: "Motivated and genuinely engaged in the recovery process" },
  { icon: "ri-group-line",         label: "Benefits from peer community and structured group accountability" },
  { icon: "ri-shield-check-line",  label: "Mild to moderate symptoms manageable without full-day programming" },
  { icon: "ri-calendar-check-line",label: "Can commit to 3 sessions per week consistently" },
];

const afterIop = [
  {
    icon: "ri-calendar-line",
    label: "Next Step",
    title: "Standard Outpatient (OP)",
    desc: "One to two sessions per week for individuals who have completed IOP with demonstrated stability — ongoing therapeutic support, relapse prevention, and alumni community connection.",
    href: "/outpatient-program",
    cta: "Learn About OP",
    accent: true,
  },
  {
    icon: "ri-video-line",
    label: "Remote Option",
    title: "Virtual Outpatient",
    desc: "Continue your recovery work from anywhere in California — the same clinical team, the same evidence-based programming, delivered through secure telehealth.",
    href: "/virtual-outpatient-program",
    cta: "Learn About Virtual",
    accent: false,
  },
  {
    icon: "ri-building-4-line",
    label: "Step Up If Needed",
    title: "Return to PHP",
    desc: "If life circumstances or clinical indicators suggest a higher level of care is needed, stepping back up to PHP is always available — no stigma, no barriers.",
    href: "/partial-hospitalization-program-orange-county",
    cta: "Learn About PHP",
    accent: false,
  },
];

const faqs: FaqItem[] = [
  {
    q: "What does IOP stand for and what does it mean?",
    a: "IOP stands for Intensive Outpatient Program. It is a structured, clinical level of behavioral health treatment that provides significantly more therapeutic contact than standard outpatient therapy (one session per week) but does not require a residential or full-day commitment. At Rize OC, IOP involves three group sessions per week plus individual therapy — approximately 5 to 9 hours of clinical contact weekly — designed to integrate recovery support meaningfully into your daily life.",
  },
  {
    q: "Do I need to have completed a higher level of care first?",
    a: "Not necessarily, but it is common. Many IOP clients come from PHP or residential treatment and are stepping down. For clients with substance use disorders who have significant physical dependence, medical detox and a higher level of care first is almost always clinically appropriate before IOP. However, IOP can also be the right entry point for individuals with less severe presentations, strong home environments, and sufficient motivation and support. Our admissions team will assess your specific situation and make an honest recommendation.",
  },
  {
    q: "Can I work or go to school while in IOP?",
    a: "Yes — IOP is specifically designed to allow for this. We offer both morning and evening session tracks so clients can maintain professional and academic commitments. Many IOP clients work full-time or are enrolled in school. The key is that your schedule must accommodate consistent session attendance — missing sessions significantly reduces the effectiveness of the program.",
  },
  {
    q: "How long does IOP last?",
    a: "The average IOP duration at Rize OC is 8 to 12 weeks, but this is determined by clinical progress, not a fixed timeline. Some clients who entered IOP with more complex presentations benefit from longer engagement. Others with strong recovery foundations and excellent progress step down more quickly. We will never end your IOP prematurely based on insurance pressure — your clinical team advocates for the length and level of treatment that gives you the best outcome.",
  },
  {
    q: "What is the difference between morning and evening tracks?",
    a: "Morning track sessions typically run approximately 9 AM to 12 PM on Monday, Wednesday, and Friday. Evening track sessions typically run approximately 5 PM to 8:30 PM on the same days. Both tracks include the same clinical content, are facilitated by the same licensed clinical team, and provide access to all individual therapy and psychiatric services. The tracks are kept separate to maintain consistent peer group composition and therapeutic continuity.",
  },
  {
    q: "Is IOP covered by insurance?",
    a: "Yes. IOP is covered as a medically necessary outpatient behavioral health service by most major PPO insurance plans. Coverage levels vary by plan, deductible, and network status. Our insurance verification team contacts your provider directly to determine your specific benefits before admission. We provide a transparent breakdown of expected out-of-pocket costs and work to maximize your available coverage. We do not accept Medicaid or Medi-Cal.",
  },
  {
    q: "What if I relapse while in IOP?",
    a: "A relapse during IOP is not a reason to discharge a client — it is clinical information. Our team will conduct an immediate assessment to determine what the relapse tells us about the effectiveness of the current treatment plan. In some cases, it indicates a need to step back up to PHP for a period. In others, it leads to an adjustment in therapeutic focus or approach. Transparency about a relapse is always the right choice — it allows us to help you. Attempting to hide a relapse is the only response that genuinely undermines treatment.",
  },
  {
    q: "Will I be in group with people who use different substances?",
    a: "Yes. Rize OC IOP groups are mixed — clients with different substance histories, co-occurring conditions, and treatment backgrounds participate together. Research consistently shows that cross-diagnosis peer groups produce better outcomes than substance-specific groups, because the skills, challenges, and therapeutic work of recovery are overwhelmingly shared regardless of primary substance. The peer community dimension of IOP — mutual support, shared accountability, and human connection — is one of its most powerful clinical elements.",
  },
];

/* ─────────────────────────────────────────────────── Page component ────── */

export default function IopPage() {
  return (
    <>
      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden min-h-[88vh]">
        <Image
          src={`${BASE}/iop_hero03.jpg`}
          alt="Modern individual therapy counseling office at Rize OC Intensive Outpatient Program in Orange County"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(44,48,46,1) 0%, rgba(44,48,46,0.92) 30%, rgba(44,48,46,0.65) 55%, rgba(44,48,46,0.2) 100%)" }}
        />

        <div className="absolute inset-x-0 bottom-0 z-10">
        <PageHeroShell
          topSlot={<Eyebrow colorClass="text-accent">Levels of Care — Step 3</Eyebrow>}
          bottomBar={
            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
              {[
                { value: "3–9",   label: "Hours Per Week" },
                { value: "8–12",  label: "Week Average Stay" },
                { value: "AM/PM", label: "Schedule Options" },
                { value: "≤8",    label: "Clients Per Group" },
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
                Intensive Outpatient<br />
                <em className="italic text-white/60">Program (IOP)</em>
              </h1>
              <p className="mt-6 text-[16px] font-light leading-relaxed text-white/80 max-w-[520px]">
                <AutoLinkedText>{"Structured clinical programming woven into your daily life — 3 to 9 hours weekly, with morning and evening tracks, for individuals ready to integrate recovery with living."}</AutoLinkedText>
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
                  { icon: "ri-time-line",            text: "AM & PM Tracks" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <i className={`${icon} text-accent text-sm`} />
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
        </PageHeroShell>
        </div>
      </section>

      {/* ②  What Is IOP? ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_400px] gap-16 items-stretch">
          <div className="flex flex-col h-full">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Understanding IOP</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Recovery Woven Into Your Life
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"IOP represents the point in the recovery continuum where clinical work and real life begin to merge. Unlike residential or PHP, you are no longer in a protected clinical environment for the majority of your waking hours — you are navigating real relationships, professional demands, and the full complexity of daily life, with clinical support available multiple times per week."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"This is not a compromise — it is a developmental stage. The capacity to maintain recovery while engaging with real-world stressors is exactly the skill that determines whether gains from higher levels of care become lasting change or fade without reinforcement."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"At Rize OC, IOP is not a diluted version of PHP — it is a purpose-designed program for this specific phase of recovery. Group sizes are kept small (8 clients maximum), individual therapy is weekly and substantive, and the peer community that forms in IOP becomes a genuine long-term recovery asset."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Both morning and evening tracks accommodate professional and family schedules without compromising clinical depth. IOP at Rize is available to clients stepping down from PHP, clients entering directly from detox with a strong support system, and clients who need more than weekly therapy but are not appropriate for full-day programming."}</AutoLinkedText>
              </p>
            </div>

            <blockquote className="mt-auto pt-8 border-l-2 border-accent pl-6">
              <p className="text-[17px] font-[family-name:var(--font-display)] font-normal text-ink/70 leading-snug italic">
                <AutoLinkedText>{"\"IOP is where recovery stops being something that happens to you and starts being something you do. The peer community that forms in these groups often becomes the most important recovery resource our clients have.\""}</AutoLinkedText>
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">
                <AutoLinkedText>{"Rize OC Clinical Director"}</AutoLinkedText>
              </p>
            </blockquote>
          </div>

          <div className="flex flex-col gap-5 h-full">
            <div className="bg-ink p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-4">
                The IOP Advantage
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "ri-home-2-line",        point: "Apply clinical skills in real situations between sessions — not just in a protected environment" },
                  { icon: "ri-briefcase-line",      point: "Maintain employment, school, and family responsibilities throughout treatment" },
                  { icon: "ri-group-line",          point: "Small groups of 8 or fewer preserve depth, safety, and therapeutic intimacy" },
                  { icon: "ri-calendar-check-line", point: "AM and PM tracks accommodate virtually any professional or family schedule" },
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
                { label: "Weekly Hours",     value: "3–9 Hours" },
                { label: "Group Sessions",   value: "3× Per Week" },
                { label: "Individual",       value: "1× Per Week" },
                { label: "Average Duration", value: "8–12 Weeks" },
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

      {/* ③  Weekly Structure ─────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="The IOP Week"
            heading="What a Week in IOP Looks Like"
            body="IOP at Rize is structured yet flexible, providing clinical consistency without rigidity. Each week delivers multiple forms of therapeutic contact designed to build on each other."
            headingStyle={{ fontSize: "clamp(38px, 4vw, 56px)", lineHeight: 1.05 }}
            mb="mb-14"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {weekStructure.map(({ day, icon, title, body, tags }, i) => (
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
                  <span className="text-[13px] font-semibold uppercase tracking-[0.25em] text-accent">{day}</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-ink leading-snug mb-3">{title}</h3>
                <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-5 flex-1"><AutoLinkedText>{body}</AutoLinkedText></p>
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

      {/* ④  What We Focus On ─────────────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          <div className="text-center mb-12">
            <Eyebrow colorClass="text-accent" className="mb-4">Clinical Focus Areas</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mb-5"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05 }}
            >
              What IOP <em className="italic text-white/60">Addresses</em>
            </h2>
            <p className="text-[15px] font-light text-white/65 max-w-2xl mx-auto">
              <AutoLinkedText>{"IOP at Rize covers the full clinical range — relapse prevention, trauma, relationships, skills, and reintegration — with a curriculum adapted to each client's specific needs."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {focusAreas.map(({ icon, title, desc, accent }) => (
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
                <p className="text-[14px] font-light leading-relaxed text-white/75 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑤  Why IOP Matters ──────────────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-stretch">
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">The Evidence</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Why Structured IOP Outperforms Weekly Therapy
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The gap between weekly individual therapy and structured IOP is not just a matter of hours — it is a fundamentally different therapeutic mechanism. Weekly therapy asks you to apply skills in isolation between 50-minute appointments a week apart. IOP creates a continuous therapeutic environment where skills are taught, practiced, processed, and reinforced across multiple contact points every week."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The peer group dimension of IOP is particularly powerful. Research consistently shows that peer community is one of the strongest predictors of long-term recovery — the sense of shared experience, mutual accountability, and belonging that forms in structured groups cannot be replicated in individual therapy alone."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"For clients stepping down from PHP, IOP provides the essential bridge — enough structure to maintain momentum while progressively building the independence that sustained recovery requires."}</AutoLinkedText>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Multiple weekly touchpoints prevent the momentum loss common after PHP step-down",
                "Peer group accountability reduces relapse risk between sessions",
                "Real-world skill application between sessions creates lasting behavioral change",
                "Individual therapy continuity preserves the therapeutic relationship",
                "Alumni community connection begins forming during IOP — a lasting asset",
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

      {/* ⑥  Who Is IOP For? ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[400px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Candidacy</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              Who Is IOP For?
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-8">
              <AutoLinkedText>{"IOP is designed for individuals who have achieved a foundation of stability and are ready to integrate recovery into their real lives — with the support of structured clinical programming alongside."}</AutoLinkedText>
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

      {/* ⑦  What Comes After IOP ─────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="The Continuum"
            heading="After IOP — The Path Continues"
            body="IOP builds the foundation of integrated recovery. What comes after sustains it — through ongoing therapeutic support, community connection, and the alumni network that extends Rize care indefinitely."
            headingStyle={{ fontSize: "clamp(36px, 4vw, 54px)", lineHeight: 1.05 }}
            mb="mb-10"
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {afterIop.map(({ icon, label, title, desc, href, cta, accent }) => (
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
              <span className="text-white font-medium">Your team plans every transition.</span>{" "}
              Step-downs are clinically determined and fully arranged — you never navigate the continuum alone.
            </p>
            <Link href="/levels-of-care" className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap">
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
            Begin IOP at Rize OC
          </Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: 1.05, maxWidth: "760px" }}
          >
            Recovery and Life — Not One or the Other
          </h2>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-white/55 max-w-xl mx-auto">
            <AutoLinkedText>{"Our admissions team is available 24/7 to answer questions, verify your insurance, and help you find the right level of care. All conversations are completely confidential."}</AutoLinkedText>
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
            {["Free Insurance Verification", "AM & PM Tracks Available", "100% Confidential"].map((item) => (
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

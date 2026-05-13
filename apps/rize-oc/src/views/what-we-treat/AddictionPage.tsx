import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─────────────────────────────────────────────────── Section data ─────── */

const substances = [
  {
    icon: "ri-goblet-line",
    title: "Alcohol Use Disorder",
    desc: "Alcohol addiction is one of the most complex and medically serious substance use disorders. Our approach combines medically supervised detox, medication-assisted treatment, and evidence-based therapy to address both the physical and psychological dimensions of alcohol dependence.",
    urgency: "Medically Complex",
    urgencyColor: "text-rose-600 bg-rose-50",
  },
  {
    icon: "ri-capsule-line",
    title: "Opioid Addiction",
    desc: "Heroin, fentanyl, oxycodone, and other opioids create intense physical dependence and powerful psychological cravings. Rize OC uses Buprenorphine-based MAT alongside individual therapy and trauma work to address the full clinical picture of opioid use disorder.",
    urgency: "MAT Available",
    urgencyColor: "text-orange-600 bg-orange-50",
  },
  {
    icon: "ri-medicine-bottle-line",
    title: "Benzodiazepine Dependence",
    desc: "Benzo dependence (Xanax, Klonopin, Ativan, Valium) requires medically supervised tapering — abrupt cessation can be life-threatening. Our physicians design individualized taper protocols alongside psychiatric and therapeutic support.",
    urgency: "Medical Supervision Required",
    urgencyColor: "text-rose-700 bg-rose-50",
  },
  {
    icon: "ri-flashlight-line",
    title: "Stimulant Addiction",
    desc: "Cocaine, methamphetamine, and prescription stimulants produce intense psychological withdrawal — severe depression, anhedonia, and powerful cravings. Psychiatric support and evidence-based behavioral therapies are the foundation of stimulant addiction treatment.",
    urgency: "Psychiatric Focus",
    urgencyColor: "text-purple-600 bg-purple-50",
  },
  {
    icon: "ri-drop-line",
    title: "Marijuana Use Disorder",
    desc: "Cannabis use disorder is real and increasingly recognized. Psychological dependence, motivational deficits, anxiety, sleep disruption, and difficulty with emotional regulation are all addressable with the right therapeutic approach.",
    urgency: "Behavioral Focus",
    urgencyColor: "text-yellow-700 bg-yellow-50",
  },
  {
    icon: "ri-layers-line",
    title: "Polysubstance Use",
    desc: "Many individuals present with dependencies on multiple substances simultaneously. This complex picture requires highly individualized medical management and a clinical team experienced in the layered presentations of polysubstance use.",
    urgency: "Complex Management",
    urgencyColor: "text-white/70 bg-white/10",
  },
];

const approach = [
  {
    icon: "ri-stethoscope-line",
    title: "Medical Detox & Stabilization",
    desc: "Safe, supervised withdrawal management with evidence-based medication protocols — the essential first step for any significant physical dependence.",
  },
  {
    icon: "ri-capsule-line",
    title: "Medication-Assisted Treatment",
    desc: "Buprenorphine for opioids, Naltrexone for alcohol — MAT is an evidence-based, FDA-approved approach that dramatically improves outcomes when integrated with therapy.",
  },
  {
    icon: "ri-brain-line",
    title: "CBT & DBT",
    desc: "Cognitive Behavioral and Dialectical Behavior Therapy address the thought patterns, emotional regulation deficits, and behavioral cycles at the core of addiction.",
  },
  {
    icon: "ri-mental-health-line",
    title: "Trauma-Informed Care",
    desc: "More than 70% of individuals with substance use disorders have significant trauma histories. Trauma work — including EMDR — is integrated from the beginning.",
  },
  {
    icon: "ri-group-line",
    title: "Group Therapy & Peer Community",
    desc: "Structured group therapy provides skill development, shared accountability, and the peer connection that research identifies as one of recovery's strongest protective factors.",
  },
  {
    icon: "ri-parent-line",
    title: "Family Systems Work",
    desc: "Addiction affects families, not just individuals. Family therapy and psychoeducation address the relational system and build the support structure essential to lasting recovery.",
  },
];

const whyStats = [
  { stat: "70%+", detail: "of individuals with substance use disorders have a co-occurring mental health condition — our integrated model treats both simultaneously" },
  { stat: "3×",   detail: "better long-term outcomes with integrated dual-diagnosis treatment versus addiction-only approaches" },
  { stat: "90%",  detail: "reduction in severe withdrawal symptoms with proper medication-assisted protocols in our medical detox program" },
  { stat: "1:3",  detail: "maximum staff-to-client ratio across all levels of care — ensuring individualized attention at every stage" },
];

const levelsOfCare = [
  {
    icon: "ri-pulse-line",
    label: "First Step",
    title: "Medical Detox",
    desc: "Safe, supervised withdrawal management for individuals with significant physical dependence on alcohol, opioids, or benzodiazepines.",
    href: "/drug-alcohol-detox",
    cta: "Learn About Detox",
    accent: true,
  },
  {
    icon: "ri-sun-line",
    label: "Intensive Care",
    title: "Partial Hospitalization (PHP)",
    desc: "Six hours of daily clinical programming addressing both the addiction and its underlying causes — the most effective intensive outpatient level.",
    href: "/partial-hospitalization-program-orange-county",
    cta: "Learn About PHP",
    accent: false,
  },
  {
    icon: "ri-group-line",
    label: "Flexible Recovery",
    title: "Intensive Outpatient (IOP)",
    desc: "Structured group and individual therapy integrated into daily life — 3 to 9 hours weekly with AM and PM schedule options.",
    href: "/iop-program-orange-county",
    cta: "Learn About IOP",
    accent: false,
  },
];

const faqs: FaqItem[] = [
  {
    q: "Is addiction a disease or a choice?",
    a: "Addiction is a chronic brain disorder — classified as such by the American Medical Association, the American Society of Addiction Medicine, and every major health authority. Repeated substance use produces lasting neurological changes in the brain's reward, motivation, and decision-making circuits. These changes drive compulsive use even when the individual genuinely wants to stop. This does not mean personal agency is irrelevant — recovery requires genuine engagement and effort — but it does mean that willpower alone is rarely sufficient and that clinical treatment produces substantially better outcomes than attempts to stop without support.",
  },
  {
    q: "Can addiction be fully cured?",
    a: "Addiction is best understood as a chronic, manageable condition rather than an acute illness with a defined cure. Like diabetes or hypertension, it requires ongoing management — but the vast majority of people with addiction disorders achieve meaningful, sustained recovery with appropriate treatment and support. Many people with histories of severe addiction live full, thriving lives in long-term recovery. At Rize OC, our goal is not just abstinence — it is building the clinical foundation, life skills, and recovery capital that makes sustained recovery both achievable and sustainable.",
  },
  {
    q: "What happens if someone has both addiction and a mental health condition?",
    a: "This is the norm rather than the exception — more than 70% of individuals with substance use disorders have a co-occurring mental health condition (depression, anxiety, PTSD, bipolar disorder, etc.). Treating these conditions sequentially — addiction first, mental health later — is a clinically outdated approach that produces poor outcomes. At Rize OC, we treat both simultaneously from day one. Our embedded psychiatric team manages mental health conditions throughout the treatment continuum, recognizing that addiction and mental health are deeply intertwined and cannot be effectively separated.",
  },
  {
    q: "How long does addiction treatment take?",
    a: "Duration varies significantly by the nature and severity of the addiction, the presence of co-occurring conditions, and the individual's response to treatment. A general framework: medical detox runs 3 to 10 days; PHP typically 2 to 4 weeks; IOP typically 8 to 12 weeks; with ongoing outpatient support continuing as long as it is clinically valuable. Research consistently shows that longer engagement with structured treatment produces better long-term outcomes — the goal is always the level and duration of care that gives you the best possible chance at sustained recovery.",
  },
  {
    q: "Does insurance cover addiction treatment?",
    a: "Yes. The Mental Health Parity and Addiction Equity Act requires most insurance plans to cover addiction treatment at the same level as other medical conditions. Most major PPO plans cover medical detox, PHP, and IOP. Coverage levels vary by plan, deductible, and network status. Rize OC's insurance verification team contacts your provider directly, determines your specific benefits, and provides a transparent breakdown of expected costs before admission. We do not accept Medicaid or Medi-Cal.",
  },
  {
    q: "What is medication-assisted treatment (MAT)?",
    a: "MAT is the use of FDA-approved medications — alongside behavioral therapy — to treat substance use disorders. Buprenorphine (Suboxone) is the gold-standard MAT for opioid use disorder, dramatically reducing cravings and withdrawal severity. Naltrexone (Vivitrol) is used for both opioid and alcohol use disorder, blocking the rewarding effects of use. These medications are not substituting one addiction for another — they are evidence-based medical treatments that have been shown to significantly reduce relapse rates, overdose mortality, and improve long-term recovery outcomes.",
  },
  {
    q: "What if I've tried treatment before and relapsed?",
    a: "Relapse is part of the clinical picture for many people with addiction, not a sign that treatment doesn't work or that recovery is impossible. Research shows that most people with addiction disorders require multiple treatment episodes before achieving sustained recovery — just as most people with chronic conditions like diabetes or hypertension require adjustments in treatment over time. If you've been in treatment before, Rize OC will conduct a thorough assessment of what worked, what didn't, and what the relapse tells us about what needs to be different this time. Prior treatment is valuable clinical information, not evidence of failure.",
  },
  {
    q: "Can I bring my family into the treatment process?",
    a: "Absolutely — and we encourage it. Addiction profoundly affects the entire family system, and family involvement in treatment consistently improves both the client's outcomes and the family's wellbeing. Rize OC offers family therapy sessions, family psychoeducation, and family support resources throughout the treatment continuum. We also recognize that not every family situation is supportive or safe — clinical judgment guides how and when family involvement is introduced.",
  },
];

/* ─────────────────────────────────────────────────── Page component ────── */

export default function AddictionPage() {
  return (
    <>
      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden min-h-[88vh] flex flex-col justify-end">
        <Image
          src={`${BASE}/addiction_hero02.jpg`}
          alt="Serene healing garden courtyard at a luxury treatment center in Orange County California"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(44,48,46,1) 0%, rgba(44,48,46,0.92) 30%, rgba(44,48,46,0.65) 55%, rgba(44,48,46,0.2) 100%)" }}
        />

        <div className="relative z-10 w-full">
          <div className="absolute bottom-full mb-8 left-0 w-full px-6 lg:px-12 xl:px-20">
            <Eyebrow colorClass="text-accent">What We Treat</Eyebrow>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 px-6 lg:px-12 xl:px-20 pb-16 pt-0">
            <div className="flex-1 max-w-3xl">
              <h1
                className="font-[family-name:var(--font-display)] font-normal text-white"
                style={{ fontSize: "clamp(52px, 6.5vw, 96px)", lineHeight: 0.95 }}
              >
                Addiction<br />
                <em className="italic text-white/60">Treatment</em>
              </h1>
              <p className="mt-6 text-[16px] font-light leading-relaxed text-white/80 max-w-[520px]">
                <AutoLinkedText>{"Evidence-based, medically-supervised treatment for all substance use disorders — addressing the full clinical picture, not just the substance."}</AutoLinkedText>
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
                  { icon: "ri-shield-check-line",    text: "MAT Available" },
                  { icon: "ri-time-line",            text: "Same-Day Admissions" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <i className={`${icon} text-accent text-sm`} />
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {[
              { value: "All",   label: "Substance Types" },
              { value: "MAT",   label: "Medication-Assisted" },
              { value: "Dual",  label: "Diagnosis Capable" },
              { value: "1:3",   label: "Staff-Client Ratio" },
            ].map(({ value, label }) => (
              <div key={label} className="px-8 py-5 border-r border-white/10 last:border-r-0 bg-ink/50 backdrop-blur-sm">
                <p className="font-[family-name:var(--font-display)] text-[28px] font-normal text-white leading-none"><AutoLinkedText>{value}</AutoLinkedText></p>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50 mt-1.5"><AutoLinkedText>{label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ②  Understanding Addiction ───────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_400px] gap-16 items-stretch">
          <div className="flex flex-col h-full">
            <Eyebrow colorClass="text-ink/45" className="mb-5">The Clinical Reality</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              What Addiction Actually Is
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Addiction is a chronic brain disorder characterized by compulsive substance use despite harmful consequences. It is not a moral failing, a lack of willpower, or a character deficiency — it is a neurological condition that produces lasting changes in the brain&apos;s reward, motivation, and executive function circuits."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Repeated substance use progressively hijacks the brain&apos;s dopamine system — the same system responsible for motivation, pleasure, and decision-making. Over time, the brain reorganizes itself around the substance: natural rewards become less compelling, withdrawal becomes intensely aversive, and the neural circuits responsible for impulse control are progressively compromised."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"This is why willpower alone fails most people with addiction — the very brain systems responsible for self-regulation are the ones that have been most affected. Effective treatment works by providing clinical support during the neurological recovery process, building new behavioral patterns, and addressing the underlying drivers that predisposed someone to addiction in the first place."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"At Rize OC, we treat addiction as the complex, multidimensional condition it is — combining medical stabilization, evidence-based therapy, psychiatric support, and community connection into a fully integrated treatment experience."}</AutoLinkedText>
              </p>
            </div>
            <blockquote className="mt-auto pt-8 border-l-2 border-accent pl-6">
              <p className="text-[17px] font-[family-name:var(--font-display)] font-normal text-ink/70 leading-snug italic">
                <AutoLinkedText>{"&ldquo;Addiction is not a failure of character. It is a failure of neural circuitry — one that responds remarkably well to the right clinical intervention.&rdquo;"}</AutoLinkedText>
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40"><AutoLinkedText>{"Rize OC Medical Director"}</AutoLinkedText></p>
            </blockquote>
          </div>

          <div className="flex flex-col gap-5 h-full">
            <div className="bg-ink p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-4"><AutoLinkedText>{"Why Clinical Treatment Works"}</AutoLinkedText></p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "ri-brain-line",         point: "Medication-assisted treatment reduces relapse risk by up to 50% for opioid and alcohol disorders" },
                  { icon: "ri-mental-health-line",  point: "Integrated dual-diagnosis care addresses the co-occurring mental health conditions driving use" },
                  { icon: "ri-group-line",          point: "Peer community provides the social connection research identifies as recovery&apos;s strongest protector" },
                  { icon: "ri-shield-check-line",   point: "Structured treatment creates the behavioral scaffolding needed for lasting neurological recovery" },
                ].map(({ icon, point }) => (
                  <div key={point} className="flex items-start gap-3">
                    <i className={`${icon} text-accent text-base shrink-0 mt-0.5`} />
                    <p className="text-sm font-light text-white/65 leading-snug"><AutoLinkedText>{point}</AutoLinkedText></p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-warm p-7 flex flex-col gap-5 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/60">Treatment Overview</p>
              {[
                { label: "Detox Available",      value: "On-Site" },
                { label: "MAT",                  value: "Buprenorphine / Naltrexone" },
                { label: "Dual Diagnosis",       value: "Integrated" },
                { label: "Family Involvement",   value: "Encouraged" },
                { label: "Insurance",            value: "Most PPO Plans" },
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

      {/* ③  Substances We Treat ──────────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          <div className="text-center mb-12">
            <Eyebrow colorClass="text-accent" className="mb-4">Substance Use Disorders</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mb-5"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05 }}
            >
              Substances We <em className="italic text-white/60">Treat</em>
            </h2>
            <p className="text-[15px] font-light text-white/65 max-w-2xl mx-auto">
              <AutoLinkedText>{"Our clinical team is experienced in treating all major substance use disorders — including complex polysubstance presentations. If you don&apos;t see your substance listed, contact us."}</AutoLinkedText>
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
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-white mb-3">{title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-white/75 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-white/10 bg-white/5 px-8 py-5 text-center">
            <p className="text-[15px] font-light text-white/70">
              <span className="text-white font-medium">Co-occurring mental health conditions?</span>{" "}
              More than 70% of our clients present with both addiction and a mental health diagnosis. Our integrated dual-diagnosis model treats both simultaneously.{" "}
              <Link href="/mental-health" className="text-accent underline-offset-4 hover:underline">
                Learn about mental health treatment →
              </Link>
            </p>
          </div>
        </SectionWrapper>
      </section>

      {/* ④  How We Treat ─────────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="Our Approach"
            heading="How We Treat Addiction at Rize OC"
            body="Effective addiction treatment requires a multi-modal approach. We combine the most evidence-based clinical tools available into a fully integrated, individualized treatment plan."
            headingStyle={{ fontSize: "clamp(38px, 4vw, 56px)", lineHeight: 1.05 }}
            mb="mb-14"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {approach.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-warm p-7 flex flex-col">
                <IconCircle icon={icon} variant="accent-subtle" size="sm" className="mb-5" />
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-ink mb-3 leading-snug">{title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-ink/65 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑤  Why Rize — Stats ─────────────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-stretch">
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">Why Rize OC</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Integrated Treatment That Addresses Root Causes
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The majority of treatment programs still separate addiction and mental health treatment — handling them sequentially or in different facilities. Rize OC&apos;s integrated model recognizes that substance use disorders and mental health conditions are almost always intertwined, and that treating them separately produces significantly worse outcomes."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Our embedded psychiatric team works alongside addiction specialists from day one — assessing, diagnosing, and treating co-occurring conditions in real time. Medication management, trauma therapy, and evidence-based addiction treatment are delivered as a unified clinical experience, not a series of uncoordinated appointments."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The result is treatment that addresses the full picture — not just the substance, but the neurological, psychological, relational, and circumstantial dimensions that maintain the cycle of addiction."}</AutoLinkedText>
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {[
                "Embedded psychiatric team providing daily dual-diagnosis oversight",
                "EMDR and trauma-informed care integrated from the first week",
                "Medication-assisted treatment (MAT) available at all appropriate levels",
                "Small cohorts ensuring individualized attention at every stage",
                "Seamless continuum from detox through PHP, IOP, OP, and alumni care",
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

      {/* ⑥  Levels of Care ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper>
          <SectionHeader
            eyebrow="Treatment Continuum"
            heading="Finding the Right Level of Care"
            body="Addiction treatment is not one-size-fits-all. The appropriate level of care depends on the severity of dependence, co-occurring conditions, and your specific clinical picture."
            headingStyle={{ fontSize: "clamp(36px, 4vw, 54px)", lineHeight: 1.05 }}
            mb="mb-10"
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {levelsOfCare.map(({ icon, label, title, desc, href, cta, accent }) => (
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
              <span className="text-white font-medium">Not sure where to start?</span>{" "}
              Our admissions team conducts a thorough assessment and recommends the right entry point — no pressure, no obligation.
            </p>
            <Link href="/levels-of-care" className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap">
              View All Levels <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑦  FAQs ─────────────────────────────────────────────────────────── */}
      <section className="bg-cream">
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
              <AutoLinkedText>{"Our admissions team is available 24/7 to answer anything you don&apos;t find here."}</AutoLinkedText>
            </p>
            <a href="tel:9494612620" className="flex items-center gap-2 text-accent text-[14px] font-medium hover:text-ink transition-colors">
              <i className="ri-phone-line" /> (949)-461-2620
            </a>
          </div>
          <FaqAccordion items={faqs} />
        </SectionWrapper>
      </section>

      {/* ⑧  CTA Banner ───────────────────────────────────────────────────── */}
      <section id="verify" className="bg-ink relative overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #D98A53 0%, transparent 70%)" }}
          aria-hidden
        />
        <SectionWrapper className="text-center relative z-10">
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">Start Recovery at Rize OC</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: 1.05, maxWidth: "760px" }}
          >
            You Don&apos;t Have to Figure This Out Alone
          </h2>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-white/55 max-w-xl mx-auto">
            <AutoLinkedText>{"Our admissions team is available 24/7 to answer questions, verify your insurance, and help you understand every option. All conversations are completely confidential."}</AutoLinkedText>
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

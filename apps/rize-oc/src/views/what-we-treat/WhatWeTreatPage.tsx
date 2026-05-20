import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import PageHeroShell from "@/components/ui/PageHeroShell";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import { CINEMATIC_BOTTOM_HERO_GRADIENT } from "@/lib/cinematicHeroStyles";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const addictionConditions = [
  {
    icon: "ri-goblet-line",
    title: "Alcohol Addiction",
    desc: "One of the most medically serious substance use disorders. Requires supervised detox, MAT, and integrated therapy targeting the neurological and psychological dimensions of dependence.",
    badge: "Medical Detox Required",
    badgeColor: "text-rose-600 bg-rose-50",
    href: "/addiction/alcohol",
  },
  {
    icon: "ri-capsule-line",
    title: "Opiate Addiction",
    desc: "Heroin, fentanyl, oxycodone, and other opioids. Buprenorphine-based MAT alongside individual therapy and trauma work addresses the full clinical picture of opioid use disorder.",
    badge: "MAT Available",
    badgeColor: "text-orange-600 bg-orange-50",
    href: "/addiction/opiate",
  },
  {
    icon: "ri-medicine-bottle-line",
    title: "Benzodiazepine Dependence",
    desc: "Xanax, Klonopin, Ativan, Valium. Abrupt cessation can be life-threatening — our physicians design individualized taper protocols alongside psychiatric and therapeutic support.",
    badge: "Medical Supervision",
    badgeColor: "text-rose-700 bg-rose-50",
    href: "/addiction/benzodiazepine",
  },
  {
    icon: "ri-pill-line",
    title: "Xanax Addiction",
    desc: "Alprazolam dependence is one of the most medically complex benzodiazepine presentations. Physician-guided tapering and psychiatric support are essential to safe treatment.",
    badge: "Medical Supervision",
    badgeColor: "text-rose-700 bg-rose-50",
    href: "/addiction/xanax",
  },
  {
    icon: "ri-test-tube-line",
    title: "Meth Addiction",
    desc: "Methamphetamine produces intense psychological withdrawal — severe depression, anhedonia, and powerful cravings. Psychiatric support and behavioral therapies are the foundation.",
    badge: "Psychiatric Focus",
    badgeColor: "text-purple-600 bg-purple-50",
    href: "/addiction/meth",
  },
  {
    icon: "ri-flask-line",
    title: "Cocaine Addiction",
    desc: "Stimulant use disorder driven by dopamine dysregulation. Evidence-based behavioral therapies, psychiatric support, and peer community address the psychological cycle of cocaine use.",
    badge: "Behavioral Focus",
    badgeColor: "text-purple-600 bg-purple-50",
    href: "/addiction/cocaine",
  },
  {
    icon: "ri-fire-line",
    title: "Hallucinogen Addiction",
    desc: "LSD, psilocybin, PCP, and other hallucinogens can cause persistent perceptual disturbances and psychological distress. Our clinical team addresses the psychiatric and behavioral dimensions.",
    badge: "Psychiatric Support",
    badgeColor: "text-indigo-600 bg-indigo-50",
    href: "/addiction/hallucinogen",
  },
  {
    icon: "ri-wind-line",
    title: "Inhalant Addiction",
    desc: "Inhalants cause rapid neurological damage and severe psychological dependence. Medical stabilization and intensive therapeutic work address both the physical and behavioral dimensions.",
    badge: "Medical Management",
    badgeColor: "text-slate-600 bg-slate-50",
    href: "/addiction/inhalant",
  },
];

const mentalHealthConditions = [
  {
    icon: "ri-mental-health-line",
    title: "Anxiety Disorders",
    desc: "Generalized anxiety, panic disorder, social anxiety, and specific phobias. CBT, exposure therapy, and DBT skills alongside psychiatric support provide lasting anxiety reduction.",
    badge: "Evidence-Based",
    badgeColor: "text-teal-700 bg-teal-50",
    href: "/mental-health/anxiety",
  },
  {
    icon: "ri-cloud-line",
    title: "Depression",
    desc: "Major depressive disorder and persistent depressive disorder. Integrated psychiatric medication management with evidence-based therapy for genuine mood stabilization.",
    badge: "High Prevalence",
    badgeColor: "text-blue-700 bg-blue-50",
    href: "/mental-health/depression",
  },
  {
    icon: "ri-hearts-line",
    title: "PTSD & Trauma",
    desc: "Complex trauma, PTSD, and adverse childhood experiences. EMDR, somatic therapy, and trauma-informed CBT address the neurological and psychological dimensions of traumatic experience.",
    badge: "EMDR Available",
    badgeColor: "text-purple-600 bg-purple-50",
    href: "/mental-health/ptsd",
  },
  {
    icon: "ri-brain-line",
    title: "Bipolar Disorder",
    desc: "Bipolar I, bipolar II, and cyclothymia require careful integration of mood stabilization, psychiatric medication management, and evidence-based therapy.",
    badge: "Psychiatric Focused",
    badgeColor: "text-orange-600 bg-orange-50",
    href: "/mental-health/bipolar-disorder",
  },
  {
    icon: "ri-focus-3-line",
    title: "ADHD",
    desc: "Attention-deficit/hyperactivity disorder in adults — including complex dual-diagnosis presentations where ADHD co-occurs with substance use or mood disorders.",
    badge: "Integrated Care",
    badgeColor: "text-teal-700 bg-teal-50",
    href: "/mental-health/adhd",
  },
  {
    icon: "ri-refresh-line",
    title: "OCD",
    desc: "Obsessive-compulsive disorder treated with ERP (Exposure and Response Prevention), the gold-standard behavioral therapy for OCD, alongside psychiatric medication management.",
    badge: "ERP Protocol",
    badgeColor: "text-blue-700 bg-blue-50",
    href: "/mental-health/ocd",
  },
  {
    icon: "ri-moon-line",
    title: "Insomnia",
    desc: "Chronic insomnia and sleep disorders — often co-occurring with anxiety, depression, trauma, or substance use. CBT-I and psychiatric support address root causes, not just symptoms.",
    badge: "CBT-I Available",
    badgeColor: "text-indigo-600 bg-indigo-50",
    href: "/mental-health/insomnia",
  },
  {
    icon: "ri-user-line",
    title: "Borderline Personality Disorder",
    desc: "BPD treated with DBT — the evidence-based treatment specifically developed for emotional dysregulation, identity disturbance, and interpersonal difficulties.",
    badge: "DBT Specialized",
    badgeColor: "text-purple-600 bg-purple-50",
    href: "/mental-health/borderline-personality-disorder",
  },
  {
    icon: "ri-eye-line",
    title: "Schizophrenia",
    desc: "Schizophrenia and schizoaffective disorder require integrated psychiatric oversight, medication management, and therapeutic support within a structured, supportive environment.",
    badge: "Psychiatric Oversight",
    badgeColor: "text-rose-600 bg-rose-50",
    href: "/mental-health/schizophrenia",
  },
];

const approach = [
  {
    icon: "ri-stethoscope-line",
    title: "Medical Detox & Stabilization",
    desc: "Safe, physician-supervised withdrawal management with evidence-based medication protocols — essential for alcohol, opioid, and benzodiazepine dependence.",
  },
  {
    icon: "ri-capsule-line",
    title: "Medication-Assisted Treatment",
    desc: "Buprenorphine for opioids, Naltrexone for alcohol — FDA-approved MAT dramatically improves outcomes when integrated with comprehensive therapy.",
  },
  {
    icon: "ri-brain-line",
    title: "CBT, DBT & Evidence-Based Therapy",
    desc: "Cognitive Behavioral and Dialectical Behavior Therapy address the thought patterns, emotional dysregulation, and behavioral cycles at the core of both addiction and mental health conditions.",
  },
  {
    icon: "ri-hearts-line",
    title: "EMDR & Trauma-Informed Care",
    desc: "EMDR-certified therapists deliver the gold-standard trauma protocol, integrated from the beginning of treatment — not as an add-on, but as a core clinical priority.",
  },
  {
    icon: "ri-group-line",
    title: "Group Therapy & Peer Community",
    desc: "Structured group therapy provides skill development, shared accountability, and the peer connection that research identifies as one of recovery's strongest protective factors.",
  },
  {
    icon: "ri-parent-line",
    title: "Family Systems Work",
    desc: "Addiction and mental health affect families, not just individuals. Family therapy and psychoeducation address the relational system and build essential support structures.",
  },
];

/* ─── Page component ────────────────────────────────────────────────────── */

export default function WhatWeTreatPage() {
  return (
    <>
      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <CinematicHeroSection
        media={
          <>
            <Image
          src={`${BASE}/what-we-treat_hero02.jpg`}
          alt="Serene therapy room with floor-to-ceiling windows overlooking palm trees and the California coast at golden hour"
          fill
          className="object-cover object-center"
          priority
            />
            <div
              className="absolute inset-0"
              style={{ background: CINEMATIC_BOTTOM_HERO_GRADIENT }}
            />
          </>
        }
      >
        <PageHeroShell
          bottomBar={
            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
              {[
                { value: "17+",   label: "Conditions Treated" },
                { value: "Dual",  label: "Diagnosis Integrated" },
                { value: "EMDR",  label: "Certified Therapists" },
                { value: "1:3",   label: "Staff-Client Ratio" },
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
              <Eyebrow colorClass="text-accent" className="mb-4">Rize OC</Eyebrow>
              <h1
                className="font-[family-name:var(--font-display)] font-normal text-white"
                style={{ fontSize: "clamp(52px, 6.5vw, 96px)", lineHeight: 0.95 }}
              >
                What We<br />
                <em className="italic text-white/60">Treat</em>
              </h1>
              <p className="mt-6 text-[16px] font-light leading-relaxed text-white/80 max-w-[520px]">
                <AutoLinkedText>{"Comprehensive addiction and mental health treatment — every substance, every condition, fully integrated dual-diagnosis care for the complete clinical picture."}</AutoLinkedText>
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
              <div className="flex flex-wrap gap-3">
                <Button href="/verify-insurance" variant="accent" size="md">Verify Insurance — Free</Button>
                <Button href="tel:9494612620" variant="outline-white" size="md">
                  <i className="ri-phone-line mr-2 text-sm" /> (949)-461-2620
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {[
                  { icon: "ri-checkbox-circle-line", text: "Joint Commission Accredited" },
                  { icon: "ri-stethoscope-line",     text: "Dual Diagnosis Integrated" },
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

      {/* ②  Dual Diagnosis intro ─────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">Our Clinical Philosophy</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Addiction &amp; Mental Health Are the Same Problem
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"More than 70% of individuals with a substance use disorder also have a diagnosable mental health condition. Depression, anxiety, trauma, bipolar disorder, ADHD — these conditions don't exist alongside addiction. They drive it, sustain it, and are worsened by it."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Treating addiction without addressing mental health, or treating mental health without addressing substance use, is a clinically outdated approach that produces predictably poor outcomes. Rize OC's integrated dual-diagnosis model treats both conditions simultaneously — as the intertwined clinical picture they are."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Our board-certified psychiatrists, EMDR-certified therapists, and addiction medicine specialists work as a unified clinical team — not as separate consultants exchanging notes. The result is treatment that addresses the complete picture, not just its most visible surface."}</AutoLinkedText>
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/addiction" variant="accent" size="sm">
                Addiction Treatment <i className="ri-arrow-right-line ml-2 text-xs" />
              </Button>
              <Button href="/mental-health" variant="outline-ink" size="sm">
                Mental Health Treatment <i className="ri-arrow-right-line ml-2 text-xs" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { stat: "70%+", detail: "of clients present with both a substance use disorder and a co-occurring mental health condition" },
              { stat: "2×",   detail: "better long-term outcomes with integrated dual-diagnosis treatment versus sequential care" },
              { stat: "1:3",  detail: "staff-to-client ratio across all levels — individualized attention at every stage of care" },
              { stat: "24/7", detail: "admissions line — same-day assessments and rapid intake for urgent situations" },
            ].map(({ stat, detail }) => (
              <div key={stat} className="bg-cream border border-warm px-7 py-6 flex items-center gap-5">
                <p
                  className="font-[family-name:var(--font-display)] font-normal text-accent shrink-0"
                  style={{ fontSize: "clamp(32px, 3.5vw, 46px)", lineHeight: 1 }}
                ><AutoLinkedText>{stat}</AutoLinkedText></p>
                <p className="text-[14px] font-light leading-relaxed text-ink/65"><AutoLinkedText>{detail}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ③  Addiction conditions ─────────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <Eyebrow colorClass="text-accent" className="mb-4">Substance Use Disorders</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-white"
                style={{ fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: 1.05 }}
              >
                Addiction <em className="italic text-white/60">Treatment</em>
              </h2>
            </div>
            <Link
              href="/addiction"
              className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap"
            >
              Full Addiction Overview <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {addictionConditions.map(({ icon, title, desc, badge, badgeColor, href }) => (
              <Link
                key={title}
                href={href}
                className="group bg-white/5 border border-white/10 p-6 flex flex-col hover:border-accent/30 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <IconCircle icon={icon} variant="accent" size="sm" />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-1 rounded-sm ${badgeColor}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[18px] font-normal text-white mb-2 group-hover:text-accent transition-colors leading-snug">{title}</h3>
                <p className="text-[13px] font-light leading-relaxed text-white/60 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
                <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-accent flex items-center gap-1 group-hover:gap-2.5 transition-all">
                  Learn More <i className="ri-arrow-right-line" />
                </p>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ④  Mental health conditions ─────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <Eyebrow colorClass="text-ink/45" className="mb-4">Mental Health Conditions</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink"
                style={{ fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: 1.05 }}
              >
                Mental Health <em className="italic text-muted font-normal">Treatment</em>
              </h2>
            </div>
            <Link
              href="/mental-health"
              className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap"
            >
              Full Mental Health Overview <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentalHealthConditions.map(({ icon, title, desc, badge, badgeColor, href }) => (
              <Link
                key={title}
                href={href}
                className="group bg-white border border-warm p-7 flex flex-col hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-5">
                  <IconCircle icon={icon} colorClass="bg-accent/10 text-accent" size="w-10 h-10 text-base" />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-sm ${badgeColor}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-ink mb-2 group-hover:text-accent transition-colors leading-snug">{title}</h3>
                <p className="text-[13px] font-light leading-relaxed text-ink/60 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
                <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent flex items-center gap-1 group-hover:gap-2.5 transition-all">
                  Learn More <i className="ri-arrow-right-line" />
                </p>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑤  Our Approach ─────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Eyebrow colorClass="text-accent" className="mb-4">Clinical Approach</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: 1.05 }}
            >
              How We Treat at <em className="italic text-muted font-normal">Rize OC</em>
            </h2>
            <p className="mt-5 text-[15px] font-light text-ink/60 leading-relaxed">
              <AutoLinkedText>{"Every modality, every clinical tool — delivered as a unified, individualized treatment plan rather than a menu of disconnected services."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {approach.map(({ icon, title, desc }) => (
              <div key={title} className="bg-cream border border-warm p-7 flex flex-col">
                <IconCircle icon={icon} colorClass="bg-accent/10 text-accent" size="w-10 h-10 text-base" className="mb-5" />
                <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-ink mb-3 leading-snug">{title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-ink/65 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑥  Levels of Care quick-nav ─────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          <div className="text-center mb-10">
            <Eyebrow colorClass="text-accent" className="mb-4">Treatment Continuum</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white"
              style={{ fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 1.08 }}
            >
              Finding the Right <em className="italic text-white/60">Level of Care</em>
            </h2>
            <p className="mt-4 text-[15px] font-light text-white/60 max-w-xl mx-auto">
              <AutoLinkedText>{"The right level of care depends on the severity of your condition, your co-occurring diagnoses, and your life circumstances. Our admissions team assesses all of this — free, confidential, same day."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { icon: "ri-pulse-line",     label: "Detox",  title: "Medical Detox",             href: "/drug-alcohol-detox" },
              { icon: "ri-sun-line",       label: "PHP",    title: "Partial Hospitalization",    href: "/partial-hospitalization-program-orange-county" },
              { icon: "ri-group-line",     label: "IOP",    title: "Intensive Outpatient",       href: "/iop-program-orange-county" },
              { icon: "ri-leaf-line",      label: "OP",     title: "Outpatient Program",         href: "/outpatient-program" },
              { icon: "ri-computer-line",  label: "Virtual", title: "Virtual Outpatient",        href: "/virtual-outpatient-program" },
            ].map(({ icon, label, title, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col items-center text-center gap-3 border border-white/10 bg-white/5 p-6 hover:border-accent/40 hover:bg-white/10 transition-colors"
              >
                <IconCircle icon={icon} variant="accent" size="sm" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 mb-1"><AutoLinkedText>{label}</AutoLinkedText></p>
                  <p className="text-[14px] font-medium text-white group-hover:text-accent transition-colors leading-snug"><AutoLinkedText>{title}</AutoLinkedText></p>
                </div>
                <i className="ri-arrow-right-line text-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/levels-of-care"
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-accent hover:gap-3 transition-all"
            >
              View Full Levels of Care Guide <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑦  Accreditations ───────────────────────────────────────────────── */}
      <AccreditationsBar />

      {/* ⑧  CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-ink relative overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #D98A53 0%, transparent 70%)" }}
          aria-hidden
        />
        <SectionWrapper className="text-center relative z-10">
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">Begin Treatment at Rize OC</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(30px, 4vw, 56px)", lineHeight: 1.05, maxWidth: "700px" }}
          >
            Recovery Is Possible —
            <br />
            <em className="italic text-white/60">It Starts With One Call</em>
          </h2>
          <p className="mt-6 text-[15px] font-light text-white/65 max-w-lg mx-auto leading-relaxed">
            <AutoLinkedText>{"Our admissions team is available 24/7 to answer questions, verify your insurance, and help you understand every option — completely confidential, no obligation."}</AutoLinkedText>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:9494612620" variant="accent" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
            <Button href="/verify-insurance" variant="outline-white" size="lg">
              Verify My Insurance
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {["Free Insurance Verification", "Same-Day Admissions", "100% Confidential"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line text-accent text-base" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">{item}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>
    </>
  );
}

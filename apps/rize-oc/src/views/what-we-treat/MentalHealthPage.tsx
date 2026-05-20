import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import PageHeroShell from "@/components/ui/PageHeroShell";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─────────────────────────────────────────────────── Section data ─────── */

const conditions = [
  {
    icon: "ri-cloud-line",
    title: "Depression & Mood Disorders",
    desc: "Major depressive disorder, persistent depressive disorder, bipolar disorder I & II, and cyclothymia. Our integrated approach combines psychiatric medication management with evidence-based therapy to achieve genuine mood stabilization.",
    badge: "High Prevalence",
    badgeColor: "text-blue-700 bg-blue-50",
  },
  {
    icon: "ri-mental-health-line",
    title: "Anxiety Disorders",
    desc: "Generalized anxiety disorder, panic disorder, social anxiety, and specific phobias. CBT, exposure therapy, and DBT skills — alongside psychiatric support — provide the foundation for lasting anxiety reduction.",
    badge: "Evidence-Based",
    badgeColor: "text-teal-700 bg-teal-50",
  },
  {
    icon: "ri-hearts-line",
    title: "Trauma & PTSD",
    desc: "Complex trauma, PTSD, and adverse childhood experiences are among the most common drivers of both mental health conditions and substance use. EMDR, somatic therapy, and trauma-informed CBT address the neurological and psychological dimensions of traumatic experience.",
    badge: "EMDR Available",
    badgeColor: "text-purple-600 bg-purple-50",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Dual Diagnosis",
    desc: "More than 70% of individuals with substance use disorders also have a co-occurring mental health condition. Our integrated dual-diagnosis model treats both simultaneously — addressing the conditions as the intertwined clinical picture they are.",
    badge: "Integrated Model",
    badgeColor: "text-accent bg-accent/10",
  },
  {
    icon: "ri-brain-line",
    title: "Bipolar Disorder",
    desc: "Bipolar I, bipolar II, and cyclothymia require the careful integration of mood stabilization, psychiatric medication management, and evidence-based therapy. Our psychiatric team has deep expertise in bipolar presentations across the spectrum.",
    badge: "Psychiatric Focused",
    badgeColor: "text-orange-600 bg-orange-50",
  },
  {
    icon: "ri-emotion-unhappy-line",
    title: "Stress, Burnout & Executive Care",
    desc: "Chronic stress, occupational burnout, and the executive-specific mental health challenges of high-performance professionals are treated with the same clinical rigor as any other condition — with additional sensitivity to professional privacy and scheduling needs.",
    badge: "Executive Track",
    badgeColor: "text-white/70 bg-white/10",
  },
];

const modalities = [
  {
    icon: "ri-mental-health-line",
    title: "EMDR Therapy",
    desc: "Eye Movement Desensitization and Reprocessing — the gold-standard, evidence-based protocol for trauma. Delivered by certified EMDR therapists trained in complex trauma presentations.",
    core: true,
  },
  {
    icon: "ri-brain-line",
    title: "CBT & DBT",
    desc: "Cognitive Behavioral Therapy addresses maladaptive thought patterns. Dialectical Behavior Therapy provides a comprehensive skill set for emotional regulation, distress tolerance, and interpersonal effectiveness.",
    core: true,
  },
  {
    icon: "ri-leaf-line",
    title: "Somatic Therapy",
    desc: "Body-based approaches addressing the physiological dimension of trauma and anxiety — the nervous system patterns that persist even after cognitive processing.",
    core: false,
  },
  {
    icon: "ri-stethoscope-line",
    title: "Psychiatric Medication Management",
    desc: "Board-certified psychiatrists manage medications throughout treatment — titrating appropriately, monitoring side effects, and adjusting protocols based on clinical response.",
    core: false,
  },
  {
    icon: "ri-palette-line",
    title: "Expressive & Art Therapy",
    desc: "Creative modalities providing access to emotional and psychological material that language-based therapy alone cannot reach.",
    core: false,
  },
  {
    icon: "ri-sun-line",
    title: "Mindfulness-Based Approaches",
    desc: "Mindfulness-Based Cognitive Therapy (MBCT) and mindfulness practices integrated throughout programming to build present-moment awareness and reduce rumination.",
    core: false,
  },
];

const whyStats = [
  { stat: "70%+", detail: "of Rize OC clients present with a co-occurring mental health condition alongside their substance use disorder" },
  { stat: "2×",   detail: "better long-term outcomes when mental health and addiction are treated simultaneously versus sequentially" },
  { stat: "87%",  detail: "reduction in psychiatric hospitalization risk with intensive integrated treatment at the PHP level" },
  { stat: "EMDR", detail: "certified therapists specializing in trauma processing — the single most evidence-supported trauma treatment available" },
];

const levelsOfCare = [
  {
    icon: "ri-sun-line",
    label: "Most Intensive",
    title: "Partial Hospitalization (PHP)",
    desc: "Six hours of daily programming with embedded psychiatric oversight — the most appropriate level for significant mental health conditions requiring daily monitoring and medication management.",
    href: "/partial-hospitalization-program-orange-county",
    cta: "Learn About PHP",
    accent: true,
  },
  {
    icon: "ri-group-line",
    label: "Flexible",
    title: "Intensive Outpatient (IOP)",
    desc: "Structured group and individual therapy woven into daily life — suitable for individuals with mental health conditions who have achieved initial stability.",
    href: "/iop-program-orange-county",
    cta: "Learn About IOP",
    accent: false,
  },
  {
    icon: "ri-video-line",
    label: "Remote Option",
    title: "Virtual Outpatient",
    desc: "All the clinical depth of in-person programming — IOP and OP — delivered through secure telehealth from anywhere in California.",
    href: "/virtual-outpatient-program",
    cta: "Learn About Virtual",
    accent: false,
  },
];

const faqs: FaqItem[] = [
  {
    q: "What mental health conditions does Rize OC treat?",
    a: "Rize OC treats a wide range of co-occurring and primary mental health conditions, including major depressive disorder, generalized anxiety disorder, panic disorder, social anxiety, PTSD and complex trauma, bipolar disorder I and II, ADHD, borderline personality features, stress and burnout, and dual-diagnosis presentations where mental health and substance use disorders co-occur. If you have a condition not listed here, contact our admissions team — we conduct individualized assessments for a wide range of presentations.",
  },
  {
    q: "What is dual-diagnosis treatment and why does it matter?",
    a: "Dual-diagnosis treatment refers to the integrated treatment of co-occurring substance use disorders and mental health conditions simultaneously. More than 70% of individuals with substance use disorders also have a diagnosable mental health condition — and the two are almost always intertwined. Treating them separately (addiction first, mental health later) is a clinically outdated approach that produces significantly worse outcomes. At Rize OC, our psychiatric team and addiction specialists work together from day one, delivering a truly integrated clinical experience that addresses the full picture.",
  },
  {
    q: "Do I need to have a substance use disorder to receive mental health treatment at Rize OC?",
    a: "No. While many Rize OC clients present with dual-diagnosis conditions, we also accept clients whose primary presenting concern is a mental health condition — depression, trauma, anxiety, bipolar disorder, or burnout — without a co-occurring substance use disorder. Our psychiatric and therapeutic team is fully equipped to provide comprehensive mental health treatment at PHP, IOP, and outpatient levels, regardless of whether substance use is part of the clinical picture.",
  },
  {
    q: "Is EMDR available at Rize OC?",
    a: "Yes. Rize OC has EMDR-certified therapists on staff who specialize in trauma processing for both PTSD and complex trauma presentations. EMDR (Eye Movement Desensitization and Reprocessing) is the most rigorously evidence-supported trauma treatment available — endorsed by the WHO, the American Psychological Association, and the VA. It is integrated into our PHP and higher-intensity programming as a core clinical modality, and available in individual therapy for IOP and OP clients.",
  },
  {
    q: "How does psychiatric medication management work at Rize OC?",
    a: "Our embedded board-certified psychiatrists assess, prescribe, monitor, and adjust psychiatric medications throughout your treatment at Rize OC. For clients entering with existing psychiatric medications, we conduct a thorough medication review and collaborate with any outside prescribers. For clients who may benefit from psychiatric medication but have not yet been prescribed, our psychiatrists conduct comprehensive evaluations and initiate appropriate pharmacological support as indicated. Medication management is continuous — not a one-time assessment.",
  },
  {
    q: "Can mental health treatment be done virtually?",
    a: "Yes. Rize OC offers virtual IOP and OP for both addiction and mental health presentations — available throughout California. Virtual mental health programming includes individual therapy, group therapy, and psychiatric check-ins, delivered through our HIPAA-compliant telehealth platform. For PHP-level mental health care, in-person treatment is generally preferable given the psychiatric monitoring intensity required — but virtual PHP is available in select situations. Contact our admissions team to discuss what is appropriate for your specific situation.",
  },
  {
    q: "Will my mental health treatment be confidential?",
    a: "Yes — absolutely. All mental health treatment at Rize OC is protected by the same confidentiality standards as any medical treatment. Specifically, mental health records are protected under both HIPAA and California&apos;s more stringent state privacy laws. Information about your treatment cannot be shared without your explicit written consent, with very limited legal exceptions (imminent risk of harm to self or others, certain court orders). We take the privacy of our clients&apos; mental health treatment extremely seriously and have specific protocols for clients with professional or public profile privacy needs.",
  },
  {
    q: "What is the difference between a psychiatrist, psychologist, and therapist at Rize OC?",
    a: "At Rize OC, psychiatrists (MDs or DOs) are the prescribing members of the clinical team — they conduct psychiatric evaluations, diagnose mental health conditions, and manage psychiatric medications. Psychologists (PhDs or PsyDs) provide advanced psychological assessment and specialized therapeutic interventions, including EMDR and complex trauma work. Licensed therapists (MFTs, LCSWs, LPCCs) provide the majority of individual and group therapy throughout programming. All three work as an integrated team — with the psychiatrist providing medical oversight and the therapists delivering ongoing therapeutic work.",
  },
];

/* ─────────────────────────────────────────────────── Page component ────── */

export default function MentalHealthPage() {
  return (
    <>
      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <CinematicHeroSection
        media={
          <>
            <Image
          src={`${BASE}/mh_hero01.jpg`}
          alt="Bright healing interior at Rize OC mental health treatment center in Orange County California"
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
          topSlot={<Eyebrow colorClass="text-accent">What We Treat</Eyebrow>}
          bottomBar={
            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
              {[
                { value: "Dual",    label: "Diagnosis Integrated" },
                { value: "EMDR",    label: "Certified Therapists" },
                { value: "Psych",   label: "On-Site Psychiatry" },
                { value: "CA",      label: "Licensed Telehealth" },
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
                Mental Health<br />
                <em className="italic text-white/60">Treatment</em>
              </h1>
              <p className="mt-6 text-[16px] font-light leading-relaxed text-white/80 max-w-[520px]">
                <AutoLinkedText>{"Integrated psychiatric care and evidence-based therapy for depression, anxiety, trauma, bipolar disorder, and co-occurring conditions — treating the whole person."}</AutoLinkedText>
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
                  { icon: "ri-stethoscope-line",     text: "Psychiatrists On-Site" },
                  { icon: "ri-hearts-line",          text: "EMDR Certified" },
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

      {/* ②  Understanding Mental Health Treatment ───────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_400px] gap-16 items-stretch">
          <div className="flex flex-col h-full">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Our Approach</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Integrated Psychiatric Care for the Whole Person
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Mental health conditions are not simply brain chemistry problems that medication fixes, nor are they purely psychological patterns that therapy resolves. They are complex interactions of neurobiology, personal history, relational patterns, and environmental circumstances — and effective treatment addresses all of these dimensions."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"At Rize OC, mental health treatment is built around genuine integration — not a psychiatrist and a therapist who exchange notes, but a unified clinical team that plans, delivers, and adjusts treatment collaboratively. Medication decisions are made in the context of the full therapeutic picture. Therapeutic work is informed by psychiatric understanding."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"For clients with co-occurring substance use disorders — the majority of our clients — this integration extends to the addiction treatment dimension as well. The same clinical team addresses both conditions, in the same programming, at the same time. This is what genuine dual-diagnosis treatment looks like."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"We also recognize that mental health treatment is deeply personal. The therapeutic relationship is the foundation of effective work — which is why client-therapist fit, consistent therapeutic assignment, and genuine clinical investment are non-negotiable aspects of how we operate."}</AutoLinkedText>
              </p>
            </div>
            <blockquote className="mt-auto pt-8 border-l-2 border-accent pl-6">
              <p className="text-[17px] font-[family-name:var(--font-display)] font-normal text-ink/70 leading-snug italic">
                <AutoLinkedText>{"\"The most common reason people don't recover from mental health conditions is under-treatment — not enough intensity, not enough integration, not enough time. Our job is to provide what actually works.\""}</AutoLinkedText>
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40"><AutoLinkedText>{"Rize OC Clinical Director"}</AutoLinkedText></p>
            </blockquote>
          </div>

          <div className="flex flex-col gap-5 h-full">
            <div className="bg-ink p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-4"><AutoLinkedText>{"The Rize OC Difference"}</AutoLinkedText></p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "ri-stethoscope-line",  point: "Board-certified psychiatrists embedded in all levels of care — not just weekly consult appointments" },
                  { icon: "ri-hearts-line",        point: "EMDR-certified therapists specializing in trauma — the most evidence-supported trauma treatment available" },
                  { icon: "ri-layers-line",        point: "True dual-diagnosis integration — addiction and mental health treated as one unified clinical picture" },
                  { icon: "ri-user-heart-line",    point: "Consistent therapeutic assignment — your therapist follows you through the entire continuum" },
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
                { label: "Conditions Treated",  value: "Depression, Anxiety, PTSD & More" },
                { label: "Dual Diagnosis",      value: "Fully Integrated" },
                { label: "Psychiatry",          value: "On-Site, All Levels" },
                { label: "Telehealth",          value: "Available (CA)" },
                { label: "Insurance",           value: "Most PPO Plans" },
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

      {/* ③  Conditions We Treat ──────────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          <div className="text-center mb-12">
            <Eyebrow colorClass="text-accent" className="mb-4">Mental Health Conditions</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mb-5"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05 }}
            >
              Conditions We <em className="italic text-white/60">Treat</em>
            </h2>
            <p className="text-[15px] font-light text-white/65 max-w-2xl mx-auto">
              <AutoLinkedText>{"Our psychiatric and clinical team is experienced across the full range of mood, anxiety, trauma, and personality-related conditions — including complex dual-diagnosis presentations."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {conditions.map(({ icon, title, desc, badge, badgeColor }) => (
              <div key={title} className="bg-white/5 border border-white/10 p-7 flex flex-col hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-5">
                  <IconCircle icon={icon} variant="accent" size="sm" />
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm ${badgeColor}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-white mb-3">{title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-white/75 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-white/10 bg-white/5 px-8 py-5 text-center">
            <p className="text-[15px] font-light text-white/70">
              <span className="text-white font-medium">Don&apos;t see your condition listed?</span>{" "}
              We conduct individualized assessments and treat a wide range of mental health presentations. Contact our admissions team to discuss your specific situation.
            </p>
          </div>
        </SectionWrapper>
      </section>

      {/* ④  Therapies & Modalities ───────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="Clinical Modalities"
            heading="How We Treat Mental Health at Rize OC"
            body="Our clinical team integrates the most evidence-supported therapeutic and psychiatric modalities available — individualized to each client's specific condition and clinical picture."
            headingStyle={{ fontSize: "clamp(38px, 4vw, 56px)", lineHeight: 1.05 }}
            mb="mb-14"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modalities.map(({ icon, title, desc, core }) => (
              <div key={title} className="bg-white border border-warm p-7 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <IconCircle icon={icon} variant="accent-subtle" size="sm" />
                  {core && (
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm bg-accent/10 text-accent">
                      Core Protocol
                    </span>
                  )}
                </div>
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
            <Eyebrow colorClass="text-ink/45" className="mb-5">The Evidence</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Why Integrated Mental Health Treatment Produces Better Outcomes
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The research on integrated dual-diagnosis treatment is unambiguous: treating co-occurring mental health and substance use disorders simultaneously produces dramatically better outcomes than treating them sequentially or in separate programs. The conditions are neurologically intertwined — addressing one while ignoring the other leaves the untreated condition as an ongoing driver of the other's recurrence."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Psychiatric intensity matters. Clients with significant mental health conditions — particularly those with mood disorders, trauma histories, or psychotic features — require daily psychiatric contact, not a weekly check-in. Our PHP level provides this intensity, with psychiatrists embedded in the clinical team and available throughout the programming day."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Trauma is the hidden driver of a substantial proportion of both mental health and substance use presentations. Our EMDR-certified therapists bring evidence-based trauma processing into the clinical toolkit at all relevant levels — not as an optional add-on, but as a core clinical priority."}</AutoLinkedText>
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {[
                "Simultaneous dual-diagnosis treatment outperforms sequential care by 2× on long-term outcomes",
                "Daily psychiatric contact at PHP level enables responsive medication management",
                "EMDR processing of trauma reduces relapse risk for trauma-driven conditions",
                "Consistent therapeutic assignment preserves the therapeutic alliance critical to outcomes",
                "Peer community provides shared mental health recovery support alongside clinical treatment",
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
            heading="Finding the Right Level of Mental Health Care"
            body="The appropriate level of care depends on the severity of your condition, the degree of psychiatric support needed, and whether co-occurring substance use is part of the picture."
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
              <span className="text-white font-medium">Not sure which level is right?</span>{" "}
              Our admissions team conducts a thorough clinical assessment and makes an honest recommendation.
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
              <AutoLinkedText>{"Our admissions team is available 24/7 to answer anything you don't find here."}</AutoLinkedText>
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
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">Begin Mental Health Treatment</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: 1.05, maxWidth: "760px" }}
          >
            You Deserve Care That Actually Works
          </h2>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-white/55 max-w-xl mx-auto">
            <AutoLinkedText>{"Our admissions team is available 24/7 to answer questions, verify your insurance, and help you understand your options. All conversations are completely confidential."}</AutoLinkedText>
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
            {["Free Insurance Verification", "Psychiatrists On-Site", "100% Confidential"].map((item) => (
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

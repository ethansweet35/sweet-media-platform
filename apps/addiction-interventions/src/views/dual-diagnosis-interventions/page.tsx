import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/dual_diagnosis_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/dual_diagnosis_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Using substances to manage depression, anxiety, trauma, or mood instability",
  "Multiple treatment attempts that didn't address the underlying mental health condition",
  "Diagnosis of a mental health disorder that co-exists with substance use",
  "Periods of sobriety followed by rapid relapse triggered by mental health symptoms",
  "Prescribed psychiatric medications but still using substances on top of them",
  "A history of trauma (childhood, military, assault) that has never been fully treated",
  "Suicidal ideation, self-harm, or psychotic episodes alongside substance use",
  "Clinicians have described 'treatment-resistant' depression, anxiety, or addiction",
];

const MYTHS = [
  {
    icon: "ri-sort-asc",
    myth: `"Treat the addiction first, then the mental health."`,
    truth:
      "Sequential treatment is an outdated model. If only the addiction is treated without addressing the co-occurring mental health condition, relapse rates are dramatically higher. We only place with programs that treat both simultaneously from day one.",
  },
  {
    icon: "ri-question-line",
    myth: `"We don't know which came first — so we don't know what to treat."`,
    truth:
      "You don't need to solve the chicken-and-egg question before getting help. Integrated dual-diagnosis treatment is designed exactly for this ambiguity — both conditions are assessed and treated in parallel by specialists in both.",
  },
  {
    icon: "ri-hospital-line",
    myth: `"A standard rehab can handle this."`,
    truth:
      "Many rehabs are not equipped for complex dual diagnosis cases. We know the difference between a program that adds a counsellor as an afterthought and one that has full psychiatric staffing, medication management, and trauma-informed care baked in.",
  },
  {
    icon: "ri-heart-2-line",
    myth: `"They need to get sober before we can diagnose the mental illness."`,
    truth:
      "Some conditions do clarify with sobriety — but waiting for sobriety to arrive on its own before addressing mental health is circular. The right integrated program assesses and treats both from the moment of admission.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Clinical intake call",
    body: "We take a detailed history — substance use, mental health diagnoses, medications, trauma history, and treatment attempts. This shapes the entire intervention plan and treatment placement.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Dual diagnosis matching",
    body: "We identify treatment programs equipped for the specific combination of conditions involved — not just programs with a 'dual diagnosis track' but ones with genuine psychiatric depth and evidence-based protocols.",
  },
  {
    icon: "ri-group-line",
    title: "Family preparation",
    body: "We coach the family to understand dual diagnosis — why previous treatment failed, what integrated care looks like, and how to participate in the intervention without inadvertently minimising the mental health component.",
  },
  {
    icon: "ri-heart-line",
    title: "The intervention",
    body: "We facilitate the conversation with clinical language that helps the loved one understand both conditions are real, treatable, and connected. Treatment is offered immediately.",
  },
  {
    icon: "ri-hospital-line",
    title: "Integrated placement",
    body: "We place with programs that offer simultaneous psychiatric care, medication management, trauma-informed therapy, and evidence-based addiction treatment — not a sequence, but all at once.",
  },
];

const DUAL_FAQS: Faq[] = [
  {
    question: "What exactly is dual diagnosis?",
    answer: "Dual diagnosis means a person is struggling with both a substance use disorder and a co-occurring mental health condition — depression, anxiety, bipolar disorder, PTSD, OCD, or others. Treating only one without the other almost always leads to relapse. We specialise in interventions that get your loved one into truly integrated care from day one.",
  },
  {
    question: "How do you decide which condition to treat first?",
    answer: "We don't treat them sequentially — we place with programs that address both simultaneously. The intervention is structured to help the family and the loved one understand that the substance use and the mental health condition are intertwined and must be treated together.",
  },
  {
    question: "Why do standard rehabs fail for dual diagnosis?",
    answer: "Most standard addiction treatment programs are not equipped for serious co-occurring psychiatric conditions. They may offer limited counselling but lack full psychiatric staffing, medication management expertise, or trauma-informed care. We specifically vet programs for dual diagnosis depth before making any referral.",
  },
  {
    question: "Can medication be part of the treatment?",
    answer: "Yes — medication-assisted treatment (MAT) and psychiatric medication management are often critical components of dual diagnosis care. We work with programs that have full prescribing capabilities and can manage complex medication regimens from the start of treatment.",
  },
  {
    question: "What if my loved one was previously misdiagnosed?",
    answer: "This is extremely common. Many people with dual diagnosis have received only one diagnosis — usually the more visible one — and been treated incompletely as a result. Good dual diagnosis programs conduct their own thorough assessment on admission rather than relying solely on prior records.",
  },
  {
    question: "Does trauma need to be addressed in treatment?",
    answer: "Almost always, yes. Unresolved trauma drives an enormous percentage of dual diagnosis cases. We prioritise programs that offer evidence-based trauma treatment — EMDR, somatic therapy, trauma-focused CBT — alongside addiction and psychiatric care.",
  },
];

export default function DualDiagnosisInterventionsPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Dual Diagnosis Interventions"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Dual diagnosis interventions — <span className="italic text-[#8FAC87]">when addiction and mental illness collide</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"Substance use and mental health disorders almost always travel together — and treating one without the other is the primary reason most treatment attempts fail. We get your loved one into integrated care that addresses both."}</AutoLinkedText>
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                {["Both conditions treated simultaneously", "Psychiatric care included", "Trauma-informed placement"].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <i className="ri-check-line text-[#8FAC87]"></i> {t}
                  </span>
                ))}
              </div>
            </div>
            <HeroContactForm />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Signs */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Does This Apply?</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Signs your loved one has a <span className="italic text-[#507969]">dual diagnosis</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"Dual diagnosis is more common than most families realise. If several of these patterns are true, a standard addiction program is unlikely to produce lasting results."}</AutoLinkedText>
              </p>
              <ul className="grid gap-3">
                {SIGNS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                      <i className="ri-check-line text-xs"></i>
                    </span>
                    <span className="text-sm leading-relaxed text-[#4B4B4B]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "Integrated", label: "Psych + addiction care", icon: "ri-link-m" },
                { number: "MAT", label: "When clinically appropriate", icon: "ri-medicine-bottle-line" },
                { number: "90+", label: "Day residential options", icon: "ri-home-smile-line" },
                { number: "24 / 7", label: "Crisis support available", icon: "ri-alarm-warning-line" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7] p-7 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3E5B50] text-white">
                    <i className={`text-xl ${s.icon}`}></i>
                  </span>
                  <p className="font-heading mt-4 text-3xl font-bold text-[#3E5B50]"><AutoLinkedText>{s.number}</AutoLinkedText></p>
                  <p className="mt-1 text-xs font-medium text-[#4B4B4B]"><AutoLinkedText>{s.label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Myths — dark sage */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Why Treatment Keeps Failing"}</AutoLinkedText></p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Dangerous assumptions about <span className="italic text-[#8FAC87]">dual diagnosis</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {MYTHS.map((m) => (
              <div key={m.myth} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#8FAC87]">
                  <i className={`${m.icon} text-lg`}></i>
                </div>
                <p className="mb-3 text-sm font-semibold italic text-white/60"><AutoLinkedText>{m.myth}</AutoLinkedText></p>
                <p className="text-sm leading-relaxed text-white/85"><AutoLinkedText>{m.truth}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image quote banner */}
      <section className="relative h-[420px] overflow-hidden">
        <Image src={FAMILY_IMG} alt="A family navigating dual diagnosis intervention" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"We kept trying to fix the drinking. The intervention finally helped us see the depression underneath.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Family of a young woman now stable in integrated recovery"}</AutoLinkedText></p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Approach</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              How we intervene for <span className="italic text-[#507969]">dual diagnosis</span>
            </h2>
          </div>
          <div className="relative grid gap-8 md:grid-cols-5">
            <div className="pointer-events-none absolute left-0 right-0 top-[2.25rem] hidden h-0.5 bg-[#8FAC87]/25 md:block" />
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <span className="relative mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#3E5B50] text-white shadow-md">
                  <i className={`${step.icon} text-2xl`}></i>
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#8FAC87] text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="font-heading mb-2 text-base font-bold text-[#1A1A17]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{step.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion title="Dual diagnosis questions, answered" faqs={DUAL_FAQS} />

      <BottomCta
        title="Two conditions, one integrated path forward"
        italicWord="integrated"
        body="Your first call is free, confidential, and judgment-free. We will help you understand the full picture and find the right program."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

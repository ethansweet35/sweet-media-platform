import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/dual_diagnosis_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/dual_diagnosis_family01.jpg`;

const DUAL_FAQS: Faq[] = [
  {
    question: "What exactly is dual diagnosis?",
    answer: "Dual diagnosis means a person is struggling with both a substance use disorder and a co-occurring mental health condition (depression, anxiety, bipolar, PTSD, etc.). Treating only one without the other almost always leads to relapse. We specialise in interventions that get your loved one into truly integrated care from day one.",
  },
  {
    question: "How do you decide which condition to treat first?",
    answer: "We don't treat them sequentially — we place with programmes that address both simultaneously. The intervention conversation is structured to help the family and the loved one understand that the substance use and the mental health condition are intertwined and must be treated together.",
  },
];

export default function DualDiagnosisInterventionsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Dual Diagnosis Interventions</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Dual diagnosis interventions — <span className="italic text-[#8FAC87]">when addiction and mental illness collide</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                Substance use and mental health disorders often travel together — and treating one without the other usually leads to relapse. We specialise in interventions that get your loved one into integrated care from day one.
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <HeroContactForm />
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">What We Do</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                What a professional dual diagnosis intervention <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                Dual diagnosis treatment requires programs that can hold both conditions at once. We have built relationships with the centres that do this well, and we will not place your loved one anywhere we would not place our own family.
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                The intervention conversation is carefully structured to help everyone understand that the substance use and the mental health condition are not separate battles — they are one fight. We place with programmes that offer simultaneous psychiatric care, medication management, trauma-informed therapy, and evidence-based addiction treatment.
              </p>
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
                  <p className="font-heading mt-4 text-3xl font-bold text-[#3E5B50]">{s.number}</p>
                  <p className="mt-1 text-xs font-medium text-[#4B4B4B]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[420px] overflow-hidden">
        <Image src={FAMILY_IMG} alt="A family navigating dual diagnosis" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "We kept trying to fix the drinking. The intervention finally helped us see the depression underneath."
          </p>
          <p className="mt-2 text-sm text-white/70">— Family of a young woman now stable in recovery</p>
        </div>
      </section>

      <FaqAccordion title="Dual diagnosis questions, answered" faqs={DUAL_FAQS} />

      <BottomCta
        title="Two conditions, one fight"
        italicWord="fight"
        body="Your first call is free, confidential, and judgment-free."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

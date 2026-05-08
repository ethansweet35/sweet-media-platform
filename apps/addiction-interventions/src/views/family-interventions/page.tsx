import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/family_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/family_family01.jpg`;

const FAMILY_FAQS: Faq[] = [
  {
    question: "What makes a family intervention different?",
    answer: "Addiction is a family disease. The most successful interventions reset the entire family system — not just the person who is using. Our process empowers every member to play a healthy role in recovery and stops the patterns of enabling that have kept the disease alive.",
  },
  {
    question: "Do all family members have to participate?",
    answer: "Not necessarily all, but the more aligned the family is, the more powerful the intervention. We work with the key decision-makers and supporters. Even one or two well-prepared family members can create meaningful change when coached properly.",
  },
];

export default function FamilyInterventionsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Family Interventions</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Family interventions — <span className="italic text-[#8FAC87]">healing the whole system, not just one person</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                Addiction is a family disease. The most successful interventions reset the entire family system — not just the person who is using. Our process empowers every member to play a healthy role in recovery.
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
                What a professional family intervention <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                Most families come to us after years of trying to help in ways that quietly enabled the problem. We help you see those patterns clearly, set boundaries that hold, and stop carrying weight that was never yours to carry.
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                The intervention is as much about healing the family system as it is about getting the identified patient into treatment. We prepare every participant to shift from enabling to supporting, from chaos to clarity.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "Whole", label: "Family system focus", icon: "ri-group-line" },
                { number: "Boundary", label: "Coaching for everyone", icon: "ri-shield-check-line" },
                { number: "90+", label: "Day family support options", icon: "ri-home-smile-line" },
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
        <Image src={FAMILY_IMG} alt="A family healing together" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "We finally stopped enabling and started supporting. The intervention changed all of us."
          </p>
          <p className="mt-2 text-sm text-white/70">— Entire family now in recovery together</p>
        </div>
      </section>

      <FaqAccordion title="Family intervention questions, answered" faqs={FAMILY_FAQS} />

      <BottomCta
        title="The whole family deserves to heal"
        italicWord="heal"
        body="Your first call is free, confidential, and judgment-free."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

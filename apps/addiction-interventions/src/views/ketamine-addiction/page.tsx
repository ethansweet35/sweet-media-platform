import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";

const SUPABASE_IMAGES =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

const HERO_BG = `${SUPABASE_IMAGES}/ketamine_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/ketamine_family01.jpg`;

const SIGNS = [
  "Frequent dissociation, 'K-holes,' or inability to speak or move after use",
  "Using ketamine to self-medicate depression, anxiety, or trauma",
  "Rapid escalation from occasional recreational use to daily dependence",
  "Financial problems or secrecy around 'therapy' or 'wellness' purchases",
  "Memory issues, confusion, or cognitive fog that persists between uses",
  "Withdrawal from social activities and responsibilities",
  "Defensiveness when questioned about ketamine use or 'microdosing'",
  "Physical decline — bladder issues, weight changes, or frequent illness",
];

const KETAMINE_FAQS: Faq[] = [
  {
    question: "Ketamine has legitimate medical uses — how do you distinguish therapeutic use from addiction?",
    answer:
      "Ketamine has gone from underground party drug to therapeutic tool — and back to a substance of abuse. We help families intervene when recreational or self-administered ketamine use becomes a dependency. Our interventionists separate genuine therapeutic need from compulsive use and place loved ones in programmes that treat both the substance and any underlying mental health conditions.",
  },
  {
    question: "My loved one says they're 'microdosing' for depression — is that real or an excuse?",
    answer:
      "Ketamine addiction can hide behind legitimate-sounding mental health language ('I'm self-medicating my depression'). While ketamine-assisted therapy is an emerging evidence-based treatment, unsupervised self-administration is dangerous and often indicates a developing dependence. We assess whether the use is truly therapeutic or compulsive.",
  },
  {
    question: "Does ketamine require medical detox?",
    answer:
      "Ketamine withdrawal is primarily psychological (cravings, depression, anxiety, sleep disturbance) rather than life-threatening like alcohol or opioids. However, the psychological dependence can be intense, and many users have co-occurring depression or trauma that must be addressed simultaneously. Residential or intensive outpatient with psychiatric support is usually required.",
  },
];

export default function KetamineAddictionPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Ketamine Addiction Intervention</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Ketamine interventions —{" "}
                <span className="italic text-[#8FAC87]">when 'wellness' becomes dependence</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                Ketamine has gone from underground party drug to therapeutic tool — and back to a substance of abuse. We help families intervene when recreational or self-administered ketamine use becomes a dependency.
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
                <a href="#signs" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                  See the warning signs <i className="ri-arrow-down-line"></i>
                </a>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { icon: "ri-shield-check-line", text: "100% Confidential" },
                  { icon: "ri-time-line", text: "Available 24 / 7" },
                  { icon: "ri-award-line", text: "Joint Commission Accredited" },
                  { icon: "ri-map-pin-2-line", text: "Nationwide" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87]/30 text-[#8FAC87]">
                      <i className={`${b.icon} text-xs`}></i>
                    </span>
                    <span className="text-sm font-medium text-white/80">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <HeroContactForm />
          </div>
        </div>
      </section>

      <TrustStrip />

      <section id="signs" className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Recognise the Signs</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Is it time for a{" "}
                <span className="italic text-[#507969]">ketamine intervention?</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                Ketamine addiction can hide behind legitimate-sounding mental health language. The line between therapeutic use and compulsive self-medication is often blurred by the user. These signs indicate the situation has crossed into dependence.
              </p>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#3E5B50] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#507969]">
                <i className="ri-phone-fill"></i> Speak with an interventionist now
              </a>
            </div>
            <ul className="grid gap-3">
              {SIGNS.map((sign) => (
                <li key={sign} className="flex items-start gap-4 rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7]/60 px-5 py-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                    <i className="ri-check-line text-xs"></i>
                  </span>
                  <span className="text-sm leading-relaxed text-[#4B4B4B]">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">What We Do</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                What a professional ketamine intervention{" "}
                <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                Ketamine addiction can hide behind legitimate-sounding mental health language ('I'm self-medicating my depression'). Our interventionists separate genuine therapeutic need from compulsive use and place loved ones in programmes that treat both the substance and any underlying mental health conditions.
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                We work with treatment centres that understand the unique profile of ketamine dependence — the dissociative effects, the potential for bladder damage, and the often co-occurring depression or trauma that drove the use in the first place.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "Dual", label: "Diagnosis expertise", icon: "ri-link-m" },
                { number: "Specialist", label: "Ketamine-aware programmes", icon: "ri-test-tube-line" },
                { number: "90+", label: "Day minimum programmes", icon: "ri-home-smile-line" },
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
        <Image src={FAMILY_IMG} alt="A family addressing ketamine dependence" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "We thought the ketamine was helping his depression. It was destroying him."
          </p>
          <p className="mt-2 text-sm text-white/70">— Parents of a son now in long-term recovery</p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Related Services</p>
            <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl">
              You may also need{" "}
              <span className="italic text-[#507969]">these</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { slug: "drug-abuse-interventions", icon: "ri-capsule-line", name: "Drug Abuse Interventions", desc: "When ketamine is part of a broader pattern of substance use or polysubstance dependence." },
              { slug: "dual-diagnosis-interventions", icon: "ri-link-m", name: "Dual Diagnosis Interventions", desc: "Ketamine use almost always co-occurs with depression, anxiety, or trauma." },
              { slug: "mental-health-interventions", icon: "ri-mental-health-line", name: "Mental Health Interventions", desc: "When the primary crisis is depression or trauma and ketamine is the self-medication." },
            ].map((rel) => (
              <Link key={rel.slug} href={`/${rel.slug}`} className="group flex flex-col rounded-3xl border border-[#EFEFEF] bg-[#F5F3E7]/50 p-7 shadow-sm transition hover:border-[#8FAC87]/40 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                  <i className={`${rel.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading mt-5 text-xl font-bold text-[#1A1A17]">{rel.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B4B4B]">{rel.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition group-hover:gap-2.5">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion title="Ketamine addiction questions, answered" faqs={KETAMINE_FAQS} />

      <BottomCta
        title="Wellness should not become dependence"
        italicWord="dependence"
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

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

const HERO_BG = `${SUPABASE_IMAGES}/mental_health_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/mental_health_family01.jpg`;

const MENTAL_HEALTH_FAQS: Faq[] = [
  {
    question: "How is a mental health intervention different from a substance abuse intervention?",
    answer:
      "A mental health intervention focuses less on consequences and more on connection. We help your loved one feel less alone in what they are facing and walk them toward the right level of care, whether that is outpatient therapy, partial hospitalisation, or a residential program. The tone is often gentler, but the structure and preparation are just as rigorous.",
  },
  {
    question: "My loved one has never been violent or in crisis — do they still need an intervention?",
    answer:
      "Yes. Many people with severe depression, anxiety, or other conditions suffer in silence for years. An intervention can be the catalyst that finally gets them into effective treatment before the situation becomes a true crisis (suicide attempt, hospitalization, or complete functional collapse).",
  },
  {
    question: "What if they refuse medication or therapy?",
    answer:
      "Refusal is common, especially when shame or anosognosia (lack of insight) is present. A well-prepared intervention with a certified interventionist and a clear, specific treatment recommendation dramatically increases the chance of acceptance. We also prepare families to hold boundaries consistently if the initial answer is no.",
  },
];

export default function MentalHealthInterventionsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Mental Health Interventions</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Mental health interventions —{" "}
                <span className="italic text-[#8FAC87]">compassion when shame keeps them silent</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                Depression, anxiety, PTSD, and bipolar disorder can be just as life-threatening as addiction — and far harder to confront because shame keeps everyone silent. We help families take that first hard step.
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

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">What We Do</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                What a professional mental health intervention{" "}
                <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                A mental health intervention focuses less on consequences and more on connection. We help your loved one feel less alone in what they are facing and walk them toward the right level of care — whether that is outpatient therapy, partial hospitalisation, or a residential program.
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                The tone is often gentler than a traditional substance intervention, but the preparation, structure, and follow-through are just as rigorous. We specialise in cases where depression, anxiety, bipolar, PTSD, or OCD have created a crisis that the family can no longer manage alone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "Gentle", label: "Connection-first approach", icon: "ri-heart-line" },
                { number: "Specialist", label: "Psychiatric placement network", icon: "ri-mental-health-line" },
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
        <Image src={FAMILY_IMG} alt="A family supporting a loved one through mental health crisis" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "We thought we were protecting his dignity by staying silent. The intervention gave us our son back."
          </p>
          <p className="mt-2 text-sm text-white/70">— Parents of a son with severe depression</p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-5">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Our Specialties</p>
            <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl">
              Conditions we intervene on
            </h2>
          </div>
          <p className="mb-12 max-w-3xl text-base leading-relaxed text-[#4B4B4B]">
            Mental health conditions become intervention-ready when symptoms have progressed to the point where the person can no longer recognise their need for help, when safety is at risk, or when the family has exhausted every other avenue. Each condition below has its own intervention framework — the language we use, the treatment programmes we recommend, and the boundaries we help families hold are calibrated specifically to that diagnosis.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/mental-health-interventions/ocd", icon: "ri-loop-left-line", name: "OCD Interventions", desc: "Severe obsessive-compulsive disorder that has taken over daily life and family functioning." },
              { href: "/mental-health-interventions/depression", icon: "ri-cloud-windy-line", name: "Depression Interventions", desc: "Clinical depression that has rendered a person unable to seek help on their own." },
              { href: "/mental-health-interventions/anxiety", icon: "ri-pulse-line", name: "Anxiety Interventions", desc: "Panic disorder, agoraphobia, social anxiety, or generalised anxiety that has become disabling." },
              { href: "/mental-health-interventions/bipolar", icon: "ri-arrow-up-down-line", name: "Bipolar Disorder Interventions", desc: "Manic and depressive episodes that are destroying relationships, finances, and careers." },
              { href: "/mental-health-interventions/ptsd", icon: "ri-shield-flash-line", name: "PTSD Interventions", desc: "Post-traumatic stress that has created hypervigilance, isolation, and self-medication." },
              { href: "/mental-health-interventions/self-medicating", icon: "ri-capsule-line", name: "Self-Medicating Interventions", desc: "Substance use as a coping mechanism for undiagnosed or untreated mental health conditions." },
            ].map((svc) => (
              <Link key={svc.href} href={svc.href} className="group flex flex-col rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7]/50 p-7 shadow-sm transition hover:border-[#8FAC87]/40 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                  <i className={`${svc.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading mt-5 text-xl font-bold text-[#1A1A17]">{svc.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B4B4B]">{svc.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition group-hover:gap-2.5">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion title="Mental health intervention questions, answered" faqs={MENTAL_HEALTH_FAQS} />

      <BottomCta
        title="Shame doesn't have to win"
        italicWord="win"
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

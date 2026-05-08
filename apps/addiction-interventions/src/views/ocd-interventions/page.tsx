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

const HERO_BG = `${SUPABASE_IMAGES}/ocd_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/ocd_family01.jpg`;

const OCD_FAQS: Faq[] = [
  {
    question: "How does an OCD intervention differ from other mental health interventions?",
    answer:
      "OCD interventions require a deep understanding of accommodation and enabling patterns within the family. Family members often participate in rituals or provide constant reassurance, which inadvertently maintains the disorder. We help the family stop accommodating while still offering compassionate support, and we place with programmes that offer evidence-based ERP (exposure and response prevention).",
  },
  {
    question: "My loved one is highly intelligent and functional — can OCD really be that disabling?",
    answer:
      "Yes. Severe OCD can completely take over a person's life even while they maintain a job or appear 'high-functioning' to the outside world. The internal suffering and the amount of time consumed by obsessions and compulsions is often invisible to others until the family intervention reveals the full extent.",
  },
];

export default function OCDInterventionsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">OCD Interventions</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                OCD interventions —{" "}
                <span className="italic text-[#8FAC87]">when rituals have taken over the family</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                Severe obsessive-compulsive disorder can take over a family's daily life. We help families gently confront avoidance, accommodation, and refusal of treatment — and connect loved ones with evidence-based OCD specialists.
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
                What a professional OCD intervention{" "}
                <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                OCD is one of the most treatable serious mental health conditions when matched with the right exposure-and-response-prevention (ERP) program. Our placements prioritise OCD-specialised clinicians over general mental health centres.
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                We help the family stop participating in rituals and providing reassurance, which is often the hardest (and most necessary) part of the intervention. The tone is compassionate but firm — we know how exhausting it is to live with severe OCD in the home.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "ERP", label: "Evidence-based focus", icon: "ri-loop-left-line" },
                { number: "Specialist", label: "OCD treatment network", icon: "ri-mental-health-line" },
                { number: "90+", label: "Day residential options", icon: "ri-home-smile-line" },
                { number: "Family", label: "Accommodation coaching", icon: "ri-group-line" },
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
        <Image src={FAMILY_IMG} alt="A family breaking free from OCD accommodation" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "We were all prisoners of the rituals. The intervention set us free."
          </p>
          <p className="mt-2 text-sm text-white/70">— Family of a young adult with severe OCD</p>
        </div>
      </section>

      <FaqAccordion title="OCD intervention questions, answered" faqs={OCD_FAQS} />

      <BottomCta
        title="OCD doesn't have to control the whole family"
        italicWord="family"
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

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

const HERO_BG = `${SUPABASE_IMAGES}/opioid_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/opioid_family01.jpg`;

const SIGNS = [
  "Doctor shopping or obtaining prescriptions from multiple sources",
  "Frequent requests for early refills or 'lost' prescriptions",
  "Mood swings, irritability, or drowsiness that follows prescription timing",
  "Financial problems despite steady income — money disappearing on pills",
  "Neglecting responsibilities while maintaining a convincing exterior",
  "Repeated failed attempts to stop or taper on their own",
  "Withdrawal symptoms when medication runs out (sweating, anxiety, nausea)",
  "Secretive behaviour around medication bottles or pharmacy visits",
];

const OPIOID_FAQS: Faq[] = [
  {
    question: "My loved one started with a prescription — does that change the approach?",
    answer:
      "Whether it began with a prescription or escalated to street opioids, opioid use disorder requires evidence-based treatment and a family that knows how to support recovery without enabling continued use. We help families understand the physiology of opioid dependence and the critical role of medication-assisted treatment in long-term recovery.",
  },
  {
    question: "Will they have to go cold turkey or can they use MAT?",
    answer:
      "We strongly advocate for medication-assisted treatment (buprenorphine/Suboxone, naltrexone/Vivitrol, or methadone) for opioid use disorder. 'Cold turkey' is dangerous and has extremely high relapse rates. We only place with programmes that integrate MAT with behavioural therapy.",
  },
  {
    question: "How do we handle ongoing prescriptions or pain management needs?",
    answer:
      "This is a common and important question. We work with interventionists and treatment programmes that coordinate with pain management specialists. Many people with legitimate chronic pain can transition to non-opioid pain strategies or carefully managed buprenorphine while addressing the addiction. We plan for this during the intervention preparation.",
  },
];

export default function OpioidInterventionPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Opioid Intervention</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Opioid interventions —{" "}
                <span className="italic text-[#8FAC87]">evidence-based care, not cold turkey</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                Whether it began with a prescription or escalated to street opioids, opioid use disorder requires evidence-based treatment and a family that knows how to support recovery without enabling continued use.
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
                Is it time for an{" "}
                <span className="italic text-[#507969]">opioid intervention?</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                Opioid dependence can develop quickly, even from legitimate prescriptions. The signs are often subtle at first — doctor shopping, early refill requests, mood changes tied to medication timing. These signs indicate the situation has progressed beyond what a family conversation can fix.
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
                What a professional opioid intervention{" "}
                <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                We help families understand the physiology of opioid dependence and the role of medication-assisted treatment in long-term recovery. Our placements are with programmes that integrate behavioural therapy, peer support, and MAT when clinically appropriate.
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                The intervention prepares the family to support recovery without enabling continued use. We coordinate with pain management specialists when legitimate chronic pain is part of the picture, and we plan for the transition to non-opioid pain strategies or carefully managed buprenorphine.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "MAT", label: "Integrated from day one", icon: "ri-medicine-bottle-line" },
                { number: "Pain", label: "Management coordination", icon: "ri-stethoscope-line" },
                { number: "90+", label: "Day minimum programmes", icon: "ri-home-smile-line" },
                { number: "24 / 7", label: "Withdrawal support", icon: "ri-alarm-warning-line" },
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
        <Image src={FAMILY_IMG} alt="A family supporting opioid recovery" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "We learned how to love him without enabling the pills. The intervention gave us the roadmap."
          </p>
          <p className="mt-2 text-sm text-white/70">— Wife of a husband now 2 years in recovery</p>
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
              { slug: "drug-abuse-interventions", icon: "ri-capsule-line", name: "Drug Abuse Interventions", desc: "When opioids are part of a broader pattern of substance use." },
              { slug: "dual-diagnosis-interventions", icon: "ri-link-m", name: "Dual Diagnosis Interventions", desc: "Opioid use often co-occurs with depression, anxiety, or chronic pain conditions." },
              { slug: "crisis-interventions", icon: "ri-alarm-warning-line", name: "Crisis Interventions", desc: "Active overdose risk or recent overdose requires immediate mobilisation." },
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

      <FaqAccordion title="Opioid intervention questions, answered" faqs={OPIOID_FAQS} />

      <BottomCta
        title="Evidence-based care saves lives"
        italicWord="lives"
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

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

const HERO_BG = `${SUPABASE_IMAGES}/meth_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/meth_family01.jpg`;

const SIGNS = [
  "Rapid, dramatic weight loss and gaunt appearance within weeks or months",
  "Severe dental problems ('meth mouth') — blackened, rotting, or missing teeth",
  "Paranoia, hallucinations, or picking at skin (formication)",
  "Aggressive or violent outbursts that are completely out of character",
  "Inability to sleep for days followed by crashing for 24+ hours",
  "Financial desperation — selling possessions, stealing, or constant borrowing",
  "Burnt spoons, glass pipes, or other meth paraphernalia in their space",
  "Complete withdrawal from family, work, and all previously enjoyed activities",
];

const METH_FAQS: Faq[] = [
  {
    question: "Why is a meth intervention different from other drug interventions?",
    answer:
      "Methamphetamine creates intense paranoia, psychosis, and aggression in many users. The intervention team must be prepared for potential volatility, and placement must be with programmes equipped for stimulant-induced psychosis and severe psychiatric symptoms. We never put family members at risk.",
  },
  {
    question: "Can someone in active meth psychosis be helped with an intervention?",
    answer:
      "Yes, but it requires a different approach. We often coordinate with mobile crisis teams or law enforcement wellness checks when psychosis is active. In some cases, an involuntary hold is the safest first step to get them stabilised before a traditional intervention can take place. We assess and advise honestly.",
  },
  {
    question: "How long does meth treatment take?",
    answer:
      "Meth recovery is one of the most challenging. The intense cravings and anhedonia (inability to feel pleasure) can last 6–18 months after stopping. Most successful programmes are 90+ days of residential followed by long-term outpatient support and sober living. We are honest with families about the timeline.",
  },
  {
    question: "What if they refuse to go to treatment?",
    answer:
      "With meth, refusal is common due to paranoia and the drug's grip on the brain. We prepare families for this possibility and help them hold boundaries consistently. Many people who initially refuse enter treatment within days or weeks once the family stops enabling and the consequences become real.",
  },
];

export default function MethInterventionPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Meth Intervention</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Meth interventions —{" "}
                <span className="italic text-[#8FAC87]">safety and speed when every hour matters</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                Methamphetamine creates volatile mood swings, paranoia, and rapid physical decline. Interventions for meth users require specific safety protocols and rapid placement into stabilisation care. We move fast and we move safely.
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

      {/* Signs */}
      <section id="signs" className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Recognise the Signs</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Is it time for a{" "}
                <span className="italic text-[#507969]">meth intervention?</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                Methamphetamine destroys the body and mind faster than almost any other substance. The physical and psychiatric deterioration can be shocking. These signs indicate the situation requires immediate professional intervention.
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

      {/* Why wait */}
      <section className="bg-[#3E5B50] py-24 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Breaking the Cycle</p>
            <h2 className="font-heading text-4xl font-bold md:text-5xl">
              The reasons families wait —{" "}
              <span className="italic text-[#8FAC87]">and why they shouldn't</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: "ri-user-star-line",
                myth: '"They were always so responsible — this can't be meth."',
                truth: "Meth use is exploding across all demographics. High-achieving professionals, parents, and students are all vulnerable. The stereotype no longer matches reality.",
              },
              {
                icon: "ri-time-line",
                myth: '"Maybe they'll just stop on their own."',
                truth: "Meth is one of the most addictive substances known. The dopamine surge rewires the brain's reward system so completely that voluntary cessation is extremely rare without structured treatment.",
              },
            ].map((item) => (
              <div key={item.myth} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#8FAC87]">
                  <i className={`text-2xl ${item.icon}`}></i>
                </div>
                <p className="mb-3 font-heading text-lg font-bold italic text-white/60">{item.myth}</p>
                <p className="text-sm leading-relaxed text-white/80">{item.truth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual — real families */}
      <section className="relative h-[420px] overflow-hidden">
        <Image src={FAMILY_IMG} alt="Parents standing together during a meth crisis" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "We didn't recognise our own son anymore. The intervention brought him back."
          </p>
          <p className="mt-2 text-sm text-white/70">— Mother of a son in long-term recovery</p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">What We Do</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                What a professional meth intervention{" "}
                <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                Meth addiction is rarely something families can address alone — the unpredictability and physical risk are too great. Our interventionists are experienced in de-escalation and have direct relationships with treatment programs equipped for meth recovery.
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                We move fast. Meth use can escalate from recreational to life-threatening in a matter of weeks. We pre-screen programmes that understand stimulant psychosis, severe dental and skin issues, and the intense cravings that make relapse so common. Your loved one leaves the intervention with a bed waiting — not a vague plan to 'look into treatment'.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "48h", label: "Average time to intervention", icon: "ri-time-line" },
                { number: "Specialist", label: "Psychosis-trained teams", icon: "ri-mental-health-line" },
                { number: "90+", label: "Day minimum programmes", icon: "ri-home-smile-line" },
                { number: "24 / 7", label: "Crisis mobilisation", icon: "ri-alarm-warning-line" },
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

      {/* Related */}
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
              { slug: "drug-abuse-interventions", icon: "ri-capsule-line", name: "Drug Abuse Interventions", desc: "When meth is part of a broader pattern of substance use, we address the full picture." },
              { slug: "crisis-interventions", icon: "ri-alarm-warning-line", name: "Crisis Interventions", desc: "When psychosis, violence, or immediate overdose risk is present, we mobilise the same day." },
              { slug: "dual-diagnosis-interventions", icon: "ri-link-m", name: "Dual Diagnosis Interventions", desc: "Meth use often co-occurs with severe mental health conditions. We specialise in integrated care." },
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

      <FaqAccordion title="Meth intervention questions, answered" faqs={METH_FAQS} />

      <BottomCta
        title="Act quickly — every day matters"
        italicWord="matters"
        body="Meth use escalates faster than almost any other substance. Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

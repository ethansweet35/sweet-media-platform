import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/services_hero01.jpg`;
const PROCESS_IMG = `${SUPABASE_IMAGES}/services_process01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SUBSTANCE_SERVICES = [
  {
    icon: "ri-goblet-line",
    title: "Alcohol Abuse Interventions",
    body: "Structured interventions for alcohol use disorder — from functioning drinkers to daily dependency. We lead with clinical clarity and same-day placement.",
    href: "/substance-abuse-interventions/alcohol",
  },
  {
    icon: "ri-capsule-line",
    title: "Drug Abuse Interventions",
    body: "Comprehensive intervention services for all substance use disorders. We work with every substance, every severity, and every family situation.",
    href: "/substance-abuse-interventions/drug",
  },
  {
    icon: "ri-medicine-bottle-line",
    title: "Opioid Interventions",
    body: "Fentanyl, heroin, prescription painkillers — opioid interventions require urgent, informed action. We move fast and know the treatment landscape.",
    href: "/substance-abuse-interventions/opioid",
  },
  {
    icon: "ri-flask-line",
    title: "Methamphetamine Interventions",
    body: "Meth use creates extreme psychiatric complexity. We specialise in interventions that account for the unique challenges of stimulant use disorder.",
    href: "/substance-abuse-interventions/meth",
  },
  {
    icon: "ri-leaf-line",
    title: "Cocaine & Crack Interventions",
    body: "Cocaine and crack addiction escalate quickly. We provide structured interventions and placement in programs with specific stimulant treatment expertise.",
    href: "/substance-abuse-interventions/cocaine",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Heroin Interventions",
    body: "Heroin addiction carries fatal risk every day. Our interventions prioritise speed, safety, and medically supervised withdrawal options from day one.",
    href: "/substance-abuse-interventions/heroin",
  },
];

const MENTAL_HEALTH_SERVICES = [
  {
    icon: "ri-mental-health-line",
    title: "Mental Health Interventions",
    body: "When mental illness prevents someone from getting help they clearly need, we bridge the gap — with clinical expertise and compassionate guidance.",
    href: "/mental-health-interventions",
  },
  {
    icon: "ri-link-m",
    title: "Dual Diagnosis Interventions",
    body: "Addiction and mental health almost always co-occur. We get your loved one into integrated care that treats both simultaneously — not one at a time.",
    href: "/dual-diagnosis-interventions",
  },
  {
    icon: "ri-cloud-windy-line",
    title: "Depression Interventions",
    body: "Depression that goes untreated often leads to substance use, self-harm, or worse. We help families intervene before the situation becomes a crisis.",
    href: "/mental-health-interventions/depression",
  },
  {
    icon: "ri-psychotherapy-line",
    title: "Anxiety Interventions",
    body: "Severe anxiety can be just as disabling as addiction. We help families navigate the conversation and connect their loved one with the right level of care.",
    href: "/mental-health-interventions/anxiety",
  },
];

const SPECIALISED_SERVICES = [
  {
    icon: "ri-vip-crown-line",
    title: "Executive Interventions",
    body: "Discreet, career-protective interventions for high-functioning professionals. Full confidentiality and executive-level treatment placement.",
    href: "/interventions-for-executives",
  },
  {
    icon: "ri-user-smile-line",
    title: "Interventions for Teens",
    body: "Adolescent-specific interventions with age-appropriate approaches, school programming, and adolescent treatment programs.",
    href: "/interventions-for-teens",
  },
  {
    icon: "ri-group-line",
    title: "Family Interventions",
    body: "Addiction is a family disease. We address the whole family system — stopping enabling, building boundaries, and healing everyone, not just one person.",
    href: "/family-interventions",
  },
  {
    icon: "ri-alarm-warning-line",
    title: "Crisis Interventions",
    body: "Same-day mobilisation for overdose risk, suicidal ideation, acute psychosis, or violent behaviour. We handle the situations most providers won't.",
    href: "/crisis-interventions",
  },
];

const MODELS = [
  {
    icon: "ri-hand-heart-line",
    title: "ARISE® Model",
    body: "Invitational, non-confrontational. The loved one is engaged from the first call. 83% enter treatment within 1–3 sessions.",
    href: "/intervention-types/arise",
  },
  {
    icon: "ri-shield-flash-line",
    title: "Johnson Model",
    body: "Structured confrontation for situations where softer approaches have failed. Rigorously prepared, clinically supervised, highly effective when appropriate.",
    href: "/intervention-types/johnson-model",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="Overview of intervention services" fill className="object-cover object-top" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/50" />
        <div className={`relative ${CONTAINER} py-28 lg:py-36`}>
          <div className="max-w-2xl">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Services</p>
            <h1 className="font-heading mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Every situation has the <span className="italic text-[#8FAC87]">right approach</span>
            </h1>
            <p className="mb-10 text-lg leading-relaxed text-white/80">
              We offer the full spectrum of intervention services — substance use, mental health, crisis, specialised populations, and every combination. No template solutions. Every plan is built for one family.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
              </a>
              <Link href="/admissions" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10">
                How to get started <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Substance services */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-12">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Substance Use</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Substance abuse <span className="italic text-[#507969]">intervention services</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUBSTANCE_SERVICES.map((s) => (
              <Link key={s.title} href={s.href} className="group rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF] transition hover:shadow-md hover:ring-[#8FAC87]/40">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3E5B50] text-white transition group-hover:bg-[#507969]">
                  <i className={`${s.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading mb-3 text-lg font-bold text-[#1A1A17]">{s.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-[#4B4B4B]">{s.body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] underline-offset-4 group-hover:underline">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mental health services — cream */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mb-12">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Mental Health</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Mental health <span className="italic text-[#507969]">intervention services</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MENTAL_HEALTH_SERVICES.map((s) => (
              <Link key={s.title} href={s.href} className="group rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF] transition hover:shadow-md hover:ring-[#8FAC87]/40">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3E5B50] text-white transition group-hover:bg-[#507969]">
                  <i className={`${s.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading mb-3 text-lg font-bold text-[#1A1A17]">{s.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-[#4B4B4B]">{s.body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] underline-offset-4 group-hover:underline">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Intervention models — dark */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mb-12">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Intervention Models</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              We choose the <span className="italic text-[#8FAC87]">right model</span> for your situation
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/70">
              Not every situation calls for the same approach. We match the model to the person — their personality, history, and what has already been tried.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {MODELS.map((m) => (
              <Link key={m.title} href={m.href} className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#8FAC87]">
                  <i className={`${m.icon} text-lg`}></i>
                </div>
                <h3 className="font-heading mb-3 text-xl font-bold text-white">{m.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/70">{m.body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8FAC87]">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Specialised services */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-12">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Specialised Populations</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Interventions designed for <span className="italic text-[#507969]">specific needs</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALISED_SERVICES.map((s) => (
              <Link key={s.title} href={s.href} className="group rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF] transition hover:shadow-md hover:ring-[#8FAC87]/40">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3E5B50] text-white transition group-hover:bg-[#507969]">
                  <i className={`${s.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading mb-3 text-lg font-bold text-[#1A1A17]">{s.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-[#4B4B4B]">{s.body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] underline-offset-4 group-hover:underline">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Image quote */}
      <section className="relative h-[420px] overflow-hidden">
        <Image src={PROCESS_IMG} alt="Intervention planning session with families" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "They didn't just know interventions — they knew exactly which one fit our situation. That's the difference."
          </p>
          <p className="mt-2 text-sm text-white/70">— Family of two adult sons, both now in recovery</p>
        </div>
      </section>

      <BottomCta
        title="Not sure which service fits your situation?"
        italicWord="fits"
        body="Call us and tell us what's happening. We will recommend the right approach honestly — even if it's not an intervention."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

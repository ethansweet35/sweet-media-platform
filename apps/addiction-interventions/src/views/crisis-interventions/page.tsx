import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/crisis_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/crisis_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Your loved one has recently overdosed, come close to overdosing, or been hospitalised",
  "Active suicidal ideation — with or without a stated plan",
  "Acute psychosis: paranoia, hallucinations, or completely disconnected from reality",
  "Violent or threatening behaviour toward themselves or others",
  "Complete loss of housing, employment, or physical safety within the last 72 hours",
  "They have stopped responding to calls, texts, or home visits — location is unknown",
  "Medical staff or law enforcement have contacted you about the severity of their condition",
  "Standard intervention has already been attempted and failed to create action",
];

const MYTHS = [
  {
    icon: "ri-alarm-warning-line",
    myth: `"We should call 911 — that's the fastest option."`,
    truth:
      "911 can stabilise an acute medical emergency, but it rarely leads to sustained treatment. A crisis interventionist coordinates with emergency services while also lining up psychiatric evaluation and immediate residential placement — so there is somewhere to go after the ER.",
  },
  {
    icon: "ri-time-line",
    myth: `"It's the middle of the night — we'll call in the morning."`,
    truth:
      "We are available 24 hours a day, 7 days a week. Crisis situations rarely respect business hours, and the hours between a crisis and a call for help are often the most dangerous. Call now.",
  },
  {
    icon: "ri-lock-line",
    myth: `"We can't force them — they have rights."`,
    truth:
      "Involuntary hold processes (5150, Baker Act, Marchman Act) exist for a reason. When there is imminent risk, there are legal pathways to get someone into care without their consent. We know them, we have used them, and we can guide your family through the process.",
  },
  {
    icon: "ri-shield-flash-line",
    myth: `"I don't want to escalate the situation."`,
    truth:
      "The situation is already escalated — that's why you're reading this. Not acting is the only choice that guarantees the crisis continues. We have protocols to de-escalate while still moving toward safety and treatment.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Immediate call",
    body: "Call us now — day or night. A certified crisis interventionist answers directly. We assess the risk level in real time and begin coordinating the response immediately.",
  },
  {
    icon: "ri-map-pin-2-line",
    title: "On-site coordination",
    body: "Where needed, we mobilise same-day. We coordinate with emergency medical services, law enforcement wellness checks, or mobile crisis teams — whoever is most appropriate to the situation.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Safety planning",
    body: "We establish a safety protocol for the family — what to say, what to do if the situation escalates, and how to stay safe while the intervention is being executed.",
  },
  {
    icon: "ri-hospital-line",
    title: "Emergency placement",
    body: "We have emergency beds and crisis stabilisation partners on standby. Placement is arranged in parallel with the intervention so there is no gap between consent and admission.",
  },
  {
    icon: "ri-heart-line",
    title: "Family stabilisation",
    body: "After your loved one is placed, we debrief with the family, address trauma from the crisis, and connect you with appropriate family support resources.",
  },
];

const CRISIS_FAQS: Faq[] = [
  {
    question: "What counts as a crisis intervention?",
    answer: "When immediate action is required — overdose risk, suicidal ideation, dangerous behaviour, acute psychosis, or recent overdose — we mobilise the same day. Our crisis team has handled the situations most providers refuse to touch.",
  },
  {
    question: "Do you work with law enforcement or mobile crisis teams?",
    answer: "Yes. In high-risk situations we coordinate with mobile crisis, law enforcement wellness checks, or involuntary hold processes when clinically appropriate and legally supported. Safety comes first — for the family and for your loved one.",
  },
  {
    question: "What is a 5150 / Baker Act / Marchman Act?",
    answer: "These are state-specific involuntary psychiatric hold laws that allow emergency detention of a person who is a danger to themselves or others. We are familiar with the laws in all 50 states and can help families navigate the process if voluntary treatment is refused and the risk is imminent.",
  },
  {
    question: "My loved one is violent — is it safe to do an intervention?",
    answer: "We have extensive experience with volatile situations. We never place family members in harm's way. In cases where violence is likely, we adjust the intervention format and coordinates with the appropriate professionals — sometimes law enforcement, sometimes mobile crisis, sometimes a combination.",
  },
  {
    question: "What if they are using fentanyl and we are afraid of a fatal overdose?",
    answer: "This is one of the most urgent reasons to call. Fentanyl overdoses happen fast and without warning. We work with harm reduction, carry Narcan education, and prioritise same-day treatment placement for active fentanyl users. Every hour matters.",
  },
  {
    question: "Can you help if we don't know where they are?",
    answer: "Yes. We have experience helping families locate missing loved ones and have worked with private investigators, shelters, and law enforcement missing persons units. If your loved one is on the street or has gone dark, call us — there are options.",
  },
];

export default function CrisisInterventionsPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Crisis Interventions</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Crisis interventions — <span className="italic text-[#8FAC87]">when every minute matters</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                When there is immediate risk — overdose, suicidal ideation, psychosis, violence — we mobilise the same day. Our crisis team handles the situations most providers refuse to touch.
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                {["Same-day mobilisation", "24/7 availability", "Emergency placement on standby"].map((t) => (
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

      {/* Warning signs */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Is This a Crisis?</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Signs this requires <span className="italic text-[#507969]">immediate action</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                If any one of these is true, do not wait for a more convenient time. Call us now — this is exactly what we are here for.
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
                { number: "Same Day", label: "Mobilisation available", icon: "ri-alarm-warning-line" },
                { number: "Specialist", label: "High-risk trained teams", icon: "ri-shield-flash-line" },
                { number: "Private", label: "Discreet transport options", icon: "ri-lock-line" },
                { number: "24 / 7", label: "Always available", icon: "ri-time-line" },
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

      {/* Myths — dark sage */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Why Families Freeze</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Crisis myths that cost <span className="italic text-[#8FAC87]">precious time</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {MYTHS.map((m) => (
              <div key={m.myth} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#8FAC87]">
                  <i className={`${m.icon} text-lg`}></i>
                </div>
                <p className="mb-3 text-sm font-semibold italic text-white/60">{m.myth}</p>
                <p className="text-sm leading-relaxed text-white/85">{m.truth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image quote banner */}
      <section className="relative h-[420px] overflow-hidden">
        <Image src={FAMILY_IMG} alt="A family finding immediate crisis help" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "We thought we had more time. The crisis team was at our door within hours."
          </p>
          <p className="mt-2 text-sm text-white/70">— Family of a son who survived an overdose</p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">How We Respond</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              What happens when you <span className="italic text-[#507969]">call us</span>
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
                <p className="text-sm leading-relaxed text-[#4B4B4B]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion title="Crisis intervention questions, answered" faqs={CRISIS_FAQS} />

      <BottomCta
        title="This is an emergency — call now"
        italicWord="now"
        body="We are available 24 hours a day, 7 days a week. Your first call is free and confidential."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

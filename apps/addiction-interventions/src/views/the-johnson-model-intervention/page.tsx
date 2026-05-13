import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/johnson_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/johnson_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const WHEN_RIGHT = [
  "Multiple previous attempts to have 'the conversation' have failed without clinical guidance",
  "The loved one has zero insight — they genuinely cannot see the impact of their use",
  "There is immediate risk and a softer approach has been exhausted or is not appropriate",
  "The family is fully united and ready to enforce consequences if treatment is refused",
  "The loved one has refused voluntarily arranged treatment on multiple occasions",
  "Consequences have been offered before but never held — and this time the family means it",
  "A structured united-front confrontation matches the loved one's psychology better than invitation",
  "Other interventionists or attempts have failed and a different model is needed",
];

const MYTHS = [
  {
    icon: "ri-tv-line",
    myth: `"The Johnson Model is just what you see on 'Intervention' on TV."`,
    truth:
      "The televised version is dramatised for entertainment. A properly executed Johnson Model intervention is carefully structured, clinically supervised, and rehearsed thoroughly. The shock value is minimised — the clarity and consequences are maximised.",
  },
  {
    icon: "ri-heart-2-line",
    myth: `"It will permanently damage the relationship."`,
    truth:
      "Done with preparation and love, the Johnson Model often repairs relationships. The loved one hears how deeply they are cared for — delivered by the people who matter most, with specificity and honesty that casual conversations never achieve.",
  },
  {
    icon: "ri-shield-flash-line",
    myth: `"Confrontation never works — it just makes them dig in."`,
    truth:
      "Unstructured confrontation rarely works. A professionally facilitated Johnson Model intervention is different — the unified message, the prepared impact statements, and the immediate treatment pathway remove the usual escape routes.",
  },
  {
    icon: "ri-question-line",
    myth: `"We don't know what to say — we'll sound scripted."`,
    truth:
      "The coaching process ensures every participant speaks in their own voice with their own words. We don't hand anyone a script — we help them say clearly what they have always felt but never been able to express.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Assessment call",
    body: "We learn the full history — what has been tried, what the loved one responds to, whether consequences are real, and whether the family has the resolve to hold them. We tell you honestly if the Johnson Model is the right fit.",
  },
  {
    icon: "ri-group-line",
    title: "Participant selection",
    body: "We identify the strongest participants — those with the most credibility and emotional weight — and exclude anyone whose presence might derail the process. Quality over quantity.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Impact statement coaching",
    body: "Each participant prepares a personal impact statement — specific events, honest feelings, clear consequences. We review every statement and coach the delivery until it is powerful and controlled.",
  },
  {
    icon: "ri-heart-line",
    title: "The intervention",
    body: "We facilitate the structured confrontation. The loved one hears the unified message, the love, and the non-negotiable expectation. Treatment is offered on the spot with admission arranged.",
  },
  {
    icon: "ri-hospital-line",
    title: "Same-day placement",
    body: "Treatment is pre-booked. If they agree, there is no time to change their mind — transport and admission happen within hours. If they refuse, the family holds their consequences as rehearsed.",
  },
];

const JOHNSON_FAQS: Faq[] = [
  {
    question: "What is the Johnson Model?",
    answer: "The Johnson Model is a structured intervention in which a prepared team of loved ones presents factual evidence of addiction's impact and offers immediate treatment. It is typically a surprise or semi-surprise confrontation, facilitated by a certified interventionist, designed for situations where the person has zero insight or has refused all softer approaches.",
  },
  {
    question: "Is the Johnson Model still effective today?",
    answer: "Yes — when done correctly. Despite the TV stereotype, a well-executed Johnson Model intervention is highly effective for the right situations. The key is thorough preparation, a united family, and a certified interventionist managing the room.",
  },
  {
    question: "How is it different from the ARISE® model?",
    answer: "ARISE® is invitational — the loved one knows a family meeting is happening and is part of the conversation from the start. The Johnson Model is a structured confrontation, often a surprise. We recommend based on the person's personality, history, and what has already been tried. Neither model is universally superior — fit matters.",
  },
  {
    question: "What if they walk out?",
    answer: "This is exactly what we prepare for. Every participant rehearses the response to a walkout — staying calm, restating consequences without escalating, and allowing the person to leave without chasing them. The consequences the family has prepared are then put into effect.",
  },
  {
    question: "Can the family really hold consequences?",
    answer: "We don't let families enter the intervention without being genuinely ready to hold their consequences. If someone is not ready, we work through that in coaching. A consequence that won't be held is worse than no consequence — so we are honest with every participant.",
  },
  {
    question: "Do you help with treatment placement?",
    answer: "Yes — this is built into every intervention. We pre-screen and pre-book treatment options before the intervention day so the moment they agree, admission can happen within hours. We never let a 'yes' go to waste.",
  },
];

export default function JohnsonModelInterventionPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"The Johnson Model Intervention"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Johnson Model interventions — <span className="italic text-[#8FAC87]">structured confrontation when it fits</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"The Johnson Model is a carefully orchestrated united-front confrontation — prepared, clinical, and delivered with love. When softer approaches have failed and the stakes are high, this is often the model that finally breaks through."}</AutoLinkedText>
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                {["United-front approach", "Same-day treatment placement", "Consequence coaching included"].map((t) => (
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

      {/* When it's right */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Is This the Right Model?"}</AutoLinkedText></p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                When the Johnson Model is the <span className="italic text-[#507969]">right choice</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"We do not apply the Johnson Model to every situation — we recommend the right tool for the right circumstance. If several of these are true, this approach may be exactly what is needed."}</AutoLinkedText>
              </p>
              <ul className="grid gap-3">
                {WHEN_RIGHT.map((item) => (
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
                { number: "High", label: "Impact when appropriate", icon: "ri-shield-flash-line" },
                { number: "Firm", label: "Clear consequence planning", icon: "ri-file-list-3-line" },
                { number: "90+", label: "Day treatment options", icon: "ri-home-smile-line" },
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
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Clearing the Record</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              What the TV shows <span className="italic text-[#8FAC87]">get wrong</span>
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
        <Image src={FAMILY_IMG} alt="A family using the Johnson Model intervention" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"We had tried everything gentle. The Johnson Model finally broke through the denial.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Family of a son who had refused treatment 4 times"}</AutoLinkedText></p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">How It Works</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              How we execute the Johnson Model <span className="italic text-[#507969]">the right way</span>
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

      <FaqAccordion title="Johnson Model questions, answered" faqs={JOHNSON_FAQS} />

      <BottomCta
        title="Sometimes love must be firm"
        italicWord="firm"
        body="Your first call is free, confidential, and judgment-free. We'll tell you honestly which model fits your situation."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

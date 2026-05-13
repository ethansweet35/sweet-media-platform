import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/arise_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/arise_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Your loved one shuts down or becomes hostile when addiction is brought up",
  "Previous attempts to talk have ended in arguments, denial, or tears with no result",
  "The family is fractured — members disagree about how serious the problem is",
  "Your loved one still has insight on good days but refuses to acknowledge the full picture",
  "Past treatment attempts ended in early departure or immediate relapse",
  "The family has been quietly enabling — covering bills, making excuses, absorbing consequences",
  "You want to preserve the relationship while still creating real accountability",
  "A surprise confrontation feels too risky given your loved one's temperament or history",
];

const MYTHS = [
  {
    icon: "ri-question-line",
    myth: `"ARISE® is too soft — they need a hard wake-up call."`,
    truth:
      "ARISE® isn't passive. It is graduated and persistent. If gentle engagement doesn't move the person, we escalate — with the full family system aligned. Research shows 83% of loved ones enter treatment within 1–3 sessions.",
  },
  {
    icon: "ri-group-line",
    myth: `"I don't want to involve the whole family — it'll blow up."`,
    truth:
      "ARISE® works even with one or two prepared supporters. We coach each participant individually, manage conflict before it surfaces, and create a unified message that doesn't give the addicted person an opening to divide the room.",
  },
  {
    icon: "ri-time-line",
    myth: `"This will take too long — we need action now."`,
    truth:
      "ARISE® interventions often move faster than people expect. The first meeting can happen within 48–72 hours of your call. The graduated approach means treatment can begin within the first week for motivated families.",
  },
  {
    icon: "ri-heart-2-line",
    myth: `"We tried talking to them lovingly. It didn't work."`,
    truth:
      "An informal conversation and a structured ARISE® intervention are completely different things. The clinical framing, the prepared impact statements, and the immediate treatment pathway change the dynamic entirely.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Confidential first call",
    body: "You speak directly with a certified ARISE® interventionist — not a call centre. We learn the full picture and tell you honestly whether ARISE® is the right fit.",
  },
  {
    icon: "ri-group-line",
    title: "Network assembly",
    body: "We help you identify and prepare the Love Network — family, close friends, sometimes colleagues — who will participate. We coach each person privately before anyone sits together.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "First meeting",
    body: "The loved one is invited — not surprised. They hear from people they respect and love, with clinical guidance present to keep the conversation productive. Treatment is offered on the spot.",
  },
  {
    icon: "ri-refresh-line",
    title: "Graduated engagement",
    body: "If the first meeting doesn't result in treatment acceptance, we reconvene with higher stakes and more network members. Each session escalates intentionally and compassionately.",
  },
  {
    icon: "ri-hospital-line",
    title: "Treatment placement",
    body: "We have vetted treatment partners ready. Placement is arranged in advance so there is no gap between agreement and admission — often same-day or next morning.",
  },
];

const ARISE_FAQS: Faq[] = [
  {
    question: "What is the ARISE® model?",
    answer: "The ARISE® model is invitational rather than confrontational. We engage your loved one and the support network from the very first call — leading to higher engagement and longer-lasting recovery. Roughly 83% of people invited to an ARISE® intervention enter treatment within 1–3 sessions.",
  },
  {
    question: "Is ARISE® less effective than the Johnson Model?",
    answer: "No — research shows ARISE® often produces better long-term outcomes because it reduces resistance and involves the family in parallel healing from the beginning. We will recommend the model that best fits your loved one's personality and the family dynamic.",
  },
  {
    question: "How many sessions does an ARISE® intervention take?",
    answer: "Most ARISE® interventions resolve in one to three sessions. The first session alone achieves treatment entry in the majority of cases. If more sessions are needed, we reconvene with a larger or more prepared Love Network and increased stakes.",
  },
  {
    question: "What happens if my loved one agrees to go — and then changes their mind?",
    answer: "We anticipate this. Part of our preparation is coaching the network on what to do if there is waffling, a delay request, or a retraction. We have same-day transport relationships to minimise the window between agreement and admission.",
  },
  {
    question: "Does my loved one know an intervention is planned?",
    answer: "In ARISE®, yes — they are invited to a family meeting. The element of surprise is removed deliberately. This reduces defensiveness and often means the person comes in with some openness rather than full resistance. It is a key reason outcomes are better.",
  },
  {
    question: "Can ARISE® work if the family is in conflict?",
    answer: "Yes. We coach family members individually before bringing them together and mediate any friction. A unified message doesn't require a perfect family — it requires prepared participants and clinical guidance.",
  },
];

export default function AriseInterventionPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">ARISE® Intervention</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                ARISE® interventions — <span className="italic text-[#8FAC87]">invitational, not confrontational</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"The ARISE® model engages your loved one and their full support network from the very first call. No surprise ambush — just a structured, compassionate invitation that leads to real recovery."}</AutoLinkedText>
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                {["83% enter treatment in 1–3 sessions", "Family heals in parallel", "No surprise confrontation"].map((t) => (
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
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Is ARISE® Right for You?"}</AutoLinkedText></p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Signs the ARISE® model is the <span className="italic text-[#507969]">right fit</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"ARISE® is especially powerful when the loved one has some insight, the family wants to preserve the relationship, or a surprise confrontation feels too risky. If several of these are true, call us today."}</AutoLinkedText>
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
                { number: "83%", label: "Enter treatment in 1–3 sessions", icon: "ri-award-line" },
                { number: "Family", label: "Parallel healing built in", icon: "ri-group-line" },
                { number: "90+", label: "Day support options available", icon: "ri-home-smile-line" },
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

      {/* Myths / truths — dark sage */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Common Concerns</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Why families <span className="italic text-[#8FAC87]">hesitate</span> — and why they shouldn't
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
        <Image src={FAMILY_IMG} alt="A family using the ARISE model" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"Because we were invited in from the beginning, my son never felt ambushed. He chose treatment.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Mother of a son now 2 years sober"}</AutoLinkedText></p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              How an ARISE® intervention <span className="italic text-[#507969]">unfolds</span>
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

      <FaqAccordion title="ARISE® intervention questions, answered" faqs={ARISE_FAQS} />

      <BottomCta
        title="Compassion can still be powerful"
        italicWord="powerful"
        body="Your first call is free, confidential, and judgment-free. We'll tell you honestly whether ARISE® is the right model."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

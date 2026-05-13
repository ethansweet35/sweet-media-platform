import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/family_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/family_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Family members walk on eggshells to avoid triggering the person who is using",
  "You have been covering up consequences — paying bills, making excuses, lying to protect them",
  "Different family members have completely different ideas of how serious the problem is",
  "Someone in the family is in denial and actively resisting the idea of an intervention",
  "Previous conversations about the problem have ended in explosive arguments or total shutdown",
  "Children in the home are being affected — emotionally, academically, or by witnessing chaos",
  "You feel responsible for their addiction and don't know how to stop enabling without abandoning them",
  "The family system itself has broken down — trust, communication, and basic functioning have eroded",
];

const MYTHS = [
  {
    icon: "ri-user-heart-line",
    myth: `"It's their choice — I don't want to control them."`,
    truth:
      "Intervening is not controlling. It is refusing to participate in a system that is killing someone you love. Addiction hijacks choice — a well-structured intervention creates a moment where real choice becomes possible again.",
  },
  {
    icon: "ri-group-line",
    myth: `"Not everyone in the family agrees — we can't do this together."`,
    truth:
      "We have done interventions with families that were deeply divided going in. Our job is to align the key participants around one goal before the day of the intervention. You don't need unanimous family agreement — you need a prepared, united front.",
  },
  {
    icon: "ri-heart-2-line",
    myth: `"I'm scared this will destroy the relationship."`,
    truth:
      "Our interventions are built on love, not ultimatums. The structure we provide — impact statements, compassionate language, immediate treatment availability — is designed to preserve the relationship and redirect it toward recovery.",
  },
  {
    icon: "ri-time-line",
    myth: `"We'll wait until they hit rock bottom."`,
    truth:
      "Rock bottom keeps moving. Families who wait often find that the bottom is a hospital, a funeral, or permanent cognitive damage. The research is clear: early intervention produces dramatically better outcomes.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Family consultation",
    body: "We speak confidentially with each participating family member to understand the full picture — dynamics, history, current risks, and what has been tried before.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Intervention plan",
    body: "We design the intervention format, select the right model (ARISE® or Johnson), identify enabling patterns that must be addressed, and pre-screen appropriate treatment centres.",
  },
  {
    icon: "ri-group-line",
    title: "Family coaching",
    body: "Each participant is coached individually — what to say, how to hold boundaries, what to do if the loved one becomes aggressive or tries to leave. No one enters unprepared.",
  },
  {
    icon: "ri-heart-line",
    title: "The intervention",
    body: "We facilitate in person. Every participant speaks their truth with love and clarity. The family system shifts in real time — and treatment is offered immediately.",
  },
  {
    icon: "ri-hospital-line",
    title: "Placement and follow-up",
    body: "Treatment is arranged in advance. After admission, we check in with the family to ensure everyone is continuing to heal — not just the person who went to treatment.",
  },
];

const FAMILY_FAQS: Faq[] = [
  {
    question: "What makes a family intervention different from just talking to them?",
    answer: "An unstructured family conversation gives the person with addiction an opening to deny, deflect, or divide family members against each other. A structured intervention with a certified interventionist changes the dynamic — there is a unified message, clinical framing, and immediate treatment placement ready to go.",
  },
  {
    question: "Do all family members have to participate?",
    answer: "Not necessarily all, but the more aligned the family is, the more powerful the intervention. We work with the key decision-makers and closest relationships. Even one or two well-prepared family members can create meaningful change when coached properly.",
  },
  {
    question: "What if some family members are in denial too?",
    answer: "This is extremely common. We work with family members in denial before the intervention — not by confronting them, but by helping them understand enabling versus supporting. Often, the most resistant family member becomes the most powerful voice once they understand what is actually happening.",
  },
  {
    question: "How do you handle family members who might blow up or break down during the intervention?",
    answer: "We prepare for this. Our coaching sessions address each person's emotional triggers and likely reactions. We have protocols for managing high-emotion moments — keeping the conversation productive without allowing it to devolve into chaos.",
  },
  {
    question: "Will the intervention hurt the relationship?",
    answer: "The relationship is already being damaged by the addiction — every day. Most families report that the intervention itself was the beginning of healing, not the breaking point. When done right, it opens a door to honesty that has been shut for years.",
  },
  {
    question: "What happens if they refuse and walk out?",
    answer: "We prepare families for this possibility. There are clear, compassionate consequences ready — and we coach the family on how to hold those boundaries calmly and consistently. Often the person who walks out calls back within 24–48 hours.",
  },
];

export default function FamilyInterventionsPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Family Interventions"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Family interventions — <span className="italic text-[#8FAC87]">healing the whole system, not just one person</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"Addiction is a family disease. The most effective interventions reset the entire family system — stopping enabling, restoring trust, and getting your loved one into treatment with the family behind them."}</AutoLinkedText>
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                {["Whole family system addressed", "Enabling patterns broken", "Same-day placement ready"].map((t) => (
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
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">When to Call</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Signs your family needs a <span className="italic text-[#507969]">professional intervention</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"Most families wait years longer than they should. If several of these are true, the cost of waiting is higher than the cost of acting."}</AutoLinkedText>
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
                { number: "Whole", label: "Family system focus", icon: "ri-group-line" },
                { number: "Boundary", label: "Coaching for every member", icon: "ri-shield-check-line" },
                { number: "90+", label: "Day family support options", icon: "ri-home-smile-line" },
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
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Why Families Wait</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              The fears that keep families <span className="italic text-[#8FAC87]">stuck</span>
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
        <Image src={FAMILY_IMG} alt="A family healing together after an intervention" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"We finally stopped enabling and started supporting. The intervention changed all of us.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Entire family now in recovery together"}</AutoLinkedText></p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              How a family intervention <span className="italic text-[#507969]">comes together</span>
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

      <FaqAccordion title="Family intervention questions, answered" faqs={FAMILY_FAQS} />

      <BottomCta
        title="The whole family deserves to heal"
        italicWord="heal"
        body="Your first call is free, confidential, and judgment-free. We've helped thousands of families find their way through."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

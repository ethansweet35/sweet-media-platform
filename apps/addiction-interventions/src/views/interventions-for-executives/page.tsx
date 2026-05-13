import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/executives_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/executives_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Using alcohol or substances to manage stress, decompress, or function at a high level",
  "Using has escalated to the point where performance is being affected — even subtly",
  "They are the last person anyone would expect — which is why no one has said anything",
  "Close colleagues, family, or board members have noticed but don't know how to raise it",
  "Previous personal attempts to cut back or stop have failed without external structure",
  "Mental health is deteriorating: anxiety, depression, irritability, or isolation worsening",
  "A DUI, medical event, or near-miss at work has occurred but been successfully covered",
  "The person is in denial — or knows there is a problem but cannot stop without help",
];

const MYTHS = [
  {
    icon: "ri-briefcase-line",
    myth: `"They're too important to disappear for treatment."`,
    truth:
      "We work with executive-friendly programs that accommodate private rooms, limited business communication, and flexible scheduling. A controlled leave of absence is manageable. An untreated addiction destroying their career is not.",
  },
  {
    icon: "ri-lock-line",
    myth: `"If anyone finds out, it will ruin them."`,
    truth:
      "Confidentiality is the foundation of every executive intervention we run. We do not involve HR or legal unless the executive specifically requests it. The intervention team, the treatment facility, and everything in between operates under strict discretion.",
  },
  {
    icon: "ri-user-star-line",
    myth: `"High performers can handle it — it's not really an addiction."`,
    truth:
      "High-functioning addiction is one of the most dangerous forms — because the performance masks the severity until the bottom falls out suddenly. We have worked with surgeons who operated impaired, attorneys who missed filings, and executives who made catastrophic decisions under the influence.",
  },
  {
    icon: "ri-heart-2-line",
    myth: `"We should handle this internally — not bring in outsiders."`,
    truth:
      "Interventions managed by family or colleagues alone almost never succeed at the executive level. The power dynamics, the stakes, and the sophistication of denial require a certified professional who has done this at the highest levels.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Discreet intake call",
    body: "We speak only with the requesting party — spouse, family, or a trusted colleague. Nothing goes on record until you decide to proceed. We assess the situation and advise whether an intervention is the right next step.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Confidential planning",
    body: "We identify the right participants — typically limited to those with the most emotional and professional credibility. HR, legal, and board are excluded unless the executive specifically requests involvement.",
  },
  {
    icon: "ri-group-line",
    title: "Participant coaching",
    body: "Each person is coached individually on what to say, how to hold boundaries, and how to manage the professional relationship through the process. Every word matters at this level.",
  },
  {
    icon: "ri-heart-line",
    title: "The intervention",
    body: "We facilitate with the same care and structure we bring to every intervention — adapted for the executive context. The conversation is direct, compassionate, and professionally framed.",
  },
  {
    icon: "ri-hospital-line",
    title: "Executive-level placement",
    body: "We have relationships with the top executive treatment programs in the country — private facilities that understand the requirements of high-profile clients. Admission can happen within 24 hours of agreement.",
  },
];

const EXEC_FAQS: Faq[] = [
  {
    question: "How do you protect confidentiality for high-profile clients?",
    answer: "Confidentiality, scheduling, and continuity of work are non-negotiable in executive interventions. We coordinate with HR or legal counsel only as required and only with the executive's explicit consent. We recommend treatment programs equipped for high-profile clients. Discretion is built into every step of the process.",
  },
  {
    question: "Can they continue working while in treatment?",
    answer: "In many cases, yes. We have relationships with executive-friendly programs that offer flexible scheduling, private rooms, and the ability to maintain critical business responsibilities while receiving intensive treatment. We plan for this during the intervention preparation.",
  },
  {
    question: "What if they are a public figure or their name is well known?",
    answer: "We have helped people at the highest levels of business, medicine, law, and public life. These situations require additional layers of discretion — travel under a personal name, facilities with no visible signage, and treatment teams with specific NDA protocols. We know which programs can handle this.",
  },
  {
    question: "Who should be involved in an executive intervention?",
    answer: "Typically, the closest family members and one or two colleagues or mentors with genuine relationships — not a full corporate intervention. Quality over quantity. We advise on who to include and who to exclude, and we make sure every participant is genuinely prepared.",
  },
  {
    question: "What does the leave of absence look like?",
    answer: "Most executives frame treatment as a medical leave — often just described as 'health-related' to colleagues. Many executive programs offer 30-day intensive options that can be positioned as a brief absence. We help plan the narrative alongside treatment entry.",
  },
  {
    question: "What happens if they refuse the intervention?",
    answer: "Refusal at the executive level is handled carefully. We prepare participants with specific professional consequences — loss of family support, separation, or agreed professional reviews — that are real and will be enforced. We do not allow fake ultimatums into the room.",
  },
];

export default function InterventionsForExecutivesPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Executive Interventions"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Executive interventions — <span className="italic text-[#8FAC87]">discreet care for those who carry the most</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"High-functioning professionals require a different level of discretion, planning, and placement. We have helped CEOs, surgeons, attorneys, and leaders get well — without their careers collapsing in the process."}</AutoLinkedText>
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                {["Full confidentiality", "Career-compatible treatment", "Executive-level placement network"].map((t) => (
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
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Recognising the Problem"}</AutoLinkedText></p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Signs a high-achiever needs <span className="italic text-[#507969]">professional intervention</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"High-functioning addiction is one of the most dangerous forms because the external performance masks internal collapse. If several of these are true, the problem is further along than it appears."}</AutoLinkedText>
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
                { number: "Private", label: "Discreet placement network", icon: "ri-lock-line" },
                { number: "Flexible", label: "Work-compatible options", icon: "ri-briefcase-line" },
                { number: "VIP", label: "Executive-level programmes", icon: "ri-vip-crown-line" },
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
            <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Why Families Hesitate"}</AutoLinkedText></p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              What keeps executives from getting <span className="italic text-[#8FAC87]">the help they need</span>
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
        <Image src={FAMILY_IMG} alt="An executive and family finding help" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"I was terrified my board would find out. The intervention protected my career and saved my life.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— CEO, now 18 months sober"}</AutoLinkedText></p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              How executive interventions are <span className="italic text-[#507969]">handled differently</span>
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

      <FaqAccordion title="Executive intervention questions, answered" faqs={EXEC_FAQS} />

      <BottomCta
        title="Your reputation is safe with us"
        italicWord="safe"
        body="Your first call is free, confidential, and will never appear on any record. We've helped leaders at every level get well — quietly."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

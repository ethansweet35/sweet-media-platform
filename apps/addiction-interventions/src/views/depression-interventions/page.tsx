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

const HERO_BG = `${SUPABASE_IMAGES}/depression_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/depression_family01.jpg`;

const SIGNS = [
  "Withdrawal from family, friends, and previously enjoyed activities",
  "Persistent sadness, hopelessness, or numbness lasting weeks",
  "Significant changes in sleep, appetite, or personal hygiene",
  "Statements about being a burden or not wanting to be here",
  "Inability to work, attend school, or manage daily tasks",
  "Previous suicide attempts or current suicidal ideation",
];

const WHY_WAIT = [
  {
    icon: "ri-user-star-line",
    myth: `"They'll snap out of it — everyone gets sad sometimes."`,
    truth:
      "Clinical depression is not ordinary sadness. It is a medical condition that alters brain chemistry and makes self-advocacy nearly impossible. Waiting for them to 'just try harder' is not a plan — it is a gamble with their life.",
  },
  {
    icon: "ri-chat-3-line",
    myth: `"We've tried talking to them and it only makes things worse."`,
    truth:
      "Unstructured conversations often reinforce shame. A professional depression intervention uses clinical language, removes blame, and presents a clear, compassionate path to care that feels like relief — not punishment.",
  },
  {
    icon: "ri-heart-2-line",
    myth: `"I don't want to make them feel worse by bringing it up."`,
    truth:
      "Silence protects the illness, not the person. Most people with severe depression are already suffering in isolation. A well-run intervention often brings the first sense of hope they have felt in months or years.",
  },
  {
    icon: "ri-time-line",
    myth: '"Maybe they just need more time or a different therapist."',
    truth:
      "Many families cycle through outpatient providers for years while the person continues to decline. When depression is treatment-resistant or accompanied by suicidal thoughts, a higher level of care is often required — and time is not neutral.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Confidential assessment call",
    body: "You speak directly with a certified interventionist who specialises in mood disorders. We assess severity, risk, history, and the family dynamics that have kept everyone stuck.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Custom intervention plan",
    body: "We choose the right model (often more invitational than confrontational), identify the appropriate level of care (PHP, residential, or intensive outpatient), and pre-screen programmes with depression expertise.",
  },
  {
    icon: "ri-team-line",
    title: "Family preparation & coaching",
    body: "Each participant learns how to speak from love and observation rather than frustration. We rehearse responses to denial, anger, or withdrawal and set clear boundaries that protect everyone.",
  },
  {
    icon: "ri-heart-line",
    title: "The intervention meeting",
    body: "We facilitate a structured, compassionate conversation. Your loved one hears the impact of their depression on the people who care most — and receives an immediate, concrete offer of help.",
  },
  {
    icon: "ri-hospital-line",
    title: "Same-day or rapid admission",
    body: "We arrange transport and admission to a vetted programme equipped for treatment-resistant depression, often the same day or within 24 hours. No 'we'll think about it' window.",
  },
  {
    icon: "ri-seedling-line",
    title: "Family support throughout treatment",
    body: "Depression recovery is a family journey. We stay engaged with education, visitation guidance, and post-discharge planning so the home environment supports — rather than sabotages — progress.",
  },
];

const WHAT_TREATMENT_LOOKS_LIKE = [
  {
    icon: "ri-medicine-bottle-line",
    title: "Psychiatric evaluation & medication",
    body: "A full psychiatric assessment determines whether medication, TMS, ketamine-assisted therapy, or other modalities are appropriate alongside psychotherapy.",
  },
  {
    icon: "ri-home-smile-line",
    title: "Residential or PHP/IOP",
    body: "Structured programmes provide daily therapy, skill-building, and a break from the environment that perpetuates the depression — often 30–90 days depending on severity.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Evidence-based therapies",
    body: "CBT, DBT, ACT, and interpersonal therapy delivered by clinicians experienced in treatment-resistant and recurrent depression.",
  },
  {
    icon: "ri-group-2-line",
    title: "Family involvement & aftercare",
    body: "Family therapy sessions, discharge planning, and long-term outpatient connections ensure the gains made in treatment are sustained at home.",
  },
];

const DEPRESSION_FAQS: Faq[] = [
  {
    question: "What is a depression intervention and how is it different from an addiction intervention?",
    answer:
      "A depression intervention is a professionally facilitated family meeting designed to help a loved one accept treatment for severe clinical depression. Unlike substance interventions, the focus is less on consequences and more on connection, reducing shame, and presenting care as relief rather than punishment. The tone is gentler, the language more clinical, and the recommended programmes are psychiatric and therapeutic rather than traditional rehab.",
  },
  {
    question: "What if my loved one refuses help or says they are fine?",
    answer:
      "This is extremely common in depression. We prepare families for flat denial, minimisation, or even anger. Our interventionists are skilled at reading the room, adapting the message in real time, and helping the person feel heard rather than attacked. Even when the first answer is 'no,' the conversation often plants the seed that leads to acceptance within days.",
  },
  {
    question: "Is it safe to intervene if they have talked about suicide?",
    answer:
      "Yes — and often it is the most important time to act. We work with families to assess immediate risk and coordinate with crisis resources when needed. A professional intervention can be the bridge to a safe, structured environment where suicidal thoughts can be properly addressed rather than hidden.",
  },
  {
    question: "How quickly can you help us arrange a depression intervention?",
    answer:
      "We can typically facilitate an intervention within 48–72 hours. In situations with active suicidal ideation or recent attempts, we treat the case as urgent and often mobilise the same day or next day. Treatment placement is arranged in advance so there is no gap between the conversation and care.",
  },
  {
    question: "Will insurance cover depression treatment?",
    answer:
      "In most cases, yes. Mental health parity laws require insurance plans to cover psychiatric care at the same level as medical care. We help families verify benefits and identify in-network or high-quality out-of-network programmes that specialise in depression. Cost should never be the reason someone stays stuck.",
  },
  {
    question: "What if they have already tried therapy or medication and it didn't work?",
    answer:
      "Many of the people we help have 'failed' multiple outpatient attempts. That does not mean nothing works — it often means they need a higher level of care (residential, PHP, or a programme offering TMS, ketamine, or other advanced modalities). We specialise in matching people with programmes equipped for treatment-resistant depression.",
  },
];

export default function DepressionInterventionsPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Depression Interventions</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Depression interventions —{" "}
                <span className="italic text-[#8FAC87]">when hopelessness has taken the wheel</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                Clinical depression can render a person unable to seek the help they need. We step in when the family has watched their loved one decline for too long — and guide them toward the level of care that will make a real difference.
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

      {/* ── Warning signs ── */}
      <section id="signs" className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Recognise the Signs</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Is it time for a{" "}
                <span className="italic text-[#507969]">depression intervention?</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                Most families wait far longer than they should. Depression rarely announces itself loudly — it creeps in through isolation, exhaustion, and the quiet hope that things will improve on their own. These are the signs that tell a different story.
              </p>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#3E5B50] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#507969]">
                <i className="ri-phone-fill"></i> Talk to an interventionist now
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

      {/* ── Why families wait ── */}
      <section className="bg-[#3E5B50] py-24 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Breaking the Cycle</p>
            <h2 className="font-heading text-4xl font-bold md:text-5xl">
              The reasons families wait —{" "}
              <span className="italic text-[#8FAC87]">and why they shouldn't</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              Every family we work with had a reason to wait. We have heard them all — and we understand them. Here is what we know.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {WHY_WAIT.map((item) => (
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
        <Image src={FAMILY_IMG} alt="A family finding hope and connection during a depression intervention" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            "The moment we stopped waiting for them to 'get better on their own' was the moment everything changed."
          </p>
          <p className="mt-2 text-sm text-white/70">— A family we walked with in 2025</p>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">What We Do</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                What a professional depression intervention{" "}
                <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                Clinical depression is not a character flaw or a temporary mood. It is a serious medical condition that impairs judgment, motivation, and the ability to ask for help. By the time families reach us, their loved one has often been suffering in silence for months or years.
              </p>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                We help you cut through the paralysis. Our interventionists are certified professionals experienced in mood disorders — not generic facilitators. Every plan is built around the specific person, their history, risk level, and the right level of psychiatric care.
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                We pre-screen and contact treatment programmes before the intervention. Your loved one is not deciding whether to get help — they are deciding which programme feels like the first step toward relief. That single structural change dramatically increases the likelihood of acceptance.
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "600+", label: "Depression interventions led", icon: "ri-cloud-windy-line" },
                { number: "25+", label: "Years of experience", icon: "ri-calendar-2-line" },
                { number: "78%", label: "First-session acceptance rate", icon: "ri-award-line" },
                { number: "24 / 7", label: "Available for crisis calls", icon: "ri-time-line" },
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

      {/* ── Our process ── */}
      <section className="bg-[#F5F3E7] py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                How a depression intervention{" "}
                <span className="italic text-[#507969]">unfolds</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#4B4B4B] md:text-lg">
              From first call to admission, every step is managed by your interventionist. You are never navigating this alone — and you are never left wondering what comes next.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#EFEFEF]">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3E5B50] text-white shadow-sm">
                    <i className={`text-xl ${step.icon}`}></i>
                  </span>
                  <span className="font-heading text-4xl font-bold text-[#EFEFEF]">0{i + 1}</span>
                </div>
                <h3 className="font-heading mb-2 text-lg font-bold text-[#1A1A17]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#4B4B4B]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What treatment looks like ── */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">After the Intervention</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              What depression treatment{" "}
              <span className="italic text-[#507969]">actually looks like</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4B4B4B]">
              We only place loved ones in programmes we would send our own families to — and we will not recommend any level of care without explaining exactly why it fits.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHAT_TREATMENT_LOOKS_LIKE.map((item) => (
              <div key={item.title} className="flex flex-col rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7]/50 p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                  <i className={`text-2xl ${item.icon}`}></i>
                </span>
                <h3 className="font-heading mt-5 text-xl font-bold text-[#1A1A17]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B4B4B]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inline CTA band ── */}
      <section className="bg-[#F5F3E7] py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-[#3E5B50] px-8 py-12 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                Ready to take the first step?
              </h3>
              <p className="mt-2 text-white/70">
                Your first call is free, confidential, and judgment-free. We listen first.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                Request a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related services ── */}
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
              {
                slug: "mental-health-interventions",
                icon: "ri-mental-health-line",
                name: "Mental Health Interventions",
                desc: "When depression co-occurs with anxiety, bipolar, or other conditions, we tailor the approach to the full clinical picture.",
              },
              {
                slug: "dual-diagnosis-interventions",
                icon: "ri-link-m",
                name: "Dual Diagnosis Interventions",
                desc: "Depression and substance use frequently travel together. We specialise in integrated care from day one.",
              },
              {
                slug: "crisis-interventions",
                icon: "ri-alarm-warning-line",
                name: "Crisis Interventions",
                desc: "When suicidal ideation or acute risk is present, we mobilise immediately with crisis-trained specialists.",
              },
            ].map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.slug}`}
                className="group flex flex-col rounded-3xl border border-[#EFEFEF] bg-[#F5F3E7]/50 p-7 shadow-sm transition hover:border-[#8FAC87]/40 hover:shadow-md"
              >
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

      <FaqAccordion
        title="Depression intervention questions, answered"
        faqs={DEPRESSION_FAQS}
      />

      <BottomCta
        title="Start the conversation today"
        italicWord="conversation"
        body="Your first call is free, confidential, and judgment-free. A certified interventionist answers — not a call centre. We listen first, then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

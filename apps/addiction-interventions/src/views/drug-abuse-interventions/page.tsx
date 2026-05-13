import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

const HERO_BG = `${SUPABASE_IMAGES}/drug_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/drug_family01.jpg`;

const SIGNS = [
  "Money, valuables, or prescription medications disappearing from the home",
  "Sudden withdrawal from family, friends, and previously enjoyed activities",
  "Unexplained legal trouble, court dates, or interactions with law enforcement",
  "Visible physical decline — rapid weight loss, skin changes, or poor hygiene",
  "Repeated failed promises to stop, cut back, or 'do it differently this time'",
  "Paranoia, mood swings, or aggressive behaviour that is out of character",
  "Needle marks, burnt spoons, or other drug paraphernalia in their space",
  "Financial desperation — borrowing money, selling items, or asking for cash constantly",
];

const WHY_WAIT = [
  {
    icon: "ri-user-star-line",
    myth: `"They still look put-together — it can't be that serious."`,
    truth:
      "Many people with drug dependence maintain a convincing exterior for a long time. The damage is happening internally — to their brain, their organs, their relationships. By the time it becomes obvious, the addiction has deep roots.",
  },
  {
    icon: "ri-chat-3-line",
    myth: `"We've tried tough love and nothing works."`,
    truth:
      "Tough love without a plan often pushes people further away. A professional intervention replaces confrontation with structure, clinical insight, and — most importantly — an immediate, pre-arranged treatment bed.",
  },
  {
    icon: "ri-heart-2-line",
    myth: `"I don't want to push them over the edge."`,
    truth:
      "The edge is already there. Every day of active use carries overdose risk, legal risk, and health deterioration. A well-run intervention is often the safest and most compassionate thing a family can do.",
  },
  {
    icon: "ri-time-line",
    myth: `"Maybe this is just a phase — they'll grow out of it."`,
    truth:
      "Drug dependence is a progressive brain disease. The longer it goes untreated, the more neural pathways are rewired around the substance. Early intervention gives the best chance of full recovery.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "First confidential call",
    body: "You speak directly with a certified interventionist who specialises in drug dependence. We assess the substance(s), the severity, any co-occurring mental health issues, and recommend the right level of care.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Custom intervention plan",
    body: "We select the intervention model that fits your loved one's personality and the family dynamic. We pre-screen and hold a bed at a vetted drug treatment programme before we ever sit down.",
  },
  {
    icon: "ri-team-line",
    title: "Family preparation sessions",
    body: "Each participant is coached privately. We rehearse what to say, how to respond to denial or anger, and how to hold boundaries without threats. Everyone walks in calm and aligned.",
  },
  {
    icon: "ri-heart-line",
    title: "The intervention",
    body: "We facilitate the structured conversation. Your loved one hears the impact from the people who matter most — delivered with love, not ultimatums — and is guided toward accepting help.",
  },
  {
    icon: "ri-hospital-line",
    title: "Immediate placement",
    body: "If they agree, we escort them the same day. No 'I'll think about it' window that often leads to second thoughts. We handle transport and admission logistics.",
  },
  {
    icon: "ri-seedling-line",
    title: "Long-term family support",
    body: "Drug recovery is rarely linear. We stay engaged through detox, residential, outpatient, and the critical first year of sobriety — supporting both the individual and the family system.",
  },
];

const WHAT_TREATMENT_LOOKS_LIKE = [
  {
    icon: "ri-medicine-bottle-line",
    title: "Medical detox & stabilisation",
    body: "Depending on the substance (opioids, benzos, alcohol, stimulants), detox can be dangerous. We only place with programmes that provide 24/7 medical supervision and appropriate medication-assisted treatment.",
  },
  {
    icon: "ri-home-smile-line",
    title: "Residential treatment",
    body: "A structured 30–90 day programme removes the person from the environment that enabled use and provides intensive therapy, peer support, and evidence-based modalities (CBT, DBT, trauma-informed care).",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Intensive outpatient (IOP)",
    body: "For those who need to maintain work or family responsibilities, IOP offers 3–5 days per week of structured programming while living at home — often used as a step-down from residential.",
  },
  {
    icon: "ri-group-2-line",
    title: "Medication-assisted treatment (MAT)",
    body: "For opioid and alcohol dependence, MAT (buprenorphine, naltrexone, methadone, acamprosate) significantly improves outcomes. We prioritise programmes that integrate MAT with behavioural therapy.",
  },
];

const DRUG_FAQS: Faq[] = [
  {
    question: "What is a drug intervention and how is it different from an alcohol intervention?",
    answer:
      "The core structure is the same — a professionally facilitated, family-led conversation with a clear goal of immediate treatment acceptance. What changes is the clinical approach: different substances require different detox protocols, different risk assessments (overdose, psychosis, withdrawal seizures), and different treatment modalities. Our interventionists are trained across all major substances and tailor the plan accordingly.",
  },
  {
    question: "My loved one uses multiple drugs — can you still help?",
    answer:
      "Yes. Polysubstance use is extremely common and often more dangerous. We assess the primary substances, any mental health co-occurrence, and place with programmes equipped for complex cases. The intervention conversation addresses the full picture, not just one drug.",
  },
  {
    question: "What if they have a co-occurring mental health condition (depression, anxiety, bipolar, PTSD)?",
    answer:
      "This is dual diagnosis, and we specialise in it. Treating only the substance without addressing the mental health condition almost guarantees relapse. We only place with programmes that provide integrated psychiatric care, medication management, and trauma-informed therapy alongside addiction treatment.",
  },
  {
    question: "How quickly can you arrange a drug intervention?",
    answer:
      "Most drug interventions can be facilitated within 48–72 hours. For opioids, stimulants, or situations with active overdose risk or psychosis, we treat as same-day or next-day priorities. We maintain relationships with rapid-admit detox centres and residential programmes across the country.",
  },
  {
    question: "Will they need to go to rehab, or can they detox at home?",
    answer:
      "It depends on the substance and the severity. Opioid and benzodiazepine withdrawal can be medically dangerous and should never be attempted at home without supervision. Stimulant withdrawal is less physically dangerous but carries high relapse and depression risk. We assess and recommend the safest, most effective level of care — and explain exactly why.",
  },
  {
    question: "What if they refuse treatment after the intervention?",
    answer:
      "A professionally run intervention succeeds the majority of the time, but not 100%. If your loved one declines, the family still leaves with clear boundaries, a shared understanding, and a plan. Many people who initially refuse enter treatment within days or weeks once the family holds the line consistently. We support you either way.",
  },
  {
    question: "How do you handle someone who is in active psychosis or has a history of violence?",
    answer:
      "Safety is our first priority — for the family and for your loved one. We have extensive experience with high-risk situations. In some cases we coordinate with mobile crisis teams, law enforcement wellness checks, or involuntary hold processes when clinically appropriate. We will never put family members in harm's way.",
  },
];

export default function DrugAbuseInterventionsPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Drug Abuse Interventions"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Professional drug interventions —{" "}
                <span className="italic text-[#8FAC87]">structure when chaos has taken over</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"Drug dependence creates cycles of enabling, codependency, and crisis that devastate families. Our certified interventionists interrupt those cycles and present treatment in a way your loved one can actually accept — with a bed reserved before we sit down."}</AutoLinkedText>
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
                <span className="italic text-[#507969]">drug intervention?</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                <AutoLinkedText>{"Drug dependence rarely looks like the stereotype until it is far advanced. Many families are shocked when they finally see the full picture. These signs indicate the situation has moved beyond what a family conversation can fix."}</AutoLinkedText>
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
              <AutoLinkedText>{"Every family we work with had a reason to wait. We have heard them all — and we understand them. Here is what we know."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {WHY_WAIT.map((item) => (
              <div key={item.myth} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#8FAC87]">
                  <i className={`text-2xl ${item.icon}`}></i>
                </div>
                <p className="mb-3 font-heading text-lg font-bold italic text-white/60"><AutoLinkedText>{item.myth}</AutoLinkedText></p>
                <p className="text-sm leading-relaxed text-white/80"><AutoLinkedText>{item.truth}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual — real families */}
      <section className="relative h-[420px] overflow-hidden">
        <Image src={FAMILY_IMG} alt="A family finding the courage to act" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"We thought we were protecting him by waiting. We were only protecting the addiction.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Parents of a son in recovery, 2024"}</AutoLinkedText></p>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">What We Do</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                What a professional drug intervention{" "}
                <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"Drug dependence creates cycles of enabling and codependency that devastate families. Our specialists are trained to interrupt those cycles and present treatment in a way your loved one can actually accept."}</AutoLinkedText>
              </p>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"Unlike an unstructured family conversation or a spontaneous confrontation, a professional intervention is a carefully planned, clinically informed process. We pre-screen and contact treatment centres before the intervention takes place. Your loved one is not deciding whether to get help — they are deciding which bed to go to."}</AutoLinkedText>
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"We specialise in complex cases: polysubstance use, co-occurring mental health conditions, history of failed treatment attempts, and situations where the person has been in and out of detox or rehab multiple times. We know how to break the cycle."}</AutoLinkedText>
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "500+", label: "Drug interventions led", icon: "ri-capsule-line" },
                { number: "25+", label: "Years of experience", icon: "ri-calendar-2-line" },
                { number: "48–72h", label: "Average time to intervention", icon: "ri-time-line" },
                { number: "24 / 7", label: "Crisis response available", icon: "ri-alarm-warning-line" },
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

      {/* ── Our process ── */}
      <section className="bg-[#F5F3E7] py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                How a drug intervention{" "}
                <span className="italic text-[#507969]">unfolds</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#4B4B4B] md:text-lg">
              <AutoLinkedText>{"From first call to treatment admission, every step is managed by your interventionist. You are never navigating this alone — and you are never left wondering what comes next."}</AutoLinkedText>
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
                <p className="text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{step.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What treatment looks like ── */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]"><AutoLinkedText>{"After the Intervention"}</AutoLinkedText></p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              What drug treatment{" "}
              <span className="italic text-[#507969]">actually looks like</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4B4B4B]">
              <AutoLinkedText>{"We only place loved ones in programmes we would send our own families to — and we will not recommend any level of care without explaining exactly why it fits."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHAT_TREATMENT_LOOKS_LIKE.map((item) => (
              <div key={item.title} className="flex flex-col rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7]/50 p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                  <i className={`text-2xl ${item.icon}`}></i>
                </span>
                <h3 className="font-heading mt-5 text-xl font-bold text-[#1A1A17]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{item.body}</AutoLinkedText></p>
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
                <AutoLinkedText>{"Your first call is free, confidential, and judgment-free. We listen first."}</AutoLinkedText>
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
                slug: "alcohol-abuse-interventions",
                icon: "ri-goblet-line",
                name: "Alcohol Abuse Interventions",
                desc: "When alcohol is the primary or co-occurring substance, we address both the drug and alcohol use together.",
              },
              {
                slug: "dual-diagnosis-interventions",
                icon: "ri-link-m",
                name: "Dual Diagnosis Interventions",
                desc: "Drug use and mental health disorders frequently co-occur. We specialise in integrated interventions for both.",
              },
              {
                slug: "crisis-interventions",
                icon: "ri-alarm-warning-line",
                name: "Crisis Interventions",
                desc: "When immediate action is required — overdose risk, psychosis, or dangerous behaviour — we mobilise the same day.",
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
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{rel.desc}</AutoLinkedText></p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition group-hover:gap-2.5">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion
        title="Drug intervention questions, answered"
        faqs={DRUG_FAQS}
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

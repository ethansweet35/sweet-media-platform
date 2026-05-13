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

const HERO_BG = `${SUPABASE_IMAGES}/alcohol_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/alcohol_family01.jpg`;

const SIGNS = [
  "Drinking earlier in the day or hiding bottles around the home",
  "Multiple failed attempts to cut back or stop on their own",
  "Withdrawal symptoms — shaking, sweating, or severe anxiety without alcohol",
  "Repeated DUIs, accidents, or alcohol-related legal trouble",
  "Blackouts, memory loss, or waking up not knowing what happened",
  "Health problems they minimise or refuse to address",
  "Family members walking on eggshells to avoid triggering them",
  "Broken promises about 'slowing down' or 'only on weekends'",
];

const WHY_WAIT = [
  {
    icon: "ri-user-star-line",
    myth: `"They still have a job, so it's not that bad."`,
    truth:
      "High-functioning alcoholism is real — and it often masks the severity until liver disease, a serious accident, or a career collapse forces the issue. The earlier we intervene, the more there is to save.",
  },
  {
    icon: "ri-chat-3-line",
    myth: `"We've already tried talking to them."`,
    truth:
      "An unstructured family conversation is not an intervention. A certified interventionist changes the dynamic entirely — bringing clinical language, a structured format, and immediate treatment placement on the same day.",
  },
  {
    icon: "ri-heart-2-line",
    myth: `"I don't want to damage the relationship."`,
    truth:
      "Our approach leads with love, not ultimatums. We coach every participant to speak with compassion and clarity. Most families report that the intervention itself began healing the relationship — not breaking it.",
  },
  {
    icon: "ri-time-line",
    myth: '"Maybe they just need to hit rock bottom."',
    truth:
      "Rock bottom keeps moving. For many people with alcohol use disorder, rock bottom is a hospital bed — or a casket. Waiting is a choice with real consequences.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Confidential first call",
    body: "You speak directly with a certified interventionist — not a call centre. We assess the situation, ask the right questions, and tell you honestly what we recommend.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Intervention plan",
    body: "We select the right intervention model for your loved one's personality and history, pre-screen treatment centres, and schedule a date that works.",
  },
  {
    icon: "ri-team-line",
    title: "Family preparation",
    body: "We coach each participant privately — what to say, how to say it, what to do if they walk out, and how to hold boundaries without threats.",
  },
  {
    icon: "ri-heart-line",
    title: "The intervention",
    body: "We facilitate the structured conversation in person. Your loved one hears the impact, the love, and the expectation. We guide them toward saying yes.",
  },
  {
    icon: "ri-hospital-line",
    title: "Same-day placement",
    body: "We arrange transport and admission to a vetted alcohol treatment programme — often the same day. Your loved one doesn't go home to 'pack and think about it'.",
  },
  {
    icon: "ri-seedling-line",
    title: "Ongoing family support",
    body: "We stay engaged through detox, residential, and outpatient. Recovery is a long road — and families need support every step of the way, too.",
  },
];

const WHAT_TREATMENT_LOOKS_LIKE = [
  {
    icon: "ri-medicine-bottle-line",
    title: "Medical detox",
    body: "Alcohol withdrawal can be life-threatening. Medically supervised detox manages the physical process safely, with medication to reduce seizure risk and severe withdrawal symptoms.",
  },
  {
    icon: "ri-home-smile-line",
    title: "Residential treatment",
    body: "A structured 30–90 day programme provides therapy, peer support, and a break from the environment that enabled the drinking — critical for building new patterns.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Outpatient & IOP",
    body: "Intensive outpatient programmes allow your loved one to maintain work or school responsibilities while continuing structured therapy several days per week.",
  },
  {
    icon: "ri-group-2-line",
    title: "Ongoing peer support",
    body: "AA, SMART Recovery, and other community resources extend recovery far beyond any clinical programme — we help families understand how to support involvement.",
  },
];

const ALCOHOL_FAQS: Faq[] = [
  {
    question: "What exactly is an alcohol intervention?",
    answer:
      "An alcohol intervention is a structured, professionally facilitated conversation in which family members and close friends — guided by a certified interventionist — express their love and concern to a person struggling with alcohol use disorder. Unlike an ultimatum or an argument, it is a carefully rehearsed process with a clear goal: getting your loved one to accept help immediately. We arrange treatment placement before the intervention takes place, so if they say yes, they leave that day.",
  },
  {
    question: "What if they get angry or walk out?",
    answer:
      "This is one of the first things we prepare for. During family coaching, we cover exactly how to respond if your loved one becomes angry, dismissive, or tries to leave — including who speaks first, who stands near the door, and how to re-engage without escalating. Experienced interventionists know how to read the room and adapt in real time. In most cases, even an initial 'no' becomes a 'yes' before the conversation ends.",
  },
  {
    question: "My loved one is a 'functional alcoholic' — do they still need an intervention?",
    answer:
      "Yes. High-functioning alcoholism is a well-documented phenomenon — and it is often more dangerous than it appears, because the person can maintain a facade of control for years. By the time visible consequences appear (liver disease, DUI, job loss), significant damage has already been done. The fact that someone is still functioning does not mean the situation is not serious — it means there is still more to save.",
  },
  {
    question: "How is your approach different from what we've already tried?",
    answer:
      "Most families come to us having already had dozens of conversations about the drinking. What makes a professional intervention different is the structure, the preparation, the clinical language, and critically — the treatment placement arranged in advance. When a family member asks 'will you get help?' the answer is almost always 'I'll think about it.' When a certified interventionist presents a specific, vetted treatment programme with a reserved bed, the dynamic changes completely.",
  },
  {
    question: "How quickly can you arrange an intervention?",
    answer:
      "We can typically facilitate an intervention within 48–72 hours of the first call, sometimes sooner in urgent situations. Crisis cases — where there is immediate medical risk — are treated as same-day priorities. We pre-screen and contact treatment centres before the intervention, so placement is arranged before we sit down.",
  },
  {
    question: "Will insurance cover alcohol treatment?",
    answer:
      "In most cases, yes. Under the Mental Health Parity and Addiction Equity Act, insurance companies are required to cover substance use disorder treatment at the same level as other medical conditions. Our team can help you verify benefits and identify programmes that work within your loved one's coverage. Treatment should not be a financial barrier — we will help you navigate it.",
  },
  {
    question: "What if they refuse to go to treatment after the intervention?",
    answer:
      "A well-run intervention succeeds the majority of the time — but not every time. If your loved one declines, we do not consider the process a failure. Family members leave the conversation having said what needed to be said, with boundaries set and agreed on. We help families hold those boundaries consistently, which often results in the person seeking help on their own within days or weeks. We stay with you regardless.",
  },
];

export default function AlcoholAbuseInterventionsPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Alcohol Abuse Interventions"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Professional alcohol interventions —{" "}
                <span className="italic text-[#8FAC87]">done with love, not force</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"We have helped over 1,000 families confront alcohol use disorder and guide their loved one into treatment. Our certified interventionists handle the conversation you cannot have alone — with structure, compassion, and a bed reserved before we sit down."}</AutoLinkedText>
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
                Is it time for an{" "}
                <span className="italic text-[#507969]">alcohol intervention?</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                <AutoLinkedText>{"Most families wait far longer than they should. Alcohol use disorder rarely announces itself — it hides behind routines, excuses, and the exhausting hope that things will improve on their own. These are the signs that tell a different story."}</AutoLinkedText>
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
        <Image src={FAMILY_IMG} alt="A mother and daughter finding hope together" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"The moment we stopped waiting for rock bottom was the moment everything changed.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— A family we walked with in 2025"}</AutoLinkedText></p>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">What We Do</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                What a professional alcohol intervention{" "}
                <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"Alcohol use disorder hides in plain sight. Functioning alcoholics hold jobs, hold marriages together, and quietly destroy their health. By the time the family is ready to act, denial has had years to take root — and the family's own enabling patterns have become invisible to them."}</AutoLinkedText>
              </p>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"We help you cut through it. Our interventionists are certified professionals with decades of experience — not amateur facilitation or scripted readings. Every plan is built around the specific person, the family dynamic, and the appropriate level of care."}</AutoLinkedText>
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"We pre-screen and contact treatment centres before the intervention takes place. Your loved one is not deciding whether to get help — they are deciding which bed to go to. That single structural change dramatically increases the likelihood of a yes."}</AutoLinkedText>
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "1,000+", label: "Alcohol interventions led", icon: "ri-goblet-line" },
                { number: "25+", label: "Years of experience", icon: "ri-calendar-2-line" },
                { number: "83%", label: "ARISE® first-session success", icon: "ri-award-line" },
                { number: "24 / 7", label: "Available for crisis calls", icon: "ri-time-line" },
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
                How an alcohol intervention{" "}
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
              What alcohol treatment{" "}
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
                slug: "drug-abuse-interventions",
                icon: "ri-capsule-line",
                name: "Drug Abuse Interventions",
                desc: "When alcohol is paired with other substances, our dual-approach interventions address both simultaneously.",
              },
              {
                slug: "dual-diagnosis-interventions",
                icon: "ri-link-m",
                name: "Dual Diagnosis Interventions",
                desc: "Alcohol and mental health disorders frequently co-occur. We specialise in integrated interventions for both.",
              },
              {
                slug: "family-interventions",
                icon: "ri-group-line",
                name: "Family Interventions",
                desc: "Alcohol use disorder is a family disease. Our family-centred approach heals the entire system alongside the individual.",
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
        title="Alcohol intervention questions, answered"
        faqs={ALCOHOL_FAQS}
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

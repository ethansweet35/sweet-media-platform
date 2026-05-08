import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/bipolar_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/bipolar_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Extreme mood swings — soaring highs followed by devastating crashes",
  "Periods of grandiosity, reckless spending, hypersexuality, or impulsive decisions during mania",
  "Sudden drops into severe depression, hopelessness, or suicidal ideation",
  "Reduced need for sleep during manic phases without apparent fatigue",
  "Increasingly rapid cycling between states — moods shifting week to week or day to day",
  "Refusal to take prescribed medication, claiming it dulls their personality",
  "Co-occurring alcohol or drug use to manage mood swings",
  "Broken relationships, lost jobs, or financial ruin as a result of manic episodes",
];

const MYTHS = [
  {
    icon: "ri-lightbulb-line",
    myth: `"They seem fine right now — maybe they don't need help."`,
    truth:
      "Bipolar disorder is cyclical. The window of relative stability is often the best time to intervene — not evidence that help isn't needed. Waiting for the next episode means waiting for more damage.",
  },
  {
    icon: "ri-capsule-line",
    myth: `"Medication will fix it — they just need to take their pills."`,
    truth:
      "Medication compliance is notoriously difficult in bipolar disorder because the manic state can feel good. An intervention addresses both the refusal of treatment and the need for integrated psychiatric and therapeutic care.",
  },
  {
    icon: "ri-user-heart-line",
    myth: `"Confronting them during a stable period will trigger an episode."`,
    truth:
      "A well-prepared, clinically guided intervention does not trigger episodes. Our interventionists are trained in mood disorder dynamics and calibrate the conversation's tone and pace to reduce emotional escalation.",
  },
  {
    icon: "ri-arrow-up-down-line",
    myth: `"This is just who they are — we can't change their personality."`,
    truth:
      "Bipolar disorder is a medical condition, not a personality. With the right integrated care — mood stabilisers, therapy, and family support — many people with bipolar I or II maintain stable, fulfilling lives.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Confidential consultation",
    body: "You speak with a certified interventionist trained in mood disorders — not a call centre. We assess the current phase, any co-occurring substance use, and the family's readiness.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Tailored intervention plan",
    body: "Bipolar interventions require careful timing and language. We develop a clinical plan that accounts for the current mood state, prior treatment history, and the loved one's specific triggers.",
  },
  {
    icon: "ri-group-line",
    title: "Family preparation",
    body: "We coach every participant individually — what to say, how to respond to denial, how to stay regulated. The family arrives unified and emotionally prepared.",
  },
  {
    icon: "ri-discuss-line",
    title: "The intervention conversation",
    body: "Our interventionist facilitates the meeting with clinical precision. Boundaries are clear, treatment is ready, and the tone remains compassionate even when the loved one pushes back.",
  },
  {
    icon: "ri-hospital-line",
    title: "Psychiatric placement",
    body: "We connect your loved one with programs offering integrated mood disorder treatment — medication management, DBT, psychoeducation, and long-term aftercare — often same-day admission.",
  },
];

const BIPOLAR_FAQS: Faq[] = [
  {
    question: "How do you intervene with someone who is currently manic?",
    answer:
      "Active mania is generally not the right time for a formal intervention. We help families assess the current phase and identify the right window — usually a period of relative stability — to maximise the chance of treatment acceptance. If there is an acute safety risk, we advise on crisis resources first.",
  },
  {
    question: "My loved one says the medication makes them feel flat. Is that a real concern?",
    answer:
      "Yes, and it's one of the most common reasons people stop taking mood stabilisers. Our intervention addresses this directly — we help the family validate the experience while making the case for working with a psychiatrist to find the right medication or combination, rather than stopping treatment altogether.",
  },
  {
    question: "Can bipolar disorder be treated effectively, or will this just keep cycling?",
    answer:
      "Many people with bipolar I and II achieve long periods of stability with the right integrated treatment — mood stabilisers, therapy (particularly DBT), psychoeducation, and consistent psychiatric follow-up. The intervention's goal is connecting your loved one with that level of care before more damage occurs.",
  },
  {
    question: "What if my loved one has a dual diagnosis — bipolar and substance use?",
    answer:
      "Dual diagnosis is extremely common in bipolar disorder, as many individuals self-medicate to manage moods. We are specifically trained in dual diagnosis interventions and place with programs that treat both conditions simultaneously, not sequentially.",
  },
  {
    question: "How is a bipolar intervention different from a standard addiction intervention?",
    answer:
      "The framing, language, and clinical considerations differ significantly. We do not lean on consequences and ultimatums the same way. The intervention prioritises psychiatric engagement, medication compliance, and reducing shame around the condition rather than focusing solely on destructive behaviours.",
  },
  {
    question: "What level of care will you recommend?",
    answer:
      "Depending on severity, we recommend residential psychiatric treatment, partial hospitalisation (PHP), or intensive outpatient (IOP) with integrated psychiatric support. We have vetted relationships with programs that specialise in mood disorders — not just general mental health facilities.",
  },
];

export default function BipolarInterventionsPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Bipolar Disorder Interventions</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Bipolar interventions —{" "}
                <span className="italic text-[#8FAC87]">navigating the highs and protecting from the lows</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                Bipolar disorder&apos;s manic highs make the need for help nearly impossible to see — until the crash. We help
                families intervene during the window between episodes, with a plan that addresses both mood instability and
                any co-occurring substance use.
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
                <a
                  href="#signs"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  See warning signs <i className="ri-arrow-down-line"></i>
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                {["Mood disorder specialists", "Dual diagnosis capable", "Integrated psychiatric placement"].map((t) => (
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
      <section id="signs" className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Recognising the Pattern</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Warning signs a bipolar intervention <span className="italic text-[#507969]">may be needed</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                Bipolar disorder is often dismissed as stress, creativity, or personality. By the time families seek help,
                the damage is already significant. These are the signs that professional intervention is the right next step.
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
                { number: "Psych", label: "Integrated medication management", icon: "ri-mental-health-line" },
                { number: "Specialist", label: "Mood disorder programmes", icon: "ri-arrow-up-down-line" },
                { number: "90+", label: "Day residential options", icon: "ri-home-smile-line" },
                { number: "24 / 7", label: "Crisis support available", icon: "ri-alarm-warning-line" },
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

      {/* Myths / truths — dark sage */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Setting the Record Straight</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              What families <span className="italic text-[#8FAC87]">get wrong</span> about bipolar interventions
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
        <Image src={FAMILY_IMG} alt="A family supporting someone with bipolar disorder" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            &ldquo;The highs destroyed our finances. The intervention finally got him the right psychiatric care.&rdquo;
          </p>
          <p className="mt-2 text-sm text-white/70">— Wife of a husband with bipolar I, now in stable recovery</p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              How a bipolar intervention <span className="italic text-[#507969]">unfolds</span>
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

      <FaqAccordion title="Bipolar intervention questions, answered" faqs={BIPOLAR_FAQS} />

      <BottomCta
        title="Stability is possible"
        italicWord="possible"
        body="Your first call is free, confidential, and judgment-free. We listen first — then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

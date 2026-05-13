import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/ptsd_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/ptsd_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Severe hypervigilance — always on guard, startled easily, unable to relax at home",
  "Flashbacks, nightmares, or intrusive memories that disrupt daily life",
  "Emotional numbness, detachment from family, or inability to feel joy",
  "Avoidance of anything that triggers memories of the trauma",
  "Explosive anger or emotional outbursts that are out of proportion to the situation",
  "Increasing isolation — withdrawing from relationships, work, or social life",
  "Self-medicating with alcohol, cannabis, opioids, or other substances to quiet the nervous system",
  "Refusal to acknowledge the trauma or seek help due to shame, stigma, or feeling undeserving",
];

const MYTHS = [
  {
    icon: "ri-shield-flash-line",
    myth: `"PTSD only happens to combat veterans."`,
    truth:
      "PTSD can follow any traumatic experience — childhood abuse, sexual assault, accidents, medical trauma, sudden loss, or domestic violence. It affects all genders, ages, and backgrounds. A loved one doesn't need a battlefield to deserve trauma-specialised care.",
  },
  {
    icon: "ri-time-line",
    myth: `"They just need time — they'll process it eventually."`,
    truth:
      "Untreated PTSD does not resolve on its own. Without evidence-based intervention, symptoms often worsen over time, compounded by avoidance, self-medication, and relationship breakdown. Early action is always better than waiting.",
  },
  {
    icon: "ri-speak-line",
    myth: `"Bringing it up will make the trauma worse."`,
    truth:
      "A trauma-informed intervention does not require revisiting the trauma in detail. Our interventionists are trained to keep the conversation forward-focused — about the life your loved one is losing now and the treatment that can help them reclaim it.",
  },
  {
    icon: "ri-heart-pulse-line",
    myth: `"They refuse therapy — there's nothing we can do."`,
    truth:
      "Refusal of help is a hallmark of PTSD, not a reason to stop trying. Our intervention is specifically designed to reach people who have shut down and to make the case for treatment in a way that reduces shame and lowers defences.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Confidential first call",
    body: "You speak directly with a trauma-informed interventionist. We assess the severity of symptoms, any co-occurring substance use, and whether there is an immediate safety risk that needs to be addressed first.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Trauma-sensitive planning",
    body: "We build an intervention plan that accounts for the loved one's specific triggers, trauma history, and nervous system responses. Language and pacing are calibrated for maximum safety and receptivity.",
  },
  {
    icon: "ri-group-line",
    title: "Family and support preparation",
    body: "We coach each participant on trauma-informed communication — what to say, what not to say, and how to respond if the person shuts down, escalates, or dissociates during the conversation.",
  },
  {
    icon: "ri-discuss-line",
    title: "The intervention conversation",
    body: "Our interventionist facilitates with clinical precision. The focus stays on the present — the impact on your loved one's current life — not on revisiting the past. Treatment is offered at the ready.",
  },
  {
    icon: "ri-hospital-line",
    title: "Trauma-specialised placement",
    body: "We place with programs offering EMDR, prolonged exposure (PE), somatic therapies, and CPT — evidence-based modalities proven effective for PTSD. Often same-day or next-morning admission.",
  },
];

const PTSD_FAQS: Faq[] = [
  {
    question: "How is a PTSD intervention different from a standard mental health intervention?",
    answer:
      "A PTSD intervention requires a trauma-informed approach at every step. We avoid re-traumatising language, manage emotional dysregulation carefully, and build the intervention around the loved one's nervous system capacity. The goal is opening the door to treatment, not relitigating the trauma.",
  },
  {
    question: "My loved one is a veteran. Will your interventionist understand their experience?",
    answer:
      "Yes. We work with veteran and first responder families regularly. We understand the specific cultural barriers — stigma around asking for help, the 'push through it' mentality, and the complexity of military trauma. Our approach meets your loved one where they are.",
  },
  {
    question: "What if my loved one is self-medicating — is that a separate problem?",
    answer:
      "It is one interconnected problem. PTSD and substance use are among the most common co-occurring conditions. We place with dual diagnosis programs that treat the trauma and the substance use simultaneously — treating only one rarely leads to lasting recovery.",
  },
  {
    question: "What treatments should I look for in a PTSD program?",
    answer:
      "Look for programs offering EMDR (eye movement desensitisation and reprocessing), prolonged exposure therapy, cognitive processing therapy (CPT), and somatic approaches. We have vetted relationships with programs that lead with trauma-specialised clinical staff, not just general mental health support.",
  },
  {
    question: "My loved one says the trauma wasn't 'bad enough' to justify treatment. What do I do?",
    answer:
      "This minimisation is one of the most common and damaging aspects of PTSD. The nervous system doesn't grade trauma on an objective scale — the impact on your loved one's life is what matters. Our interventionists are skilled at gently reframing this belief in a way that opens rather than closes the door.",
  },
  {
    question: "Is residential treatment necessary, or can PTSD be treated outpatient?",
    answer:
      "It depends on severity. Moderate PTSD with stable support can often begin with intensive outpatient. Severe PTSD — especially with co-occurring substance use, suicidal ideation, or significant functional impairment — usually requires residential or PHP-level care to stabilise before outpatient therapy is effective.",
  },
];

export default function PTSDInterventionsPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">PTSD Interventions</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                PTSD interventions —{" "}
                <span className="italic text-[#8FAC87]">when trauma has taken over the nervous system</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"Post-traumatic stress disorder changes the entire nervous system — and families often suffer alongside it.\n                We help loved ones access trauma-specialised treatment before the isolation, hypervigilance, and\n                self-medication cause irreversible damage."}</AutoLinkedText>
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
                {["Trauma-informed interventionists", "Veteran & first responder experience", "EMDR & evidence-based placement"].map((t) => (
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
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Recognising the Signs"}</AutoLinkedText></p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Warning signs a PTSD intervention <span className="italic text-[#507969]">may be needed</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"PTSD is often invisible to outsiders and minimised even by those experiencing it. If several of these\n                signs are present, a trauma-informed intervention is likely the most direct path to getting your loved one\n                the help they need."}</AutoLinkedText>
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
                { number: "Trauma", label: "Specialised treatment network", icon: "ri-shield-flash-line" },
                { number: "EMDR", label: "Evidence-based modalities", icon: "ri-mental-health-line" },
                { number: "90+", label: "Day residential options", icon: "ri-home-smile-line" },
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
            <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Common Misconceptions"}</AutoLinkedText></p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Why families <span className="italic text-[#8FAC87]">wait too long</span> to intervene on PTSD
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
        <Image src={FAMILY_IMG} alt="A family supporting someone with PTSD through recovery" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"&ldquo;The hypervigilance had taken over our home. The intervention finally got him the trauma therapy he needed.&rdquo;"}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Wife of a combat veteran, now three years into recovery"}</AutoLinkedText></p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              How a trauma-informed intervention <span className="italic text-[#507969]">unfolds</span>
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

      <FaqAccordion title="PTSD intervention questions, answered" faqs={PTSD_FAQS} />

      <BottomCta
        title="Healing from trauma is possible"
        italicWord="possible"
        body="Your first call is free, confidential, and judgment-free. We listen first — then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

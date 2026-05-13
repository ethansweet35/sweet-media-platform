import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

const HERO_BG = `${SUPABASE_IMAGES}/ocd_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/ocd_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Hours lost each day to repetitive rituals — checking, counting, cleaning, or arranging",
  "The entire household has adapted around the loved one's compulsions",
  "Family members provide constant reassurance that only makes the anxiety worse",
  "Your loved one knows the rituals are irrational but cannot stop without intense distress",
  "Avoidance of situations, objects, or people that trigger obsessive thoughts",
  "Severe distress, panic, or anger when rituals are interrupted or prevented",
  "Significant impairment in work, relationships, or basic daily functioning",
  "Refusal to see a mental health professional due to shame or fear of judgment",
];

const MYTHS = [
  {
    icon: "ri-question-line",
    myth: `"Everyone is a little OCD — it's just about being neat and organised."`,
    truth:
      "Clinical OCD is not a preference for order. It is an anxiety disorder driven by intrusive, unwanted thoughts and compulsive behaviours performed to neutralise unbearable distress. It can consume four or more hours a day and is completely different from liking a clean desk.",
  },
  {
    icon: "ri-group-line",
    myth: `"If we just stop reacting, they'll figure it out on their own."`,
    truth:
      "Withdrawal of accommodation without clinical support can dramatically worsen OCD symptoms and damage relationships. An intervention brings clinical expertise to the process — helping the family step back from rituals in a structured, compassionate way.",
  },
  {
    icon: "ri-brain-line",
    myth: `"OCD can't really be treated — they'll always have it."`,
    truth:
      "Exposure and response prevention (ERP) is one of the most effective treatments in all of psychiatry. Many people with OCD achieve dramatic, lasting reductions in symptoms with the right program. The intervention's goal is getting them into that program.",
  },
  {
    icon: "ri-loop-left-line",
    myth: `"Reassuring them when they're anxious is just being kind."`,
    truth:
      "Reassurance feels kind but functions as a compulsion — it provides temporary relief that reinforces the OCD cycle. One of the most important things a family can do is learn to stop providing reassurance, with clinical guidance to do it safely.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Confidential first call",
    body: "You speak directly with an interventionist trained in OCD and anxiety disorders. We assess severity, accommodation patterns within the family, and whether there are co-occurring conditions that need to be factored in.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Accommodation mapping",
    body: "We help the family identify every way they have been accommodating the OCD — reassurance, ritual participation, schedule changes. This forms the basis of our intervention plan and treatment recommendations.",
  },
  {
    icon: "ri-group-line",
    title: "Family preparation",
    body: "We coach each participant on OCD-specific communication, how to respond to escalation, and how to stop accommodating in a way that maintains compassion while creating real accountability.",
  },
  {
    icon: "ri-discuss-line",
    title: "The intervention conversation",
    body: "Our interventionist facilitates a structured conversation that names the impact of the OCD on the family, validates the suffering, and presents treatment as the path forward — not punishment or rejection.",
  },
  {
    icon: "ri-hospital-line",
    title: "ERP-specialised placement",
    body: "We connect your loved one with programs that lead with ERP — the gold standard for OCD. We prioritise OCD-specialised clinicians over general mental health centres, with same-day or next-morning admission.",
  },
];

const OCD_FAQS: Faq[] = [
  {
    question: "How does an OCD intervention differ from other mental health interventions?",
    answer:
      "OCD interventions require a deep understanding of accommodation and enabling patterns within the family. Family members often participate in rituals or provide constant reassurance, which inadvertently maintains the disorder. We help the family stop accommodating while still offering compassionate support, and we place with programmes that offer evidence-based ERP (exposure and response prevention).",
  },
  {
    question: "My loved one is highly intelligent and functional — can OCD really be that disabling?",
    answer:
      "Yes. Severe OCD can completely take over a person's life even while they maintain a job or appear 'high-functioning' to the outside world. The internal suffering and the amount of time consumed by obsessions and compulsions is often invisible to others until the family intervention reveals the full extent.",
  },
  {
    question: "We've been accommodating the OCD for years — is it too late to intervene?",
    answer:
      "It is never too late, but long-standing accommodation patterns do require more careful clinical management. Our interventionists assess how deeply embedded the family dynamics are and structure the intervention to unwind accommodation gradually and compassionately — reducing the risk of triggering a crisis.",
  },
  {
    question: "What is ERP and why is it the right treatment for OCD?",
    answer:
      "Exposure and response prevention involves gradually facing feared situations without performing the compulsive rituals. It is the most researched and effective treatment for OCD, with response rates of 60–80% in well-run programmes. We prioritise placement with therapists and residential programs that are specifically trained in ERP, not just general CBT.",
  },
  {
    question: "My loved one refuses to go to therapy because they say the rituals keep them safe. What do we say?",
    answer:
      "This is core OCD logic — the rituals feel protective even though they maintain the cycle of anxiety. Our intervention is designed to gently challenge that logic with compassion, using evidence and the family's personal impact statements to help the loved one see that the rituals aren't keeping them safe — they're keeping them stuck.",
  },
  {
    question: "Is residential treatment necessary for OCD, or will outpatient work?",
    answer:
      "For mild to moderate OCD, outpatient ERP with a specialised therapist is often effective. For severe OCD — where rituals consume multiple hours a day, the family is deeply accommodating, or previous outpatient attempts have failed — residential or intensive outpatient (IOP) programs offer the structured environment needed for meaningful progress.",
  },
];

export default function OCDInterventionsPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">OCD Interventions</p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                OCD interventions —{" "}
                <span className="italic text-[#8FAC87]">when rituals have taken over the family</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"Severe obsessive-compulsive disorder can take over a family&apos;s daily life. We help families gently confront\n                avoidance, accommodation, and refusal of treatment — and connect loved ones with evidence-based OCD\n                specialists."}</AutoLinkedText>
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

      {/* Warning signs */}
      <section id="signs" className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Is It Time to Act?</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Warning signs a professional OCD intervention <span className="italic text-[#507969]">may be needed</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"OCD is one of the most treatable serious mental health conditions when matched with the right\n                exposure-and-response-prevention (ERP) program. These signs suggest your loved one — and your family —\n                are ready for professional intervention."}</AutoLinkedText>
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
                { number: "ERP", label: "Evidence-based focus", icon: "ri-loop-left-line" },
                { number: "Specialist", label: "OCD treatment network", icon: "ri-mental-health-line" },
                { number: "90+", label: "Day residential options", icon: "ri-home-smile-line" },
                { number: "Family", label: "Accommodation coaching", icon: "ri-group-line" },
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
              What families <span className="italic text-[#8FAC87]">misunderstand</span> about OCD
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
        <Image src={FAMILY_IMG} alt="A family breaking free from OCD accommodation" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"&ldquo;We were all prisoners of the rituals. The intervention set us free.&rdquo;"}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Family of a young adult with severe OCD"}</AutoLinkedText></p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              How a professional OCD intervention <span className="italic text-[#507969]">unfolds</span>
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

      <FaqAccordion title="OCD intervention questions, answered" faqs={OCD_FAQS} />

      <BottomCta
        title="OCD doesn't have to control the whole family"
        italicWord="family"
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

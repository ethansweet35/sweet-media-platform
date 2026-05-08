import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/how_to_plan_hero01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const STEPS = [
  {
    icon: "ri-search-2-line",
    title: "Decide whether an intervention is the right move",
    body: "An intervention is most appropriate when denial is entrenched, prior conversations have failed, and the situation is escalating. If your loved one has expressed willingness to seek help, a structured family meeting may be sufficient. When in doubt, a free consultation with a certified interventionist will clarify the right approach.",
  },
  {
    icon: "ri-group-line",
    title: "Assemble the intervention team",
    body: "Your team should be 4 to 8 people — those who matter most to your loved one and can stay calm under pressure. A spouse or partner, adult children or parents, a close sibling or two, trusted friends, and a certified interventionist to lead. Avoid anyone who cannot regulate their emotions during the conversation.",
  },
  {
    icon: "ri-compass-3-line",
    title: "Choose an intervention model",
    body: "Evidence-based models include the Johnson Model, ARISE®, and Systemic Family Intervention. Each fits different situations. Your interventionist will recommend a model based on your loved one's history, the substance or condition involved, and the family's readiness to participate.",
  },
  {
    icon: "ri-hospital-line",
    title: "Pre-arrange treatment",
    body: "An intervention without a treatment plan is a confrontation, not an intervention. Before the meeting, your interventionist will identify the appropriate level of care, contact the program, verify insurance, and arrange same-day admission. Your loved one should be able to say yes and walk straight into treatment.",
  },
  {
    icon: "ri-edit-2-line",
    title: "Write personal impact letters",
    body: "Every team member writes a letter to your loved one — specific, honest, and free of blame. The letters describe the impact of the addiction or crisis on you personally, express love, and state clearly what you are asking your loved one to do. Your interventionist coaches each person on tone, structure, and delivery.",
  },
  {
    icon: "ri-play-circle-line",
    title: "Rehearse the meeting",
    body: "Rehearsal is not optional. Your interventionist will walk the entire team through the meeting at least once — including how to respond if your loved one becomes angry, defensive, tries to negotiate, or attempts to leave. Every person should know their role before the day arrives.",
  },
  {
    icon: "ri-discuss-line",
    title: "Hold the intervention",
    body: "Choose a private, neutral location — usually a home, hotel meeting room, or the interventionist's office. Schedule for a time when your loved one is sober. Each person delivers their letter. The interventionist facilitates and presents the treatment offer. This is the moment everything has been building toward.",
  },
  {
    icon: "ri-flag-2-line",
    title: "Plan for every outcome — and follow through",
    body: "Most loved ones say yes — often within the first hour. But you must also plan for a no. Your interventionist will guide the family in setting clear, loving boundaries that hold. After treatment begins, the family's own recovery work continues — Al-Anon, Nar-Anon, family therapy, and ongoing coaching.",
  },
];

const KEY_PRINCIPLES = [
  { icon: "ri-heart-pulse-line", text: "Lead with love, not ultimatums" },
  { icon: "ri-shield-check-line", text: "Have treatment pre-arranged before the meeting" },
  { icon: "ri-team-line", text: "Keep the team small — 4 to 8 people maximum" },
  { icon: "ri-calendar-check-line", text: "Rehearse at least once before the day" },
  { icon: "ri-award-line", text: "Always use a certified interventionist" },
  { icon: "ri-refresh-line", text: "Plan for every outcome, including a no" },
];

const FAQS: Faq[] = [
  {
    question: "How long does it take to plan an intervention?",
    answer:
      "A well-planned intervention typically takes 3 to 7 days to organise. In urgent situations — active overdose risk, severe mental health crisis — we can mobilise within 24 to 48 hours. We don't recommend rushing the preparation, but we also never use process as a reason to delay when speed is critical.",
  },
  {
    question: "Should I tell my loved one an intervention is coming?",
    answer:
      "It depends on the model. The Johnson Model uses a planned surprise. ARISE® invites the loved one to participate from the beginning. We recommend the model that fits your loved one's personality and the family dynamic — not a one-size-fits-all approach. Your interventionist will guide this decision.",
  },
  {
    question: "What if my loved one walks out of the room?",
    answer:
      "This is one of the situations we rehearse for. An interventionist is trained to de-escalate walkouts, redirect defensive responses, and re-engage the person before they leave. We also prepare the family on how to respond if the person leaves — including boundary-setting and what comes next.",
  },
  {
    question: "Do I need a professional interventionist, or can we do it ourselves?",
    answer:
      "Families do occasionally attempt interventions without professional help. But the data is clear: interventions led by certified professionals have significantly higher rates of treatment acceptance and longer-lasting recovery. An untrained intervention can also inadvertently push your loved one further into denial.",
  },
  {
    question: "What is the cost of a professional intervention?",
    answer:
      "Costs vary based on the model, geographic location, and complexity of the situation. Most professional interventions range from $2,000 to $10,000. Many families find that this is one of the most cost-effective investments they can make — compared to the ongoing cost of addiction, legal issues, hospitalisations, and lost income.",
  },
  {
    question: "What if we already tried an intervention and it didn't work?",
    answer:
      "A previous failed intervention is common and is not a reason to give up. Most second and third interventions succeed — especially when led by a professional who can identify what went wrong the first time and correct it. Call us to discuss what happened and what a next attempt might look like.",
  },
];

export default function HowToPlanAnInterventionPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/50" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="max-w-2xl">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Family Planning Guide</p>
            <h1 className="font-heading mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              How to plan an intervention <span className="italic text-[#8FAC87]">that actually works</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-white/80">
              A practical 8-step guide for families preparing to confront a loved one&apos;s addiction or mental health crisis.
              Built on more than two decades of front-line intervention experience.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill"></i> Get Help Planning
              </a>
              <a
                href="#steps"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Read the guide <i className="ri-arrow-down-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Key principles */}
      <section className="bg-white py-20">
        <div className={CONTAINER}>
          <div className="mb-10">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Before You Begin</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              6 principles every family <span className="italic text-[#507969]">must understand</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_PRINCIPLES.map((p) => (
              <div key={p.text} className="flex items-center gap-4 rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7] px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#507969]">
                  <i className={`${p.icon} text-lg`}></i>
                </span>
                <span className="text-sm font-semibold text-[#1A1A17]">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8-step process */}
      <section id="steps" className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">The Complete Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              8 steps to a <span className="italic text-[#507969]">successful intervention</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4B4B4B]">
              These steps are the same process our certified interventionists use with every family. Skip steps at your peril — each one exists because skipping it has led to failed interventions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF]">
                <div className="relative flex-shrink-0">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3E5B50] text-white shadow-md">
                    <i className={`${step.icon} text-2xl`}></i>
                  </span>
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#1A1A17]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA strip */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Don&apos;t Do This Alone</p>
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                A professional makes the difference <span className="italic text-[#8FAC87]">between yes and no</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/75">
                Families that use a certified interventionist achieve significantly higher rates of treatment acceptance.
                We bring clinical expertise, pre-arranged treatment, and a proven process — you bring love.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion title="Intervention planning questions, answered" faqs={FAQS} />

      <BottomCta
        title="Ready to start planning?"
        italicWord="planning"
        body="Your first call is free, confidential, and judgment-free. We listen to your situation and tell you exactly what to do next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
        secondaryLabel="Take the Free Quiz First"
        secondaryHref="/intervention-quiz"
      />
    </main>
  );
}

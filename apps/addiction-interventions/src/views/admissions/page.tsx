import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/admissions_hero01.jpg`;
const PROCESS_IMG = `${SUPABASE_IMAGES}/admissions_process01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const WHAT_TO_EXPECT = [
  {
    icon: "ri-phone-line",
    title: "You will speak to a real person",
    body: "Not a call centre. Not an answering service. When you call, a certified interventionist picks up — someone who has done this work for years and will give you honest, clinical guidance from the first minute.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Everything is confidential",
    body: "Your call, your situation, your family's identity — none of it goes anywhere. We operate under the same confidentiality standards as licensed clinicians. Nothing you share is used for any purpose other than helping you.",
  },
  {
    icon: "ri-time-line",
    title: "The call takes about 20–30 minutes",
    body: "We ask the right questions — not to fill out a form, but to understand the full picture. History of use, previous treatment attempts, family dynamics, and current risk level. This information shapes every recommendation we make.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "You will leave with a clear next step",
    body: "We never end a call without telling you exactly what we recommend and why. Whether that is an immediate intervention, a structured family conversation, or a specific treatment referral — you will have a direction.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Call or fill out the form",
    body: "Reach us by phone at any hour or submit the contact form. We respond within minutes during business hours and have 24/7 availability for urgent situations.",
  },
  {
    icon: "ri-chat-3-line",
    title: "Free confidential consultation",
    body: "A certified interventionist listens to your situation, asks the right clinical questions, and gives you an honest assessment of what is happening and what is needed.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Custom intervention plan",
    body: "Based on what we learn, we design a plan — the right model, the right participants, the right treatment options pre-screened and ready. No template approaches.",
  },
  {
    icon: "ri-group-line",
    title: "Family preparation",
    body: "We coach every participant individually before the intervention day. What to say, how to hold boundaries, how to respond to resistance. No one enters unprepared.",
  },
  {
    icon: "ri-hospital-line",
    title: "Treatment placement",
    body: "Treatment is arranged in advance. When your loved one says yes, there is no delay — admission can happen the same day. We manage the logistics so you don't have to.",
  },
];

const FAQS: Faq[] = [
  {
    question: "How quickly can you get started?",
    answer: "For most situations, we can begin planning within 24–48 hours of your first call. For crisis situations — active overdose risk, suicidal ideation, or recent hospitalisation — we mobilise the same day. Call us regardless of the hour.",
  },
  {
    question: "What does the first call cost?",
    answer: "Nothing. Your initial consultation is completely free. We listen, assess, and advise without any financial commitment. If you decide to proceed, we will discuss service fees clearly and honestly before anything moves forward.",
  },
  {
    question: "Do I need to have everything figured out before I call?",
    answer: "Absolutely not. Most families call us in a state of confusion and exhaustion — unsure what to do, whether this is 'bad enough' to warrant an intervention, or how to even start the conversation. That is exactly where we start. You do not need to have answers before calling.",
  },
  {
    question: "What if my loved one finds out I called?",
    answer: "This is a common concern. In most cases, the loved one finding out that family is worried is not damaging — and sometimes it is a productive precursor to the intervention itself. We will advise you on how to handle this based on your specific situation.",
  },
  {
    question: "What if my family isn't ready?",
    answer: "Family readiness is something we help build. You may be ready even if others aren't. We work with families at different levels of willingness and help move the resistant members toward alignment — or help you proceed with those who are ready.",
  },
  {
    question: "What does an intervention actually cost?",
    answer: "Fees vary based on service scope — the intervention model, number of sessions, and any follow-up support. We are transparent about pricing on the call. We also have relationships with treatment programmes that can offset costs, and we work with families across all financial situations.",
  },
];

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="A family consulting with an interventionist" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/50" />
        <div className={`relative ${CONTAINER} py-24 lg:py-36`}>
          <div className="max-w-2xl">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Getting Started</p>
            <h1 className="font-heading mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              One call is all it <span className="italic text-[#8FAC87]">takes</span>
            </h1>
            <p className="mb-10 text-lg leading-relaxed text-white/80">
              <AutoLinkedText>{"You do not need to have everything figured out. You do not need to know exactly what kind of help you need. Call us, tell us what is happening, and we will take it from there."}</AutoLinkedText>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10">
                Send a message <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* What to expect */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Your First Call</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              What happens when you <span className="italic text-[#507969]">reach out</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4B4B4B]">
              <AutoLinkedText>{"Most families describe the first call as the moment the weight started to lift. Here is exactly what you can expect."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_TO_EXPECT.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF]">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3E5B50] text-white">
                  <i className={`${item.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading mb-3 text-lg font-bold text-[#1A1A17]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{item.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">The Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              From first call to <span className="italic text-[#507969]">treatment entry</span>
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

      {/* Image quote banner */}
      <section className="relative h-[420px] overflow-hidden">
        <Image src={PROCESS_IMG} alt="Interventionist walking alongside someone in early recovery" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"I didn't know what to say when I called. Within five minutes I felt like I finally had someone in my corner.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Mother who called us after 3 years of trying alone"}</AutoLinkedText></p>
        </div>
      </section>

      {/* Dark CTA strip */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">24/7 Availability</p>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                Crises don't wait for business hours. <span className="italic text-[#8FAC87]">Neither do we.</span>
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "ri-time-line", label: "Available 24 hours a day" },
                  { icon: "ri-shield-check-line", label: "100% confidential" },
                  { icon: "ri-hospital-line", label: "Same-day placement options" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#8FAC87]">
                      <i className={`${item.icon} text-lg`}></i>
                    </span>
                    <span className="text-sm font-semibold text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8FAC87] px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10">
                Send a message
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion title="Getting started — your questions answered" faqs={FAQS} />

      <BottomCta
        title="The hardest part is making the call"
        italicWord="call"
        body="Everything after that, we handle together. Free, confidential, no obligation."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

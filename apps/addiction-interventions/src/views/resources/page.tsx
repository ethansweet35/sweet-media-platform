import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/resources_hub_hero01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const ASSESSMENTS = [
  {
    icon: "ri-questionnaire-line",
    title: "Intervention Quiz",
    desc: "Ten honest questions about what you are observing. Get a clear, evidence-based read on whether a structured intervention is the right next step — anonymous, no email required.",
    href: "/intervention-quiz",
    tag: "2 min · Anonymous",
    color: "bg-[#8FAC87]",
  },
  {
    icon: "ri-link-m",
    title: "Codependency Assessment",
    desc: "Are you enabling without realising it? This self-check reveals the patterns running quietly underneath your family system — and why they matter for your loved one's recovery.",
    href: "/codependency-assessment",
    tag: "2 min · Anonymous",
    color: "bg-[#507969]",
  },
  {
    icon: "ri-time-line",
    title: "Is It Time for an Intervention?",
    desc: "Most families wait too long. Use this practical guide to honestly assess whether the situation has escalated to the point where professional intervention is warranted.",
    href: "/is-it-time-for-an-intervention",
    tag: "5 min read",
    color: "bg-[#3E5B50]",
  },
];

const GUIDES = [
  {
    icon: "ri-calendar-check-line",
    title: "How to Plan an Intervention for Success",
    desc: "A step-by-step planning guide for families built on two decades of front-line intervention experience. Covers team assembly, model selection, pre-arranged treatment, rehearsal, and what to do after.",
    href: "/how-to-plan-an-intervention-for-success",
    tag: "8-step guide",
  },
  {
    icon: "ri-search-eye-line",
    title: "Find Your Missing Loved One",
    desc: "When a family member disappears in the middle of a crisis, every minute matters. This guide covers every step — from filing a report to coordinating the intervention the moment they are found.",
    href: "/find-your-missing-loved-one",
    tag: "Crisis guide",
  },
];

const SUPPORT = [
  {
    icon: "ri-question-answer-line",
    title: "Frequently Asked Questions",
    desc: "Common questions about interventions, treatment, cost, timing, and what happens if your loved one says no. Honest answers from certified interventionists.",
    href: "/faqs",
    tag: "Reference",
  },
  {
    icon: "ri-article-line",
    title: "Blog & Articles",
    desc: "Expert articles on addiction, mental health, intervention strategies, family recovery, and everything in between — written by our clinical team.",
    href: "/blog",
    tag: "Ongoing",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/88 via-[#1A1A17]/70 to-[#1A1A17]/40" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="max-w-2xl">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Family Resource Center"}</AutoLinkedText></p>
            <h1 className="font-heading mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Tools and guides for <span className="italic text-[#8FAC87]">families in crisis</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-white/80">
              <AutoLinkedText>{"When you don&apos;t know what to do next, start here. Our assessments, planning guides, and crisis resources\n              are built from more than two decades of front-line intervention work — and they&apos;re all free."}</AutoLinkedText>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
              </a>
              <Link
                href="/intervention-quiz"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Take the free quiz <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* How to use this resource centre */}
      <section className="bg-[#F5F3E7] py-14">
        <div className={CONTAINER}>
          <div className="grid gap-6 text-base leading-relaxed text-[#4B4B4B] md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]"><AutoLinkedText>{"How to Use This Page"}</AutoLinkedText></p>
              <h2 className="font-heading mb-4 text-2xl font-bold leading-tight text-[#1A1A17] md:text-3xl">
                Start wherever you are in the process
              </h2>
              <p className="mb-3">
                <AutoLinkedText>{"Not every family arrives at this page with the same level of certainty. Some are in the middle of an acute crisis and need to act today. Others have been quietly watching a situation deteriorate for months and aren&apos;t sure whether what they are seeing is serious enough to warrant professional help. Most are somewhere in between — they know something is wrong but haven&apos;t been able to get their loved one to acknowledge it."}</AutoLinkedText>
              </p>
              <p>
                <AutoLinkedText>{"These resources are designed to meet you wherever you are. The self-assessments are a good starting point if you are still evaluating the situation. The planning guides are designed for families who are ready to move forward and want to understand what a structured intervention actually involves. The blog and FAQ cover the full range of questions that come up across the entire arc — from first concern through long-term recovery. And if you want to skip all of it and simply talk to someone, we are available 24 hours a day."}</AutoLinkedText>
              </p>
            </div>
            <div className="grid content-start gap-4">
              {[
                { icon: "ri-compass-3-line", title: "Not sure where to start?", body: "Take the 2-minute Intervention Quiz. It gives you an honest, evidence-based read on whether your loved one's situation warrants professional intervention — with no email and no judgment." },
                { icon: "ri-calendar-check-line", title: "Ready to plan?", body: "Go directly to our Planning Guide. It covers every step from assembling the right team to confirming a treatment bed before the intervention day." },
                { icon: "ri-phone-line", title: "In an active crisis?", body: "Skip the reading and call us now. We are available 24/7 and can help you assess the situation and mobilise a certified interventionist within hours." },
              ].map((tip) => (
                <div key={tip.title} className="flex items-start gap-4 rounded-2xl border border-[#EFEFEF] bg-white p-5 shadow-sm">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                    <i className={`${tip.icon} text-lg`}></i>
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#1A1A17]">{tip.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{tip.body}</AutoLinkedText></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Self-Assessments */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-12">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Start Here</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Free self-assessments — <span className="italic text-[#507969]">anonymous, 2 minutes</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4B4B4B]">
              <AutoLinkedText>{"Not sure if the situation warrants professional help? These tools give you an honest, evidence-based read\n              on what you are seeing — with no email, no signup, and no judgment."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {ASSESSMENTS.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group flex flex-col rounded-3xl border border-[#EFEFEF] bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF] transition hover:shadow-md hover:ring-[#8FAC87]/40"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${a.color} text-white`}>
                  <i className={`${a.icon} text-2xl`}></i>
                </div>
                <span className="mt-5 inline-flex items-center self-start rounded-full bg-[#F5F3E7] px-3 py-1 text-xs font-semibold text-[#507969]">
                  {a.tag}
                </span>
                <h3 className="font-heading mt-4 text-xl font-bold text-[#1A1A17] group-hover:text-[#507969]">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{a.desc}</AutoLinkedText></p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition-all group-hover:gap-2.5">
                  Start <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Family Guides */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mb-12">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">In-Depth Guides</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Step-by-step guides for <span className="italic text-[#507969]">families taking action</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4B4B4B]">
              <AutoLinkedText>{"Every guide is written by certified interventionists with real-world experience. No filler, no generic advice — just what actually works."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF] transition hover:shadow-md hover:ring-[#8FAC87]/40"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3E5B50] text-white">
                    <i className={`${g.icon} text-xl`}></i>
                  </span>
                  <span className="rounded-full bg-[#F5F3E7] px-3 py-1 text-xs font-semibold text-[#507969]">{g.tag}</span>
                </div>
                <h3 className="font-heading mt-6 text-2xl font-bold text-[#1A1A17] group-hover:text-[#507969]">{g.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{g.desc}</AutoLinkedText></p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition-all group-hover:gap-2.5">
                  Read the guide <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Support & Reference */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-12">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Reference & Support</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Answers, insights, and <span className="italic text-[#507969]">direct access to our team</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SUPPORT.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col rounded-3xl border border-[#EFEFEF] bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF] transition hover:shadow-md hover:ring-[#8FAC87]/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F3E7] text-[#507969]">
                  <i className={`${s.icon} text-xl`}></i>
                </span>
                <span className="mt-4 inline-flex items-center self-start rounded-full bg-[#F5F3E7] px-3 py-1 text-xs font-semibold text-[#507969]">{s.tag}</span>
                <h3 className="font-heading mt-4 text-xl font-bold text-[#1A1A17] group-hover:text-[#507969]">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{s.desc}</AutoLinkedText></p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition-all group-hover:gap-2.5">
                  Explore <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}

            {/* Phone card */}
            <div className="relative overflow-hidden rounded-3xl bg-[#3E5B50] p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#507969]/40" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#8FAC87]/20" />
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#8FAC87]">
                  <i className="ri-phone-fill text-xl"></i>
                </span>
                <h3 className="font-heading mt-6 text-xl font-bold text-white">Speak with an interventionist now</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  <AutoLinkedText>{"No voicemail, no wait. A certified interventionist will answer, listen to your situation, and tell you honestly what comes next."}</AutoLinkedText>
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomCta
        title="Not sure where to start?"
        italicWord="start"
        body="Take the 2-minute quiz or call us directly. Either way, we will meet you wherever you are — no judgment, no pressure, no cost."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
        secondaryLabel="Take the Free Quiz"
        secondaryHref="/intervention-quiz"
      />
    </main>
  );
}

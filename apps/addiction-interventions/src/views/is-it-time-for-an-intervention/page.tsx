import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/is_it_time_hero01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Your loved one's substance use or mental health symptoms are escalating month over month",
  "Direct conversations have failed or ended in arguments, denial, or false promises",
  "The behaviour is starting to harm their job, health, finances, or primary relationships",
  "Family members are arguing among themselves about how serious the problem is",
  "You are walking on eggshells to avoid triggering your loved one",
  "Children in the home are being affected — emotionally, physically, or in their daily routines",
  "You suspect your loved one is hiding the true extent of the problem from you",
  "There has been a recent crisis — overdose, DUI, hospital visit, or suicidal talk",
];

const URGENT_SIGNS = [
  "Recent overdose or near-overdose",
  "Active suicidal ideation or a plan",
  "Use of fentanyl, heroin, or unknown street drugs",
  "Severe withdrawal symptoms",
  "Acts of self-harm",
  "Threats of violence toward self or others",
];

const REASONS_FAMILIES_WAIT = [
  {
    icon: "ri-emotion-sad-line",
    reason: "\"I don't want to overreact.\"",
    truth: "The most common regret families share after an intervention is not that they acted too soon — it's that they waited years longer than they should have.",
  },
  {
    icon: "ri-user-heart-line",
    reason: "\"I don't want to embarrass them.\"",
    truth: "A well-run intervention is not an ambush or a public shaming. It is a structured, private conversation with people who love them.",
  },
  {
    icon: "ri-refresh-line",
    reason: "\"Maybe they'll turn it around on their own.\"",
    truth: "Addiction and untreated mental health conditions do not resolve on their own. They escalate. Early action consistently leads to better outcomes.",
  },
  {
    icon: "ri-close-circle-line",
    reason: "\"They'll refuse and it'll make things worse.\"",
    truth: "Refusal is not the end. Most people who initially refuse treatment accept it within weeks of a well-structured intervention — especially when the family holds its boundaries.",
  },
];

const FAQS: Faq[] = [
  {
    question: "Is there a specific threshold that means 'it's time'?",
    answer:
      "No. Waiting for rock bottom is a myth that has cost too many lives. The right time is whenever the substance use or mental health crisis is causing significant harm — and whenever the family is ready to act. A free consultation with an interventionist will help you assess the situation honestly.",
  },
  {
    question: "What if my loved one would never agree to an intervention?",
    answer:
      "Most people who would never agree to an intervention in the abstract say yes in the room — when they hear from the people they love most, with a concrete treatment plan in front of them. Refusal in advance is not a reliable predictor of what happens in a well-structured intervention.",
  },
  {
    question: "Should I wait for my loved one to hit rock bottom?",
    answer:
      "No. Rock bottom is a dangerous idea that has cost lives. For many people, the bottom has no floor. Early intervention — before severe legal, health, and relationship damage — leads to dramatically better treatment outcomes and faster, more lasting recovery.",
  },
  {
    question: "What if the problem isn't 'that bad' yet?",
    answer:
      "Earlier is almost always better. Mild to moderate addiction is significantly easier to treat than severe addiction. A family intervention when the problem is emerging — rather than entrenched — gives your loved one a much better chance at full recovery.",
  },
  {
    question: "My partner and I disagree about whether we need help. What do we do?",
    answer:
      "Family disagreement about the severity of the problem is extremely common — and it is often part of the family system that needs to shift. Call us for a confidential consultation. Speaking with an interventionist doesn't commit you to anything, but it will help you get aligned as a family.",
  },
  {
    question: "What should I do right now while I'm reading this?",
    answer:
      "If you're asking this question, the situation is already significant enough to warrant a professional opinion. Call us. The consultation is free, confidential, and takes about 15 minutes. You will walk away knowing exactly what stage you're in and what comes next.",
  },
];

export default function IsItTimeForAnInterventionPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/50" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="max-w-2xl">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Decision Guide</p>
            <h1 className="font-heading mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Is it time for an <span className="italic text-[#8FAC87]">intervention?</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-white/80">
              Most families wait too long. Use this guide to honestly assess whether your loved one&apos;s situation has
              reached the point where a structured intervention is the right next step.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill"></i> Speak With Us Now
              </a>
              <Link
                href="/intervention-quiz"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Take the 2-min quiz <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Warning signs + urgent signs */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Signs an Intervention May Be Needed</p>
              <h2 className="font-heading mb-6 text-4xl font-bold text-[#1A1A17] md:text-5xl">
                Warning signs you <span className="italic text-[#507969]">should not ignore</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                There is no magic threshold. But these are the patterns that, in our experience, signal that a
                structured intervention — not another conversation — is the right next step.
              </p>
              <ul className="grid gap-3">
                {SIGNS.map((sign) => (
                  <li key={sign} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                      <i className="ri-check-line text-xs"></i>
                    </span>
                    <span className="text-sm leading-relaxed text-[#4B4B4B]">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-3xl bg-[#3E5B50] p-8 text-white">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                  <i className="ri-alarm-warning-line text-xl"></i>
                </span>
                <p className="font-heading text-lg font-bold">Urgent — call us immediately</p>
              </div>
              <p className="mb-5 text-sm text-white/70">
                If any of the following are currently true, do not wait for the right time. Call us now.
              </p>
              <ul className="space-y-3">
                {URGENT_SIGNS.map((sign) => (
                  <li key={sign} className="flex items-center gap-3 text-sm font-medium text-white">
                    <i className="ri-error-warning-line shrink-0 text-red-400"></i>
                    {sign}
                  </li>
                ))}
              </ul>
              <a
                href={PHONE_HREF}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8FAC87] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Why families wait */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mb-12 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">The Hard Truth</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Why families wait — <span className="italic text-[#507969]">and why they shouldn&apos;t</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {REASONS_FAMILIES_WAIT.map((r) => (
              <div key={r.reason} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8FAC87]/15 text-[#507969]">
                  <i className={`${r.icon} text-xl`}></i>
                </span>
                <p className="mt-5 text-base font-semibold italic text-[#4B4B4B]">{r.reason}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#4B4B4B]">{r.truth}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-[#8FAC87]/30 bg-[#8FAC87]/10 p-6 text-center">
            <p className="text-base font-semibold text-[#3E5B50]">
              The most common regret we hear from families post-intervention is not &ldquo;we acted too soon.&rdquo;
            </p>
            <p className="mt-1 text-sm text-[#507969]">It is: &ldquo;We should have done this years ago.&rdquo;</p>
          </div>
        </div>
      </section>

      <FaqAccordion title="Questions about timing, answered honestly" faqs={FAQS} />

      <BottomCta
        title="If you're asking, the answer is probably yes"
        italicWord="yes"
        body="A 15-minute call with a certified interventionist will give you clarity. No obligation, no pressure — just experienced guidance on what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
        secondaryLabel="Take the Free Quiz"
        secondaryHref="/intervention-quiz"
      />
    </main>
  );
}

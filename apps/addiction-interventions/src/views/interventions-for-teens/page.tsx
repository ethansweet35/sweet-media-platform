import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/teens_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/teens_family01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const SIGNS = [
  "Dramatic withdrawal from family, close friends, and activities they previously loved",
  "Sudden academic decline — missed classes, failing grades, or school refusal",
  "Signs of substance use: smell, paraphernalia, bloodshot eyes, or unexplained missing money",
  "Self-harm — cutting, burning, or other behaviour used to manage emotional pain",
  "Eating disorder symptoms: restricting, binging, purging, or extreme body preoccupation",
  "Mood swings, rages, or emotional flatness that feel far beyond typical teen behaviour",
  "A circle of friends who have entirely changed — especially older or unknown peers",
  "You have found concerning things and they cannot explain them — or the explanation doesn't hold",
];

const MYTHS = [
  {
    icon: "ri-time-line",
    myth: `"They're just going through a phase — they'll grow out of it."`,
    truth:
      "Some teen behaviour is developmental. Substance use, self-harm, and serious mental health struggles are not phases — they are clinical issues that worsen with every month of delay. The adolescent brain is especially vulnerable to addiction forming quickly.",
  },
  {
    icon: "ri-user-heart-line",
    myth: `"An intervention will make them hate me forever."`,
    truth:
      "Most teens, when they reach recovery, express profound gratitude that their parents acted. What creates lasting resentment is abandonment — not love with boundaries. We have helped thousands of families through this conversation.",
  },
  {
    icon: "ri-school-line",
    myth: `"We'll wait until school is out / exams are done."`,
    truth:
      "There is never a convenient time. Academic performance is often already compromised. Many adolescent programs have academic components built in — so treatment does not have to mean losing the school year.",
  },
  {
    icon: "ri-shield-check-line",
    myth: `"A regular adult rehab will work — they're just younger."`,
    truth:
      "Adolescent brains are fundamentally different from adult brains. Teen-specific programs have age-appropriate therapy, school programming, family involvement, and clinical teams trained in adolescent development. Adult programs are rarely appropriate for teens.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Parent consultation",
    body: "We speak confidentially with parents first — understanding the full picture before any intervention is planned. We ask the clinical questions that help determine what level of care is appropriate.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Level of care assessment",
    body: "Teen intervention options range from intensive outpatient to wilderness therapy to residential. We match the level of care to the severity of what is happening — not the least disruptive option.",
  },
  {
    icon: "ri-group-line",
    title: "Family preparation",
    body: "We coach parents and key family members on how to speak to a teenager in crisis — different language, different tone, different consequences than for adults. Adolescent-specific coaching is critical.",
  },
  {
    icon: "ri-heart-line",
    title: "The intervention",
    body: "We facilitate in a way that keeps the teen from feeling ganged-up on while still delivering a clear message. The goal is a conversation that opens a door — not a confrontation that slams one shut.",
  },
  {
    icon: "ri-hospital-line",
    title: "Adolescent-specific placement",
    body: "We work with teen-focused programs only — with school programming, family therapy requirements, and clinicians trained in adolescent development. No adult facilities.",
  },
];

const TEENS_FAQS: Faq[] = [
  {
    question: "How are teen interventions different from adult interventions?",
    answer: "Teenagers in crisis need a fundamentally different approach. Adolescent brain development means the conversations have to be different, the consequences have to be different, and the treatment recommendation has to be different. We connect families with adolescent-specific programs that actually work for this age group.",
  },
  {
    question: "What if my teen refuses to go or runs away?",
    answer: "We prepare families for this possibility during the coaching phase. We also work with programs that have experience with resistant teens and can coordinate with educational consultants or therapeutic transport when clinically appropriate and legally supported.",
  },
  {
    question: "What is therapeutic transport?",
    answer: "Therapeutic transport companies specialise in safely and compassionately transporting resistant or flight-risk adolescents to treatment. They are trained professionals — not forceful — and the process is far less traumatic than parents expect. We only use companies with strong reputations and oversight.",
  },
  {
    question: "Can a teenager be sent to treatment without their consent?",
    answer: "In most states, parents retain medical decision-making authority over minor children, which includes the right to enrol them in mental health or substance use treatment. We can help you understand your rights and the legal options in your state.",
  },
  {
    question: "What kinds of programs are available for teens?",
    answer: "Options include therapeutic boarding schools, wilderness therapy programs, residential treatment centres, partial hospitalisation programs (PHP), and intensive outpatient programs (IOP). The right fit depends on severity, co-occurring issues, and how much family involvement is required.",
  },
  {
    question: "How involved will we be as parents during treatment?",
    answer: "Family involvement is a non-negotiable requirement we build into every program referral. Adolescent recovery happens within the family system — programs that exclude parents have worse outcomes. We only place with programs that have robust family therapy components.",
  },
];

export default function InterventionsForTeensPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Interventions for Teens"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Teen interventions — <span className="italic text-[#8FAC87]">different approach for a different brain</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"Teenagers in crisis require a clinically different intervention approach. We connect families with adolescent-specific programs — with the right language, consequences, and care levels — for substance use, self-harm, and serious mental health struggles."}</AutoLinkedText>
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                {["Adolescent-specific programs only", "Family involvement required", "School programming available"].map((t) => (
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
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Warning Signs</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Signs your teenager needs <span className="italic text-[#507969]">professional help now</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"The adolescent brain is uniquely vulnerable — patterns that take years to form in adults can develop in months in a teenager. Early action has a dramatically better outcome than waiting."}</AutoLinkedText>
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
                { number: "Specialist", label: "Adolescent programs only", icon: "ri-user-smile-line" },
                { number: "Family", label: "Strong parent involvement", icon: "ri-group-line" },
                { number: "90+", label: "Day options available", icon: "ri-home-smile-line" },
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

      {/* Myths — dark sage */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Why Parents Wait</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              What stops parents from <span className="italic text-[#8FAC87]">acting sooner</span>
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
        <Image src={FAMILY_IMG} alt="Parents supporting their teenager through intervention" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"We almost lost her before we found the courage to intervene. The right program saved our daughter.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Parents of a 16-year-old now thriving"}</AutoLinkedText></p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              How a teen intervention <span className="italic text-[#507969]">is different</span>
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

      <FaqAccordion title="Teen intervention questions, answered" faqs={TEENS_FAQS} />

      <BottomCta
        title="Your teen still has time on their side"
        italicWord="time"
        body="Your first call is free, confidential, and judgment-free. We'll tell you exactly what level of care your teen needs."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}

"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const steps = [
  {
    num: "01",
    icon: "ri-phone-line",
    title: "Call or Submit a Form",
    body: "Reach out by phone or our secure online form — whichever feels most comfortable. Our admissions coordinators answer every call, 24 hours a day, 7 days a week. Everything you share is 100% confidential.",
  },
  {
    num: "02",
    icon: "ri-shield-check-line",
    title: "Free Insurance Verification",
    body: "We verify your benefits within hours at absolutely no cost to you. Our team works directly with your insurance provider to clarify coverage, co-pays, and any out-of-pocket costs so there are no surprises.",
  },
  {
    num: "03",
    icon: "ri-stethoscope-line",
    title: "Clinical Assessment",
    body: "A licensed clinician conducts a comprehensive biopsychosocial evaluation to understand your history, current challenges, and goals. This determines the level of care — detox, PHP, IOP, or outpatient — that best matches your needs.",
  },
  {
    num: "04",
    icon: "ri-home-heart-line",
    title: "Intake & Begin Treatment",
    body: "Once your personalized treatment plan is in place, our team guides you through every step of intake. Same-day admissions are available. From the moment you arrive, you are surrounded by clinicians who are fully invested in your recovery.",
  },
];

const insuranceLogos = [
  { name: "Aetna", icon: "ri-shield-line" },
  { name: "Cigna", icon: "ri-shield-line" },
  { name: "Anthem Blue Cross", icon: "ri-shield-line" },
  { name: "United Healthcare", icon: "ri-shield-line" },
  { name: "Blue Shield of California", icon: "ri-shield-line" },
  { name: "Humana", icon: "ri-shield-line" },
  { name: "Magellan Health", icon: "ri-shield-line" },
  { name: "Beacon Health", icon: "ri-shield-line" },
];

const whatToExpect = [
  {
    icon: "ri-file-list-3-line",
    title: "Personalized Treatment Plan",
    body: "Within your first 24 hours, your clinical team completes a full assessment and develops an individualized care plan built around your specific history, needs, and goals.",
  },
  {
    icon: "ri-group-line",
    title: "Warm Team Introduction",
    body: "You'll meet your primary therapist, case manager, and medical team before your first full day of programming. We believe relationships are the foundation of recovery.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Structured Daily Schedule",
    body: "From group therapy to individual sessions, medication management, and wellness activities — your days are purposeful, evidence-based, and designed to build momentum.",
  },
  {
    icon: "ri-parent-line",
    title: "Family Communication",
    body: "With your consent, we keep loved ones informed and involve family in the therapeutic process when clinically appropriate — because healing often extends beyond the individual.",
  },
];

const faqs: FaqItem[] = [
  {
    q: "How long does the admissions process take?",
    a: "Most clients complete the admissions process — from initial call to intake — within 24 to 48 hours. In many cases, same-day admission is possible. Our team works urgently to remove every barrier to getting you started.",
  },
  {
    q: "Does Rize OC accept my insurance?",
    a: "We work with most major PPO insurance plans, including Aetna, Cigna, Anthem, United Healthcare, Blue Shield of California, Humana, Magellan, and Beacon Health. We verify your specific benefits at no cost before your first day. If you're unsure, call us and we'll find out together.",
  },
  {
    q: "What should I bring to intake?",
    a: "Bring a government-issued photo ID, your insurance card, a list of any current medications (or the bottles themselves), comfortable clothing for 5–7 days, and any personal comfort items that are important to you. Our team will provide a full packing list when you confirm your intake date.",
  },
  {
    q: "What if I can't afford treatment or don't have insurance?",
    a: "We believe financial barriers should not stand between anyone and life-saving care. Our admissions team will explore every available option — including out-of-pocket payment plans and state-funded alternatives — to help you access the treatment you need.",
  },
  {
    q: "Can I visit the facility before committing?",
    a: "Yes. We welcome tours of our Orange County facility. Many families and prospective clients find that seeing the environment and meeting the team helps them feel confident in their decision. Contact our admissions team to schedule a visit.",
  },
  {
    q: "Do you offer medically supervised detox?",
    a: "Yes. Our medical team supervises withdrawal management for alcohol, opioids, benzodiazepines, and other substances. We prioritize your safety and comfort throughout the detox process, which typically serves as the first phase of a comprehensive treatment plan.",
  },
  {
    q: "Can I keep my phone during treatment?",
    a: "Phone policies vary by program level and individual treatment plans. Our clinical team will discuss this with you during the assessment process. In most cases, structured phone access is incorporated into the daily schedule.",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">

      {/* ① Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden min-h-[88vh] flex flex-col justify-end">
        <Image
          src={`${BASE}/admissions_hero01.jpg`}
          alt="Rize OC admissions coordinator welcoming a new patient at the Orange County treatment center"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(44,48,46,0.65) 0%, rgba(44,48,46,0.25) 40%, rgba(44,48,46,0.55) 62%, rgba(44,48,46,0.96) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-[30px] lg:px-6 pb-20 pt-32">
          <div className="max-w-[760px]">
            <Eyebrow colorClass="text-accent">Admissions at Rize OC</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mb-6"
              style={{ fontSize: "clamp(50px, 6vw, 92px)", lineHeight: 0.95 }}
            >
              Begin Your<br />
              <em className="italic text-white/60">Recovery Today</em>
            </h1>
            <p className="text-[17px] font-light leading-relaxed text-white/85 max-w-[520px] mb-10">
              Our admissions process is simple, compassionate, and fast. Most clients are assessed and admitted within 24 hours — with insurance verified at no cost to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="tel:9494612620" variant="accent" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> Call (949) 461-2620
              </Button>
              <Button href="/verify-insurance" variant="outline-white" size="md">
                Verify My Insurance
              </Button>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { icon: "ri-lock-line",         text: "100% Confidential" },
              { icon: "ri-time-line",         text: "24/7 Admissions" },
              { icon: "ri-calendar-line",     text: "Same-Day Intake Available" },
              { icon: "ri-shield-check-line", text: "Most Insurance Accepted" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-sm`} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ② How It Works ─────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden py-[100px]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/5" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <Eyebrow colorClass="text-accent">Simple by Design</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4"
              style={{ fontSize: "clamp(32px, 3.6vw, 54px)", lineHeight: 1.05 }}
            >
              Four Steps to Starting
              <br />
              <em className="italic text-white/60">Your Recovery</em>
            </h2>
            <p className="mt-5 text-[15px] font-light text-white/75 leading-relaxed">
              We've designed our admissions process to remove every barrier between you and the care you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/8 overflow-hidden">
            {steps.map(({ num, icon, title, body }) => (
              <div key={num} className="bg-ink px-8 py-10 flex flex-col gap-5 relative">
                <span
                  className="absolute top-5 right-7 font-[family-name:var(--font-display)] font-normal text-white/4 select-none pointer-events-none"
                  style={{ fontSize: "clamp(60px, 6vw, 90px)", lineHeight: 1 }}
                  aria-hidden
                >
                  {num}
                </span>
                <IconCircle icon={icon} colorClass="bg-accent/15 text-accent" size="w-12 h-12 text-xl" />
                <div className="flex flex-col gap-3 relative z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Step {num}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-white leading-snug">
                    {title}
                  </h3>
                  <p className="text-[14px] font-light leading-[1.8] text-white/70">
                    <AutoLinkedTextClient>{body}</AutoLinkedTextClient>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="tel:9494612620" variant="accent" size="md">
              <i className="ri-phone-line mr-2 text-sm" /> Start Now — Call (949) 461-2620
            </Button>
          </div>
        </div>
      </section>

      {/* ③ What to Expect ───────────────────────────────────────────────── */}
      <SectionWrapper bg="bg-white" py="py-[100px]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">
          <div>
            <Eyebrow colorClass="text-accent">Your First Days</Eyebrow>
            <SectionHeader as="h2" className="mt-3">
              What to Expect<br />
              <span className="font-normal italic text-muted">When You Arrive</span>
            </SectionHeader>
            <p className="mt-6 text-[15px] leading-[1.85] text-ink/65">
              Arriving at a treatment center for the first time takes courage. We make sure every client is welcomed with warmth, clarity, and a team that is fully prepared for their arrival.
            </p>
            <p className="mt-4 text-[15px] leading-[1.85] text-ink/65">
              From the moment you walk through our doors, a dedicated care team guides you through orientation, initial assessments, and your first day of programming — ensuring you never feel lost or alone in the process.
            </p>
            <div className="mt-8">
              <Button href="tel:9494612620" variant="accent" size="sm">
                <i className="ri-phone-line mr-2 text-xs" /> Speak with Admissions
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {whatToExpect.map(({ icon, title, body }) => (
              <div key={title} className="flex flex-col gap-4 p-7 border border-warm/30 bg-cream">
                <IconCircle icon={icon} colorClass="bg-accent/10 text-accent" size="w-10 h-10 text-lg" />
                <div>
                  <h3 className="font-semibold text-ink text-[14px] leading-snug">{title}</h3>
                  <p className="mt-2 text-[13px] text-ink/60 leading-relaxed">
                    <AutoLinkedTextClient>{body}</AutoLinkedTextClient>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ④ Insurance ────────────────────────────────────────────────────── */}
      <SectionWrapper bg="bg-cream" py="py-[100px]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <Eyebrow colorClass="text-accent">Coverage & Cost</Eyebrow>
            <SectionHeader as="h2" className="mt-3">
              Most PPO Plans<br />
              <span className="font-normal italic text-muted">Accepted</span>
            </SectionHeader>
            <p className="mt-6 text-[15px] leading-[1.85] text-ink/65">
              We work directly with most major insurance providers to maximize your benefits and minimize your out-of-pocket costs. Our admissions team handles verification for you — at no charge — before your first day.
            </p>
            <p className="mt-4 text-[15px] leading-[1.85] text-ink/65">
              Don't have insurance or unsure of your coverage? Call us. We explore every available option — including self-pay rates and financial assistance — to make treatment accessible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/verify-insurance" variant="accent" size="sm">
                Verify My Benefits
              </Button>
              <Button href="tel:9494612620" variant="outline-ink" size="sm">
                <i className="ri-phone-line mr-2 text-xs" /> Call to Ask
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {insuranceLogos.map(({ name }) => (
              <div
                key={name}
                className="flex items-center gap-3 px-5 py-4 bg-white border border-warm/30"
              >
                <i className="ri-shield-check-line text-accent text-lg shrink-0" />
                <span className="text-[13px] font-medium text-ink leading-snug">{name}</span>
              </div>
            ))}
            <div className="col-span-2 flex items-center gap-3 px-5 py-4 bg-ink">
              <i className="ri-add-circle-line text-accent text-lg shrink-0" />
              <span className="text-[13px] font-medium text-white/80 leading-snug">
                And many more PPO plans — call to verify yours
              </span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ⑤ Accreditations ───────────────────────────────────────────────── */}
      <AccreditationsBar />

      {/* ⑥ FAQ ──────────────────────────────────────────────────────────── */}
      <SectionWrapper bg="bg-white" py="py-[100px]">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow colorClass="text-accent">Common Questions</Eyebrow>
            <SectionHeader as="h2" className="mt-3">
              Admissions<br />
              <span className="font-normal italic text-muted">FAQ</span>
            </SectionHeader>
            <p className="mt-6 text-[15px] leading-[1.85] text-ink/65">
              Still have questions? Our admissions coordinators are available 24/7 and happy to walk you through anything not answered here.
            </p>
            <div className="mt-8">
              <Button href="tel:9494612620" variant="accent" size="sm">
                <i className="ri-phone-line mr-2 text-xs" /> Call Us Now
              </Button>
            </div>
          </div>
          <div>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </SectionWrapper>

      {/* ⑦ CTA Banner ───────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-[100px]"
        style={{ background: "linear-gradient(135deg, #2c302e 0%, #3a3f3c 50%, #2c302e 100%)" }}
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/8" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/6" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6 text-center">
          <Eyebrow colorClass="text-accent">Ready to Begin?</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mx-auto"
            style={{ fontSize: "clamp(36px, 4vw, 64px)", lineHeight: 1.05, maxWidth: "700px" }}
          >
            Your Next Step Starts
            <br />
            <em className="italic text-white/65">With a Single Call</em>
          </h2>
          <p className="mt-6 text-[16px] font-light text-white/80 leading-relaxed max-w-[500px] mx-auto">
            Our admissions team is available 24/7. All calls are confidential. There is no obligation — just answers, support, and a clear path forward.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:9494612620" variant="accent" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
            <Button href="/contact" variant="outline-white" size="lg">
              Send Us a Message
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: "ri-lock-line",           text: "100% Confidential" },
              { icon: "ri-time-line",           text: "Available 24/7" },
              { icon: "ri-shield-check-line",   text: "No Obligation" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-sm`} />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

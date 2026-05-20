"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import InsuranceForm from "@/views/home/components/InsuranceForm";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

const features = [
  { icon: "ri-shield-fill",          title: "In-Network",         desc: "With most major PPO plans" },
  { icon: "ri-checkbox-circle-fill", title: "Free Verification",  desc: "No obligation — 100% confidential" },
  { icon: "ri-time-line",            title: "Same-Day Response",  desc: "We call within hours, not days" },
  { icon: "ri-headphone-fill",       title: "Dedicated Team",     desc: "Expert utilization review specialists" },
];

const coverageItems = [
  { icon: "ri-money-dollar-circle-line", title: "Out-of-Network Benefits",    desc: "Your coverage level and in/out-network status" },
  { icon: "ri-wallet-3-line",            title: "Deductible & Co-pays",       desc: "Exact out-of-pocket costs before treatment begins" },
  { icon: "ri-file-list-3-line",         title: "Authorization Requirements", desc: "Pre-certification and prior-approval process" },
  { icon: "ri-calendar-check-line",      title: "Length of Stay Coverage",    desc: "Approved treatment duration and level of care" },
];

const carriers = [
  "Aetna", "Anthem", "Blue Cross Blue Shield", "Cigna",
  "Humana", "Magellan", "MHN", "Optum",
  "United Healthcare", "Beacon Health", "Cenpatico",
];

const faqs = [
  {
    q: "How long does verification take?",
    a: "Our utilization review team typically contacts your insurance provider within 2–4 hours on business days. In many cases, we can provide a same-day response.",
  },
  {
    q: "Is the verification process confidential?",
    a: "Yes. All inquiries are completely confidential under HIPAA regulations. We will never share your information without your explicit written consent.",
  },
  {
    q: "What if I don't have insurance?",
    a: "We offer flexible private-pay options and financing solutions. Contact our admissions team to discuss a plan that works for your situation.",
  },
  {
    q: "Does Rize accept Medi-Cal or Medicaid?",
    a: "We currently do not accept Medi-Cal, Medicaid, or Medical. We accept most commercial PPO plans. Our team can help clarify your specific plan.",
  },
  {
    q: "Will calling affect my coverage or rates?",
    a: "No. Verifying benefits is an informational inquiry and has no effect on your premiums, coverage, or insurance record.",
  },
];

export default function VerifyInsurancePage() {
  return (
    <main className="min-h-screen">

      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden min-h-[75vh]">
        <Image
          src={`${BASE}/verify-insurance_hero01.jpg`}
          alt="Rize OC admissions specialist reviewing insurance coverage with a prospective client in a warm, professional consultation room"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(44,48,46,0.55) 0%, rgba(44,48,46,0.25) 40%, rgba(44,48,46,0.70) 70%, rgba(44,48,46,0.97) 100%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1300px] px-[30px] lg:px-6 pb-16 lg:pb-20">
          <div className="max-w-[680px]">
            <Eyebrow colorClass="text-accent">Insurance Verification</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mb-6"
              style={{ fontSize: "clamp(48px, 5.5vw, 86px)", lineHeight: 0.95 }}
            >
              Verify Your
              <br />
              <em className="italic text-white/60">Coverage Today</em>
            </h1>
            <p className="text-[16px] font-light leading-relaxed text-white/80 max-w-[500px] mb-10">
              <AutoLinkedTextClient>{"Our dedicated team contacts your insurance provider directly — for free, with no obligation — so you can focus entirely on taking the first step."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#verify-form"
                className="inline-flex items-center bg-accent text-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-accent/90 transition-colors"
              >
                Check My Benefits <i className="ri-arrow-down-line ml-2 text-xs" />
              </a>
              <Button href="tel:9494612620" variant="outline-white" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> (949) 461-2620
              </Button>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { icon: "ri-lock-line",         text: "100% Confidential" },
              { icon: "ri-time-line",         text: "Same-Day Response" },
              { icon: "ri-shield-check-line", text: "No Obligation" },
              { icon: "ri-award-line",        text: "Most PPOs Accepted" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-sm`} />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ②  4 feature tiles ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[80px]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="border border-soft bg-cream-tile p-8 flex flex-col items-center text-center">
                <i className={`${icon} text-accent text-4xl mb-5`} />
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-ink">{title}</h3>
                <p className="mt-2 text-[14px] font-light text-ink/55"><AutoLinkedTextClient>{desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ③  Verify Coverage + Form ───────────────────────────────────────── */}
      <section id="verify-form" className="bg-cream scroll-mt-24">
        <SectionWrapper py="py-[100px]">
          <SectionHeader
            eyebrow="Start Today"
            eyebrowColorClass="text-ink/45"
            heading={<>Understand Your Benefits <br /><em className="italic text-muted font-normal">Before You Commit</em></>}
            headingStyle={{ fontSize: "clamp(38px, 4vw, 56px)" }}
            body="Navigating behavioral health benefits can be overwhelming. Our utilization review team handles the call for you — and walks you through every line of your coverage."
            mb="mb-14"
          />

          <div className="grid lg:grid-cols-[1fr_1fr] gap-0 items-start bg-cream-alt">
            {/* Left — what we check */}
            <div className="px-12 py-14 lg:px-16 lg:py-16">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent mb-5">What We Verify</p>
              <div className="flex flex-col gap-6 mb-10">
                {coverageItems.map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <IconCircle icon={icon} colorClass="bg-accent/15 text-accent" size="w-9 h-9 text-base shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[15px] font-medium text-ink leading-snug"><AutoLinkedTextClient>{title}</AutoLinkedTextClient></p>
                      <p className="text-[13px] font-light text-ink/60 mt-0.5"><AutoLinkedTextClient>{desc}</AutoLinkedTextClient></p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carriers */}
              <div>
                <Eyebrow colorClass="text-ink/45" tracking="wide" className="mb-4">Plans We Accept</Eyebrow>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-5">
                  {carriers.map((c) => (
                    <p key={c} className="text-[13px] font-medium text-ink flex items-center gap-2">
                      <i className="ri-check-line text-accent text-xs" /> {c}
                    </p>
                  ))}
                </div>
                <p className="text-[12px] font-light text-ink/45">
                  <AutoLinkedTextClient>{"We do not accept Medi-Cal, Medicaid, or Medical."}</AutoLinkedTextClient>
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-7">
                <IconCircle icon="ri-shield-fill" variant="ink" size="sm" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">Free Verification</p>
                  <p className="text-xs text-ink/45 mt-0.5"><AutoLinkedTextClient>{"Results in hours — no cost, no obligation"}</AutoLinkedTextClient></p>
                </div>
              </div>
              <InsuranceForm showNotesField />
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ④  How It Works ─────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden py-[100px]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/5" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6">
          <div className="mb-14 text-center max-w-xl mx-auto">
            <Eyebrow colorClass="text-accent">The Process</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4"
              style={{ fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Simple. Fast.
              <br />
              <em className="italic text-white/60">Completely Free.</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/8 overflow-hidden">
            {[
              { step: "01", icon: "ri-file-text-line",      title: "Submit the Form",         desc: "Fill out the short form above with your name, insurance provider, and policy number." },
              { step: "02", icon: "ri-phone-line",          title: "We Call Your Insurer",    desc: "Our utilization review team contacts your insurance provider directly on your behalf." },
              { step: "03", icon: "ri-file-search-line",    title: "Benefits Reviewed",       desc: "We analyze your deductible, co-pays, authorization requirements, and approved length of stay." },
              { step: "04", icon: "ri-checkbox-circle-line","title": "You Get Clear Answers", desc: "We walk you through exactly what is covered, what your costs will be, and what to expect." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="bg-ink px-8 py-10 flex flex-col gap-5 relative">
                <span
                  className="absolute top-6 right-6 font-[family-name:var(--font-display)] font-normal text-white/5 select-none pointer-events-none"
                  style={{ fontSize: "clamp(60px, 6vw, 90px)", lineHeight: 1 }}
                  aria-hidden
                >
                  {step}
                </span>
                <IconCircle icon={icon} colorClass="bg-accent/15 text-accent" size="w-11 h-11 text-xl relative z-10" />
                <div className="relative z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent mb-2">Step {step}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-white mb-3">{title}</h3>
                  <p className="text-[14px] font-light text-white/70 leading-relaxed"><AutoLinkedTextClient>{desc}</AutoLinkedTextClient></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤  FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[100px]">
          <div className="grid lg:grid-cols-[420px_1fr] gap-16 xl:gap-24">
            {/* Left — heading + CTA */}
            <div className="lg:sticky lg:top-28 self-start">
              <Eyebrow colorClass="text-accent">Common Questions</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
                style={{ fontSize: "clamp(30px, 3vw, 46px)", lineHeight: 1.08 }}
              >
                Insurance Questions,
                <br />
                <em className="italic text-muted">Answered Clearly.</em>
              </h2>
              <p className="mt-5 text-[15px] font-light text-ink/65 leading-relaxed">
                <AutoLinkedTextClient>{"Understanding your benefits should not require a law degree. We have simplified the most common questions so you can make a confident decision."}</AutoLinkedTextClient>
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Button href="#verify-form" variant="accent" size="sm">
                  Verify My Insurance <i className="ri-arrow-up-line ml-2 text-xs" />
                </Button>
                <Button href="tel:9494612620" variant="outline-ink" size="sm">
                  <i className="ri-phone-line mr-2 text-xs" /> Speak With Admissions
                </Button>
              </div>
            </div>

            {/* Right — FAQ list */}
            <div className="flex flex-col divide-y divide-warm/30">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-7">
                  <p className="text-[15px] font-semibold text-ink mb-3 flex items-start gap-3">
                    <i className="ri-question-line text-accent text-lg mt-0.5 shrink-0" />
                    {q}
                  </p>
                  <p className="text-[14px] font-light text-ink/65 leading-relaxed pl-7"><AutoLinkedTextClient>{a}</AutoLinkedTextClient></p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑥  Accreditations ──────────────────────────────────────────────── */}
      <AccreditationsBar />

      {/* ⑦  CTA Banner ──────────────────────────────────────────────────── */}
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
            style={{ fontSize: "clamp(34px, 4vw, 60px)", lineHeight: 1.05, maxWidth: "680px" }}
          >
            Most People Have More
            <br />
            <em className="italic text-white/65">Coverage Than They Think</em>
          </h2>
          <p className="mt-6 text-[16px] font-light text-white/80 leading-relaxed max-w-[500px] mx-auto">
            <AutoLinkedTextClient>{"Let us find out what your plan actually covers. The call is free, confidential, and takes less than five minutes."}</AutoLinkedTextClient>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#verify-form"
              className="inline-flex items-center bg-accent text-white px-10 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-accent/90 transition-colors"
            >
              Check My Benefits
            </a>
            <Button href="tel:9494612620" variant="outline-white" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}

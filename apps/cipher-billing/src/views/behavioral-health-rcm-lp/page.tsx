"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TEL_DISPLAY = "949-676-2252";
const TEL_HREF = "tel:9496762252";
const LOGO_SRC =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/HORIZONTAL-LOGO_CIPHER-BLACK_TRANSPARENT-BG-1024x262.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const metrics = [
  { value: "$1,821", label: "Avg. Inpatient Day Rate" },
  { value: "$1,149", label: "Avg. Outpatient Day Rate" },
  { value: "9 Min", label: "Eligibility Turnaround" },
  { value: "100%", label: "Pre-Payment Review Pass Rate" },
  { value: "30 Days", label: "To First Payment" },
  { value: "10+ Yrs", label: "Behavioral Health Expertise" },
];

const beforeAfterRows = [
  {
    label: "Eligibility Verification",
    before: { value: "30 min", note: "Industry average turnaround" },
    after: { value: "9 min", note: "Cipher average turnaround" },
  },
  {
    label: "First-Pass Claim Acceptance",
    before: { value: "~65%", note: "Typical behavioral health biller" },
    after: { value: "97%+", note: "Cipher clean claim rate" },
  },
  {
    label: "Denial Follow-Up",
    before: { value: "Written off", note: "Most billers abandon denials" },
    after: { value: "100% pursued", note: "Every denial appealed" },
  },
  {
    label: "Time to First Payment",
    before: { value: "60–90 days", note: "Typical onboarding lag" },
    after: { value: "30 days", note: "Cipher onboarding guarantee" },
  },
  {
    label: "Pre-Payment Review",
    before: { value: "Clawbacks happen", note: "Documentation gaps trigger audits" },
    after: { value: "0 clawbacks", note: "100% pre-payment pass rate" },
  },
  {
    label: "Your Point of Contact",
    before: { value: "Call center", note: "Anonymous reps, long hold times" },
    after: { value: "Named executive", note: "Dedicated Partner Experience Exec" },
  },
];

const revenueImpact = [
  {
    type: "Psychiatry Practice",
    volume: "80 sessions/mo",
    before: "$18,400",
    after: "$26,800",
    gain: "+$8,400/mo",
    note: "Recovered via proper 99214 coding + psychotherapy add-ons",
  },
  {
    type: "IOP Program",
    volume: "25 patients/mo",
    before: "$41,200",
    after: "$67,500",
    gain: "+$26,300/mo",
    note: "H-code optimization + concurrent review compliance",
  },
  {
    type: "Detox Facility",
    volume: "15 beds avg census",
    before: "$89,000",
    after: "$134,000",
    gain: "+$45,000/mo",
    note: "Per diem billing accuracy + ASAM documentation",
  },
];

const practiceTypes = [
  { num: "01", title: "Medical Billing for Psychiatrists", body: "Specialized psychiatric billing capturing every CPT code — medication management, psychotherapy add-ons, prior authorizations, and payer-specific appeals." },
  { num: "02", title: "Medical Billing for Psychologists", body: "Comprehensive billing for psychological testing, evaluation, and therapy. Proper documentation and coding for all assessment CPT codes to maximize reimbursement." },
  { num: "03", title: "IOP & PHP Billing", body: "Intensive Outpatient and Partial Hospitalization Program billing with H-code expertise, utilization review documentation, and concurrent review processes." },
  { num: "04", title: "Detox & Residential Treatment Billing", body: "Expert billing for detoxification and residential addiction treatment facilities — including per diem billing, ASAM level-of-care documentation, and payer-specific authorization management." },
  { num: "05", title: "Addiction Treatment Center Billing", body: "Full revenue cycle management for substance use disorder treatment programs. We handle H-codes, HCPCS codes, and the complex prior authorization requirements unique to addiction treatment." },
  { num: "06", title: "Mental Health Billing Services", body: "Expert billing for outpatient practices, group practices, and community mental health centers. We navigate complex payer rules so your revenue cycle runs smoothly." },
  { num: "07", title: "Private Practice Billing", body: "Tailored billing solutions for solo and small group private practices. We handle the administrative burden so you spend more time with patients." },
  { num: "08", title: "Behavioral Health RCM", body: "End-to-end revenue cycle management built specifically for behavioral health and addiction treatment — from eligibility verification to final payment posting." },
  { num: "09", title: "Psychiatric Billing Services", body: "Dedicated billing for inpatient and outpatient settings, including E&M levels, time-based billing, and collaborative care models." },
  { num: "10", title: "Sober Living & Outpatient Billing", body: "Billing support for sober living facilities and outpatient addiction programs — ensuring proper coding, documentation, and reimbursement at every level of care." },
];

const whyCipherStats = [
  { value: "9 Min", label: "Eligibility Turnaround", body: "Industry standard is 30 minutes. We verify eligibility in 9 minutes on average — catching coverage issues before they become denials." },
  { value: "100%", label: "Pre-Payment Review Pass Rate", body: "Our documentation and compliance teams ensure every claim passes pre-payment review the first time, every time." },
  { value: "30 Days", label: "To First Payment", body: "From onboarding to your first payment in 30 days. Our audit-based onboarding gets your documentation pristine before a single claim is submitted." },
  { value: "1:1", label: "Dedicated Partner Executive", body: "You get a named Partner Experience Executive — not a call center. Real-time insights, proactive guidance, and a direct line when you need answers." },
];

const processSteps = [
  { num: "01", label: "Discovery", title: "Comprehensive Documentation Audit", body: "We start with a deep-dive audit of your current billing documentation, coding practices, and payer contracts — identifying compliance gaps and missed revenue before a single claim is touched.", note: "\"Most practices discover 15–25% in recoverable revenue during this step alone.\"", badge: "Completed within 5 business days" },
  { num: "02", label: "Foundation", title: "Workflow Optimization & Setup", body: "We rebuild your billing workflow around behavioral health best practices — coding protocols, documentation standards, and payer-specific rules baked in from day one.", note: null, badge: null },
  { num: "03", label: "Integration", title: "Seamless EMR Connection", body: "We establish a frictionless connection with your existing EMR/EHR system with zero disruption to clinical operations or patient care.", note: null, badge: null },
  { num: "04", label: "Execution", title: "Clean Claim Submission", body: "Every claim passes a pre-billing audit before it's submitted — catching errors before payers do and maximizing your first-pass acceptance rate.", note: null, badge: null },
  { num: "05", label: "Recovery", title: "Aggressive A/R & Denial Management", body: "We pursue every outstanding claim and appeal every denial. Nothing is written off without a full fight — including escalation to payer commissioners when necessary.", note: null, badge: null },
  { num: "06", label: "Visibility", title: "Transparent Reporting & Insights", body: "Monthly reconciliation reports, real-time revenue dashboards, and a dedicated Partner Executive who proactively flags issues before you even notice them.", note: null, badge: null },
];

const problems = [
  {
    problem: "Denials pile up with no follow-through",
    problemBody: "Your previous biller submits claims and moves on. Denials sit unworked for weeks — or get written off entirely.",
    fix: "We appeal every single denial. Our A/R team tracks every outstanding claim until it's resolved or exhausted. Nothing gets written off without a fight.",
  },
  {
    problem: "Eligibility isn't verified until it's too late",
    problemBody: "Coverage issues surface after services are rendered — leaving you holding the bill for sessions that were never going to be paid.",
    fix: "We verify eligibility in 9 minutes on average, before every appointment. Coverage gaps are caught before they become your problem.",
  },
  {
    problem: "Wrong codes, undercoded, or upcoded claims",
    problemBody: "Generic billers don't know behavioral health CPT codes. They undercode psychiatric sessions, miss add-on codes, and leave thousands on the table every month.",
    fix: "Our team is trained exclusively in behavioral health coding — from psychiatric E&M levels and psychotherapy add-ons to H-codes for IOP/PHP. Every code is optimized and compliant.",
  },
  {
    problem: "No one to call when something goes wrong",
    problemBody: "You're routed to a call center, put on hold, or passed between reps who don't know your account. Problems linger for weeks.",
    fix: "Every Cipher client has a named Partner Experience Executive — a real person who knows your practice, answers directly, and proactively flags issues before you even notice them.",
  },
  {
    problem: "Pre-payment reviews fail and trigger clawbacks",
    problemBody: "Payers audit your documentation and claw back payments months after the fact — creating cash flow chaos and compliance risk.",
    fix: "Our documentation and compliance teams review every claim before submission. Our pre-payment review pass rate is 100% — zero clawbacks.",
  },
  {
    problem: "Onboarding takes months and disrupts your practice",
    problemBody: "Switching billers feels like a massive undertaking. Revenue stalls during the transition and your team is left scrambling.",
    fix: "Our audit-based onboarding is designed for speed and zero disruption. Most clients are fully operational and receiving their first payments within 30 days.",
  },
];

const billingCodeTabs = [
  {
    id: "psychiatry",
    label: "Psychiatry",
    codes: [
      { code: "99213 / 99214", name: "Established Patient E&M", description: "The most commonly undercoded psychiatric visit. 99214 requires medical decision-making of moderate complexity — which most 20–30 min medication management visits qualify for. Many billers default to 99213 and leave $40–80 per visit on the table.", best: "Document time spent, complexity of problems addressed, and prescription drug management to support 99214 or higher." },
      { code: "90833 / 90836 / 90838", name: "Psychotherapy Add-On Codes", description: "Add-on codes for psychotherapy performed during the same session as E&M. 90833 adds 16–37 min of therapy to 99213/99214. Most billers miss these entirely.", best: "Always document psychotherapy time separately from E&M time to support add-on code billing." },
      { code: "99354 / 99355", name: "Prolonged Services", description: "Billable when total time exceeds the typical time for an E&M code. Often missed even when time documentation clearly supports it.", best: "Track total face-to-face time per visit. Anything over 40 min for established patients may qualify for prolonged service add-ons." },
    ],
  },
  {
    id: "iop",
    label: "IOP / PHP",
    codes: [
      { code: "H0015", name: "Intensive Outpatient Services", description: "Substance use disorder IOP — per diem billing for 3+ hours/day, 3+ days/week. Requires specific utilization review documentation and concurrent review submissions.", best: "Ensure ASAM level-of-care criteria are documented at every utilization review point to protect authorization." },
      { code: "S9480", name: "Intensive Outpatient Psych", description: "Mental health IOP for 3+ hours/day. Documentation must support medical necessity at each level of care review.", best: "Document functional impairment, treatment goals, and clinical progress at every session to support continued stay." },
      { code: "H0035", name: "Partial Hospitalization", description: "PHP — 20+ hours/week of structured programming. Payer-specific documentation and authorization rules vary significantly.", best: "Review payer-specific PHP policies for each patient's insurance. Document all modalities and clinical justification per session." },
    ],
  },
  {
    id: "psychology",
    label: "Psychology",
    codes: [
      { code: "90791", name: "Psychiatric Diagnostic Evaluation", description: "Initial intake and evaluation for new patients. Includes clinical history, mental status exam, and diagnostic formulation.", best: "Document all components of the psychiatric interview and include DSM-5 diagnostic impressions to support medical necessity." },
      { code: "96130 / 96131", name: "Psychological Testing", description: "Psychological testing evaluation — 96130 covers the first hour of evaluation services, 96131 each additional hour.", best: "Maintain detailed test administration logs and interpretation notes to support each hour billed." },
      { code: "96136 / 96137", name: "Psychological Test Administration", description: "Administration and scoring by a technician under supervision. Frequently missed add-on revenue for testing practices.", best: "Ensure proper supervision documentation is in place and that the technician's credentials are clearly noted." },
    ],
  },
  {
    id: "therapy",
    label: "Therapy",
    codes: [
      { code: "90837", name: "Individual Therapy 60 min", description: "The highest-reimbursing individual therapy code. Requires 53+ minutes of face-to-face psychotherapy. Often underbilled when sessions run slightly short.", best: "Track session time carefully. If consistently running 45–52 min, shift to 90834 rather than leaving 90837 underdocumented." },
      { code: "90847", name: "Family Therapy With Patient", description: "Family psychotherapy with the patient present. Higher reimbursement than without-patient codes and often missed entirely.", best: "When spouses or family members are included in session with the patient present, bill 90847 — not 90837." },
      { code: "90853", name: "Group Psychotherapy", description: "Group therapy — one of the most under-optimized areas in outpatient behavioral health billing.", best: "Ensure group size is within payer limits (typically 3–8 patients), document each participant's attendance and participation." },
    ],
  },
];

const faqs = [
  {
    q: "What types of behavioral health billing services does Cipher offer?",
    a: "Cipher Billing provides comprehensive behavioral health billing services including medical billing for psychiatrists, psychologists, mental health therapists, IOP programs, PHP programs, detox facilities, and private practice billing. We handle the full revenue cycle — from eligibility verification and prior authorization to claim submission, denial management, and payment posting.",
  },
  {
    q: "Do you specialize in mental health medical billing specifically?",
    a: "Yes. Mental health medical billing is our core specialty. Unlike general medical billing companies, we understand the nuances of behavioral health coding — including psychiatric CPT codes, H-codes for IOP/PHP, psychological testing codes, and the complex payer rules that govern mental health reimbursement.",
  },
  {
    q: "How does Cipher handle IOP billing?",
    a: "IOP billing is one of our core specialties. We manage the full H-code billing process, including H0015 and related codes, utilization review documentation, concurrent review submissions, and payer-specific authorization requirements.",
  },
  {
    q: "How quickly will I receive my first payment after switching to Cipher?",
    a: "Most clients receive their first payment within 30 days of onboarding. Our audit-based onboarding process ensures your documentation is clean and your claims are submission-ready quickly.",
  },
  {
    q: "What makes Cipher different from other behavioral health billing companies?",
    a: "Three things set us apart: (1) Speed — our eligibility turnaround averages 9 minutes vs. the industry standard of 30 minutes. (2) Compliance — our 100% pre-payment review passing rate means zero clawbacks. (3) Partnership — every client gets a dedicated Partner Experience Executive, not a call center.",
  },
  {
    q: "Do you work with private practice billing for small mental health practices?",
    a: "Yes. We work with practices of all sizes — from solo private practice therapists and psychiatrists to large multi-provider behavioral health organizations. Small practices often see the biggest percentage gains because we catch inefficiencies that have gone unnoticed.",
  },
  {
    q: "What EMR/EHR systems do you integrate with?",
    a: "We integrate with all major EMR/EHR systems used in behavioral health, including Epic, Athena Health, AdvancedMD, TherapyNotes, SimplePractice, Kareo, DrChrono, and many others.",
  },
  {
    q: "Is there a contract or long-term commitment required?",
    a: "We believe in earning your business every month. We offer flexible arrangements without long-term lock-in contracts. Our clients stay because of results, not because they're trapped.",
  },
];

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Cipher", href: "#why-cipher" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Common Issues", href: "#common-issues" },
  { label: "Billing Codes", href: "#billing-codes" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const inputBase =
  "w-full rounded border border-[#166C96]/30 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#166C96] transition-colors";

function FieldLabel({ id, text, required }: { id: string; text: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
      {text}{required && <span className="ml-0.5 text-[#166C96]">*</span>}
    </label>
  );
}

function LpLeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => { if (typeof v === "string") payload[k] = v; });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) { setStatus("error"); setErrorMsg(data.error ?? "Something went wrong. Please try again."); return; }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[#166C96]/40 bg-[#166C96]/15 px-5 py-6 text-center" role="status">
        <i className="ri-check-double-line text-3xl text-[#166C96]" />
        <p className="mt-3 text-sm font-medium text-white">Thank you — a billing specialist will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate suppressHydrationWarning>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <FieldLabel id="f-first" text="First Name" required />
          <input id="f-first" name="firstName" autoComplete="given-name" required placeholder="First Name" className={inputBase} />
        </div>
        <div className="grid gap-1.5">
          <FieldLabel id="f-last" text="Last Name" required />
          <input id="f-last" name="lastName" autoComplete="family-name" required placeholder="Last Name" className={inputBase} />
        </div>
      </div>
      <div className="grid gap-1.5">
        <FieldLabel id="f-email" text="Email Address" required />
        <input id="f-email" name="email" type="email" autoComplete="email" required placeholder="Email Address" className={inputBase} />
      </div>
      <div className="grid gap-1.5">
        <FieldLabel id="f-phone" text="Phone Number" required />
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" required placeholder="Phone Number" className={inputBase} />
      </div>
      <div className="grid gap-1.5">
        <FieldLabel id="f-org" text="Practice / Facility Name" />
        <input id="f-org" name="service" autoComplete="organization" placeholder="Practice / Facility Name" className={inputBase} />
      </div>
      <div className="grid gap-1.5">
        <FieldLabel id="f-type" text="Practice Type" />
        <select
          id="f-type"
          name="practiceType"
          className="w-full rounded border border-[#166C96]/30 bg-[#0a1428] px-3.5 py-2.5 text-sm text-white/70 outline-none focus:border-[#166C96] transition-colors"
          defaultValue=""
        >
          <option value="" disabled>Select Practice Type</option>
          <option value="Psychiatry Practice">Psychiatry Practice</option>
          <option value="Psychology Practice">Psychology Practice</option>
          <option value="Mental Health Therapy">Mental Health Therapy</option>
          <option value="IOP Program">IOP Program</option>
          <option value="PHP Program">PHP Program</option>
          <option value="Detox / Residential">Detox / Residential</option>
          <option value="Private Practice">Private Practice</option>
          <option value="Group Practice">Group Practice</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="grid gap-1.5">
        <div className="flex items-center justify-between">
          <FieldLabel id="f-msg" text="How Can We Help?" />
          <span className="text-[10px] text-white/30">{charCount}/500</span>
        </div>
        <textarea
          id="f-msg"
          name="message"
          rows={4}
          maxLength={500}
          placeholder="Tell us about your practice…"
          onChange={(e) => setCharCount(e.target.value.length)}
          className={`min-h-[100px] resize-y ${inputBase}`}
        />
      </div>
      {status === "error" && errorMsg && (
        <p className="text-sm text-red-400" role="alert">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-[#166C96] py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#145a82] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get My Free Revenue Audit"}
      </button>
      <p className="text-center text-[10px] leading-relaxed text-white/30">
        No commitment required. 100% confidential.
      </p>
    </form>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8e8e4] last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold leading-snug text-[#1a1a2e]">{q}</span>
        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#166C96]/40 text-[#166C96] transition-transform duration-200 ${open ? "rotate-45" : ""}`} aria-hidden>
          <i className="ri-add-line text-sm" />
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[14px] leading-[1.75] text-[#555]">{a}</p>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BehavioralHealthRcmLpPage() {
  const [activeCodeTab, setActiveCodeTab] = useState("psychiatry");
  const activeTab = billingCodeTabs.find((t) => t.id === activeCodeTab) ?? billingCodeTabs[0]!;

  return (
    <div className="min-h-screen bg-white font-[var(--font-montserrat)]">

      {/* ── LP Header ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50">
        {/* Top info bar */}
        <div className="bg-[#101E3F] px-4 py-2 text-[10.5px] font-medium tracking-[0.1em] text-white md:px-6">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
            <span className="text-white/65">
              <span className="hidden sm:inline">Irvine, CA — Serving Providers Nationwide</span>
              <span className="hidden sm:inline mx-3 text-white/30">|</span>
              <span>Mon – Fri, 8am – 6pm PT</span>
            </span>
            <a
              href="#get-started"
              className="shrink-0 rounded-sm bg-[#166C96] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#145a82]"
            >
              Free Audit
            </a>
          </div>
        </div>

        {/* Main bar */}
        <nav className="border-b border-slate-200 bg-white px-4 md:px-6">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 py-3">
            <Link href="/" className="shrink-0">
              <Image
                src={LOGO_SRC}
                alt="Cipher Billing"
                width={180}
                height={46}
                priority
                className="h-auto w-[130px] sm:w-[160px] lg:w-[175px]"
              />
            </Link>

            {/* Section anchor links — desktop */}
            <div className="hidden items-center gap-5 xl:flex">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#166C96] transition hover:text-[#101E3F]"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <a
                href={TEL_HREF}
                suppressHydrationWarning
                className="hidden items-center gap-1.5 text-[12px] font-semibold text-[#101E3F] transition hover:text-[#166C96] sm:flex"
              >
                <i className="ri-phone-fill text-sm text-[#166C96]" aria-hidden />
                {TEL_DISPLAY}
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[#0A1628] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/cb_rcm-lp_hero_bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#0A1628]/70" aria-hidden />
        <div className="relative mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-24 md:px-8 lg:gap-16">

          {/* Left */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#166C96]">
              Behavioral Health &amp; Addiction Treatment Billing
            </p>
            <h1 className="font-marcellus mt-5 text-4xl font-medium leading-[1.08] text-white md:text-5xl lg:text-[3.5rem]">
              Revenue Cycle<br />Management for<br />Behavioral Health.
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-white/65">
              Cipher Billing delivers specialized billing for psychiatrists, psychologists, IOP programs, detox centers, and addiction treatment facilities — maximizing revenue while keeping you fully compliant.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#get-started"
                className="inline-flex items-center gap-2 rounded-sm bg-[#166C96] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#145a82]"
              >
                Get a Free Revenue Audit
              </a>
              <a
                href={TEL_HREF}
                suppressHydrationWarning
                className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/40 hover:text-white"
              >
                <i className="ri-phone-fill text-sm text-[#5BA3C9]" aria-hidden />
                {TEL_DISPLAY}
              </a>
            </div>
          </div>

          {/* Right — consultation card */}
          <div className="rounded-lg border border-white/10 bg-[#0d1f3c] p-7 shadow-2xl md:p-9">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#166C96]">Free Consultation</p>
            <h2 className="font-marcellus mt-3 text-[1.5rem] font-medium leading-snug text-white">
              See How Much Revenue You&apos;re Leaving Behind
            </h2>
            <p className="mt-3 text-[13px] leading-[1.65] text-white/55">
              Our billing specialists will review your current revenue cycle and identify exactly where you&apos;re losing money — at no cost to you.
            </p>
            <ul className="mt-5 space-y-2.5">
              {["Full billing documentation review", "Coding error & compliance audit", "Revenue opportunity analysis"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] text-white/70">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#166C96]/25 text-[#5BA3C9]" aria-hidden>
                    <i className="ri-check-line text-[10px]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#get-started"
              className="mt-7 block w-full rounded-sm bg-[#166C96] py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#145a82]"
            >
              Start My Free Audit
            </a>
            <p className="mt-3 text-center text-[10px] text-white/30">No commitment. 100% confidential.</p>
          </div>
        </div>
      </section>

      {/* ── Metrics strip ─────────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-[#101E3F]">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-2 divide-white/10 sm:grid-cols-3 lg:grid-cols-6 [&>*]:border-b [&>*]:border-r [&>*]:border-white/10 lg:[&>*]:border-b-0">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col items-center justify-center px-4 py-8 text-center">
                <p className="font-marcellus text-3xl font-medium tracking-tight text-white">{m.value}</p>
                <p className="mt-2 text-[10.5px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/45">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ────────────────────────────────────────────────── */}
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#166C96]">The Cipher Difference</p>
          <h2 className="font-marcellus mt-4 text-3xl font-medium text-[#101E3F] md:text-[2.75rem]">
            Before Cipher.<span className="text-[#166C96]"> After Cipher.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#555]">
            Most practices don&apos;t realize how much revenue they&apos;re losing until they see the numbers side by side. Here&apos;s what changes when you switch to Cipher Billing.
          </p>

          <div className="mt-12 overflow-hidden rounded-lg border border-[#e8e8e4] shadow-sm">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-[#e8e8e4] bg-[#f7f7f5] px-6 py-4 text-[10.5px] font-bold uppercase tracking-[0.18em]">
              <span className="text-[#999]">Metric</span>
              <span className="text-[#d43b3b]">Before Cipher</span>
              <span className="text-[#166C96]">After Cipher</span>
            </div>
            {beforeAfterRows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr] items-start gap-2 border-b border-[#e8e8e4] px-6 py-5 last:border-0 ${i % 2 === 1 ? "bg-[#fafaf8]" : "bg-white"}`}
              >
                <p className="text-[13px] font-semibold text-[#1a1a2e]">{row.label}</p>
                <div>
                  <p className="text-[13px] font-semibold text-[#d43b3b]">{row.before.value}</p>
                  <p className="mt-0.5 text-[11px] text-[#999]">{row.before.note}</p>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#166C96]">{row.after.value}</p>
                  <p className="mt-0.5 text-[11px] text-[#999]">{row.after.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue impact cards */}
          <div className="mt-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#999]">Real Revenue Impact</p>
            <p className="mt-2 text-[14px] text-[#777]">Based on actual client results. Numbers reflect monthly revenue before and after switching to Cipher Billing.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {revenueImpact.map((r) => (
                <div key={r.type} className="rounded-lg border border-[#e8e8e4] p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#1a1a2e]">{r.type}</p>
                  <p className="mt-0.5 text-[11px] text-[#999]">{r.volume}</p>
                  <div className="mt-5 flex items-end gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d43b3b]">Before</p>
                      <p className="font-marcellus mt-1 text-xl font-medium text-[#555]">{r.before}</p>
                    </div>
                    <i className="ri-arrow-right-line mb-1.5 text-[#ccc]" aria-hidden />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#166C96]">After</p>
                      <p className="font-marcellus mt-1 text-xl font-medium text-[#101E3F]">{r.after}</p>
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center rounded-full bg-[#166C96]/10 px-3 py-1">
                    <span className="text-[12px] font-bold text-[#166C96]">{r.gain}</span>
                  </div>
                  <p className="mt-3 text-[11.5px] leading-[1.6] text-[#888]">{r.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-sm bg-[#166C96] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#145a82]"
            >
              See My Revenue Potential
            </a>
            <p className="mt-2 text-[11px] text-[#aaa]">Free audit. No commitment. Results in 30 days.</p>
          </div>
        </div>
      </section>

      {/* ── Practice Types ────────────────────────────────────────────────── */}
      <section id="services" className="bg-[#f7f7f5] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#166C96]">Our Specialties</p>
          <h2 className="font-marcellus mt-4 text-3xl font-medium text-[#101E3F] md:text-[2.75rem]">
            Built for Every<br />Practice Type.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#555]">
            Whether you&apos;re a solo psychiatrist, a multi-provider mental health group, a large IOP facility, or a detox and addiction treatment center — Cipher Billing has the specialized expertise to maximize your revenue and keep you compliant.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practiceTypes.map((pt) => (
              <article key={pt.num} className="flex gap-5 rounded-lg border border-[#e8e8e4] bg-white p-6 shadow-sm">
                <span className="font-marcellus mt-0.5 text-2xl font-medium text-[#166C96]/40 shrink-0">{pt.num}</span>
                <div>
                  <h3 className="text-[13.5px] font-bold text-[#1a1a2e]">{pt.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[#666]">{pt.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="#get-started" className="inline-flex items-center gap-2 rounded-sm bg-[#166C96] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#145a82]">
              Get a Free Revenue Audit
            </a>
            <p className="mt-2 text-[11px] text-[#aaa]">No commitment. Results in 30 days.</p>
          </div>
        </div>
      </section>

      {/* ── Why Cipher ────────────────────────────────────────────────────── */}
      <section id="why-cipher" className="bg-[#0A1628] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#166C96]">Why Cipher Billing</p>
              <h2 className="font-marcellus mt-4 text-3xl font-medium md:text-[2.75rem]">
                We Treat Your<br />Revenue Like<br />Our Own.
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-white/60">
                Most billing companies promise results. Cipher Billing proves them. From mental health practices to detox and addiction treatment centers, our numbers speak for themselves — and our clients stay because we treat their revenue like our own.
              </p>
            </div>
            <a
              href="#get-started"
              className="shrink-0 self-start lg:self-end rounded-sm bg-[#166C96] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#145a82]"
            >
              See What We Can Do For You
            </a>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyCipherStats.map((s) => (
              <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
                <p className="font-marcellus text-4xl font-medium text-white">{s.value}</p>
                <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#166C96]">{s.label}</p>
                <p className="mt-4 text-[13px] leading-[1.7] text-white/55">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Specialty tags */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {["Psychiatry", "Psychology", "IOP / PHP", "Detox Centers", "Addiction Treatment", "Private Practice"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold text-white/60">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#166C96]">Getting Started</p>
          <h2 className="font-marcellus mt-4 text-3xl font-medium text-[#101E3F] md:text-[2.75rem]">
            From Audit to<br />First Payment.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#555]">
            We don&apos;t just take over your billing — we optimize it from the ground up. Our audit-based onboarding ensures your documentation is pristine and your revenue cycle is firing on all cylinders before a single claim is submitted.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <article key={step.num} className={`rounded-lg border p-7 ${i === 0 ? "border-[#166C96]/40 bg-[#166C96]/5" : "border-[#e8e8e4] bg-white"}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${i === 0 ? "bg-[#166C96] text-white" : "bg-[#f0f0ee] text-[#999]"}`}>
                    {step.num}
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#999]">{step.label}</span>
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-[#1a1a2e]">{step.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#666]">{step.body}</p>
                {step.note && (
                  <p className="mt-4 rounded border-l-2 border-[#166C96]/40 bg-[#166C96]/5 px-4 py-3 text-[12px] italic leading-[1.6] text-[#555]">
                    {step.note}
                  </p>
                )}
                {step.badge && (
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#e8f4ec] px-3 py-1 text-[10.5px] font-semibold text-[#2a7a4b]">
                    <i className="ri-check-line text-xs" aria-hidden /> {step.badge}
                  </span>
                )}
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="#get-started" className="inline-flex items-center gap-2 rounded-sm bg-[#101E3F] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#166C96]">
              Start Your Free Audit
            </a>
            <p className="mt-2 text-[11px] text-[#aaa]">Most clients receive their first payment within 30 days of onboarding.</p>
          </div>
        </div>
      </section>

      {/* ── Problems We Solve ─────────────────────────────────────────────── */}
      <section id="common-issues" className="bg-[#f7f7f5] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#166C96]">Sound Familiar?</p>
          <h2 className="font-marcellus mt-4 text-3xl font-medium text-[#101E3F] md:text-[2.75rem]">
            Problems We<br />Solve Every Day.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#555]">
            Most behavioral health providers come to us after months — sometimes years — of revenue loss they didn&apos;t even know was happening. These are the six most common problems we fix on day one.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <div key={p.problem} className="rounded-lg border border-[#e8e8e4] bg-white overflow-hidden shadow-sm">
                <div className="border-b border-[#e8e8e4] bg-[#fdf5f5] px-6 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d43b3b]">The Problem</p>
                  <h3 className="mt-2 text-[14.5px] font-bold text-[#1a1a2e]">{p.problem}</h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-[#777]">{p.problemBody}</p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#166C96]">The Cipher Fix</p>
                  <p className="mt-2 text-[13px] leading-[1.65] text-[#444]">{p.fix}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="#get-started" className="inline-flex items-center gap-2 rounded-sm bg-[#166C96] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#145a82]">
              Fix My Billing Today
            </a>
            <p className="mt-2 text-[11px] text-[#aaa]">Free audit. No commitment. Results in 30 days.</p>
          </div>
        </div>
      </section>

      {/* ── Billing Codes ─────────────────────────────────────────────────── */}
      <section id="billing-codes" className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#166C96]">Billing Expertise</p>
          <h2 className="font-marcellus mt-4 text-3xl font-medium text-[#101E3F] md:text-[2.75rem]">
            The Codes That<br />Most Billers Miss.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#555]">
            Behavioral health billing is a specialty. Generic billers don&apos;t know the nuances — and that ignorance costs you money every single month. Here&apos;s a look at the codes we optimize that most practices are getting wrong.
          </p>

          {/* Tabs */}
          <div className="mt-10 flex gap-2 overflow-x-auto border-b border-[#e8e8e4] pb-0">
            {billingCodeTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCodeTab(tab.id)}
                className={`shrink-0 border-b-2 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] transition ${activeCodeTab === tab.id ? "border-[#166C96] text-[#166C96]" : "border-transparent text-[#999] hover:text-[#444]"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {activeTab.codes.map((c) => (
              <div key={c.code} className="rounded-lg border border-[#e8e8e4] p-6">
                <p className="font-marcellus text-lg font-medium text-[#166C96]">{c.code}</p>
                <h3 className="mt-1 text-[13.5px] font-bold text-[#1a1a2e]">{c.name}</h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#666]">{c.description}</p>
                <div className="mt-4 rounded bg-[#f7f7f5] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#166C96]">Cipher Best Practice</p>
                  <p className="mt-1.5 text-[12.5px] leading-[1.65] text-[#555]">{c.best}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <a href="#get-started" className="inline-flex items-center gap-2 rounded-sm bg-[#166C96] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#145a82]">
              Get a Free Audit
            </a>
            <p className="text-center text-[11px] leading-[1.6] text-[#aaa]">
              Disclaimer: CPT code guidance above is for educational purposes. Reimbursement rates, payer policies, and documentation requirements vary. Cipher Billing conducts a full payer-specific audit for every client.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section id="testimonials" className="bg-[#0A1628] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#166C96]">Client Results</p>
          <h2 className="font-marcellus mt-4 text-3xl font-medium md:text-[2.75rem]">
            What Providers<br />Say About Us.
          </h2>
          <p className="mt-4 text-[15px] text-white/55">Real words from real providers who trusted Cipher with their revenue cycle.</p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              {
                quote: "We needed a billing company that conducted business similarly to how we do, prompt and intentional. Cipher has exceeded our expectations. They've continued to be easily accessible & helpful with all our billing needs!",
                name: "Tony H.",
                role: "Practice Owner",
              },
              {
                quote: "My business was nearly in jeopardy because of the lackluster service from our billing company. Then I switched to Cipher, and they helped turn around our revenue, allowing us to flourish. I am a clinician, not a business person. I needed a billing company that would handle everything billing-related so that I could focus on what mattered — providing exceptional clinical care to patients. Cipher has been that partner for me.",
                name: "Dr. Matthew T.",
                role: "Clinician & Practice Owner",
              },
            ].map((t) => (
              <blockquote key={t.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
                <i className="ri-double-quotes-l text-3xl text-[#166C96]/60" aria-hidden />
                <p className="mt-4 text-[15px] leading-[1.8] text-white/70 italic">{t.quote}</p>
                <footer className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-[12px] text-white/40">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="#get-started" className="inline-flex items-center gap-2 rounded-sm bg-[#166C96] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#145a82]">
              Get My Free Revenue Audit
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#166C96]">Common Questions</p>
              <h2 className="font-marcellus mt-4 text-3xl font-medium text-[#101E3F] md:text-[2.75rem]">
                Frequently<br />Asked.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#555]">
                Everything you need to know about our behavioral health billing services, mental health medical billing, and how we work with your practice.
              </p>
              <a
                href="#get-started"
                className="mt-7 inline-flex items-center gap-2 rounded-sm border border-[#101E3F] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#101E3F] transition hover:bg-[#101E3F] hover:text-white"
              >
                Still Have Questions?
              </a>
            </div>
            <div className="divide-y divide-[#e8e8e4]">
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA + Form ──────────────────────────────────────────────── */}
      <section id="get-started" className="bg-[#0A1628] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">

            {/* Left */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#166C96]">Ready to Transform Your Revenue?</p>
              <h2 className="font-marcellus mt-4 text-3xl font-medium md:text-[2.75rem]">
                Let&apos;s Maximize<br />Your Revenue.
              </h2>
              <p className="mt-5 text-[15px] leading-[1.7] text-white/60">
                Schedule a complimentary consultation with our behavioral health billing experts. We&apos;ll review your current revenue cycle, identify missed opportunities, and show you exactly how much more you could be collecting.
              </p>

              <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#166C96]">What&apos;s Included in Your Free Audit</p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Full review of your current billing documentation",
                    "Identification of coding errors and compliance gaps",
                    "Revenue opportunity analysis",
                    "Payer contract review and fee schedule benchmarking",
                    "Custom onboarding roadmap for your practice type",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13px] text-white/65">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#166C96]/25 text-[#5BA3C9]" aria-hidden>
                        <i className="ri-check-line text-[10px]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="mt-8">
                <p className="text-[15px] italic leading-[1.7] text-white/55">
                  &ldquo;Prompt and intentional. Cipher has exceeded our expectations.&rdquo;
                </p>
                <footer className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                  Tony H. — Psychiatric Practice Owner
                </footer>
              </blockquote>
            </div>

            {/* Right — full form */}
            <div className="rounded-lg border border-white/10 bg-[#0d1f3c] p-8 shadow-2xl md:p-10">
              <h3 className="font-marcellus text-2xl font-medium text-white">Get Started Today</h3>
              <p className="mt-2 text-[13px] text-white/50">
                A billing specialist will contact you within 24 hours.
              </p>
              <div className="mt-7">
                <LpLeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LP Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#080f1e] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <Link href="/">
            <Image
              src={LOGO_SRC}
              alt="Cipher Billing"
              width={140}
              height={36}
              className="h-auto w-[110px] brightness-0 invert opacity-50"
            />
          </Link>
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} Cipher Billing. All rights reserved.
          </p>
          <a
            href={TEL_HREF}
            suppressHydrationWarning
            className="text-[11px] font-semibold tracking-[0.1em] text-white/40 transition hover:text-white/70"
          >
            {TEL_DISPLAY}
          </a>
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";
import { cipherOnboardingPhases } from "@/lib/cipherOnboardingPhases";

/** Elementor post-239 + migration HTML (cipherbilling.com/behavioral-health-revenue-cycle-management/) */
const IMG_HERO =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T100233.880.png";
const IMG_PRECISION =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T101038.786.png";
/** TODO: replace with a unique AI-generated industries image per platform-unique-page-imagery rule. */
const IMG_INDUSTRIES =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-15T201810.850.png";

const TEL_HREF = "tel:949-676-2252";
const TEL_DISPLAY = "949-676-2252";

const precisionIntro = [
  "Revenue cycle management (RCM) for behavioral health is uniquely complex. Between insurance verification, utilization review, claims submission, denial management, and accounts receivable follow-up, most practices struggle to capture their full revenue potential.",
  "Cipher Billing\u2019s specialized RCM service handles every aspect of your financial operations—from the moment a patient calls to the final payment posting. Our team of certified behavioral health billing specialists ensures maximum reimbursement while maintaining strict compliance standards.",
];

const precisionHighlights = [
  { icon: "ri-line-chart-line", label: "Maximize Revenue" },
  { icon: "ri-file-list-3-line", label: "Ensure Compliance" },
  { icon: "ri-time-line", label: "Accelerate Cash Flow" },
  { icon: "ri-checkbox-circle-line", label: "Reduce Denials" },
] as const;

/** Industries served accordion — uses native <details> for SSR-friendly accordion behavior. */
const industriesServed = [
  {
    label: "Inpatient Behavioral Health & Addiction Treatment Centers",
    body:
      "Residential treatment centers, inpatient detox programs, and high-acuity addiction treatment facilities depend on aggressive utilization review and authorization advocacy. Cipher specializes in protecting revenue for medically-necessary admissions, extending authorized stays, and ensuring every clinical note supports the level of care provided.",
  },
  {
    label: "Outpatient Programs",
    body:
      "Intensive Outpatient (IOP), Partial Hospitalization (PHP), and traditional outpatient programs run on high claim volumes and tight reimbursement windows. Our team handles precise coding, frequent VOB updates, and proactive denial management so your cash flow keeps pace with patient volume.",
  },
  {
    label: "Dual Diagnosis & Emergency Programs",
    body:
      "Co-occurring disorder programs and crisis stabilization services require complex documentation and payer-specific medical necessity criteria. Cipher's compliance team ensures every claim meets the standard and survives even the strictest audits.",
  },
] as const;

const sixComponents: {
  title: string;
  description: string;
  bullets: string[];
  icon: string;
}[] = [
  {
    title: "Patient Access & Eligibility",
    description:
      "9 mins for eligibility, cost-share, and reimbursement data—so you don\u2019t have to wait hours for a full verification to make an admission decision for those who need it",
    bullets: [
      "9-minute average VOB turnaround",
      "Real-time eligibility verification",
      "Prior authorization coordination",
      "Out-of-network benefit analysis",
    ],
    icon: "ri-calendar-check-line",
  },
  {
    title: "Utilization Review Management",
    description:
      "Daily UR coordination with payers to secure authorizations, extend patient stays, and defend medical necessity.",
    bullets: [
      "Daily payer communication",
      "Clinical documentation support",
      "Authorization extensions",
      "Peer-to-peer assistance",
    ],
    icon: "ri-bar-chart-box-line",
  },
  {
    title: "Claims Management",
    description:
      "Accurate claim generation, submission, and tracking with strict coding compliance and claim optimization.",
    bullets: [
      "92% claims paid without intervention",
      "Same-day claim submission",
      "CPT/ICD-10 coding expertise",
      "Electronic claim tracking",
    ],
    icon: "ri-edit-box-line",
  },
  {
    title: "Denial Management & Appeals",
    description:
      "Aggressive pursuit of denied claims with comprehensive appeals, clinical documentation, and payer negotiations.",
    bullets: [
      "97% medical appeal success rate",
      "24-hour denial response",
      "Root cause analysis",
      "Systematic resubmission",
    ],
    icon: "ri-flag-line",
  },
  {
    title: "Payment Posting & Reconciliation",
    description:
      "Accurate payment application, EOB analysis, and variance reporting to ensure every dollar is accounted for.",
    bullets: [
      "Daily payment posting",
      "Electronic remittance (ERA)",
      "Underpayment identification",
      "Variance reporting",
    ],
    icon: "ri-money-dollar-circle-line",
  },
  {
    title: "A/R Management & Collections",
    description:
      "Relentless accounts receivable follow-up with systematic pursuit of outstanding claims until resolution.",
    bullets: [
      "Weekly A/R aging analysis",
      "Systematic claim follow-up",
      "Payer relationship management",
      "Patient billing support",
    ],
    icon: "ri-percent-line",
  },
];

export default function BehavioralHealthRevenueCycleManagementPage() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero — bg + gradient (5a75c51) */}
      <section className="relative overflow-hidden bg-[#101E3F]">
        <div className="absolute inset-0">
          <Image
            src={IMG_HERO}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(270deg, rgba(11, 26, 46, 0.61) 0%, #101E3F 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1140px] px-[30px] py-[50px] md:px-5 md:py-[100px]">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
              <AutoLinkedText>{"End-to-End RCM Services"}</AutoLinkedText>
            </p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-medium leading-[1.1] text-white md:text-5xl">
              Behavioral Health{" "}
              <span className="text-[#166C96]">Revenue Cycle Management</span>
            </h1>
            <p className="mt-6 max-w-2xl border-l-[3px] border-white/90 pl-8 text-sm leading-[1.42] text-white/90 md:text-base">
              <AutoLinkedText>{"Behavioral Health Revenue Cycle Management (RCM) services for behavioral health, addiction, and dual-diagnosis\n              programs, including VOB, UR, claims, AR, and compliance training to improve reimbursements and reduce\n              denials."}</AutoLinkedText>
            </p>
            <a
              href={TEL_HREF}
              suppressHydrationWarning
              className="mt-10 inline-flex rounded-[3px] bg-[#166C96] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#145a82]"
            >
              Call Now | {TEL_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Precision Management — white */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1140px] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-16 xl:grid-cols-[1fr_500px]">

            {/* Left column */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-12 shrink-0 bg-[#166C96]" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
                  Precision Management
                </p>
              </div>

              <h2 className="mt-5 font-[var(--font-heading)] text-4xl font-medium leading-[1.08] text-[#101E3F] md:text-[2.75rem]">
                From Intake To Payment{" "}
                <span className="text-[#166C96]">We Handle It All</span>
              </h2>

              <p className="mt-6 text-[15px] leading-[1.7] text-slate-600">
                <AutoLinkedText>{precisionIntro[0]}</AutoLinkedText>
              </p>
              <p className="mt-4 text-[15px] leading-[1.7] text-slate-600">
                <AutoLinkedText>{precisionIntro[1]}</AutoLinkedText>
              </p>

              {/* Feature strip */}
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-100 pt-8">
                {precisionHighlights.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#166C96]/10 text-[#166C96]"
                      aria-hidden
                    >
                      <i className={`${item.icon} text-[17px] leading-none`} />
                    </span>
                    <span className="text-[12.5px] font-semibold text-[#101E3F]">{item.label}</span>
                  </div>
                ))}
              </div>

              <a
                href={TEL_HREF}
                suppressHydrationWarning
                className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#166C96] transition hover:text-[#101E3F]"
              >
                Speak with a Specialist <i className="ri-arrow-right-line" />
              </a>
            </div>

            {/* Right column — image with floating stat */}
            <div className="relative mx-auto w-full max-w-lg lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={IMG_PRECISION}
                  alt="Behavioral health revenue cycle specialists collaborating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-[#101E3F] px-6 py-5 shadow-2xl md:-bottom-5 md:-left-5">
                <p className="font-[var(--font-heading)] text-[2rem] font-medium leading-none text-white">97%</p>
                <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#166C96]">Medical Appeal Success</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Six Core Components — navy */}
      <section className="bg-[#101E3F] px-[30px] py-[50px] text-white md:px-5 md:py-[100px]">
        <div className="mx-auto max-w-[1140px]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-[8%] min-w-[48px] bg-[#166C96]" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
                Six Core Components
              </p>
            </div>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium md:text-[2.5rem]">
              Complete Revenue Cycle <span className="text-[#166C96]">Coverage</span>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {sixComponents.map((card) => (
              <article
                key={card.title}
                className="border border-[#166C96]/45 bg-[#AAB3B9]/15 p-8 md:p-[30px]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white">
                  <i className={`${card.icon} text-xl leading-none`} aria-hidden />
                </div>
                <h3 className="mt-5 font-[var(--font-body)] text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-[1.42] text-white/80"><AutoLinkedText>{card.description}</AutoLinkedText></p>
                <ul className="mt-6 space-y-3 border-t border-white/15 pt-6">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-snug text-white/85">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-[#166C96]" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — premium 3-phase stepper (white) */}
      <section className="bg-white px-[30px] py-[60px] md:px-5 md:py-[100px]">
        <div className="mx-auto max-w-[1140px]">
          {/* Header */}
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">3-Step Process</p>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-medium text-[#101E3F] md:text-[2.5rem]">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
              <AutoLinkedText>{"A proven, three-phase engagement model that protects your revenue from day one and scales with your organization."}</AutoLinkedText>
            </p>
          </div>

          {/* Step connector row — same grid as cards, full-width line behind badges */}
          <div className="mt-14 hidden lg:block">
            <div className="relative">
              {/* Line spans the full width behind all three badges */}
              <div
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#166C96] via-slate-300 to-slate-200"
                aria-hidden
              />
              <div className="relative grid grid-cols-3">
                {cipherOnboardingPhases.map((phase, i) => (
                  <div key={phase.phase} className="flex justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#166C96] text-sm font-bold text-white ring-4 ring-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase cards */}
          <div className="mt-4 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {cipherOnboardingPhases.map((phase, i) => (
              <article
                key={phase.phase}
                className="flex flex-col rounded-sm border border-slate-100 bg-[#F8FAFC] p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Mobile step badge */}
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#166C96] text-sm font-bold text-white lg:hidden">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#166C96]">
                  {phase.phase}
                </p>
                <h3 className="mt-2 font-[var(--font-heading)] text-xl font-medium text-[#101E3F] md:text-2xl">
                  {phase.title}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {phase.tag}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-slate-600">
                  <AutoLinkedText>{phase.intro}</AutoLinkedText>
                </p>

                <div className="mt-7 space-y-5 border-t border-slate-200 pt-7">
                  {phase.blocks.map((b) => (
                    <div key={b.title}>
                      <div className="flex items-start gap-2.5">
                        <span
                          className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#166C96]/12 text-[#166C96]"
                          aria-hidden
                        >
                          <i className="ri-check-line text-xs leading-none" />
                        </span>
                        <div>
                          <h4 className="text-sm font-semibold text-[#101E3F]">{b.title}</h4>
                          <p className="mt-1 text-sm leading-relaxed text-slate-500">
                            <AutoLinkedText>{b.body}</AutoLinkedText>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve — navy with image + accordion */}
      <section className="bg-[#101E3F] px-[30px] py-[50px] text-white md:px-5 md:py-[100px]">
        <div className="mx-auto grid max-w-[1140px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-[60px]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg lg:mx-0">
            <Image
              src={IMG_INDUSTRIES}
              alt="Cipher Billing partner consulting with a behavioral health provider"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl font-medium md:text-[2.5rem] md:leading-tight">
              Industries We Serve
            </h2>
            <p className="mt-6 text-sm leading-[1.42] text-white/85 md:text-base">
              <AutoLinkedText>{"We partner with behavioral health providers across the full continuum of care\u2014whether you operate a free-standing facility or a network of programs requiring compliance protection, financial clarity, and high-quality reimbursement outcomes."}</AutoLinkedText>
            </p>

            <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {industriesServed.map((industry) => (
                <details
                  key={industry.label}
                  className="group py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-[#5eb5e0]">
                    <span>{industry.label}</span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/40 text-base text-white transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <i className="ri-add-line leading-none" />
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">
                    <AutoLinkedText>{industry.body}</AutoLinkedText>
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extension of your team — centered tagline (white) */}
      <section className="bg-white px-[30px] py-[60px] md:px-5 md:py-[100px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[var(--font-heading)] text-2xl font-medium leading-[1.35] text-[#101E3F] md:text-[2rem] md:leading-[1.3]">
            Cipher Billing acts as an extension of your team{" "}
            <span className="italic text-[#166C96]">
              &mdash; protecting your revenue, delivering financial clarity, and freeing you to focus on patient care.
            </span>
          </p>
        </div>
      </section>

      {/* Maximize revenue CTA banner (navy) */}
      <section className="bg-[#101E3F] px-[30px] py-[60px] md:px-5 md:py-[80px]">
        <div className="mx-auto max-w-[1140px] rounded-sm border border-white/10 bg-[#0d1833] px-8 py-12 text-center md:px-12 md:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
            Get In Touch
          </p>
          <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium leading-[1.2] text-white md:text-[2.25rem]">
            Maximize revenue. Protect your organization.
            <br />
            <span className="text-[#166C96]">Request a consultation today.</span>
          </h2>
          <Link
            href="/contact-us"
            className="mt-8 inline-flex items-center justify-center rounded-[3px] bg-[#166C96] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#145a82]"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <OurCompanyLeadSection />
    </main>
  );
}

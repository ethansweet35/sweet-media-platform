import Image from "next/image";
import Link from "next/link";

import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";
import { cipherOnboardingPhases } from "@/lib/cipherOnboardingPhases";

/** Elementor post-239 + migration HTML (cipherbilling.com/behavioral-health-revenue-cycle-management/) */
const IMG_HERO =
  "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-09T100233.880.png";
const IMG_PRECISION =
  "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-09T101038.786.png";

const TEL_HREF = "tel:+17148671331";
const TEL_DISPLAY = "714-867-1331";

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

export default function OurSolutionPage() {
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
              End-to-End RCM Services
            </p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-medium leading-[1.1] text-white md:text-5xl">
              Behavioral Health{" "}
              <span className="text-[#166C96]">Revenue Cycle Management</span>
            </h1>
            <p className="mt-6 max-w-2xl border-l-[3px] border-white/90 pl-8 text-sm leading-[1.42] text-white/90 md:text-base">
              Behavioral Health Revenue Cycle Management (RCM) services for behavioral health, addiction, and dual-diagnosis
              programs, including VOB, UR, claims, AR, and compliance training to improve reimbursements and reduce
              denials.
            </p>
            <Link
              href={TEL_HREF}
              className="mt-10 inline-flex rounded-[3px] bg-[#166C96] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#145a82]"
            >
              Call Now | {TEL_DISPLAY}
            </Link>
          </div>
        </div>
      </section>

      {/* Precision Management — white */}
      <section className="bg-white px-[30px] py-[50px] md:px-5 md:py-[100px]">
        <div className="mx-auto grid max-w-[1140px] gap-12 lg:grid-cols-2 lg:items-start lg:gap-[50px]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-[8%] min-w-[48px] bg-[#166C96]" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Precision Management</p>
            </div>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium text-[#101E3F] md:text-[2.5rem] md:leading-tight">
              From Intake To Payment{" "}
              <span className="text-[#166C96]">We Handle It All</span>
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
              {precisionIntro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 border-t border-slate-200 pt-8 sm:grid-cols-2">
              {precisionHighlights.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#166C96] text-[#166C96]"
                    aria-hidden
                  >
                    <i className={`${item.icon} text-lg leading-none`} />
                  </span>
                  <span className="pt-1.5 text-sm font-semibold text-[#101E3F]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto aspect-[675/905] w-full max-w-lg lg:mx-0 lg:justify-self-end">
            <Image
              src={IMG_PRECISION}
              alt="Behavioral health revenue cycle specialists collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
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
                <p className="mt-3 text-sm leading-[1.42] text-white/80">{card.description}</p>
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

      {/* How It Works — gray */}
      <section className="bg-[#EEEEEE] px-[30px] py-[50px] md:px-5 md:py-[100px]">
        <div className="mx-auto max-w-[1140px]">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">3-Step Process</p>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium text-[#101E3F] md:text-[2.5rem]">
              How It Works
            </h2>
          </div>

          <div className="mt-14 flex flex-col gap-[50px]">
            {cipherOnboardingPhases.map((phase) => (
              <div
                key={phase.phase}
                className="flex flex-col gap-10 md:flex-row md:items-start md:gap-[50px]"
              >
                <div className="relative mx-auto aspect-[700/875] w-full max-w-md shrink-0 md:w-[min(45%,420px)]">
                  <Image
                    src={phase.image}
                    alt={phase.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96]">{phase.phase}</p>
                  <h3 className="mt-2 font-[var(--font-heading)] text-2xl font-medium text-[#101E3F] md:text-3xl">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-slate-500">{phase.tag}</p>
                  <p className="mt-6 text-lg leading-relaxed text-slate-700">{phase.intro}</p>
                  <div className="mt-10 space-y-10">
                    {phase.blocks.map((b) => (
                      <div key={b.title}>
                        <h4 className="font-[var(--font-body)] text-base font-semibold text-[#101E3F]">{b.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OurCompanyLeadSection />
    </main>
  );
}

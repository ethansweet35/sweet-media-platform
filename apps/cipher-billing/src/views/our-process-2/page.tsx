import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

/** Elementor post-651 — cipherbilling.com/our-process-2/ (live nav target). */
const IMG_HERO =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T145809.503.png";
const IMG_PROCESS =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-15T210356.097.png";

const processSteps = [
  {
    icon: "ri-tools-line",
    title: "Onboard & Train",
    bullets: [
      "Goal setting with your leadership team.",
      "Training for compliance, medical necessity, VOB, and Insurance 101.",
      "A dedicated Partner Experience Executive assigned as your direct advocate.",
    ],
  },
  {
    icon: "ri-settings-3-line",
    title: "Partnership",
    bullets: [
      "Real-time admissions data to inform financial decisions.",
      "Daily UR collaboration to extend patient stays and maximize authorizations.",
      "We conduct pre-payment and post-payment negotiations.",
    ],
  },
  {
    icon: "ri-arrow-up-double-line",
    title: "Results",
    bullets: [
      "Days to first payment: 30 days.",
      "Stronger returns: 30.36% OON reimbursement on average, with up to 70% increases through pre-payment and post-payment negotiations.",
      "Consistent collections, with Cipher fighting for every dollar until a claim is closed.",
    ],
  },
] as const;

const stats = [
  { value: "$1,821", label: "Inpatient Day Rate" },
  { value: "$1,149", label: "Outpatient Day Rate" },
  { value: "100%", label: "Pre-Payment Review Passing Rate" },
  { value: "30 Days", label: "To Received First Payment" },
] as const;

export default function OurProcess2Page() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero — 8b896d4 */}
      <section className="relative overflow-hidden bg-[#101E3F]">
        <div className="absolute inset-0">
          <Image
            src={IMG_HERO}
            alt=""
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(270deg, #0B1A2E9C 0%, #101E3F 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1140px] px-5 py-[50px] md:py-[100px]">
          <div className="max-w-[63%] min-w-0 max-md:max-w-full">
            <div className="flex items-center gap-4">
              <span className="h-px w-[8%] min-w-[48px] bg-white/90" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white">Our Company</p>
            </div>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-medium leading-[1.1] text-white md:text-5xl">
              Our Process
            </h1>
          </div>
        </div>
      </section>

      {/* Process + image — e6a9fe2 */}
      <section className="bg-[#101E3F] px-5 py-[50px] text-white md:py-[100px]">
        <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-2 md:items-stretch md:gap-[50px]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Our Company</p>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium leading-tight md:text-[2rem] md:leading-snug">
              Our Proven Behavioral Health Billing Process
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/95">
              <AutoLinkedText>{"From compliance audits to claims resolution, our step-by-step process protects your revenue and delivers\n              measurable financial results. Cipher Billing's process ensures compliance, maximizes reimbursements, and\n              provides peace of mind so you can focus on patient care."}</AutoLinkedText>
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {processSteps.map((step) => (
                <div key={step.title} className="flex gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white text-lg text-white"
                    aria-hidden
                  >
                    <i className={step.icon} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-[var(--font-body)] text-lg font-semibold text-white">{step.title}</h3>
                    <ul className="mt-3 list-none space-y-2 text-sm leading-relaxed text-white/85">
                      {step.bullets.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#166C96]" aria-hidden />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-[765/1024] w-full max-w-lg self-stretch md:mx-0 md:aspect-auto md:min-h-[500px]">
            <Image
              src={IMG_PROCESS}
              alt="Medical billing statement review on a tablet"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      </section>

      {/* By the numbers — d7cfccf */}
      <section className="bg-[#0d1833] px-5 py-[50px] md:py-[100px]">
        <div className="mx-auto max-w-[1140px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
            <div className="max-w-xl shrink-0 lg:flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">By The Numbers</p>
              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium text-white md:text-[2rem]">
                Why Cipher Billing
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-white/90">
                <p><AutoLinkedText>{"We believe in delivering unmatched service, airtight compliance, and real financial results for our partners."}</AutoLinkedText></p>
                <p>
                  <AutoLinkedText>{"Our numbers reflect our dedication, with an eligibility turnaround averaging just 9 minutes compared to the\n                  industry standard 30 minutes. To maximize your revenue, request a consultation today."}</AutoLinkedText>
                </p>
              </div>
              <Link
                href="/contact-us"
                className="mt-8 inline-flex items-center gap-3 rounded-[3px] bg-[#166C96] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#145a82]"
              >
                <span>Contact Us</span>
                <i className="ri-arrow-right-s-line text-base" aria-hidden />
              </Link>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center border border-white/15 bg-white/5 px-4 py-8 text-center backdrop-blur-sm"
                >
                  <p className="font-marcellus text-3xl font-medium tracking-[-0.02em] text-white md:text-4xl md:leading-[1.1]"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                  <p className="mt-3 max-w-[11rem] text-center font-[var(--font-body)] text-[11px] font-normal uppercase leading-snug tracking-[0.12em] text-white/95"><AutoLinkedText>{s.label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <OurCompanyLeadSection />
    </main>
  );
}

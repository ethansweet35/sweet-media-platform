import Image from "next/image";
import Link from "next/link";

import { cipherOnboardingPhases } from "@/lib/cipherOnboardingPhases";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

/**
 * Elementor post-168 — cipherbilling.com/our-process/
 * Overlay matches wp-content/uploads/elementor/css/post-168.css (.elementor-element-3041aa0::before).
 */
const IMG_HERO =
  "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-08T225512.331.png";

const TEL_HREF = "tel:+17148671331";
const TEL_DISPLAY = "(714) 867-1331";

/** Live Elementor heading copy (including typo). */
const EYEBROW_HERO = "Our PRocess";

const philosophyPillars = [
  { icon: "ri-shield-user-line", title: "Audit-Ready", subtitle: "Proactive compliance" },
  { icon: "ri-focus-3-line", title: "Transparent", subtitle: "Full visibility" },
  { icon: "ri-line-chart-line", title: "Effective", subtitle: "Measurable results" },
] as const;

export default function OurProcessPage() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero */}
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
              backgroundImage: "linear-gradient(270deg, #0B1A2E9C 0%, #101E3F 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1140px] px-5 py-[50px] md:py-[100px]">
          <div className="max-w-[63%] min-w-0 max-md:max-w-full">
            <div className="flex items-center gap-4">
              <span className="h-px w-[8%] min-w-[48px] bg-white/90" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white">{EYEBROW_HERO}</p>
            </div>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-medium leading-[1.1] md:text-5xl">
              <span className="text-white">Onboarding Process With </span>
              <span className="text-[#166C96]">Cipher Billing</span>
            </h1>
            <p className="mt-0 max-w-2xl border-l-[3px] border-white/90 pt-[15px] pl-8 text-sm leading-[1.42] text-white md:text-base">
              Protecting your revenue, ensuring airtight compliance, and delivering measurable financial results—so you can
              focus entirely on patient care.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy — divider #000; CTA navy (live Elementor button) */}
      <section className="px-5 py-[50px] md:py-[100px]">
        <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-2 md:gap-[50px] md:items-start">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-[8%] min-w-[48px] bg-black" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#101E3F]">Philosophy</p>
            </div>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium leading-tight text-[#101E3F] md:text-[2.5rem]">
              Revenue Cycle Management Shouldn&apos;t Be a{" "}
              <span className="text-[#166C96]">Black Box.</span>
            </h2>
            <Link
              href={TEL_HREF}
              className="mt-8 inline-flex rounded-[3px] bg-[#101E3F] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#0d1833]"
            >
              {TEL_DISPLAY}
            </Link>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-slate-700">
              At Cipher Billing, we believe revenue cycle management shouldn&apos;t be a black box. Because we focus
              exclusively on behavioral health and addiction treatment, our step-by-step process is tailored specifically
              to your industry.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              From rigorous compliance checks to relentless claims resolution, our approach is designed to be simple,
              transparent, and highly effective.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              {philosophyPillars.map((p) => (
                <div key={p.title} className="flex flex-col items-start gap-[15px]">
                  <span className="text-[27px] leading-none text-[#166C96]" aria-hidden>
                    <i className={p.icon} />
                  </span>
                  <div>
                    <h3 className="font-[var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.24em] text-[#101E3F]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{p.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — phase 2 is row-reverse on desktop (Elementor 90938b0) */}
      <section className="bg-[#EEEEEE] px-5 py-[50px] md:py-[100px]">
        <div className="mx-auto max-w-[1140px]">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">3-Step Process</p>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium text-[#101E3F] md:text-[2.5rem]">
              How It Works
            </h2>
          </div>

          <div className="mt-14 flex flex-col gap-[50px]">
            {cipherOnboardingPhases.map((phase, phaseIndex) => (
              <div
                key={phase.phase}
                className={`flex flex-col gap-10 md:flex-row md:items-start md:gap-[50px] ${
                  phaseIndex % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative mx-auto aspect-[700/875] w-full max-w-md shrink-0 md:w-[40%] md:max-w-none">
                  <Image
                    src={phase.image}
                    alt={phase.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="min-w-0 flex-1 md:w-[60%]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#101E3F]">{phase.phase}</p>
                  <h3 className="mt-2 font-[var(--font-heading)] text-2xl font-medium text-[#166C96] md:text-3xl">
                    {phase.title}
                  </h3>
                  <p className="mt-2 font-[var(--font-body)] text-sm font-medium text-slate-600">{phase.tag}</p>
                  <p className="mt-6 text-lg leading-relaxed text-slate-700">{phase.intro}</p>
                  <div className="mt-10 space-y-10">
                    {phase.blocks.map((b) => (
                      <div key={b.title} className="border-l-[3px] border-[#166C96] pl-8">
                        <h4 className="font-[var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#101E3F]">
                          {b.title}
                        </h4>
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

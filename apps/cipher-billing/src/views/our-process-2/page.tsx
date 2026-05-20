import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

import { cipherOnboardingPhases } from "@/lib/cipherOnboardingPhases";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

const IMG_HERO =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T145809.503.png";

const processPreview = [
  { num: "01", label: "Onboard & Train" },
  { num: "02", label: "Partnership" },
  { num: "03", label: "Results" },
] as const;

export default function OurProcess2Page() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero — centered cinematic */}
      <section className="relative flex min-h-[min(72vh,640px)] flex-col justify-end overflow-hidden bg-[#101E3F]">
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
              background:
                "linear-gradient(to bottom, rgba(16, 30, 63, 0.35) 0%, rgba(16, 30, 63, 0.72) 55%, #101E3F 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1140px] px-5 pb-10 pt-28 text-center text-white md:pb-14 md:pt-36">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#166C96]">Our Process</p>
          <h1 className="mx-auto mt-5 max-w-4xl font-[var(--font-heading)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] md:text-6xl">
            A Proven Path to Maximum Reimbursement
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-[var(--font-heading)] text-sm italic leading-[1.42] text-white/90 md:text-lg">
            <AutoLinkedText>
              {
                "From compliance audits to claims resolution — protecting your revenue so you can focus on patient care."
              }
            </AutoLinkedText>
          </p>
        </div>

        {/* Process preview strip */}
        <div className="relative border-t border-white/10 bg-[#0D1833]/90 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1140px] grid-cols-3 divide-x divide-white/10 px-5">
            {processPreview.map((item) => (
              <div key={item.num} className="flex flex-col items-center gap-2 px-4 py-6 text-center md:flex-row md:justify-center md:gap-4 md:py-7">
                <span className="font-[var(--font-heading)] text-2xl font-medium text-[#166C96] md:text-3xl">{item.num}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 md:text-[11px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-phase overview stepper */}
      <section className="bg-[#101E3F] px-5 py-[50px] text-white md:py-[80px]">
        <div className="mx-auto max-w-[1140px]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-[8%] min-w-[48px] bg-[#166C96]" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">3-Phase Engagement</p>
            </div>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium md:text-[2.5rem]">
              How We Partner With You
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              <AutoLinkedText>
                {
                  "A proven, three-phase engagement model that protects your revenue from day one and scales with your organization."
                }
              </AutoLinkedText>
            </p>
          </div>

          <div className="mt-14 hidden lg:block">
            <div className="relative">
              <div
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#166C96] via-white/30 to-white/15"
                aria-hidden
              />
              <div className="relative grid grid-cols-3">
                {cipherOnboardingPhases.map((phase, i) => (
                  <div key={phase.phase} className="flex justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#166C96] text-sm font-bold text-white ring-4 ring-[#101E3F]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {cipherOnboardingPhases.map((phase, i) => (
              <article
                key={phase.phase}
                className="flex flex-col border border-white/15 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-[#166C96]/50"
              >
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#166C96] text-sm font-bold text-white lg:hidden">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#166C96]">{phase.phase}</p>
                <h3 className="mt-2 font-[var(--font-heading)] text-xl font-medium text-white md:text-2xl">{phase.title}</h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{phase.tag}</p>
                <p className="mt-5 text-sm leading-relaxed text-white/80">
                  <AutoLinkedText>{phase.intro}</AutoLinkedText>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Phase deep-dives — alternating image + copy */}
      {cipherOnboardingPhases.map((phase, i) => {
        const isEven = i % 2 === 0;
        const bgClass = isEven ? "bg-white text-[#101E3F]" : "bg-[#0D1833] text-white";
        const bodyClass = isEven ? "text-slate-600" : "text-white/80";
        const tagClass = isEven ? "text-slate-400" : "text-white/50";
        const checkBg = isEven ? "bg-[#166C96]/12 text-[#166C96]" : "bg-[#166C96]/20 text-[#5eb5e0]";

        return (
          <section key={`deep-${phase.phase}`} className={`${bgClass} px-5 py-[50px] md:py-[80px]`}>
            <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-2 md:items-center md:gap-16">
              <div className={isEven ? "order-1" : "order-1 md:order-2"}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">{phase.phase}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-medium leading-tight md:text-[2.25rem]">
                  {phase.title}
                </h2>
                <p className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tagClass}`}>{phase.tag}</p>
                <p className={`mt-6 text-sm leading-relaxed md:text-base ${bodyClass}`}>
                  <AutoLinkedText>{phase.intro}</AutoLinkedText>
                </p>

                <div className="mt-8 space-y-6">
                  {phase.blocks.map((block) => (
                    <div key={block.title} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${checkBg}`}
                        aria-hidden
                      >
                        <i className="ri-check-line text-xs leading-none" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold">{block.title}</h3>
                        <p className={`mt-1 text-sm leading-relaxed ${bodyClass}`}>
                          <AutoLinkedText>{block.body}</AutoLinkedText>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`relative mx-auto aspect-[4/5] w-full max-w-md ${isEven ? "order-2" : "order-2 md:order-1"}`}
              >
                <div className="relative h-full overflow-hidden rounded-sm">
                  <Image
                    src={phase.image}
                    alt={phase.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-xl bg-[#166C96] px-5 py-4 shadow-xl md:-bottom-5 md:-right-5">
                  <p className="font-[var(--font-heading)] text-2xl font-medium leading-none text-white">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
                    {phase.tag}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Partnership promise */}
      <section className="bg-white px-5 py-[50px] md:py-[80px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[var(--font-heading)] text-2xl font-medium leading-[1.35] text-[#101E3F] md:text-[2rem] md:leading-[1.3]">
            Cipher Billing acts as an extension of your team{" "}
            <span className="italic text-[#166C96]">
              — protecting your revenue, delivering financial clarity, and freeing you to focus on patient care.
            </span>
          </p>
          <Link
            href="/behavioral-health-revenue-cycle-management"
            className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#166C96] transition hover:text-[#101E3F]"
          >
            Explore Our Services <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#101E3F] px-5 py-[50px] md:py-[80px]">
        <div className="mx-auto max-w-[1140px] rounded-sm border border-white/10 bg-[#0d1833] px-8 py-12 text-center md:px-12 md:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Get In Touch</p>
          <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium leading-[1.2] text-white md:text-[2.25rem]">
            Ready to optimize your revenue cycle?
            <br />
            <span className="text-[#166C96]">Request a consultation today.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
            <AutoLinkedText>
              {
                "Schedule a complimentary consultation with our billing experts to review your current revenue cycle and identify opportunities for improvement."
              }
            </AutoLinkedText>
          </p>
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

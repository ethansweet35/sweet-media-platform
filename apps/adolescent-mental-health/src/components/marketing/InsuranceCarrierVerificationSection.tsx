import Link from "next/link";
import type { InsuranceCarrierConfig } from "@/lib/insurance-carrier-pages";
import { CONTAINER, SITE } from "@/lib/site";
import { SECTION_PY } from "./tokens";

type InsuranceCarrierVerificationSectionProps = {
  carrierName: string;
  verification: InsuranceCarrierConfig["verification"];
  description?: string;
  verifyHref?: string;
};

export default function InsuranceCarrierVerificationSection({
  carrierName,
  verification,
  description = "We handle the back-and-forth with your insurer so you can focus on getting your teen the right level of care.",
  verifyHref = "/contact",
}: InsuranceCarrierVerificationSectionProps) {
  return (
    <section className={`bg-white px-6 ${SECTION_PY} lg:px-10`}>
      <div className={CONTAINER}>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden />
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
                {verification.eyebrow}
              </p>
            </div>

            <h2
              className="text-3xl font-bold leading-tight text-ink md:text-4xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              {verification.title}
            </h2>

            <p className="mt-5 text-sm leading-8 text-body">{description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={verifyHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cta px-7 py-3.5 text-sm font-bold text-white transition hover:bg-cta-hover"
              >
                Start verification
                <i className="ri-arrow-right-line text-accent" aria-hidden />
              </Link>
              <a
                href={SITE.phone.href}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-accent/50"
              >
                <i className="ri-phone-fill text-accent" aria-hidden />
                {SITE.phone.display}
              </a>
            </div>
          </div>

          <div className="relative min-w-0">
            <div
              className="absolute bottom-6 left-6 top-6 w-px bg-border"
              aria-hidden
            />

            <ol className="space-y-0">
              {verification.steps.map((step, index) => (
                <li
                  key={step.num}
                  className={`relative flex gap-6 ${index < verification.steps.length - 1 ? "pb-10" : ""}`}
                >
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-dark text-white shadow-md ring-4 ring-white">
                      <i className={`${step.icon} text-lg`} aria-hidden />
                    </span>
                    <span
                      className="mt-2 text-[10px] font-bold tabular-nums text-accent"
                      style={{ fontFamily: "var(--font-heebo)" }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 rounded-2xl bg-surface px-6 py-5 ring-1 ring-border">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                        {step.title}
                      </h3>
                      {index === verification.steps.length - 1 ? (
                        <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-dark">
                          Ready to enroll
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LeadForm from "@/components/forms/LeadForm";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const fallback: Metadata = {
  title: "Verify Your Insurance | Missouri Behavioral Health",
  description:
    "Confidentially verify your insurance benefits for mental health and addiction treatment at Missouri Behavioral Health in Springfield, MO. Most major plans accepted. Call 24/7.",
  alternates: { canonical: "/verify-insurance" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/verify-insurance", fallback);
}

const CARRIERS = [
  { name: "Aetna", href: "/aetna-outpatient-services" },
  { name: "Anthem Blue Cross", href: "/anthem-blue-cross-coverage" },
  { name: "Blue Cross Blue Shield", href: "/blue-cross-blue-shield-coverage" },
  { name: "Cigna", href: "/cigna-outpatient-coverage" },
  { name: "Beacon Health", href: "/beacon-health-insurance-rehab-coverage" },
  { name: "Carelon", href: "/carelon-behavioral-health-insurance" },
  { name: "GEHA", href: "/geha-insurance-coverage" },
  { name: "Cox Health", href: "/cox-health-missouri" },
];

const STEPS = [
  {
    icon: "ri-file-list-3-line",
    title: "Submit your details",
    desc: "Share your insurance provider and member ID using the secure form. It takes about two minutes.",
  },
  {
    icon: "ri-search-eye-line",
    title: "We verify your benefits",
    desc: "Our admissions team confirms your coverage, deductibles, and out-of-pocket costs directly with your insurer.",
  },
  {
    icon: "ri-phone-line",
    title: "We call you back",
    desc: "A coordinator walks you through exactly what your plan covers — with no obligation and no pressure.",
  },
];

const ASSURANCES = [
  "Verification is 100% free and confidential",
  "No obligation to enroll in treatment",
  "Most major PPO and HMO plans accepted",
  "We explain your benefits in plain language",
];

export default function VerifyInsurancePage() {
  return (
    <main className="bg-cream">
      {/* Hero + form */}
      <section className="relative overflow-hidden bg-mbh-forest-deep text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-[30rem] w-[30rem] rounded-full bg-mbh-green/15 blur-3xl"
        />
        <div className={`${CONTAINER} relative grid gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24`}>
          <div className="flex flex-col justify-center">
            <nav
              className="mb-6 flex items-center gap-2 font-body text-[11px] text-white/40"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="transition hover:text-white/70">
                Home
              </Link>
              <i className="ri-arrow-right-s-line" aria-hidden />
              <span className="text-white/60">Verify Insurance</span>
            </nav>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
                Insurance Verification
              </span>
            </div>

            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
            >
              Verify your insurance benefits.
            </h1>
            <p className="mt-5 max-w-md font-body text-[1.0625rem] leading-relaxed text-white/65">
              Find out what your plan covers for mental health and addiction treatment — confidentially,
              with no obligation. Most major insurance plans are accepted at Missouri Behavioral Health.
            </p>

            <ul className="mt-8 space-y-3">
              {ASSURANCES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/20">
                    <i className="ri-check-line text-[10px] text-mbh-sage" aria-hidden />
                  </span>
                  <span className="font-body text-sm text-white/75">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
              <span className="font-body text-sm text-white/50">Prefer to talk now?</span>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-sage transition hover:text-white"
              >
                <i className="ri-phone-fill" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-mbh-forest">
              Check my coverage
            </h2>
            <p className="mt-1.5 font-body text-sm text-mbh-body">
              Complete the form and our team will verify your benefits for you.
            </p>
            <div className="mt-6">
              <LeadForm
                source="Verify Insurance"
                submitLabel="Verify my benefits"
                fields={["name", "email", "phone", "insurance_provider", "member_id", "message"]}
                successTitle="We’ve received your verification request."
                successBody="An admissions coordinator will confirm your benefits and call you back shortly."
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-[88px]">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                How It Works
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Three simple steps to peace of mind.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-mbh-forest/8 bg-cream p-7"
              >
                <span className="font-display text-4xl font-bold text-mbh-green/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${step.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-mbh-forest">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carriers */}
      <section className="bg-cream-alt py-[88px]">
        <div className={CONTAINER}>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Accepted Plans
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                Insurance providers we work with.
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body">
                We&apos;re in-network with many major carriers and can verify out-of-network benefits too.
                Don&apos;t see your plan? Call us — we&apos;ll still check your coverage.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CARRIERS.map((carrier) => (
              <Link
                key={carrier.name}
                href={carrier.href}
                className="group flex items-center gap-2.5 rounded-xl border border-mbh-forest/10 bg-white px-4 py-4 transition hover:border-mbh-green hover:shadow-md hover:shadow-mbh-forest/5"
              >
                <i className="ri-shield-check-line text-mbh-green" aria-hidden />
                <span className="font-body text-sm font-medium text-mbh-ink transition group-hover:text-mbh-forest">
                  {carrier.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

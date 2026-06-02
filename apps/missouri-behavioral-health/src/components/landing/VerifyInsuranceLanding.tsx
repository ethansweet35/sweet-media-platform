import Link from "next/link";
import LeadForm from "@/components/forms/LeadForm";
import MedicaidMedicareNotice from "@/components/landing/MedicaidMedicareNotice";
import { CONTAINER, FACILITY_ADDRESS, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

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

export type VerifyInsuranceLandingProps = {
  formSource: string;
  breadcrumbLabel?: string;
  /** Live FB landing uses “Free Assessment” and shows the Medicaid/Medicare notice. */
  variant?: "default" | "facebook";
};

export default function VerifyInsuranceLanding({
  formSource,
  breadcrumbLabel = "Verify Insurance",
  variant = "default",
}: VerifyInsuranceLandingProps) {
  const isFb = variant === "facebook";
  const eyebrow = isFb ? "Free Assessment" : "Insurance Verification";
  const headline = isFb
    ? "Verify your insurance benefits today."
    : "Verify your insurance benefits.";

  return (
    <main className="bg-cream">
      {isFb ? <MedicaidMedicareNotice /> : null}

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
              <span className="text-white/60">{breadcrumbLabel}</span>
            </nav>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
                {eyebrow}
              </span>
            </div>

            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
            >
              {headline}
            </h1>
            <p className="mt-5 max-w-md font-body text-[1.0625rem] leading-relaxed text-white/65">
              {isFb
                ? "Many people worry about the cost of treatment. We accept private health insurance and private pay — and our team verifies your benefits at no cost so there are no surprises."
                : "Find out what your plan covers for mental health and addiction treatment — confidentially, with no obligation. Most major insurance plans are accepted at Missouri Behavioral Health."}
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

            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-4">
                <span className="font-body text-sm text-white/50">Prefer to talk now?</span>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-sage transition hover:text-white"
                >
                  <i className="ri-phone-fill" aria-hidden />
                  {PHONE_DISPLAY}
                </a>
              </div>
              {isFb ? (
                <p className="flex items-start gap-2 font-body text-xs text-white/45 sm:max-w-xs">
                  <i className="ri-map-pin-2-line mt-0.5 shrink-0 text-mbh-sage" aria-hidden />
                  {FACILITY_ADDRESS}
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-mbh-forest">
              {isFb ? "Request a free assessment" : "Check my coverage"}
            </h2>
            <p className="mt-1.5 font-body text-sm text-mbh-body">
              {isFb
                ? "Fill out the form below or call us — our team will verify coverage and explain your options."
                : "Complete the form and our team will verify your benefits for you."}
            </p>
            <div className="mt-6">
              <LeadForm
                source={formSource}
                submitLabel={isFb ? "Get my free assessment" : "Verify my benefits"}
                fields={["name", "email", "phone", "insurance_provider", "member_id", "message"]}
                successTitle="We’ve received your request."
                successBody="An admissions coordinator will confirm your benefits and call you back shortly."
              />
            </div>
          </div>
        </div>
      </section>

      {isFb ? (
        <section className="border-b border-mbh-forest/8 bg-white py-12">
          <div className={CONTAINER}>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Insurance &amp; Cost
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight text-mbh-forest">
              Insurance plans and average costs
            </h2>
            <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-mbh-body">
              Clients should confirm coverage details to avoid surprises. We partner with major private
              insurers to reduce out-of-pocket costs where possible. Our administrative team verifies
              benefits before admission so you know what to expect.
            </p>
          </div>
        </section>
      ) : null}

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

      <section className="bg-cream-alt py-[88px]">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-xl">
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

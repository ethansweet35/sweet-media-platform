import Link from "next/link";

const COVERAGE = [
  "Partial Hospitalization Program (PHP)",
  "Intensive Outpatient Program (IOP)",
  "Outpatient Program (OP)",
  "Medication-Assisted Treatment",
  "EMDR & Trauma Therapy",
  "Dual Diagnosis Treatment",
  "Family Therapy",
  "Aftercare & Alumni Support",
];

const CARRIERS = [
  { name: "Aetna", href: "/admissions/insurance/aetna/" },
  { name: "Anthem", href: "/admissions/insurance/anthem/" },
  { name: "Cigna", href: "/admissions/insurance/cigna/" },
  { name: "Tricare", href: "/admissions/insurance/tricare/" },
  { name: "UHC", href: "/admissions/insurance/uhc/" },
];

export default function VerificationSection() {
  return (
    <section className="bg-[var(--mvt-cream)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Form */}
          <div className="rounded-2xl border border-[var(--mvt-cream-2)] bg-white p-8 shadow-sm lg:p-10">
            <p className="mvt-eyebrow">Confidential Inquiry</p>
            <h2 className="mt-3 font-heading text-3xl leading-tight text-[var(--mvt-ink)] sm:text-4xl">
              Seamless Verification. <span className="italic text-[var(--mvt-forest)]">Absolute Discretion.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[var(--mvt-text)]">
              Submit your information for a complimentary benefits check. Our
              admissions team will follow up within minutes — 24/7, fully
              HIPAA-compliant.
            </p>

            <form className="mt-7 grid gap-3" action="/contact/" method="POST">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  name="first_name"
                  required
                  placeholder="First Name"
                  className="rounded-md border border-[var(--mvt-cream-2)] bg-white px-4 py-3 text-sm text-[var(--mvt-ink)] placeholder:text-[var(--mvt-muted)] focus:border-[var(--mvt-forest)] focus:outline-none"
                />
                <input
                  type="text"
                  name="last_name"
                  required
                  placeholder="Last Name"
                  className="rounded-md border border-[var(--mvt-cream-2)] bg-white px-4 py-3 text-sm text-[var(--mvt-ink)] placeholder:text-[var(--mvt-muted)] focus:border-[var(--mvt-forest)] focus:outline-none"
                />
              </div>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                className="rounded-md border border-[var(--mvt-cream-2)] bg-white px-4 py-3 text-sm text-[var(--mvt-ink)] placeholder:text-[var(--mvt-muted)] focus:border-[var(--mvt-forest)] focus:outline-none"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="rounded-md border border-[var(--mvt-cream-2)] bg-white px-4 py-3 text-sm text-[var(--mvt-ink)] placeholder:text-[var(--mvt-muted)] focus:border-[var(--mvt-forest)] focus:outline-none"
              />
              <input
                type="text"
                name="insurance"
                placeholder="Insurance Provider (Optional)"
                className="rounded-md border border-[var(--mvt-cream-2)] bg-white px-4 py-3 text-sm text-[var(--mvt-ink)] placeholder:text-[var(--mvt-muted)] focus:border-[var(--mvt-forest)] focus:outline-none"
              />
              <textarea
                name="message"
                rows={3}
                placeholder="How can we help you today?"
                className="resize-none rounded-md border border-[var(--mvt-cream-2)] bg-white px-4 py-3 text-sm text-[var(--mvt-ink)] placeholder:text-[var(--mvt-muted)] focus:border-[var(--mvt-forest)] focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--mvt-ink)] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[var(--mvt-forest-deep)]"
              >
                Verify My Benefits
                <i className="ri-arrow-right-line text-base" aria-hidden="true" />
              </button>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--mvt-muted)]">
                Free · 100% Confidential · No Obligation
              </p>
            </form>
          </div>

          {/* Coverage list */}
          <div>
            <p className="mvt-eyebrow">What's Covered</p>
            <h3 className="mt-3 font-heading text-3xl leading-tight text-[var(--mvt-ink)]">
              Insurance-approved levels of care.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--mvt-text)]">
              Most insurance plans cover our outpatient programs. We work
              directly with major carriers and out-of-network benefits.
            </p>

            <ul className="mt-7 space-y-3">
              {COVERAGE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-forest)] text-white">
                    <i className="ri-check-line text-xs" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-[var(--mvt-text)]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-[var(--mvt-cream-2)] bg-white p-7">
              <p className="mvt-eyebrow">Accepted Carriers</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {CARRIERS.map((c) => (
                  <Link
                    key={c.name}
                    href={c.href}
                    className="rounded-full border border-[var(--mvt-cream-2)] bg-[var(--mvt-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mvt-ink)] hover:border-[var(--mvt-forest)]/40 hover:bg-white"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/admissions/insurance/"
                className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-forest)] hover:text-[var(--mvt-ink)]"
              >
                See All Plans Accepted
                <i className="ri-arrow-right-line text-base" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

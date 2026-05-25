import Link from "next/link";
import {
  ADDITIONAL_ACCEPTED_PLANS,
  INSURANCE_CARRIERS,
  INSURANCE_VERIFICATION_PLANS,
} from "@/data/insurance";
import InsuranceLogo from "./InsuranceLogo";

export default function InsuranceAcceptedPlans() {
  return (
    <section className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-10 md:py-12">
      <div className="sr-container">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="sr-eyebrow mb-2">Accepted plans</p>
            <h2
              className="text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Plans we verify
            </h2>
          </div>
          <p
            className="max-w-md text-[13px] leading-[1.7] text-[var(--sr-muted)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            In-network with Aetna, Anthem, Cigna & Beacon — plus verification guides for
            UnitedHealthcare, Humana, BCBS, Tricare, Kaiser, and PPO out-of-network plans.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {INSURANCE_CARRIERS.map((carrier) => (
            <InsuranceLogo
              key={carrier.name}
              carrier={carrier}
              surface="moss"
              compact
            />
          ))}
        </div>

        <div className="border border-[var(--sr-sand)] bg-[var(--sr-linen)]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="border-b border-[var(--sr-sand)] p-5 md:border-b-0 md:border-r md:p-6">
              <p
                className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sr-fern)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                In-network · coverage pages
              </p>
              <ul className="space-y-2">
                {INSURANCE_CARRIERS.map((carrier) => (
                  <li key={carrier.name}>
                    <Link
                      href={carrier.href}
                      className="group inline-flex items-center gap-2 text-[14px] text-[var(--sr-ink)] transition hover:text-[var(--sr-moss)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      <i
                        className="ri-arrow-right-s-line text-[var(--sr-fern)] transition group-hover:translate-x-0.5"
                        aria-hidden
                      />
                      {carrier.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-[var(--sr-sand)] p-5 md:border-b-0 md:border-r md:p-6">
              <p
                className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sr-fern)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Verification guides
              </p>
              <ul className="space-y-2">
                {INSURANCE_VERIFICATION_PLANS.map((plan) => (
                  <li key={plan.href}>
                    <Link
                      href={plan.href}
                      className="group inline-flex items-center gap-2 text-[14px] text-[var(--sr-ink)] transition hover:text-[var(--sr-moss)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      <i
                        className="ri-arrow-right-s-line text-[var(--sr-fern)] transition group-hover:translate-x-0.5"
                        aria-hidden
                      />
                      {plan.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 md:p-6">
              <p
                className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sr-muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Also accepted for verification
              </p>
              <ul
                className="grid grid-cols-1 gap-y-1.5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {ADDITIONAL_ACCEPTED_PLANS.map((plan) => (
                  <li key={plan} className="text-[13px] leading-snug text-[var(--sr-ink)]/85">
                    {plan}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p
          className="mt-4 text-[12px] text-[var(--sr-muted)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Don&apos;t see your plan?{" "}
          <Link href="#verify-form" className="font-medium text-[var(--sr-fern)] hover:underline">
            Submit your member ID
          </Link>{" "}
          — we&apos;ll confirm eligibility, usually within one business day.
        </p>
      </div>
    </section>
  );
}

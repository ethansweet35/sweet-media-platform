import Link from "next/link";
import {
  ADDITIONAL_ACCEPTED_PLANS,
  INSURANCE_CARRIERS,
  INSURANCE_VERIFICATION_PLANS,
} from "@/data/insurance";
import InsuranceLogo from "@/components/pages/insurance/InsuranceLogo";
import { resolveInsurancePageIdentity } from "@/lib/insurancePageIdentity";
import type { InsurancePageData } from "@/types/insurancePage";

type Props = {
  data: InsurancePageData;
};

const CARRIER_BLURBS: Record<string, string> = {
  "/insurance/aetna/":
    "Employer, marketplace, Medicare, and Medicaid plans in Orange County.",
  "/insurance/anthem/":
    "Blue Cross California plans — individual, group, and Medi-Cal where applicable.",
  "/insurance/cigna/":
    "National employer, individual, and Medicare Advantage substance use benefits.",
  "/insurance/beacon/":
    "Behavioral health network plans tied to employer and managed care partners.",
};

const PLAN_BLURBS: Record<string, string> = {
  "/insurance/united-healthcare/":
    "Employer, individual, and Medicare plans through UnitedHealthcare and Optum networks.",
  "/insurance/humana/":
    "Medicare Advantage, employer, and individual Humana behavioral health benefits.",
  "/insurance/blue-cross-blue-shield/":
    "BCBS products nationwide — we verify California and out-of-state member benefits.",
  "/insurance/tricare/":
    "Active duty, veterans, and family TRICARE substance use benefits in California.",
  "/insurance/kaiser/":
    "Kaiser member verification — we confirm out-of-network and supplemental options.",
  "/insurance/ppo-out-of-network/":
    "Private PPO policies often reimburse a portion of detox and residential care.",
};

export default function InsuranceCarrierOtherPlans({ data }: Props) {
  const identity = resolveInsurancePageIdentity(data);
  const otherCarriers = INSURANCE_CARRIERS.filter((c) => c.href !== identity.href);
  const otherPlans = INSURANCE_VERIFICATION_PLANS.filter((p) => p.href !== identity.href);

  return (
    <section className="relative overflow-hidden border-t border-[var(--sr-sand)] bg-[var(--sr-linen)] py-14 md:py-20">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[var(--sr-moss)]/8"
        aria-hidden
      />
      <div className="sr-container relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="sr-eyebrow mb-4">More coverage options</p>
            <h2
              className="mb-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Explore other{" "}
              <span className="italic text-[var(--sr-fern)]">insurance pages</span>
            </h2>
            <p
              className="mb-6 text-[14px] leading-[1.8] text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              In-network carrier pages, verification guides for major plans, and a full
              directory on our insurance hub.
            </p>
            <Link
              href="/insurance/"
              className="inline-flex items-center gap-2 bg-[var(--sr-moss)] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:bg-[var(--sr-fern)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              View all accepted plans
              <i className="ri-arrow-right-line text-sm" aria-hidden />
            </Link>
          </div>

          <div className="space-y-8 lg:col-span-8">
            {otherCarriers.length > 0 ? (
              <div>
                <p
                  className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sr-fern)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  In-network carriers
                </p>
                <div className="grid gap-px border border-[var(--sr-sand)] bg-[var(--sr-sand)] sm:grid-cols-2 lg:grid-cols-3">
                  {otherCarriers.map((carrier) => (
                    <Link
                      key={carrier.href}
                      href={carrier.href}
                      className="group flex flex-col bg-[var(--sr-parchment)] p-6 transition hover:bg-[var(--sr-moss)] md:p-7"
                    >
                      <div className="mb-5">
                        <div className="block group-hover:hidden">
                          <InsuranceLogo carrier={carrier} surface="moss" compact link={false} />
                        </div>
                        <div className="hidden group-hover:block">
                          <InsuranceLogo carrier={carrier} surface="dark" compact link={false} />
                        </div>
                      </div>
                      <h3
                        className="mb-2 text-lg font-light text-[var(--sr-ink)] transition group-hover:text-white"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {carrier.name}
                      </h3>
                      <p
                        className="mb-4 flex-1 text-[13px] leading-[1.65] text-[var(--sr-muted)] transition group-hover:text-white/75"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {CARRIER_BLURBS[carrier.href]}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sr-fern)] transition group-hover:text-[var(--sr-sage)]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        Coverage page
                        <i
                          className="ri-arrow-right-line text-sm transition group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {otherPlans.length > 0 ? (
              <div>
                <p
                  className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sr-fern)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Benefits verification guides
                </p>
                <div className="grid gap-px border border-[var(--sr-sand)] bg-[var(--sr-sand)] sm:grid-cols-2">
                  {otherPlans.map((plan) => (
                    <Link
                      key={plan.href}
                      href={plan.href}
                      className="group flex flex-col bg-[var(--sr-parchment)] p-6 transition hover:bg-[var(--sr-moss)] md:p-7"
                    >
                      <span
                        className="mb-5 inline-flex h-12 w-fit items-center justify-center bg-[var(--sr-moss)] px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sr-sage)] transition group-hover:bg-[var(--sr-charcoal)] group-hover:text-white"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {plan.shortName}
                      </span>
                      <h3
                        className="mb-2 text-lg font-light text-[var(--sr-ink)] transition group-hover:text-white"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className="mb-4 flex-1 text-[13px] leading-[1.65] text-[var(--sr-muted)] transition group-hover:text-white/75"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {PLAN_BLURBS[plan.href]}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sr-fern)] transition group-hover:text-[var(--sr-sage)]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        Learn more
                        <i
                          className="ri-arrow-right-line text-sm transition group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="border border-[var(--sr-sand)] bg-[var(--sr-moss)] p-6 text-white md:p-8">
              <p
                className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-sage)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Also accepted
              </p>
              <p
                className="mb-5 text-[15px] leading-[1.75] text-white/80"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Health Net, Molina, Magellan, Multiplan, Oscar, and dozens more —
                submit your member ID and we will confirm eligibility.
              </p>
              <ul
                className="mb-6 grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] leading-snug text-white/60 sm:grid-cols-3"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {ADDITIONAL_ACCEPTED_PLANS.slice(0, 9).map((plan) => (
                  <li key={plan}>{plan}</li>
                ))}
              </ul>
              <Link
                href="/insurance/#verify-form"
                className="inline-flex w-fit items-center gap-2 border border-[var(--sr-sage)]/50 bg-[var(--sr-sage)] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Verify my plan
                <i className="ri-shield-check-line text-sm" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

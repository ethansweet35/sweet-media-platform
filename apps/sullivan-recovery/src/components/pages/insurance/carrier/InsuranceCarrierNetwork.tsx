import Link from "next/link";
import { INSURANCE_PROCESS_STEPS } from "@/data/insurance";
import { resolveInsurancePageIdentity } from "@/lib/insurancePageIdentity";
import type { InsurancePageData } from "@/types/insurancePage";

type Props = {
  data: InsurancePageData;
  inNetwork: InsurancePageData["inNetwork"];
};

export default function InsuranceCarrierNetwork({ data, inNetwork }: Props) {
  const identity = resolveInsurancePageIdentity(data);
  const sectionEyebrow =
    inNetwork.eyebrow ?? (identity.hasLogo ? "In-network" : "Your coverage");

  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-moss)] py-14 text-white md:py-20 [&_h2]:text-white [&_h3]:text-white">
      <div className="sr-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="sr-eyebrow mb-4 text-[var(--sr-sage)]">{sectionEyebrow}</p>
            <h2
              className="mb-6 text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.08]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {inNetwork.title}
            </h2>
            <div className="space-y-4">
              {inNetwork.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="text-[15px] leading-[1.8] text-white/80"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {p}
                </p>
              ))}
            </div>
            <Link
              href="/insurance/"
              className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-sage)] transition hover:text-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              All insurance options
              <i className="ri-arrow-right-line text-sm" aria-hidden />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <p
              className="mb-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              How {identity.shortName} verification works
            </p>
            <ol className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {INSURANCE_PROCESS_STEPS.map((step) => (
                <li key={step.num} className="bg-[var(--sr-moss)] p-5 md:p-6">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-sage)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {step.num} · {step.phase}
                  </span>
                  <h3
                    className="mt-2 mb-1 text-lg font-light"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.65] text-white/72"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

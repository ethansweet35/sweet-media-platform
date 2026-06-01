import Image from "next/image";
import Link from "next/link";
import { INSURANCE_CARRIER_PATHS } from "@/lib/insurance-carrier-pages";
import { CONTAINER } from "@/lib/site";
import { SECTION_PY } from "./tokens";

const CARRIER_LABELS: Record<string, string> = {
  aetna: "Aetna",
  cigna: "Cigna",
  anthem: "Anthem",
  becn: "Beacon",
  umr: "UMR",
};

type InsuranceCarrierOtherPlansSectionProps = {
  carriers: [string, string][];
  currentSlug?: string;
};

export default function InsuranceCarrierOtherPlansSection({
  carriers,
  currentSlug,
}: InsuranceCarrierOtherPlansSectionProps) {
  return (
    <section className={`bg-surface px-6 ${SECTION_PY} lg:px-10`}>
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Other plans</p>
          <h2
            className="mt-3 text-3xl font-bold text-ink md:text-4xl"
            style={{ fontFamily: "var(--font-heebo)" }}
          >
            We work with other major insurers too
          </h2>
          <p className="mt-5 text-sm leading-8 text-body">
            Browse carrier-specific coverage details below — admissions can verify any plan shown.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">
          {carriers.map(([key, src]) => {
            const label = CARRIER_LABELS[key] ?? key;
            const href = INSURANCE_CARRIER_PATHS[key as keyof typeof INSURANCE_CARRIER_PATHS];
            const isCurrent = href === `/insurance/${currentSlug}`;

            const tile = (
              <div
                className={`flex h-full flex-col items-center justify-center rounded-2xl bg-white px-5 py-8 text-center shadow-sm ring-1 transition hover:shadow-md ${
                  isCurrent ? "ring-2 ring-accent" : "ring-border hover:ring-accent/35"
                }`}
              >
                <div className="flex min-h-[4.5rem] w-full items-center justify-center">
                  <Image
                    src={src}
                    alt={`${label} insurance logo`}
                    width={180}
                    height={72}
                    className="h-12 w-auto max-w-full object-contain sm:h-14"
                  />
                </div>
                <p className="mt-5 text-sm font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {label}
                </p>
                <p className="mt-1 text-xs text-body">
                  {isCurrent ? "This page" : "View coverage details"}
                </p>
              </div>
            );

            if (href) {
              return (
                <Link key={key} href={href} className="block h-full">
                  {tile}
                </Link>
              );
            }

            return <div key={key}>{tile}</div>;
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/verify-insurance"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark transition hover:text-accent"
          >
            View all insurance options
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import InsuranceLogo from "@/components/pages/insurance/InsuranceLogo";
import { INSURANCE_CARRIERS, INSURANCE_VERIFY_BULLETS } from "@/data/insurance";

export default function HomeInsurance() {
  return (
    <section className="bg-[var(--sr-moss)] py-[100px]">
      <div className="sr-container">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Insurance Coverage
            </p>
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Don&apos;t let cost <br />
              stop your <em className="italic text-[var(--sr-sage)]">recovery.</em>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p
              className="mb-8 text-[14px] leading-[1.9] text-white/65"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              We work with most major insurance providers and PPO out-of-network plans.
              Our admissions team will verify your benefits quickly and confidentially —
              so you can focus on getting help, not navigating paperwork.
            </p>
            <Link
              href="/insurance/"
              className="inline-flex items-center gap-2 bg-[var(--sr-sage)] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--sr-ink)] transition hover:bg-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Verify My Insurance
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mb-12 border-y border-white/10 py-12 md:py-14">
          <p
            className="mb-10 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/45"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            In-network providers
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {INSURANCE_CARRIERS.map((carrier) => (
              <InsuranceLogo
                key={carrier.name}
                carrier={carrier}
                surface="dark"
                compact
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {INSURANCE_VERIFY_BULLETS.map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-4 bg-[var(--sr-moss)] px-6 py-7">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--sr-sage)]/30 text-[var(--sr-sage)]">
                <i className={`${icon} text-base`} aria-hidden />
              </span>
              <p
                className="text-[13px] leading-[1.7] text-white/70"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

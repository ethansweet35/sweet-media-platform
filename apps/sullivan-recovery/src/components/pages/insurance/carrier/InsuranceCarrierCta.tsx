import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import type { InsuranceCarrierPageData } from "@/types/insuranceCarrierPage";

type Props = InsuranceCarrierPageData["cta"];

export default function InsuranceCarrierCta({ title, description }: Props) {
  return (
    <section className="relative overflow-hidden bg-[var(--sr-charcoal)] py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 20% 100%, var(--sr-moss) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(181, 201, 160, 0.12) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <div className="sr-container relative z-10">
        <div className="grid grid-cols-1 gap-8 border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:grid-cols-12 md:gap-0 md:p-0 lg:items-stretch">
          <div className="md:col-span-7 md:border-r md:border-white/10 md:p-10 lg:p-12">
            <p
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Ready to begin?
            </p>
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.08] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h2>
            <p
              className="mt-4 max-w-lg text-[15px] leading-[1.8] text-white/70"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {description}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 md:col-span-5 md:p-10 lg:p-12">
            <Link
              href="/insurance/#verify-form"
              className="inline-flex items-center justify-center gap-2 bg-[var(--sr-sage)] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Verify online
              <i className="ri-shield-check-line text-sm" aria-hidden />
            </Link>
            <CallRailPhoneLink className="inline-flex items-center justify-center gap-2 border border-white/35 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10">
              <i className="ri-phone-fill text-sm" aria-hidden />
              Call admissions — 24/7
            </CallRailPhoneLink>
            <p
              className="text-center text-[11px] leading-relaxed text-white/45 md:text-left"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Confidential · No obligation · Usually within one business day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

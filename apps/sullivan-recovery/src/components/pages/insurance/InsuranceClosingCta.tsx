import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
export default function InsuranceClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--sr-charcoal)] py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, var(--sr-moss) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="sr-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
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
            Don&apos;t let coverage questions delay{" "}
            <span className="italic text-[var(--sr-sage)]">getting help</span>
          </h2>
          <p
            className="mx-auto mt-3 max-w-lg text-[14px] leading-[1.8] text-white/65"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Verify benefits today — confidential, no obligation.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#verify-form"
              className="inline-flex items-center justify-center gap-2 bg-[var(--sr-sage)] px-7 py-3 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Verify online
              <i className="ri-arrow-up-line text-sm" aria-hidden />
            </Link>
            <CallRailPhoneLink className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10">
              <i className="ri-phone-fill text-sm" aria-hidden />
              Call now
            </CallRailPhoneLink>
          </div>
        </div>
      </div>
    </section>
  );
}

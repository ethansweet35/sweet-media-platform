import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";

export default function DailyScheduleCta() {
  return (
    <section className="bg-[var(--sr-charcoal)] py-14 md:py-20">
      <div className="sr-container text-center">
        <p
          className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-sage)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Ready to begin?
        </p>
        <h2
          className="mx-auto max-w-2xl text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.08] text-white"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Take the first step toward{" "}
          <span className="italic text-[var(--sr-sage)]">structured recovery</span>
        </h2>
        <p
          className="mx-auto mt-4 max-w-md text-[15px] leading-[1.8] text-white/70"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Verify insurance or call admissions — we will walk you through detox, residential
          care, and what a typical day looks like for you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/insurance/"
            className="inline-flex items-center gap-2 bg-[var(--sr-sage)] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Verify insurance
            <i className="ri-shield-check-line text-sm" aria-hidden />
          </Link>
          <CallRailPhoneLink className="inline-flex items-center gap-2 border border-white/35 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10">
            <i className="ri-phone-fill text-sm" aria-hidden />
            Call admissions
          </CallRailPhoneLink>
        </div>
      </div>
    </section>
  );
}

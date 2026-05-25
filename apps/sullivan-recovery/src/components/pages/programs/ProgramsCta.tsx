import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";

export default function ProgramsCta() {
  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-moss)] py-14 md:py-20">
      <div className="sr-container text-center">
        <h2
          className="mx-auto max-w-2xl text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.08] text-white"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Ready to find the right level of care?
        </h2>
        <p
          className="mx-auto mt-3 max-w-md text-[14px] leading-[1.8] text-white/70"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Verify insurance and speak with admissions — we&apos;ll recommend detox, residential,
          or the pathway that fits your situation.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/insurance/"
            className="inline-flex items-center gap-2 bg-[var(--sr-sage)] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Verify insurance
            <i className="ri-shield-check-line text-sm" aria-hidden />
          </Link>
          <CallRailPhoneLink className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10">
            <i className="ri-phone-fill text-sm" aria-hidden />
            Call admissions
          </CallRailPhoneLink>
        </div>
      </div>
    </section>
  );
}

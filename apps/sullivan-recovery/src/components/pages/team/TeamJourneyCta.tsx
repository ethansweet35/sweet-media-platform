import Link from "next/link";
import CallNowLink from "@/components/ui/CallNowLink";

export default function TeamJourneyCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--sr-moss)] py-[100px] text-white">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[var(--sr-fern)]/20 blur-3xl" />

      <div className="sr-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-sage)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Your Journey, Your Success
          </p>
          <h2
            className="mb-6 text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Ready to take the first step toward a{" "}
            <span className="italic text-[var(--sr-sage)]">sober, healthier life?</span>
          </h2>
          <p
            className="mb-10 text-[15px] leading-[1.85] text-white/75"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Your journey to recovery is unique, and we are here to support you every step of
            the way. Contact Sullivan Recovery today — our team will guide you with compassion
            and clarity from the very first conversation.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/insurance/"
              className="inline-flex w-full items-center justify-center gap-2 bg-[var(--sr-sage)] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--sr-charcoal)] transition hover:bg-white sm:w-auto"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Start Your Journey
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
            <CallNowLink
              withPrefixOnDesktop
              className="inline-flex w-full items-center justify-center gap-2 border border-white/35 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition hover:border-white/70 hover:bg-white/10 sm:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

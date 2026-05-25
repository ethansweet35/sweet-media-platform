import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";

export default function PostCta() {
  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-moss)] py-20 md:py-24">
      <div className="sr-container">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Need help now?
            </p>
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-[1.08] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Confidential detox &{" "}
              <span className="italic text-[var(--sr-sage)]">aftercare in Mission Viejo</span>
            </h2>
            <p
              className="mt-4 max-w-lg text-[15px] leading-[1.85] text-white/70"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Same-day intake, private rooms, and medical supervision. Call or verify insurance —
              we&apos;re available 24/7.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <CallRailPhoneLink className="inline-flex items-center justify-center gap-2 border border-white/30 bg-transparent px-8 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10">
              <i className="ri-phone-fill text-sm" aria-hidden />
              Call now
            </CallRailPhoneLink>
            <Link
              href="/insurance/"
              className="inline-flex items-center justify-center gap-2 bg-[var(--sr-sage)] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:bg-[var(--sr-fern)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Verify insurance
              <i className="ri-shield-check-line text-sm" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

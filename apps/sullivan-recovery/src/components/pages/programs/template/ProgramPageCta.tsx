import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import type { ProgramPageCta as CtaData } from "@/types/programPage";

type Props = Partial<CtaData>;

export default function ProgramPageCta({
  title = "Ready to start medical detox?",
  description = "Verify insurance or call admissions — we can often coordinate same-day admission when clinically appropriate.",
}: Props) {
  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-moss)] py-16 md:py-24">
      <div className="sr-container">
        <div className="mx-auto max-w-3xl border border-white/15 bg-white/5 px-8 py-12 text-center backdrop-blur-sm md:px-14 md:py-16">
          <p
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-sage)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Confidential · 24/7
          </p>
          <h2
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.08] text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-lg text-[15px] leading-[1.85] text-white/72"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {description}
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
      </div>
    </section>
  );
}

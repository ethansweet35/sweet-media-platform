import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";

type DraftPageShellProps = {
  title: string;
  /** Where public users should go instead */
  primaryCta?: { label: string; href: string };
};

export default function DraftPageShell({
  title,
  primaryCta = { label: "Verify insurance & intake", href: "/insurance/" },
}: DraftPageShellProps) {
  return (
    <main className="min-h-[60vh] bg-[var(--sr-linen)]">
      <section className="sr-container py-20 md:py-28">
        <p
          className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-muted)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Draft · not published
        </p>
        <h1
          className="mb-4 max-w-xl text-[clamp(2rem,4vw,3rem)] font-light text-[var(--sr-ink)]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {title}
        </h1>
        <p
          className="mb-8 max-w-lg text-[15px] leading-[1.85] text-[var(--sr-muted)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          This page is temporarily unpublished. Admissions, insurance verification, and intake
          information live on our verify insurance page — or call admissions anytime.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 bg-[var(--sr-moss)] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-parchment)] transition hover:bg-[var(--sr-fern)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {primaryCta.label}
            <i className="ri-arrow-right-line text-sm" aria-hidden />
          </Link>
          <CallRailPhoneLink className="inline-flex items-center gap-2 border border-[var(--sr-sand)] bg-[var(--sr-parchment)] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:border-[var(--sr-moss)]">
            <i className="ri-phone-fill text-sm text-[var(--sr-moss)]" aria-hidden />
            Call admissions
          </CallRailPhoneLink>
        </div>
      </section>
    </main>
  );
}

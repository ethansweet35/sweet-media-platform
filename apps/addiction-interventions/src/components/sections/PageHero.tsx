import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF, TRUST_SIGNALS } from "@/data/site";

export type PageHeroProps = {
  eyebrow?: string;
  headline: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showTrustLine?: boolean;
};

/**
 * Brand-standard hero used by every templated landing page. Renders a soft
 * cream background with no photo by default; per the platform-unique-page
 * imagery rule, hero photos are added per-page later as page-specific AI
 * images become available.
 */
export default function PageHero({
  eyebrow,
  headline,
  body,
  primaryCta = { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  secondaryCta = { label: "Request a Call Back", href: "/contact" },
  showTrustLine = true,
}: PageHeroProps) {
  const isPhone = primaryCta.href.startsWith("tel:");
  return (
    <section className="bg-[var(--color-cream)]">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
        {eyebrow && (
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)] md:text-6xl">
          {headline}
        </h1>
        {body && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            {body}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={primaryCta.href}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sage)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-sage-deep)]"
          >
            {isPhone && <i className="ri-phone-fill text-base"></i>}
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
        {showTrustLine && (
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
            {TRUST_SIGNALS.availability} &middot; {TRUST_SIGNALS.accreditation}
          </p>
        )}
      </div>
    </section>
  );
}

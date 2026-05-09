import Link from "next/link";

interface CtaItem {
  label: string;
  href: string;
}

interface CtaBannerProps {
  eyebrow?: string;
  headline: string;
  body?: string;
  primaryCta: CtaItem;
  secondaryCta?: CtaItem;
}

/**
 * Full-width navy CTA strip for the bottom of inner pages.
 * Consistent treatment across all page templates.
 */
export default function CtaBanner({
  eyebrow = "Take the First Step",
  headline,
  body,
  primaryCta,
  secondaryCta,
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-navy-light/50" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-terracotta/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Text */}
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                {eyebrow}
              </p>
            )}
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {headline}
            </h2>
            {body && (
              <p className="mt-3 text-base leading-relaxed text-white/70">{body}</p>
            )}
          </div>

          {/* CTAs */}
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 bg-terracotta px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-light"
            >
              {primaryCta.label}
              <i className="ri-arrow-right-line" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                <i className="ri-phone-line" />
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-white/10 pt-10">
          {[
            { icon: "ri-time-line", text: "24/7 Admissions Available" },
            { icon: "ri-shield-check-line", text: "DHCS Licensed #300661CP" },
            { icon: "ri-secure-payment-line", text: "Insurance Accepted" },
            { icon: "ri-map-pin-2-line", text: "Orange County & Seattle" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-xs font-semibold text-white/50"
            >
              <i className={`${item.icon} text-sm text-terracotta`} />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

export type Breadcrumb = { label: string; href?: string };

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  /** First occurrence of this word in `headline` gets italic + terracotta styling */
  italicWord?: string;
  body: string;
  image: string;
  imageAlt: string;
  breadcrumbs?: Breadcrumb[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/**
 * Full-width dark hero for all Northbound inner pages.
 * Dark navy overlay on a full-bleed photo, content left-aligned.
 */
export default function PageHero({
  eyebrow,
  headline,
  italicWord,
  body,
  image,
  imageAlt,
  breadcrumbs,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  const headlineParts = italicWord
    ? headline.split(new RegExp(`(${italicWord})`, "i"))
    : [headline];

  return (
    <section className="relative min-h-[520px] lg:min-h-[600px] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient overlay — dark left, lighter right */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

      {/* Terracotta glow accent */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-terracotta/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
            <Link href="/" className="transition hover:text-terracotta">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <i className="ri-arrow-right-s-line text-white/30" />
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-terracotta">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
          {eyebrow}
        </p>

        {/* Headline */}
        <h1 className="font-heading max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          {italicWord
            ? headlineParts.map((part, i) =>
                part.toLowerCase() === italicWord.toLowerCase() ? (
                  <span key={i} className="italic text-terracotta">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )
            : headline}
        </h1>

        {/* Body */}
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
          {body}
        </p>

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-light"
              >
                {primaryCta.label}
                <i className="ri-arrow-right-line" />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}

        {/* Trust strip */}
        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
          {[
            { icon: "ri-shield-check-line", text: "DHCS Licensed #300661CP" },
            { icon: "ri-award-line", text: "38+ Years of Experience" },
            { icon: "ri-phone-line", text: "24/7 Admissions Support" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-xs font-semibold text-white/60">
              <i className={`${item.icon} text-terracotta`} />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

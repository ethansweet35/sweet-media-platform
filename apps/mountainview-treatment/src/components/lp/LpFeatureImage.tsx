import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

interface LpFeatureImageProps {
  eyebrow: string;
  headline: string;
  body: string[];
  bullets?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
  /** "image-left" (default) or "image-right" */
  layout?: "image-left" | "image-right";
}

export default function LpFeatureImage({
  eyebrow,
  headline,
  body,
  bullets,
  ctaLabel = "Call Now",
  ctaHref,
  imageSrc,
  imageAlt,
  layout = "image-left",
}: LpFeatureImageProps) {
  const href = ctaHref ?? SITE.phone.href;
  const imageCol = (
    <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[480px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {/* Subtle forest tint overlay */}
      <div className="absolute inset-0 bg-[var(--mvt-forest)]/10" />
    </div>
  );

  const contentCol = (
    <div className="flex flex-col justify-center px-8 py-10 lg:px-14 lg:py-12 w-full max-w-[640px] lg:max-w-none mx-auto lg:mx-0">
      <p className="mvt-eyebrow mb-4">{eyebrow}</p>
      <h2
        className="font-heading font-light text-[var(--mvt-ink)] mb-5 leading-[1.07]"
        style={{ fontSize: "clamp(26px, 2.8vw, 42px)" }}
      >
        {headline}
      </h2>
      <div className="w-10 h-[2px] bg-[var(--mvt-forest)] mb-6" />

      <div className="flex flex-col gap-3 mb-6">
        {body.map((para, i) => (
          <p key={i} className="text-base font-light leading-relaxed text-[var(--mvt-muted)]">
            {para}
          </p>
        ))}
      </div>

      {bullets && bullets.length > 0 && (
        <ul className="mb-8 flex flex-col gap-2.5">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <i className="ri-checkbox-circle-line text-[var(--mvt-forest)] text-sm shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm font-light text-[var(--mvt-text)] leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <a
          href={href}
          className="inline-flex items-center gap-2 bg-[var(--mvt-forest)] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:opacity-90 transition-opacity"
        >
          <i className="ri-phone-fill text-xs" aria-hidden="true" />
          {ctaLabel}
        </a>
        <Link
          href="/admissions/"
          className="inline-flex items-center gap-2 border border-[var(--mvt-forest)]/40 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--mvt-forest)] hover:border-[var(--mvt-forest)] hover:bg-[var(--mvt-cream)] transition-colors"
        >
          Verify Insurance
        </Link>
      </div>
    </div>
  );

  return (
    <section className="bg-[var(--mvt-cream-2)] py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 items-stretch">
        {layout === "image-left" ? (
          <>
            {imageCol}
            {contentCol}
          </>
        ) : (
          <>
            {contentCol}
            {imageCol}
          </>
        )}
      </div>
    </section>
  );
}

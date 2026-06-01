import Image from "next/image";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

export type PageHeroProps = {
  eyebrow?: string;
  headline: string;
  /** Word(s) in the headline to italicise and colour with sage */
  italicWord?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showTrustLine?: boolean;
  /** When provided, renders a full-bleed dark-overlay hero; falls back to cream bg */
  image?: string;
  imageAlt?: string;
};

const trustBullets = [
  { icon: "ri-shield-check-line", text: "100% Confidential" },
  { icon: "ri-time-line", text: "Available 24 / 7" },
  { icon: "ri-map-pin-2-line", text: "All 50 States" },
  { icon: "ri-award-line", text: "Joint Commission Accredited" },
];

function HeadlineContent({
  headline,
  italicWord,
  onDark,
}: {
  headline: string;
  italicWord?: string;
  onDark: boolean;
}) {
  if (italicWord && headline.includes(italicWord)) {
    const [before, after] = headline.split(italicWord);
    return (
      <>
        {before}
        <span className={`italic ${onDark ? "text-[#8FAC87]" : "text-[#507969]"}`}>
          {italicWord}
        </span>
        {after}
      </>
    );
  }
  return headline;
}

export default function PageHero({
  eyebrow,
  headline,
  italicWord,
  body,
  primaryCta = { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  secondaryCta = { label: "Request a Consultation", href: "/contact" },
  showTrustLine = true,
  image,
  imageAlt,
}: PageHeroProps) {
  const isPhone = primaryCta.href.startsWith("tel:");

  const headlineField = (
    <span className={image ? "text-white" : "text-[#1A1A17]"}><HeadlineContent headline={headline} italicWord={italicWord} onDark={!!image} /></span>
  );

  if (image) {
    return (
      <section className="relative w-full overflow-hidden min-h-[480px] md:min-h-[560px] flex items-end">
        <Image
          src={image}
          alt={imageAlt ?? headline}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/85 via-[#1A1A17]/60 to-[#1A1A17]/20" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/30" />

        <div className="relative w-full mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24">
          {eyebrow ? (
            <span className="brand-eyebrow mb-4 block text-[#8FAC87]">{eyebrow}</span>
          ) : null}
          <h1 className="font-heading max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {headlineField}
          </h1>
          {body ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{body}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
            >
              {isPhone && <i className="ri-phone-fill text-base"></i>}
              {primaryCta.label}
            </a>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>

          {showTrustLine ? (
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {trustBullets.map((b) => (
                <div key={b.text} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87]/25 text-[#8FAC87]">
                    <i className={`${b.icon} text-xs`}></i>
                  </span>
                  <span className="text-sm font-medium text-white/80">{b.text}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5F3E7] py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {eyebrow ? (
          <span className="brand-eyebrow mb-4 block text-[#8FAC87]">{eyebrow}</span>
        ) : null}
        <h1 className="font-heading max-w-3xl text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl lg:text-6xl">
          {headlineField}
        </h1>
        {body ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#4B4B4B] md:text-lg">{body}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={primaryCta.href}
            className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
          >
            {isPhone && <i className="ri-phone-fill text-base"></i>}
            {primaryCta.label}
          </a>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-[#8FAC87]/40 px-7 py-3.5 text-sm font-semibold text-[#507969] transition hover:border-[#8FAC87] hover:bg-[#8FAC87]/10"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>

        {showTrustLine ? (
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trustBullets.map((b) => (
              <div key={b.text} className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87]/20 text-[#507969]">
                  <i className={`${b.icon} text-xs`}></i>
                </span>
                <span className="text-sm font-medium text-[#4B4B4B]">{b.text}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

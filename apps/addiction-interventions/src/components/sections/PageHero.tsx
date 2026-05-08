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
};

const trustBullets = [
  { icon: "ri-shield-check-line", text: "100% Confidential" },
  { icon: "ri-time-line", text: "Available 24 / 7" },
  { icon: "ri-map-pin-2-line", text: "All 50 States" },
  { icon: "ri-award-line", text: "Joint Commission Accredited" },
];

export default function PageHero({
  eyebrow,
  headline,
  italicWord,
  body,
  primaryCta = { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  secondaryCta = { label: "Request a Consultation", href: "/contact" },
  showTrustLine = true,
}: PageHeroProps) {
  const isPhone = primaryCta.href.startsWith("tel:");

  /* Optionally wrap a word in italic + sage colour */
  let headlineNode: React.ReactNode = headline;
  if (italicWord && headline.includes(italicWord)) {
    const [before, after] = headline.split(italicWord);
    headlineNode = (
      <>
        {before}
        <span className="italic text-[#507969]">{italicWord}</span>
        {after}
      </>
    );
  }

  return (
    <section className="bg-[#F5F3E7] py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {eyebrow && (
          <p className="brand-eyebrow mb-4 text-[#8FAC87]">{eyebrow}</p>
        )}
        <h1 className="font-heading max-w-3xl text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl lg:text-6xl">
          {headlineNode}
        </h1>
        {body && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#4B4B4B] md:text-lg">
            {body}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={primaryCta.href}
            className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
          >
            {isPhone && <i className="ri-phone-fill text-base"></i>}
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-[#8FAC87]/40 px-7 py-3.5 text-sm font-semibold text-[#507969] transition hover:border-[#8FAC87] hover:bg-[#8FAC87]/10"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>

        {showTrustLine && (
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
        )}
      </div>
    </section>
  );
}

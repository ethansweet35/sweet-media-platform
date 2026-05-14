import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const featureList = [
  { icon: "ri-lock-line", label: "100% Confidential" },
  { icon: "ri-time-line", label: "Available 24 / 7" },
  { icon: "ri-map-pin-2-line", label: "Nationwide Coverage" },
  { icon: "ri-award-line", label: "Joint Commission Accredited" },
];

export default function BottomCta({
  title = "Speak to a Certified Interventionist",
  italicWord = "Interventionist",
  body = "Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next.",
  primaryLabel = `Call Now | ${PHONE_DISPLAY}`,
  primaryHref = PHONE_HREF,
  secondaryLabel = "Request a Consultation",
  secondaryHref = "/contact",
}: {
  title?: string;
  italicWord?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const isPhone = primaryHref.startsWith("tel:");

  let titleNode: React.ReactNode = title;
  if (italicWord && title.includes(italicWord)) {
    const [before, after] = title.split(italicWord);
    titleNode = (
      <>
        {before}
        <span className="italic text-[#8FAC87]">{italicWord}</span>
        {after}
      </>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#3E5B50] py-24">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#507969]/40" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#8FAC87]/15" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          {/* Left: heading + CTAs */}
          <div>
            <p className="brand-eyebrow mb-5 text-[#8FAC87]">You Don't Have to Do This Alone</p>
            <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
              {titleNode}
            </h2>
            <p className="mb-10 max-w-lg text-base leading-relaxed text-white/75">
              {body}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={primaryHref}
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-4 text-sm font-semibold text-[#3E5B50] shadow-lg transition hover:bg-[#F5F3E7]"
              >
                {isPhone && <i className="ri-phone-fill"></i>}
                {primaryLabel}
              </a>
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-9 py-4 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>

          {/* Right: icon feature list */}
          <div className="flex flex-col gap-3 lg:min-w-[260px]">
            {featureList.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#8FAC87]">
                  <i className={`${item.icon} text-base`}></i>
                </span>
                <span className="text-sm font-semibold text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

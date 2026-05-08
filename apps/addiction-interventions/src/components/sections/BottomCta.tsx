import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

export default function BottomCta({
  title = "Walking beside you on this healing journey.",
  body = "We provide the guidance, structure, and support needed to break through denial and take meaningful steps toward healing.",
  primaryLabel = `Call ${PHONE_DISPLAY}`,
  primaryHref = PHONE_HREF,
  secondaryLabel = "Speak With a Specialist",
  secondaryHref = "/contact",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const isPhone = primaryHref.startsWith("tel:");
  return (
    <section className="bg-[var(--color-cream)]">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sage)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-sage-deep)]"
          >
            {isPhone && <i className="ri-phone-fill text-base"></i>}
            {primaryLabel}
          </a>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

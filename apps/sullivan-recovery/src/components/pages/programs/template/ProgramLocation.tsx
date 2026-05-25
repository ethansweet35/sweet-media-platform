import Image from "next/image";
import Link from "next/link";
import type { ProgramPageData } from "@/types/programPage";

type Props = NonNullable<ProgramPageData["location"]>;

export default function ProgramLocation({
  eyebrow,
  title,
  description,
  bullets,
  image,
  imageAlt,
  href,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[var(--sr-charcoal)] py-16 text-white md:py-24">
      <div className="absolute inset-0 opacity-35">
        <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,31,27,0.95) 0%, rgba(30,31,27,0.7) 50%, rgba(44,57,40,0.4) 100%)",
          }}
        />
      </div>
      <div className="sr-container relative z-10">
        <div className="max-w-xl">
          {eyebrow ? (
            <p className="sr-eyebrow mb-4 text-[var(--sr-sage)]">{eyebrow}</p>
          ) : null}
          <h2
            className="mb-4 text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.08] text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {title}
          </h2>
          <p
            className="mb-6 text-[15px] leading-[1.9] text-white/75"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {description}
          </p>
          <ul className="mb-8 space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[13px] text-white/80">
                <i className="ri-map-pin-2-line text-[var(--sr-sage)]" aria-hidden />
                <span style={{ fontFamily: "var(--font-dm-sans)" }}>{b}</span>
              </li>
            ))}
          </ul>
          {href ? (
            <Link
              href={href}
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Service areas
              <i className="ri-arrow-right-line text-sm" aria-hidden />
            </Link>
          ) : null}
        </div>
        <p className="sr-only">{imageAlt}</p>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { ProgramPageData } from "@/types/programPage";

type Props = ProgramPageData["story"];

export default function ProgramStorySplit({
  eyebrow,
  title,
  titleAccent,
  paragraphs,
  bullets,
  image,
  imageAlt,
  link,
}: Props) {
  return (
    <section className="overflow-hidden bg-[var(--sr-parchment)] py-16 md:py-24">
      <div className="sr-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div
              className="pointer-events-none absolute -bottom-6 -right-4 hidden border border-[var(--sr-sand)] bg-[var(--sr-moss)] px-6 py-5 md:block lg:-right-8"
              aria-hidden
            >
              <p
                className="text-3xl font-light text-[var(--sr-sage)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                25+
              </p>
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Years combined experience
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {eyebrow ? <p className="sr-eyebrow mb-4">{eyebrow}</p> : null}
            <h2
              className="mb-8 max-w-xl text-[clamp(2rem,4vw,3rem)] font-light leading-[1.06] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
              {titleAccent ? (
                <>
                  {" "}
                  <span className="italic text-[var(--sr-fern)]">{titleAccent}</span>
                </>
              ) : null}
            </h2>
            <div className="mb-10 space-y-5">
              {paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="max-w-xl text-[15px] leading-[1.75] text-[var(--sr-body)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {p}
                </p>
              ))}
            </div>
            <ul className="mb-10 grid gap-4 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[var(--sr-moss)]">
                    <i className="ri-check-line text-xs text-white" aria-hidden />
                  </span>
                  <span
                    className="text-[14px] leading-[1.6] text-[var(--sr-body)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            {link ? (
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-fern)] transition hover:text-[var(--sr-moss)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {link.label}
                <i className="ri-arrow-right-line text-sm" aria-hidden />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

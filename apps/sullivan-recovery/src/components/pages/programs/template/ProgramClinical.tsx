import Image from "next/image";
import type { ProgramPageData } from "@/types/programPage";

type Props = NonNullable<ProgramPageData["clinical"]>;

export default function ProgramClinical({
  eyebrow,
  title,
  paragraphs,
  highlights,
  image,
  imageAlt,
}: Props) {
  return (
    <section className="bg-[var(--sr-charcoal)] py-16 text-white md:py-24 [&_h2]:text-white [&_h3]:text-white [&_p]:text-white/85">
      <div className="sr-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            {eyebrow ? (
              <p className="sr-eyebrow mb-4 text-[var(--sr-sage)]">{eyebrow}</p>
            ) : null}
            <h2
              className="mb-6 text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.08] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h2>
            <div className="mb-10 space-y-5">
              {paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="max-w-xl text-[15px] leading-[1.75]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {p}
                </p>
              ))}
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {highlights.map((h) => (
                <li
                  key={h.title}
                  className="border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <span className="mb-3 block text-[var(--sr-sage)]">
                    <i className={`${h.icon} text-xl`} aria-hidden />
                  </span>
                  <h3
                    className="mb-1 text-lg font-light text-white"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {h.title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.65] text-white/80"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {h.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[5/4] lg:col-span-6">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 ring-1 ring-inset ring-white/10"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

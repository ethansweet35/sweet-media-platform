import Image from "next/image";
import type { ProgramPageData } from "@/types/programPage";

type Props = NonNullable<ProgramPageData["amenities"]>;

export default function ProgramAmenities({
  eyebrow,
  title,
  description,
  items,
  image,
  imageAlt,
}: Props) {
  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-linen)] py-16 md:py-24">
      <div className="sr-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[480px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div className="lg:col-span-7">
            {eyebrow ? <p className="sr-eyebrow mb-4">{eyebrow}</p> : null}
            <h2
              className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h2>
            {description ? (
              <p
                className="mb-8 max-w-lg text-[15px] leading-[1.85] text-[var(--sr-muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {description}
              </p>
            ) : null}
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 border border-[var(--sr-sand)] bg-[var(--sr-parchment)] p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--sr-moss)]/8 text-[var(--sr-moss)]">
                    <i className={`${item.icon} text-lg`} aria-hidden />
                  </span>
                  <div>
                    <h3
                      className="mb-1 text-base font-light text-[var(--sr-ink)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[12px] leading-[1.65] text-[var(--sr-muted)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

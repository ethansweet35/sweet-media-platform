import Image from "next/image";
import type { ProgramPageData } from "@/types/programPage";

type Props = NonNullable<ProgramPageData["gallery"]>;

export default function ProgramGallery({ eyebrow, title, images }: Props) {
  const [hero, ...rest] = images;

  return (
    <section className="bg-[var(--sr-parchment)] py-16 md:py-24">
      <div className="sr-container">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            {eyebrow ? <p className="sr-eyebrow mb-4">{eyebrow}</p> : null}
            <h2
              className="text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-3">
          {hero ? (
            <figure className="relative aspect-[16/10] md:col-span-7 md:aspect-auto md:min-h-[340px]">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              {hero.caption ? (
                <figcaption
                  className="absolute bottom-0 left-0 max-w-xs bg-[var(--sr-charcoal)]/90 px-4 py-3 text-[11px] uppercase tracking-wider text-white/80"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {hero.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
          <div className="grid gap-3 md:col-span-5 md:grid-rows-2">
            {rest.map((img) => (
              <figure key={img.src} className="relative aspect-[16/10] md:aspect-auto md:min-h-[164px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                {img.caption ? (
                  <figcaption
                    className="absolute bottom-0 left-0 bg-[var(--sr-moss)]/90 px-3 py-2 text-[10px] uppercase tracking-wider text-white/75"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {img.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

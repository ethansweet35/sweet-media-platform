import type { ProgramPageData } from "@/types/programPage";

type Props = ProgramPageData["differentiators"];

export default function ProgramDifferentiators({
  eyebrow,
  title,
  titleAccent,
  items,
}: Props) {
  const featured = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i !== featured);

  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-linen)] py-16 md:py-24">
      <div className="sr-container">
        {eyebrow ? <p className="sr-eyebrow mb-4">{eyebrow}</p> : null}
        <h2
          className="mb-10 max-w-2xl text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.06] text-[var(--sr-ink)] md:mb-12"
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

        <div className="grid grid-cols-1 gap-px border border-[var(--sr-sand)] bg-[var(--sr-sand)] lg:grid-cols-12">
          <article className="flex flex-col justify-between bg-[var(--sr-moss)] p-8 md:p-10 lg:col-span-7 [&_h3]:text-white [&_p]:text-white/85">
            <div>
              <span className="mb-5 flex h-11 w-11 items-center justify-center border border-[var(--sr-sage)]/50 text-[var(--sr-sage)]">
                <i className={`${featured.icon} text-xl`} aria-hidden />
              </span>
              <h3
                className="mb-3 text-2xl font-light md:text-[1.75rem]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {featured.title}
              </h3>
              <p
                className="max-w-lg text-[15px] leading-[1.75]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {featured.description}
              </p>
            </div>
            <p
              className="mt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Sullivan Recovery · Mission Viejo
            </p>
          </article>

          <div className="grid gap-px bg-[var(--sr-sand)] lg:col-span-5">
            {rest.map((item) => (
              <article
                key={item.title}
                className="flex gap-4 bg-[var(--sr-parchment)] px-6 py-5 md:px-7 md:py-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--sr-moss)]/10 text-[var(--sr-moss)]">
                  <i className={`${item.icon} text-lg`} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3
                    className="mb-1.5 text-lg font-light text-[var(--sr-ink)]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.65] text-[var(--sr-body)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

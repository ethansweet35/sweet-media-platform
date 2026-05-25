import Link from "next/link";
import type { ProgramPageData } from "@/types/programPage";

type Props = NonNullable<ProgramPageData["substances"]>;

export default function ProgramSubstances({ eyebrow, title, description, items }: Props) {
  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-16 md:py-24">
      <div className="sr-container">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            {eyebrow ? <p className="sr-eyebrow mb-4">{eyebrow}</p> : null}
            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-light leading-[1.06] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h2>
          </div>
          {description ? (
            <p
              className="max-w-md text-[15px] leading-[1.85] text-[var(--sr-muted)] lg:text-right"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {description}
            </p>
          ) : null}
        </div>

        <ul className="grid gap-px border border-[var(--sr-sand)] bg-[var(--sr-sand)] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`group flex h-full min-h-[200px] flex-col justify-between p-6 transition md:p-7 ${
                  i % 2 === 0 ? "bg-[var(--sr-linen)]" : "bg-[var(--sr-parchment)]"
                } hover:bg-[var(--sr-moss)] hover:text-white`}
              >
                <div>
                  <span className="mb-4 block text-[var(--sr-moss)] transition group-hover:text-[var(--sr-sage)]">
                    <i className={`${item.icon} text-2xl`} aria-hidden />
                  </span>
                  <h3
                    className="mb-2 text-xl font-light text-[var(--sr-ink)] transition group-hover:text-white"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.75] text-[var(--sr-muted)] transition group-hover:text-white/75"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {item.description}
                  </p>
                </div>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--sr-fern)] transition group-hover:text-[var(--sr-sage)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Detox program
                  <i className="ri-arrow-right-line text-xs" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

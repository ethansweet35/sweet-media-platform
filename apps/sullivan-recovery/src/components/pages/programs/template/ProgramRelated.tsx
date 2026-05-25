import Link from "next/link";
import type { ProgramPageData } from "@/types/programPage";

type Props = ProgramPageData["relatedPrograms"];

export default function ProgramRelated({ eyebrow, title, items }: Props) {
  const rowThree = items.slice(0, 3);
  const rowTwo = items.slice(3);

  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-linen)] py-14 md:py-20">
      <div className="sr-container">
        <div className="mb-8">
          {eyebrow ? <p className="sr-eyebrow mb-4">{eyebrow}</p> : null}
          <h2
            className="text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {title}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rowThree.map((item) => (
              <li key={item.href}>
                <RelatedCard item={item} />
              </li>
            ))}
          </ul>
          {rowTwo.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {rowTwo.map((item) => (
                <li key={item.href}>
                  <RelatedCard item={item} tall />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function RelatedCard({
  item,
  tall = false,
}: {
  item: { title: string; description: string; href: string };
  tall?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`group block border border-[var(--sr-sand)] bg-[var(--sr-parchment)] p-6 transition hover:border-[var(--sr-fern)] md:p-7 ${tall ? "min-h-[140px]" : ""}`}
    >
      <h3
        className="mb-2 text-xl font-light text-[var(--sr-ink)] group-hover:text-[var(--sr-fern)]"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {item.title}
      </h3>
      <p
        className="mb-3 text-[13px] leading-[1.7] text-[var(--sr-muted)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {item.description}
      </p>
      <span
        className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--sr-fern)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        View program
        <i className="ri-arrow-right-line text-xs" aria-hidden />
      </span>
    </Link>
  );
}

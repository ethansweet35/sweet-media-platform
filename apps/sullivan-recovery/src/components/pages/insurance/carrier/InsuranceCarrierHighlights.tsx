import type { InsurancePageData } from "@/types/insurancePage";

type Props = Pick<InsurancePageData, "highlights">;

export default function InsuranceCarrierHighlights({ highlights }: Props) {
  return (
    <section className="border-b border-[var(--sr-sand)] bg-[var(--sr-linen)] py-12 md:py-14">
      <div className="sr-container">
        <div className="grid gap-px border border-[var(--sr-sand)] bg-[var(--sr-sand)] sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="flex flex-col bg-[var(--sr-parchment)] px-5 py-6 md:px-6 md:py-7"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--sr-moss)]/10 text-[var(--sr-moss)]">
                <i className={`${item.icon} text-lg`} aria-hidden />
              </span>
              <h3
                className="mb-2 text-base font-light text-[var(--sr-ink)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-[13px] leading-[1.65] text-[var(--sr-muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

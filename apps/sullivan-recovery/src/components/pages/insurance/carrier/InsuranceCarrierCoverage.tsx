import type { InsuranceCarrierPageData } from "@/types/insuranceCarrierPage";

type Props = InsuranceCarrierPageData["covered"];

export default function InsuranceCarrierCoverage({ eyebrow, title, items }: Props) {
  const [featured, ...rest] = items;

  return (
    <section className="bg-[var(--sr-linen)] py-14 md:py-20">
      <div className="sr-container">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow ? <p className="sr-eyebrow mb-3">{eyebrow}</p> : null}
            <h2
              className="max-w-xl text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h2>
          </div>
          <p
            className="max-w-sm text-[13px] leading-[1.65] text-[var(--sr-muted)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Actual benefits depend on your plan document and medical necessity — we confirm
            before admission.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-[var(--sr-sand)] bg-[var(--sr-sand)] lg:grid-cols-12">
          {featured ? (
            <article className="flex flex-col bg-[var(--sr-moss)] p-8 text-white md:p-10 lg:col-span-5 lg:min-h-[280px]">
              <span className="mb-5 flex h-12 w-12 items-center justify-center border border-[var(--sr-sage)]/40 text-[var(--sr-sage)]">
                <i className={`${featured.icon} text-xl`} aria-hidden />
              </span>
              <h3
                className="mb-3 text-2xl font-light"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {featured.title}
              </h3>
              <p
                className="text-[15px] leading-[1.85] text-white/75"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {featured.description}
              </p>
            </article>
          ) : null}

          <div
            className={`grid gap-px bg-[var(--sr-sand)] ${featured ? "lg:col-span-7 lg:grid-cols-2" : "lg:col-span-12 sm:grid-cols-2 lg:grid-cols-3"}`}
          >
            {rest.map((item) => (
              <article
                key={item.title}
                className="flex flex-col bg-[var(--sr-parchment)] p-6 md:p-7"
              >
                <span className="mb-4 text-[var(--sr-moss)]">
                  <i className={`${item.icon} text-2xl`} aria-hidden />
                </span>
                <h3
                  className="mb-2 text-lg font-light text-[var(--sr-ink)]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[13px] leading-[1.7] text-[var(--sr-body)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

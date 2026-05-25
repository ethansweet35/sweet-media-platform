import { INSURANCE_WHY_US } from "@/data/insurance";

export default function InsuranceWhyUs() {
  const featured = INSURANCE_WHY_US.find((item) => item.featured)!;
  const rest = INSURANCE_WHY_US.filter((item) => !item.featured);

  return (
    <section className="bg-[var(--sr-parchment)] py-14 md:py-20">
      <div className="sr-container">
        <p className="sr-eyebrow mb-4">Why Sullivan Recovery</p>
        <h2
          className="mb-12 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-light leading-[1.06] text-[var(--sr-ink)] md:mb-14"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Rehab that honors your insurance — and{" "}
          <span className="italic text-[var(--sr-fern)]">your dignity</span>
        </h2>

        <div className="grid grid-cols-1 gap-px border border-[var(--sr-sand)] bg-[var(--sr-sand)] lg:grid-cols-12">
          <article className="flex flex-col justify-between bg-[var(--sr-moss)] p-8 text-white md:p-10 lg:col-span-7 lg:min-h-[320px]">
            <div>
              <span className="mb-6 flex h-12 w-12 items-center justify-center border border-[var(--sr-sage)]/40 text-[var(--sr-sage)]">
                <i className={`${featured.icon} text-xl`} aria-hidden />
              </span>
              <h3
                className="mb-4 text-2xl font-light md:text-3xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {featured.title}
              </h3>
              <p
                className="max-w-md text-[15px] leading-[1.85] text-white/72"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {featured.description}
              </p>
            </div>
            <p
              className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Mission Viejo · Orange County
            </p>
          </article>

          <div className="grid gap-px bg-[var(--sr-sand)] lg:col-span-5 lg:grid-rows-3">
            {rest.map((item) => (
              <article
                key={item.title}
                className="flex gap-4 bg-[var(--sr-parchment)] p-6 md:p-7"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--sr-moss)]/10 text-[var(--sr-moss)]">
                  <i className={`${item.icon} text-lg`} aria-hidden />
                </span>
                <div>
                  <h3
                    className="mb-1 text-lg font-light text-[var(--sr-ink)]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.7] text-[var(--sr-muted)]"
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

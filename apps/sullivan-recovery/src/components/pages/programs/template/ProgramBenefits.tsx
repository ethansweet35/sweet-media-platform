import type { ProgramPageData } from "@/types/programPage";

type Props = ProgramPageData["benefits"];

export default function ProgramBenefits({ eyebrow, title, items }: Props) {
  return (
    <section className="bg-[var(--sr-moss)] py-16 md:py-24">
      <div className="sr-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            {eyebrow ? (
              <p className="sr-eyebrow mb-4 text-[var(--sr-sage)]">{eyebrow}</p>
            ) : null}
            <h2
              className="max-w-xl text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.08] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h2>
          </div>
          <p
            className="max-w-sm text-[14px] leading-[1.75] text-white/60 md:text-right"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Medically supervised detox is the safest way to begin recovery — especially when
            withdrawal can be severe or unpredictable.
          </p>
        </div>

        <ul className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col bg-[var(--sr-moss)] p-7 md:p-8"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center border border-[var(--sr-sage)]/30 text-[var(--sr-sage)]">
                <i className={`${item.icon} text-xl`} aria-hidden />
              </span>
              <h3
                className="mb-2 text-xl font-light text-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-[14px] leading-[1.85] text-white/68"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

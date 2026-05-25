import type { ProgramStat } from "@/types/programPage";

type Props = {
  items: ProgramStat[];
};

export default function ProgramStatsBand({ items }: Props) {
  return (
    <section className="border-y border-[var(--sr-sand)] bg-[var(--sr-moss)] py-12 md:py-14">
      <div className="sr-container">
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {items.map((stat, i) => (
            <li
              key={stat.label}
              className={`text-center ${i > 0 ? "md:border-l md:border-white/15 md:pl-6" : ""}`}
            >
              <p
                className="text-[clamp(2rem,4vw,3rem)] font-light leading-none text-[var(--sr-sage)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {stat.value}
              </p>
              <p
                className="mx-auto mt-2 max-w-[12rem] text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

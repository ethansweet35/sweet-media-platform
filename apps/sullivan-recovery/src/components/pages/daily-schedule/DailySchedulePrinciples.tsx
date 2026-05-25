import { SCHEDULE_PRINCIPLES } from "@/data/dailySchedule";

export default function DailySchedulePrinciples() {
  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-moss)] py-14 md:py-20">
      <div className="sr-container">
        <p className="sr-eyebrow mb-4 text-[var(--sr-sage)]">Our philosophy</p>
        <h2
          className="mb-10 max-w-xl text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.08] text-white [&_span]:italic [&_span]:text-[var(--sr-sage)]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          More than a <span>clock</span> — a framework for healing
        </h2>
        <ul className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 [&_h3]:text-white">
          {SCHEDULE_PRINCIPLES.map((item) => (
            <li
              key={item.title}
              className="bg-[var(--sr-moss)] p-6 md:p-8"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center border border-[var(--sr-sage)]/40 text-[var(--sr-sage)]">
                <i className={`${item.icon} text-lg`} aria-hidden />
              </span>
              <h3
                className="mb-2 text-xl font-light"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-[14px] leading-[1.75] text-white/75"
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

import type { ProgramTrustItem } from "@/types/programPage";

type Props = {
  items: ProgramTrustItem[];
};

export default function ProgramTrustStrip({ items }: Props) {
  return (
    <section className="border-b border-[var(--sr-sand)] bg-[var(--sr-linen)] py-10 md:py-12">
      <div className="sr-container">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex gap-4 border-l-2 border-[var(--sr-sage)] pl-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[var(--sr-moss)]">
                <i className={`${item.icon} text-xl`} aria-hidden />
              </span>
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-wider text-[var(--sr-ink)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {item.label}
                </p>
                {item.detail ? (
                  <p
                    className="mt-1 text-[12px] leading-[1.6] text-[var(--sr-muted)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {item.detail}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

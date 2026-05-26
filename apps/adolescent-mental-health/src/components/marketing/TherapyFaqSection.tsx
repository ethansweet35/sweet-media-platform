import { CONTAINER } from "@/lib/site";
import { SECTION_PY } from "./tokens";

export type TherapyFaqItem = {
  q: string;
  a: string;
};

type TherapyFaqSectionProps = {
  title: string;
  items: TherapyFaqItem[];
  description?: string;
  eyebrow?: string;
};

export default function TherapyFaqSection({
  title,
  items,
  description = "Still have questions? Our admissions team is available 7 days a week.",
  eyebrow = "FAQ",
}: TherapyFaqSectionProps) {
  return (
    <section className={`bg-surface px-6 ${SECTION_PY} lg:px-10`}>
      <div className={`${CONTAINER} w-full`}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden />
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
            </div>
            <h2 className="text-4xl font-bold leading-tight text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              {title}
            </h2>
            <p className="mt-5 text-sm leading-8 text-body">{description}</p>
          </div>

          <div className="min-w-0 divide-y divide-border rounded-2xl bg-white shadow-sm ring-1 ring-border">
            {items.map((faq, i) => (
              <details key={faq.q} className="group px-6 py-0 sm:px-8">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <div className="flex min-w-0 items-start gap-4">
                    <span
                      className="mt-0.5 shrink-0 text-xs font-bold text-accent/40"
                      style={{ fontFamily: "var(--font-heebo)", minWidth: "1.5rem" }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-base font-bold text-ink transition-colors group-open:text-accent"
                      style={{ fontFamily: "var(--font-heebo)" }}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-accent transition group-open:bg-accent group-open:text-white">
                    <i className="ri-add-line text-sm group-open:hidden" aria-hidden />
                    <i className="ri-subtract-line hidden text-sm group-open:block" aria-hidden />
                  </span>
                </summary>
                <p className="pb-6 pl-10 text-sm leading-8 text-body">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

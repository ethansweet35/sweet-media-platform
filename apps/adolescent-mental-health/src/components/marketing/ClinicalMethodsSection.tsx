import { CONTAINER } from "@/lib/site";
import { cn } from "@/lib/cn";
import { SECTION_PY } from "./tokens";

export type ClinicalMethod = {
  icon: string;
  tag: string;
  title: string;
  body: string;
};

type ClinicalMethodsSectionProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  items: ClinicalMethod[];
};

function ModalityCard({ item, index }: { item: ClinicalMethod; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition duration-300 hover:border-accent/35 hover:bg-white/[0.06] lg:p-7">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20"
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10"
          style={{ border: "1px solid rgba(131,179,220,0.22)" }}
        >
          <i className={`${item.icon} text-xl text-accent`} aria-hidden />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">{item.tag}</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block" aria-hidden />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              Modality {num}
            </span>
          </div>
          <h3
            className="mt-2 text-lg font-bold leading-snug text-white lg:text-xl"
            style={{ fontFamily: "var(--font-heebo)" }}
          >
            {item.title}
          </h3>
        </div>
      </div>

      <p className="relative mt-5 flex-1 text-sm leading-7 text-white/55">{item.body}</p>

      <div className="relative mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
        <span
          className="text-2xl font-bold leading-none text-white/10 transition group-hover:text-accent/40"
          style={{ fontFamily: "var(--font-heebo)" }}
          aria-hidden
        >
          {num}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
    </article>
  );
}

export default function ClinicalMethodsSection({
  eyebrow = "Clinical methods",
  title,
  description,
  items,
}: ClinicalMethodsSectionProps) {
  const countLabel = String(items.length).padStart(2, "0");

  return (
    <section className={`relative overflow-hidden bg-surface px-6 ${SECTION_PY} lg:px-10`}>
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-accent/8 blur-[120px]" />

      <div className={`${CONTAINER} relative`}>
        <div className="mb-10 grid gap-8 lg:mb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden />
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
            </div>
            <h2
              className="text-4xl font-bold leading-[1.08] text-ink md:text-5xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              {title}
            </h2>
            {description ? <p className="mt-5 max-w-xl text-sm leading-8 text-body">{description}</p> : null}
          </div>

          <div className="hidden shrink-0 text-right lg:block" aria-hidden>
            <p
              className="text-7xl font-bold leading-none text-accent/15 xl:text-8xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              {countLabel}
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-body/60">Modalities</p>
          </div>
        </div>

        {/* Inset dark clinical panel */}
        <div className="relative overflow-hidden rounded-[1.75rem] bg-dark shadow-[0_24px_80px_-20px_rgba(10,15,20,0.45)] ring-1 ring-white/10">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.07]" aria-hidden />
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />

          <div className="relative border-b border-white/8 px-6 py-5 lg:px-10 lg:py-6">
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {items.map((item, index) => (
                <span
                  key={item.title}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em]",
                    index === 0
                      ? "bg-accent/15 text-accent ring-1 ring-accent/25"
                      : "bg-white/5 text-white/45 ring-1 ring-white/8",
                  )}
                >
                  <span className="text-white/30">{String(index + 1).padStart(2, "0")}</span>
                  {item.title.split("(")[0]?.trim() ?? item.title}
                </span>
              ))}
            </div>
          </div>

          <div className="relative grid gap-4 p-6 sm:grid-cols-2 sm:gap-5 lg:p-10">
            {items.map((item, index) => (
              <ModalityCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { CONTAINER, SECTION_HEADING, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import { SECTION_PY } from "./tokens";

export type FitCriterion = {
  icon: string;
  label: string;
  sub: string;
};

type GoodFitSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  criteria: FitCriterion[];
  bg?: "surface" | "white";
  ctaHref?: string;
  ctaLabel?: string;
  asideNote?: { label: string; body: string };
  showCta?: boolean;
};

export default function GoodFitSection({
  eyebrow = "Good fit",
  title,
  description,
  criteria,
  bg = "surface",
  ctaHref = SITE.phone.href,
  ctaLabel = "Ask our admissions team",
  asideNote,
  showCta = true,
}: GoodFitSectionProps) {
  const bgClass = bg === "white" ? "bg-white" : "bg-surface";

  return (
    <section className={cn("px-6", SECTION_PY, "lg:px-10", bgClass)}>
      <div className={`${CONTAINER} w-full`}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
            <h2 className={`${SECTION_HEADING} leading-tight text-ink`} style={{ fontFamily: "var(--font-heebo)" }}>
              {title}
            </h2>
            <p className="mt-5 text-sm leading-8 text-body">{description}</p>
            {asideNote ? (
              <div className="mt-8 rounded-2xl border border-border bg-surface-muted px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{asideNote.label}</p>
                <p className="mt-2 text-sm leading-7 text-body">{asideNote.body}</p>
              </div>
            ) : null}
            {showCta ? (
              <a
                href={ctaHref}
                className="mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-dark px-7 py-3.5 text-sm font-bold text-white transition hover:bg-cta-hover"
              >
                <i className="ri-phone-fill text-accent"></i>
                {ctaLabel}
              </a>
            ) : null}
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {criteria.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  "group relative rounded-2xl border border-border bg-white/80 p-5 pr-14 transition hover:border-accent/40 hover:bg-white hover:shadow-md hover:shadow-accent/5 sm:p-6 sm:pr-20",
                  i === criteria.length - 1 && criteria.length % 2 === 1 ? "sm:col-span-2" : "",
                )}
              >
                <span
                  className="pointer-events-none absolute right-4 top-4 select-none text-5xl font-bold leading-none text-border transition group-hover:text-accent/15 sm:text-6xl"
                  style={{ fontFamily: "var(--font-heebo)" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white text-accent shadow-sm ring-1 ring-border transition group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                  <i className={`${item.icon} text-lg`} aria-hidden />
                </span>
                <p className="relative mt-5 text-base font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {item.label}
                </p>
                <p className="relative mt-2 text-sm leading-7 text-body">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

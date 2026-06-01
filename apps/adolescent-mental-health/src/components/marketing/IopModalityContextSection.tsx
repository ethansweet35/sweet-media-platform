import Link from "next/link";
import { CONTAINER, SECTION_HEADING } from "@/lib/site";
import { SECTION_PY } from "./tokens";

export type IopModalityContextItem = {
  icon: string;
  label: string;
  cadence: string;
  desc: string;
  active: boolean;
  href?: string;
};

type IopModalityContextSectionProps = {
  title: string;
  description: string;
  items: IopModalityContextItem[];
  eyebrow?: string;
  footerHref?: string;
  footerLabel?: string;
};

export default function IopModalityContextSection({
  title,
  description,
  items,
  eyebrow = "The full picture",
  footerHref = "/virtual-iop-for-teens",
  footerLabel = "See the full Virtual IOP model",
}: IopModalityContextSectionProps) {
  return (
    <section className={`bg-dark px-6 ${SECTION_PY} lg:px-10`}>
      <div className={`${CONTAINER} w-full`}>
        <div className="mb-10 max-w-2xl sm:mb-14">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-10 bg-accent" aria-hidden />
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
          </div>
          <h2 className={`${SECTION_HEADING} text-white`} style={{ fontFamily: "var(--font-heebo)" }}>
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/45 sm:leading-8">{description}</p>
        </div>

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className={`rounded-3xl p-6 sm:p-8 ${item.active ? "ring-2 ring-accent/40" : ""}`}
              style={{
                background: item.active ? "rgba(131,179,220,0.07)" : "rgba(255,255,255,0.03)",
                border: item.active ? undefined : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    item.active ? "bg-accent/15 text-accent" : "bg-white/5 text-white/30"
                  }`}
                >
                  <i className={`${item.icon} text-xl`} aria-hidden />
                </span>
                {item.active ? (
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                    This page
                  </span>
                ) : null}
              </div>

              <h3
                className={`mt-6 text-lg font-bold ${item.active ? "text-white" : "text-white/50"}`}
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                {item.label}
              </h3>
              <p className={`mt-1 text-sm font-semibold ${item.active ? "text-accent" : "text-white/25"}`}>
                {item.cadence}
              </p>
              <p className={`mt-3 text-sm leading-7 ${item.active ? "text-white/60" : "text-white/30"}`}>
                {item.desc}
              </p>

              {!item.active && item.href ? (
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/30 transition hover:text-white/60"
                >
                  Learn more <i className="ri-arrow-right-line" aria-hidden />
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={footerHref}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/60 transition hover:border-white/30 hover:text-white"
          >
            {footerLabel}
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

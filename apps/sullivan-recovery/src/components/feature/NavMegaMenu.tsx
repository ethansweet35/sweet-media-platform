"use client";

import Link from "next/link";
import type { NavMegaConfig } from "@/data/navigation";

type NavMegaMenuProps = {
  config: NavMegaConfig;
  onClose: () => void;
};

export default function NavMegaMenu({ config, onClose }: NavMegaMenuProps) {
  const columnCount = config.columns.length;
  const hasFeatured = (config.featured?.length ?? 0) > 0;

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 border-t border-[var(--sr-sand)] bg-[var(--sr-parchment)] shadow-[0_24px_48px_rgba(30,31,27,0.18)]"
      role="region"
      aria-label={`${config.title} menu`}
    >
      {/* Moss accent bar — matches homepage hero gradient tone */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--sr-moss) 0%, var(--sr-fern) 45%, var(--sr-sage) 100%)",
        }}
      />

      <div className="sr-container py-8 md:py-10">
        {/* Header row */}
        <div className="mb-8 flex flex-col gap-6 border-b border-[var(--sr-sand)] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--sr-sage)]" aria-hidden />
              <p
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-fern)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {config.eyebrow}
              </p>
            </div>
            <h3
              className="text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {config.title}
            </h3>
            <p
              className="mt-3 max-w-md text-[14px] leading-[1.75] text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {config.description}
            </p>
          </div>
          <Link
            href={config.viewAllPath}
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--sr-fern)] transition hover:text-[var(--sr-moss)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {config.viewAllLabel}
            <i className="ri-arrow-right-line text-base" aria-hidden />
          </Link>
        </div>

        <div
          className={`grid gap-8 ${
            hasFeatured
              ? "lg:grid-cols-12"
              : columnCount > 1
                ? "md:grid-cols-2"
                : "max-w-md"
          }`}
        >
          {/* Link columns — architectural flush grid on homepage */}
          <div
            className={`grid gap-0 border-t border-l border-[var(--sr-sand)] ${
              hasFeatured ? "lg:col-span-7" : "w-full"
            } ${columnCount > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
          >
            {config.columns.map((col, colIndex) => (
              <div
                key={col.heading}
                className={`border-b border-r border-[var(--sr-sand)] p-5 md:p-6 ${
                  colIndex % 2 === 1 ? "bg-[var(--sr-linen)]/50" : "bg-white/60"
                }`}
              >
                <p
                  className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--sr-fern)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {col.heading}
                </p>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        onClick={onClose}
                        className="group flex items-start gap-2.5 rounded-sm py-1.5 text-[13px] leading-snug text-[var(--sr-body)] transition hover:text-[var(--sr-moss)]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--sr-sand)] transition group-hover:bg-[var(--sr-fern)]"
                          aria-hidden
                        />
                        <span className="group-hover:underline group-hover:underline-offset-2">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured cards */}
          {hasFeatured ? (
            <div className="flex flex-col gap-3 lg:col-span-5">
              {config.featured!.map((card) => (
                <Link
                  key={card.path}
                  href={card.path}
                  onClick={onClose}
                  className="group flex gap-4 rounded-sm border border-[var(--sr-sand)] bg-white p-5 transition hover:border-[var(--sr-fern)]/40 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--sr-mist)] text-[var(--sr-fern)] transition group-hover:bg-[var(--sr-moss)] group-hover:text-[var(--sr-parchment)]">
                    <i className={`${card.icon} text-xl`} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-lg font-medium leading-tight text-[var(--sr-ink)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {card.label}
                    </p>
                    <p
                      className="mt-1 text-[12px] leading-relaxed text-[var(--sr-muted)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {card.description}
                    </p>
                  </div>
                  <i
                    className="ri-arrow-right-up-line ml-auto shrink-0 text-lg text-[var(--sr-sand)] transition group-hover:text-[var(--sr-fern)]"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {/* Footer CTA strip */}
        {config.cta ? (
          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--sr-sand)] bg-[var(--sr-linen)]/80 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <p
              className="text-[13px] text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Available 24/7 · Same-day intake · Mission Viejo, CA
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {config.cta.secondaryPath ? (
                <Link
                  href={config.cta.secondaryPath}
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--sr-sand)] px-6 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:border-[var(--sr-moss)] hover:bg-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {config.cta.secondaryLabel}
                </Link>
              ) : null}
              <Link
                href={config.cta.path}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--sr-sage)] px-7 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:bg-[var(--sr-fern)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {config.cta.label}
                <i className="ri-arrow-right-line text-sm" aria-hidden />
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

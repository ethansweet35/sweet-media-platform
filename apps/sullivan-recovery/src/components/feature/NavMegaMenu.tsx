"use client";

import Link from "next/link";
import type { MegaLink, NavMegaConfig } from "@/data/navigation";

type NavMegaMenuProps = {
  config: NavMegaConfig;
  onClose: () => void;
};

function MegaNavLink({
  link,
  onClose,
  emphasized = false,
}: {
  link: MegaLink;
  onClose: () => void;
  emphasized?: boolean;
}) {
  return (
    <Link
      href={link.path}
      onClick={onClose}
      className={`group flex items-center justify-between gap-3 rounded-md border px-4 py-3 transition ${
        emphasized
          ? "border-[var(--sr-fern)]/35 bg-[var(--sr-mist)]/60 hover:border-[var(--sr-fern)] hover:bg-[var(--sr-mist)]"
          : "border-[var(--sr-sand)] bg-white hover:border-[var(--sr-fern)]/50 hover:bg-[var(--sr-mist)]/40"
      }`}
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      <span
        className={`text-[14px] leading-snug ${
          emphasized ? "font-medium text-[var(--sr-moss)]" : "text-[var(--sr-ink)]"
        } group-hover:text-[var(--sr-moss)]`}
      >
        {link.label}
      </span>
      <i
        className="ri-arrow-right-line shrink-0 text-base text-[var(--sr-fern)] opacity-70 transition group-hover:opacity-100"
        aria-hidden
      />
    </Link>
  );
}

function MegaColumn({
  heading,
  links,
  onClose,
}: {
  heading: string;
  links: MegaLink[];
  onClose: () => void;
}) {
  return (
    <div>
      <p
        className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--sr-muted)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {heading}
      </p>
      <ul className="flex flex-col gap-2">
        {links.map((link, i) => (
          <li key={link.path}>
            <MegaNavLink link={link} onClose={onClose} emphasized={i === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NavMegaMenu({ config, onClose }: NavMegaMenuProps) {
  const colCount = config.columns.length;

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 border-t border-[var(--sr-sand)] bg-[var(--sr-parchment)] shadow-[0_24px_48px_rgba(30,31,27,0.18)]"
      role="region"
      aria-label={`${config.title} menu`}
    >
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--sr-moss) 0%, var(--sr-fern) 45%, var(--sr-sage) 100%)",
        }}
      />

      <div className="sr-container py-8 md:py-9">
        {/* Static intro — not styled as links */}
        <div className="mb-8 max-w-2xl border-b border-[var(--sr-sand)] pb-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sr-sage)]" aria-hidden />
            <p
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-fern)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {config.eyebrow}
            </p>
          </div>
          <h3
            className="text-[clamp(1.5rem,2.5vw,2rem)] font-light text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {config.title}
          </h3>
          <p
            className="mt-2 text-[14px] leading-relaxed text-[var(--sr-muted)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {config.description}
          </p>
        </div>

        {/* All navigation — one link style per column */}
        <div
          className={`grid gap-8 ${
            colCount >= 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : colCount === 3
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : colCount === 2
                  ? "sm:grid-cols-2"
                  : "max-w-sm"
          }`}
        >
          {config.columns.map((col) => (
            <MegaColumn
              key={col.heading}
              heading={col.heading}
              links={col.links}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

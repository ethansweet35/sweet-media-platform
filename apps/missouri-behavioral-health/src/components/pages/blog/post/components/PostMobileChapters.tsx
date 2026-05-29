"use client";

import { useState } from "react";

interface Heading {
  id: string;
  text: string;
}

interface PostMobileChaptersProps {
  headings: Heading[];
}

export default function PostMobileChapters({ headings }: PostMobileChaptersProps) {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <div className="mb-8 border border-mbh-forest/12 bg-cream lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-mbh-forest"
        aria-expanded={open}
      >
        Jump to section
        <i className={`ri-arrow-down-s-line transition ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open ? (
        <nav className="border-t border-mbh-forest/10 px-2 pb-2">
          <ol>
            {headings.map((h, i) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 rounded-lg px-2 py-2.5 font-body text-sm text-mbh-body transition hover:bg-white hover:text-mbh-forest"
                >
                  <span className="font-display text-base font-bold text-mbh-green/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
    </div>
  );
}

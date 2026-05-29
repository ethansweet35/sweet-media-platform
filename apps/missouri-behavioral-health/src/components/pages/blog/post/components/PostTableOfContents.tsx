"use client";

import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

interface Heading {
  id: string;
  text: string;
}

interface PostTableOfContentsProps {
  headings: Heading[];
  tags: string[];
}

export default function PostTableOfContents({ headings, tags }: PostTableOfContentsProps) {
  if (headings.length === 0 && tags.length === 0) return null;

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-28 space-y-8">
        {headings.length > 0 ? (
          <nav aria-label="Table of contents">
            <p className="mb-4 font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-green">
              On this page
            </p>
            <ul className="space-y-1 border-l border-mbh-forest/10">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="block border-l-2 border-transparent py-2 pl-4 font-body text-[13px] leading-snug text-mbh-body/70 transition hover:border-mbh-green hover:text-mbh-forest"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {tags.length > 0 ? (
          <div>
            <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-body/50">
              Topics
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-2.5 py-1 font-body text-[9px] font-semibold uppercase tracking-wide text-mbh-forest ring-1 ring-mbh-forest/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="rounded-xl border border-mbh-forest/10 bg-white p-4">
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-mbh-forest">
            Need help?
          </p>
          <p className="mt-2 font-body text-xs leading-relaxed text-mbh-body">
            Admissions available 24/7.
          </p>
          <a
            href={PHONE_HREF}
            className="mt-3 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-green hover:text-mbh-forest"
          >
            <i className="ri-phone-fill" aria-hidden />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </aside>
  );
}

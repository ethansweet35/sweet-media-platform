import { CONTAINER } from "@/lib/site";

/** Shared layout classes for blog index + post pages */
export const BLOG_SHELL = "min-h-screen bg-white";
export const BLOG_CONTAINER = CONTAINER;
export const BLOG_SECTION = "w-full pb-16 md:pb-section";
export const BLOG_HERO_PAD = "pb-24 pt-24 lg:pb-32 lg:pt-28";
export const BLOG_FEATURED_OVERLAP = "-mt-16 lg:-mt-24";
export const BLOG_FEATURED_GAP = "mb-10 lg:mb-14";
export const BLOG_GRID_TOP = "pt-10 md:pt-14";

/** Heebo heading helper — blog body uses Montserrat via layout */
export const BLOG_HEADING = { fontFamily: "var(--font-heebo)" } as const;

export const DEFAULT_BLOG_AUTHOR = "Adolescent Mental Health";
export const DEFAULT_BLOG_AUTHOR_ROLE = "Clinical Editorial Team";

export function blogAuthorName(author?: string | null): string {
  const trimmed = author?.trim();
  return trimmed || DEFAULT_BLOG_AUTHOR;
}

export function blogAuthorInitials(author?: string | null): string {
  return blogAuthorName(author)
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

/** Editorial article shell — white reading card on soft surface */
export const BLOG_ARTICLE_CARD =
  "rounded-[2rem] border border-border bg-white p-6 shadow-lg shadow-ink/[0.04] ring-1 ring-white md:p-9 lg:p-10";

/** Lead excerpt block inside the article card */
export const BLOG_LEAD =
  "relative overflow-hidden rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/[0.07] to-surface-muted px-5 py-5 md:px-6 md:py-6";

/** Sidebar panel — TOC, tags, etc. */
export const BLOG_SIDEBAR_PANEL =
  "rounded-2xl border border-border bg-white p-5 shadow-sm shadow-ink/[0.03]";

/** Blog index grid — posts per page */
export const BLOG_PAGE_SIZE = 12;

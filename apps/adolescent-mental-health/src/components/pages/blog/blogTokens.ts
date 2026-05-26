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

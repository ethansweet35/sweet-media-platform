/**
 * Hero spacing for pages using Layout (main already has pt-[7.5rem] for fixed chrome).
 * Do not add pt-28+ on heroes inside Layout — it double-counts header clearance.
 */

/** Top inset only — use when Layout already clears fixed chrome. */
export const heroTopPad = "pt-12 lg:pt-14";

/** Bottom inset for heroes whose content sits above the section edge. */
export const heroBottomPad = "pb-16 lg:pb-20";

/** Vertical padding for heroes whose inner container already has horizontal px. */
export const heroSectionPad = `${heroTopPad} ${heroBottomPad}`;

/** Compact padding for hero content wrappers (includes horizontal inset). */
export const heroContentPad = `px-6 lg:px-10 ${heroSectionPad}`;

/** Inner wrapper for viewport / form heroes (image background on section). */
export const heroInnerWrap = `relative z-10 mx-auto w-full max-w-7xl ${heroContentPad}`;

/** Solid-color heroes (about, admissions sub-pages, team, etc.). */
export const heroSolidSection = "py-28 lg:py-32";

/** Viewport-capped centered hero (treatment, admissions, FAQs). Pair with `heroInnerWrap`. */
export const heroViewportSection =
  "relative flex min-h-[min(720px,calc(100dvh-7.5rem))] items-start overflow-hidden lg:max-h-[840px] lg:items-center";

/** Bottom-aligned location hero — shorter than full viewport. Pair with `heroContentPad`. */
export const heroLocationSection =
  "relative flex min-h-[min(560px,calc(100dvh-9rem))] items-start overflow-hidden lg:max-h-[720px] lg:items-end";

/** PageHero — full-bleed photo, left-aligned copy (locations hub, referrals). */
export const heroPageHeroSection =
  "relative flex min-h-[min(560px,calc(100dvh-7.5rem))] items-start overflow-hidden lg:max-h-[720px] lg:items-center";

/**
 * Homepage only — fixed top bar + nav overlay the hero (no Layout offset).
 * pt must clear ~7.5rem chrome; min-h fills the viewport without a max-height cap.
 */
export const heroHomeSection =
  "relative flex min-h-screen items-center overflow-x-hidden pb-20 pt-[8rem] lg:pb-28 lg:pt-36";

/** Signature / adventure cinematic heroes — full-bleed with bottom-aligned headline. */
export const heroCinematicSection =
  "relative flex min-h-[min(700px,calc(100dvh-7.5rem))] max-h-[840px] flex-col overflow-hidden";

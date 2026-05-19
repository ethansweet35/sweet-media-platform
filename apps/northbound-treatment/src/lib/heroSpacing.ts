/**
 * Hero spacing for pages using Layout (main already has pt-[7.5rem] for fixed chrome).
 * Do not add pt-28+ on heroes inside Layout — it double-counts header clearance.
 */

/** Top inset only — use when Layout already clears fixed chrome. */
export const heroTopPad = "pt-10 lg:pt-8";

/** Vertical padding for heroes whose inner container already has horizontal px. */
export const heroSectionPad = "pb-14 pt-10 lg:pb-18 lg:pt-8";

/** Compact padding for hero content wrappers (includes horizontal inset). */
export const heroContentPad = `px-6 pb-14 ${heroTopPad} lg:px-10 lg:pb-18`;

/** Viewport-capped centered hero (treatment, admissions, FAQs). */
export const heroViewportSection =
  "relative flex min-h-[min(680px,calc(100dvh-7.5rem))] items-start overflow-hidden py-12 lg:max-h-[780px] lg:items-center lg:py-16";

/** Bottom-aligned location hero — shorter than full viewport. */
export const heroLocationSection =
  "relative flex min-h-[min(520px,calc(100dvh-9rem))] items-start overflow-hidden lg:max-h-[680px] lg:items-end";

/**
 * Homepage only — fixed top bar + nav overlay the hero (no Layout offset).
 * pt must clear ~7.5rem chrome; min-h fills the viewport without a max-height cap.
 */
export const heroHomeSection =
  "relative flex min-h-screen items-center overflow-x-hidden pb-20 pt-[8rem] lg:pb-28 lg:pt-36";

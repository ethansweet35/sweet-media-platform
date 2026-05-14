/**
 * Shared admin design tokens.
 * Ocean accent is derived from the Sweet Media hero palette (#7B9FD4 family).
 * Font stacks use neutral system-UI so the admin renders consistently across
 * every brand regardless of what Google Fonts the marketing site loads.
 */

export const ADMIN_OCEAN = "#3d6f7f";
export const ADMIN_OCEAN_HOVER = "#35636f";
export const ADMIN_CREAM_SIDEBAR = "#faf8f5";
export const ADMIN_CREAM_MAIN = "#f4f1eb";

// Use a neutral system font so admin tables/columns render identically on every
// brand. Previously referenced --font-outfit-sans (Sweet Media only), causing
// Outfit to load on sweet-media and system-ui to load everywhere else — making
// column widths, table layout, and the Pages admin look different only there.
export const adminFontSerif = "[font-family:ui-serif,Georgia,Cambria,'Times New Roman',serif]";
export const adminFontSans = "[font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]";

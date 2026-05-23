/**
 * Brand-wide constants. Centralised so phone, copy, and trust signals
 * stay consistent across every template and one-off page.
 */

export const PHONE_DISPLAY = "949-776-7093";
export const PHONE_HREF = "tel:9497767093";

export const BRAND_NAME = "Addiction Interventions";

/** Navbar/footer wordmark — Supabase CDN (reliable on Vercel; WP hotlink can 403). */
export const NAV_LOGO_URL =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/brand_wordmark_navbar_v5.png";

export const NAV_LOGO_WIDTH = 960;
export const NAV_LOGO_HEIGHT = 375;

/** Horizontal wordmark (~2.6:1) — size by height + w-auto */
export const NAV_LOGO_CLASS = "h-11 w-auto sm:h-12 lg:h-14";
export const FOOTER_LOGO_CLASS =
  "h-12 w-auto max-w-[min(100%,320px)] sm:h-14 lg:h-16 brightness-0 invert";

export const TRUST_SIGNALS = {
  familiesHelpedTagline: "1,500+ Families Helped",
  accreditation: "Accredited by The Joint Commission",
  availability: "Available 24/7",
} as const;

export const VOICE = {
  tagline: "Mental Health, Addiction, & Family Interventions",
  shortValueProp:
    "Compassionate, family-centered addiction and mental health interventions. Trusted by more than 1,500 families nationwide.",
} as const;

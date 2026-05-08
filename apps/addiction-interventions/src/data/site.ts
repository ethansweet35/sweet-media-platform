/**
 * Brand-wide constants. Centralised so phone, copy, and trust signals
 * stay consistent across every template and one-off page.
 */

export const PHONE_DISPLAY = "949-776-7093";
export const PHONE_HREF = "tel:9497767093";

export const BRAND_NAME = "Addiction Interventions";

/** Navbar/footer wordmark — Supabase CDN (reliable on Vercel; WP hotlink can 403). */
export const NAV_LOGO_URL =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/brand_wordmark_navbar.png";

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

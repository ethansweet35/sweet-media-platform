/**
 * Mountain View Treatment — shared site constants.
 *
 * Centralized so every section / page / footer reads identical values.
 * Update once here when brand details change.
 */

export const SITE = {
  brand: "Mountain View Treatment",
  brandLong: "Mountain View Treatment",
  tagline: "Top Addiction Treatment Center",

  phone: {
    display: "(253)-252-5564",
    href: "tel:2532525564",
  },
  intakePhone: {
    display: "(253)-670-5993",
    href: "tel:2536705993",
  },
  contactEmail: "tanner@mountainviewtx.com",

  address: {
    street: "13028 Interurban Ave S, Suite 124",
    cityStateZip: "Seattle, WA 98168",
    full: "13028 Interurban Ave S Suite 124, Seattle, WA 98168",
  },

  hours: "Admissions available 24/7",

  assets: {
    logoHorizontal: "/logo-horizontal.png",
    logoIcon: "/logo-icon.webp",
    heroVideo:
      "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/videos/seattle-landscape.mp4",
  },
} as const;

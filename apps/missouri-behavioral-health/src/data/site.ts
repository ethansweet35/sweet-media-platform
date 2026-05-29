/** Brand-wide constants — phone, CTAs, and trust copy stay consistent site-wide. */

export const BRAND_NAME = "Missouri Behavioral Health";

/**
 * Official logo — MBH Full Logo Flattened Horizontal (client brand kit PNG).
 * Source: `public/brand/mbh-logo-full-horizontal.png`
 */
export const NAV_LOGO_URL =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/logos/mbh_logo_full_horizontal.png";
export const NAV_LOGO_WIDTH = 350;
export const NAV_LOGO_HEIGHT = 140;

export const PHONE_DISPLAY = "417-771-5305";
export const PHONE_HREF = "tel:4177715305";

export const EMAIL = "info@missouribehavioralhealth.com";

export const FACILITY_ADDRESS = "2942 E Battlefield Rd, Springfield, MO 65804";

export const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

/**
 * Real photography from the live WordPress media library (facility / program).
 * Do not replace with AI-generated facility imagery.
 */
const SUPABASE = "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

export const SITE_IMAGES = {
  facilityInterior: `${SUPABASE}/mbh_gallery_01.jpg`,
  facilityExterior: `${SUPABASE}/mbh_gallery_02.jpg`,
  therapyGroup: `${SUPABASE}/mbh_about_therapy_group.png`,
  aboutHeroLandscape: `${SUPABASE}/mbh_about_hero01.jpg`,
} as const;

export const HERO_TRUST_ITEMS = [
  { icon: "ri-shield-check-line", label: "HIPAA-compliant care" },
  { icon: "ri-time-line", label: "Same-day admissions available" },
  { icon: "ri-map-pin-2-line", label: "Springfield, MO & statewide virtual care" },
] as const;

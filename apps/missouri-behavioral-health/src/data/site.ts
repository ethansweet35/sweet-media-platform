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
/** Navbar logo — taller on mobile for legibility */
export const NAV_LOGO_CLASS = "h-16 w-auto max-lg:max-w-[min(58vw,240px)] lg:h-14 lg:max-w-none";

export const PHONE_DISPLAY = "417-771-5305";
export const PHONE_HREF = "tel:4177715305";

export const EMAIL = "info@missouribehavioralhealth.com";

export const FACILITY_ADDRESS = "2942 E Battlefield Rd, Springfield, MO 65804";

export const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

/**
 * Real photography from the live WordPress media library (facility / program).
 * Do not replace with AI-generated facility imagery.
 *
 * `mbh_gallery_02.jpg` is a staff portrait (Jen Ramsden) — not a facility photo.
 * Use only `mbh_team_jen.png` on her team profile; never reference gallery_02 in SITE_IMAGES.
 */
const SUPABASE = "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";
const SUPABASE_VIDEOS =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/videos";

export const SITE_VIDEOS = {
  /** Homepage “Tour Our Facility” — from live WP site */
  facilityTour: `${SUPABASE_VIDEOS}/mbh_facility_tour.mp4`,
} as const;

export const SITE_IMAGES = {
  /** Real facility interior (WP IMG_7804) — also available as mbh_facility_IMG_7804.jpg */
  facilityInterior: `${SUPABASE}/mbh_facility_IMG_7804.jpg`,
  /** Real facility photo for campus / building contexts (WP IMG_7788) */
  facilityCampus: `${SUPABASE}/mbh_facility_IMG_7788.jpg`,
  therapyGroup: `${SUPABASE}/mbh_about_therapy_group.png`,
  /** About page hero only — AI Missouri landscape; not a facility/building photo */
  aboutHeroLandscape: `${SUPABASE}/mbh_about_hero01.jpg`,
} as const;

export const HERO_TRUST_ITEMS = [
  { icon: "ri-shield-check-line", label: "HIPAA-compliant care" },
  { icon: "ri-time-line", label: "Same-day admissions available" },
  { icon: "ri-map-pin-2-line", label: "Springfield, MO & statewide virtual care" },
] as const;

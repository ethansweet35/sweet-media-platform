/**
 * Shared types for `@sweetmedia/seo-schema`.
 *
 * These mirror the canonical `brand_settings` table shape (see
 * `apps/client-template/supabase/client-template-schema.sql` plus the
 * columns added by migration `20260509000001_extend_brand_settings`).
 *
 * NOTE: There is also a `BrandSettings` type exported by
 * `@sweetmedia/blog-core/src/types/brandSettings.ts` that has drifted
 * from the SQL schema. Treat THIS file as the canonical, post-migration
 * shape. We will consolidate the two definitions in a follow-up pass.
 */

/**
 * One row of weekly business hours, as stored in the
 * `brand_settings.business_hours` jsonb column.
 *
 * @property day   Full English day name, e.g. "Monday".
 * @property open  Opening time in 24-hour "HH:MM" format, e.g. "09:00".
 * @property close Closing time in 24-hour "HH:MM" format, e.g. "17:30".
 */
export interface BusinessHours {
  day: string;
  open: string;
  close: string;
}

/**
 * A single FAQ entry, used by `buildFAQPageSchema`.
 *
 * @property question Visible question text.
 * @property answer   Plain-text answer (no HTML).
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * One node in a breadcrumb trail, used by `buildBreadcrumbSchema`.
 *
 * @property name Human-readable label shown in the breadcrumb (e.g. "Programs").
 * @property url  Absolute URL of the breadcrumb target.
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Minimal page descriptor consumed by `buildWebPageSchema`.
 *
 * @property title       Page `<title>` (also used as schema.org `name`).
 * @property description Optional meta description.
 * @property url         Absolute URL of the page.
 */
export interface PageMeta {
  title: string;
  description?: string;
  url: string;
}

/**
 * Canonical, post-migration shape of `public.brand_settings`.
 *
 * All columns added by migration `20260509000001_extend_brand_settings`
 * are present and nullable so the type is safe to use against rows that
 * predate the migration.
 *
 * `logo_url` is included even though it is not in the canonical SQL
 * schema today (it lives only in the drifted `@sweetmedia/blog-core`
 * type); it is referenced by the Article publisher schema. Add a SQL
 * migration to formalize it when ready.
 */
export interface BrandSettings {
  // ─── Identity ──────────────────────────────────────────────────────
  /** Primary key (uuid). */
  id: string;
  /** Tenant key — matches `NEXT_PUBLIC_SITE_ID` in each app. */
  site_key: string;
  /** Display name for the brand, e.g. "Northbound Treatment". */
  site_name: string;
  /** Canonical site URL, e.g. "https://www.northboundtreatment.com". */
  site_url: string | null;
  /**
   * Public URL of the brand's primary logo image. Currently NOT in
   * `client-template-schema.sql`; persisted in some live brand DBs only.
   */
  logo_url: string | null;

  // ─── Brand colors ─────────────────────────────────────────────────
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  background_color: string | null;

  // ─── Typography ───────────────────────────────────────────────────
  heading_font: string | null;
  body_font: string | null;

  // ─── Editorial voice ──────────────────────────────────────────────
  tone: string | null;
  audience: string | null;

  // ─── Author defaults for blog posts ───────────────────────────────
  author_name: string | null;
  author_title: string | null;
  author_bio: string | null;

  /** Categories surfaced in the blog UI; persisted as jsonb. */
  blog_categories: string[];

  // ─── CTA strip defaults (canonical SQL names) ─────────────────────
  cta_heading: string | null;
  cta_body: string | null;
  cta_button_label: string | null;
  cta_button_url: string | null;

  // ─── AI image generation defaults ─────────────────────────────────
  image_bucket: string | null;
  image_folder: string | null;
  image_style_prompt: string | null;
  image_negative_prompt: string | null;

  // ─── Migration 20260509000001: contact + location ─────────────────
  /** Primary public phone number, formatted as displayed on the site. */
  phone: string | null;
  /**
   * Static, tracking-free phone number reserved for Schema.org JSON-LD.
   * Use this instead of `phone` in structured data so that CallRail DNI
   * or other client-side number-swapping never pollutes the schema output
   * that crawlers read server-side. Falls back to `phone` when null.
   */
  schema_phone: string | null;
  street_address: string | null;
  city: string | null;
  /** US 2-letter state code preferred (e.g. "CA"). */
  state: string | null;
  zip: string | null;
  /** Latitude in decimal degrees; precision matches `numeric(10,7)`. */
  latitude: number | null;
  /** Longitude in decimal degrees; precision matches `numeric(10,7)`. */
  longitude: number | null;

  // ─── Migration 20260509000001: weekly business hours ──────────────
  business_hours: BusinessHours[] | null;

  // ─── Migration 20260509000001: social profiles ────────────────────
  social_facebook: string | null;
  social_instagram: string | null;
  social_linkedin: string | null;
  social_twitter: string | null;

  // ─── Migration 20260509000001: trust + credentials ────────────────
  /** Free-form list, e.g. ["The Joint Commission", "LegitScript Certified"]. */
  accreditations: string[] | null;
  /** Free-form list of insurance carriers accepted, e.g. ["Aetna", "Cigna"]. */
  insurance_accepted: string[] | null;
  /** Levels of care offered, e.g. ["Detox", "Residential", "PHP", "IOP"]. */
  levels_of_care: string[] | null;
  license_number: string | null;
  license_authority: string | null;
  /** 4-digit founding year, e.g. 1994. */
  founded_year: number | null;

  // ─── Bookkeeping ──────────────────────────────────────────────────
  created_at: string;
  updated_at: string;
}

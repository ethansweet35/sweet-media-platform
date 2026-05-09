/**
 * `@sweetmedia/seo-schema` — typed builders for schema.org JSON-LD.
 *
 * Every builder returns a plain `Record<string, unknown>` ready to be
 * embedded in a `<script type="application/ld+json">` tag. Builders
 * never throw and never emit empty / null fields — when source data is
 * absent the corresponding key is simply omitted, so the output is
 * always valid JSON-LD.
 *
 * Designed for any business type. Behavioral-health-specific fields
 * (accreditations, levels_of_care, etc.) are optional and dropped when
 * not provided.
 */

import type { BlogPost } from "@sweetmedia/blog-core";
import type {
  BrandSettings,
  BreadcrumbItem,
  BusinessHours,
  FaqItem,
  PageMeta,
} from "./types";

export type { BrandSettings, BreadcrumbItem, BusinessHours, FaqItem, PageMeta };

/** Schema.org JSON-LD context used by every builder. */
const SCHEMA_CONTEXT = "https://schema.org";

// ─── Internal helpers ───────────────────────────────────────────────────────

/**
 * Strip falsy / empty values from a JSON-LD fragment so the output never
 * carries `null`, empty strings, empty arrays, or empty plain objects.
 *
 * @param obj The fragment to clean.
 * @returns A new object containing only keys with meaningful values.
 */
function compact<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      Object.keys(value as Record<string, unknown>).length === 0
    ) {
      continue;
    }
    out[key] = value;
  }
  return out as T;
}

/**
 * Build the canonical `@id` used to cross-reference the brand's
 * organization node from other schemas (LocalBusiness, Service, WebPage).
 *
 * @param settings Brand settings row whose `site_url` anchors the @id.
 * @returns A stable `<site_url>/#organization` IRI, or undefined if no
 *          `site_url` is set.
 */
function organizationId(settings: BrandSettings): string | undefined {
  if (!settings.site_url) return undefined;
  return `${settings.site_url.replace(/\/+$/, "")}/#organization`;
}

/**
 * Build a `PostalAddress` fragment from the address columns. Returns
 * undefined when none of the address fields are populated, so callers
 * can omit `address` entirely.
 *
 * @param settings Brand settings row.
 * @returns A schema.org PostalAddress fragment, or undefined.
 */
function buildPostalAddress(
  settings: BrandSettings
): Record<string, unknown> | undefined {
  const fragment = compact({
    "@type": "PostalAddress",
    streetAddress: settings.street_address ?? undefined,
    addressLocality: settings.city ?? undefined,
    addressRegion: settings.state ?? undefined,
    postalCode: settings.zip ?? undefined,
  });
  return Object.keys(fragment).length > 1 ? fragment : undefined;
}

/**
 * Build a `GeoCoordinates` fragment, but only if BOTH latitude and
 * longitude are set (Google rejects partial coords).
 *
 * @param settings Brand settings row.
 * @returns A schema.org GeoCoordinates fragment, or undefined.
 */
function buildGeoCoordinates(
  settings: BrandSettings
): Record<string, unknown> | undefined {
  if (settings.latitude == null || settings.longitude == null) return undefined;
  return {
    "@type": "GeoCoordinates",
    latitude: settings.latitude,
    longitude: settings.longitude,
  };
}

/**
 * Collect non-empty social profile URLs into a `sameAs` array.
 *
 * @param settings Brand settings row.
 * @returns Array of URL strings (possibly empty).
 */
function buildSameAs(settings: BrandSettings): string[] {
  const candidates = [
    settings.social_facebook,
    settings.social_instagram,
    settings.social_linkedin,
    settings.social_twitter,
  ];
  return candidates.filter(
    (v): v is string => typeof v === "string" && v.trim() !== ""
  );
}

/**
 * Build an `ImageObject` fragment for the brand logo.
 *
 * @param settings Brand settings row.
 * @returns A schema.org ImageObject fragment, or undefined when the brand
 *          has no `logo_url` configured.
 */
function buildLogoImageObject(
  settings: BrandSettings
): Record<string, unknown> | undefined {
  if (!settings.logo_url) return undefined;
  return { "@type": "ImageObject", url: settings.logo_url };
}

/**
 * Convert `BrandSettings.business_hours` (a flat array of day rows) into
 * a list of `OpeningHoursSpecification` fragments suitable for
 * `LocalBusiness.openingHoursSpecification`.
 *
 * @param hours The raw business_hours array (may be null or empty).
 * @returns Array of OpeningHoursSpecification fragments, or undefined.
 */
function buildOpeningHoursSpecifications(
  hours: BusinessHours[] | null | undefined
): Record<string, unknown>[] | undefined {
  if (!hours || hours.length === 0) return undefined;
  const out: Record<string, unknown>[] = [];
  for (const h of hours) {
    if (!h?.day || !h?.open || !h?.close) continue;
    out.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    });
  }
  return out.length > 0 ? out : undefined;
}

/**
 * Build a reference fragment that links to the canonical organization
 * node by its `@id`. Used by `parentOrganization`, `provider`, etc.
 *
 * @param orgType   Schema.org type to use ("MedicalOrganization" or "Organization").
 * @param orgId     The pre-built organization @id, or undefined.
 * @returns A reference fragment, or undefined when no @id is available.
 */
function organizationRef(
  orgType: "MedicalOrganization" | "Organization",
  orgId: string | undefined
): Record<string, unknown> | undefined {
  if (!orgId) return undefined;
  return { "@type": orgType, "@id": orgId };
}

// ─── Public builders ────────────────────────────────────────────────────────

/**
 * Build a `MedicalOrganization` JSON-LD node for the brand.
 *
 * BH-specific fields (`availableService`, `accreditation`,
 * `medicalSpecialty`) are included only when the source data is
 * non-empty. For non-BH brands the resulting node degrades gracefully
 * to a generic medical organization profile with name / address / etc.
 *
 * @param settings Brand settings row to draw from.
 * @returns A schema.org MedicalOrganization JSON-LD object.
 */
export function buildMedicalOrganizationSchema(
  settings: BrandSettings
): Record<string, unknown> {
  const orgId = organizationId(settings);
  const sameAs = buildSameAs(settings);

  const availableService =
    settings.levels_of_care && settings.levels_of_care.length > 0
      ? settings.levels_of_care
          .filter((s) => typeof s === "string" && s.trim() !== "")
          .map((name) =>
            compact({
              "@type": "MedicalTherapy",
              name,
              ...(orgId
                ? { provider: organizationRef("MedicalOrganization", orgId) }
                : {}),
            })
          )
      : undefined;

  const accreditation =
    settings.accreditations && settings.accreditations.length > 0
      ? settings.accreditations.filter(
          (s) => typeof s === "string" && s.trim() !== ""
        )
      : undefined;

  return compact({
    "@context": SCHEMA_CONTEXT,
    "@type": "MedicalOrganization",
    "@id": orgId,
    name: settings.site_name,
    url: settings.site_url ?? undefined,
    logo: buildLogoImageObject(settings),
    telephone: settings.phone ?? undefined,
    address: buildPostalAddress(settings),
    geo: buildGeoCoordinates(settings),
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    foundingDate:
      typeof settings.founded_year === "number" && settings.founded_year > 0
        ? String(settings.founded_year)
        : undefined,
    availableService,
    accreditation,
    medicalSpecialty:
      availableService || accreditation ? "Addiction Medicine" : undefined,
  });
}

/**
 * Build a `LocalBusiness` JSON-LD node for the brand's physical
 * location, including weekly opening hours and a reference back to the
 * parent `MedicalOrganization` node.
 *
 * @param settings Brand settings row to draw from.
 * @returns A schema.org LocalBusiness JSON-LD object.
 */
export function buildLocalBusinessSchema(
  settings: BrandSettings
): Record<string, unknown> {
  const orgId = organizationId(settings);
  const localBusinessId = settings.site_url
    ? `${settings.site_url.replace(/\/+$/, "")}/#localbusiness`
    : undefined;

  return compact({
    "@context": SCHEMA_CONTEXT,
    "@type": "LocalBusiness",
    "@id": localBusinessId,
    name: settings.site_name,
    url: settings.site_url ?? undefined,
    telephone: settings.phone ?? undefined,
    address: buildPostalAddress(settings),
    geo: buildGeoCoordinates(settings),
    openingHoursSpecification: buildOpeningHoursSpecifications(
      settings.business_hours
    ),
    parentOrganization: organizationRef("MedicalOrganization", orgId),
  });
}

/**
 * Optional overrides for `buildServiceSchema`.
 *
 * @property description Free-form description of the service.
 * @property url         Override URL; defaults to the brand's `site_url`.
 */
export interface BuildServiceSchemaOptions {
  description?: string;
  url?: string;
}

/**
 * Build a `MedicalTherapy` JSON-LD node representing a single service
 * offered by the brand (e.g. "Detox", "PHP", "Family Therapy").
 *
 * @param serviceName Display name of the service.
 * @param settings    Brand settings row, used for the provider link.
 * @param options     Optional `description` and explicit `url` override.
 * @returns A schema.org MedicalTherapy JSON-LD object.
 */
export function buildServiceSchema(
  serviceName: string,
  settings: BrandSettings,
  options?: BuildServiceSchemaOptions
): Record<string, unknown> {
  const orgId = organizationId(settings);
  return compact({
    "@context": SCHEMA_CONTEXT,
    "@type": "MedicalTherapy",
    name: serviceName,
    provider: organizationRef("MedicalOrganization", orgId),
    url: options?.url ?? settings.site_url ?? undefined,
    description: options?.description,
  });
}

/**
 * Build a `FAQPage` JSON-LD node from a list of FAQ items.
 *
 * Items missing a `question` or `answer` are skipped. Returns a valid
 * (but empty) FAQPage shape when no items have content; callers can
 * choose not to render it in that case.
 *
 * @param faqs Array of FAQ items to include.
 * @returns A schema.org FAQPage JSON-LD object.
 */
export function buildFAQPageSchema(faqs: FaqItem[]): Record<string, unknown> {
  const mainEntity = (Array.isArray(faqs) ? faqs : [])
    .filter((f) => f && f.question?.trim() && f.answer?.trim())
    .map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    }));

  return compact({
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: mainEntity.length > 0 ? mainEntity : undefined,
  });
}

/**
 * Build an `Article` JSON-LD node for a published blog post.
 *
 * NOTE: `BlogPost` from `@sweetmedia/blog-core` does NOT carry an
 * `author_title` field — the equivalent is `authorRole`, used here for
 * the Person `jobTitle`. `BlogPost` also has no separate modified
 * timestamp; `dateModified` falls back to `publishedAt`.
 *
 * @param post     Published blog post in its in-memory shape.
 * @param settings Brand settings row used for the publisher block.
 * @returns A schema.org Article JSON-LD object.
 */
export function buildArticleSchema(
  post: BlogPost,
  settings: BrandSettings
): Record<string, unknown> {
  const author = compact({
    "@type": "Person",
    name: post.author,
    jobTitle: post.authorRole,
    image: post.authorPhoto,
    description: post.authorBio,
  });

  const publisher = compact({
    "@type": "Organization",
    name: settings.site_name,
    logo: buildLogoImageObject(settings),
  });

  return compact({
    "@context": SCHEMA_CONTEXT,
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: Object.keys(author).length > 1 ? author : undefined,
    publisher: Object.keys(publisher).length > 1 ? publisher : undefined,
  });
}

/**
 * Build a `BreadcrumbList` JSON-LD node from an ordered list of crumbs.
 *
 * Items missing `name` or `url` are skipped.
 *
 * @param items Ordered breadcrumb items, root-first.
 * @returns A schema.org BreadcrumbList JSON-LD object.
 */
export function buildBreadcrumbSchema(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  const list = (Array.isArray(items) ? items : [])
    .filter((i) => i && i.name?.trim() && i.url?.trim())
    .map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: i.name,
      item: i.url,
    }));

  return compact({
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: list.length > 0 ? list : undefined,
  });
}

/**
 * Build a `WebPage` JSON-LD node tying a single page back to the brand
 * organization via `isPartOf`.
 *
 * @param page     Page descriptor (title, optional description, URL).
 * @param settings Brand settings row used for the `isPartOf` link.
 * @returns A schema.org WebPage JSON-LD object.
 */
export function buildWebPageSchema(
  page: PageMeta,
  settings: BrandSettings
): Record<string, unknown> {
  const orgId = organizationId(settings);
  return compact({
    "@context": SCHEMA_CONTEXT,
    "@type": "WebPage",
    "@id": page.url,
    name: page.title,
    description: page.description,
    url: page.url,
    isPartOf: organizationRef("MedicalOrganization", orgId),
  });
}

const DEFAULT_ORIGIN = "https://missouribehavioralhealth.com";

/** Prefer NEXT_PUBLIC_SITE_URL in env; omit trailing slash. */
export function getPublicSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = (raw && raw.length > 0 ? raw : DEFAULT_ORIGIN).replace(/\/+$/, "");
  return base;
}

export function canonicalBlogPostUrl(slug: string): string {
  const path = slug.startsWith("/") ? slug : `/${slug}`;
  return `${getPublicSiteOrigin()}${path.endsWith("/") ? path : `${path}/`}`;
}

/** Canonical site origin read from env; omits trailing slash. */
export function getPublicSiteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/+$/, "");
}

export function canonicalBlogPostUrl(slug: string): string {
  return `${getPublicSiteOrigin()}/blog/${slug}`;
}

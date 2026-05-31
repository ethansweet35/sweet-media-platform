/**
 * Build the admin password-reset URL for the current brand.
 * Brands with Next.js `trailingSlash: true` must use a trailing slash or
 * Supabase may reject the redirect and fall back to site root (/).
 */
export function getAdminResetPasswordUrl(siteUrl?: string): string {
  const raw = (siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
  const origin = raw.replace(/\/+$/, "");
  if (!origin) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not configured.");
  }

  const useTrailingSlash = process.env.NEXT_PUBLIC_TRAILING_SLASH === "true";
  return `${origin}/admin/reset-password${useTrailingSlash ? "/" : ""}`;
}

/** Both forms for Supabase Auth redirect allow lists. */
export function getAdminResetPasswordAllowListEntries(siteUrl: string): string[] {
  const origin = siteUrl.replace(/\/+$/, "");
  return [
    `${origin}/admin/reset-password`,
    `${origin}/admin/reset-password/`,
    `${origin}/admin/**`,
    "http://localhost:3000/admin/reset-password",
    "http://localhost:3000/admin/reset-password/",
    "http://localhost:3001/admin/reset-password",
    "http://localhost:3001/admin/reset-password/",
  ];
}

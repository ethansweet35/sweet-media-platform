/**
 * Normalize route paths so pending-edit keys match between
 * usePathname() (often "/virtual-lp/" with trailingSlash) and
 * hardcoded ROUTE constants ("/virtual-lp").
 */
export function normalizeRoutePath(routePath: string): string {
  const trimmed = routePath.trim();
  if (!trimmed || trimmed === "/") return "/";
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (withLeading.length > 1 && withLeading.endsWith("/")) {
    return withLeading.slice(0, -1);
  }
  return withLeading;
}

export function buildPendingEditKey(routePath: string, fieldKey: string): string {
  return `${normalizeRoutePath(routePath)}::${fieldKey}`;
}

export function routesMatch(a: string, b: string): boolean {
  return normalizeRoutePath(a) === normalizeRoutePath(b);
}

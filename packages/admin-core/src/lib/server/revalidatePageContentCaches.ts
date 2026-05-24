import { revalidatePath, revalidateTag } from "next/cache";
import { getPageContentCacheTags } from "./pageContentOverrides";

function normalizeRoutePath(routePath: string): string {
  if (!routePath) return "/";
  let trimmed = routePath.trim();
  if (!trimmed.startsWith("/")) trimmed = `/${trimmed}`;
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed;
}

/**
 * Bust Next.js caches for a route after publish/discard.
 * Server-only — import from `@sweetmedia/admin-core/server`, not the client bundle.
 */
export function revalidatePageContentCaches(routePath: string): void {
  const normalized = normalizeRoutePath(routePath);
  const paths = new Set<string>([normalized]);
  if (normalized.length > 1) {
    paths.add(`${normalized}/`);
  }
  for (const p of paths) {
    try {
      revalidatePath(p);
    } catch (err) {
      console.warn(`[page-content] revalidatePath(${p}) failed:`, err);
    }
  }
  for (const tag of getPageContentCacheTags(normalized)) {
    try {
      revalidateTag(tag, { expire: 0 });
    } catch (err) {
      console.warn(`[page-content] revalidateTag(${tag}) failed:`, err);
    }
  }
}

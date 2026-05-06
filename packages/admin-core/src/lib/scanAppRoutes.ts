import { readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import type { SitemapPageRow } from "./sitemap";

function collectPageFiles(dir: string): string[] {
  const paths: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return paths;
  }
  for (const name of entries) {
    if (name.startsWith(".")) continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      paths.push(...collectPageFiles(full));
    } else if (name === "page.tsx") {
      paths.push(full);
    }
  }
  return paths;
}

function resolveRoutePath(appDir: string, pageFileAbsolute: string): string | null {
  const norm = relative(appDir, dirname(pageFileAbsolute)).replace(/\\/g, "/");
  const rawSegments = norm.split("/").filter(Boolean);

  for (const seg of rawSegments) {
    if (seg.startsWith("@")) return null;
    if (/^\([^)]+\)$/.test(seg)) return null;
    if (seg.includes("[") || seg.includes("]")) return null;
  }

  if (rawSegments.includes("admin") || rawSegments.includes("api")) return null;

  const visibleSegments = rawSegments.filter((s) => !s.startsWith("_"));
  return visibleSegments.length === 0 ? "/" : `/${visibleSegments.join("/")}`;
}

/**
 * Scans the Next.js src/app directory at build/request time and returns
 * SitemapPageRow objects for all static public routes.
 * Returns empty array if the directory cannot be read.
 */
export function scanAppRoutes(cwd: string): SitemapPageRow[] {
  const appDir = join(cwd, "src", "app");
  try {
    const files = collectPageFiles(appDir);
    const seen = new Set<string>();
    const rows: SitemapPageRow[] = [];

    for (const file of files.sort()) {
      const route = resolveRoutePath(appDir, file);
      if (!route || seen.has(route)) continue;
      seen.add(route);
      rows.push({ route_path: route, updated_at: null });
    }

    return rows;
  } catch {
    return [];
  }
}

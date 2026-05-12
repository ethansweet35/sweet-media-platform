export type SitemapPageRow = {
  route_path: string | null;
  updated_at: string | null;
};

export type SitemapPostRow = {
  slug: string | null;
  updated_at: string | null;
  published_at: string | null;
};

export type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export type SitemapGroupKind = "pages" | "blog" | "section";

export type SitemapGroupDefinition = {
  id: string;
  label: string;
  kind: SitemapGroupKind;
};

export type SitemapPartition = {
  group: SitemapGroupDefinition;
  entries: SitemapEntry[];
};

export type SitemapConfig = {
  minUrlsPerSection?: number;
  excludedSegments?: string[];
  sectionOverrides?: Record<string, string>;
  disabledGroups?: string[];
};

export const DEFAULT_SITEMAP_CONFIG: Required<Pick<SitemapConfig, "minUrlsPerSection">> = {
  minUrlsPerSection: 2,
};

export const SITEMAP_REVALIDATE_SECONDS = 86400;

const FALLBACK_PATHS = ["/", "/about", "/contact", "/blog"];

function normalizePath(raw: string | null | undefined): string | null {
  const value = String(raw ?? "").trim();
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const parsed = new URL(value);
      return parsed.pathname || "/";
    } catch {
      return null;
    }
  }
  const path = value.startsWith("/") ? value : `/${value}`;
  if (path === "/admin" || path.startsWith("/admin/")) return null;
  return path;
}

function toIsoDate(value: string | null | undefined, fallback: string): string {
  if (!value) return fallback;
  const t = Date.parse(value);
  if (Number.isNaN(t)) return fallback;
  return new Date(t).toISOString().split("T")[0];
}

function labelFromSegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function firstSegment(path: string): string | null {
  const segments = path.split("/").filter(Boolean);
  return segments[0] ?? null;
}

function resolveConfig(config?: SitemapConfig | null): SitemapConfig {
  return {
    minUrlsPerSection: config?.minUrlsPerSection ?? DEFAULT_SITEMAP_CONFIG.minUrlsPerSection,
    excludedSegments: config?.excludedSegments ?? [],
    sectionOverrides: config?.sectionOverrides ?? {},
    disabledGroups: config?.disabledGroups ?? [],
  };
}

function countSectionRoutes(pages: SitemapPageRow[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const page of pages) {
    const path = normalizePath(page.route_path);
    if (!path || path === "/blog" || path.startsWith("/blog/")) continue;

    const segment = firstSegment(path);
    if (!segment) continue;
    counts.set(segment, (counts.get(segment) ?? 0) + 1);
  }

  return counts;
}

function sectionGroupIds(pages: SitemapPageRow[], config?: SitemapConfig | null): Set<string> {
  const resolved = resolveConfig(config);
  const excluded = new Set(resolved.excludedSegments ?? []);
  const counts = countSectionRoutes(pages);
  const ids = new Set<string>();

  for (const [segment, count] of counts) {
    if (excluded.has(segment) || segment === "blog") continue;
    if (count >= (resolved.minUrlsPerSection ?? DEFAULT_SITEMAP_CONFIG.minUrlsPerSection)) {
      ids.add(segment);
    }
  }

  for (const prefix of Object.keys(resolved.sectionOverrides ?? {})) {
    const segment = firstSegment(prefix.startsWith("/") ? prefix : `/${prefix}`);
    if (segment) ids.add(segment);
  }

  return ids;
}

export function discoverSitemapGroups(
  pages: SitemapPageRow[],
  posts: SitemapPostRow[],
  config?: SitemapConfig | null,
): SitemapGroupDefinition[] {
  const resolved = resolveConfig(config);
  const disabled = new Set(resolved.disabledGroups ?? []);
  const sections = [...sectionGroupIds(pages, resolved)].sort((a, b) => a.localeCompare(b));
  const groups: SitemapGroupDefinition[] = [{ id: "pages", label: "Pages", kind: "pages" }];

  if (posts.length > 0) {
    groups.push({ id: "blog", label: "Blog", kind: "blog" });
  }

  for (const segment of sections) {
    groups.push({
      id: segment,
      label: labelFromSegment(segment),
      kind: "section",
    });
  }

  return groups.filter((group) => !disabled.has(group.id));
}

export function getChildSitemapPath(groupId: string): string {
  return `/sitemaps/${encodeURIComponent(groupId)}`;
}

export function getChildSitemapUrl(origin: string, groupId: string): string {
  const cleanOrigin = origin.replace(/\/+$/, "");
  return `${cleanOrigin}${getChildSitemapPath(groupId)}`;
}

function assignPageGroupId(
  path: string,
  sectionIds: Set<string>,
  config?: SitemapConfig | null,
): string {
  const resolved = resolveConfig(config);
  const overrides = resolved.sectionOverrides ?? {};

  for (const [prefix, groupId] of Object.entries(overrides)) {
    const normalizedPrefix = normalizePath(prefix);
    if (!normalizedPrefix) continue;
    if (path === normalizedPrefix || path.startsWith(`${normalizedPrefix}/`)) {
      return groupId;
    }
  }

  const segment = firstSegment(path);
  if (segment && sectionIds.has(segment)) return segment;
  return "pages";
}

function buildPageEntry(origin: string, path: string, page: SitemapPageRow | undefined, today: string): SitemapEntry {
  return {
    url: `${origin}${path}`,
    lastModified: toIsoDate(page?.updated_at ?? null, today),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/blog" ? 0.8 : 0.7,
  };
}

function buildPostEntry(origin: string, post: SitemapPostRow, today: string): SitemapEntry | null {
  const slug = String(post.slug ?? "").trim();
  if (!slug) return null;
  return {
    url: `${origin}/blog/${slug}`,
    lastModified: toIsoDate(post.updated_at ?? post.published_at, today),
    changeFrequency: "monthly",
    priority: 0.6,
  };
}

export function buildSitemapPartitionEntries(
  origin: string,
  groupId: string,
  pages: SitemapPageRow[],
  posts: SitemapPostRow[],
  config?: SitemapConfig | null,
): SitemapEntry[] {
  const today = new Date().toISOString().split("T")[0];
  const cleanOrigin = origin.replace(/\/+$/, "");
  const sectionIds = sectionGroupIds(pages, config);
  const seen = new Set<string>();
  const entries: SitemapEntry[] = [];

  if (groupId === "blog") {
    for (const post of posts) {
      const entry = buildPostEntry(cleanOrigin, post, today);
      if (!entry || seen.has(entry.url)) continue;
      seen.add(entry.url);
      entries.push(entry);
    }
    return entries;
  }

  const pagePaths = pages.map((page) => normalizePath(page.route_path)).filter((path): path is string => Boolean(path));
  const seedPaths = pagePaths.length > 0 ? pagePaths : groupId === "pages" ? FALLBACK_PATHS : [];

  for (const path of seedPaths) {
    if (path.startsWith("/blog/")) continue;
    if (assignPageGroupId(path, sectionIds, config) !== groupId) continue;

    const key = `${cleanOrigin}${path}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const pageRow = pages.find((page) => normalizePath(page.route_path) === path);
    entries.push(buildPageEntry(cleanOrigin, path, pageRow, today));
  }

  return entries;
}

export function buildSitemapPartitions(
  origin: string,
  pages: SitemapPageRow[],
  posts: SitemapPostRow[],
  config?: SitemapConfig | null,
): SitemapPartition[] {
  const groups = discoverSitemapGroups(pages, posts, config);
  return groups.map((group) => ({
    group,
    entries: buildSitemapPartitionEntries(origin, group.id, pages, posts, config),
  }));
}

export function buildSitemapEntries(
  origin: string,
  pages: SitemapPageRow[],
  posts: SitemapPostRow[],
  config?: SitemapConfig | null,
): SitemapEntry[] {
  const partitions = buildSitemapPartitions(origin, pages, posts, config);
  const seen = new Set<string>();
  const entries: SitemapEntry[] = [];

  for (const partition of partitions) {
    for (const entry of partition.entries) {
      if (seen.has(entry.url)) continue;
      seen.add(entry.url);
      entries.push(entry);
    }
  }

  return entries;
}

export function toSitemapXml(entries: SitemapEntry[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.url}</loc>\n`;
    xml += `    <lastmod>${entry.lastModified}</lastmod>\n`;
    xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `</urlset>`;
  return xml;
}

export function toSitemapIndexXml(origin: string, groups: SitemapGroupDefinition[]): string {
  const today = new Date().toISOString().split("T")[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const group of groups) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${getChildSitemapUrl(origin, group.id)}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  }
  xml += `</sitemapindex>`;
  return xml;
}

export function parseSitemapLocations(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

export function isSitemapIndexXml(xml: string): boolean {
  return /<sitemapindex[\s>]/i.test(xml);
}

export async function collectSitemapUrls(origin: string, fetchImpl: typeof fetch = fetch): Promise<string[]> {
  const cleanOrigin = origin.replace(/\/+$/, "");
  const rootRes = await fetchImpl(`${cleanOrigin}/sitemap.xml`, { cache: "no-store" });
  if (!rootRes.ok) return [];

  const rootXml = await rootRes.text();
  const rootLocs = parseSitemapLocations(rootXml);
  if (rootLocs.length === 0) return [];

  if (!isSitemapIndexXml(rootXml)) {
    return Array.from(new Set(rootLocs));
  }

  const urls = new Set<string>();
  for (const loc of rootLocs) {
    try {
      const childRes = await fetchImpl(loc, { cache: "no-store" });
      if (!childRes.ok) continue;
      const childXml = await childRes.text();
      for (const childLoc of parseSitemapLocations(childXml)) {
        urls.add(childLoc);
      }
    } catch {
      // non-fatal
    }
  }

  return Array.from(urls);
}

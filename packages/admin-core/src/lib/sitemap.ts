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

export function buildSitemapEntries(
  origin: string,
  pages: SitemapPageRow[],
  posts: SitemapPostRow[],
): SitemapEntry[] {
  const today = new Date().toISOString().split("T")[0];
  const cleanOrigin = origin.replace(/\/+$/, "");
  const seen = new Set<string>();
  const entries: SitemapEntry[] = [];

  const pagePaths = pages.map((p) => normalizePath(p.route_path)).filter((p): p is string => Boolean(p));
  const seedPaths = pagePaths.length > 0 ? pagePaths : FALLBACK_PATHS;

  for (const path of seedPaths) {
    const key = `${cleanOrigin}${path}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const pageRow = pages.find((p) => normalizePath(p.route_path) === path);
    entries.push({
      url: key,
      lastModified: toIsoDate(pageRow?.updated_at ?? null, today),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path === "/blog" ? 0.8 : 0.7,
    });
  }

  for (const post of posts) {
    const slug = String(post.slug ?? "").trim();
    if (!slug) continue;
    const key = `${cleanOrigin}/blog/${slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({
      url: key,
      lastModified: toIsoDate(post.updated_at ?? post.published_at, today),
      changeFrequency: "monthly",
      priority: 0.6,
    });
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

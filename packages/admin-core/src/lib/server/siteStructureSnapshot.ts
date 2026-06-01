import { countWordsInHtml } from "./pageContentFetcher";

export interface SiteStructureSnapshot {
  title: string;
  metaDescription: string;
  h1: string;
  navLabels: string[];
  internalPaths: string[];
  sitemapPathCount: number;
  homepageWordCount: number;
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function originFromUrl(url: string): string {
  const u = new URL(url);
  return u.origin;
}

function normalizePath(href: string, origin: string): string | null {
  try {
    const resolved = new URL(href, origin);
    if (resolved.origin !== origin) return null;
    const path = resolved.pathname.replace(/\/+$/, "") || "/";
    if (path.includes(".") && !path.endsWith("/")) {
      const ext = path.split(".").pop()?.toLowerCase() ?? "";
      if (["jpg", "jpeg", "png", "gif", "webp", "pdf", "zip", "css", "js"].includes(ext)) {
        return null;
      }
    }
    return path;
  } catch {
    return null;
  }
}

function extractFromHtml(html: string, pageUrl: string): Omit<SiteStructureSnapshot, "sitemapPathCount"> {
  const origin = originFromUrl(pageUrl);

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? stripTags(titleMatch[1]) : "";

  const metaMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
  );
  const metaDescription = metaMatch ? stripTags(metaMatch[1]).slice(0, 320) : "";

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? stripTags(h1Match[1]) : "";

  const navLabels = Array.from(html.matchAll(/<nav[^>]*>([\s\S]*?)<\/nav>/gi))
    .flatMap((m) =>
      Array.from(m[1].matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)),
    )
    .map(([, , label]) => stripTags(label))
    .filter((t) => t.length > 1 && t.length < 80)
    .slice(0, 24);

  const paths = new Set<string>();
  for (const m of html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)) {
    const path = normalizePath(m[1], origin);
    if (path) paths.add(path);
  }

  const internalPaths = [...paths]
    .filter((p) => p !== "/" || paths.size === 1)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 80);

  return {
    title,
    metaDescription,
    h1,
    navLabels,
    internalPaths,
    homepageWordCount: countWordsInHtml(html),
  };
}

async function fetchHtml(url: string, timeoutMs = 5000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "SweetMedia-SEO-Strategy/1.0", Accept: "text/html,application/xml" },
      cache: "no-store",
    });
    clearTimeout(timer);
    if (!res.ok) return "";
    return await res.text();
  } catch {
    clearTimeout(timer);
    return "";
  }
}

async function fetchSitemapPaths(origin: string, maxPaths: number): Promise<string[]> {
  const candidates = [`${origin}/sitemap.xml`, `${origin}/sitemap_index.xml`];
  const paths = new Set<string>();

  for (const sitemapUrl of candidates) {
    const xml = await fetchHtml(sitemapUrl, 4000);
    if (!xml || !xml.includes("<")) continue;

    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
      const path = normalizePath(m[1].trim(), origin);
      if (path) paths.add(path);
      if (paths.size >= maxPaths) break;
    }
    if (paths.size > 0) break;
  }

  return [...paths].sort((a, b) => a.localeCompare(b)).slice(0, maxPaths);
}

/** Lightweight homepage + sitemap crawl for hierarchy and CRO context. */
export async function buildSiteStructureSnapshot(pageUrl: string): Promise<SiteStructureSnapshot> {
  const html = await fetchHtml(pageUrl);
  const base = html.length > 100 ? extractFromHtml(html, pageUrl) : {
    title: "",
    metaDescription: "",
    h1: "",
    navLabels: [] as string[],
    internalPaths: [] as string[],
    homepageWordCount: 0,
  };

  const origin = originFromUrl(pageUrl);
  const sitemapPaths = await fetchSitemapPaths(origin, 60);
  const mergedPaths = new Set([...base.internalPaths, ...sitemapPaths]);

  return {
    ...base,
    internalPaths: [...mergedPaths].sort((a, b) => a.localeCompare(b)).slice(0, 80),
    sitemapPathCount: sitemapPaths.length,
  };
}

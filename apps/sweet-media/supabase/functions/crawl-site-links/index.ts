import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const UA = "Mozilla/5.0 (compatible; SweetMediaCrawler/1.0)";

// ── Types ────────────────────────────────────────────────────────────────────

interface DiscoverResult {
  pages: Array<{ url: string; linkCount: number; error?: string }>;
  links: Array<{ href: string; sources: Array<{ sourcePage: string; text: string }> }>;
  baseDomain: string;
}

interface CheckResult {
  url: string;
  status: "ok" | "broken" | "redirect" | "redirect-chain" | "error";
  statusCode?: number;
  chain?: string[];
  finalUrl?: string;
  errorMessage?: string;
}

// ── Sitemap parser ────────────────────────────────────────────────────────────

async function fetchSitemapUrls(siteUrl: string): Promise<string[]> {
  const base = siteUrl.replace(/\/$/, "");
  const urls: string[] = [];

  const tryFetch = async (url: string): Promise<string | null> => {
    try {
      const r = await fetch(url, {
        headers: { "User-Agent": UA },
        signal: AbortSignal.timeout(10000),
      });
      return r.ok ? await r.text() : null;
    } catch {
      return null;
    }
  };

  // Try /sitemap.xml, then /sitemap_index.xml
  let xml = await tryFetch(`${base}/sitemap.xml`);
  if (!xml) xml = await tryFetch(`${base}/sitemap_index.xml`);

  if (xml) {
    // Handle sitemap index — pull referenced sitemaps first
    const indexRefs = [...xml.matchAll(/<sitemap>\s*<loc>(.*?)<\/loc>/gs)].map(m => m[1].trim());
    if (indexRefs.length > 0) {
      const childXmls = await Promise.all(indexRefs.slice(0, 5).map(tryFetch));
      for (const child of childXmls) {
        if (child) xml += child;
      }
    }

    // Extract all <loc> entries
    for (const m of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
      const u = m[1].trim();
      // Skip non-HTML sitemaps (images, videos, news)
      if (!u.includes(".xml") && !u.includes(".jpg") && !u.includes(".png")) {
        urls.push(u);
      }
    }
  }

  // Fallback to homepage if sitemap unreachable or empty
  return urls.length > 0 ? urls : [base + "/"];
}

// ── HTML link extractor ───────────────────────────────────────────────────────

async function extractLinksFromPage(pageUrl: string): Promise<Array<{ text: string; href: string }>> {
  try {
    const response = await fetch(pageUrl, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return [];

    const html = await response.text();
    const results: Array<{ text: string; href: string }> = [];
    const seen = new Set<string>();

    // Match <a href="..."> tags
    const re = /<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      const raw = m[1].trim();
      const text = m[2].replace(/<[^>]+>/g, "").trim().slice(0, 120);

      // Skip non-navigable hrefs
      if (
        !raw ||
        raw.startsWith("javascript:") ||
        raw.startsWith("mailto:") ||
        raw.startsWith("tel:") ||
        raw.startsWith("#")
      ) continue;

      try {
        const absolute = new URL(raw, pageUrl).toString();
        // Strip fragment
        const clean = absolute.split("#")[0];
        if (!seen.has(clean)) {
          seen.add(clean);
          results.push({ text: text || raw, href: clean });
        }
      } catch {
        // Invalid URL
      }
    }

    return results;
  } catch {
    return [];
  }
}

// ── Link checker with full redirect chain ─────────────────────────────────────

async function checkWithChain(url: string): Promise<CheckResult> {
  const chain: string[] = [url];
  let current = url;

  try {
    for (let hop = 0; hop < 10; hop++) {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 10000);

      let response: Response;
      try {
        response = await fetch(current, {
          method: "HEAD",
          redirect: "manual",
          signal: controller.signal,
          headers: { "User-Agent": UA },
        });
      } finally {
        clearTimeout(t);
      }

      const code = response.status;

      if (code >= 300 && code < 400) {
        const loc = response.headers.get("location");
        if (!loc) break;

        let next: string;
        try { next = new URL(loc, current).toString(); }
        catch { break; }

        if (chain.includes(next)) {
          return { url, status: "redirect-chain", statusCode: code, chain, finalUrl: current, errorMessage: "Circular redirect" };
        }
        chain.push(next);
        current = next;
        continue;
      }

      // Terminal response
      const isRedirected = chain.length > 1;
      const hops = chain.length - 1;

      if (code === 404 || code === 410) {
        return { url, status: "broken", statusCode: code, ...(isRedirected ? { chain, finalUrl: current } : {}) };
      }
      if (code === 403) {
        // Retry with GET — some servers block HEAD
        try {
          const gc = new AbortController();
          const gt = setTimeout(() => gc.abort(), 10000);
          const gr = await fetch(current, { method: "GET", redirect: "manual", signal: gc.signal, headers: { "User-Agent": UA } });
          clearTimeout(gt);
          if (gr.status < 400) {
            return {
              url,
              status: isRedirected ? (hops > 1 ? "redirect-chain" : "redirect") : "ok",
              statusCode: gr.status,
              ...(isRedirected ? { chain, finalUrl: current } : {}),
            };
          }
        } catch { /* fall through */ }
        return { url, status: "broken", statusCode: 403, ...(isRedirected ? { chain, finalUrl: current } : {}) };
      }
      if (code >= 400) {
        return { url, status: "broken", statusCode: code, ...(isRedirected ? { chain, finalUrl: current } : {}) };
      }
      if (code >= 500) {
        return { url, status: "error", statusCode: code, errorMessage: `Server error ${code}`, ...(isRedirected ? { chain, finalUrl: current } : {}) };
      }

      // 2xx — success
      if (!isRedirected) return { url, status: "ok", statusCode: code };
      if (hops === 1) return { url, status: "redirect", statusCode: code, chain, finalUrl: current };
      return { url, status: "redirect-chain", statusCode: code, chain, finalUrl: current };
    }

    // Exceeded max hops
    return { url, status: "redirect-chain", chain, finalUrl: current, errorMessage: "Too many redirects (10+ hops)" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.toLowerCase().includes("abort") || msg.toLowerCase().includes("timeout")) {
      return { url, status: "error", errorMessage: "Request timed out" };
    }
    return { url, status: "error", errorMessage: msg };
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const { action, siteUrl, urls } = await req.json() as {
      action: "discover" | "check";
      siteUrl?: string;
      urls?: string[];
    };

    // ── Phase 1: discover all links across site ──────────────────────────────
    if (action === "discover") {
      if (!siteUrl) {
        return new Response(JSON.stringify({ error: "siteUrl required" }), {
          status: 400, headers: { ...cors, "Content-Type": "application/json" },
        });
      }

      const pageUrls = await fetchSitemapUrls(siteUrl);

      // Cap at 100 pages to stay within Edge Function timeout
      const pagesToCrawl = pageUrls.slice(0, 100);

      // link href → sources
      const linkMap = new Map<string, Array<{ sourcePage: string; text: string }>>();
      const pages: DiscoverResult["pages"] = [];

      // Crawl pages with concurrency limit of 5
      const CONCURRENCY = 5;
      for (let i = 0; i < pagesToCrawl.length; i += CONCURRENCY) {
        const batch = pagesToCrawl.slice(i, i + CONCURRENCY);
        const results = await Promise.all(
          batch.map(async (pageUrl) => {
            const links = await extractLinksFromPage(pageUrl);
            return { pageUrl, links };
          })
        );

        for (const { pageUrl, links } of results) {
          pages.push({ url: pageUrl, linkCount: links.length });
          for (const link of links) {
            const existing = linkMap.get(link.href) ?? [];
            if (!existing.some(s => s.sourcePage === pageUrl)) {
              existing.push({ sourcePage: pageUrl, text: link.text });
            }
            linkMap.set(link.href, existing);
          }
        }
      }

      const allLinks = Array.from(linkMap.entries()).map(([href, sources]) => ({ href, sources }));

      let baseDomain = "";
      try { baseDomain = new URL(siteUrl).hostname; } catch { /* */ }

      const payload: DiscoverResult = { pages, links: allLinks, baseDomain };
      return new Response(JSON.stringify(payload), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // ── Phase 2: check a batch of URLs with redirect chain ───────────────────
    if (action === "check") {
      if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return new Response(JSON.stringify({ error: "urls array required" }), {
          status: 400, headers: { ...cors, "Content-Type": "application/json" },
        });
      }

      const batch = urls.slice(0, 10);
      const results = await Promise.all(batch.map(checkWithChain));

      return new Response(JSON.stringify({ results }), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "action must be 'discover' or 'check'" }), {
      status: 400, headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
});

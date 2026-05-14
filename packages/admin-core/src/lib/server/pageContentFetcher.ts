export interface PageContentResult {
  /** Plain text extracted from the page (H1, H2s, paragraphs). Capped at 800 chars. */
  text: string;
  /**
   * Best seed hint for Semrush keyword derivation.
   * Prefers the page H1, falls back to first H2. Empty string when crawl failed.
   * Should be run through `cleanSeedPhrase` before sending to Semrush.
   */
  seedHint: string;
}

/**
 * Fetch a live page URL and extract readable text content for AI context.
 *
 * Used server-side to enrich:
 *  - SEO title/meta generation (generate-seo-meta routes, page type)
 *  - Keyword seed derivation (semrush/suggestions + semrush/auto-pick)
 *
 * Silently returns empty result on timeout, HTTP error, or any other failure.
 * Never throws.
 */
export async function fetchPageTextContent(
  url: string,
  timeoutMs = 4000,
): Promise<PageContentResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "SweetMedia-Admin-Bot/1.0", Accept: "text/html" },
    });
    clearTimeout(timer);
    if (!res.ok) return { text: "", seedHint: "" };
    const html = await res.text();
    return extractFromHtml(html);
  } catch {
    clearTimeout(timer);
    return { text: "", seedHint: "" };
  }
}

function extractFromHtml(html: string): PageContentResult {
  // Strip non-content blocks before extracting
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ");

  const stripTags = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  // H1 — best seed candidate
  const h1Match = stripped.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1Text = h1Match ? stripTags(h1Match[1]) : "";

  // First 3 H2s
  const h2Texts = Array.from(stripped.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi))
    .slice(0, 3)
    .map((m) => stripTags(m[1]))
    .filter(Boolean);

  // First meaningful paragraphs (≥ 40 chars)
  const pTexts = Array.from(stripped.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi))
    .slice(0, 8)
    .map((m) => stripTags(m[1]))
    .filter((t) => t.length >= 40);

  const text = [h1Text, ...h2Texts, ...pTexts]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 800);

  const seedHint = h1Text || h2Texts[0] || "";

  return { text, seedHint };
}

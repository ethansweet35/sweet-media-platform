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
 * Use AI (OpenRouter) to derive a specific, brand-aware 3–5 word keyword phrase
 * from crawled page content. This is far more accurate than relying on the H1
 * alone — it understands that "Case Studies" on a behavioral health marketing
 * site should produce "behavioral health marketing case studies", not generic results.
 *
 * Falls back to `fallbackSeed` on any error (network, timeout, bad response).
 * Never throws.
 */
export async function deriveKeywordSeedWithAi(
  pageText: string,
  routePath: string,
  openRouterApiKey: string,
  fallbackSeed: string,
): Promise<string> {
  if (!pageText.trim() || !openRouterApiKey) return fallbackSeed;
  try {
    const prompt = `You are an SEO keyword research expert. Given the following page content and URL path, suggest the single best 3–5 word keyword phrase that a prospective client or customer would search for to find this specific page. The phrase must be highly specific to the actual topic and industry shown in the content — not generic.

URL path: ${routePath}
Page content:
${pageText.slice(0, 600)}

Return ONLY the keyword phrase itself, nothing else. No explanation, no quotes, no punctuation.`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 20,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return fallbackSeed;
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = data?.choices?.[0]?.message?.content?.trim() ?? "";
    // Sanitise: strip quotes, take first line, enforce 2–6 word cap
    const cleaned = raw
      .replace(/^["'\s]+|["'\s]+$/g, "")
      .split("\n")[0]
      .trim();
    const wordCount = cleaned.split(/\s+/).length;
    if (cleaned && wordCount >= 2 && wordCount <= 6) return cleaned.toLowerCase();
    return fallbackSeed;
  } catch {
    return fallbackSeed;
  }
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

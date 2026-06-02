import { OPENROUTER_HAIKU_MODEL } from "../openRouterModels";
import {
  isDistinctiveRouteSlug,
  routeSlugToSeed,
  seedOverlapsRoute,
  type PageKeywordSeedContextPayload,
} from "../seedCleaner";

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
/**
 * Use AI (OpenRouter) to derive a specific, brand-aware 3–5 word keyword phrase
 * from crawled page content. This is far more accurate than relying on the H1
 * alone — it understands that "Case Studies" on a behavioral health marketing
 * site should produce "behavioral health marketing case studies", not generic results.
 *
 * @param originalSeed - The cleaned seed phrase before refinement (used as an anchor
 *   to ensure the AI stays on-topic and as a relevance guard on the result).
 *
 * Falls back to `fallbackSeed` on any error (network, timeout, bad response) or
 * when the result shares no words with the original seed.
 * Never throws.
 */
export async function deriveKeywordSeedWithAi(
  pageText: string,
  routePath: string,
  openRouterApiKey: string,
  fallbackSeed: string,
  originalSeed = "",
  pageContext?: PageKeywordSeedContextPayload,
): Promise<string> {
  const bodyText = pageText.trim();
  const hasContext =
    bodyText.length > 0 ||
    Boolean(pageContext?.page_title?.trim()) ||
    Boolean(pageContext?.seo_title?.trim()) ||
    Boolean(pageContext?.meta_description?.trim());

  if (!hasContext || !openRouterApiKey) return fallbackSeed;
  try {
    const routeSlug = routeSlugToSeed(routePath);
    const routeDistinctive = isDistinctiveRouteSlug(routeSlug);
    const orig = originalSeed.trim();
    const misaligned = orig && routeDistinctive && !seedOverlapsRoute(orig, routePath);

    const primaryLines: string[] = [`URL path: ${routePath}`];
    if (routeSlug) primaryLines.push(`URL topic (priority): ${routeSlug}`);
    if (pageContext?.page_title?.trim()) {
      primaryLines.push(`Page title (priority): ${pageContext.page_title.trim()}`);
    }
    if (orig) primaryLines.push(`Primary seed phrase (priority): ${orig}`);

    const extraLines: string[] = [];
    if (pageContext?.seo_title?.trim()) {
      extraLines.push(`SEO title: ${pageContext.seo_title.trim()}`);
    }
    if (pageContext?.meta_description?.trim()) {
      extraLines.push(`Meta description: ${pageContext.meta_description.trim().slice(0, 280)}`);
    }
    if (bodyText) extraLines.push(`Live page body (headings + copy):\n${bodyText.slice(0, 600)}`);

    let seedContext: string;
    if (misaligned || (routeDistinctive && orig)) {
      seedContext =
        "Return a 3–4 word Semrush keyword phrase. The phrase MUST reflect the URL topic and page title first. Use SEO title, meta description, and body copy only to sharpen the topic — never replace a specific page angle with a broader site-wide theme.";
    } else if (orig) {
      seedContext = `Start with the words from the primary seed phrase ("${orig}"), then adjust using SEO/meta/body so the final phrase is exactly 3–4 words and page-specific.`;
    } else {
      seedContext =
        "Return a 3–4 word keyword phrase using URL + page title as the core topic, informed by SEO, meta, and body copy.";
    }

    const prompt = `You are an SEO keyword research expert. Generate one Semrush-friendly keyword seed phrase.

RULES:
- ${seedContext}
- Do NOT use brand names, company names, or proper nouns.
- Return ONLY the keyword phrase — no explanation, no quotes, no punctuation.

PRIMARY (weight highest):
${primaryLines.join("\n")}

ADDITIONAL CONTEXT:
${extraLines.length > 0 ? extraLines.join("\n\n") : "(none)"}`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENROUTER_HAIKU_MODEL,
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
      .trim()
      .toLowerCase();
    const wordCount = cleaned.split(/\s+/).length;
    if (!cleaned || wordCount < 2 || wordCount > 4) return fallbackSeed;

    // Relevance guard: distinctive URLs must stay on URL/title topic; generic pages may anchor to orig.
    if (routeDistinctive && routeSlug) {
      const overlapsRoute = seedOverlapsRoute(cleaned, routePath);
      const origWords = orig.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
      const hasOrigWord =
        origWords.length > 0 && origWords.some((w) => cleaned.includes(w));
      if (!overlapsRoute && !hasOrigWord) return fallbackSeed;
    } else if (orig) {
      const origWords = orig.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
      if (origWords.length >= 2) {
        const startsWithSeed = cleaned.startsWith(origWords.join(" "));
        const sharesWord = origWords.some((w) => cleaned.includes(w));
        if (!startsWithSeed && !sharesWord) return fallbackSeed;
      } else if (origWords.length === 1 && !cleaned.includes(origWords[0])) {
        return fallbackSeed;
      }
    }

    return cleaned;
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

/** Strip HTML to plain text for word counting (full body, not the 800-char SEO excerpt). */
export function countWordsInHtml(html: string): number {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ");

  const bodyMatch = stripped.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : stripped;
  const text = bodyHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

export type PageWordCountResult =
  | { ok: true; words: number }
  | { ok: false; error: string };

/**
 * Fetch a live marketing page and count words in main body text.
 * Server-only — avoids browser CORS when admin and site origins differ.
 */
export async function fetchLivePageWordCount(
  routePath: string,
  options?: { siteOrigin?: string; timeoutMs?: number },
): Promise<PageWordCountResult> {
  const path = routePath.trim();
  if (!path) return { ok: false, error: "Route path is required." };

  const origin = (options?.siteOrigin ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
    .trim()
    .replace(/\/+$/, "");
  const urlPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${origin}${urlPath}`;
  const timeoutMs = options?.timeoutMs ?? 12_000;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: { "User-Agent": "SweetMedia-Admin-Bot/1.0", Accept: "text/html" },
    });
    clearTimeout(timer);
    if (!res.ok) {
      return { ok: false, error: `Page returned HTTP ${res.status}` };
    }
    const html = await res.text();
    const words = countWordsInHtml(html);
    if (words === 0) {
      return { ok: false, error: "No readable text found on page." };
    }
    return { ok: true, words };
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === "AbortError") {
      return { ok: false, error: "Request timed out." };
    }
    const message = err instanceof Error ? err.message : "Could not fetch page.";
    return { ok: false, error: message };
  }
}

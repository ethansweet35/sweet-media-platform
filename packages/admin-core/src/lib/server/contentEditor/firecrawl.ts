/**
 * Firecrawl — JS-rendered page scraper.
 *
 * Endpoint: POST https://api.firecrawl.dev/v1/scrape
 *   https://docs.firecrawl.dev/api-reference/endpoint/scrape
 *
 * We request `formats: ['markdown', 'html']` with `onlyMainContent: true` so
 * Firecrawl strips nav, footer, ads, etc. and returns just the article body.
 * The returned HTML lets us compute structural metrics (heading counts,
 * paragraphs, images, internal/external link counts) deterministically.
 *
 * Cost: ~$0.002 per scrape on paid plans; the free tier covers 500/month.
 * We report at the paid rate for visibility.
 */
import { ContentEditorError } from "./errors";
import { FIRECRAWL_COST_PER_SCRAPE } from "./pricing";
import { withRetry } from "./retry";
import { sanitizeScrapedPlaintext } from "./textUtils";
import type { ScrapeResult, ScrapedHeading, VendorCallResult } from "./types";

const ENDPOINT = "https://api.firecrawl.dev/v1/scrape";

interface FirecrawlScrapeResponse {
  success?: boolean;
  data?: {
    markdown?: string;
    html?: string;
    rawHtml?: string;
    metadata?: {
      title?: string;
      description?: string;
      sourceURL?: string;
      url?: string;
      statusCode?: number;
    };
  };
  error?: string;
}

function getApiKey(): string {
  const key = process.env.FIRECRAWL_API_KEY?.trim();
  if (!key) {
    throw new ContentEditorError("FIRECRAWL_API_KEY is not configured.", {
      source: "firecrawl",
      status: 500,
    });
  }
  return key;
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function countMatches(html: string, regex: RegExp): number {
  return (html.match(regex) || []).length;
}

function extractFirstH1(html: string): string {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return "";
  return match[1].replace(/<[^>]*>/g, "").trim();
}

function extractHeadings(html: string): ScrapedHeading[] {
  const headings: ScrapedHeading[] = [];
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  let position = 0;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    if (text) {
      headings.push({ level, text, position });
      position++;
    }
  }
  return headings;
}

function countLinks(
  html: string,
  pageDomain: string,
): { internal: number; external: number } {
  if (!pageDomain) return { internal: 0, external: 0 };
  let internal = 0;
  let external = 0;
  const regex = /<a\s[^>]*href\s*=\s*["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const absUrl = href.startsWith("http") ? new URL(href) : new URL(href, `https://${pageDomain}`);
      const host = absUrl.hostname.replace(/^www\./, "");
      if (host === pageDomain) internal++;
      else external++;
    } catch {
      // Bad URL — skip silently.
    }
  }
  return { internal, external };
}

/** Strip markdown formatting back to plain text for word counting. */
function markdownToPlain(md: string): string {
  return sanitizeScrapedPlaintext(
    md
      .replace(/```[\s\S]*?```/g, " ")                  // fenced code blocks
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")            // images
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")          // links → keep text
      .replace(/[#>*_~`]+/g, " ")                        // markdown punctuation
      .replace(/\|/g, " ")                               // table pipes
      .replace(/[-]{3,}/g, " "),                         // table separators
  );
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

/** Plain text from raw HTML when markdown is unavailable (server fetch path). */
export function htmlToPlainText(html: string): string {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ");
  return sanitizeScrapedPlaintext(
    stripped
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  );
}

function extractTitleFromHtml(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/<[^>]*>/g, "").trim() : "";
}

function extractMetaDescriptionFromHtml(html: string): string {
  const m = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
  );
  return m ? m[1].trim() : "";
}

/** Build a ScrapeResult from HTML (Firecrawl response or direct fetch). */
export function buildScrapeResultFromHtml(opts: {
  url: string;
  html: string;
  finalUrl?: string;
  title?: string;
  metaDescription?: string;
  markdown?: string;
}): ScrapeResult {
  const html = opts.html;
  const finalUrl = opts.finalUrl ?? opts.url;
  const pageDomain = extractDomain(finalUrl);
  const { internal, external } = countLinks(html, pageDomain);
  const markdown = opts.markdown ?? "";
  const cleanedText = markdown
    ? markdownToPlain(markdown)
    : htmlToPlainText(html);

  return {
    url: opts.url,
    finalUrl,
    title: (opts.title ?? extractTitleFromHtml(html)).trim(),
    metaDescription: (opts.metaDescription ?? extractMetaDescriptionFromHtml(html)).trim(),
    cleanedText,
    cleanedHtml: html,
    cleanedMarkdown: markdown,
    wordCount: countWords(cleanedText),
    h1Text: extractFirstH1(html),
    h2Count: countMatches(html, /<h2[\s>]/gi),
    h3Count: countMatches(html, /<h3[\s>]/gi),
    paragraphCount: countMatches(html, /<p[\s>]/gi),
    imageCount: countMatches(html, /<img[\s>]/gi),
    internalLinkCount: internal,
    externalLinkCount: external,
    headings: extractHeadings(html),
  };
}

export interface ScrapeOptions {
  url: string;
  /** Wait this many ms after page load before reading DOM. Defaults to 1500. */
  waitForMs?: number;
  /** Per-request timeout in ms (passed to Firecrawl). Defaults to 30000. */
  timeoutMs?: number;
}

export async function scrapePage(
  opts: ScrapeOptions,
): Promise<VendorCallResult<ScrapeResult>> {
  const url = opts.url.trim();
  if (!url) {
    throw new ContentEditorError("url is required", {
      source: "firecrawl",
      status: 400,
    });
  }

  const apiKey = getApiKey();

  const body = {
    url,
    formats: ["markdown", "html"],
    onlyMainContent: true,
    waitFor: opts.waitForMs ?? 1500,
    timeout: opts.timeoutMs ?? 30000,
  };

  const json = await withRetry(async () => {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new ContentEditorError(
        `Firecrawl responded ${res.status}: ${text.slice(0, 300)}`,
        { source: "firecrawl", status: 502, detail: text.slice(0, 800) },
      );
      (err as unknown as { status: number }).status = res.status;
      throw err;
    }
    return (await res.json()) as FirecrawlScrapeResponse;
  });

  if (!json.success || !json.data) {
    throw new ContentEditorError(
      `Firecrawl scrape failed: ${json.error ?? "no data returned"}`,
      { source: "firecrawl", status: 502, detail: json },
    );
  }

  const result = buildScrapeResultFromHtml({
    url,
    html: json.data.html ?? "",
    markdown: json.data.markdown ?? "",
    finalUrl: json.data.metadata?.sourceURL ?? json.data.metadata?.url ?? url,
    title: json.data.metadata?.title ?? "",
    metaDescription: json.data.metadata?.description ?? "",
  });

  return { data: result, cost_usd: FIRECRAWL_COST_PER_SCRAPE };
}

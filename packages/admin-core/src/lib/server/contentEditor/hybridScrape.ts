/**
 * Lite analysis: try a fast server-side HTML fetch first; fall back to Firecrawl
 * when the page is thin, blocked, or JS-dependent.
 */
import { ContentEditorError } from "./errors";
import { buildScrapeResultFromHtml, scrapePage, type ScrapeOptions } from "./firecrawl";
import type { ScrapeResult, VendorCallResult } from "./types";

const MIN_HTML_BYTES = 2500;
const MIN_WORD_COUNT = 300;
const FETCH_TIMEOUT_MS = 15000;

export async function scrapePageHybrid(
  opts: ScrapeOptions,
): Promise<VendorCallResult<ScrapeResult>> {
  const url = opts.url.trim();
  if (!url) {
    throw new ContentEditorError("url is required", {
      source: "hybrid-scrape",
      status: 400,
    });
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "SweetMedia-ContentEditor/1.0",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    clearTimeout(timer);

    if (res.ok) {
      const html = await res.text();
      const finalUrl = res.url || url;
      if (html.length >= MIN_HTML_BYTES) {
        const result = buildScrapeResultFromHtml({ url, html, finalUrl });
        if (result.wordCount >= MIN_WORD_COUNT) {
          return { data: result, cost_usd: 0 };
        }
      }
    }
  } catch {
    // Fall through to Firecrawl.
  }

  return scrapePage(opts);
}

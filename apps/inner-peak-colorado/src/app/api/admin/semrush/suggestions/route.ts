import { NextResponse } from "next/server";
import {
  getKeywordOverview,
  getKeywordSuggestions,
  SemrushApiError,
  fetchPageTextContent,
  deriveKeywordSeedWithAi,
  cleanSeedPhrase,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SuggestionsRequest {
  phrase?: string;
  limit?: number;
  database?: string;
  /** Route path (e.g. "/about") — used to crawl the live page and derive a
   * better seed when the phrase is too short/generic for Semrush. */
  route_path?: string;
}

const MIN_LIMIT = 1;
const MAX_LIMIT = 25;

/**
 * Crawl the live page and use AI to derive a brand-aware, specific keyword seed.
 * Triggered when the seed is ≤3 words (catches "Home", "About", "Case Studies",
 * "SEO Services", etc.). Falls back gracefully to the original phrase.
 */
async function refineSeedFromPage(phrase: string, routePath: string): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!siteUrl) return phrase;

  const { text, seedHint } = await fetchPageTextContent(`${siteUrl}${routePath}`, 4000);

  // Use AI to derive a specific seed, anchored to the original phrase so it
  // can't drift to unrelated topics (e.g. client industries vs. the service offered).
  if (text && apiKey) {
    const aiSeed = await deriveKeywordSeedWithAi(text, routePath, apiKey, "", phrase);
    if (aiSeed) return aiSeed;
  }

  // Fallback: clean the H1 if AI wasn't available or returned nothing.
  if (seedHint) {
    const cleaned = cleanSeedPhrase(seedHint);
    if (cleaned && cleaned.split(/\s+/).length > phrase.split(/\s+/).length) return cleaned;
  }

  return phrase;
}

export async function POST(request: Request) {
  let body: SuggestionsRequest;
  try {
    body = (await request.json()) as SuggestionsRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const phrase = body.phrase?.trim();
  if (!phrase) {
    return NextResponse.json({ ok: false, error: "phrase is required" }, { status: 400 });
  }

  const limit = Math.max(
    MIN_LIMIT,
    Math.min(MAX_LIMIT, Number.isFinite(body.limit) ? Number(body.limit) : 10),
  );

  // Refine seeds that are ≤3 words (generic page titles) using AI + live page crawl.
  const isTooGeneric = phrase.split(/\s+/).length <= 3;
  const effectivePhrase =
    isTooGeneric && body.route_path
      ? await refineSeedFromPage(phrase, body.route_path)
      : phrase;

  try {
    const suggestionsResult = await getKeywordSuggestions(effectivePhrase, {
      displayLimit: limit,
      database: body.database,
    });
    const seedForOverview = suggestionsResult.effectiveSeed || effectivePhrase;
    const seed = await getKeywordOverview(seedForOverview, { database: body.database }).catch(
      (err) => {
        if (err instanceof SemrushApiError) return null;
        throw err;
      },
    );

    return NextResponse.json({
      ok: true,
      seed,
      suggestions: suggestionsResult.rows,
      effectiveSeed: suggestionsResult.effectiveSeed,
      triedSeeds: suggestionsResult.triedSeeds,
      requestedSeed: phrase,
      refinedSeed: effectivePhrase !== phrase ? effectivePhrase : undefined,
    });
  } catch (err) {
    if (err instanceof SemrushApiError) {
      return NextResponse.json(
        { ok: false, error: err.message, semrush_body: err.body },
        { status: err.status >= 400 && err.status < 600 ? err.status : 502 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Semrush request failed." },
      { status: 500 },
    );
  }
}

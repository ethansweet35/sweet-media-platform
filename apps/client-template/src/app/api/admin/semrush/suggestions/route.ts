import { NextResponse } from "next/server";
import {
  getKeywordOverview,
  getKeywordSuggestions,
  SemrushApiError,
  fetchPageTextContent,
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
 * Attempt to derive a richer Semrush seed from the live page's H1 text.
 * Only runs when the current seed is ≤2 words AND route_path is provided.
 * Returns the original phrase unchanged when crawl fails or yields nothing better.
 */
async function refineSeedFromPage(phrase: string, routePath: string): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return phrase;
  const { seedHint } = await fetchPageTextContent(`${siteUrl}${routePath}`, 4000);
  if (!seedHint) return phrase;
  const cleaned = cleanSeedPhrase(seedHint);
  // Only upgrade the seed if it gives us more signal (more words)
  if (cleaned && cleaned.split(/\s+/).length > phrase.split(/\s+/).length) return cleaned;
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

  // Refine short/generic seeds using the live page's H1 before hitting Semrush.
  const isTooGeneric = phrase.split(/\s+/).length <= 2;
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

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
  route_path?: string;
}

const MIN_LIMIT = 1;
const MAX_LIMIT = 25;

async function refineSeedFromPage(phrase: string, routePath: string): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return phrase;
  const { seedHint } = await fetchPageTextContent(`${siteUrl}${routePath}`, 4000);
  if (!seedHint) return phrase;
  const cleaned = cleanSeedPhrase(seedHint);
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

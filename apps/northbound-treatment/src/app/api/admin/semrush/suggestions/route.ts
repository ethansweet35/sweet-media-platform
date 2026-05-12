import { NextResponse } from "next/server";
import {
  getKeywordOverview,
  getKeywordSuggestions,
  SemrushApiError,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SuggestionsRequest {
  phrase?: string;
  limit?: number;
  database?: string;
}

const MIN_LIMIT = 1;
const MAX_LIMIT = 25;

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

  try {
    // Run suggestions first — it returns the effective seed (post-fallback) which
    // we then use for the overview lookup so the seed-row metrics match the
    // suggestions actually shown.
    const suggestionsResult = await getKeywordSuggestions(phrase, {
      displayLimit: limit,
      database: body.database,
    });
    const seedForOverview = suggestionsResult.effectiveSeed || phrase;
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

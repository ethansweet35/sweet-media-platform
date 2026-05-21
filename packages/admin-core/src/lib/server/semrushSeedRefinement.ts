import {
  cleanSeedPhrase,
  isDistinctiveRouteSlug,
  routeSlugToSeed,
  seedOverlapsRoute,
  type PageKeywordSeedContextPayload,
} from "../seedCleaner";
import { deriveKeywordSeedWithAi, fetchPageTextContent } from "./pageContentFetcher";

/** Whether the server should crawl the live page and refine the Semrush seed. */
export function shouldRefineKeywordSeedFromPage(
  phrase: string,
  routePath: string,
  pageContext?: PageKeywordSeedContextPayload,
): boolean {
  if (!routePath.trim()) {
    const cleaned = cleanSeedPhrase(phrase);
    const wordCount = cleaned ? cleaned.split(/\s+/).filter(Boolean).length : 0;
    return wordCount > 0 && wordCount <= 3;
  }

  const hasMetaContext = Boolean(
    pageContext?.seo_title?.trim() ||
      pageContext?.meta_description?.trim() ||
      pageContext?.page_title?.trim(),
  );
  if (hasMetaContext) return true;

  const cleaned = cleanSeedPhrase(phrase);
  const wordCount = cleaned ? cleaned.split(/\s+/).filter(Boolean).length : 0;
  const slug = routeSlugToSeed(routePath);
  if (isDistinctiveRouteSlug(slug) && !seedOverlapsRoute(phrase, routePath)) {
    return true;
  }
  return wordCount > 0 && wordCount <= 4;
}

/**
 * Crawl the live page and derive a page-specific keyword seed (AI + H1 fallback).
 * Uses URL + page title as primary topic; SEO, meta, and body copy as enrichment.
 */
export async function refineKeywordSeedFromPage(
  phrase: string,
  routePath: string,
  pageContext?: PageKeywordSeedContextPayload,
): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const apiKey = process.env.OPENROUTER_API_KEY;
  const primarySeed = cleanSeedPhrase(phrase) || phrase;

  const { text, seedHint } = siteUrl
    ? await fetchPageTextContent(`${siteUrl}${routePath}`, 4000)
    : { text: "", seedHint: "" };

  const enrichedContext: PageKeywordSeedContextPayload = {
    page_title: pageContext?.page_title?.trim() || undefined,
    seo_title: pageContext?.seo_title?.trim() || undefined,
    meta_description: pageContext?.meta_description?.trim() || undefined,
  };

  if (apiKey && (text || Object.values(enrichedContext).some(Boolean))) {
    const aiSeed = await deriveKeywordSeedWithAi(
      text,
      routePath,
      apiKey,
      primarySeed,
      primarySeed,
      enrichedContext,
    );
    if (aiSeed && aiSeed !== primarySeed) return aiSeed;
    if (aiSeed) return aiSeed;
  }

  if (seedHint) {
    const cleanedHint = cleanSeedPhrase(seedHint);
    const primaryWords = primarySeed.split(/\s+/).filter(Boolean).length;
    const hintWords = cleanedHint.split(/\s+/).filter(Boolean).length;
    if (cleanedHint && hintWords >= primaryWords) return cleanedHint;
  }

  return primarySeed;
}

// ─── Shared Next.js route handlers (import in apps/*/api/admin/semrush/*) ───

import { NextResponse } from "next/server";
import {
  getKeywordOverview,
  getKeywordSuggestions,
  pickKeyword,
  SemrushApiError,
  type KeywordPickMode,
} from "./semrushClient";

const MIN_LIMIT = 1;
const MAX_LIMIT = 25;

interface SuggestionsRequest {
  phrase?: string;
  limit?: number;
  database?: string;
  route_path?: string;
  page_context?: PageKeywordSeedContextPayload;
}

export async function handleSemrushSuggestionsPost(request: Request): Promise<Response> {
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

  const effectivePhrase =
    body.route_path &&
    shouldRefineKeywordSeedFromPage(phrase, body.route_path, body.page_context)
      ? await refineKeywordSeedFromPage(phrase, body.route_path, body.page_context)
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

interface AutoPickRequest {
  seed?: string;
  mode?: KeywordPickMode;
  database?: string;
  route_path?: string;
  page_context?: PageKeywordSeedContextPayload;
}

export async function handleSemrushAutoPickPost(request: Request): Promise<Response> {
  let body: AutoPickRequest;
  try {
    body = (await request.json()) as AutoPickRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const rawSeed = body.seed?.trim();
  const mode = body.mode;
  if (!rawSeed) {
    return NextResponse.json({ ok: false, error: "seed is required" }, { status: 400 });
  }
  if (mode !== "page" && mode !== "blog") {
    return NextResponse.json(
      { ok: false, error: "mode must be 'page' or 'blog'" },
      { status: 400 },
    );
  }

  const seed =
    body.route_path &&
    shouldRefineKeywordSeedFromPage(rawSeed, body.route_path, body.page_context)
      ? await refineKeywordSeedFromPage(rawSeed, body.route_path, body.page_context)
      : rawSeed;

  try {
    const result = await pickKeyword(seed, mode, { database: body.database });
    return NextResponse.json({
      ok: true,
      pick: result.pick,
      reason: result.reason,
      candidates: result.candidates,
      refinedSeed: seed !== rawSeed ? seed : undefined,
    });
  } catch (err) {
    if (err instanceof SemrushApiError) {
      return NextResponse.json(
        { ok: false, error: err.message, semrush_body: err.body },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Semrush request failed." },
      { status: 500 },
    );
  }
}

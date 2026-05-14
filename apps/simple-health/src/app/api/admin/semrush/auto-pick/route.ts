import { NextResponse } from "next/server";
import {
  pickKeyword,
  SemrushApiError,
  fetchPageTextContent,
  deriveKeywordSeedWithAi,
  cleanSeedPhrase,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface AutoPickRequest {
  seed?: string;
  mode?: "page" | "blog";
  database?: string;
  /** Route path (e.g. "/about") — used to crawl the live page and derive a
   * better seed when the original seed is too short/generic for Semrush. */
  route_path?: string;
}

async function refineSeedFromPage(seed: string, routePath: string): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!siteUrl) return seed;

  const { text, seedHint } = await fetchPageTextContent(`${siteUrl}${routePath}`, 4000);

  if (text && apiKey) {
    const aiSeed = await deriveKeywordSeedWithAi(text, routePath, apiKey, "");
    if (aiSeed) return aiSeed;
  }

  if (seedHint) {
    const cleaned = cleanSeedPhrase(seedHint);
    if (cleaned && cleaned.split(/\s+/).length > seed.split(/\s+/).length) return cleaned;
  }

  return seed;
}

export async function POST(request: Request) {
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

  // Refine seeds that are ≤3 words (generic page titles) using AI + live page crawl.
  const isTooGeneric = rawSeed.split(/\s+/).length <= 3;
  const seed =
    isTooGeneric && body.route_path
      ? await refineSeedFromPage(rawSeed, body.route_path)
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
        { status: err.status >= 400 && err.status < 600 ? err.status : 502 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Auto-pick failed." },
      { status: 500 },
    );
  }
}

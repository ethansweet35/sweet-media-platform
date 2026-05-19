import { NextResponse } from "next/server";
import { getUrlRankingKeywords, SemrushApiError } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RankingKeywordsRequest {
  url?: string;
  limit?: number;
  database?: string;
}

const MIN_LIMIT = 1;
const MAX_LIMIT = 100;

export async function POST(request: Request) {
  let body: RankingKeywordsRequest;
  try {
    body = (await request.json()) as RankingKeywordsRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const url = body.url?.trim();
  if (!url) {
    return NextResponse.json({ ok: false, error: "url is required" }, { status: 400 });
  }

  const limit = Math.max(
    MIN_LIMIT,
    Math.min(MAX_LIMIT, Number.isFinite(body.limit) ? Number(body.limit) : 50),
  );

  try {
    const keywords = await getUrlRankingKeywords(url, {
      displayLimit: limit,
      database: body.database,
    });

    return NextResponse.json({ ok: true, url, keywords });
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

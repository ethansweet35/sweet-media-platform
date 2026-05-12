import { NextResponse } from "next/server";
import { analyzeKeyword, SweetSeoError } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Live web research + model output can take 60-120s on top of overhead.
export const maxDuration = 300;

interface AnalyzeRequest {
  keyword?: string;
  country?: string;
  model?: string;
  briefId?: string;
}

export async function POST(request: Request) {
  let body: AnalyzeRequest;
  try {
    body = (await request.json()) as AnalyzeRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const keyword = body.keyword?.trim();
  if (!keyword) {
    return NextResponse.json({ ok: false, error: "keyword is required." }, { status: 400 });
  }

  try {
    const brief = await analyzeKeyword({
      keyword,
      country: body.country,
      model: body.model,
      briefId: body.briefId?.trim() || undefined,
    });
    return NextResponse.json({ ok: true, brief });
  } catch (err) {
    if (err instanceof SweetSeoError) {
      return NextResponse.json(
        { ok: false, error: err.message, detail: err.detail },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Sweet SEO analysis failed.",
      },
      { status: 500 },
    );
  }
}

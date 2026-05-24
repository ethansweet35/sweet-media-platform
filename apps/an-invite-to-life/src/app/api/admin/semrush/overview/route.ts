import { NextResponse } from "next/server";
import { getKeywordOverview, SemrushApiError } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface OverviewRequest {
  phrase?: string;
  database?: string;
}

export async function POST(request: Request) {
  let body: OverviewRequest;
  try {
    body = (await request.json()) as OverviewRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const phrase = body.phrase?.trim();
  if (!phrase) {
    return NextResponse.json({ ok: false, error: "phrase is required" }, { status: 400 });
  }

  try {
    const overview = await getKeywordOverview(phrase, { database: body.database });
    return NextResponse.json({ ok: true, overview });
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

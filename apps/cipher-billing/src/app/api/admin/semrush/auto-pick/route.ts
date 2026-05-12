import { NextResponse } from "next/server";
import { pickKeyword, SemrushApiError } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface AutoPickRequest {
  seed?: string;
  mode?: "page" | "blog";
  database?: string;
}

export async function POST(request: Request) {
  let body: AutoPickRequest;
  try {
    body = (await request.json()) as AutoPickRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const seed = body.seed?.trim();
  const mode = body.mode;
  if (!seed) {
    return NextResponse.json({ ok: false, error: "seed is required" }, { status: 400 });
  }
  if (mode !== "page" && mode !== "blog") {
    return NextResponse.json(
      { ok: false, error: "mode must be 'page' or 'blog'" },
      { status: 400 },
    );
  }

  try {
    const result = await pickKeyword(seed, mode, { database: body.database });
    return NextResponse.json({
      ok: true,
      pick: result.pick,
      reason: result.reason,
      candidates: result.candidates,
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

import { NextResponse } from "next/server";
import {
  ContentEditorError,
  rejectTrackedPageBlock,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; blockId: string }>;
}

/** POST /api/admin/tracked-pages/[id]/blocks/[blockId]/reject */
export async function POST(_request: Request, ctx: RouteContext) {
  const { blockId } = await ctx.params;
  if (!blockId) {
    return NextResponse.json(
      { ok: false, error: "blockId is required." },
      { status: 400 },
    );
  }
  try {
    const block = await rejectTrackedPageBlock(blockId);
    return NextResponse.json({ ok: true, block });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed." },
      { status: 500 },
    );
  }
}

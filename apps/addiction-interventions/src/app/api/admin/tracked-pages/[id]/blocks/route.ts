import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  ContentEditorError,
  listTrackedPageBlocks,
  getRoutePathForTrackedPage,
  getContentEditorAdminClient,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** GET /api/admin/tracked-pages/[id]/blocks — list all blocks for the page. */
export async function GET(_request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json(
      { ok: false, error: "tracked-page id is required." },
      { status: 400 },
    );
  }
  try {
    const blocks = await listTrackedPageBlocks(id);
    return NextResponse.json({ ok: true, blocks });
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

interface CreateBlockBody {
  block_type?: string;
  heading?: string | null;
  body_markdown?: string | null;
  list_items?: string[] | null;
  callout_variant?: string | null;
  position?: number;
  status?: "pending" | "active" | "archived" | "rejected";
  source?: "manual" | "ai-generated" | "imported";
  editor_id?: string | null;
}

/** POST /api/admin/tracked-pages/[id]/blocks — manually create a block. */
export async function POST(request: Request, ctx: RouteContext) {
  const { id: trackedPageId } = await ctx.params;
  if (!trackedPageId) {
    return NextResponse.json(
      { ok: false, error: "tracked-page id is required." },
      { status: 400 },
    );
  }
  let body: CreateBlockBody;
  try {
    body = (await request.json()) as CreateBlockBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }
  if (!body.block_type) {
    return NextResponse.json(
      { ok: false, error: "block_type is required." },
      { status: 400 },
    );
  }

  try {
    const adm = getContentEditorAdminClient();
    const { data, error } = await adm
      .from("tracked_page_content_blocks")
      .insert({
        tracked_page_id: trackedPageId,
        editor_id: body.editor_id ?? null,
        position: body.position ?? 0,
        block_type: body.block_type,
        heading: body.heading ?? null,
        body_markdown: body.body_markdown ?? null,
        list_items: body.list_items ?? null,
        callout_variant: body.callout_variant ?? null,
        status: body.status ?? "active",
        source: body.source ?? "manual",
        applied_at: body.status === "active" || !body.status ? new Date().toISOString() : null,
      })
      .select("*")
      .single();
    if (error) {
      return NextResponse.json(
        { ok: false, error: `Failed to create block: ${error.message}` },
        { status: 500 },
      );
    }

    const routePath = await getRoutePathForTrackedPage(trackedPageId);
    if (routePath && (body.status === "active" || !body.status)) {
      try {
        revalidatePath(routePath);
      } catch (cacheErr) {
        console.warn("[tracked-pages blocks POST] revalidate failed (non-fatal):", cacheErr);
      }
    }
    return NextResponse.json({ ok: true, block: data });
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

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  ContentEditorError,
  updateTrackedPageBlock,
  deleteTrackedPageBlock,
  getRoutePathForTrackedPage,
  type UpdateTrackedPageBlockInput,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; blockId: string }>;
}

/** PATCH /api/admin/tracked-pages/[id]/blocks/[blockId] — inline edit / status change. */
export async function PATCH(request: Request, ctx: RouteContext) {
  const { id: trackedPageId, blockId } = await ctx.params;
  if (!trackedPageId || !blockId) {
    return NextResponse.json(
      { ok: false, error: "tracked-page id and blockId are required." },
      { status: 400 },
    );
  }
  let patch: UpdateTrackedPageBlockInput;
  try {
    patch = (await request.json()) as UpdateTrackedPageBlockInput;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }
  if (!patch || typeof patch !== "object" || Object.keys(patch).length === 0) {
    return NextResponse.json(
      { ok: false, error: "Provide at least one field to update." },
      { status: 400 },
    );
  }

  try {
    const block = await updateTrackedPageBlock(blockId, patch);

    // Revalidate when the block is (or becomes) active so the live page picks
    // up content or copy changes immediately.
    if (block.status === "active" || patch.status === "active") {
      const routePath = await getRoutePathForTrackedPage(trackedPageId);
      if (routePath) {
        try {
          revalidatePath(routePath);
        } catch (cacheErr) {
          console.warn("[blocks PATCH] revalidate failed (non-fatal):", cacheErr);
        }
      }
    }

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

/** DELETE /api/admin/tracked-pages/[id]/blocks/[blockId] — hard-delete. */
export async function DELETE(_request: Request, ctx: RouteContext) {
  const { id: trackedPageId, blockId } = await ctx.params;
  if (!trackedPageId || !blockId) {
    return NextResponse.json(
      { ok: false, error: "tracked-page id and blockId are required." },
      { status: 400 },
    );
  }
  try {
    await deleteTrackedPageBlock(blockId);
    const routePath = await getRoutePathForTrackedPage(trackedPageId);
    if (routePath) {
      try {
        revalidatePath(routePath);
      } catch (cacheErr) {
        console.warn("[blocks DELETE] revalidate failed (non-fatal):", cacheErr);
      }
    }
    return NextResponse.json({ ok: true });
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

import { NextResponse } from "next/server";
import { deleteBrief, getBrief, SweetSeoError } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }
  try {
    const brief = await getBrief(id);
    if (!brief) {
      return NextResponse.json({ ok: false, error: "Brief not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, brief });
  } catch (err) {
    if (err instanceof SweetSeoError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to load brief." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }
  try {
    await deleteBrief(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof SweetSeoError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to delete brief." },
      { status: 500 },
    );
  }
}

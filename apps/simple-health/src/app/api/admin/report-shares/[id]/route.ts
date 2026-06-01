import { NextResponse } from "next/server";
import { handleReportSharePatch, handleReportShareDelete } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) return NextResponse.json({ error: "id is required." }, { status: 400 });
  return handleReportSharePatch(request, id);
}

export async function DELETE(_request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) return NextResponse.json({ error: "id is required." }, { status: 400 });
  return handleReportShareDelete(id);
}

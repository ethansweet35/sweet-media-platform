import { NextResponse } from "next/server";
import { handlePublish, pageContentErrorToResponse } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const result = await handlePublish(request);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return pageContentErrorToResponse(err);
  }
}

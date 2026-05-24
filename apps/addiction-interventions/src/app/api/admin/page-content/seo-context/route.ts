import { NextResponse } from "next/server";
import {
  handleGetSeoContext,
  pageContentErrorToResponse,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const routePath = url.searchParams.get("routePath");
    const result = await handleGetSeoContext(request, routePath);
    return NextResponse.json(result);
  } catch (err) {
    return pageContentErrorToResponse(err);
  }
}

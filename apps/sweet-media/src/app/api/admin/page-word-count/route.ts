import { NextResponse } from "next/server";
import { fetchLivePageWordCount } from "@sweetmedia/admin-core/server";

export async function POST(request: Request) {
  let body: { route_path?: string };
  try {
    body = (await request.json()) as { route_path?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const route_path = typeof body.route_path === "string" ? body.route_path.trim() : "";
  if (!route_path) {
    return NextResponse.json({ ok: false, error: "route_path is required." }, { status: 400 });
  }

  const result = await fetchLivePageWordCount(route_path);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true, words: result.words });
}

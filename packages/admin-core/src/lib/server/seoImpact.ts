import { NextResponse } from "next/server";
import type { ContentEntityType } from "../contentChangeLog";
import { fetchContentChangeLog } from "./contentChangeLogServer";
import {
  computeMetricDeltas,
  queryGscPagePeriodComparison,
  resolveGscAccessToken,
} from "./gscClient";

export async function handleSeoImpactGet(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const entity_type = searchParams.get("entity_type") as ContentEntityType | null;
  const entity_id = searchParams.get("entity_id")?.trim();
  const page_url = searchParams.get("page_url")?.trim();
  const days = Math.min(90, Math.max(7, parseInt(searchParams.get("days") ?? "28", 10)));

  if (entity_type !== "page" && entity_type !== "blog") {
    return NextResponse.json({ ok: false, error: "entity_type must be page or blog." }, { status: 400 });
  }
  if (!entity_id) {
    return NextResponse.json({ ok: false, error: "entity_id is required." }, { status: 400 });
  }
  if (!page_url) {
    return NextResponse.json({ ok: false, error: "page_url is required." }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  if (!siteUrl) {
    return NextResponse.json({ ok: false, error: "NEXT_PUBLIC_SITE_URL is not set." }, { status: 500 });
  }

  const changes = await fetchContentChangeLog(entity_type, entity_id, 15);

  const auth = await resolveGscAccessToken();
  if (!auth.accessToken) {
    return NextResponse.json({
      ok: true,
      changes,
      metrics: null,
      needs_oauth: true,
      period_days: days,
    });
  }

  const comparison = await queryGscPagePeriodComparison(
    auth.accessToken,
    siteUrl,
    page_url,
    days,
  );

  if (!comparison) {
    return NextResponse.json({
      ok: true,
      changes,
      metrics: null,
      needs_oauth: false,
      no_gsc_data: true,
      period_days: days,
    });
  }

  const deltas = computeMetricDeltas(comparison.current, comparison.previous);

  return NextResponse.json({
    ok: true,
    changes,
    metrics: {
      current: comparison.current,
      previous: comparison.previous,
      deltas,
      daily: comparison.daily,
    },
    needs_oauth: false,
    period_days: days,
  });
}

import { NextResponse } from "next/server";
import { refreshStaleAudits, SurferApiError } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Surfer audits + many sequential awaits — give Vercel enough time.
export const maxDuration = 300;

const DEFAULT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

async function run(maxAgeMs: number) {
  try {
    const summary = await refreshStaleAudits(maxAgeMs);
    return NextResponse.json({ ok: true, ...summary });
  } catch (err) {
    if (err instanceof SurferApiError) {
      return NextResponse.json(
        { ok: false, error: err.message, status: err.status },
        { status: err.status >= 400 && err.status < 600 ? err.status : 502 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Bulk refresh failed." },
      { status: 500 },
    );
  }
}

/**
 * Manual trigger from admin UI (no auth header — protected by being a
 * Next API route on the admin domain, same pattern as /api/admin/sync-pages).
 */
export async function POST(request: Request) {
  let maxAgeMs = DEFAULT_MAX_AGE_MS;
  try {
    const body = (await request.json()) as { max_age_ms?: number };
    if (typeof body?.max_age_ms === "number" && body.max_age_ms > 0) {
      maxAgeMs = body.max_age_ms;
    }
  } catch {
    // empty body is fine
  }
  return run(maxAgeMs);
}

/**
 * Vercel Cron entry. Vercel attaches `Authorization: Bearer ${CRON_SECRET}`
 * when the env var is set. Reject anything else.
 */
export async function GET(request: Request) {
  const cronSecret = (process.env.CRON_SECRET ?? "").trim();
  if (cronSecret) {
    const auth = request.headers.get("authorization") ?? "";
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }
  }
  // Weekly cron — refresh anything older than 7 days.
  return run(7 * 24 * 60 * 60 * 1000);
}

import { NextRequest, NextResponse } from "next/server";
import {
  normalizeSeoStrategyUrl,
  runSeoStrategyAnalysis,
  hostnameToSemrushDomain,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const maxDuration = 180;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 4;

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  let bucket = rateBuckets.get(ip);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateBuckets.set(ip, bucket);
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true };
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = checkRateLimit(ip);
  if (!limited.ok) {
    return NextResponse.json(
      {
        error: `Rate limit reached. You can run ${RATE_LIMIT_MAX} strategy reports per hour. Try again in ${Math.ceil(limited.retryAfterSec / 60)} minutes.`,
      },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  let body: { url?: string; competitors?: string[] };
  try {
    body = (await req.json()) as { url?: string; competitors?: string[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const normalized = normalizeSeoStrategyUrl(body.url ?? "");
  if (!normalized.ok) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  if (!process.env.OPENROUTER_API_KEY?.trim()) {
    return NextResponse.json(
      {
        error:
          "SEO Strategy is temporarily unavailable. OPENROUTER_API_KEY is required for the AI audit.",
      },
      { status: 503 },
    );
  }

  const competitorDomains = (body.competitors ?? [])
    .map((d) => hostnameToSemrushDomain(d))
    .filter(Boolean)
    .slice(0, 2);

  try {
    const result = await runSeoStrategyAnalysis(normalized.url, { competitorDomains });
    if (!result.report && result.aiError) {
      return NextResponse.json({ error: result.aiError, result }, { status: 502 });
    }
    return NextResponse.json({ result });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Strategy analysis failed." },
      { status: 500 },
    );
  }
}

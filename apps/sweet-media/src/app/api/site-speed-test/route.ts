import { NextRequest, NextResponse } from "next/server";
import {
  normalizeSpeedTestUrl,
  runSpeedTestAnalysis,
  type PsiStrategy,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const maxDuration = 120;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

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

function parseStrategy(value: unknown): PsiStrategy {
  return value === "desktop" ? "desktop" : "mobile";
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = checkRateLimit(ip);
  if (!limited.ok) {
    return NextResponse.json(
      {
        error: `Rate limit reached. You can run ${RATE_LIMIT_MAX} tests per hour. Try again in ${Math.ceil(limited.retryAfterSec / 60)} minutes.`,
      },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  let body: { url?: string; strategy?: string };
  try {
    body = (await req.json()) as { url?: string; strategy?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const normalized = normalizeSpeedTestUrl(body.url ?? "");
  if (!normalized.ok) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  if (!process.env.GOOGLE_PSI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Speed test is temporarily unavailable. Add GOOGLE_PSI_API_KEY to enable the PageSpeed API.",
      },
      { status: 503 },
    );
  }

  const strategy = parseStrategy(body.strategy);
  const result = await runSpeedTestAnalysis(normalized.url, strategy);

  if (result.error && result.metrics.performance === null) {
    const isQuota = /quota/i.test(result.error);
    return NextResponse.json(
      { error: result.error, result },
      { status: isQuota ? 503 : 502 },
    );
  }

  return NextResponse.json({ result });
}

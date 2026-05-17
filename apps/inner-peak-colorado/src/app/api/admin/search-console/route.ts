import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ─── Google auth helpers ──────────────────────────────────────────────────────

function base64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function encodeB64url(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const cleaned = pem
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binary = Uint8Array.from(atob(cleaned), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    binary.buffer as ArrayBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

/** Returns an access token using a Google service account JWT. */
async function getServiceAccountToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeB64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = encodeB64url(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const toSign = `${header}.${claim}`;
  const key = await importPrivateKey(privateKey);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(toSign));
  const jwt = `${toSign}.${base64url(sig)}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Service account token exchange failed (${tokenRes.status}): ${err}`);
  }

  const { access_token } = (await tokenRes.json()) as { access_token: string };
  return access_token;
}

/** Returns an access token using a stored OAuth refresh token. */
async function getOAuthAccessToken(refreshToken: string): Promise<string> {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET are not set.");
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`OAuth token refresh failed (${tokenRes.status}): ${err}`);
  }

  const { access_token } = (await tokenRes.json()) as { access_token: string };
  return access_token;
}

// ─── Site URL candidates ──────────────────────────────────────────────────────

function buildSiteCandidates(siteUrl: string): string[] {
  const candidates: string[] = [];
  if (!siteUrl) return candidates;

  const normalized = siteUrl.replace(/\/$/, "");
  candidates.push(`${normalized}/`);

  try {
    const host = new URL(siteUrl).hostname;
    const noWww = host.replace(/^www\./, "");
    candidates.push(`sc-domain:${noWww}`);
    if (!host.startsWith("www.")) candidates.push(`https://www.${host}/`);
  } catch {
    // not a valid URL
  }

  return [...new Set(candidates)];
}

// ─── In-memory cache (1-hour TTL per site) ────────────────────────────────────

type GscRow = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type CacheEntry = { data: GscRow[]; fetchedAt: number };
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 60 * 1000;

// ─── Core query ───────────────────────────────────────────────────────────────

async function queryGsc(accessToken: string, siteUrl: string, startDate: string, endDate: string): Promise<GscRow[] | null> {
  const candidates = buildSiteCandidates(siteUrl);
  for (const candidate of candidates) {
    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(candidate)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ["page"],
          rowLimit: 5000,
          dataState: "final",
        }),
      },
    );

    if (!res.ok) continue;

    const json = (await res.json()) as {
      rows?: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[];
    };

    return (json.rows ?? []).map((r) => ({
      page: r.keys[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    }));
  }
  return null;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (!rawSiteUrl) {
    return NextResponse.json({ error: "NEXT_PUBLIC_SITE_URL is not set." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const days = Math.min(90, Math.max(1, parseInt(searchParams.get("days") ?? "28", 10)));

  const cacheKey = `${rawSiteUrl}:${days}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({ rows: cached.data, cached: true });
  }

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  // ── 1. Try OAuth refresh token from system_settings ────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    try {
      const admin = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { data } = await admin
        .from("system_settings")
        .select("value")
        .eq("key", "google_search_console_refresh_token")
        .maybeSingle();

      const refreshToken = typeof data?.value === "string" ? data.value : null;

      if (refreshToken) {
        const accessToken = await getOAuthAccessToken(refreshToken);
        const rows = await queryGsc(accessToken, rawSiteUrl, fmt(startDate), fmt(endDate));

        if (rows !== null) {
          cache.set(cacheKey, { data: rows, fetchedAt: Date.now() });
          return NextResponse.json({ rows, auth_method: "oauth" });
        }

        return NextResponse.json(
          {
            error: "Search Console returned an error for all site URL variants.",
            needs_oauth: false,
            auth_method: "oauth",
          },
          { status: 502 },
        );
      }
    } catch (err) {
      // OAuth token may be expired/revoked — fall through to service account
      console.error("GSC OAuth attempt failed:", err);
    }
  }

  // ── 2. Fall back to service account ───────────────────────────────────────
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY;

  if (clientEmail && privateKey) {
    try {
      const accessToken = await getServiceAccountToken(clientEmail, privateKey);
      const rows = await queryGsc(accessToken, rawSiteUrl, fmt(startDate), fmt(endDate));

      if (rows !== null) {
        cache.set(cacheKey, { data: rows, fetchedAt: Date.now() });
        return NextResponse.json({ rows, auth_method: "service_account" });
      }
    } catch (err) {
      console.error("GSC service account attempt failed:", err);
    }
  }

  // ── 3. No auth configured ─────────────────────────────────────────────────
  return NextResponse.json({ rows: [], needs_oauth: true }, { status: 200 });
}

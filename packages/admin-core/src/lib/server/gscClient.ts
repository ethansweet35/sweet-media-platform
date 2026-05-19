/**
 * Server-only Google Search Console API client.
 *
 * Handles both auth paths used across all client apps:
 *   1. OAuth refresh token stored in `system_settings` (preferred — full read access)
 *   2. Service account fallback via GOOGLE_INDEXING_CLIENT_EMAIL / GOOGLE_INDEXING_PRIVATE_KEY
 *
 * Never import this from a client component — credentials stay server-side.
 */

import { createClient } from "@supabase/supabase-js";

// ─── Auth helpers ─────────────────────────────────────────────────────────────

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

// ─── URL helpers ─────────────────────────────────────────────────────────────

/**
 * Build www / non-www variants of a page URL so we can try both when filtering.
 * GSC may store pages under either form depending on the verified property type.
 */
export function buildPageUrlVariants(pageUrl: string): string[] {
  const variants = new Set<string>([pageUrl]);
  try {
    const u = new URL(pageUrl);
    if (u.hostname.startsWith("www.")) {
      variants.add(`${u.protocol}//${u.hostname.slice(4)}${u.pathname}${u.search}${u.hash}`);
    } else {
      variants.add(`${u.protocol}//www.${u.hostname}${u.pathname}${u.search}${u.hash}`);
    }
  } catch {
    // not a valid URL — return as-is
  }
  return Array.from(variants);
}

// ─── Site URL resolution ──────────────────────────────────────────────────────

export function buildSiteCandidates(siteUrl: string): string[] {
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

// ─── Access token resolution ──────────────────────────────────────────────────

export type GscAuthResult =
  | { accessToken: string; method: "oauth" | "service_account" }
  | { accessToken: null; needsOAuth: true };

/**
 * Resolve a Google access token using the same priority order as all app routes:
 *   1. OAuth refresh token from `system_settings`
 *   2. Service account from env vars
 *   3. Returns `{ needsOAuth: true }` when neither is configured.
 */
export async function resolveGscAccessToken(): Promise<GscAuthResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // 1. Try OAuth refresh token
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
        return { accessToken, method: "oauth" };
      }
    } catch {
      // fall through to service account
    }
  }

  // 2. Fall back to service account
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY;

  if (clientEmail && privateKey) {
    try {
      const accessToken = await getServiceAccountToken(clientEmail, privateKey);
      return { accessToken, method: "service_account" };
    } catch {
      // fall through
    }
  }

  return { accessToken: null, needsOAuth: true };
}

// ─── Query types ──────────────────────────────────────────────────────────────

export interface GscPageRow {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

// ─── Core queries ─────────────────────────────────────────────────────────────

/**
 * Fetch page-level aggregates (existing main use-case: pages table GSC column).
 * Dimensions: ["page"]
 */
export async function queryGscByPage(
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string,
  rowLimit = 5000,
): Promise<GscPageRow[] | null> {
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
          rowLimit,
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

/**
 * Fetch all queries (keywords) a specific page is receiving impressions for.
 * Dimensions: ["query"], filtered by exact page URL.
 *
 * Tries every combination of site property candidate × page URL variant
 * (www / non-www) so results are found regardless of how the property is
 * verified in Search Console or which canonical the site uses.
 *
 * @param accessToken  Google access token
 * @param siteUrl      Verified site URL (e.g. "https://example.com")
 * @param pageUrl      Full URL of the page to look up (e.g. "https://example.com/about")
 * @param startDate    ISO date string (YYYY-MM-DD)
 * @param endDate      ISO date string (YYYY-MM-DD)
 * @param rowLimit     Max rows to return (default 1000, max 25000)
 */
export async function queryGscPageKeywords(
  accessToken: string,
  siteUrl: string,
  pageUrl: string,
  startDate: string,
  endDate: string,
  rowLimit = 1000,
): Promise<GscQueryRow[] | null> {
  const siteCandidates = buildSiteCandidates(siteUrl);
  const pageVariants = buildPageUrlVariants(pageUrl);

  let anySucceeded = false;

  for (const candidate of siteCandidates) {
    for (const page of pageVariants) {
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
            dimensions: ["query"],
            dimensionFilterGroups: [
              {
                filters: [
                  {
                    dimension: "page",
                    operator: "equals",
                    expression: page,
                  },
                ],
              },
            ],
            rowLimit,
            dataState: "final",
          }),
        },
      );

      if (!res.ok) continue;
      anySucceeded = true;

      const json = (await res.json()) as {
        rows?: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[];
      };

      const rows = (json.rows ?? []).map((r) => ({
        query: r.keys[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      }));

      // Return first combination that yields actual rows.
      // If a candidate+variant pair responded 200 but had 0 rows,
      // keep trying — another URL variant may hold the data.
      if (rows.length > 0) return rows;
    }
  }

  // Distinguish "API responded but page has no data" from "every request failed".
  return anySucceeded ? [] : null;
}

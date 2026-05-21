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
  | { accessToken: string; method: "oauth" | "service_account"; connectedEmail?: string | null }
  | { accessToken: null; needsOAuth: true; connectedEmail?: string | null };

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
      const { data: rows } = await admin
        .from("system_settings")
        .select("key, value")
        .in("key", [
          "google_search_console_refresh_token",
          "google_search_console_connected_email",
        ]);

      const settings = new Map(
        (rows ?? []).map((r) => [r.key as string, r.value]),
      );
      const refreshToken =
        typeof settings.get("google_search_console_refresh_token") === "string"
          ? (settings.get("google_search_console_refresh_token") as string)
          : null;
      const connectedEmail =
        typeof settings.get("google_search_console_connected_email") === "string"
          ? (settings.get("google_search_console_connected_email") as string)
          : null;

      if (refreshToken) {
        const accessToken = await getOAuthAccessToken(refreshToken);
        return { accessToken, method: "oauth", connectedEmail };
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
 *
 * Two-step approach to guarantee URL accuracy:
 *
 *   Step 1 — Discover canonical URL:
 *     Fetch all pages from GSC (same call the existing working route makes).
 *     Find which exact URL in the response matches our target page
 *     (handles www/non-www, trailing slash, and any other URL variation).
 *
 *   Step 2 — Query keywords:
 *     Filter by that exact canonical URL to get the queries for that page.
 *
 * This mirrors what the working page-level route does and is therefore
 * guaranteed to use the same URL format GSC actually stores.
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

  // Extract just the pathname for loose matching (resilient to scheme/host differences).
  let targetPath: string;
  try {
    targetPath = new URL(pageUrl).pathname.replace(/\/$/, "").toLowerCase();
  } catch {
    targetPath = pageUrl.toLowerCase();
  }

  // ── Step 1: Find the working site candidate + exact canonical URL ───────────
  let workingCandidate: string | null = null;
  let canonicalUrl: string | null = null;

  for (const candidate of siteCandidates) {
    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(candidate)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ["page"],
          rowLimit: 25000,
          dataState: "final",
        }),
      },
    );

    if (!res.ok) continue;

    const json = (await res.json()) as {
      rows?: { keys: string[] }[];
    };
    const pages = (json.rows ?? []).map((r) => r.keys[0] ?? "");

    // Priority 1: exact match against known URL variants
    for (const variant of pageVariants) {
      const exact = pages.find((p) => p === variant || p === `${variant}/`);
      if (exact) { canonicalUrl = exact; workingCandidate = candidate; break; }
    }

    // Priority 2: pathname-only match (handles any scheme/host difference)
    if (!canonicalUrl) {
      const byPath = pages.find((p) => {
        try {
          return new URL(p).pathname.replace(/\/$/, "").toLowerCase() === targetPath;
        } catch { return false; }
      });
      if (byPath) { canonicalUrl = byPath; workingCandidate = candidate; }
    }

    if (canonicalUrl) break;
  }

  // Page has no impressions in GSC at all.
  if (!canonicalUrl || !workingCandidate) return [];

  // ── Step 2: Query keywords using the exact canonical URL ────────────────────
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(workingCandidate)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["query"],
        dimensionFilterGroups: [
          { filters: [{ dimension: "page", operator: "equals", expression: canonicalUrl }] },
        ],
        rowLimit,
        dataState: "final",
      }),
    },
  );

  if (!res.ok) return null;

  const json = (await res.json()) as {
    rows?: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[];
  };

  return (json.rows ?? []).map((r) => ({
    query: r.keys[0] ?? "",
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));
}

export type GscPageResolved = {
  workingCandidate: string;
  canonicalUrl: string;
};

/** Resolve the exact page URL string GSC stores for a marketing URL. */
export async function resolveCanonicalGscPageUrl(
  accessToken: string,
  siteUrl: string,
  pageUrl: string,
  startDate: string,
  endDate: string,
): Promise<GscPageResolved | null> {
  const siteCandidates = buildSiteCandidates(siteUrl);
  const pageVariants = buildPageUrlVariants(pageUrl);

  let targetPath: string;
  try {
    targetPath = new URL(pageUrl).pathname.replace(/\/$/, "").toLowerCase();
  } catch {
    targetPath = pageUrl.toLowerCase();
  }

  for (const candidate of siteCandidates) {
    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(candidate)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ["page"],
          rowLimit: 25000,
          dataState: "final",
        }),
      },
    );

    if (!res.ok) continue;

    const json = (await res.json()) as { rows?: { keys: string[] }[] };
    const pages = (json.rows ?? []).map((r) => r.keys[0] ?? "");

    for (const variant of pageVariants) {
      const exact = pages.find((p) => p === variant || p === `${variant}/`);
      if (exact) return { workingCandidate: candidate, canonicalUrl: exact };
    }

    const byPath = pages.find((p) => {
      try {
        return new URL(p).pathname.replace(/\/$/, "").toLowerCase() === targetPath;
      } catch {
        return false;
      }
    });
    if (byPath) return { workingCandidate: candidate, canonicalUrl: byPath };
  }

  return null;
}

export type GscPeriodMetrics = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  startDate: string;
  endDate: string;
};

export type GscDailyMetric = {
  date: string;
  clicks: number;
  impressions: number;
  position: number;
};

async function queryGscPageAggregate(
  accessToken: string,
  resolved: GscPageResolved,
  startDate: string,
  endDate: string,
): Promise<GscPeriodMetrics | null> {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(resolved.workingCandidate)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["page"],
        dimensionFilterGroups: [
          { filters: [{ dimension: "page", operator: "equals", expression: resolved.canonicalUrl }] },
        ],
        rowLimit: 1,
        dataState: "final",
      }),
    },
  );

  if (!res.ok) return null;
  const json = (await res.json()) as {
    rows?: { clicks: number; impressions: number; ctr: number; position: number }[];
  };
  const row = json.rows?.[0];
  if (!row) {
    return { clicks: 0, impressions: 0, ctr: 0, position: 0, startDate, endDate };
  }
  return {
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
    startDate,
    endDate,
  };
}

/** Compare current vs previous period totals for one page URL. */
export async function queryGscPagePeriodComparison(
  accessToken: string,
  siteUrl: string,
  pageUrl: string,
  periodDays = 28,
): Promise<{
  current: GscPeriodMetrics;
  previous: GscPeriodMetrics;
  daily: GscDailyMetric[];
} | null> {
  const end = new Date();
  end.setDate(end.getDate() - 3);
  const currentStart = new Date(end);
  currentStart.setDate(currentStart.getDate() - periodDays + 1);
  const previousEnd = new Date(currentStart);
  previousEnd.setDate(previousEnd.getDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setDate(previousStart.getDate() - periodDays + 1);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const curStart = fmt(currentStart);
  const curEnd = fmt(end);
  const prevStart = fmt(previousStart);
  const prevEnd = fmt(previousEnd);

  const resolved = await resolveCanonicalGscPageUrl(
    accessToken,
    siteUrl,
    pageUrl,
    prevStart,
    curEnd,
  );
  if (!resolved) return null;

  const [current, previous, daily] = await Promise.all([
    queryGscPageAggregate(accessToken, resolved, curStart, curEnd),
    queryGscPageAggregate(accessToken, resolved, prevStart, prevEnd),
    queryGscPageDailySeries(accessToken, resolved, curStart, curEnd),
  ]);

  if (!current || !previous) return null;
  return { current, previous, daily };
}

async function queryGscPageDailySeries(
  accessToken: string,
  resolved: GscPageResolved,
  startDate: string,
  endDate: string,
): Promise<GscDailyMetric[]> {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(resolved.workingCandidate)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["date"],
        dimensionFilterGroups: [
          { filters: [{ dimension: "page", operator: "equals", expression: resolved.canonicalUrl }] },
        ],
        rowLimit: 1000,
        dataState: "final",
      }),
    },
  );

  if (!res.ok) return [];
  const json = (await res.json()) as {
    rows?: { keys: string[]; clicks: number; impressions: number; position: number }[];
  };
  return (json.rows ?? [])
    .map((r) => ({
      date: r.keys[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions,
      position: r.position,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// ─── Site-wide analytics (dashboard Performance tab) ───────────────────────────

/** GSC reporting lag: end date is today minus 3 days; current/previous windows are equal length. */
export function gscComparisonDateRanges(periodDays: number): {
  curStart: string;
  curEnd: string;
  prevStart: string;
  prevEnd: string;
} {
  const end = new Date();
  end.setDate(end.getDate() - 3);
  const currentStart = new Date(end);
  currentStart.setDate(currentStart.getDate() - periodDays + 1);
  const previousEnd = new Date(currentStart);
  previousEnd.setDate(previousEnd.getDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setDate(previousStart.getDate() - periodDays + 1);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return {
    curStart: fmt(currentStart),
    curEnd: fmt(end),
    prevStart: fmt(previousStart),
    prevEnd: fmt(previousEnd),
  };
}

async function resolveWorkingGscSiteCandidate(
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string,
): Promise<string | null> {
  const candidates = buildSiteCandidates(siteUrl);
  for (const candidate of candidates) {
    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(candidate)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: [],
          rowLimit: 1,
          dataState: "final",
        }),
      },
    );
    if (res.ok) return candidate;
  }
  return null;
}

/** Site-wide daily clicks/impressions (no page filter). */
export async function queryGscSiteDailySeries(
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string,
): Promise<GscDailyMetric[]> {
  const candidate = await resolveWorkingGscSiteCandidate(accessToken, siteUrl, startDate, endDate);
  if (!candidate) return [];

  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(candidate)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["date"],
        rowLimit: 1000,
        dataState: "final",
      }),
    },
  );

  if (!res.ok) return [];
  const json = (await res.json()) as {
    rows?: { keys: string[]; clicks: number; impressions: number; position: number }[];
  };
  return (json.rows ?? [])
    .map((r) => ({
      date: r.keys[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions,
      position: r.position,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Site-wide totals for a date range (no dimensions). */
export async function queryGscSiteTotals(
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string,
): Promise<GscPeriodMetrics | null> {
  const candidate = await resolveWorkingGscSiteCandidate(accessToken, siteUrl, startDate, endDate);
  if (!candidate) return null;

  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(candidate)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: [],
        rowLimit: 1,
        dataState: "final",
      }),
    },
  );

  if (!res.ok) return null;
  const json = (await res.json()) as {
    rows?: { clicks: number; impressions: number; ctr: number; position: number }[];
  };
  const row = json.rows?.[0];
  if (!row) {
    return { clicks: 0, impressions: 0, ctr: 0, position: 0, startDate, endDate };
  }
  return {
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
    startDate,
    endDate,
  };
}

/** All search queries for the property in a date range. */
export async function queryGscByQuery(
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string,
  rowLimit = 5000,
): Promise<GscQueryRow[] | null> {
  const candidates = buildSiteCandidates(siteUrl);

  for (const candidate of candidates) {
    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(candidate)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ["query"],
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
      query: r.keys[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    }));
  }

  return null;
}

export function computeMetricDeltas(
  current: GscPeriodMetrics,
  previous: GscPeriodMetrics,
): {
  clicks: number;
  clicksPct: number | null;
  impressions: number;
  impressionsPct: number | null;
  position: number;
  positionDelta: number;
} {
  const pct = (cur: number, prev: number) => {
    if (prev === 0) return cur > 0 ? 100 : null;
    return Math.round(((cur - prev) / prev) * 1000) / 10;
  };
  return {
    clicks: current.clicks - previous.clicks,
    clicksPct: pct(current.clicks, previous.clicks),
    impressions: current.impressions - previous.impressions,
    impressionsPct: pct(current.impressions, previous.impressions),
    position: current.position,
    positionDelta: Math.round((current.position - previous.position) * 10) / 10,
  };
}

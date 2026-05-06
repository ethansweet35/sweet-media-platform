/**
 * inspect-google-indexing
 *
 * Checks Google indexing status for a URL by combining:
 *  - URL Inspection API (current index status / last crawl)
 *  - Indexing API metadata (last submitted URL_UPDATED timestamp)
 *
 * Requires edge function secrets:
 *   GOOGLE_INDEXING_CLIENT_EMAIL
 *   GOOGLE_INDEXING_PRIVATE_KEY
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binary = Uint8Array.from(atob(cleaned), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    binary.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function getGoogleAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeB64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = encodeB64url(
    JSON.stringify({
      iss: clientEmail,
      scope: [
        "https://www.googleapis.com/auth/indexing",
        "https://www.googleapis.com/auth/webmasters",
      ].join(" "),
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );

  const toSign = `${header}.${claim}`;
  const key = await importPrivateKey(privateKey);
  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(toSign),
  );
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
    throw new Error(`Google token exchange failed (${tokenRes.status}): ${err}`);
  }

  const { access_token } = (await tokenRes.json()) as { access_token: string };
  return access_token;
}

function isCurrentlyIndexed(coverageState: string, verdict: string): boolean {
  const s = coverageState.toLowerCase();
  if (s.includes("indexed") && !s.includes("not indexed")) return true;
  return verdict.toUpperCase() === "PASS";
}

function isRecent(timestamp: string | null, days = 7): boolean {
  if (!timestamp) return false;
  const t = Date.parse(timestamp);
  if (Number.isNaN(t)) return false;
  return Date.now() - t <= days * 24 * 60 * 60 * 1000;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const clientEmail = Deno.env.get("GOOGLE_INDEXING_CLIENT_EMAIL");
  const privateKey = Deno.env.get("GOOGLE_INDEXING_PRIVATE_KEY");
  if (!clientEmail || !privateKey) {
    return new Response(
      JSON.stringify({ error: "Missing GOOGLE_INDEXING_CLIENT_EMAIL or GOOGLE_INDEXING_PRIVATE_KEY" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  let url = "";
  let siteUrl = "";
  try {
    const body = (await req.json()) as { url?: string; siteUrl?: string };
    url = body.url?.trim() ?? "";
    siteUrl = body.siteUrl?.trim() ?? "";
    if (!url || !siteUrl) throw new Error("url and siteUrl are required");
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

    const [metadataRes, inspectRes] = await Promise.all([
      fetch(`https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(url)}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inspectionUrl: url,
          siteUrl,
        }),
      }),
    ]);

    const metadataJson = metadataRes.ok ? await metadataRes.json() : null;
    const inspectJson = await inspectRes.json();
    if (!inspectRes.ok) {
      return new Response(JSON.stringify({ error: inspectJson }), {
        status: inspectRes.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const indexStatus = inspectJson?.inspectionResult?.indexStatusResult ?? {};
    const verdict = String(indexStatus?.verdict ?? "");
    const coverageState = String(indexStatus?.coverageState ?? "");
    const indexingState = String(indexStatus?.indexingState ?? "");
    const robotsTxtState = String(indexStatus?.robotsTxtState ?? "");
    const pageFetchState = String(indexStatus?.pageFetchState ?? "");
    const lastCrawlTime = indexStatus?.lastCrawlTime ?? null;

    const latestUpdate = metadataJson?.latestUpdate?.notifyTime ?? null;
    const latestRemove = metadataJson?.latestRemove?.notifyTime ?? null;

    const currentlyIndexed = isCurrentlyIndexed(coverageState, verdict);
    const recentlyIndexed = isRecent(lastCrawlTime, 7);

    return new Response(
      JSON.stringify({
        success: true,
        url,
        siteUrl,
        checkedAt: new Date().toISOString(),
        currentlyIndexed,
        recentlyIndexed,
        lastCrawlTime,
        latestUpdateNotification: latestUpdate,
        latestRemoveNotification: latestRemove,
        indexStatus: {
          verdict,
          coverageState,
          indexingState,
          robotsTxtState,
          pageFetchState,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

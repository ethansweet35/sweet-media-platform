/**
 * ping-google-indexing
 *
 * Notifies the Google Indexing API that a URL has been updated.
 * Requires two edge function secrets:
 *   GOOGLE_INDEXING_CLIENT_EMAIL  — service account email
 *   GOOGLE_INDEXING_PRIVATE_KEY   — RSA private key (PEM)
 *
 * POST body: { "url": "https://innerpeakcolorado.com/blog/my-post" }
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Google JWT / OAuth helpers ───────────────────────────────────────────────

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
    ["sign"]
  );
}

async function getGoogleAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeB64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = encodeB64url(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));

  const toSign = `${header}.${claim}`;
  const key = await importPrivateKey(privateKey);
  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(toSign)
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

  const { access_token } = await tokenRes.json() as { access_token: string };
  return access_token;
}

async function pingIndexingApi(accessToken: string, url: string): Promise<void> {
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Indexing API error (${res.status}): ${err}`);
  }
}

// ── Handler ──────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const clientEmail = Deno.env.get("GOOGLE_INDEXING_CLIENT_EMAIL");
  const privateKey  = Deno.env.get("GOOGLE_INDEXING_PRIVATE_KEY");

  if (!clientEmail || !privateKey) {
    console.error("[ping-google-indexing] Missing credentials");
    return new Response(
      JSON.stringify({ error: "GOOGLE_INDEXING_CLIENT_EMAIL or GOOGLE_INDEXING_PRIVATE_KEY not set" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let url: string;
  try {
    const body = await req.json() as { url?: string };
    url = body.url?.trim() ?? "";
    if (!url) throw new Error("url is required");
  } catch (e) {
    return new Response(
      JSON.stringify({ error: String(e) }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    console.log("[ping-google-indexing] Pinging:", url);
    const token = await getGoogleAccessToken(clientEmail, privateKey);
    await pingIndexingApi(token, url);
    console.log("[ping-google-indexing] Success:", url);
    return new Response(
      JSON.stringify({ success: true, url }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[ping-google-indexing] Error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

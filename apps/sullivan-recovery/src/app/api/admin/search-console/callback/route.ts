import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const adminUrl = `${siteUrl}/admin/search-console`;

  // User denied access
  if (error) {
    return NextResponse.redirect(`${adminUrl}?gsc_error=${encodeURIComponent(error)}`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${adminUrl}?gsc_error=missing_params`);
  }

  // Validate CSRF nonce
  const cookieStore = await cookies();
  const savedNonce = cookieStore.get("gsc_oauth_state")?.value;
  if (!savedNonce || savedNonce !== state) {
    return NextResponse.redirect(`${adminUrl}?gsc_error=invalid_state`);
  }
  cookieStore.delete("gsc_oauth_state");

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!clientId || !clientSecret || !supabaseUrl || !serviceKey) {
    return NextResponse.redirect(`${adminUrl}?gsc_error=missing_env`);
  }

  const redirectUri = `${siteUrl}/api/admin/search-console/callback`;

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("GSC token exchange error:", err);
      return NextResponse.redirect(`${adminUrl}?gsc_error=token_exchange_failed`);
    }

    const tokens = (await tokenRes.json()) as {
      access_token: string;
      refresh_token?: string;
      scope: string;
    };

    if (!tokens.refresh_token) {
      // Can happen if the user already granted access and prompt=consent wasn't honoured
      return NextResponse.redirect(`${adminUrl}?gsc_error=no_refresh_token`);
    }

    // Fetch the connected Google account email
    let connectedEmail = "";
    try {
      const userRes = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      if (userRes.ok) {
        const userInfo = (await userRes.json()) as { email?: string };
        connectedEmail = userInfo.email ?? "";
      }
    } catch {
      // non-fatal
    }

    // Persist to system_settings via service role (bypasses RLS)
    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const settings = [
      { key: "google_search_console_refresh_token", value: tokens.refresh_token },
      { key: "google_search_console_connected_email", value: connectedEmail },
    ];

    for (const setting of settings) {
      await admin.from("system_settings").upsert(setting, { onConflict: "key" });
    }

    return NextResponse.redirect(`${adminUrl}?gsc_connected=1`);
  } catch (err) {
    console.error("GSC OAuth callback error:", err);
    return NextResponse.redirect(`${adminUrl}?gsc_error=unexpected`);
  }
}

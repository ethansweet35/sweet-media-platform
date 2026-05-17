import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";

export async function GET() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!clientId || !siteUrl) {
    return NextResponse.json(
      { error: "GOOGLE_OAUTH_CLIENT_ID and NEXT_PUBLIC_SITE_URL must be set." },
      { status: 500 },
    );
  }

  // CSRF: store a random nonce in a short-lived httpOnly cookie
  const nonce = randomBytes(16).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set("gsc_oauth_state", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 min
    path: "/",
  });

  const redirectUri = `${siteUrl.replace(/\/$/, "")}/api/admin/search-console/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/userinfo.email",
    access_type: "offline",
    prompt: "consent",
    state: nonce,
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
  );
}

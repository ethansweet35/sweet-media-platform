/**
 * Server handler for POST /api/admin/forgot-password
 * Uses service role so admin_users lookup works without a session.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { type PageContentEditorError } from "./pageContentEditor";

function getServiceRoleClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw {
      status: 500,
      message:
        "Supabase server config missing (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).",
    } satisfies PageContentEditorError;
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function normalizeEmail(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    throw { status: 400, message: "A valid email is required." } satisfies PageContentEditorError;
  }
  const email = value.trim().toLowerCase();
  if (!email.includes("@")) {
    throw { status: 400, message: "A valid email is required." } satisfies PageContentEditorError;
  }
  return email;
}

function getSiteOrigin(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!siteUrl) {
    throw {
      status: 500,
      message: "NEXT_PUBLIC_SITE_URL is not configured for this app.",
    } satisfies PageContentEditorError;
  }
  return siteUrl.replace(/\/+$/, "");
}

export async function handleAdminForgotPasswordPost(
  request: Request,
): Promise<{ ok: true }> {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    throw { status: 400, message: "Invalid request body." } satisfies PageContentEditorError;
  }

  const email = normalizeEmail(body.email);
  const admin = getServiceRoleClient();

  const { data: adminRow, error: adminErr } = await admin
    .from("admin_users")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  if (adminErr) {
    throw {
      status: 500,
      message: `Could not verify admin user: ${adminErr.message}`,
    } satisfies PageContentEditorError;
  }

  // Always return success to avoid email enumeration.
  if (!adminRow) {
    return { ok: true };
  }

  const redirectTo = `${getSiteOrigin()}/admin/reset-password`;
  const { error } = await admin.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) {
    throw {
      status: 500,
      message: error.message,
    } satisfies PageContentEditorError;
  }

  return { ok: true };
}

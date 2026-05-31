/**
 * Server handler for POST /api/admin/forgot-password
 * Uses service role so admin_users lookup works without a session.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getAdminResetPasswordUrl } from "../adminResetPasswordUrl";
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

function friendlyAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("rate limit") || lower.includes("over_email_send_rate_limit")) {
    return "Too many reset emails were sent recently. Please wait about an hour and try again, or contact your site administrator.";
  }
  return message;
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

  const redirectTo = getAdminResetPasswordUrl();
  const { error } = await admin.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) {
    throw {
      status: 429,
      message: friendlyAuthError(error.message),
    } satisfies PageContentEditorError;
  }

  return { ok: true };
}

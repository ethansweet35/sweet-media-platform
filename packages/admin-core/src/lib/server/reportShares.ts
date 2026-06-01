/**
 * Server-only CRUD for report_shares — the tokenized public client report links.
 *
 * These routes must run authenticated as an admin. The caller (app API route)
 * is responsible for verifying the admin session; we additionally use the
 * service role here so writes succeed under RLS.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ReportShareRow } from "../../types/marketing";

function adminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** URL-safe random token. */
function generateToken(): string {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  let s = "";
  for (const b of bytes) s += b.toString(16).padStart(2, "0");
  return s;
}

const SHARE_COLUMNS =
  "id, token, label, period_days, is_active, created_by, last_viewed_at, view_count, created_at, updated_at";

export async function listReportShares(): Promise<ReportShareRow[]> {
  const admin = adminClient();
  if (!admin) return [];
  const { data, error } = await admin
    .from("report_shares")
    .select(SHARE_COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ReportShareRow[];
}

export async function createReportShare(input: {
  label?: string;
  period_days?: number;
  created_by?: string | null;
}): Promise<ReportShareRow> {
  const admin = adminClient();
  if (!admin) throw new Error("Supabase service role not configured");
  const row = {
    token: generateToken(),
    label: input.label?.trim() || "Client report",
    period_days: Math.min(90, Math.max(7, input.period_days ?? 28)),
    created_by: input.created_by ?? null,
  };
  const { data, error } = await admin.from("report_shares").insert(row).select(SHARE_COLUMNS).single();
  if (error) throw new Error(error.message);
  return data as ReportShareRow;
}

export async function updateReportShare(
  id: string,
  patch: { label?: string; period_days?: number; is_active?: boolean },
): Promise<ReportShareRow> {
  const admin = adminClient();
  if (!admin) throw new Error("Supabase service role not configured");
  const update: Record<string, unknown> = {};
  if (typeof patch.label === "string") update.label = patch.label.trim() || "Client report";
  if (typeof patch.period_days === "number")
    update.period_days = Math.min(90, Math.max(7, patch.period_days));
  if (typeof patch.is_active === "boolean") update.is_active = patch.is_active;

  const { data, error } = await admin
    .from("report_shares")
    .update(update)
    .eq("id", id)
    .select(SHARE_COLUMNS)
    .single();
  if (error) throw new Error(error.message);
  return data as ReportShareRow;
}

export async function deleteReportShare(id: string): Promise<void> {
  const admin = adminClient();
  if (!admin) throw new Error("Supabase service role not configured");
  const { error } = await admin.from("report_shares").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Route handlers ───────────────────────────────────────────────────────────

export async function handleReportSharesGet(): Promise<Response> {
  try {
    const shares = await listReportShares();
    return Response.json({ shares });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function handleReportSharesPost(request: Request): Promise<Response> {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      label?: string;
      period_days?: number;
      created_by?: string | null;
    };
    const share = await createReportShare(body);
    return Response.json({ share }, { status: 201 });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function handleReportSharePatch(request: Request, id: string): Promise<Response> {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      label?: string;
      period_days?: number;
      is_active?: boolean;
    };
    const share = await updateReportShare(id, body);
    return Response.json({ share });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function handleReportShareDelete(id: string): Promise<Response> {
  try {
    await deleteReportShare(id);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

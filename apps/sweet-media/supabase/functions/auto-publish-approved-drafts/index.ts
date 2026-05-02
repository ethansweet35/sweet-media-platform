import { assert } from "https://deno.land/std@0.224.0/assert/assert.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** True when jsonb `value` is JSON `false` (auto-publish disabled). */
function isAutoPublishDisabled(value: unknown): boolean {
  return value === false;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    console.log(`[auto-publish-approved-drafts] Rejected method ${req.method}`);
    return jsonResponse({ error: "method_not_allowed", detail: "Use POST" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  try {
    assert(supabaseUrl, "SUPABASE_URL must be set");
    assert(serviceRoleKey, "SUPABASE_SERVICE_ROLE_KEY must be set");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[auto-publish-approved-drafts] Missing env:", msg);
    return jsonResponse({ error: "server_misconfigured", detail: msg }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // --- Kill switch: system_settings.key = 'auto_publish_enabled' ---
  const { data: settingRow, error: settingErr } = await supabase
    .from("system_settings")
    .select("value")
    .eq("key", "auto_publish_enabled")
    .maybeSingle();

  if (settingErr) {
    console.error("[auto-publish-approved-drafts] system_settings query failed:", settingErr);
    return jsonResponse(
      { error: "settings_query_failed", detail: settingErr.message },
      500,
    );
  }

  if (settingRow !== null && isAutoPublishDisabled(settingRow.value)) {
    console.log("[auto-publish-approved-drafts] Auto-publish is disabled, exiting");
    return jsonResponse({ skipped: true, reason: "auto_publish_disabled" }, 200);
  }

  if (settingRow === null) {
    console.log("[auto-publish-approved-drafts] No auto_publish_enabled row — default on, continuing");
  }

  const nowIso = new Date().toISOString();

  const { data: drafts, error: draftsErr } = await supabase
    .from("blog_posts")
    .select("id, title, slug")
    .eq("status", "draft")
    .eq("approved_for_publish", true)
    .lte("scheduled_publish_at", nowIso);

  if (draftsErr) {
    console.error("[auto-publish-approved-drafts] blog_posts query failed:", draftsErr);
    return jsonResponse(
      { error: "drafts_query_failed", detail: draftsErr.message },
      500,
    );
  }

  const rows = (drafts ?? []) as { id: string; title: string; slug: string }[];
  console.log(`[auto-publish-approved-drafts] Found ${rows.length} draft(s) ready to publish`);

  const posts: Array<{
    id: string;
    title: string;
    slug: string;
    success: boolean;
    error?: string;
  }> = [];

  let succeeded = 0;
  let failed = 0;

  for (const row of rows) {
    const { error: updErr } = await supabase
      .from("blog_posts")
      .update({
        status: "published",
        published_at: nowIso,
        updated_at: nowIso,
      })
      .eq("id", row.id);

    if (updErr) {
      failed++;
      const errMsg = updErr.message ?? String(updErr);
      console.error(
        `[auto-publish-approved-drafts] Update failed id=${row.id} slug=${row.slug}:`,
        errMsg,
      );
      posts.push({
        id: row.id,
        title: row.title,
        slug: row.slug,
        success: false,
        error: errMsg.slice(0, 2000),
      });
    } else {
      succeeded++;
      console.log(
        `[auto-publish-approved-drafts] Published id=${row.id} slug=${row.slug} title=${JSON.stringify(row.title).slice(0, 120)}`,
      );
      posts.push({
        id: row.id,
        title: row.title,
        slug: row.slug,
        success: true,
      });
    }
  }

  const processed = rows.length;
  const body = { processed, succeeded, failed, posts };
  console.log("[auto-publish-approved-drafts] Done:", JSON.stringify({ processed, succeeded, failed }));

  return jsonResponse(body, 200);
});

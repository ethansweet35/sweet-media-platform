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

type QueueRow = {
  id: string;
  primary_keyword: string;
  blog_title: string;
  url_slug: string;
  writing_guidelines: string | null;
  scheduled_publish_at: string;
  status: string;
  model_id: string | null;
};

async function authorizeRequest(
  authHeader: string,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<{ ok: true } | { ok: false; response: Response }> {
  const bearer = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!bearer) {
    console.warn("[process-blog-queue] Missing Authorization bearer");
    return {
      ok: false,
      response: jsonResponse({ error: "missing_authorization" }, 401),
    };
  }

  const isServiceCaller = bearer === serviceRoleKey;
  if (isServiceCaller) {
    console.log("[process-blog-queue] Authenticated via service role");
    return { ok: true };
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userData, error: userErr } = await adminClient.auth.getUser(bearer);
  if (userErr || !userData?.user) {
    console.error("[process-blog-queue] getUser failed:", userErr);
    return { ok: false, response: jsonResponse({ error: "unauthorized" }, 401) };
  }

  const email = userData.user.email;
  if (!email) {
    return { ok: false, response: jsonResponse({ error: "unauthorized" }, 401) };
  }

  const { data: adminRow, error: adminErr } = await adminClient
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (adminErr || !adminRow) {
    console.warn("[process-blog-queue] Non-admin JWT:", adminErr ?? "no admin row");
    return { ok: false, response: jsonResponse({ error: "forbidden" }, 403) };
  }

  console.log("[process-blog-queue] Authenticated admin:", email);
  return { ok: true };
}

Deno.serve(async (req) => {
  console.log("[process-blog-queue]", req.method, req.url);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "method_not_allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[process-blog-queue] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return jsonResponse({ error: "server_misconfigured" }, 500);
  }

  const authHeader = req.headers.get("Authorization") ?? "";
  const auth = await authorizeRequest(authHeader, supabaseUrl, serviceRoleKey);
  if (!auth.ok) return auth.response;

  const url = new URL(req.url);
  const requestedQueueId = url.searchParams.get("queueId")?.trim() ?? "";

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const functionsBase = `${supabaseUrl.replace(/\/+$/, "")}/functions/v1`;
  const invokeHeaders: Record<string, string> = {
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
  /** Supabase gateways expect apikey; use anon when available else service role. */
  invokeHeaders.apikey = anonKey || serviceRoleKey;

  let picked: QueueRow | null = null;

  async function reserveRow(rowId: string, allowedStatuses: string[]): Promise<QueueRow | null> {
    const { data, error } = await admin
      .from("blog_queue")
      .update({
        status: "generating",
        updated_at: new Date().toISOString(),
        error_message: null,
      })
      .eq("id", rowId)
      .in("status", allowedStatuses)
      .select(
        "id, primary_keyword, blog_title, url_slug, writing_guidelines, scheduled_publish_at, status, model_id",
      )
      .maybeSingle();

    if (error) {
      console.error("[process-blog-queue] reserveRow update error:", error);
      return null;
    }
    return data as QueueRow | null;
  }

  if (requestedQueueId) {
    console.log("[process-blog-queue] Forced queue item:", requestedQueueId);
    picked = await reserveRow(requestedQueueId, ["pending", "failed"]);
    if (!picked) {
      return jsonResponse({
        processed: 0,
        reason: "item_not_reserved",
        queueId: requestedQueueId,
        detail:
          "Not pending/failed or could not acquire row (duplicate run or invalid id)",
      });
    }
  } else {
    const { data: nextRow, error: selErr } = await admin
      .from("blog_queue")
      .select("id, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (selErr) {
      console.error("[process-blog-queue] Failed to read FIFO candidate:", selErr);
      return jsonResponse({ processed: 0, reason: "db_error", detail: selErr.message }, 500);
    }

    const nextId = (nextRow as { id?: string } | null)?.id;
    if (!nextId) {
      console.log("[process-blog-queue] No pending items");
      return jsonResponse({ processed: 0, reason: "no_pending_items" });
    }

    picked = await reserveRow(nextId, ["pending"]);
    if (!picked) {
      console.log("[process-blog-queue] Lost race reserving FIFO candidate:", nextId);
      return jsonResponse({ processed: 0, reason: "fifo_race_retry_later" });
    }
  }

  const queueId = picked!.id;

  async function failQueue(message: string) {
    const brief = message.slice(0, 800);
    await admin
      .from("blog_queue")
      .update({
        status: "failed",
        error_message: brief,
        updated_at: new Date().toISOString(),
      })
      .eq("id", queueId);
    console.warn("[process-blog-queue] FAILED queue", queueId, brief);
    return brief;
  }

  try {
    const guidelines =
      picked!.writing_guidelines && picked!.writing_guidelines.trim().length > 0
        ? picked!.writing_guidelines.trim()
        : undefined;

    console.log("[process-blog-queue] Generating post for queue", queueId, {
      slug: picked!.url_slug,
      schedule: picked!.scheduled_publish_at,
      model_id: picked!.model_id ?? null,
    });

    const genPayload: Record<string, unknown> = {
      topic: picked!.blog_title,
      primaryKeyword: picked!.primary_keyword,
      customInstructions: guidelines,
      slug: picked!.url_slug,
      scheduledPublishAt: picked!.scheduled_publish_at,
    };
    const qModel =
      typeof picked!.model_id === "string" && picked!.model_id.trim().length > 0
        ? picked!.model_id.trim()
        : null;
    if (qModel) genPayload.model = qModel;

    const genRes = await fetch(`${functionsBase}/generate-blog-post`, {
      method: "POST",
      headers: invokeHeaders,
      body: JSON.stringify(genPayload),
    });

    const genText = await genRes.text();
    let genJson: Record<string, unknown> = {};
    try {
      genJson = JSON.parse(genText) as Record<string, unknown>;
    } catch {
      genJson = {};
    }

    if (!genRes.ok) {
      const errMsg =
        typeof genJson.error === "string"
          ? genJson.error
          : `generate-blog-post HTTP ${genRes.status}: ${genText.slice(0, 400)}`;
      const brief = await failQueue(errMsg);
      return jsonResponse({
        processed: 1,
        status: "failed",
        queueId,
        error: brief,
      });
    }

    const postId = typeof genJson.postId === "string" ? genJson.postId : "";
    const title = typeof genJson.title === "string" ? genJson.title : picked!.blog_title;

    if (!postId) {
      const brief = await failQueue("generate-blog-post returned no postId");
      return jsonResponse({
        processed: 1,
        status: "failed",
        queueId,
        error: brief,
      });
    }

    console.log("[process-blog-queue] Post created, generating hero image postId=", postId);

    const { data: postPeek } = await admin
      .from("blog_posts")
      .select("excerpt, category")
      .eq("id", postId)
      .maybeSingle();

    const peek = postPeek as { excerpt?: string | null; category?: string | null } | null;
    const excerpt = typeof peek?.excerpt === "string" ? peek.excerpt : "";
    const category = typeof peek?.category === "string" && peek.category.trim()
      ? peek.category
      : "SEO";

    const imgRes = await fetch(`${functionsBase}/generate-blog-image`, {
      method: "POST",
      headers: invokeHeaders,
      body: JSON.stringify({
        title,
        excerpt,
        category,
        postId,
      }),
    });

    const imgText = await imgRes.text();
    if (!imgRes.ok) {
      const brief = await failQueue(`generate-blog-image failed: ${imgRes.status} ${imgText.slice(0, 300)}`);
      return jsonResponse({
        processed: 1,
        status: "failed",
        queueId,
        postId,
        error: brief,
      });
    }

    const { error: doneErr } = await admin
      .from("blog_queue")
      .update({
        status: "draft_ready",
        generated_post_id: postId,
        updated_at: new Date().toISOString(),
        error_message: null,
      })
      .eq("id", queueId);

    if (doneErr) {
      const brief = await failQueue(doneErr.message);
      return jsonResponse({
        processed: 1,
        status: "failed",
        queueId,
        postId,
        error: brief,
      });
    }

    console.log("[process-blog-queue] SUCCESS queue", queueId, "postId", postId);
    return jsonResponse({
      processed: 1,
      status: "draft_ready",
      queueId,
      postId,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const brief = await failQueue(msg);
    return jsonResponse({
      processed: 1,
      status: "failed",
      queueId,
      error: brief,
    });
  }
});

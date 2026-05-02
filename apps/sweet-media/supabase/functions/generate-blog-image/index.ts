import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

/** Landscape for GPT image models (see OpenAI Images API: 1024×1024, 1536×1024, 1024×1536, auto). */
const IMAGE_SIZE = "1536x1024";
const IMAGE_MODEL = "gpt-image-2";
const BODY_CONTEXT_MAX_CHARS = 2000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function callOpenAI(apiKey: string, prompt: string, timeoutMs: number): Promise<{ b64_json?: string; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt,
        n: 1,
        size: IMAGE_SIZE,
        quality: "medium",
        output_format: "webp",
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      const errText = await res.text();
      return { error: `HTTP ${res.status}: ${errText}` };
    }
    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return { error: `No b64_json` };
    return { b64_json: b64 };
  } catch (e) {
    clearTimeout(timer);
    if ((e as Error).name === "AbortError") return { error: `Timed out after ${timeoutMs / 1000}s` };
    return { error: `Fetch exception: ${String(e)}` };
  }
}

async function uploadB64ToStorage(b64: string, title: string): Promise<string> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const adminClient = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const binary = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
  const filename = `blog-${slug}-${Date.now()}.webp`;
  const { data, error } = await adminClient.storage.from("public_bucket").upload(filename, binary, { contentType: "image/webp", upsert: true });
  if (error) throw new Error(`Storage upload failed: ${error.message}`);
  const { data: urlData } = adminClient.storage.from("public_bucket").getPublicUrl(data.path);
  return urlData.publicUrl;
}

function normalizeContentArray(raw: unknown): unknown[] {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    const t = raw.trim();
    if (!t) return [];
    try {
      const once = JSON.parse(t) as unknown;
      if (typeof once === "string") {
        try {
          const twice = JSON.parse(once) as unknown;
          return Array.isArray(twice) ? twice : [];
        } catch {
          return [];
        }
      }
      return Array.isArray(once) ? once : [];
    } catch {
      return [];
    }
  }
  return [];
}

/** Collect plain text from BlogSection-like JSON for image prompt context. */
function extractTextFromBlogContent(raw: unknown): string {
  const parts: string[] = [];
  const push = (s: string) => {
    const x = s.trim();
    if (x) parts.push(x);
  };

  for (const block of normalizeContentArray(raw)) {
    if (!block || typeof block !== "object") continue;
    const b = block as Record<string, unknown>;
    const type = typeof b.type === "string" ? b.type : "";

    switch (type) {
      case "paragraph":
      case "h2":
      case "h3":
      case "pullquote":
        push(String(b.text ?? ""));
        break;
      case "callout":
        push(String(b.text ?? ""));
        break;
      case "list":
      case "numbered": {
        const items = b.items;
        if (Array.isArray(items)) {
          for (const it of items) push(String(it));
        }
        break;
      }
      case "stat-row": {
        const stats = b.stats;
        if (Array.isArray(stats)) {
          for (const s of stats) {
            if (s && typeof s === "object") {
              const o = s as { value?: string; label?: string };
              push(`${o.value ?? ""} ${o.label ?? ""}`);
            }
          }
        }
        break;
      }
      case "table": {
        const headers = b.tableHeaders;
        const rows = b.tableRows;
        if (Array.isArray(headers)) push(headers.map((h) => String(h)).join(" "));
        if (Array.isArray(rows)) {
          for (const row of rows) {
            if (Array.isArray(row)) push(row.map((c) => String(c)).join(" "));
          }
        }
        break;
      }
      default:
        break;
    }
  }

  return parts.join("\n\n").replace(/\s+/g, " ").trim();
}

async function fetchBodyContext(
  supabaseUrl: string,
  serviceRoleKey: string,
  postId: string | undefined,
): Promise<string> {
  if (!postId) return "";
  try {
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await admin
      .from("blog_posts")
      .select("content")
      .eq("id", postId)
      .maybeSingle();

    if (error) {
      console.warn("[generate-blog-image] content fetch error:", error.message);
      return "";
    }
    const row = data as { content?: unknown } | null;
    if (!row?.content) return "";

    const text = extractTextFromBlogContent(row.content);
    if (!text) return "";
    return text.length > BODY_CONTEXT_MAX_CHARS ? text.slice(0, BODY_CONTEXT_MAX_CHARS) + "…" : text;
  } catch (e) {
    console.warn("[generate-blog-image] bodyContext exception:", e);
    return "";
  }
}

function escapeForDoubleQuotedPrompt(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildPrompt(title: string, excerpt: string, category: string, bodyContext: string): string {
  const t = title.trim();
  const ex = excerpt.trim();
  const cat = category.trim();
  const ctx = bodyContext.trim();

  const titleQuoted = escapeForDoubleQuotedPrompt(t);

  const contextLines: string[] = ["CONTEXT:"];
  contextLines.push(`Title: ${t}`);
  if (cat) contextLines.push(`Category: ${cat}`);
  if (ex) contextLines.push(`Excerpt: ${ex}`);
  if (ctx) contextLines.push(`Article context: ${ctx}`);

  return `Create a 16:9 editorial blog featured image for a healthcare marketing blog post.

TEXT OVERLAY:
Render this exact text on the image, prominent and legible: "${titleQuoted}"

BRAND STYLE:
- Professional, minimal, healthcare-tech aesthetic
- Color palette: navy, white, black (with one subtle accent if appropriate)
- Tone: trustworthy, structured, calm, corporate
- Premium polished editorial design — NOT glowing, futuristic, or AI-art style
- Do NOT include any logo on the image

DYNAMIC VISUAL COMPOSITION:
Generate a unique background, layout, and primary visual element that specifically matches the meaning of the title and content below. Vary your approach — don't default to clipboards, checklists, or generic imagery. Topic-specific visual cues:
- SEO topics: search results, ranking positions, organic search visualization
- Web development: website displays on devices (laptop, phone), Core Web Vitals, code interfaces
- Paid media: campaign dashboards, ad platforms, performance metrics
- AI/search: data visualization, search interfaces, technology imagery
- Patient acquisition / behavioral health: serene clinical environments, calming spaces (NOT generic stock medical imagery)
- Social media: content creation environments, mobile interfaces, brand visuals

Vary the layout: sometimes center-focal, sometimes split-screen, sometimes asymmetric geometric framing.

${contextLines.join("\n")}

FORMAT:
- 16:9 aspect ratio
- High-end corporate marketing aesthetic
- Editorial quality, sharp focus`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = await req.json();
    const apiKey = Deno.env.get("chatgpt_api") || Deno.env.get("OPENAI_API_KEY");
    if (body.test) {
      if (!apiKey) {
        return new Response(JSON.stringify({ configured: false, error: "No OpenAI API key" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const testRes = await fetch("https://api.openai.com/v1/models", { headers: { Authorization: `Bearer ${apiKey}` } });
      if (testRes.ok) {
        return new Response(JSON.stringify({ configured: true, valid: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ configured: true, valid: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { title, excerpt, category, postId: bodyPostId } = body as {
      title?: string;
      excerpt?: string;
      category?: string;
      postId?: string;
    };
    const postId =
      typeof bodyPostId === "string" && bodyPostId.trim().length > 0 ? bodyPostId.trim() : undefined;
    if (!title) {
      return new Response(JSON.stringify({ error: "title is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "No OpenAI API key" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    let bodyContext = "";
    if (postId && supabaseUrl && serviceRoleKey) {
      bodyContext = await fetchBodyContext(supabaseUrl, serviceRoleKey, postId);
    }

    const excerptStr = typeof excerpt === "string" ? excerpt : "";
    const categoryStr = typeof category === "string" ? category : "";

    const prompt = buildPrompt(title, excerptStr, categoryStr, bodyContext);
    console.log("[generate-blog-image] postId=", postId ?? "(none)", "bodyContext_len=", bodyContext.length, "size=", IMAGE_SIZE);

    const result = await callOpenAI(apiKey, prompt, 180_000);
    if (result.b64_json) {
      const publicUrl = await uploadB64ToStorage(result.b64_json, title);
      if (postId && supabaseUrl && serviceRoleKey) {
        const adminClient = createClient(supabaseUrl, serviceRoleKey, {
          auth: { persistSession: false },
        });
        const { error: updateErr } = await adminClient
          .from("blog_posts")
          .update({ hero_image_url: publicUrl })
          .eq("id", postId);
        if (updateErr) {
          console.error("[generate-blog-image] blog_posts hero_image_url update failed:", updateErr.message, updateErr);
        } else {
          console.log("[generate-blog-image] Updated blog_posts hero_image_url for postId:", postId);
        }
      }
      return new Response(JSON.stringify({ url: publicUrl, model: IMAGE_MODEL }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: result.error ?? "Image generation failed" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

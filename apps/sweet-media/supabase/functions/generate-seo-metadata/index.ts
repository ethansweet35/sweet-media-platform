import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  type: "page" | "post";
  title: string;
  route?: string;
  excerpt?: string;
  category?: string;
  keyword?: string;
  brandName?: string;
  brandContext?: string; // e.g. "addiction treatment center in Newport Beach, CA"
}

interface SeoResult {
  seo_title: string | null;
  meta_description: string;
}

function buildPrompt(body: RequestBody): string {
  const brand = body.brandName ?? "the website";
  const brandCtx = body.brandContext ? ` (${body.brandContext})` : "";

  const lines: string[] = [
    `You are an expert SEO copywriter. Generate an optimized SEO title and meta description for a page on ${brand}${brandCtx}.`,
    ``,
    `Rules:`,
    `- SEO Title: 50–60 characters. Include the primary keyword near the start. Include the brand name at the end if space allows.`,
    `- Meta Description: 140–160 characters. Compelling, includes the primary keyword, ends with a soft CTA ("Learn more", "Get help today", "Call now", etc.).`,
    `- Do NOT include quotes or markdown.`,
    `- Return ONLY valid JSON: {"seo_title": "...", "meta_description": "..."}`,
    ``,
    `Page info:`,
    `- Type: ${body.type === "page" ? "static page" : "blog post"}`,
    `- Title: ${body.title}`,
  ];

  if (body.route) lines.push(`- Route: ${body.route}`);
  if (body.category) lines.push(`- Category: ${body.category}`);
  if (body.keyword) lines.push(`- Primary keyword: ${body.keyword}`);
  if (body.excerpt) lines.push(`- Excerpt/summary: ${body.excerpt.slice(0, 400)}`);

  return lines.join("\n");
}

async function callOpenRouter(
  apiKey: string,
  prompt: string,
): Promise<SeoResult> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://sweetmediaservices.com",
      "X-Title": "Sweet Media Admin",
    },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4.5",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  const raw: string = data?.choices?.[0]?.message?.content ?? "";

  // Extract JSON from the response (model may wrap it in markdown fences)
  const jsonMatch = raw.match(/\{[\s\S]*"seo_title"[\s\S]*"meta_description"[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Could not parse JSON from model response: ${raw.slice(0, 200)}`);

  const parsed = JSON.parse(jsonMatch[0]) as { seo_title?: string; meta_description?: string };

  return {
    seo_title: typeof parsed.seo_title === "string" ? parsed.seo_title.trim().slice(0, 70) : null,
    meta_description: typeof parsed.meta_description === "string"
      ? parsed.meta_description.trim().slice(0, 200)
      : "Learn more about this topic.",
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const openrouterKey = Deno.env.get("OPENROUTER_API_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: "Missing Supabase env vars" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!openrouterKey) {
      return new Response(JSON.stringify({ error: "OPENROUTER_API_KEY not set" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the caller is an authenticated admin
    const token = authHeader.replace("Bearer ", "");
    const userClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user }, error: authErr } = await userClient.auth.getUser(token);
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as RequestBody;
    if (!body.title) {
      return new Response(JSON.stringify({ error: "title is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await callOpenRouter(openrouterKey, buildPrompt(body));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

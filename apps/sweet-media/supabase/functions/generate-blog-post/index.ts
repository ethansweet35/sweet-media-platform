import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_KB_CHARS = 40_000;

/** Keep in sync with `src/lib/aiModels.ts` — edge runtime cannot import from Next `src/`. */
const DEFAULT_MODEL_ID = "anthropic/claude-sonnet-4.6";
const ALLOWED_MODEL_IDS = new Set([
  "anthropic/claude-sonnet-4.6",
  "anthropic/claude-opus-4.7",
  "openai/gpt-5.5-pro",
  "openai/gpt-5.4-mini",
  "google/gemini-pro-latest",
]);

function resolveOpenRouterModel(bodyModel: unknown): string {
  if (typeof bodyModel !== "string") return DEFAULT_MODEL_ID;
  const trimmed = bodyModel.trim();
  if (!trimmed) return DEFAULT_MODEL_ID;
  return ALLOWED_MODEL_IDS.has(trimmed) ? trimmed : DEFAULT_MODEL_ID;
}

const DEFAULT_AUTHOR_PHOTO =
  "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/img2.png";

function jsonHeaders() {
  return { ...corsHeaders, "Content-Type": "application/json" };
}

function stripCodeFences(raw: string): string {
  let s = raw.trim();
  s = s.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
  return s;
}

/** Best-effort repair: extract balanced top-level object or append closing braces. */
function repairJsonText(s: string): string {
  let t = s.trim();
  const start = t.indexOf("{");
  if (start === -1) return t;
  t = t.slice(start);
  let depth = 0;
  let end = -1;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === '"') {
      i++;
      while (i < t.length) {
        if (t[i] === "\\" && i + 1 < t.length) {
          i += 2;
          continue;
        }
        if (t[i] === '"') break;
        i++;
      }
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end !== -1) return t.slice(0, end + 1);
  const opens = (t.match(/\{/g) ?? []).length;
  const closes = (t.match(/\}/g) ?? []).length;
  const need = Math.max(0, opens - closes);
  return need > 0 ? t + "}".repeat(need) : t;
}

function parseGeneratedJson(raw: string): Record<string, unknown> {
  const stripped = stripCodeFences(raw);
  try {
    return JSON.parse(stripped) as Record<string, unknown>;
  } catch (e1) {
    console.error("[generate-blog-post] JSON.parse failed, attempting repair:", e1);
    const repaired = repairJsonText(stripped);
    try {
      return JSON.parse(repaired) as Record<string, unknown>;
    } catch (e2) {
      console.error("[generate-blog-post] Repair parse failed:", e2);
      throw new Error(`JSON parse failed. Raw (first 2000 chars): ${raw.slice(0, 2000)}`);
    }
  }
}

function normalizeContentBlocks(content: unknown): unknown[] {
  if (!Array.isArray(content)) return [];
  return content.map((block) => {
    if (!block || typeof block !== "object") return block;
    const b = block as Record<string, unknown>;
    if (b.type === "callout" && b.variant === "info") {
      return { ...b, variant: "insight" };
    }
    return b;
  });
}

function estimateReadTime(content: unknown[]): string {
  const text = JSON.stringify(content);
  const words = text.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function normalizeSlugFromInput(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildSystemPrompt(knowledgeBaseBlock: string): string {
  return `You are an expert SEO content writer for Sweet Media Services, a boutique digital marketing agency that exclusively serves behavioral health treatment centers (detox, residential, PHP, IOP, sober living, dual diagnosis, mental health practices) plus adjacent niches like behavioral health billing and lab toxicology.

Use the following knowledge base as the authoritative reference for brand voice, services, framing, and approved proof points. The knowledge base supersedes general assumptions you would otherwise make.

[KNOWLEDGE BASE]
${knowledgeBaseBlock}
[END KNOWLEDGE BASE]

NON-NEGOTIABLE RULES:

1. COMPLIANCE & LANGUAGE
- Never claim marketing is "HIPAA compliant" — use "HIPAA-aware," "privacy-conscious," or "HIPAA-conscious" instead.
- Use person-first language: "people in recovery," "people with substance use disorder." Never use "addicts," "drug abusers," or commodifying language like "cheap leads."
- Never provide medical advice, never guarantee clinical outcomes, never guarantee specific admissions volume or ROAS numbers.
- Never fabricate statistics, patient stories, or credentials. Only use approved stats from the knowledge base, and frame them as "in one published case study" or "we have seen clients..."

2. FORMATTING
- Do not use any bold text in the body content.
- Use bullet points, numbered lists, blockquotes, and tables sparingly — only where they naturally enhance readability. Most sections should be prose.
- Reserve tables strictly for comparing strategies, metrics, or channels.
- Use pullquotes only for genuinely insightful key takeaways, not arbitrary sentences.
- Lists should have 3-7 items max.

3. STRUCTURE
- Open with a strong introduction (2+ paragraphs) that names the business problem, grounds it in the behavioral health context, and previews the solution.
- Use H2 sections to build a logical argument. Use H3 only when nested detail is needed under an H2.
- Include a dedicated FAQ section near the end with 4-6 realistic buyer questions written as H3 headings followed by paragraph answers.
- End with a closing CTA section: one short paragraph + an approved CTA ("Book a free strategy call" or "Request a free media audit").
- Target 1500-2500 words unless instructed otherwise.

4. SEO & LINKING
- The primary keyword must appear in the title, meta description, first paragraph, and at least one H2.
- DO NOT include any internal links to the Sweet Media site. Internal linking is handled by a separate post-processing tool.
- Include 2-5 external links to credible authoritative sources (.gov, .edu, established industry publications like Forbes, JAMA, SAMHSA, NIDA, ASAM, AHRQ). Use descriptive anchor text via markdown link syntax: [anchor text](https://full-url-here). Never use raw URLs as anchor text.

5. OUTPUT FORMAT
You MUST output ONLY a valid JSON object. No markdown fences. No preamble. No trailing commentary. The JSON must conform exactly to this shape:

{
  "title": "string — SEO-optimized, includes primary keyword, under 70 chars",
  "slug": "kebab-case-slug-derived-from-primary-keyword",
  "excerpt": "string under 160 chars",
  "metaDescription": "string under 155 chars, includes primary keyword naturally",
  "category": "one of: SEO | Paid Media | Web Development | Social Media | Compliance | Strategy",
  "tags": ["3 to 6 relevant tags"],
  "featuredImagePrompt": "vivid one-sentence prompt describing an editorial photo or illustration for this article — should be visually concrete, professional, no text in image",
  "content": [
    { "type": "paragraph", "text": "..." },
    { "type": "h2", "text": "..." },
    { "type": "h3", "text": "..." },
    { "type": "list", "items": ["...", "..."] },
    { "type": "numbered", "items": ["...", "..."] },
    { "type": "pullquote", "text": "..." },
    { "type": "callout", "text": "...", "variant": "warning" | "tip" | "insight" },
    { "type": "stat-row", "stats": [{ "value": "...", "label": "..." }] },
    { "type": "divider" },
    { "type": "table", "tableHeaders": ["...", "..."], "tableRows": [["...", "..."]] }
  ]
}

- For callouts, variant must be one of: warning, tip, insight. Do not use any other variant value.

Each content item is a single section. Use only the section types above. Do not invent new section types. Embed external markdown links inside paragraph text where appropriate. Never embed internal/relative links.`;
}

function buildUserMessage(
  topic: string,
  primaryKeyword: string,
  category: string | undefined,
  tone: string | undefined,
  targetWordCount: number | undefined,
  audience: string | undefined,
  customInstructions: string | undefined
): string {
  return `Topic: ${topic}
Primary keyword: ${primaryKeyword}
Category: ${category ?? "let me decide based on the topic"}
Tone: ${tone ?? "follow the knowledge base voice"}
Target word count: ${targetWordCount ?? 2000}
Audience: ${audience ?? "behavioral health treatment center owners and admissions directors"}

${customInstructions ? "Additional instructions:\n" + customInstructions : ""}

Generate the blog post now. Output only the JSON object as specified.`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: jsonHeaders(),
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!supabaseUrl || !serviceRoleKey) {
      console.error("[generate-blog-post] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
        status: 500,
        headers: jsonHeaders(),
      });
    }

    const authHeader = req.headers.get("Authorization") ?? "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!jwt) {
      console.warn("[generate-blog-post] Missing Authorization bearer token");
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: jsonHeaders() });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const isInternalServiceCaller = jwt === serviceRoleKey;

    if (!isInternalServiceCaller) {
      const { data: userData, error: userErr } = await adminClient.auth.getUser(jwt);
      if (userErr || !userData?.user) {
        console.error("[generate-blog-post] getUser failed:", userErr);
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: jsonHeaders() });
      }

      const email = userData.user.email;
      if (!email) {
        console.warn("[generate-blog-post] User has no email");
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: jsonHeaders() });
      }

      const { data: adminRow, error: adminErr } = await adminClient
        .from("admin_users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (adminErr) {
        console.error("[generate-blog-post] admin_users query error:", adminErr);
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: jsonHeaders() });
      }
      if (!adminRow) {
        console.warn("[generate-blog-post] No admin_users row for email:", email);
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: jsonHeaders() });
      }
    } else {
      console.log("[generate-blog-post] Internal invocation (service role)");
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch (e) {
      console.error("[generate-blog-post] Invalid JSON body:", e);
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: jsonHeaders() });
    }

    const topic = typeof body.topic === "string" ? body.topic.trim() : "";
    const primaryKeyword = typeof body.primaryKeyword === "string" ? body.primaryKeyword.trim() : "";
    if (!topic || !primaryKeyword) {
      return new Response(JSON.stringify({ error: "topic and primaryKeyword are required" }), {
        status: 400,
        headers: jsonHeaders(),
      });
    }

    const category = typeof body.category === "string" ? body.category : undefined;
    const tone = typeof body.tone === "string" ? body.tone : undefined;
    const targetWordCount = typeof body.targetWordCount === "number" ? body.targetWordCount : undefined;
    const audience = typeof body.audience === "string" ? body.audience : undefined;
    const customInstructionsRaw = typeof body.customInstructions === "string" ? body.customInstructions : undefined;

    /** Only honored when Caller is trusted service role (e.g. process-blog-queue). */
    const fixedSlugCandidate =
      isInternalServiceCaller && typeof body.slug === "string" ? body.slug.trim() : "";
    const scheduledPublishAt =
      isInternalServiceCaller && typeof body.scheduledPublishAt === "string"
        ? body.scheduledPublishAt.trim()
        : undefined;

    const customInstructionsParts: string[] = [];
    if (customInstructionsRaw) customInstructionsParts.push(customInstructionsRaw);
    if (fixedSlugCandidate) {
      customInstructionsParts.push(
        `IMPORTANT: Output JSON must remain valid with all fields populated. The slug field must be "${normalizeSlugFromInput(fixedSlugCandidate)}" exactly (URLs use this slug; do not improvise another).`
      );
    }
    const customInstructions = customInstructionsParts.length ? customInstructionsParts.join("\n\n") : undefined;

    const model = resolveOpenRouterModel(body.model);
    if (typeof body.model === "string") {
      const requested = body.model.trim();
      if (requested.length > 0 && requested !== model) {
        console.warn("[generate-blog-post] Unknown model id, falling back:", requested, "->", model);
      }
    }

    console.log("[generate-blog-post] Request OK:", {
      topic: topic.slice(0, 80),
      primaryKeyword,
      model,
      internalCaller: isInternalServiceCaller,
      hasFixedSlug: Boolean(fixedSlugCandidate),
      hasScheduledPublish: Boolean(scheduledPublishAt),
    });

    const { data: kbRows, error: kbErr } = await adminClient
      .from("blog_knowledge_base")
      .select("title, content")
      .eq("is_active", true);

    if (kbErr) {
      console.error("[generate-blog-post] blog_knowledge_base query error:", kbErr);
    }

    let knowledgeBaseBlock = "";
    if (kbRows && kbRows.length > 0) {
      for (const row of kbRows) {
        const t = (row as { title?: string; content?: string }).title ?? "";
        const c = (row as { title?: string; content?: string }).content ?? "";
        knowledgeBaseBlock += `## ${t}\n${c}\n\n`;
      }
      if (knowledgeBaseBlock.length > MAX_KB_CHARS) {
        knowledgeBaseBlock = knowledgeBaseBlock.slice(0, MAX_KB_CHARS);
        console.log("[generate-blog-post] Knowledge base truncated to", MAX_KB_CHARS, "chars");
      }
    } else {
      console.log("[generate-blog-post] No active knowledge base rows (using empty block)");
    }

    const systemPrompt = buildSystemPrompt(knowledgeBaseBlock);
    const userMessage = buildUserMessage(
      topic,
      primaryKeyword,
      category,
      tone,
      targetWordCount,
      audience,
      customInstructions
    );

    const openrouterKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!openrouterKey) {
      console.error("[generate-blog-post] OPENROUTER_API_KEY not set");
      return new Response(JSON.stringify({ error: "OPENROUTER_API_KEY not configured" }), {
        status: 500,
        headers: jsonHeaders(),
      });
    }

    console.log("[generate-blog-post] Calling OpenRouter model:", model);
    const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openrouterKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 8000,
        temperature: 0.7,
      }),
    });

    const orText = await orRes.text();
    if (!orRes.ok) {
      console.error("[generate-blog-post] OpenRouter HTTP error:", orRes.status, orText.slice(0, 500));
      return new Response(JSON.stringify({ error: `OpenRouter error: ${orRes.status}`, detail: orText.slice(0, 2000) }), {
        status: 502,
        headers: jsonHeaders(),
      });
    }

    let orJson: Record<string, unknown>;
    try {
      orJson = JSON.parse(orText) as Record<string, unknown>;
    } catch (e) {
      console.error("[generate-blog-post] OpenRouter response not JSON:", e, orText.slice(0, 500));
      return new Response(JSON.stringify({ error: "OpenRouter returned non-JSON" }), {
        status: 502,
        headers: jsonHeaders(),
      });
    }

    const choices = orJson.choices as unknown[] | undefined;
    const first = choices?.[0] as Record<string, unknown> | undefined;
    const message = first?.message as Record<string, unknown> | undefined;
    const mc = message?.content;
    let rawContent = "";
    if (typeof mc === "string") rawContent = mc;
    else if (Array.isArray(mc)) {
      rawContent = mc
        .map((part) => {
          if (typeof part === "string") return part;
          if (part && typeof part === "object" && "text" in part) return String((part as { text?: string }).text ?? "");
          return "";
        })
        .join("");
    }
    if (!rawContent) {
      console.error("[generate-blog-post] Empty message content from OpenRouter:", JSON.stringify(orJson).slice(0, 800));
      return new Response(JSON.stringify({ error: "Empty model response" }), {
        status: 502,
        headers: jsonHeaders(),
      });
    }

    console.log("[generate-blog-post] OpenRouter content length:", rawContent.length);

    let parsed: Record<string, unknown>;
    try {
      parsed = parseGeneratedJson(rawContent);
    } catch (e) {
      console.error("[generate-blog-post] Failed to parse model JSON:", e);
      return new Response(
        JSON.stringify({
          error: "Failed to parse generated JSON",
          raw: rawContent.slice(0, 8000),
        }),
        { status: 500, headers: jsonHeaders() }
      );
    }

    const title = String(parsed.title ?? "").trim();
    const slugFromModel = String(parsed.slug ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const honorFixedSlug = isInternalServiceCaller && fixedSlugCandidate.length > 0;
    let slug = honorFixedSlug ? normalizeSlugFromInput(fixedSlugCandidate) : slugFromModel;
    const excerpt = String(parsed.excerpt ?? "").trim();
    const metaDescription = String(parsed.metaDescription ?? parsed.meta_description ?? "").trim();
    const postCategory = String(parsed.category ?? "SEO").trim();
    const tags = Array.isArray(parsed.tags) ? parsed.tags.map((t) => String(t)) : [];
    const featuredImagePrompt = String(parsed.featuredImagePrompt ?? "").trim();
    const contentArr = normalizeContentBlocks(parsed.content);

    if (!title || !slug) {
      console.error("[generate-blog-post] Missing title or slug after parse:", { title, slug, slugFromModel });
      return new Response(JSON.stringify({ error: "Generated post missing title or slug" }), {
        status: 500,
        headers: jsonHeaders(),
      });
    }

    const readTime = estimateReadTime(contentArr as unknown[]);

    const imageUrl = "";

    const postId = crypto.randomUUID();
    const isQueuedDraft = Boolean(scheduledPublishAt && scheduledPublishAt.length > 0);

    const row: Record<string, unknown> = {
      id: postId,
      title,
      slug,
      content: JSON.stringify(contentArr),
      excerpt,
      meta_description: metaDescription,
      category: postCategory,
      tags,
      hero_image_url: imageUrl ?? "",
      status: "draft",
      author: "Ethan Sweet",
      author_title: "Founder",
      author_bio:
        "Founder of Sweet Media — boutique digital marketing for behavioral health treatment centers.",
      author_photo: DEFAULT_AUTHOR_PHOTO,
      read_time: readTime,
      featured: false,
    };

    if (isQueuedDraft) {
      row.published_at = null;
      row.scheduled_publish_at = scheduledPublishAt;
      row.approved_for_publish = true;
    } else {
      row.published_at = new Date().toISOString();
    }

    console.log("[generate-blog-post] Inserting blog_posts row:", {
      postId,
      slug,
      title: title.slice(0, 60),
      queuedDraft: isQueuedDraft,
    });

    let insertError = (await adminClient.from("blog_posts").insert(row)).error;

    const allowSlugCollisionFallback = !(honorFixedSlug && slug.length > 0);
    if (allowSlugCollisionFallback && insertError && (insertError.code === "23505" || insertError.message.includes("duplicate"))) {
      const suffix = crypto.randomUUID().slice(0, 8);
      slug = `${slug}-${suffix}`;
      console.warn("[generate-blog-post] Slug collision, retrying with:", slug);
      insertError = (await adminClient.from("blog_posts").insert({ ...row, slug })).error;
    }

    if (insertError) {
      console.error("[generate-blog-post] blog_posts insert failed:", insertError);
      return new Response(JSON.stringify({ error: insertError.message, code: insertError.code }), {
        status: 500,
        headers: jsonHeaders(),
      });
    }

    const payload = {
      success: true,
      postId,
      slug,
      title,
      heroImageUrl: imageUrl ?? "",
    };
    console.log("[generate-blog-post] Success:", payload);

    return new Response(JSON.stringify(payload), { status: 200, headers: jsonHeaders() });
  } catch (err) {
    console.error("[generate-blog-post] Unhandled error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: jsonHeaders() });
  }
});

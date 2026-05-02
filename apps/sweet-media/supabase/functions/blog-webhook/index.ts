import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-secret",
};

interface ContentBlock {
  type: string;
  text?: string;
  items?: string[];
}

function stripMarkdownFences(md: string): string {
  return md.replace(/^```(?:markdown|md)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
}

function parseFrontmatter(lines: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    if (!/^[a-zA-Z0-9_]+$/.test(key)) continue;
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    result[key] = value;
  }
  return result;
}

function parseTags(tagsStr: string | undefined): string[] {
  if (!tagsStr) return [];
  const cleaned = tagsStr.replace(/^\[|\]$/g, "").replace(/['"]/g, "");
  return cleaned.split(",").map((t) => t.trim()).filter(Boolean);
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 60).replace(/-+$/, "");
}

function parseMarkdownPost(rawMd: string) {
  const md = stripMarkdownFences(rawMd);
  const lines = md.split("\n");
  let i = 0;
  let frontmatter: Record<string, string> = {};
  if (lines[0]?.trim() === "---") {
    const endIdx = lines.findIndex((l, idx) => idx > 0 && l.trim() === "---");
    if (endIdx > 0) { frontmatter = parseFrontmatter(lines.slice(1, endIdx)); i = endIdx + 1; }
  }
  const content: ContentBlock[] = [];
  let currentParagraph = "";
  let currentList: string[] = [];
  let listType: "list" | "numbered" | null = null;
  let currentQuote = "";
  const flushParagraph = () => { const text = currentParagraph.trim(); if (text) content.push({ type: "paragraph", text }); currentParagraph = ""; };
  const flushList = () => { if (currentList.length > 0) { content.push({ type: listType === "numbered" ? "numbered" : "list", items: [...currentList] }); currentList = []; listType = null; } };
  const flushQuote = () => { const text = currentQuote.trim(); if (text) content.push({ type: "pullquote", text }); currentQuote = ""; };
  for (; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed === "") { flushParagraph(); flushList(); flushQuote(); continue; }
    if (trimmed === "---" || trimmed === "***") { flushParagraph(); flushList(); flushQuote(); content.push({ type: "divider" }); continue; }
    if (trimmed.startsWith("## ")) { flushParagraph(); flushList(); flushQuote(); content.push({ type: "h2", text: trimmed.replace(/^##\s+/, "") }); continue; }
    if (trimmed.startsWith("### ")) { flushParagraph(); flushList(); flushQuote(); content.push({ type: "h3", text: trimmed.replace(/^###\s+/, "") }); continue; }
    if (trimmed.startsWith("> ")) { flushParagraph(); flushList(); currentQuote += (currentQuote ? " " : "") + trimmed.replace(/^>\s+/, ""); continue; }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) { flushParagraph(); flushQuote(); if (listType && listType !== "list") flushList(); listType = "list"; currentList.push(trimmed.replace(/^[-*]\s+/, "")); continue; }
    if (/^\d+\.\s+/.test(trimmed)) { flushParagraph(); flushQuote(); if (listType && listType !== "numbered") flushList(); listType = "numbered"; currentList.push(trimmed.replace(/^\d+\.\s+/, "")); continue; }
    flushList(); flushQuote();
    currentParagraph += (currentParagraph ? " " : "") + trimmed;
  }
  flushParagraph(); flushList(); flushQuote();
  const title = frontmatter.title || md.match(/^#\s+(.+)$/m)?.[1]?.trim() || "Untitled Post";
  const slug = (frontmatter.slug || slugify(title)).replace(/^\//, "");
  const firstParagraph = content.find((b) => b.type === "paragraph")?.text || "";
  const excerpt = frontmatter.excerpt || firstParagraph.slice(0, 200);
  const wordCount = md.split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  return {
    title, slug, excerpt,
    category: frontmatter.category || "SEO",
    author: frontmatter.author || "Sweet Media",
    author_title: frontmatter.authorRole || "Content Team",
    author_bio: frontmatter.authorBio || "Boutique digital marketing agency exclusively serving behavioral health treatment centers.",
    author_photo: frontmatter.authorPhoto || "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/img2.png",
    read_time: frontmatter.readTime || `${readTimeMinutes} min read`,
    hero_image_url: frontmatter.image || frontmatter.featuredImage || frontmatter.featured_image || "",
    image_prompt: frontmatter.imagePrompt || frontmatter.image_prompt || "",
    tags: parseTags(frontmatter.tags),
    content,
    meta_description: frontmatter.metaDescription || excerpt.slice(0, 160),
    featured: frontmatter.featured === "true",
  };
}

function buildAutoPrompt(title: string, excerpt: string, category: string): string {
  const combined = `${title} ${excerpt}`.toLowerCase();
  if (combined.includes("seo") || combined.includes("search engine") || combined.includes("ranking")) return `Editorial photograph for a premium healthcare marketing blog article about SEO. Scene: Aerial view of a glowing digital city grid at night. Bright nodes of light connected by luminous pathways. Color palette: Deep black, electric white, cobalt blue, gold. NO text, NO words, NO letters, NO logos. Bottom quarter fades to near-black.`;
  if (combined.includes("paid") || combined.includes("ppc") || combined.includes("ads")) return `Editorial photograph for a premium healthcare marketing blog article about paid advertising. Scene: A modern media buying war room with multiple screens showing campaign dashboards. Color palette: Deep charcoal, emerald green, amber, white. NO text, NO words, NO letters, NO logos. Bottom quarter fades to deep navy.`;
  if (combined.includes("social media") || combined.includes("content marketing")) return `Editorial photograph for a premium healthcare marketing blog article about social media. Scene: A beautifully styled creative studio with a light table, mood boards, and a sleek laptop. Color palette: Warm whites, sage green, wood tones, soft navy. NO text, NO words, NO letters, NO logos.`;
  if (combined.includes("patient") || combined.includes("admissions") || combined.includes("treatment") || combined.includes("behavioral health") || combined.includes("rehab")) return `Editorial photograph for a premium healthcare marketing blog about patient acquisition. Scene: A serene upscale behavioral health facility exterior at golden hour. Color palette: Warm gold, forest green, soft cream, navy shadows. NO text, NO words, NO letters, NO logos.`;
  if (combined.includes("web") || combined.includes("website") || combined.includes("design")) return `Editorial photograph for a premium healthcare marketing blog about web design. Scene: Top-down flat lay of a designer workspace with MacBook, color swatches, and wireframes on white marble. NO text, NO words, NO letters, NO logos.`;
  return `Editorial photograph for a premium healthcare marketing blog article. Scene: A sophisticated executive boardroom at dusk shot through floor-to-ceiling windows. Color palette: Deep navy, warm amber, charcoal, crisp white. NO text, NO words, NO letters, NO logos. Bottom quarter fades to deep navy.`;
}

async function uploadBinaryImage(bytes: Uint8Array, adminClient: ReturnType<typeof createClient>): Promise<string | null> {
  try {
    const filename = `blog-${Date.now()}.png`;
    const { data: uploadData, error: uploadError } = await adminClient.storage.from("public_bucket").upload(filename, bytes, { contentType: "image/png", upsert: true });
    if (uploadError) return null;
    const { data: urlData } = adminClient.storage.from("public_bucket").getPublicUrl(uploadData.path);
    return urlData.publicUrl;
  } catch { return null; }
}

async function generateHeroImage(prompt: string, adminClient: ReturnType<typeof createClient>): Promise<string | null> {
  const apiKey = Deno.env.get("chatgpt_api") || Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120_000);
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-image-2", prompt, n: 1, size: "1024x1024", quality: "medium", output_format: "png" }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return null;
    const binary = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    return await uploadBinaryImage(binary, adminClient);
  } catch { clearTimeout(timer); return null; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const secret = req.headers.get("x-webhook-secret");
    const expectedSecret = Deno.env.get("BLOG_WEBHOOK_SECRET");
    if (expectedSecret && secret !== expectedSecret) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const contentType = req.headers.get("content-type") || "";
    let markdownText = "";
    let imageBytes: Uint8Array | null = null;
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      markdownText = (formData.get("markdown") as string) || "";
      const imageFile = formData.get("hero_image_file");
      if (imageFile && imageFile instanceof File) { const buf = await imageFile.arrayBuffer(); imageBytes = new Uint8Array(buf); }
    } else {
      const body = await req.json();
      markdownText = body.markdown || "";
      if (body.hero_image_b64) { const base64Data = (body.hero_image_b64 as string).replace(/^data:image\/\w+;base64,/, "").trim(); imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0)); }
    }
    if (!markdownText) return new Response(JSON.stringify({ error: "No markdown content provided." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const parsedMeta = parseMarkdownPost(markdownText);
    let hero_image_url = parsedMeta.hero_image_url || "";
    let imageGenerated = false;
    if (imageBytes && imageBytes.length > 0 && !hero_image_url) {
      const uploadedUrl = await uploadBinaryImage(imageBytes, adminClient);
      if (uploadedUrl) { hero_image_url = uploadedUrl; imageGenerated = true; }
    }
    if (!hero_image_url) {
      const prompt = parsedMeta.image_prompt || buildAutoPrompt(parsedMeta.title, parsedMeta.excerpt, parsedMeta.category);
      const generatedUrl = await generateHeroImage(prompt, adminClient);
      if (generatedUrl) { hero_image_url = generatedUrl; imageGenerated = true; }
    }
    const dbPost = {
      title: parsedMeta.title, slug: parsedMeta.slug, content: JSON.stringify(parsedMeta.content),
      excerpt: parsedMeta.excerpt, author: parsedMeta.author, author_title: parsedMeta.author_title,
      author_bio: parsedMeta.author_bio, author_photo: parsedMeta.author_photo, read_time: parsedMeta.read_time,
      hero_image_url, tags: parsedMeta.tags, category: parsedMeta.category, status: "published",
      meta_description: parsedMeta.meta_description, featured: parsedMeta.featured, published_at: new Date().toISOString(),
    };
    const { error } = await adminClient.from("blog_posts").insert(dbPost);
    if (error) {
      if (error.code === "23505" || error.message.includes("duplicate key")) return new Response(JSON.stringify({ success: false, error: "Duplicate slug", slug: parsedMeta.slug }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ success: true, slug: parsedMeta.slug, title: parsedMeta.title, image_generated: imageGenerated, hero_image_url }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Webhook crashed: ${err instanceof Error ? err.message : String(err)}` }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

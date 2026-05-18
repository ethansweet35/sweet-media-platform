import { NextResponse } from "next/server";
import { fetchPageTextContent } from "@sweetmedia/admin-core/server";

interface GenerateSeoMetaRequest {
  type?: "page" | "post";
  // page fields
  page_title?: string;
  route_path?: string;
  // post fields
  title?: string;
  excerpt?: string;
  category?: string;
  // shared
  primary_keyword?: string;
  keyword?: string;
  /** Plain-text body snippet for richer context when title/excerpt are bland. */
  content_snippet?: string;
}

function buildPrompt(body: GenerateSeoMetaRequest): string {
  const isPost = body.type === 'post';
  const title = isPost ? (body.title ?? '') : (body.page_title ?? '');
  const keyword = (body.primary_keyword ?? body.keyword ?? '').trim();

  const keywordInstruction = keyword
    ? `Primary keyword: "${keyword}"
REQUIREMENT: The exact phrase "${keyword}" MUST appear verbatim in both seo_title and meta_description. Do not paraphrase or split it.`
    : `No primary keyword is set. Choose the single most relevant keyword phrase for this content, use it verbatim in seo_title and meta_description, and note it via natural placement.`;

  if (isPost) {
    const excerptLine = body.excerpt?.trim()
      ? `Article summary: ${body.excerpt.trim().slice(0, 400)}`
      : '';
    const categoryLine = body.category?.trim() ? `Category: ${body.category.trim()}` : '';
    const contentLine = body.content_snippet?.trim()
      ? `Article content (first ~800 chars for context):\n${body.content_snippet.trim().slice(0, 800)}`
      : '';

    return `You are an expert SEO copywriter. Generate optimized metadata for a blog post.

Current article title: ${title}
${categoryLine}
${excerptLine}
${contentLine}
${keywordInstruction}

Generate all THREE fields:
- "page_title": Human-facing article title (50–80 chars). Compelling headline, keyword included naturally. No brand name.
- "seo_title": HTML <title> tag (50–60 chars). Front-load the exact keyword phrase. No brand suffix. Descriptive and click-worthy.
- "meta_description": 140–160 chars. Must contain the exact keyword phrase. Compelling, ends with a soft CTA ("Learn more", "Get started", etc.)

Return ONLY valid JSON, no markdown fences:
{"page_title":"...","seo_title":"...","meta_description":"..."}`;
  }

  const crawledContent = body.content_snippet?.trim()
    ? `Page content (crawled from live site):\n${body.content_snippet.trim().slice(0, 800)}`
    : '';

  return `You are an expert SEO copywriter. Generate optimized metadata for a web page.

Current page title: ${title}
Route path: ${body.route_path ?? ''}
${crawledContent}
${keywordInstruction}

Generate all THREE fields:
- "page_title": Human-facing page title (3–7 words). Clear, specific to the page topic and location. No brand name.
- "seo_title": HTML <title> tag (50–60 chars). Front-load the exact keyword phrase. No brand suffix. Descriptive and click-worthy.
- "meta_description": 140–160 chars. Must contain the exact keyword phrase. Actionable, ends with a subtle CTA ("Call now", "Get help today", "Learn more", etc.)

Return ONLY valid JSON, no markdown fences:
{"page_title":"...","seo_title":"...","meta_description":"..."}`;
}


export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not set. Add it to your Vercel project environment variables." },
      { status: 500 },
    );
  }

  let body: GenerateSeoMetaRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const isPost = body.type === "post";
  const title = isPost ? body.title : body.page_title;
  if (!title?.trim()) {
    return NextResponse.json({ error: "title / page_title is required." }, { status: 400 });
  }

  // For page type: crawl the live site to extract content for richer AI context.
  if (!isPost && !body.content_snippet && body.route_path && process.env.NEXT_PUBLIC_SITE_URL) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
    const { text } = await fetchPageTextContent(`${siteUrl}${body.route_path}`);
    if (text) body = { ...body, content_snippet: text };
  }

  const prompt = buildPrompt(body);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://addictioninterventions.com",
      "X-Title": " Admin",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 400,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: `OpenRouter error: ${err.slice(0, 400)}` }, { status: 502 });
  }

  const data = await response.json();
  const raw: string = data?.choices?.[0]?.message?.content ?? "";

  let parsed: { page_title?: string | null; seo_title: string | null; meta_description: string };
  try {
    parsed = JSON.parse(raw.trim());
  } catch {
    const match = raw.match(/\{[\s\S]*"meta_description"[\s\S]*\}/);
    if (!match) {
      return NextResponse.json({ error: "AI returned an unexpected format.", raw }, { status: 502 });
    }
    try {
      parsed = JSON.parse(match[0]);
    } catch {
      return NextResponse.json({ error: "Could not parse AI response.", raw }, { status: 502 });
    }
  }

  return NextResponse.json({
    page_title: parsed.page_title ?? null,
    seo_title: parsed.seo_title ?? null,
    meta_description: parsed.meta_description ?? "",
  });
}

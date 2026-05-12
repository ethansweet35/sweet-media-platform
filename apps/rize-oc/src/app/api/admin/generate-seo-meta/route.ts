import { NextResponse } from "next/server";

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
}

function buildPrompt(body: GenerateSeoMetaRequest): string {
  const isPost = body.type === "post";
  const title = isPost ? (body.title ?? "") : (body.page_title ?? "");
  const keyword = (body.primary_keyword ?? body.keyword ?? "").trim();

  const keywordLine = keyword
    ? `Primary keyword to include naturally: "${keyword}"`
    : `No primary keyword is set — choose the most relevant keyword and include it naturally.`;

  if (isPost) {
    const excerptLine = body.excerpt?.trim()
      ? `Article summary: ${body.excerpt.trim().slice(0, 400)}`
      : "";
    const categoryLine = body.category?.trim() ? `Category: ${body.category.trim()}` : "";

    return `You are an expert SEO copywriter for a company (Rize OC). Generate optimized metadata for a blog post.

Current article title: ${title}
${categoryLine}
${excerptLine}
${keywordLine}

Generate all THREE fields:
- "page_title": The human-facing article title (50–80 chars). Improve the current title for clarity, search appeal, and keyword inclusion. Don't include brand name. Should read like a great blog headline.
- "seo_title": The HTML <title> tag (50–60 chars). Front-load the keyword, include "Rize OC" if space allows.
- "meta_description": 140–160 chars, compelling, includes the keyword naturally, ends with a soft CTA ("Learn more", "Get help today", etc.)

Return ONLY valid JSON, no markdown fences:
{"page_title":"...","seo_title":"...","meta_description":"..."}`;
  }

  return `You are an expert SEO copywriter for a company (Rize OC). Generate optimized metadata for the following page.

Current page title: ${title}
Route path: ${body.route_path ?? ""}
${keywordLine}

Generate all THREE fields:
- "page_title": The human-facing page title shown as the <h1> / admin row label (3–7 words). Improve the current title for clarity and keyword inclusion. Don't include brand name. Should be specific to the page topic and location if applicable.
- "seo_title": The HTML <title> tag (50–60 chars). Front-load the keyword, include "Rize OC" if space allows.
- "meta_description": 140–160 chars, actionable, includes the keyword, ends with a subtle CTA ("Call now", "Get help today", "Learn more", etc.)

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

  const prompt = buildPrompt(body);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://northboundtreatment.com",
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

import { NextResponse } from "next/server";

interface GenerateSeoMetaRequest {
  page_title: string;
  route_path: string;
  primary_keyword?: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not set in the environment." },
      { status: 500 },
    );
  }

  let body: GenerateSeoMetaRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { page_title, route_path, primary_keyword } = body;
  if (!page_title || !route_path) {
    return NextResponse.json({ error: "page_title and route_path are required." }, { status: 400 });
  }

  const keywordLine = primary_keyword?.trim()
    ? `Primary keyword to include naturally: "${primary_keyword.trim()}"`
    : `No primary keyword is set — choose the most relevant keyword for this page and include it naturally.`;

  const prompt = `You are an expert SEO copywriter. Generate an SEO title and meta description for the following web page.

Page title: ${page_title}
Route path: ${route_path}
${keywordLine}

Rules:
- SEO title: 50–60 characters, compelling, includes the keyword naturally, do NOT just repeat the page title verbatim.
- Meta description: 140–160 characters, actionable, includes the keyword, ends with a subtle CTA or value statement.
- Return ONLY valid JSON in this exact shape, no markdown fences, no extra keys:
{"seo_title":"...","meta_description":"..."}`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "",
      "X-Title": "Sweet Media Platform",
    },
    body: JSON.stringify({
      model: "anthropic/claude-sonnet-4-5",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: `OpenRouter error: ${err}` }, { status: 502 });
  }

  const data = await response.json();
  const raw = data?.choices?.[0]?.message?.content ?? "";

  let parsed: { seo_title: string; meta_description: string };
  try {
    parsed = JSON.parse(raw.trim());
  } catch {
    const match = raw.match(/\{[\s\S]*"seo_title"[\s\S]*"meta_description"[\s\S]*\}/);
    if (!match) {
      return NextResponse.json(
        { error: "AI returned an unexpected format.", raw },
        { status: 502 },
      );
    }
    parsed = JSON.parse(match[0]);
  }

  return NextResponse.json({
    seo_title: parsed.seo_title ?? "",
    meta_description: parsed.meta_description ?? "",
  });
}

export interface SeoGenInput {
  type: "page" | "post";
  title: string;
  route?: string;
  excerpt?: string;
  category?: string;
  keyword?: string;
  /** Plain-text snippet extracted from the post/page body, used for richer context when title/excerpt are bland. */
  content_snippet?: string;
}

export interface SeoGenResult {
  /**
   * AI-generated improved page title (the human-facing title — `<h1>` / row label).
   * Distinct from the SEO `<title>` tag which is `seo_title` below.
   */
  page_title: string | null;
  /** SEO `<title>` tag — typically includes brand suffix and is keyword-front-loaded. */
  seo_title: string | null;
  meta_description: string;
}

/**
 * Calls the app's own Next.js API route (auto-deployed with every Vercel push).
 * No separate edge function deployment needed.
 * Requires OPENROUTER_API_KEY to be set in the Vercel project's environment variables.
 */
export async function callGenerateSeoMetadata(input: SeoGenInput): Promise<SeoGenResult> {
  const res = await fetch("/api/admin/generate-seo-meta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: input.type,
      // page fields
      page_title: input.title,
      route_path: input.route,
      // post fields
      title: input.title,
      excerpt: input.excerpt,
      category: input.category,
      // shared
      keyword: input.keyword,
      content_snippet: input.content_snippet,
    }),
  });

  let body: Record<string, unknown>;
  try {
    body = (await res.json()) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid response from SEO generator");
  }

  if (!res.ok || body.error) {
    throw new Error(
      typeof body.error === "string" ? body.error.slice(0, 500) : `HTTP ${res.status}`,
    );
  }

  return {
    page_title: typeof body.page_title === "string" ? body.page_title : null,
    seo_title: typeof body.seo_title === "string" ? body.seo_title : null,
    meta_description: typeof body.meta_description === "string" ? body.meta_description : "",
  };
}

export interface SeoGenInput {
  type: "page" | "post";
  title: string;
  route?: string;
  excerpt?: string;
  category?: string;
  keyword?: string;
}

export interface SeoGenResult {
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
    seo_title: typeof body.seo_title === "string" ? body.seo_title : null,
    meta_description: typeof body.meta_description === "string" ? body.meta_description : "",
  };
}

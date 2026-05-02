import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SuggestionResult {
  url: string;
  title: string;
  description: string;
  source: "internal" | "web";
  score?: number;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

async function scrapeDDG(query: string): Promise<SuggestionResult[]> {
  const results: SuggestionResult[] = [];
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });
    if (!res.ok) return results;
    const html = await res.text();
    const resultPattern = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    const snippetPattern = /<a[^>]+class="result__snippet"[^>]*>([^<]*(?:<[^>]+>[^<]*)*)<\/a>/g;
    const links: Array<{ url: string; title: string }> = [];
    let match;
    while ((match = resultPattern.exec(html)) !== null && links.length < 8) {
      let href = match[1];
      const title = match[2].replace(/<[^>]+>/g, "").trim();
      if (href.startsWith("//duckduckgo.com/l/?")) {
        const uddg = href.match(/uddg=([^&]+)/);
        if (uddg) href = decodeURIComponent(uddg[1]);
      }
      if (href.startsWith("http") && !href.includes("duckduckgo.com")) {
        links.push({ url: href, title });
      }
    }
    const snippets: string[] = [];
    let snipMatch;
    while ((snipMatch = snippetPattern.exec(html)) !== null && snippets.length < 8) {
      snippets.push(snipMatch[1].replace(/<[^>]+>/g, "").trim());
    }
    for (let i = 0; i < links.length; i++) {
      results.push({
        url: links[i].url,
        title: links[i].title || links[i].url,
        description: snippets[i] || `Search result for: ${query}`,
        source: "web",
        score: 90 - i * 5,
      });
    }
  } catch (_e) {}
  return results;
}

async function findOnSameDomain(brokenUrl: string, anchorText: string): Promise<SuggestionResult[]> {
  const results: SuggestionResult[] = [];
  if (!brokenUrl) return results;
  const domain = extractDomain(brokenUrl);
  if (!domain) return results;
  const siteQuery = `site:${domain} ${anchorText}`;
  const domainResults = await scrapeDDG(siteQuery);
  return domainResults.slice(0, 3).map((r) => ({
    ...r,
    score: (r.score || 80) + 20,
    description: `[Same domain: ${domain}] ${r.description}`,
  }));
}

async function searchWeb(anchorText: string, brokenUrl: string): Promise<SuggestionResult[]> {
  const allResults: SuggestionResult[] = [];
  const seenUrls = new Set<string>();
  const addResults = (items: SuggestionResult[]) => {
    for (const item of items) {
      if (!seenUrls.has(item.url)) {
        seenUrls.add(item.url);
        allResults.push(item);
      }
    }
  };
  if (brokenUrl) {
    const sameDomainResults = await findOnSameDomain(brokenUrl, anchorText);
    addResults(sameDomainResults);
  }
  const directResults = await scrapeDDG(anchorText);
  addResults(directResults);
  if (allResults.length < 4) {
    const contextResults = await scrapeDDG(`${anchorText} official site`);
    addResults(contextResults);
  }
  if (allResults.length < 4) {
    const toolResults = await scrapeDDG(`${anchorText} marketing tool`);
    addResults(toolResults);
  }
  return allResults.slice(0, 6);
}

async function searchInternal(supabaseUrl: string, supabaseKey: string, anchorText: string, currentUrl: string): Promise<SuggestionResult[]> {
  const client = createClient(supabaseUrl, supabaseKey);
  const { data: posts, error } = await client.from("blog_posts").select("slug, title, meta_description, tags, category").eq("status", "published");
  if (error || !posts) return [];
  const query = anchorText.toLowerCase();
  const queryWords = query.split(/\s+/).filter((w) => w.length > 2);
  const scored = posts.map((post) => {
    const titleLower = (post.title || "").toLowerCase();
    const descLower = (post.meta_description || "").toLowerCase();
    const tagsLower = ((post.tags || []) as string[]).join(" ").toLowerCase();
    const catLower = (post.category || "").toLowerCase();
    let score = 0;
    if (titleLower.includes(query)) score += 100;
    if (descLower.includes(query)) score += 60;
    for (const word of queryWords) {
      if (titleLower.includes(word)) score += 20;
      if (descLower.includes(word)) score += 10;
      if (tagsLower.includes(word)) score += 15;
      if (catLower.includes(word)) score += 10;
    }
    return { post, score };
  }).filter((item) => item.score > 0 && `/blog/${item.post.slug}` !== currentUrl).sort((a, b) => b.score - a.score).slice(0, 4);
  return scored.map(({ post, score }) => ({
    url: `/blog/${post.slug}`,
    title: post.title,
    description: post.meta_description || `Internal blog post: ${post.title}`,
    source: "internal" as const,
    score,
  }));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const { anchorText, currentUrl, brokenUrl } = await req.json();
    if (!anchorText) {
      return new Response(JSON.stringify({ error: "anchorText is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const [internalResults, webResults] = await Promise.all([
      searchInternal(supabaseUrl, supabaseKey, anchorText, currentUrl || ""),
      searchWeb(anchorText, brokenUrl || currentUrl || ""),
    ]);
    const suggestions: SuggestionResult[] = [...internalResults, ...webResults];
    return new Response(JSON.stringify({ suggestions, debug: { anchorText, brokenUrl, webCount: webResults.length, internalCount: internalResults.length } }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

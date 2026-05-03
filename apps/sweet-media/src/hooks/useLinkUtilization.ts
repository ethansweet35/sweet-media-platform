import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { dbToBlogPost, type DbBlogPost } from "@sweetmedia/blog-core";
import { autoLinkText } from "@/lib/autoInternalLinks";
import type { InternalLink } from "@sweetmedia/admin-core";

export type UtilizationStatus = "linked" | "no_matches" | "blocked_overlap" | "blocked_deduped" | "blocked_limit";

export interface LinkUtilization {
  linkId: string;
  keyword: string;
  href: string;
  active: boolean;
  priority: number;
  totalPosts: number;
  postsWithKeyword: number;
  postsLinked: number;
  utilizationRate: number;
  blockReason: string | null;
  topPosts: { title: string; slug: string; linked: boolean }[];
}

function extractAllTextFromContent(contentJson: string): string {
  try {
    const sections = JSON.parse(contentJson);
    if (!Array.isArray(sections)) return "";
    return sections
      .map((s: { type?: string; text?: string; items?: string[] }) => {
        if (
          s.type === "paragraph" ||
          s.type === "h2" ||
          s.type === "h3" ||
          s.type === "pullquote" ||
          s.type === "callout"
        ) {
          return s.text || "";
        }
        if (s.type === "list" || s.type === "numbered") {
          return (s.items || []).join(" ");
        }
        return "";
      })
      .join(" ");
  } catch {
    return contentJson;
  }
}

export function useLinkUtilization(links: InternalLink[]) {
  const [utilization, setUtilization] = useState<LinkUtilization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeLinks = useMemo(() => links.filter((l) => l.active), [links]);

  const compute = useCallback(async () => {
    if (activeLinks.length === 0) {
      setUtilization([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: supaError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published");

      if (supaError) throw supaError;

      const posts = (data as DbBlogPost[] || []).map(dbToBlogPost);

      const postMeta = posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        tags: p.tags,
      }));

      const { buildAutoLinkMap } = await import("@/lib/autoInternalLinks");

      // Build the full competitive map with ALL manual mappings included
      const allManualMappings = activeLinks.map((l) => ({
        keyword: l.keyword,
        href: l.href,
        priority: l.priority,
      }));
      const competitiveMap = buildAutoLinkMap(postMeta, allManualMappings);

      // Check which keywords actually survived — all manual mappings now do,
      // so this is only relevant for auto-extracted phrases.
      const survivingKeywords = new Set(
        competitiveMap.map((m) => m.keyword.toLowerCase())
      );

      const results: LinkUtilization[] = activeLinks.map((link) => {
        const keywordLower = link.keyword.toLowerCase();

        // Is this keyword even in the final map? (manual mappings always are)
        const isInMap = survivingKeywords.has(keywordLower);

        let postsWithKeyword = 0;
        let postsLinked = 0;
        const topPosts: { title: string; slug: string; linked: boolean }[] = [];

        // The slug of the destination blog post (if this link points to a blog post).
        // We exclude it from matching — a post can't link to itself, so counting
        // it as a "match" would falsely show it as Blocked.
        const destSlug = link.href.startsWith("/blog/")
          ? link.href.replace("/blog/", "")
          : null;

        for (const post of posts) {
          // Skip the destination post itself — self-links are never created
          if (destSlug && post.slug === destSlug) continue;

          const allText = extractAllTextFromContent(
            typeof post.content === "string"
              ? post.content
              : JSON.stringify(post.content)
          );
          const textLower = allText.toLowerCase();
          const hasKeyword = textLower.includes(keywordLower);

          if (hasKeyword) {
            postsWithKeyword++;

            // Run the actual auto-linker and check if this href got linked
            const segments = autoLinkText(allText, competitiveMap, post.slug);
            const isLinked = segments.some(
              (seg) => seg.type === "link" && seg.href === link.href
            );

            if (isLinked) postsLinked++;

            if (topPosts.length < 5) {
              topPosts.push({ title: post.title, slug: post.slug, linked: isLinked });
            }
          }
        }

        const utilizationRate =
          postsWithKeyword > 0
            ? Math.round((postsLinked / postsWithKeyword) * 100)
            : 0;

        // Determine block reason
        let blockReason: string | null = null;
        if (postsWithKeyword > 0 && postsLinked === 0) {
          if (!isInMap) {
            blockReason = "This keyword was removed from the map — check for conflicts with static service page keywords.";
          } else {
            blockReason = "Keyword appears in posts but a higher-priority or longer mapping is winning the link slot at that position";
          }
        }

        return {
          linkId: link.id,
          keyword: link.keyword,
          href: link.href,
          active: link.active,
          priority: link.priority,
          totalPosts: posts.length,
          postsWithKeyword,
          postsLinked,
          utilizationRate,
          blockReason,
          topPosts,
        };
      });

      setUtilization(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to compute utilization"
      );
    } finally {
      setLoading(false);
    }
  }, [activeLinks]);

  useEffect(() => {
    compute();
  }, [compute]);

  return { utilization, loading, error, refetch: compute };
}

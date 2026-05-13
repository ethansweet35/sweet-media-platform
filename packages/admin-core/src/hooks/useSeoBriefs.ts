"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import type { SeoBriefRow } from "../types/seo-brief";
import type { BlogSection } from "@sweetmedia/blog-core";

/* ----------------------------- list hook ------------------------------ */

interface UseSeoBriefsState {
  rows: SeoBriefRow[];
  loading: boolean;
  error: string | null;
}

export function useSeoBriefs(): UseSeoBriefsState & {
  refresh: () => Promise<void>;
  createBrief: (keyword: string, model?: string) => Promise<SeoBriefRow | null>;
  removeBrief: (id: string) => Promise<boolean>;
} {
  const [state, setState] = useState<UseSeoBriefsState>({
    rows: [],
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { data, error } = await supabase
      .from("seo_briefs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      setState({ rows: [], loading: false, error: error.message });
      return;
    }
    setState({ rows: (data as SeoBriefRow[]) ?? [], loading: false, error: null });
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createBrief = useCallback(
    async (keyword: string, model?: string): Promise<SeoBriefRow | null> => {
      const cleaned = keyword.trim();
      if (!cleaned) return null;
      const res = await fetch("/api/admin/sweet-seo/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: cleaned, model }),
      });
      const json = (await res.json()) as { ok?: boolean; brief?: SeoBriefRow; error?: string };
      if (!res.ok || !json.ok || !json.brief) {
        setState((s) => ({ ...s, error: json.error ?? "Failed to start analysis." }));
        return null;
      }
      await refresh();
      return json.brief;
    },
    [refresh],
  );

  const removeBrief = useCallback(
    async (id: string): Promise<boolean> => {
      const { error } = await supabase.from("seo_briefs").delete().eq("id", id);
      if (error) {
        setState((s) => ({ ...s, error: error.message }));
        return false;
      }
      await refresh();
      return true;
    },
    [refresh],
  );

  return { ...state, refresh, createBrief, removeBrief };
}

/* ------------------------------ single brief --------------------------- */

interface UseSeoBriefState {
  brief: SeoBriefRow | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
}

export function useSeoBrief(id: string | null): UseSeoBriefState & {
  refresh: () => Promise<void>;
  saveDraft: (content: string) => Promise<void>;
  rerun: (model?: string) => Promise<void>;
} {
  const [state, setState] = useState<UseSeoBriefState>({
    brief: null,
    loading: !!id,
    error: null,
    saving: false,
  });

  const refresh = useCallback(async () => {
    if (!id) return;
    const { data, error } = await supabase
      .from("seo_briefs")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) {
      setState((s) => ({ ...s, loading: false, error: error.message }));
      return;
    }
    setState({
      brief: (data as SeoBriefRow | null) ?? null,
      loading: false,
      error: data ? null : "Brief not found.",
      saving: false,
    });
  }, [id]);

  useEffect(() => {
    if (!id) {
      setState({ brief: null, loading: false, error: null, saving: false });
      return;
    }
    void refresh();
  }, [id, refresh]);

  // Live updates: poll while status === 'processing'.
  useEffect(() => {
    if (!id) return;
    if (state.brief?.status !== "processing") return;
    const t = setInterval(() => {
      void refresh();
    }, 4000);
    return () => clearInterval(t);
  }, [id, state.brief?.status, refresh]);

  const saveDraft = useCallback(
    async (content: string) => {
      if (!id) return;
      setState((s) => ({ ...s, saving: true }));
      const { error } = await supabase
        .from("seo_briefs")
        .update({ draft_content: content, updated_at: new Date().toISOString() })
        .eq("id", id);
      setState((s) => ({
        ...s,
        saving: false,
        error: error ? error.message : null,
        brief: s.brief ? { ...s.brief, draft_content: content } : s.brief,
      }));
    },
    [id],
  );

  const rerun = useCallback(
    async (model?: string) => {
      if (!id || !state.brief) return;
      setState((s) => ({ ...s, saving: true }));
      const res = await fetch("/api/admin/sweet-seo/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: state.brief.keyword, model, briefId: id }),
      });
      setState((s) => ({ ...s, saving: false }));
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setState((s) => ({ ...s, error: json.error ?? `HTTP ${res.status}` }));
        return;
      }
      await refresh();
    },
    [id, refresh, state.brief],
  );

  return { ...state, refresh, saveDraft, rerun };
}

/* ----------------------- markdown brief export ------------------------- */

/**
 * Render a brief's targets as plain markdown — matches the Surfer .txt format
 * shown in `surfer-guidelines-*.txt`. Useful for piping into the blog writer
 * as `customInstructions`.
 */
export function briefToMarkdown(brief: SeoBriefRow): string {
  const lines: string[] = [];
  lines.push(`# Sweet SEO brief — ${brief.keyword}`);
  lines.push("");

  if (brief.content_structure) {
    const s = brief.content_structure;
    lines.push("## CONTENT STRUCTURE");
    lines.push(`* Characters: ${s.characters.min} - ${s.characters.max}`);
    lines.push(`* Images: ${s.images.min} - ${s.images.max}`);
    lines.push(`* Headings: ${s.headings.min} - ${s.headings.max}`);
    lines.push(
      `* Paragraphs: ${s.paragraphs.min} - ${s.paragraphs.max ?? "Infinity"}`,
    );
    lines.push(`* Words: ${s.words.min} - ${s.words.max}`);
    lines.push("");
  }

  if (brief.important_terms?.length) {
    lines.push("## IMPORTANT TERMS TO USE");
    lines.push("_Include each term within the stated occurrence range._");
    for (const t of brief.important_terms) {
      lines.push(`* ${t.term}: ${t.min} - ${t.max}`);
    }
    lines.push("");
  }

  if (brief.questions?.length) {
    lines.push("## QUESTIONS TO ANSWER");
    for (const q of brief.questions) {
      lines.push(`* ${q}`);
    }
    lines.push("");
  }

  if (brief.facts?.length) {
    lines.push("## FACTS TO INCLUDE");
    lines.push("_Facts are grouped by topic._");
    for (const group of brief.facts) {
      lines.push(`### ${group.topic}`);
      for (const point of group.points) {
        lines.push(`* ${point}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}

/* --------------------- linked blog post (by brief id) ------------------ */

export interface LinkedBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  meta_description: string | null;
  /** Raw `content` column — usually a JSON-stringified BlogSection[]. */
  content: string | null;
  focus_keyword: string | null;
}

/**
 * Find the blog post linked to a brief (`blog_posts.seo_brief_id = briefId`).
 * Returns the first match; we treat the brief→post relationship as 1:1.
 */
export function useLinkedBlogPost(briefId: string | null): {
  post: LinkedBlogPost | null;
  loading: boolean;
  refresh: () => Promise<void>;
} {
  const [post, setPost] = useState<LinkedBlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(!!briefId);

  const refresh = useCallback(async () => {
    if (!briefId) {
      setPost(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, category, meta_description, content, focus_keyword")
      .eq("seo_brief_id", briefId)
      .limit(1)
      .maybeSingle();
    setPost((data as LinkedBlogPost | null) ?? null);
    setLoading(false);
  }, [briefId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { post, loading, refresh };
}

/**
 * Convert a `blog_posts.content` value (BlogSection[] JSON or raw string)
 * into a markdown representation suitable for the brief draft textarea.
 *
 * Handles plain strings (treated as already-markdown), JSON-stringified
 * BlogSection[] arrays, and plain BlogSection[] values.
 */
export function blogContentToMarkdown(content: unknown): string {
  if (content === null || content === undefined) return "";

  let sections: BlogSection[] | null = null;
  if (typeof content === "string") {
    const trimmed = content.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed) as unknown;
        if (Array.isArray(parsed)) sections = parsed as BlogSection[];
      } catch {
        return trimmed;
      }
    } else {
      return trimmed;
    }
  } else if (Array.isArray(content)) {
    sections = content as BlogSection[];
  }

  if (!sections) return "";

  const out: string[] = [];
  for (const s of sections) {
    if (!s || typeof s !== "object") continue;
    const text = typeof s.text === "string" ? s.text.trim() : "";
    switch (s.type) {
      case "h2":
        if (text) out.push(`## ${text}`);
        break;
      case "h3":
        if (text) out.push(`### ${text}`);
        break;
      case "paragraph":
        if (text) out.push(text);
        break;
      case "pullquote":
      case "callout":
        if (text) out.push(`> ${text}`);
        break;
      case "list":
        if (s.items?.length) out.push(s.items.map((it) => `- ${it}`).join("\n"));
        break;
      case "numbered":
        if (s.items?.length) out.push(s.items.map((it, i) => `${i + 1}. ${it}`).join("\n"));
        break;
      case "stat-row":
        if (s.stats?.length) {
          out.push(s.stats.map((st) => `**${st.value}** ${st.label}`).join(" · "));
        }
        break;
      case "divider":
        out.push("---");
        break;
      case "table":
        if (s.tableHeaders?.length && s.tableRows?.length) {
          out.push(`| ${s.tableHeaders.join(" | ")} |`);
          out.push(`| ${s.tableHeaders.map(() => "---").join(" | ")} |`);
          for (const row of s.tableRows) {
            out.push(`| ${row.join(" | ")} |`);
          }
        }
        break;
      default:
        if (text) out.push(text);
        break;
    }
  }
  return out.join("\n\n").trim();
}

/** Convenience selector — same shape used by AdminBlogWriterPage when pre-filling. */
export function useBriefForWriter(briefId: string | null): {
  loading: boolean;
  primaryKeyword: string;
  customInstructions: string;
} {
  const [data, setData] = useState({ loading: !!briefId, primaryKeyword: "", customInstructions: "" });
  useEffect(() => {
    if (!briefId) {
      setData({ loading: false, primaryKeyword: "", customInstructions: "" });
      return;
    }
    let cancelled = false;
    void (async () => {
      const { data: row } = await supabase
        .from("seo_briefs")
        .select("*")
        .eq("id", briefId)
        .maybeSingle();
      if (cancelled) return;
      if (!row) {
        setData({ loading: false, primaryKeyword: "", customInstructions: "" });
        return;
      }
      const brief = row as SeoBriefRow;
      setData({
        loading: false,
        primaryKeyword: brief.keyword,
        customInstructions: briefToMarkdown(brief),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [briefId]);
  return useMemo(() => data, [data]);
}

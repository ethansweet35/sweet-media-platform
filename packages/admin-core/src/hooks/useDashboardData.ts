"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  computeContentScore,
  type SeoBriefRow,
  type SeoBriefStatus,
} from "../types/seo-brief";

const dateFmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

export interface DashboardStats {
  total: number;
  published: number;
  drafts: number;
  scheduled: number;
}

export interface RecentDraftRow {
  id: string;
  slug: string;
  title: string;
  created_at: string;
}

export interface UpcomingPublishRow {
  id: string;
  slug: string;
  title: string;
  scheduled_publish_at: string;
}

export interface DashboardSystemStatus {
  lastAutoPublishAt: string | null;
}

export interface DashboardSeoStats {
  /** Posts + pages whose linked brief is ready and has a computable score. */
  scored: number;
  /** Average computed Sweet SEO content score across all scored rows (rounded). */
  avgScore: number | null;
  /** Total active rows that *should* have a brief (published posts + active pages). */
  eligible: number;
  /** Active rows with a Sweet SEO brief linked. */
  linked: number;
  /** Rows where the writer has marked guidance as applied. */
  applied: number;
  /** Most recent brief.updated_at across all linked rows. */
  lastRefreshedAt: string | null;
}

type BlogScanRow = {
  id: string;
  status: string;
  scheduled_publish_at?: string | null;
  approved_for_publish?: boolean | null;
};

type PublishedProbe = {
  created_at: string;
  published_at: string | null;
};

export function formatDashboardDate(iso: string): string {
  try {
    return dateFmt.format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Relative English label ("3 hours ago") for timestamps in the past. */
export function relativeTimeSince(iso: string | null): string {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "—";
  const diffSec = Math.floor((Date.now() - t) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (diffSec >= 0 && diffSec < 45) return "just now";

  const steps: { unit: Intl.RelativeTimeFormatUnit; secs: number }[] = [
    { unit: "year", secs: 31536000 },
    { unit: "month", secs: 2629800 },
    { unit: "week", secs: 604800 },
    { unit: "day", secs: 86400 },
    { unit: "hour", secs: 3600 },
    { unit: "minute", secs: 60 },
    { unit: "second", secs: 1 },
  ];

  const past = Math.max(0, diffSec);
  for (const { unit, secs } of steps) {
    const interval = Math.floor(past / secs);
    if (interval >= 1) return rtf.format(-interval, unit);
  }
  return rtf.format(0, "second");
}

function computeStats(rows: BlogScanRow[] | null): DashboardStats {
  const list = rows ?? [];
  let published = 0;
  let drafts = 0;
  let scheduled = 0;

  for (const r of list) {
    if (r.status === "published") published++;
    else if (r.status === "draft") {
      drafts++;
      if (
        r.scheduled_publish_at != null &&
        String(r.scheduled_publish_at).length > 0 &&
        r.approved_for_publish === true
      ) {
        scheduled++;
      }
    }
  }

  return {
    total: list.length,
    published,
    drafts,
    scheduled,
  };
}

function pickLastCronishPublish(rows: PublishedProbe[] | null): string | null {
  if (!rows?.length) return null;
  const cutoffMs = 60 * 60 * 1000;
  for (const r of rows) {
    if (!r.published_at) continue;
    const pub = new Date(r.published_at).getTime();
    const cre = new Date(r.created_at).getTime();
    if (Number.isNaN(pub) || Number.isNaN(cre)) continue;
    if (pub >= cre + cutoffMs) return r.published_at;
  }
  return null;
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    published: 0,
    drafts: 0,
    scheduled: 0,
  });
  const [recentDrafts, setRecentDrafts] = useState<RecentDraftRow[]>([]);
  const [upcomingPublishes, setUpcomingPublishes] = useState<UpcomingPublishRow[]>([]);
  const [systemStatus, setSystemStatus] = useState<DashboardSystemStatus>({
    lastAutoPublishAt: null,
  });
  const [seoStats, setSeoStats] = useState<DashboardSeoStats>({
    scored: 0,
    avgScore: null,
    eligible: 0,
    linked: 0,
    applied: 0,
    lastRefreshedAt: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    const nowIso = new Date().toISOString();

    try {
      const [
        scanRes,
        draftsRes,
        upcomingRes,
        publishedRes,
        blogSeoRes,
        pageSeoRes,
      ] = await Promise.all([
        supabase
          .from("blog_posts")
          .select("id, status, scheduled_publish_at, approved_for_publish"),
        supabase
          .from("blog_posts")
          .select("id, slug, title, created_at")
          .eq("status", "draft")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("blog_posts")
          .select("id, slug, title, scheduled_publish_at")
          .eq("status", "draft")
          .eq("approved_for_publish", true)
          .gt("scheduled_publish_at", nowIso)
          .order("scheduled_publish_at", { ascending: true })
          .limit(5),
        supabase
          .from("blog_posts")
          .select("created_at, published_at")
          .eq("status", "published")
          .not("published_at", "is", null)
          .order("published_at", { ascending: false })
          .limit(80),
        supabase
          .from("blog_posts")
          .select("id, status, seo_brief_id, seo_guidance_applied")
          .eq("status", "published"),
        supabase
          .from("tracked_pages")
          .select("id, is_active, seo_brief_id, seo_guidance_applied")
          .eq("is_active", true),
      ]);

      const firstErr =
        scanRes.error ||
        draftsRes.error ||
        upcomingRes.error ||
        publishedRes.error;
      if (firstErr) throw firstErr;

      setStats(computeStats(scanRes.data as BlogScanRow[]));
      setRecentDrafts(((draftsRes.data ?? []) as RecentDraftRow[]) ?? []);
      setUpcomingPublishes(((upcomingRes.data ?? []) as UpcomingPublishRow[]) ?? []);
      setSystemStatus({
        lastAutoPublishAt: pickLastCronishPublish(publishedRes.data as PublishedProbe[]),
      });

      // Compose Sweet SEO stats across both tables.
      type SeoBag = {
        seo_brief_id: string | null;
        seo_guidance_applied: boolean | null;
      };
      const blogRows = (blogSeoRes.data ?? []) as SeoBag[];
      const pageRows = (pageSeoRes.data ?? []) as SeoBag[];
      const all = [...blogRows, ...pageRows];
      const briefIds = Array.from(
        new Set(all.map((r) => r.seo_brief_id).filter((v): v is string => !!v)),
      );

      let scoredVals: number[] = [];
      let lastRefreshed: string | null = null;
      if (briefIds.length > 0) {
        const { data: briefsData } = await supabase
          .from("seo_briefs")
          .select("id, status, draft_content, content_structure, important_terms, updated_at")
          .in("id", briefIds);
        const briefs = (briefsData ?? []) as Pick<
          SeoBriefRow,
          "id" | "status" | "draft_content" | "content_structure" | "important_terms" | "updated_at"
        >[];
        for (const b of briefs) {
          if ((b.status as SeoBriefStatus) === "ready") {
            const score = computeContentScore(
              b.draft_content ?? "",
              b.content_structure ?? null,
              b.important_terms ?? null,
            ).score;
            scoredVals.push(score);
          }
          if (b.updated_at) {
            if (!lastRefreshed || Date.parse(b.updated_at) > Date.parse(lastRefreshed)) {
              lastRefreshed = b.updated_at;
            }
          }
        }
      }

      const avg =
        scoredVals.length > 0
          ? Math.round(scoredVals.reduce((s, v) => s + v, 0) / scoredVals.length)
          : null;
      const linked = all.filter((r) => !!r.seo_brief_id).length;
      const applied = all.filter((r) => r.seo_guidance_applied === true).length;

      setSeoStats({
        scored: scoredVals.length,
        avgScore: avg,
        eligible: all.length,
        linked,
        applied,
        lastRefreshedAt: lastRefreshed,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return useMemo(
    () => ({
      stats,
      recentDrafts,
      upcomingPublishes,
      systemStatus,
      seoStats,
      loading,
      error,
      refetch: fetchAll,
    }),
    [
      stats,
      recentDrafts,
      upcomingPublishes,
      systemStatus,
      seoStats,
      loading,
      error,
      fetchAll,
    ],
  );
}

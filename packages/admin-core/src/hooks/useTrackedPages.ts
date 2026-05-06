"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { TrackedPage, TrackedPageInput, TrackedPageUpdates } from "../types/tracked-page";

type DbTrackedPageRow = {
  id: string;
  route_path: string;
  page_title: string;
  seo_title: string | null;
  meta_description: string | null;
  default_seo_title: string | null;
  default_meta_description: string | null;
  primary_keyword: string | null;
  is_active: boolean;
  display_order: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

function rowToPage(row: DbTrackedPageRow): TrackedPage {
  return {
    id: row.id,
    route_path: row.route_path,
    page_title: row.page_title,
    seo_title: row.seo_title,
    meta_description: row.meta_description,
    default_seo_title: row.default_seo_title ?? null,
    default_meta_description: row.default_meta_description ?? null,
    primary_keyword: row.primary_keyword,
    is_active: row.is_active,
    display_order: row.display_order,
    notes: row.notes,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function nextDisplayOrder(): Promise<number> {
  const { data } = await supabase
    .from("tracked_pages")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const row = data as { display_order: number } | null;
  const max = row?.display_order != null ? Number(row.display_order) : -1;
  return max + 1;
}

export function useTrackedPages() {
  const [pages, setPages] = useState<TrackedPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } = await supabase
        .from("tracked_pages")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (supaError) throw supaError;
      const rows = (data as DbTrackedPageRow[] | null) ?? [];
      setPages(rows.map(rowToPage));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tracked pages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const createPage = useCallback(
    async (input: TrackedPageInput): Promise<boolean> => {
      try {
        const display_order = await nextDisplayOrder();
        const { error: insertErr } = await supabase.from("tracked_pages").insert({
          route_path: input.route_path.trim(),
          page_title: input.page_title.trim(),
          seo_title: input.seo_title?.trim() ? input.seo_title.trim() : null,
          meta_description: input.meta_description?.trim() ? input.meta_description.trim() : null,
          primary_keyword: input.primary_keyword?.trim() ? input.primary_keyword.trim() : null,
          notes: input.notes?.trim() ? input.notes.trim() : null,
          is_active: input.is_active !== false,
          display_order,
        });
        if (insertErr) throw insertErr;
        await fetchPages();
        return true;
      } catch {
        return false;
      }
    },
    [fetchPages],
  );

  const updatePage = useCallback(
    async (id: string, updates: TrackedPageUpdates): Promise<boolean> => {
      try {
        const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
        if (updates.route_path !== undefined) row.route_path = String(updates.route_path).trim();
        if (updates.page_title !== undefined) row.page_title = String(updates.page_title).trim();
        if (updates.seo_title !== undefined)
          row.seo_title =
            updates.seo_title !== null && String(updates.seo_title).trim()
              ? String(updates.seo_title).trim()
              : null;
        if (updates.meta_description !== undefined)
          row.meta_description =
            updates.meta_description !== null && String(updates.meta_description).trim()
              ? String(updates.meta_description).trim()
              : null;
        if (updates.primary_keyword !== undefined)
          row.primary_keyword =
            updates.primary_keyword !== null && String(updates.primary_keyword).trim()
              ? String(updates.primary_keyword).trim()
              : null;
        if (updates.notes !== undefined)
          row.notes =
            updates.notes !== null && String(updates.notes).trim() ? String(updates.notes).trim() : null;
        if (updates.is_active !== undefined) row.is_active = updates.is_active;
        if (updates.display_order !== undefined) row.display_order = updates.display_order;

        const { error: updErr } = await supabase.from("tracked_pages").update(row).eq("id", id);
        if (updErr) throw updErr;
        await fetchPages();
        return true;
      } catch {
        return false;
      }
    },
    [fetchPages],
  );

  const deletePage = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const { error: delErr } = await supabase.from("tracked_pages").delete().eq("id", id);
        if (delErr) throw delErr;
        await fetchPages();
        return true;
      } catch {
        return false;
      }
    },
    [fetchPages],
  );

  const toggleActive = useCallback(
    async (id: string, currentValue: boolean): Promise<boolean> => {
      try {
        const next = !currentValue;
        const { error: updErr } = await supabase
          .from("tracked_pages")
          .update({ is_active: next, updated_at: new Date().toISOString() })
          .eq("id", id);
        if (updErr) throw updErr;
        await fetchPages();
        return true;
      } catch {
        return false;
      }
    },
    [fetchPages],
  );

  return {
    pages,
    loading,
    error,
    refetch: fetchPages,
    createPage,
    updatePage,
    deletePage,
    toggleActive,
  };
}

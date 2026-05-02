import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { dbRowToKbEntry, type DbKbRow, type KbEntry, type KbEntryInput } from "@/types/knowledge-base";

export type KbEntryUpdates = Partial<{
  title: string;
  category: string | null;
  content: string;
  tags: string[];
  is_active: boolean;
}>;

export function useKnowledgeBase() {
  const [entries, setEntries] = useState<KbEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } = await supabase
        .from("blog_knowledge_base")
        .select("*")
        .order("updated_at", { ascending: false });

      if (supaError) throw supaError;
      const rows = (data as DbKbRow[] | null) ?? [];
      setEntries(rows.map(dbRowToKbEntry));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load knowledge base entries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const createEntry = useCallback(
    async (data: KbEntryInput): Promise<boolean> => {
      try {
        const { error: insertErr } = await supabase.from("blog_knowledge_base").insert({
          title: data.title.trim(),
          category: data.category?.trim() ? data.category.trim() : null,
          content: data.content,
          tags: data.tags,
          is_active: data.is_active,
        });
        if (insertErr) throw insertErr;
        await fetchEntries();
        return true;
      } catch {
        return false;
      }
    },
    [fetchEntries]
  );

  const updateEntry = useCallback(
    async (id: string, updates: KbEntryUpdates): Promise<boolean> => {
      try {
        const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
        if (updates.title !== undefined)
          row.title = typeof updates.title === "string" ? updates.title.trim() : updates.title;
        if (updates.category !== undefined)
          row.category =
            updates.category && String(updates.category).trim()
              ? String(updates.category).trim()
              : null;
        if (updates.content !== undefined) row.content = updates.content;
        if (updates.tags !== undefined) row.tags = updates.tags;
        if (updates.is_active !== undefined) row.is_active = updates.is_active;

        const { error: updErr } = await supabase
          .from("blog_knowledge_base")
          .update(row)
          .eq("id", id);
        if (updErr) throw updErr;
        await fetchEntries();
        return true;
      } catch {
        return false;
      }
    },
    [fetchEntries]
  );

  const deleteEntry = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const { error: delErr } = await supabase.from("blog_knowledge_base").delete().eq("id", id);
        if (delErr) throw delErr;
        await fetchEntries();
        return true;
      } catch {
        return false;
      }
    },
    [fetchEntries]
  );

  const toggleActive = useCallback(
    async (id: string, currentValue: boolean): Promise<boolean> => {
      try {
        const next = !currentValue;
        const { error: updErr } = await supabase
          .from("blog_knowledge_base")
          .update({ is_active: next, updated_at: new Date().toISOString() })
          .eq("id", id);
        if (updErr) throw updErr;
        await fetchEntries();
        return true;
      } catch {
        return false;
      }
    },
    [fetchEntries]
  );

  return {
    entries,
    loading,
    error,
    refetch: fetchEntries,
    createEntry,
    updateEntry,
    deleteEntry,
    toggleActive,
  };
}

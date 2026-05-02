import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface InternalLink {
  id: string;
  keyword: string;
  href: string;
  priority: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export function useInternalLinks() {
  const [links, setLinks] = useState<InternalLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("internal_links")
      .select("*")
      .order("priority", { ascending: false });

    if (err) {
      setError(err.message);
    } else {
      setLinks(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const createLink = useCallback(async (link: Omit<InternalLink, "id" | "created_at" | "updated_at">) => {
    const { data, error: err } = await supabase
      .from("internal_links")
      .insert(link)
      .select()
      .single();

    if (err) {
      setError(err.message);
      return null;
    }
    setLinks((prev) => [data, ...prev]);
    return data as InternalLink;
  }, []);

  const updateLink = useCallback(async (id: string, updates: Partial<InternalLink>) => {
    const { data, error: err } = await supabase
      .from("internal_links")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (err) {
      setError(err.message);
      return false;
    }
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? (data as InternalLink) : l))
    );
    return true;
  }, []);

  const deleteLink = useCallback(async (id: string) => {
    const { error: err } = await supabase
      .from("internal_links")
      .delete()
      .eq("id", id);

    if (err) {
      setError(err.message);
      return false;
    }
    setLinks((prev) => prev.filter((l) => l.id !== id));
    return true;
  }, []);

  return {
    links,
    loading,
    error,
    refetch: fetchLinks,
    createLink,
    updateLink,
    deleteLink,
  };
}
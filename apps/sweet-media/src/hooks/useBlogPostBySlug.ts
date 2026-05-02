import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { dbToBlogPost, type BlogPost, type DbBlogPost } from "@/types/blog";

export function useBlogPostBySlug(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!slug) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (supaError) throw supaError;
      setPost(data ? dbToBlogPost(data as DbBlogPost) : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load post");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const savePost = useCallback(async (id: string, updates: Record<string, unknown>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
      await fetchPost();
      return true;
    } catch {
      return false;
    }
  }, [fetchPost]);

  return { post, loading, error, savePost, refetch: fetchPost };
}
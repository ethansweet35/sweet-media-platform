"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { dbToBlogPost, type BlogPost, type DbBlogPost } from "@sweetmedia/blog-core";

export function useAdminBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(5000);

      if (supaError) throw supaError;
      setPosts((data as DbBlogPost[] || []).map(dbToBlogPost));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      setPosts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch {
      return false;
    }
  }, []);

  const toggleStatus = useCallback(async (id: string, currentStatus: string): Promise<boolean> => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
      return true;
    } catch {
      return false;
    }
  }, []);

  const toggleApprovedForPublish = useCallback(
    async (id: string, currentValue: boolean): Promise<boolean> => {
      const next = !currentValue;
      try {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            approved_for_publish: next,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);
        if (error) throw error;
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, approved_for_publish: next } : p,
          ),
        );
        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  const toggleFeatured = useCallback(async (id: string, currentFeatured: boolean): Promise<boolean> => {
    try {
      // If setting as featured, unfeature all others first
      if (!currentFeatured) {
        await supabase
          .from("blog_posts")
          .update({ featured: false, updated_at: new Date().toISOString() })
          .eq("featured", true);
      }
      const { error } = await supabase
        .from("blog_posts")
        .update({ featured: !currentFeatured, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
      setPosts((prev) =>
        prev.map((p) => ({
          ...p,
          featured: p.id === id ? !currentFeatured : currentFeatured ? p.featured : false,
        }))
      );
      return true;
    } catch {
      return false;
    }
  }, []);

  const updatePost = useCallback(async (id: string, updates: Partial<DbBlogPost>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
      await fetchPosts();
      return true;
    } catch {
      return false;
    }
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    deletePost,
    toggleStatus,
    toggleApprovedForPublish,
    toggleFeatured,
    updatePost,
  };
}
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchBlogCategoryNames } from "../lib/fetchBlogCategoryNames";
import { supabase } from "../lib/supabase";
import { dbToBlogPost, type BlogPost, type DbBlogPost } from "../types/blog";

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID ?? "client-template";

export function useBlogPosts() {
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
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false });

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

  return { posts, loading, error, refetch: fetchPosts };
}

export function useBlogPost(slug: string | undefined, allowDrafts = false) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug);
        if (!allowDrafts) {
          query = query.eq("status", "published");
        }
        const { data, error: supaError } = await query.maybeSingle();

        if (supaError) throw supaError;
        if (data) {
          setPost(dbToBlogPost(data as DbBlogPost));
        } else {
          setPost(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, allowDrafts]);

  return { post, loading, error };
}

export function useBlogCategories() {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const names = await fetchBlogCategoryNames(supabase, {
          siteId: SITE_ID,
          siteKey: SITE_ID,
          includeFromPosts: false,
        });
        setCategories(["All", ...names]);
      } catch {
        setCategories(["All"]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { categories, loading };
}

export function usePaginatedBlogPosts(page: number, pageSize: number, category?: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        let query = supabase
          .from("blog_posts")
          .select("*", { count: "exact" })
          .eq("status", "published")
          .eq("featured", false)
          .order("published_at", { ascending: false, nullsFirst: false })
          .range(from, to);

        if (category && category !== "All") {
          query = query.eq("category", category);
        }

        const { data, count, error: supaError } = await query;
        if (supaError) throw supaError;
        setPosts((data as DbBlogPost[] || []).map(dbToBlogPost));
        setTotal(count ?? 0);
      } catch {
        setPosts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page, pageSize, category]);

  return { posts, total, loading };
}

export function useSearchBlogPosts(query: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setPosts([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("status", "published")
          .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
          .order("published_at", { ascending: false, nullsFirst: false });

        if (error) throw error;
        setPosts((data as DbBlogPost[] || []).map(dbToBlogPost));
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(search, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return { posts, loading };
}
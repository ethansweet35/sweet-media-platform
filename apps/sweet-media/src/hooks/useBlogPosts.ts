import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { dbToBlogPost, type BlogPost, type DbBlogPost } from "@sweetmedia/blog-core";

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
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("category")
          .eq("status", "published");

        if (error) throw error;
        const uniqueCats = Array.from(new Set((data || []).map((d) => d.category)));
        setCategories(["All", ...uniqueCats]);
      } catch {
        setCategories(["All", "SEO", "Paid Media", "Web Development", "Social Media", "Compliance", "Strategy"]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
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
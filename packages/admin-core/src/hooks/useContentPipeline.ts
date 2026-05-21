"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { dbToBlogPost, type BlogPost, type DbBlogPost } from "@sweetmedia/blog-core";
import type { BlogQueueItem } from "../types/blog-queue";
import {
  buildPipelineAttentionItems,
  groupPipelineCards,
  postToPipelineCard,
  queueToPipelineCard,
  type PipelineAttentionItem,
  type PipelineCard,
  type PipelineStageId,
} from "../lib/blogPipeline";

export function useContentPipeline() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [queue, setQueue] = useState<BlogQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [postsRes, queueRes] = await Promise.all([
        supabase
          .from("blog_posts")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(500),
        supabase
          .from("blog_queue")
          .select("*")
          .in("status", ["pending", "generating", "draft_ready", "failed"])
          .order("updated_at", { ascending: false })
          .limit(100),
      ]);

      if (postsRes.error) throw postsRes.error;
      if (queueRes.error) throw queueRes.error;

      setPosts(((postsRes.data ?? []) as DbBlogPost[]).map(dbToBlogPost));
      setQueue((queueRes.data ?? []) as BlogQueueItem[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load pipeline");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const cards = useMemo(() => {
    const postCards = posts.map(postToPipelineCard);
    const queueCards = queue.map(queueToPipelineCard);
    return [...postCards, ...queueCards];
  }, [posts, queue]);

  const cardsByStage = useMemo(() => groupPipelineCards(cards), [cards]);

  const attentionItems = useMemo(
    () => buildPipelineAttentionItems(posts, queue),
    [posts, queue],
  );

  return useMemo(
    () => ({
      posts,
      queue,
      cards,
      cardsByStage,
      attentionItems,
      loading,
      error,
      refetch: fetchAll,
    }),
    [posts, queue, cards, cardsByStage, attentionItems, loading, error, fetchAll],
  );
}

export type { PipelineCard, PipelineStageId, PipelineAttentionItem };

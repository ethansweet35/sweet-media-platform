export interface BlogQueueItem {
  id: string;
  primary_keyword: string;
  blog_title: string;
  url_slug: string;
  writing_guidelines: string | null;
  scheduled_publish_at: string;
  status: "pending" | "generating" | "draft_ready" | "published" | "failed";
  generated_post_id: string | null;
  error_message: string | null;
  /** OpenRouter model id; null uses edge function default. */
  model_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogQueueItemInput {
  primary_keyword: string;
  blog_title: string;
  url_slug: string;
  writing_guidelines: string | null;
  scheduled_publish_at: string;
}

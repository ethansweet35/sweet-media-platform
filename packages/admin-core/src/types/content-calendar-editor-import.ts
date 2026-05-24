export interface CalendarEditorSourceRow {
  editor_id: string;
  primary_keyword: string;
  status: string;
  blog_post_id: string | null;
  blog_slug: string | null;
  blog_title: string | null;
  draft_word_count: number;
  has_draft_body: boolean;
  already_queued: boolean;
  brief_href: string;
}

export interface ImportFromEditorsInput {
  editor_id: string;
  scheduled_publish_at: string;
}

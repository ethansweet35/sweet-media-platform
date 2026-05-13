export interface TrackedPage {
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
  /** Linked Content Editor row (mirrors tracked_pages.content_editor_id). */
  content_editor_id?: string | null;
  /** Live URL where this tracked page is published — used by AI optimize runs. */
  published_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface TrackedPageInput {
  route_path: string;
  page_title: string;
  seo_title: string | null;
  meta_description: string | null;
  primary_keyword: string | null;
  notes: string | null;
  is_active?: boolean;
}

export type TrackedPageUpdates = Partial<{
  route_path: string;
  page_title: string;
  seo_title: string | null;
  meta_description: string | null;
  primary_keyword: string | null;
  notes: string | null;
  is_active: boolean;
  display_order: number;
  published_url: string | null;
  content_editor_id: string | null;
}>;

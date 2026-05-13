import type { SeoBriefRowFields } from "./seo-brief";

export interface TrackedPage extends SeoBriefRowFields {
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
  /** Linked content editor (replaces seo_brief_id for new flows). */
  content_editor_id?: string | null;
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
  seo_brief_id: string | null;
  seo_guidance_applied: boolean;
  published_url: string | null;
  content_editor_id: string | null;
}>;

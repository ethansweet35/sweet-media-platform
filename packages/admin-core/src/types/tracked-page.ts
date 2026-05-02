export interface TrackedPage {
  id: string;
  route_path: string;
  page_title: string;
  seo_title: string | null;
  meta_description: string | null;
  primary_keyword: string | null;
  is_active: boolean;
  display_order: number;
  notes: string | null;
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
}>;

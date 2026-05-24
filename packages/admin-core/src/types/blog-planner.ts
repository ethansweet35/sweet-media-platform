export const BLOG_PLANNER_MISC_ROUTE = "__blog-planner-misc__";

export type BlogPlannerItemSource = "semrush" | "ai" | "manual";
export type BlogPlannerItemStatus = "idea" | "content_editor" | "published" | "dismissed";

export interface BlogPlannerHub {
  id: string;
  route_path: string;
  page_title: string;
  primary_keyword: string | null;
  is_blog_hub: boolean;
  is_blog_hub_misc: boolean;
  blog_hub_target_count: number | null;
}

/** Aggregated planner counts returned with GET /api/admin/blog-planner/hubs */
export interface BlogPlannerHubStats {
  ideas: number;
  inContentEditor: number;
  published: number;
  attached: number;
  totalSupporting: number;
  percentOfTarget: number | null;
}

export interface BlogPlannerHubWithStats extends BlogPlannerHub {
  stats: BlogPlannerHubStats;
}

export interface BlogPlannerItem {
  id: string;
  hub_tracked_page_id: string;
  source: BlogPlannerItemSource;
  primary_keyword: string;
  suggested_title: string;
  suggested_meta_description: string | null;
  suggested_h1: string | null;
  search_volume: number | null;
  keyword_difficulty: number | null;
  cpc: number | null;
  status: BlogPlannerItemStatus;
  content_editor_id: string | null;
  blog_post_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPlannerHubLink {
  id: string;
  hub_tracked_page_id: string;
  content_editor_id: string | null;
  blog_post_id: string | null;
  created_at: string;
  content_editor?: { id: string; primary_keyword: string; status: string } | null;
  blog_post?: { id: string; title: string; slug: string; status: string } | null;
}

export interface BlogPlannerCoverage {
  target: number | null;
  ideas: number;
  inContentEditor: number;
  published: number;
  totalSupporting: number;
  percentOfTarget: number | null;
}

export interface BlogPlannerDiscoverResponse {
  ok: boolean;
  semrushInserted: number;
  aiInserted: number;
  error?: string;
}

export interface BlogPlannerHubDetailResponse {
  ok: boolean;
  hub: BlogPlannerHub | null;
  items: BlogPlannerItem[];
  links: BlogPlannerHubLink[];
  coverage: BlogPlannerCoverage;
  error?: string;
}

import type { ContentEntityType } from "../lib/contentChangeLog";

export type ContentChangeLogRow = {
  id: string;
  entity_type: ContentEntityType;
  entity_id: string;
  route_path: string;
  field_key: string;
  field_label: string;
  summary: string;
  old_value: string | null;
  new_value: string | null;
  changed_by: string | null;
  created_at: string;
};

export type PerformanceKeywordRow = {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
  clicks_delta?: number;
  impressions_prev?: number;
};

export type PerformancePageMover = {
  page: string;
  path: string;
  clicks: number;
  clicks_delta: number;
};

export type PerformanceOverviewPayload = {
  ok: true;
  period_days: number;
  date_ranges: { current: { start: string; end: string }; previous: { start: string; end: string } };
  needs_oauth: boolean;
  no_gsc_data?: boolean;
  connected_email?: string | null;
  summary: {
    current: { clicks: number; impressions: number; ctr: number; position: number };
    previous: { clicks: number; impressions: number; ctr: number; position: number };
    deltas: {
      clicks: number;
      clicksPct: number | null;
      impressions: number;
      impressionsPct: number | null;
      position: number;
      positionDelta: number;
    };
  } | null;
  daily: { date: string; clicks: number; impressions: number }[];
  emerging_keywords: PerformanceKeywordRow[];
  lost_keywords: PerformanceKeywordRow[];
  top_query_movers: PerformanceKeywordRow[];
  top_page_movers: PerformancePageMover[];
  recent_changes: ContentChangeLogRow[];
};

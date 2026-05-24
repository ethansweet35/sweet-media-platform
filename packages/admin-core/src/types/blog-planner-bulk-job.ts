export type BlogPlannerBulkJobStatus = "running" | "completed" | "cancelled";

export interface BlogPlannerBulkJobLogEntry {
  itemId: string;
  keyword: string;
  ok: boolean;
  skipped?: boolean;
  error?: string;
  editorId?: string;
}

export interface BlogPlannerBulkJob {
  id: string;
  hub_tracked_page_id: string | null;
  status: BlogPlannerBulkJobStatus;
  item_ids: string[];
  total: number;
  completed: number;
  current_keyword: string | null;
  logs: BlogPlannerBulkJobLogEntry[];
  created_at: string;
  updated_at: string;
}

export interface BlogPlannerBulkJobActiveResponse {
  ok: boolean;
  job: BlogPlannerBulkJob | null;
  error?: string;
}

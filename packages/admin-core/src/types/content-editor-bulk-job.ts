export type ContentEditorBulkJobStatus = "running" | "completed" | "cancelled";

export type ContentEditorBulkPublishTarget = "blog" | "page";

export interface ContentEditorBulkJobItem {
  keyword: string;
  /** Page mode: marketing route, e.g. /about */
  route_path?: string | null;
  tracked_page_id?: string | null;
}

export interface ContentEditorBulkJobLogEntry {
  keyword: string;
  route_path?: string | null;
  ok: boolean;
  error?: string;
  editorId?: string;
  blogSlug?: string;
}

export interface ContentEditorBulkJob {
  id: string;
  publish_target: ContentEditorBulkPublishTarget;
  analysis_mode: "lite" | "deep";
  status: ContentEditorBulkJobStatus;
  items: ContentEditorBulkJobItem[];
  total: number;
  completed: number;
  current_keyword: string | null;
  logs: ContentEditorBulkJobLogEntry[];
  created_at: string;
  updated_at: string;
}

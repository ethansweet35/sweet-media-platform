/** Shared column layout for Blog Posts and Pages admin tables. */

export const CONTENT_TABLE_BASE_COLUMNS = [
  "check",
  "wordCount",
  "route",
  "title",
  "seoTitle",
  "metaDesc",
  "keyword",
  "gsc",
  "contentEditor",
  "status",
  "lastUpdated",
  "date",
  "actions",
] as const;

export type ContentTableBaseColumn = (typeof CONTENT_TABLE_BASE_COLUMNS)[number];
export type ContentTableColumn = ContentTableBaseColumn | "image";

export const CONTENT_TABLE_COLUMN_LABELS: Record<ContentTableColumn, string> = {
  check: "",
  image: "Image",
  wordCount: "Words",
  route: "Route",
  title: "Title",
  seoTitle: "SEO Title",
  metaDesc: "Meta Description",
  keyword: "Primary Keyword",
  gsc: "GSC (28d)",
  contentEditor: "Content Editor",
  status: "Status",
  lastUpdated: "Last updated",
  date: "Date",
  actions: "Actions",
};

export const DEFAULT_CONTENT_COL_WIDTHS: Record<ContentTableColumn, number> = {
  check: 48,
  image: 72,
  wordCount: 90,
  route: 200,
  title: 280,
  seoTitle: 220,
  metaDesc: 280,
  keyword: 260,
  gsc: 112,
  contentEditor: 340,
  status: 130,
  lastUpdated: 120,
  date: 140,
  actions: 220,
};

export function getContentTableColumns(includeImage: boolean): ContentTableColumn[] {
  if (!includeImage) return [...CONTENT_TABLE_BASE_COLUMNS];
  return [
    "check",
    "image",
    "wordCount",
    "route",
    "title",
    "seoTitle",
    "metaDesc",
    "keyword",
    "gsc",
    "contentEditor",
    "status",
    "lastUpdated",
    "date",
    "actions",
  ];
}

export function contentTableColSpan(includeImage: boolean): number {
  return getContentTableColumns(includeImage).length;
}

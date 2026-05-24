import type { PageContentFieldType } from "../../lib/server/pageContentOverrides";

export type { PageContentFieldType };

/**
 * In-memory representation of a pending edit (text change or image swap)
 * that hasn't been persisted to the database yet. Lives in
 * PageEditorContext so the floating toolbar can show a dirty-field count
 * and the Save Draft / Publish buttons know what to send.
 */
export interface PendingEdit {
  routePath: string;
  fieldKey: string;
  fieldType: PageContentFieldType;
  value: string;
  originalValue: string | null;
}

/** Optimistic snapshot used by EditableText / EditableImage clients. */
export interface FieldSnapshot {
  draftValue: string | null;
  publishedValue: string | null;
  defaultValue: string;
}

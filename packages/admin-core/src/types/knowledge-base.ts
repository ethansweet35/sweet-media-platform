export interface KbEntry {
  id: string;
  title: string;
  category: string | null;
  content: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** Payload for inserting a new KB row (DB sets id and timestamps). */
export interface KbEntryInput {
  title: string;
  category: string | null;
  content: string;
  tags: string[];
  is_active: boolean;
}

export interface DbKbRow {
  id: string;
  title: string;
  category: string | null;
  content: string;
  tags: unknown;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

function normalizeTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string");
}

export function dbRowToKbEntry(row: DbKbRow): KbEntry {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    content: row.content ?? "",
    tags: normalizeTags(row.tags),
    is_active: !!row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

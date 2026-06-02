/**
 * Admin product changelog — shown on the dashboard "What's new" feed.
 *
 * Entries are generated automatically from git history (packages/admin-core)
 * on every build/dev via scripts/generate-admin-changelog.mjs.
 *
 * To add tips or deep links for a specific entry, edit adminChangelog.enrichments.json
 * keyed by entry id (e.g. "2026-06-01-marketing-report").
 */

export type AdminChangelogCategory = "new" | "improved" | "fix";

export interface AdminChangelogEntry {
  id: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  title: string;
  summary: string;
  category: AdminChangelogCategory;
  /** Optional deep link into the admin app */
  href?: string;
  hrefLabel?: string;
  /** Short how-to bullets for the team */
  tips?: string[];
}

export const ADMIN_CHANGELOG_CATEGORY_LABEL: Record<AdminChangelogCategory, string> = {
  new: "New",
  improved: "Improved",
  fix: "Fix",
};

import { ADMIN_CHANGELOG_GENERATED } from "./adminChangelog.generated";

/** Newest first — auto-generated from git; see scripts/generate-admin-changelog.mjs */
export const ADMIN_CHANGELOG: AdminChangelogEntry[] = ADMIN_CHANGELOG_GENERATED;

const MS_PER_DAY = 86_400_000;

export function parseChangelogDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function formatChangelogDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(parseChangelogDate(iso));
  } catch {
    return iso;
  }
}

/** Entries within the last N days (default 60), newest first. */
export function getRecentAdminChangelog(days = 60, maxEntries = 12): AdminChangelogEntry[] {
  const cutoff = Date.now() - days * MS_PER_DAY;
  return ADMIN_CHANGELOG.filter((e) => parseChangelogDate(e.date).getTime() >= cutoff).slice(
    0,
    maxEntries,
  );
}

/**
 * Curated admin product changelog — shown on the dashboard for the team.
 *
 * Add an entry here whenever you ship admin features, UX changes, or fixes
 * Jake and Sean should know about. Keep newest first. Use ISO dates (YYYY-MM-DD).
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

/** Newest first — maintain this order when adding entries. */
export const ADMIN_CHANGELOG: AdminChangelogEntry[] = [
  {
    id: "2026-05-21-seo-impact-timeline",
    date: "2026-05-21",
    category: "new",
    title: "SEO impact timeline (hover on GSC column)",
    summary:
      "Hover the pulse icon next to GSC metrics on any page or blog row to see a timeline of recent SEO/content changes and period-over-period clicks, impressions, and ranking movement.",
    href: "/admin/pages",
    hrefLabel: "Pages",
    tips: [
      "Changes are logged automatically when you edit SEO fields, keywords, titles, or post content.",
      "Requires Search Console connected; compares last 28 days vs the prior 28 days.",
      "Run the content_change_log migration on each Supabase project if the timeline is empty after edits.",
    ],
  },
  {
    id: "2026-05-20-whats-new-dashboard",
    date: "2026-05-20",
    category: "new",
    title: "Dashboard “What’s new” feed",
    summary:
      "The admin home page now lists recent platform updates at the top so Jake and Sean can see new tools and workflows without digging through commits.",
    href: "/admin",
    hrefLabel: "Dashboard",
    tips: ["Check this section after each deploy for how to use new features."],
  },
  {
    id: "2026-05-20-page-keyword-seeds",
    date: "2026-05-20",
    category: "improved",
    title: "Smarter keyword suggestions on Pages",
    summary:
      "Semrush suggest prioritizes the URL slug and page title, then enriches the seed with SEO title, meta description, and live page body content so suggestions stay page-specific with full context.",
    href: "/admin/pages",
    hrefLabel: "Pages",
    tips: [
      "Open the chart icon in the Primary Keyword column on any page row.",
      "Distinctive URLs merge slug + title; SEO/meta/body refine the seed on the server.",
    ],
  },
  {
    id: "2026-05-20-page-word-count",
    date: "2026-05-20",
    category: "fix",
    title: "Page word counts load reliably",
    summary:
      "Word counts on the Pages table are fetched server-side, fixing CORS errors and red “Err” badges when analyzing live pages.",
    href: "/admin/pages",
    hrefLabel: "Pages",
  },
  {
    id: "2026-05-20-blogs-pages-layout",
    date: "2026-05-20",
    category: "improved",
    title: "Unified Blogs & Pages list layout",
    summary:
      "Blog Posts and Pages share the same table chrome: stats row, search, status filters, bulk actions, pagination, and matching columns (Pages omit featured image).",
    href: "/admin/blogs",
    hrefLabel: "Blog Posts",
    tips: ["Use filter pills for All / Active / Inactive on Pages; status + category on Blogs."],
  },
  {
    id: "2026-05-19-blog-writer-instructions",
    date: "2026-05-19",
    category: "new",
    title: "Blog Writer custom instructions + Content Editor sync",
    summary:
      "Upload or drop a .txt brief on Blog Writer, or sync from a ready Content Editor brief. Opening Blog Writer with ?content_editor_id= pre-fills topic, keyword, and word count.",
    href: "/admin/blog-writer",
    hrefLabel: "Blog Writer",
    tips: [
      "From a ready Content Editor brief, use the “Blog Writer” button to jump over with context.",
      "Custom instructions are included in the AI generation prompt.",
    ],
  },
  {
    id: "2026-05-19-admin-redesign",
    date: "2026-05-19",
    category: "improved",
    title: "Admin visual refresh (navy + periwinkle)",
    summary:
      "Sidebar, top bar, tables, modals, and forms across admin use the shared Sweet Media palette and typography for a consistent experience on every client site.",
    tips: ["Press ⌘K (Mac) or Ctrl+K (Windows) anywhere in admin to open quick navigation."],
  },
  {
    id: "2026-05-18-dashboard-pipeline",
    date: "2026-05-18",
    category: "new",
    title: "Content pipeline on the dashboard",
    summary:
      "Home shows needs-attention items, a compact kanban by stage, stage counts, and auto-publish status so you can triage drafts without opening the full pipeline view.",
    href: "/admin/blogs?view=pipeline",
    hrefLabel: "Full pipeline",
  },
  {
    id: "2026-05-17-content-editor",
    date: "2026-05-17",
    category: "improved",
    title: "Content Editor (SERP + competitor scoring)",
    summary:
      "Build and score page briefs with SERP data, competitor scraping, entity terms, and draft scoring. Link briefs to Pages rows and run AI optimize from the editor.",
    href: "/admin/content-editor",
    hrefLabel: "Content Editor",
  },
  {
    id: "2026-05-16-keyword-research",
    date: "2026-05-16",
    category: "improved",
    title: "Keyword Research (Semrush)",
    summary:
      "Dedicated keyword research view plus inline Semrush suggest on blog and page rows (volume, KD, CPC). Bulk “pick keyword” for multiple pages.",
    href: "/admin/keyword-research",
    hrefLabel: "Keyword Research",
  },
  {
    id: "2026-05-15-gsc-pages",
    date: "2026-05-15",
    category: "improved",
    title: "Search Console on Pages & Blogs",
    summary:
      "Connect Google Search Console once per site to see clicks, impressions, and top queries per URL in the table. Ranking keywords popover on each route.",
    href: "/admin/search-console",
    hrefLabel: "Search Console",
  },
];

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

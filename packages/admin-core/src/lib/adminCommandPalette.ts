import { ADMIN_NAV_GROUPS } from "./adminNav";

export type CommandPaletteGroup = "Navigate" | "Actions" | "Blog posts" | "Pages";

export interface CommandPaletteItem {
  id: string;
  label: string;
  subtitle?: string;
  href: string;
  icon: string;
  group: CommandPaletteGroup;
  /** Extra strings to match against the search query */
  keywords?: string[];
}

/** Static palette entries — nav routes + common workflows */
export function buildStaticCommandItems(): CommandPaletteItem[] {
  const items: CommandPaletteItem[] = [];

  for (const navGroup of ADMIN_NAV_GROUPS) {
    for (const item of navGroup.items) {
      items.push({
        id: `nav-${item.href}`,
        label: item.label,
        subtitle: navGroup.label,
        href: item.href,
        icon: item.icon,
        group: "Navigate",
        keywords: [navGroup.label, item.shortLabel ?? "", item.href],
      });
    }
  }

  const actions: Omit<CommandPaletteItem, "id">[] = [
    {
      label: "Write a new blog post",
      subtitle: "Open Blog Writer",
      href: "/admin/blog-writer",
      icon: "ri-quill-pen-line",
      group: "Actions",
      keywords: ["create", "generate", "ai", "draft"],
    },
    {
      label: "View content pipeline",
      subtitle: "Kanban board of all posts",
      href: "/admin/blogs?view=pipeline",
      icon: "ri-kanban-view",
      group: "Actions",
      keywords: ["kanban", "workflow", "stages"],
    },
    {
      label: "Add to content calendar",
      subtitle: "Queue a post for generation",
      href: "/admin/content-calendar",
      icon: "ri-calendar-schedule-line",
      group: "Actions",
      keywords: ["queue", "schedule", "batch"],
    },
    {
      label: "Research keywords",
      subtitle: "Semrush keyword overview",
      href: "/admin/keyword-research",
      icon: "ri-search-eye-line",
      group: "Actions",
      keywords: ["semrush", "seo", "volume"],
    },
    {
      label: "Run link health scan",
      subtitle: "Check broken internal & external links",
      href: "/admin/link-health",
      icon: "ri-shield-check-line",
      group: "Actions",
      keywords: ["broken", "404", "crawl"],
    },
    {
      label: "Check indexing status",
      subtitle: "Google indexing API",
      href: "/admin/indexing-status",
      icon: "ri-radar-line",
      group: "Actions",
      keywords: ["google", "index", "gsc"],
    },
    {
      label: "Edit brand settings",
      subtitle: "Colors, fonts, contact info",
      href: "/admin/brand-settings",
      icon: "ri-building-2-line",
      group: "Actions",
      keywords: ["brand", "logo", "colors"],
    },
    {
      label: "View public blog",
      subtitle: "Open /blog on the live site",
      href: "/blog",
      icon: "ri-global-line",
      group: "Actions",
      keywords: ["preview", "live", "public"],
    },
  ];

  for (const action of actions) {
    items.push({ ...action, id: `action-${action.href}` });
  }

  return items;
}

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}

function scoreItem(item: CommandPaletteItem, query: string): number {
  if (!query) return item.group === "Actions" ? 1 : 2;

  const haystacks = [
    item.label,
    item.subtitle ?? "",
    item.href,
    ...(item.keywords ?? []),
  ].map((s) => s.toLowerCase());

  let score = 0;
  for (const hay of haystacks) {
    if (hay === query) score += 100;
    else if (hay.startsWith(query)) score += 50;
    else if (hay.includes(query)) score += 20;
    else {
      const words = query.split(/\s+/).filter(Boolean);
      if (words.every((w) => hay.includes(w))) score += 12;
    }
  }
  return score;
}

const GROUP_ORDER: CommandPaletteGroup[] = ["Actions", "Blog posts", "Pages", "Navigate"];

export function filterCommandItems(
  items: CommandPaletteItem[],
  query: string,
  limit = 12,
): CommandPaletteItem[] {
  const q = normalizeQuery(query);
  if (!q) {
    return items
      .filter((item) => item.group === "Navigate" || item.group === "Actions")
      .slice(0, limit);
  }

  return items
    .map((item) => ({ item, score: scoreItem(item, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.label.localeCompare(b.item.label))
    .slice(0, limit)
    .map(({ item }) => item);
}

export function groupCommandResults(items: CommandPaletteItem[]): [CommandPaletteGroup, CommandPaletteItem[]][] {
  const buckets = new Map<CommandPaletteGroup, CommandPaletteItem[]>();
  for (const item of items) {
    const list = buckets.get(item.group) ?? [];
    list.push(item);
    buckets.set(item.group, list);
  }
  return GROUP_ORDER.filter((g) => buckets.has(g)).map((g) => [g, buckets.get(g)!]);
}

export function blogPostToCommandItem(post: {
  id: string;
  title: string;
  slug: string;
  status?: string;
}): CommandPaletteItem {
  const isDraft = post.status === "draft";
  return {
    id: `post-${post.id}`,
    label: post.title,
    subtitle: isDraft ? `Draft · /${post.slug}` : `Published · /${post.slug}`,
    href: `/admin/blog-edit/${encodeURIComponent(post.slug)}`,
    icon: isDraft ? "ri-draft-line" : "ri-article-line",
    group: "Blog posts",
    keywords: [post.slug, post.status ?? ""],
  };
}

export function trackedPageToCommandItem(page: {
  id: string;
  page_title: string;
  route_path: string;
}): CommandPaletteItem {
  return {
    id: `page-${page.id}`,
    label: page.page_title,
    subtitle: page.route_path,
    href: "/admin/pages",
    icon: "ri-pages-line",
    group: "Pages",
    keywords: [page.route_path, "seo", "tracked"],
  };
}

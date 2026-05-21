/**
 * Central admin navigation + breadcrumb metadata.
 * Single source of truth for sidebar groups and top-bar wayfinding.
 */

export type AdminNavGroupId = "content" | "seo" | "health" | "settings";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: string;
  /** Shown in sidebar on md+ screens */
  shortLabel?: string;
}

export interface AdminNavGroup {
  id: AdminNavGroupId;
  label: string;
  items: AdminNavItem[];
}

export interface AdminBreadcrumb {
  label: string;
  href?: string;
}

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "content",
    label: "Content",
    items: [
      { href: "/admin", label: "Dashboard", icon: "ri-dashboard-line" },
      { href: "/admin/blogs", label: "Blog Posts", icon: "ri-article-line", shortLabel: "Posts" },
      { href: "/admin/blog-writer", label: "Blog Writer", icon: "ri-quill-pen-line", shortLabel: "Writer" },
      { href: "/admin/content-calendar", label: "Content Calendar", icon: "ri-calendar-line", shortLabel: "Calendar" },
      { href: "/admin/knowledge-base", label: "Knowledge Base", icon: "ri-book-open-line", shortLabel: "Knowledge" },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    items: [
      { href: "/admin/pages", label: "Pages", icon: "ri-pages-line" },
      { href: "/admin/content-editor", label: "Content Editor", icon: "ri-quill-pen-fill", shortLabel: "Editor" },
      { href: "/admin/keyword-research", label: "Keyword Research", icon: "ri-search-eye-line", shortLabel: "Keywords" },
      { href: "/admin/internal-links", label: "Internal Links", icon: "ri-links-line", shortLabel: "Links" },
    ],
  },
  {
    id: "health",
    label: "Site Health",
    items: [
      { href: "/admin/link-health", label: "Link Health", icon: "ri-shield-check-line", shortLabel: "Links" },
      { href: "/admin/indexing-status", label: "Indexing Status", icon: "ri-radar-line", shortLabel: "Indexing" },
      { href: "/admin/sitemap", label: "Sitemap", icon: "ri-map-2-line" },
      { href: "/admin/search-console", label: "Search Console", icon: "ri-google-line", shortLabel: "GSC" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    items: [
      { href: "/admin/brand-settings", label: "Brand Settings", icon: "ri-building-2-line", shortLabel: "Brand" },
    ],
  },
];

/** Routes not listed in the sidebar but reachable from the admin app. */
const ADMIN_DYNAMIC_ROUTES: {
  prefix: string;
  groupId: AdminNavGroupId;
  parentLabel: string;
  parentHref: string;
  trailLabel: string;
}[] = [
  {
    prefix: "/admin/blog-edit",
    groupId: "content",
    parentLabel: "Blog Posts",
    parentHref: "/admin/blogs",
    trailLabel: "Edit post",
  },
  {
    prefix: "/admin/content-editor/",
    groupId: "seo",
    parentLabel: "Content Editor",
    parentHref: "/admin/content-editor",
    trailLabel: "Editor",
  },
  {
    prefix: "/admin/content-links",
    groupId: "seo",
    parentLabel: "Internal Links",
    parentHref: "/admin/internal-links",
    trailLabel: "Content links",
  },
  {
    prefix: "/admin/fix-tables",
    groupId: "settings",
    parentLabel: "Brand Settings",
    parentHref: "/admin/brand-settings",
    trailLabel: "Fix tables",
  },
];

export function isActiveAdminRoute(pathname: string, href: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/admin";
  const target = href.replace(/\/$/, "") || "/admin";
  if (target === "/admin") {
    return path === "/admin";
  }
  return path === target || path.startsWith(`${target}/`);
}

export function findAdminNavMatch(pathname: string): {
  group: AdminNavGroup;
  item: AdminNavItem;
} | null {
  const path = pathname.replace(/\/$/, "") || "/admin";
  for (const group of ADMIN_NAV_GROUPS) {
    for (const item of group.items) {
      if (isActiveAdminRoute(path, item.href)) {
        return { group, item };
      }
    }
  }
  return null;
}

export function resolveAdminBreadcrumbs(pathname: string): AdminBreadcrumb[] {
  const path = pathname.replace(/\/$/, "") || "/admin";
  const crumbs: AdminBreadcrumb[] = [{ label: "Admin", href: "/admin" }];

  const direct = findAdminNavMatch(path);
  if (direct) {
    if (direct.item.href === "/admin") {
      crumbs.push({ label: "Dashboard", href: "/admin" });
      return crumbs;
    }
    crumbs.push({ label: direct.group.label });
    crumbs.push({ label: direct.item.label, href: direct.item.href });
    return crumbs;
  }

  for (const route of ADMIN_DYNAMIC_ROUTES) {
    if (path === route.prefix || path.startsWith(`${route.prefix}/`)) {
      const group = ADMIN_NAV_GROUPS.find((g) => g.id === route.groupId);
      if (group) crumbs.push({ label: group.label });
      crumbs.push({ label: route.parentLabel, href: route.parentHref });
      crumbs.push({ label: route.trailLabel });
      return crumbs;
    }
  }

  const segment = path.split("/").filter(Boolean).pop();
  if (segment && segment !== "admin") {
    crumbs.push({
      label: segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    });
  }

  return crumbs;
}

export function groupContainsActiveRoute(group: AdminNavGroup, pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/admin";
  if (group.items.some((item) => isActiveAdminRoute(path, item.href))) {
    return true;
  }
  return ADMIN_DYNAMIC_ROUTES.some(
    (route) =>
      route.groupId === group.id &&
      (path === route.prefix || path.startsWith(`${route.prefix}/`)),
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import {
  ADMIN_CREAM_SIDEBAR,
  ADMIN_OCEAN,
  adminFontSans,
} from "../lib/adminTheme";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export interface AdminSidebarProps {
  brandName?: string;
  brandInitial?: string;
}

const contentItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "ri-dashboard-line" },
  { href: "/admin/blogs", label: "Blog Posts", icon: "ri-article-line" },
  { href: "/admin/blog-writer", label: "Blog Writer", icon: "ri-quill-pen-line" },
  { href: "/admin/content-calendar", label: "Content Calendar", icon: "ri-calendar-line" },
  { href: "/admin/knowledge-base", label: "Knowledge Base", icon: "ri-book-open-line" },
  { href: "/admin/pages", label: "Pages", icon: "ri-pages-line" },
];

const seoItems: NavItem[] = [
  { href: "/admin/keyword-research", label: "Keyword Research", icon: "ri-search-eye-line" },
  { href: "/admin/internal-links", label: "Internal Links", icon: "ri-links-line" },
  { href: "/admin/link-health", label: "Link Health", icon: "ri-shield-check-line" },
  { href: "/admin/indexing-status", label: "Indexing Status", icon: "ri-radar-line" },
  { href: "/admin/sitemap", label: "Sitemap", icon: "ri-map-2-line" },
];

const settingsItems: NavItem[] = [
  { href: "/admin/brand-settings", label: "Brand Settings", icon: "ri-building-2-line" },
];

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === "/admin" || pathname === "/admin/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavSection({
  title,
  items,
  pathname,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <div className="mb-8">
      <p
        className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 ${adminFontSans}`}
      >
        {title}
      </p>
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={item.href.startsWith("/admin/content-calendar") ? false : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${adminFontSans} ${
                active
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:bg-black/[0.04] hover:text-neutral-800"
              }`}
              style={
                active
                  ? { backgroundColor: `${ADMIN_OCEAN}18`, color: ADMIN_OCEAN }
                  : undefined
              }
            >
              <i className={`${item.icon} text-lg shrink-0 ${active ? "" : "opacity-80"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function AdminSidebar({
  brandName = "Admin",
  brandInitial = "A",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/admin/login");
  };

  return (
    <aside
      className={`sticky top-0 flex h-[100vh] w-[240px] shrink-0 flex-col overflow-y-auto border-r border-black/[0.06] ${adminFontSans}`}
      style={{ backgroundColor: ADMIN_CREAM_SIDEBAR }}
    >
      <div className="border-b border-black/[0.06] px-4 pb-6 pt-10">
        <Link
          href="/admin"
          className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-semibold leading-none tracking-tight text-white shadow-[0_1px_12px_rgba(61,111,127,0.25)] transition-opacity hover:opacity-90"
          style={{
            backgroundColor: ADMIN_OCEAN,
            fontFamily: "var(--font-cormorant-garamond), serif",
          }}
          aria-label={`${brandName} Home`}
        >
          {brandInitial}
        </Link>
        <p
          className={`mt-3 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-neutral-400 ${adminFontSans}`}
        >
          {brandName}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-8 pt-6">
        <NavSection title="Content" items={contentItems} pathname={pathname ?? ""} />
        <NavSection title="SEO tools" items={seoItems} pathname={pathname ?? ""} />
        <NavSection title="Settings" items={settingsItems} pathname={pathname ?? ""} />
      </div>

      <div className="border-t border-black/[0.06] px-4 py-4">
        <p className={`mb-2 truncate px-2 text-[11px] text-neutral-500 ${adminFontSans}`}>
          {user?.email ?? ""}
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className={`w-full rounded-xl px-3 py-2 text-left text-[12px] font-medium text-red-600/90 transition-colors hover:bg-red-50 hover:text-red-700 ${adminFontSans}`}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}

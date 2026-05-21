"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  ADMIN_ACCENT,
  ADMIN_ACCENT_SOFT,
  ADMIN_NAVY_DEEP,
  adminFontSans,
} from "../lib/adminTheme";
import {
  ADMIN_NAV_GROUPS,
  groupContainsActiveRoute,
  isActiveAdminRoute,
  type AdminNavGroup,
  type AdminNavGroupId,
  type AdminNavItem,
} from "../lib/adminNav";

export interface AdminSidebarProps {
  brandName?: string;
  brandInitial?: string;
}

function defaultExpandedGroups(pathname: string): Record<AdminNavGroupId, boolean> {
  const expanded: Record<AdminNavGroupId, boolean> = {
    content: true,
    seo: false,
    health: false,
    settings: false,
  };
  for (const group of ADMIN_NAV_GROUPS) {
    if (groupContainsActiveRoute(group, pathname)) {
      expanded[group.id] = true;
    }
  }
  return expanded;
}

function NavLink({ item, pathname }: { item: AdminNavItem; pathname: string }) {
  const active = isActiveAdminRoute(pathname, item.href);
  return (
    <Link
      href={item.href}
      prefetch={item.href.startsWith("/admin/content-calendar") ? false : undefined}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors ${adminFontSans} ${
        active ? "text-white" : "text-white/55 hover:bg-white/[0.06] hover:text-white/90"
      }`}
      style={
        active ? { backgroundColor: ADMIN_ACCENT_SOFT, color: ADMIN_ACCENT } : undefined
      }
      title={item.label}
    >
      <i className={`${item.icon} text-base shrink-0 ${active ? "" : "opacity-90"}`} />
      <span className="truncate">{item.shortLabel ?? item.label}</span>
    </Link>
  );
}

function NavGroupSection({
  group,
  pathname,
  expanded,
  onToggle,
}: {
  group: AdminNavGroup;
  pathname: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const hasActive = groupContainsActiveRoute(group, pathname);

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={onToggle}
        className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/[0.04] ${adminFontSans}`}
        aria-expanded={expanded}
      >
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
            hasActive ? "text-white/70" : "text-white/35"
          }`}
        >
          {group.label}
        </span>
        <i
          className={`ri-arrow-down-s-line text-sm text-white/40 transition-transform ${
            expanded ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>
      {expanded ? (
        <nav className="flex flex-col gap-0.5 pb-2">
          {group.items.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
      ) : null}
    </div>
  );
}

export default function AdminSidebar({
  brandName = "Admin",
  brandInitial = "A",
}: AdminSidebarProps) {
  const pathname = usePathname() ?? "/admin";
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [expandedGroups, setExpandedGroups] = useState<Record<AdminNavGroupId, boolean>>(() =>
    defaultExpandedGroups(pathname),
  );

  useEffect(() => {
    setExpandedGroups((prev) => {
      const next = { ...prev };
      for (const group of ADMIN_NAV_GROUPS) {
        if (groupContainsActiveRoute(group, pathname)) {
          next[group.id] = true;
        }
      }
      return next;
    });
  }, [pathname]);

  const toggleGroup = (id: AdminNavGroupId) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const flatItemCount = useMemo(
    () => ADMIN_NAV_GROUPS.reduce((sum, g) => sum + g.items.length, 0),
    [],
  );

  const handleSignOut = async () => {
    await signOut();
    router.replace("/admin/login");
  };

  return (
    <aside
      className={`sticky top-0 flex h-[100vh] w-[220px] shrink-0 flex-col overflow-hidden border-r border-white/[0.06] ${adminFontSans}`}
      style={{ backgroundColor: ADMIN_NAVY_DEEP }}
    >
      <div className="border-b border-white/[0.08] px-4 pb-5 pt-6">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-xl px-2 py-1 transition-opacity hover:opacity-90"
          aria-label={`${brandName} Admin home`}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl font-semibold leading-none text-white shadow-[0_4px_20px_rgba(123,159,212,0.22)]"
            style={{
              background: `linear-gradient(135deg, ${ADMIN_ACCENT} 0%, #5a7eb8 100%)`,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {brandInitial}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-white/95">{brandName}</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Admin · {flatItemCount} tools
            </span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 pt-3">
        {ADMIN_NAV_GROUPS.map((group) => (
          <NavGroupSection
            key={group.id}
            group={group}
            pathname={pathname}
            expanded={expandedGroups[group.id]}
            onToggle={() => toggleGroup(group.id)}
          />
        ))}
      </div>

      <div className="border-t border-white/[0.08] px-3 py-3">
        <button
          type="button"
          onClick={handleSignOut}
          className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[12px] font-medium text-red-300/90 transition-colors hover:bg-red-500/10 hover:text-red-200 ${adminFontSans}`}
        >
          <i className="ri-logout-box-r-line text-base shrink-0" />
          Sign out
          {user?.email ? (
            <span className="ml-auto truncate text-[10px] text-white/30 max-w-[90px]" title={user.email}>
              {user.email.split("@")[0]}
            </span>
          ) : null}
        </button>
      </div>
    </aside>
  );
}

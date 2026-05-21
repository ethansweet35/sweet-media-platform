"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAdminCommandPalette } from "./AdminCommandPalette";
import { getPublicSiteOrigin } from "../lib/publicSiteUrl";
import { resolveAdminBreadcrumbs } from "../lib/adminNav";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_CARD,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminFontSans,
} from "../lib/adminTheme";

export default function AdminTopBar() {
  const pathname = usePathname() ?? "/admin";
  const { user } = useAuth();
  const { setOpen } = useAdminCommandPalette();
  const breadcrumbs = resolveAdminBreadcrumbs(pathname);
  const siteOrigin = getPublicSiteOrigin();
  const [modKey, setModKey] = useState("Ctrl");
  useEffect(() => {
    setModKey(/Mac|iPhone|iPad/i.test(navigator.platform) ? "⌘" : "Ctrl");
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b ${adminFontSans}`}
      style={{ backgroundColor: ADMIN_CARD, borderColor: ADMIN_BORDER }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 md:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5 min-w-0">
                  {index > 0 ? (
                    <i className="ri-arrow-right-s-line text-xs shrink-0" style={{ color: ADMIN_TEXT_MUTED }} />
                  ) : null}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="truncate font-medium transition-colors hover:underline underline-offset-4"
                      style={{ color: ADMIN_ACCENT }}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={`truncate ${isLast ? "font-semibold" : "font-medium"}`}
                      style={{ color: isLast ? ADMIN_TEXT : ADMIN_TEXT_MUTED }}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition-colors hover:bg-[#F4F7FB] cursor-pointer"
            style={{ borderColor: ADMIN_BORDER }}
            aria-label="Open command palette"
          >
            <i className="ri-search-line text-sm" style={{ color: ADMIN_TEXT_MUTED }} />
            <span className="hidden md:inline text-xs font-medium" style={{ color: ADMIN_TEXT_MUTED }}>
              Search…
            </span>
            <kbd
              className="hidden lg:inline rounded-md border px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT_MUTED }}
            >
              {modKey}K
            </kbd>
          </button>

          <Link
            href="/admin/blog-writer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:opacity-95"
            style={{ backgroundColor: ADMIN_NAVY }}
          >
            <i className="ri-add-line text-sm" />
            New post
          </Link>

          <a
            href={siteOrigin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors hover:bg-[#F4F7FB]"
            style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT_MUTED }}
          >
            <i className="ri-external-link-line text-sm" />
            <span className="hidden md:inline">View site</span>
          </a>

          {user?.email ? (
            <div
              className="hidden lg:flex max-w-[200px] items-center gap-2 rounded-xl border px-3 py-2"
              style={{ borderColor: ADMIN_BORDER }}
              title={user.email}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: ADMIN_NAVY }}
              >
                {user.email.charAt(0).toUpperCase()}
              </span>
              <span className="truncate text-xs font-medium" style={{ color: ADMIN_TEXT_MUTED }}>
                {user.email}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { findAdminNavMatch } from "../lib/adminNav";
import {
  ADMIN_ACCENT,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminFontSerif,
} from "../lib/adminTheme";

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  /** Show the nav group label above the title (default true). */
  showGroupEyebrow?: boolean;
}

export default function AdminPageHeader({
  title,
  subtitle,
  actions,
  showGroupEyebrow = true,
}: AdminPageHeaderProps) {
  const pathname = usePathname() ?? "/admin";
  const navMatch = findAdminNavMatch(pathname);
  const showEyebrow =
    showGroupEyebrow &&
    navMatch &&
    navMatch.item.href !== "/admin";

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        {showEyebrow ? (
          <p
            className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: ADMIN_ACCENT }}
          >
            {navMatch!.group.label}
          </p>
        ) : null}
        <h1
          className={`text-3xl md:text-[2.25rem] font-semibold tracking-tight ${adminFontSerif}`}
          style={{ color: ADMIN_TEXT }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: ADMIN_TEXT_MUTED }}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

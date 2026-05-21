"use client";

import type { ReactNode } from "react";
import { ADMIN_NAVY } from "../../lib/adminTheme";

interface AdminContentBulkBarProps {
  count: number;
  noun: string;
  detail?: string;
  children: ReactNode;
}

export default function AdminContentBulkBar({
  count,
  noun,
  detail,
  children,
}: AdminContentBulkBarProps) {
  if (count <= 0) return null;

  return (
    <div
      className="mb-4 flex flex-wrap items-center gap-4 rounded-2xl px-5 py-3.5"
      style={{ backgroundColor: ADMIN_NAVY }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
          <span className="text-[11px] font-bold text-white">{count}</span>
        </div>
        <span className="whitespace-nowrap text-sm font-medium text-white">
          {count} {noun}
          {count !== 1 ? "s" : ""} selected
        </span>
        {detail ? (
          <span className="hidden whitespace-nowrap text-[11px] text-white/50 sm:block">
            · {detail}
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

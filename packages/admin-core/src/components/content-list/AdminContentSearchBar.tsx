"use client";

import type { ReactNode } from "react";
import { adminPageCardSmCls } from "../../lib/adminTheme";

interface AdminContentSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  children?: ReactNode;
}

export default function AdminContentSearchBar({
  value,
  onChange,
  placeholder,
  children,
}: AdminContentSearchBarProps) {
  return (
    <div
      className={`${adminPageCardSmCls} mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F4F7FB] px-3 py-2.5">
        <i className="ri-search-line shrink-0 text-sm text-[#94A3B8]" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#334155] placeholder:text-[#94A3B8] focus:outline-none"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#E2E8F0] text-[#64748B] transition-colors hover:bg-[#CBD5E1]"
            aria-label="Clear search"
          >
            <i className="ri-close-line text-[10px]" />
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}

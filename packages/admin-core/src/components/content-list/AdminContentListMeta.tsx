"use client";

import type { ReactNode } from "react";

interface AdminContentListMetaProps {
  rangeStart: number;
  rangeEnd: number;
  total: number;
  noun: string;
  pageSize: 10 | 20 | 50;
  onPageSizeChange: (size: 10 | 20 | 50) => void;
  hint?: string;
  trailing?: ReactNode;
}

export default function AdminContentListMeta({
  rangeStart,
  rangeEnd,
  total,
  noun,
  pageSize,
  onPageSizeChange,
  hint,
  trailing,
}: AdminContentListMetaProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-[#64748B]">
        Showing{" "}
        <span className="font-semibold text-[#0A1F44]">
          {total === 0 ? 0 : `${rangeStart}–${rangeEnd}`}
        </span>{" "}
        of <span className="font-semibold text-[#0A1F44]">{total}</span> {noun}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {hint ? (
          <p className="hidden text-[11px] text-[#94A3B8] sm:block">{hint}</p>
        ) : null}
        {trailing}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#94A3B8]">Show</span>
          {([10, 20, 50] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onPageSizeChange(n)}
              className={`cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                pageSize === n
                  ? "bg-[#0A1F44] text-white"
                  : "bg-[#F4F7FB] text-[#64748B] hover:bg-[#E2E8F0]"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

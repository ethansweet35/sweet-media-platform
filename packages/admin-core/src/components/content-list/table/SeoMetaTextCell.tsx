"use client";

interface SeoMetaTextCellProps {
  activeValue: string | null;
  defaultValue?: string | null;
  expandKey: string;
  expanded: boolean;
  onToggleExpand: (key: string) => void;
  expandThreshold?: number;
}

export default function SeoMetaTextCell({
  activeValue,
  defaultValue = null,
  expandKey,
  expanded,
  onToggleExpand,
  expandThreshold = 50,
}: SeoMetaTextCellProps) {
  const displayVal = activeValue ?? defaultValue;
  if (!displayVal) return <span className="text-[13px] text-[#CBD5E1]">—</span>;

  const hasOverride = Boolean(activeValue?.trim());
  const showDefault = !hasOverride && Boolean(defaultValue?.trim());

  return (
    <div className="flex flex-col gap-1">
      <span
        className={`text-[13px] leading-snug ${hasOverride || !showDefault ? "text-[#0A1F44]" : "text-[#64748B]"} ${expanded ? "" : "line-clamp-2"}`}
        title={displayVal}
      >
        {displayVal}
      </span>
      <div className="flex flex-wrap items-center gap-1.5">
        {(hasOverride || showDefault) && (
          <span
            className={`inline-flex items-center rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
              hasOverride ? "bg-amber-50 text-amber-600" : "bg-[#F4F7FB] text-[#94A3B8]"
            }`}
          >
            {hasOverride ? "Override" : "Default"}
          </span>
        )}
        {displayVal.length > expandThreshold ? (
          <button
            type="button"
            onClick={() => onToggleExpand(expandKey)}
            className="cursor-pointer text-[10px] text-[#0A1F44] hover:underline"
          >
            {expanded ? "less ↑" : "more ↓"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

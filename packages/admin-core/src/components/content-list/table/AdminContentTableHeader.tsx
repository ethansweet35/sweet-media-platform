"use client";

import type { ReactNode } from "react";
import {
  CONTENT_TABLE_COLUMN_LABELS,
  type ContentTableColumn,
} from "../../../lib/adminContentTable";

const NAVY = "#0A1F44";

function ResizeHandle({
  onMouseDown,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="group absolute top-0 right-0 z-10 flex h-full w-2.5 cursor-col-resize items-center justify-end"
    >
      <div
        className="h-full w-[2px] opacity-20 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: NAVY }}
      />
    </div>
  );
}

export function AdminContentTableSortTh({
  label,
  colKey,
  width,
  active,
  dir,
  onSort,
  onResize,
  extra,
}: {
  label: string;
  colKey: ContentTableColumn;
  width: number;
  active: boolean;
  dir: "asc" | "desc";
  onSort: () => void;
  onResize: (col: ContentTableColumn, e: React.MouseEvent) => void;
  extra?: ReactNode;
}) {
  return (
    <th
      className="relative select-none py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#64748B]"
      style={{ paddingLeft: 12, paddingRight: 10, width }}
    >
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onSort}
          className="inline-flex cursor-pointer items-center whitespace-nowrap transition-colors hover:text-[#334155]"
        >
          {label}
          <i
            className={`ml-1 text-[10px] ${
              active
                ? dir === "asc"
                  ? "ri-arrow-up-line text-[#0A1F44]"
                  : "ri-arrow-down-line text-[#0A1F44]"
                : "ri-arrows-up-down-line text-[#CBD5E1]"
            }`}
          />
        </button>
        {extra}
      </div>
      <ResizeHandle onMouseDown={(e) => onResize(colKey, e)} />
    </th>
  );
}

export function AdminContentTableStaticTh({
  label,
  colKey,
  width,
  onResize,
  right,
}: {
  label: string;
  colKey: ContentTableColumn;
  width: number;
  onResize: (col: ContentTableColumn, e: React.MouseEvent) => void;
  right?: boolean;
}) {
  return (
    <th
      className={`relative select-none py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#64748B]${right ? " text-right" : ""}`}
      style={{ paddingLeft: 12, paddingRight: 10, width }}
    >
      <span className="block truncate">{label}</span>
      <ResizeHandle onMouseDown={(e) => onResize(colKey, e)} />
    </th>
  );
}

export function AdminContentTableCheckTh({
  width,
  allSelected,
  someSelected,
  onSelectAll,
  onResize,
}: {
  width: number;
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onResize: (col: ContentTableColumn, e: React.MouseEvent) => void;
}) {
  return (
    <th className="relative select-none py-3 pl-4 pr-2" style={{ width }}>
      <input
        type="checkbox"
        checked={allSelected}
        ref={(el) => {
          if (el) el.indeterminate = someSelected;
        }}
        onChange={(e) => onSelectAll(e.target.checked)}
        className="h-4 w-4 cursor-pointer rounded border-[#CBD5E1] accent-[#0A1F44] text-[#0A1F44]"
      />
      <ResizeHandle onMouseDown={(e) => onResize("check", e)} />
    </th>
  );
}

export type ContentTableSortField =
  | "wordCount"
  | "route"
  | "title"
  | "keyword"
  | "status"
  | "date";

export function AdminContentTableHeaderRow({
  columnKeys,
  colWidths,
  sortField,
  sortDir,
  onSort,
  onResize,
  allSelected,
  someSelected,
  onSelectAll,
  wordsHeaderExtra,
}: {
  columnKeys: ContentTableColumn[];
  colWidths: Record<ContentTableColumn, number>;
  sortField: ContentTableSortField;
  sortDir: "asc" | "desc";
  onSort: (field: ContentTableSortField) => void;
  onResize: (col: ContentTableColumn, e: React.MouseEvent) => void;
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  wordsHeaderExtra?: ReactNode;
}) {
  const sortCols = new Set<ContentTableSortField>([
    "wordCount",
    "route",
    "title",
    "keyword",
    "status",
    "date",
  ]);

  return (
    <tr className="border-b border-[#E2E8F0] bg-[#F4F7FB]/80">
      {columnKeys.map((key) => {
        if (key === "check") {
          return (
            <AdminContentTableCheckTh
              key={key}
              width={colWidths.check}
              allSelected={allSelected}
              someSelected={someSelected}
              onSelectAll={onSelectAll}
              onResize={onResize}
            />
          );
        }
        if (key === "image") {
          return (
            <AdminContentTableStaticTh
              key={key}
              label={CONTENT_TABLE_COLUMN_LABELS.image}
              colKey="image"
              width={colWidths.image}
              onResize={onResize}
            />
          );
        }
        if (sortCols.has(key as ContentTableSortField)) {
          return (
            <AdminContentTableSortTh
              key={key}
              label={CONTENT_TABLE_COLUMN_LABELS[key]}
              colKey={key}
              width={colWidths[key]}
              active={sortField === key}
              dir={sortDir}
              onSort={() => onSort(key as ContentTableSortField)}
              onResize={onResize}
              extra={key === "wordCount" ? wordsHeaderExtra : undefined}
            />
          );
        }
        return (
          <AdminContentTableStaticTh
            key={key}
            label={CONTENT_TABLE_COLUMN_LABELS[key]}
            colKey={key}
            width={colWidths[key]}
            onResize={onResize}
            right={key === "actions"}
          />
        );
      })}
    </tr>
  );
}

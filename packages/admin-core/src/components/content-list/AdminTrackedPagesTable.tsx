"use client";

import { Fragment } from "react";
import type { TrackedPage } from "../../types/tracked-page";
import type { GscMetrics } from "../../hooks/useSearchConsoleData";
import type { SeoGenResult } from "../../lib/generateSeoMetadata";
import {
  buildPrimaryPageKeywordSeed,
  toPageKeywordSeedContextPayload,
} from "../../lib/seedCleaner";
import { getPublicSiteOrigin } from "../../lib/publicSiteUrl";
import { adminTableWrapCls } from "../../lib/adminTheme";
import {
  contentTableColSpan,
  type ContentTableColumn,
} from "../../lib/adminContentTable";
import { useContentTableResize } from "./table/useContentTableResize";
import {
  AdminContentTableHeaderRow,
  type ContentTableSortField,
} from "./table/AdminContentTableHeader";
import SeoMetaTextCell from "./table/SeoMetaTextCell";
import GscMetricsCell from "./table/GscMetricsCell";
import WordCountBadge from "./table/WordCountBadge";
import {
  AdminContentSeoPreviewRow,
  AdminContentSeoErrorRow,
} from "./table/AdminContentSeoRows";
import ContentEditorCell from "../ContentEditorCell";
import InlineKeywordCell from "../InlineKeywordCell";
import RankingKeywordsPopover from "../RankingKeywordsPopover";

export type TrackedPagesSortCol =
  | "route"
  | "title"
  | "keyword"
  | "created_at"
  | "status"
  | "wordCount";

type WcEntry = { status: "idle" | "loading" | "done" | "error"; words?: number; error?: string };

export type TrackedPageSeoStatus = {
  status: "generating" | "done" | "error";
  result?: SeoGenResult;
  error?: string;
};


function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toHeaderSortField(sortCol: TrackedPagesSortCol): ContentTableSortField {
  return sortCol === "created_at" ? "date" : sortCol;
}

function fromHeaderSortField(field: ContentTableSortField): TrackedPagesSortCol {
  return field === "date" ? "created_at" : field;
}

const COL_SPAN = contentTableColSpan(false);

export type AdminTrackedPagesTableProps = {
  pages: TrackedPage[];
  selectedIds: Set<string>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  allPageSelected: boolean;
  somePageSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  sortCol: TrackedPagesSortCol;
  sortDir: "asc" | "desc";
  onSort: (col: TrackedPagesSortCol) => void;
  wordCounts: Record<string, WcEntry>;
  fetchPageWordCount: (p: TrackedPage) => void | Promise<void>;
  analyzeVisible: () => void | Promise<void>;
  analyzingAll: boolean;
  expandedCells: Set<string>;
  toggleCell: (key: string) => void;
  seoStatuses: Record<string, TrackedPageSeoStatus>;
  runSeoForPage: (p: TrackedPage) => void | Promise<void>;
  applySeoForPage: (p: TrackedPage, result: SeoGenResult) => void | Promise<void>;
  onDismissSeo: (id: string) => void;
  gscData: Record<string, GscMetrics>;
  gscLoading: boolean;
  togglingId: string | null;
  handleToggle: (p: TrackedPage) => void | Promise<void>;
  openEdit: (p: TrackedPage) => void;
  setDeletingPage: (p: TrackedPage) => void;
  viewPublicUrl: (routePath: string) => void;
  updatePage: (
    id: string,
    updates: Partial<{
      primary_keyword: string | null;
      route_path: string;
      page_title: string;
      seo_title: string | null;
      meta_description: string | null;
      notes: string | null;
      is_active: boolean;
    }>,
  ) => Promise<boolean>;
  refetch: () => void | Promise<void>;
};

export default function AdminTrackedPagesTable({
  pages,
  selectedIds,
  setSelectedIds,
  allPageSelected,
  somePageSelected,
  onSelectAll,
  sortCol,
  sortDir,
  onSort,
  wordCounts,
  fetchPageWordCount,
  analyzeVisible,
  analyzingAll,
  expandedCells,
  toggleCell,
  seoStatuses,
  runSeoForPage,
  applySeoForPage,
  onDismissSeo,
  gscData,
  gscLoading,
  togglingId,
  handleToggle,
  openEdit,
  setDeletingPage,
  viewPublicUrl,
  updatePage,
  refetch,
}: AdminTrackedPagesTableProps) {
  const { columnKeys, colWidths, startResize, tableWidth } = useContentTableResize(false);

  const wordsHeaderExtra = (
    <button
      type="button"
      title="Analyze visible pages"
      onClick={() => void analyzeVisible()}
      disabled={analyzingAll}
      className="flex h-4 w-4 cursor-pointer items-center justify-center rounded text-[#CBD5E1] transition-colors hover:text-[#0A1F44] disabled:cursor-wait disabled:opacity-40"
    >
      <i className={`text-[10px] ${analyzingAll ? "ri-loader-4-line animate-spin" : "ri-scan-line"}`} />
    </button>
  );

  const renderWordCountCell = (p: TrackedPage) => {
    const wc = wordCounts[p.id];
    if (!wc || wc.status === "idle") {
      return (
        <button
          type="button"
          title="Analyze page word count"
          onClick={() => void fetchPageWordCount(p)}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg text-[#CBD5E1] transition-all hover:bg-[#0A1F44]/6 hover:text-[#0A1F44]"
        >
          <i className="ri-scan-line text-sm" />
        </button>
      );
    }
    if (wc.status === "loading") {
      return <i className="ri-loader-4-line animate-spin text-sm text-[#CBD5E1]" />;
    }
    if (wc.status === "error") {
      return (
        <button
          type="button"
          title={wc.error ?? "Could not count words — click to retry"}
          onClick={() => void fetchPageWordCount(p)}
          className="cursor-pointer text-[10px] font-semibold text-red-500 hover:underline"
        >
          Retry
        </button>
      );
    }
    return <WordCountBadge words={wc.words ?? 0} />;
  };

  const renderCell = (p: TrackedPage, key: ContentTableColumn) => {
    const gscPath = p.route_path.toLowerCase().replace(/\/$/, "") || "/";

    switch (key) {
      case "check":
        return (
          <td className="py-3 pl-4 pr-2 align-middle">
            <input
              type="checkbox"
              checked={selectedIds.has(p.id)}
              onChange={(e) =>
                setSelectedIds((prev) => {
                  const next = new Set(prev);
                  if (e.target.checked) next.add(p.id);
                  else next.delete(p.id);
                  return next;
                })
              }
              className="h-3.5 w-3.5 cursor-pointer rounded border-[#CBD5E1] accent-[#0A1F44]"
            />
          </td>
        );
      case "wordCount":
        return <td className="px-3 py-3 align-middle">{renderWordCountCell(p)}</td>;
      case "route":
        return (
          <td className="overflow-hidden px-3 py-3 align-middle">
            <div className="flex items-center gap-1.5">
              <code
                className="block min-w-0 truncate rounded bg-[#F4F7FB] px-1.5 py-0.5 font-mono text-[11px] text-[#334155]"
                title={p.route_path}
              >
                {p.route_path}
              </code>
              <RankingKeywordsPopover pageUrl={`${getPublicSiteOrigin()}${p.route_path}`}>
                <button
                  type="button"
                  title="See ranking keywords for this page"
                  className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-[#94A3B8] transition-all hover:bg-[#0A1F44]/10 hover:text-[#0A1F44]"
                >
                  <i className="ri-bar-chart-grouped-line text-[12px]" />
                </button>
              </RankingKeywordsPopover>
            </div>
          </td>
        );
      case "title":
        return (
          <td className="overflow-hidden px-3 py-3 align-middle">
            <span
              className="block truncate text-[13px] font-medium text-[#0A1F44]"
              title={p.page_title}
            >
              {p.page_title}
            </span>
          </td>
        );
      case "seoTitle":
        return (
          <td className="overflow-hidden px-3 py-3 align-top">
            <SeoMetaTextCell
              activeValue={p.seo_title}
              defaultValue={p.default_seo_title}
              expandKey={`${p.id}-seo`}
              expanded={expandedCells.has(`${p.id}-seo`)}
              onToggleExpand={toggleCell}
              expandThreshold={50}
            />
          </td>
        );
      case "metaDesc":
        return (
          <td className="overflow-hidden px-3 py-3 align-top">
            <SeoMetaTextCell
              activeValue={p.meta_description}
              defaultValue={p.default_meta_description}
              expandKey={`${p.id}-meta`}
              expanded={expandedCells.has(`${p.id}-meta`)}
              onToggleExpand={toggleCell}
              expandThreshold={90}
            />
          </td>
        );
      case "keyword":
        return (
          <td className="px-3 py-3 align-middle" onClick={(e) => e.stopPropagation()}>
            <InlineKeywordCell
              value={p.primary_keyword ?? null}
              rowTitle={buildPrimaryPageKeywordSeed(p)}
              routePath={p.route_path}
              pageSeedContext={toPageKeywordSeedContextPayload(p)}
              onSave={async (next) => updatePage(p.id, { primary_keyword: next })}
            />
          </td>
        );
      case "gsc":
        return (
          <td className="px-3 py-3 align-middle">
            <GscMetricsCell
              metrics={gscData[gscPath]}
              loading={gscLoading}
              seoImpact={{
                entityType: "page",
                entityId: p.id,
                pageUrl: `${getPublicSiteOrigin()}${p.route_path}`,
              }}
            />
          </td>
        );
      case "contentEditor":
        return (
          <td className="px-3 py-3 align-middle" onClick={(e) => e.stopPropagation()}>
            <ContentEditorCell
              kind="page"
              row={{
                id: p.id,
                primary_keyword: p.primary_keyword,
                content_editor_id: p.content_editor_id ?? null,
              }}
              compact
              onChange={refetch}
            />
          </td>
        );
      case "status":
        return (
          <td className="px-3 py-3 align-middle">
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={p.is_active}
                disabled={togglingId === p.id}
                onClick={() => void handleToggle(p)}
                className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${togglingId === p.id ? "cursor-wait opacity-50" : "cursor-pointer"} ${p.is_active ? "justify-end bg-emerald-500" : "justify-start bg-[#CBD5E1]"}`}
              >
                <span className="h-4 w-4 shrink-0 rounded-full bg-white shadow-sm" />
              </button>
              <span
                className={`text-[11px] font-semibold ${p.is_active ? "text-emerald-600" : "text-[#94A3B8]"}`}
              >
                {p.is_active ? "Active" : "Off"}
              </span>
            </div>
          </td>
        );
      case "date":
        return (
          <td className="overflow-hidden px-3 py-3 align-middle">
            <span className="block truncate text-[12px] text-[#64748B]">{fmtDate(p.created_at)}</span>
          </td>
        );
      case "actions": {
        const seoStatus = seoStatuses[p.id];
        return (
          <td className="px-3 py-3 align-middle text-right">
            <div className="flex items-center justify-end gap-1">
              {seoStatus?.status === "generating" ? (
                <div className="flex h-8 w-8 items-center justify-center">
                  <i className="ri-loader-4-line animate-spin text-sm text-violet-500" />
                </div>
              ) : (
                <button
                  type="button"
                  title="AI Generate Meta Data"
                  onClick={() => void runSeoForPage(p)}
                  className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-all ${
                    seoStatus?.status === "done"
                      ? "bg-violet-100 text-violet-600 hover:bg-violet-200"
                      : seoStatus?.status === "error"
                        ? "bg-red-50 text-red-500 hover:bg-red-100"
                        : "text-[#94A3B8] hover:bg-violet-50 hover:text-violet-600"
                  }`}
                >
                  <i className="ri-sparkling-2-line text-sm" />
                </button>
              )}
              <button
                type="button"
                title="View public page"
                onClick={() => viewPublicUrl(p.route_path)}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#94A3B8] transition-all hover:bg-[#0A1F44]/6 hover:text-[#0A1F44]"
              >
                <i className="ri-external-link-line text-sm" />
              </button>
              <button
                type="button"
                title="Edit"
                onClick={() => openEdit(p)}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] transition-all hover:border-[#0A1F44]/40 hover:bg-[#0A1F44]/5 hover:text-[#0A1F44]"
              >
                <i className="ri-edit-line text-sm" />
              </button>
              <button
                type="button"
                title="Delete"
                onClick={() => setDeletingPage(p)}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-red-100 text-red-400 transition-all hover:border-red-200 hover:bg-red-50"
              >
                <i className="ri-delete-bin-line text-sm" />
              </button>
            </div>
          </td>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className={adminTableWrapCls}>
      <div className="overflow-x-auto">
        <table
          className="text-left text-sm"
          style={{ tableLayout: "fixed", width: `${tableWidth}px`, minWidth: "100%" }}
        >
          <colgroup>
            {columnKeys.map((c) => (
              <col key={c} style={{ width: `${colWidths[c]}px` }} />
            ))}
          </colgroup>
          <thead>
            <AdminContentTableHeaderRow
              columnKeys={columnKeys}
              colWidths={colWidths}
              sortField={toHeaderSortField(sortCol)}
              sortDir={sortDir}
              onSort={(field) => onSort(fromHeaderSortField(field))}
              onResize={startResize}
              allSelected={allPageSelected}
              someSelected={somePageSelected}
              onSelectAll={onSelectAll}
              wordsHeaderExtra={wordsHeaderExtra}
            />
          </thead>
          <tbody>
            {pages.map((p) => {
              const seoStatus = seoStatuses[p.id];
              const isSelected = selectedIds.has(p.id);
              const rowClass = `border-b border-[#E2E8F0] transition-colors ${
                seoStatus?.status === "done"
                  ? "bg-violet-50/60"
                  : isSelected
                    ? "bg-[#0A1F44]/3"
                    : "hover:bg-[#F4F7FB]/60"
              }`;

              return (
                <Fragment key={p.id}>
                  <tr className={rowClass}>{columnKeys.map((key) => renderCell(p, key))}</tr>
                  {seoStatus?.status === "done" && seoStatus.result ? (
                    <AdminContentSeoPreviewRow
                      result={seoStatus.result}
                      colSpan={COL_SPAN}
                      onApply={() => void applySeoForPage(p, seoStatus.result!)}
                      onDismiss={() => onDismissSeo(p.id)}
                    />
                  ) : null}
                  {seoStatus?.status === "error" ? (
                    <AdminContentSeoErrorRow
                      error={seoStatus.error ?? "Failed"}
                      colSpan={COL_SPAN}
                      onRetry={() => void runSeoForPage(p)}
                      onDismiss={() => onDismissSeo(p.id)}
                    />
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

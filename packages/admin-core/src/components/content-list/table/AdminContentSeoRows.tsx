"use client";

import type { SeoGenResult } from "../../../lib/generateSeoMetadata";
import { contentTableColSpan } from "../../../lib/adminContentTable";

export function AdminContentSeoPreviewRow({
  result,
  colSpan,
  onApply,
  onDismiss,
}: {
  result: SeoGenResult;
  colSpan: number;
  onApply: () => void;
  onDismiss: () => void;
}) {
  return (
    <tr className="border-b border-violet-100 bg-violet-50">
      <td colSpan={colSpan} className="px-5 py-3">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex shrink-0 items-center gap-1.5">
            <i className="ri-sparkling-2-line text-sm text-violet-500" />
            <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.1em] text-violet-600">
              Generated Meta Data
            </span>
          </div>
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 md:grid-cols-3">
            {result.page_title ? (
              <div className="min-w-0">
                <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-400">
                  Page Title ({result.page_title.length} chars)
                </p>
                <p className="text-[12px] leading-snug text-[#0A1F44]">{result.page_title}</p>
              </div>
            ) : null}
            {result.seo_title ? (
              <div className="min-w-0">
                <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-400">
                  SEO Title ({result.seo_title.length} chars)
                </p>
                <p className="text-[12px] leading-snug text-[#0A1F44]">{result.seo_title}</p>
              </div>
            ) : null}
            <div className="min-w-0">
              <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-400">
                Meta Description ({result.meta_description.length} chars)
              </p>
              <p className="text-[12px] leading-snug text-[#334155]">{result.meta_description}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onApply}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-violet-500"
            >
              <i className="ri-check-line text-xs" />
              Apply
            </button>
            <button
              type="button"
              onClick={onDismiss}
              className="flex cursor-pointer items-center gap-1 text-[11px] text-[#94A3B8] transition-colors hover:text-[#64748B]"
            >
              <i className="ri-close-line text-xs" />
              Dismiss
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export function AdminContentSeoErrorRow({
  error,
  colSpan,
  onRetry,
  onDismiss,
}: {
  error: string;
  colSpan: number;
  onRetry: () => void;
  onDismiss: () => void;
}) {
  return (
    <tr className="border-b border-red-100 bg-red-50">
      <td colSpan={colSpan} className="px-5 py-2">
        <div className="flex items-center gap-3">
          <i className="ri-error-warning-line shrink-0 text-sm text-red-400" />
          <p className="flex-1 text-[12px] text-red-600">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="shrink-0 cursor-pointer text-[11px] text-red-500 hover:underline"
          >
            Retry
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 cursor-pointer text-[#94A3B8] hover:text-[#64748B]"
          >
            <i className="ri-close-line text-sm" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function seoPreviewColSpan(includeImage: boolean): number {
  return contentTableColSpan(includeImage);
}

"use client";

import {
  BLOG_SYNC_STATUS_LABEL,
  type BlogEditorSyncStatus,
} from "../../lib/contentEditorSyncStatus";
import {
  CONTENT_EDITOR_LINK_KIND_LABEL,
  type ContentEditorLinkKind,
} from "../../lib/contentEditorListLink";

const KIND_CLS: Record<ContentEditorLinkKind, string> = {
  blog: "bg-violet-50 text-violet-800 ring-violet-200/80",
  page: "bg-sky-50 text-sky-800 ring-sky-200/80",
  unlinked: "bg-[#F4F7FB] text-[#94A3B8] ring-[#E2E8F0]",
};

const SYNC_CLS: Record<BlogEditorSyncStatus, string> = {
  synced: "text-emerald-700",
  needs_sync: "text-amber-700",
  no_draft: "text-[#94A3B8]",
  none: "text-[#94A3B8]",
};

export default function ContentEditorLinkBadge({
  linkKind,
  linkLabel,
  linkTitle,
  blogSyncStatus,
}: {
  linkKind: ContentEditorLinkKind;
  linkLabel: string | null;
  linkTitle: string | null;
  blogSyncStatus: BlogEditorSyncStatus;
}) {
  return (
    <div className="min-w-0">
      <span
        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] ring-1 ring-inset ${KIND_CLS[linkKind]}`}
      >
        <i
          className={
            linkKind === "blog"
              ? "ri-article-line"
              : linkKind === "page"
                ? "ri-file-line"
                : "ri-link-unlink"
          }
        />
        {CONTENT_EDITOR_LINK_KIND_LABEL[linkKind]}
      </span>
      {linkLabel ? (
        <p
          className="mt-1 truncate font-mono text-[11px] text-[#64748B]"
          title={linkTitle ?? linkLabel}
        >
          {linkLabel}
        </p>
      ) : linkKind === "unlinked" ? (
        <p className="mt-1 text-[11px] text-[#CBD5E1]">—</p>
      ) : null}
      {linkKind === "page" ? (
        <p className="mt-0.5 text-[10px] leading-snug text-[#94A3B8]">
          Manual apply on brief
        </p>
      ) : null}
      {linkKind === "blog" && blogSyncStatus !== "none" ? (
        <p className={`mt-0.5 text-[10px] font-semibold ${SYNC_CLS[blogSyncStatus]}`}>
          {BLOG_SYNC_STATUS_LABEL[blogSyncStatus]}
        </p>
      ) : null}
    </div>
  );
}

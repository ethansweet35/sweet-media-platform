"use client";

import type { BlogPost } from "@sweetmedia/blog-core";
import {
  computePipelineChecks,
  resolvePostPipelineStage,
  PIPELINE_STAGES,
} from "../lib/blogPipeline";
import { ADMIN_ACCENT, ADMIN_TEXT_MUTED, adminFontSans } from "../lib/adminTheme";

interface BlogPipelineStatusStripProps {
  post: BlogPost;
  compact?: boolean;
}

type CheckKey = "keyword" | "meta" | "image" | "approve";

const CHECK_LABELS: Record<CheckKey, string> = {
  keyword: "KW",
  meta: "Meta",
  image: "Img",
  approve: "OK",
};

function CheckPill({
  label,
  done,
  warn,
  title,
}: {
  label: string;
  done: boolean;
  warn: boolean;
  title: string;
}) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${adminFontSans}`}
      style={{
        backgroundColor: done ? "rgba(16,185,129,0.12)" : warn ? "rgba(245,158,11,0.12)" : "rgba(100,116,139,0.1)",
        color: done ? "#059669" : warn ? "#d97706" : ADMIN_TEXT_MUTED,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: done ? "#10b981" : warn ? "#f59e0b" : "#94a3b8",
        }}
      />
      {label}
    </span>
  );
}

export default function BlogPipelineStatusStrip({ post, compact }: BlogPipelineStatusStripProps) {
  const checks = computePipelineChecks(post);
  const stage = resolvePostPipelineStage(post);
  const stageMeta = PIPELINE_STAGES.find((s) => s.id === stage);

  if (post.status === "published") {
    return (
      <div className={`flex flex-col gap-1 ${adminFontSans}`}>
        <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">Published</span>
        {!compact ? (
          <span className="text-[10px]" style={{ color: ADMIN_TEXT_MUTED }}>
            Live
          </span>
        ) : null}
      </div>
    );
  }

  const pills: { key: CheckKey; done: boolean; warn: boolean; title: string }[] = [
    {
      key: "keyword",
      done: checks.hasKeyword,
      warn: !checks.hasKeyword,
      title: checks.hasKeyword ? "Primary keyword set" : "Missing primary keyword",
    },
    {
      key: "meta",
      done: checks.hasMeta,
      warn: !checks.hasMeta,
      title: checks.hasMeta ? "SEO meta set" : "Missing SEO title or description",
    },
    {
      key: "image",
      done: checks.hasImage,
      warn: !checks.hasImage,
      title: checks.hasImage ? "Hero image set" : "Missing hero image",
    },
    {
      key: "approve",
      done: checks.isApproved,
      warn: checks.hasKeyword && checks.hasMeta && checks.hasImage && checks.hasContent && !checks.isApproved,
      title: checks.isApproved ? "Approved for auto-publish" : "Not yet approved",
    },
  ];

  return (
    <div className={`flex flex-col gap-1.5 ${adminFontSans}`}>
      <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: ADMIN_ACCENT }}>
        {stageMeta?.shortLabel ?? stage}
      </span>
      <div className="flex flex-wrap gap-1">
        {pills.map((p) => (
          <CheckPill
            key={p.key}
            label={CHECK_LABELS[p.key]}
            done={p.done}
            warn={p.warn}
            title={p.title}
          />
        ))}
      </div>
    </div>
  );
}

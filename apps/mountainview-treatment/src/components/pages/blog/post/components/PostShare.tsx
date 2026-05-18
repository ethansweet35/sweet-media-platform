"use client";

import { useState } from "react";

interface PostShareProps {
  title: string;
  canonicalUrl?: string;
}

export default function PostShare({ title, canonicalUrl }: PostShareProps) {
  const [copied, setCopied] = useState(false);

  const resolvedUrl =
    canonicalUrl ??
    (typeof window !== "undefined" && window.location?.href ? window.location.href : "");

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(resolvedUrl);

  const handleCopy = () => {
    const toCopy = canonicalUrl ?? (typeof window !== "undefined" ? window.location.href : "");
    if (!toCopy || typeof navigator === "undefined") return;
    navigator.clipboard.writeText(toCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const btnClass =
    "flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mvt-cream)] text-[var(--mvt-muted)] ring-1 ring-[var(--mvt-cream-2)] transition hover:bg-[var(--mvt-ink)] hover:text-white hover:ring-[var(--mvt-ink)] cursor-pointer";

  return (
    <div className="sticky top-28 flex flex-col items-center gap-3">
      <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--mvt-stone)]">
        Share
      </p>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btnClass}
        title="Share on X"
      >
        <i className="ri-twitter-x-line text-sm" />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btnClass}
        title="Share on LinkedIn"
      >
        <i className="ri-linkedin-fill text-sm" />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btnClass}
        title="Share on Facebook"
      >
        <i className="ri-facebook-fill text-sm" />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={`${btnClass} ${copied ? "!bg-[var(--mvt-teal)] !text-white !ring-[var(--mvt-teal)]" : ""}`}
        title="Copy link"
      >
        <i className={`text-sm ${copied ? "ri-check-line" : "ri-link"}`} />
      </button>

      <div className="mt-1 h-12 w-px bg-[var(--mvt-cream-2)]" />
    </div>
  );
}

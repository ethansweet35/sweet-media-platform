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
    const toCopy =
      canonicalUrl ?? (typeof window !== "undefined" ? window.location.href : "");
    if (!toCopy || typeof navigator === "undefined") return;
    navigator.clipboard.writeText(toCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const btnClass =
    "flex h-9 w-9 items-center justify-center rounded-full bg-white text-mbh-body/50 ring-1 ring-mbh-forest/10 transition hover:bg-mbh-forest hover:text-white hover:ring-mbh-forest";

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btnClass}
        title="Share on X"
      >
        <i className="ri-twitter-x-line text-sm" aria-hidden />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btnClass}
        title="Share on LinkedIn"
      >
        <i className="ri-linkedin-fill text-sm" aria-hidden />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className={`${btnClass} ${copied ? "bg-mbh-green text-white ring-mbh-green" : ""}`}
        title="Copy link"
      >
        <i className={`text-sm ${copied ? "ri-check-line" : "ri-link"}`} aria-hidden />
      </button>
    </div>
  );
}

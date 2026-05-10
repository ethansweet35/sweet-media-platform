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

  const btnBase =
    "flex h-9 w-9 items-center justify-center border border-[#cdd8e8] text-[#94a3b8] transition-all hover:border-[#1b2a47] hover:bg-[#1b2a47] hover:text-white";

  return (
    <div className="sticky top-28 flex flex-col items-center gap-2">
      <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.25em] text-[#c8d4e4]">
        Share
      </p>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btnBase}
        title="Share on X"
      >
        <i className="ri-twitter-x-line text-sm" />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btnBase}
        title="Share on LinkedIn"
      >
        <i className="ri-linkedin-fill text-sm" />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btnBase}
        title="Share on Facebook"
      >
        <i className="ri-facebook-fill text-sm" />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={`${btnBase} ${copied ? "border-[#e97a52] bg-[#e97a52] text-white" : ""}`}
        title="Copy link"
      >
        <i className={`text-sm ${copied ? "ri-check-line" : "ri-link"}`} />
      </button>

      <div className="mt-2 h-16 w-px bg-[#eef2f7]" />
    </div>
  );
}

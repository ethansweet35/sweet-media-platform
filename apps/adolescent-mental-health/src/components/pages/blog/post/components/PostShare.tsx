"use client";

import { useState } from "react";

interface PostShareProps {
  title: string;
  /** When set, share + copy targets this URL so SSR markup matches crawlers/social previews. */
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

  const buttonClass =
    "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface text-body transition hover:bg-dark hover:text-white";

  return (
    <div className="sticky top-28 flex w-11 shrink-0 flex-col items-center gap-2.5 rounded-2xl border border-border bg-white px-1.5 py-5 shadow-sm">
      <p className="whitespace-nowrap text-[8px] font-bold uppercase leading-none tracking-[0.2em] text-accent">
        Share
      </p>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={buttonClass}
        title="Share on X"
      >
        <i className="ri-twitter-x-line text-sm" aria-hidden />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={buttonClass}
        title="Share on LinkedIn"
      >
        <i className="ri-linkedin-fill text-sm" aria-hidden />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={buttonClass}
        title="Share on Facebook"
      >
        <i className="ri-facebook-fill text-sm" aria-hidden />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={`${buttonClass} ${copied ? "bg-emerald-500 text-white hover:bg-emerald-500" : ""}`}
        title="Copy link"
      >
        <i className={`text-sm ${copied ? "ri-check-line" : "ri-link"}`} aria-hidden />
      </button>
    </div>
  );
}

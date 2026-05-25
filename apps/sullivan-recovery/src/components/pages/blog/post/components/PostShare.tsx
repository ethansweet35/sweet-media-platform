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

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-[var(--sr-sand)] bg-[var(--sr-parchment)] text-[var(--sr-muted)] transition hover:border-[var(--sr-moss)] hover:bg-[var(--sr-moss)] hover:text-[var(--sr-parchment)]";

  return (
    <div className="sticky top-28 flex flex-col items-center gap-2.5">
      <p
        className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-muted)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Share
      </p>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btn}
        title="Share on X"
      >
        <i className="ri-twitter-x-line text-sm" aria-hidden />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btn}
        title="Share on LinkedIn"
      >
        <i className="ri-linkedin-fill text-sm" aria-hidden />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={btn}
        title="Share on Facebook"
      >
        <i className="ri-facebook-fill text-sm" aria-hidden />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={`${btn} ${copied ? "!border-emerald-600 !bg-emerald-600 !text-white" : ""}`}
        title="Copy link"
      >
        <i className={`text-sm ${copied ? "ri-check-line" : "ri-link"}`} aria-hidden />
      </button>

      <div className="mt-2 h-10 w-px bg-[var(--sr-sand)]" aria-hidden />
    </div>
  );
}

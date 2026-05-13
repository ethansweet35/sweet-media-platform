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
    const toCopy =
      canonicalUrl ??
      (typeof window !== "undefined" ? window.location.href : "");
    if (!toCopy || typeof navigator === "undefined") return;

    navigator.clipboard.writeText(toCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const btnBase =
    "w-9 h-9 flex items-center justify-center border border-soft text-muted hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer bg-white";

  return (
    <div className="flex flex-col items-center gap-2.5">
      {/* Rotated label */}
      <p
        className="text-[8px] tracking-[0.35em] uppercase text-ink/30 font-semibold mb-2 select-none"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
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
        className={`${btnBase} ${copied ? "!border-accent !text-accent bg-accent/5" : ""}`}
        title="Copy link"
      >
        <i className={`text-sm ${copied ? "ri-check-line" : "ri-link"}`} />
      </button>

      <div className="w-px h-10 bg-warm mt-1" />
    </div>
  );
}

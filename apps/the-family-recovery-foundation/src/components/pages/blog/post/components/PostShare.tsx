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
    "flex h-10 w-10 items-center justify-center rounded-full border border-mist bg-pure-white text-slate transition-all duration-200 hover:border-tfrf-blue hover:bg-tfrf-blue hover:text-pure-white";

  return (
    <div className="sticky top-28 flex flex-col items-center gap-3">
      <p className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-stone-blue mb-1">
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
        className={`${btnClass} cursor-pointer ${copied ? "border-emerald-500 bg-emerald-500 text-pure-white" : ""}`}
        title="Copy link"
      >
        <i className={`text-sm ${copied ? "ri-check-line" : "ri-link"}`} />
      </button>
    </div>
  );
}

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

  return (
    <div className="sticky top-28 flex flex-col items-center gap-3">
      <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-300 font-semibold mb-1">Share</p>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-[#0A1F44] hover:text-white text-neutral-400 transition-all duration-200 cursor-pointer"
        title="Share on X"
      >
        <i className="ri-twitter-x-line text-sm"></i>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-[#0A1F44] hover:text-white text-neutral-400 transition-all duration-200 cursor-pointer"
        title="Share on LinkedIn"
      >
        <i className="ri-linkedin-fill text-sm"></i>
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-[#0A1F44] hover:text-white text-neutral-400 transition-all duration-200 cursor-pointer"
        title="Share on Facebook"
      >
        <i className="ri-facebook-fill text-sm"></i>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
          copied ? "bg-emerald-500 text-white" : "bg-neutral-100 hover:bg-[#0A1F44] hover:text-white text-neutral-400"
        }`}
        title="Copy link"
      >
        <i className={`text-sm ${copied ? "ri-check-line" : "ri-link"}`}></i>
      </button>

      <div className="w-px h-12 bg-neutral-100 mt-1" />
    </div>
  );
}

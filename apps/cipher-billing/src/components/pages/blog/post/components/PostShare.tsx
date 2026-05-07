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
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#101E3F]/25 font-semibold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Share</p>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center bg-[#F5F7FA] border border-[#101E3F]/10 hover:bg-[#101E3F] hover:text-white hover:border-[#101E3F] text-[#101E3F]/40 transition-all duration-200 cursor-pointer"
        title="Share on X"
      >
        <i className="ri-twitter-x-line text-sm"></i>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center bg-[#F5F7FA] border border-[#101E3F]/10 hover:bg-[#101E3F] hover:text-white hover:border-[#101E3F] text-[#101E3F]/40 transition-all duration-200 cursor-pointer"
        title="Share on LinkedIn"
      >
        <i className="ri-linkedin-fill text-sm"></i>
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center bg-[#F5F7FA] border border-[#101E3F]/10 hover:bg-[#101E3F] hover:text-white hover:border-[#101E3F] text-[#101E3F]/40 transition-all duration-200 cursor-pointer"
        title="Share on Facebook"
      >
        <i className="ri-facebook-fill text-sm"></i>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={`w-9 h-9 flex items-center justify-center border transition-all duration-200 cursor-pointer ${
          copied
            ? "bg-[#166C96] text-white border-[#166C96]"
            : "bg-[#F5F7FA] border-[#101E3F]/10 hover:bg-[#101E3F] hover:text-white hover:border-[#101E3F] text-[#101E3F]/40"
        }`}
        title="Copy link"
      >
        <i className={`text-sm ${copied ? "ri-check-line" : "ri-link"}`}></i>
      </button>

      <div className="w-px h-12 bg-[#101E3F]/8 mt-1" />
    </div>
  );
}

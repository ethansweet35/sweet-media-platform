"use client";

interface PostBlogMobileShareRowProps {
  title: string;
  canonicalUrl: string;
}

export default function PostBlogMobileShareRow({ title, canonicalUrl }: PostBlogMobileShareRowProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(canonicalUrl);

  const buttonClass =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-surface text-body transition hover:bg-dark hover:text-white";

  return (
    <div className="mt-10 border-t border-border pt-8 lg:hidden">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Share this article</p>
      <div className="flex items-center gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={buttonClass}
        >
          <i className="ri-twitter-x-line text-sm" aria-hidden />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={buttonClass}
        >
          <i className="ri-linkedin-fill text-sm" aria-hidden />
        </a>
      </div>
    </div>
  );
}

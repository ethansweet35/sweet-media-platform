"use client";

interface PostBlogMobileShareRowProps {
  title: string;
  canonicalUrl: string;
}

export default function PostBlogMobileShareRow({ title, canonicalUrl }: PostBlogMobileShareRowProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(canonicalUrl);

  const btnClass =
    "flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mvt-cream)] text-[var(--mvt-muted)] ring-1 ring-[var(--mvt-cream-2)] transition hover:bg-[var(--mvt-ink)] hover:text-white cursor-pointer";

  return (
    <div className="mt-10 border-t border-[var(--mvt-cream-2)] pt-8 lg:hidden">
      <p className="mvt-eyebrow mb-4 text-[10px] tracking-[0.25em]">SHARE THIS ARTICLE</p>
      <div className="flex items-center gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btnClass}
        >
          <i className="ri-twitter-x-line text-sm" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btnClass}
        >
          <i className="ri-linkedin-fill text-sm" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btnClass}
        >
          <i className="ri-facebook-fill text-sm" />
        </a>
      </div>
    </div>
  );
}

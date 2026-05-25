"use client";

interface PostBlogMobileShareRowProps {
  title: string;
  canonicalUrl: string;
}

export default function PostBlogMobileShareRow({ title, canonicalUrl }: PostBlogMobileShareRowProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(canonicalUrl);

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-[var(--sr-sand)] bg-[var(--sr-parchment)] text-[var(--sr-muted)] transition hover:border-[var(--sr-moss)] hover:bg-[var(--sr-moss)] hover:text-[var(--sr-parchment)]";

  return (
    <div className="mt-10 border-t border-[var(--sr-sand)] pt-8 lg:hidden">
      <p
        className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-muted)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Share this article
      </p>
      <div className="flex items-center gap-2.5">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btn}
          aria-label="Share on X"
        >
          <i className="ri-twitter-x-line text-sm" aria-hidden />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btn}
          aria-label="Share on LinkedIn"
        >
          <i className="ri-linkedin-fill text-sm" aria-hidden />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btn}
          aria-label="Share on Facebook"
        >
          <i className="ri-facebook-fill text-sm" aria-hidden />
        </a>
      </div>
    </div>
  );
}

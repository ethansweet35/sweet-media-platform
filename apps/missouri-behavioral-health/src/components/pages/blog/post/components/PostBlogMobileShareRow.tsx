"use client";

interface PostBlogMobileShareRowProps {
  title: string;
  canonicalUrl: string;
}

export default function PostBlogMobileShareRow({
  title,
  canonicalUrl,
}: PostBlogMobileShareRowProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(canonicalUrl);

  const btnClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-mbh-forest/12 bg-cream text-mbh-forest transition hover:bg-mbh-forest hover:text-white";

  return (
    <div className="mt-10 border-t border-dashed border-mbh-forest/15 pt-8 lg:hidden">
      <p className="mb-4 font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-body/50">
        Share
      </p>
      <div className="flex gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btnClass}
          title="Share on X"
        >
          <i className="ri-twitter-x-line" aria-hidden />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btnClass}
          title="Share on LinkedIn"
        >
          <i className="ri-linkedin-fill" aria-hidden />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btnClass}
          title="Share on Facebook"
        >
          <i className="ri-facebook-fill" aria-hidden />
        </a>
      </div>
    </div>
  );
}

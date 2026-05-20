"use client";

interface PostBlogMobileShareRowProps {
  title: string;
  canonicalUrl: string;
}

export default function PostBlogMobileShareRow({ title, canonicalUrl }: PostBlogMobileShareRowProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(canonicalUrl);

  const btnClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-mist bg-pure-white text-slate transition-all duration-200 hover:border-tfrf-blue hover:bg-tfrf-blue hover:text-pure-white";

  return (
    <div className="mt-10 border-t border-mist pt-8 lg:hidden">
      <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
        Share this article
      </p>
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

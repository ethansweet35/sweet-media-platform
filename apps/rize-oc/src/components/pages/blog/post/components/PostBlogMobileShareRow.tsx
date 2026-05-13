"use client";

interface PostBlogMobileShareRowProps {
  title: string;
  canonicalUrl: string;
}

export default function PostBlogMobileShareRow({ title, canonicalUrl }: PostBlogMobileShareRowProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(canonicalUrl);

  const btnClass =
    "w-9 h-9 flex items-center justify-center border border-soft text-muted hover:border-accent hover:text-accent transition-all duration-200";

  return (
    <div className="mt-10 pt-8 border-t border-soft lg:hidden">
      <p className="text-[9px] tracking-[0.32em] uppercase text-ink/35 font-semibold mb-4">
        Share this article
      </p>
      <div className="flex items-center gap-2.5">
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

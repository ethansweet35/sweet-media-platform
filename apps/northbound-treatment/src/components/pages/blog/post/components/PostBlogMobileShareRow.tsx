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

  const btnBase =
    "flex h-9 w-9 items-center justify-center border border-[#cdd8e8] text-[#94a3b8] transition-all hover:border-[#3a6697] hover:bg-[#3a6697] hover:text-white";

  return (
    <div className="mt-10 border-t border-[#eef2f7] pt-8 lg:hidden">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-[2px] w-6 bg-[#e97a52]" />
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">
          Share This Article
        </p>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btnBase}
        >
          <i className="ri-twitter-x-line text-sm" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btnBase}
        >
          <i className="ri-linkedin-fill text-sm" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={btnBase}
        >
          <i className="ri-facebook-fill text-sm" />
        </a>
      </div>
    </div>
  );
}

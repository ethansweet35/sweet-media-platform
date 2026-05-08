"use client";

interface PostBlogMobileShareRowProps {
  title: string;
  canonicalUrl: string;
}

export default function PostBlogMobileShareRow({ title, canonicalUrl }: PostBlogMobileShareRowProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(canonicalUrl);

  return (
    <div className="mt-10 pt-8 border-t border-neutral-100 lg:hidden">
      <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-4">
        Share this article
      </p>
      <div className="flex items-center gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-[#1F2937] hover:text-white text-neutral-400 transition-all duration-200 cursor-pointer"
        >
          <i className="ri-twitter-x-line text-sm" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-[#1F2937] hover:text-white text-neutral-400 transition-all duration-200 cursor-pointer"
        >
          <i className="ri-linkedin-fill text-sm" />
        </a>
      </div>
    </div>
  );
}

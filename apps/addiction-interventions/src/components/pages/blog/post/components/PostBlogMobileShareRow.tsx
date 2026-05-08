"use client";

interface PostBlogMobileShareRowProps {
  title: string;
  canonicalUrl: string;
}

export default function PostBlogMobileShareRow({ title, canonicalUrl }: PostBlogMobileShareRowProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(canonicalUrl);

  return (
    <div className="mt-10 pt-8 border-t border-[#EFEFEF] lg:hidden">
      <p className="text-[10px] tracking-[0.3em] uppercase text-[#8FAC87] font-semibold mb-4">
        Share this article
      </p>
      <div className="flex items-center gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F3E7] hover:bg-[#3E5B50] hover:text-white text-[#4B4B4B]/50 transition-all duration-200 cursor-pointer"
        >
          <i className="ri-twitter-x-line text-sm" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F3E7] hover:bg-[#3E5B50] hover:text-white text-[#4B4B4B]/50 transition-all duration-200 cursor-pointer"
        >
          <i className="ri-linkedin-fill text-sm" />
        </a>
      </div>
    </div>
  );
}

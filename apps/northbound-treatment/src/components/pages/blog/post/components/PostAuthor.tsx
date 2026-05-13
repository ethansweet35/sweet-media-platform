import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  return (
    <div className="mt-12 border-t border-[#eef2f7] pt-10">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-[2px] w-8 bg-[#e97a52]" />
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">
          About the Author
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Photo */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-[#cdd8e8]">
          {post.authorPhoto ? (
            <Image
              src={post.authorPhoto}
              alt={post.author}
              width={80}
              height={80}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#3a6697] text-lg font-bold text-white">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3 className="font-heading text-lg font-bold text-[#3a6697]">{post.author}</h3>
            <span className="bg-[#3a6697] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
              {post.authorRole}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#64748b]">{post.authorBio}</p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center border border-[#cdd8e8] text-[#94a3b8] transition-all hover:border-[#3a6697] hover:bg-[#3a6697] hover:text-white"
            >
              <i className="ri-linkedin-fill text-sm" />
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center border border-[#cdd8e8] text-[#94a3b8] transition-all hover:border-[#3a6697] hover:bg-[#3a6697] hover:text-white"
            >
              <i className="ri-twitter-x-line text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

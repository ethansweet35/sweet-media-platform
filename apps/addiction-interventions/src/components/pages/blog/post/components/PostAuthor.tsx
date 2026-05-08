import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  return (
    <div className="mt-14 pt-10 border-t border-[#EFEFEF]">
      <p className="text-[10px] tracking-[0.3em] uppercase text-[#8FAC87] font-semibold mb-6">
        About the Author
      </p>
      <div className="flex flex-col sm:flex-row gap-6 items-start bg-[#F5F3E7] rounded-2xl p-6">
        {/* Photo */}
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#8FAC87]/20 flex-shrink-0">
          {post.authorPhoto ? (
            <Image
              src={post.authorPhoto}
              alt={post.author}
              width={80}
              height={80}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="ri-user-3-line text-2xl text-[#507969]" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-base font-bold text-[#1A1A17]">{post.author}</h3>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold bg-[#8FAC87]/20 text-[#507969] px-2.5 py-1 rounded-full">
              {post.authorRole}
            </span>
          </div>
          <p className="text-sm text-[#4B4B4B]/70 leading-relaxed mb-4">
            {post.authorBio}
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#EFEFEF] hover:bg-[#3E5B50] hover:text-white hover:border-[#3E5B50] text-[#4B4B4B]/50 transition-all duration-200 cursor-pointer"
            >
              <i className="ri-linkedin-fill text-sm"></i>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#EFEFEF] hover:bg-[#3E5B50] hover:text-white hover:border-[#3E5B50] text-[#4B4B4B]/50 transition-all duration-200 cursor-pointer"
            >
              <i className="ri-twitter-x-line text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  return (
    <div className="mt-14 pt-10 border-t border-neutral-100">
      <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-6">
        About the Author
      </p>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Photo */}
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0">
          <Image
            src={post.authorPhoto}
            alt={post.author}
            width={80}
            height={80}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-neutral-900">{post.author}</h3>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold bg-[#1F2937]/8 text-[#1F2937] px-2.5 py-1 rounded-full">
              {post.authorRole}
            </span>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            {post.authorBio}
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-[#1F2937] hover:text-white text-neutral-500 transition-all duration-200 cursor-pointer"
            >
              <i className="ri-linkedin-fill text-sm"></i>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-[#1F2937] hover:text-white text-neutral-500 transition-all duration-200 cursor-pointer"
            >
              <i className="ri-twitter-x-line text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

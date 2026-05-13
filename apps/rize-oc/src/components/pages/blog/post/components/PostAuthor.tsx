import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  return (
    <div className="mt-14 pt-10 border-t border-[#EBEBEB]">
      <p className="text-[10px] tracking-[0.3em] uppercase text-ink/35 font-semibold mb-6">
        About the Author
      </p>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Photo */}
        <div className="relative w-20 h-20 overflow-hidden bg-[#EBEBEB] shrink-0 flex items-center justify-center">
          {post.authorPhoto ? (
            <Image
              src={post.authorPhoto}
              alt={post.author ?? "Author"}
              width={80}
              height={80}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <span className="text-ink/40 text-2xl font-semibold">
              {(post.author ?? "R").split(" ").map((n) => n[0]).join("")}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-[17px] font-semibold text-ink">{post.author}</h3>
            <span className="text-[9px] tracking-[0.2em] uppercase font-semibold bg-accent/10 text-accent px-2.5 py-1">
              {post.authorRole}
            </span>
          </div>
          <p className="text-[14px] font-light text-ink/55 leading-relaxed mb-4">
            {post.authorBio}
          </p>
        </div>
      </div>
    </div>
  );
}

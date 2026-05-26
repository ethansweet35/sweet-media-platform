import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";
import { BLOG_HEADING } from "@/components/pages/blog/blogTokens";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  return (
    <div className="mt-14 border-t border-border pt-10">
      <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">About the author</p>
      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
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
            <div className="flex h-full w-full items-center justify-center bg-dark text-sm font-bold text-white">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-ink" style={BLOG_HEADING}>
              {post.author}
            </h3>
            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-dark">
              {post.authorRole}
            </span>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-body">{post.authorBio}</p>
        </div>
      </div>
    </div>
  );
}

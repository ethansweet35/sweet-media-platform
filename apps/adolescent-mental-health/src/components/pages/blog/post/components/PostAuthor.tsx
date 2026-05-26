import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";
import { BLOG_HEADING, blogAuthorInitials, blogAuthorName, DEFAULT_BLOG_AUTHOR_ROLE } from "@/components/pages/blog/blogTokens";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface-muted pt-0">
      <div className="h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" aria-hidden />
      <div className="px-6 py-8 md:px-8">
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">About the author</p>
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
            {post.authorPhoto ? (
              <Image
                src={post.authorPhoto}
                alt={blogAuthorName(post.author)}
                width={80}
                height={80}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-dark text-sm font-bold text-white">
                {blogAuthorInitials(post.author)}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-bold text-ink" style={BLOG_HEADING}>
                {blogAuthorName(post.author)}
              </h3>
              <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-dark">
                {post.authorRole || DEFAULT_BLOG_AUTHOR_ROLE}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-body">{post.authorBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

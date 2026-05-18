import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  return (
    <div className="mt-14 rounded-2xl border border-[var(--mvt-cream-2)] bg-[var(--mvt-cream)] p-7">
      <p className="mvt-eyebrow mb-5 text-[10px] tracking-[0.25em]">ABOUT THE AUTHOR</p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Photo */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-[var(--mvt-cream-2)]">
          <Image
            src={post.authorPhoto}
            alt={post.author}
            width={80}
            height={80}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2.5">
            <h3 className="font-heading text-lg font-bold text-[var(--mvt-ink)]">{post.author}</h3>
            <span className="rounded-full bg-[var(--mvt-teal)]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--mvt-teal)]">
              {post.authorRole}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--mvt-muted)]">{post.authorBio}</p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--mvt-muted)] ring-1 ring-[var(--mvt-cream-2)] transition hover:bg-[var(--mvt-ink)] hover:text-white"
            >
              <i className="ri-linkedin-fill text-sm" />
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--mvt-muted)] ring-1 ring-[var(--mvt-cream-2)] transition hover:bg-[var(--mvt-ink)] hover:text-white"
            >
              <i className="ri-twitter-x-line text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="mt-14 rounded-2xl border border-[var(--sr-sand)] bg-[var(--sr-parchment)] p-6 md:p-8">
      <p
        className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-muted)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        About the author
      </p>
      <div className="flex flex-col items-start gap-5 sm:flex-row">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[var(--sr-moss)]">
          {post.authorPhoto ? (
            <Image
              src={post.authorPhoto}
              alt={post.author}
              width={80}
              height={80}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-sm font-semibold text-[var(--sr-parchment)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {initials || "SR"}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3
              className="text-xl font-medium text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {post.author}
            </h3>
            {post.authorRole ? (
              <span
                className="rounded-full bg-[var(--sr-moss)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--sr-moss)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {post.authorRole}
              </span>
            ) : null}
          </div>
          {post.authorBio ? (
            <p
              className="text-sm leading-relaxed text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {post.authorBio}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

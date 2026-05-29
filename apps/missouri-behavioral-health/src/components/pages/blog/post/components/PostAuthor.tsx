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
    .slice(0, 2);

  return (
    <div className="mt-12 border-t border-mbh-forest/10 pt-8">
      <p className="mb-4 font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-body/50">
        About the author
      </p>
      <div className="flex gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-cream ring-1 ring-mbh-forest/10">
          {post.authorPhoto ? (
            <Image
              src={post.authorPhoto}
              alt={post.author}
              width={64}
              height={64}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-body text-sm font-bold text-mbh-forest">
              {initials}
            </span>
          )}
        </div>
        <div>
          <p className="font-display text-base font-semibold text-mbh-forest">{post.author}</p>
          {post.authorRole ? (
            <p className="font-body text-sm text-mbh-body/70">{post.authorRole}</p>
          ) : null}
          {post.authorBio ? (
            <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{post.authorBio}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

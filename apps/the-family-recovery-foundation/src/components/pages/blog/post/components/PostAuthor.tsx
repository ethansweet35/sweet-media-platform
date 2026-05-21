import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";
import { sanitizeBlogImageSrc, shouldUnoptimizeBlogImage } from "@/lib/blogImages";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  const authorPhoto = sanitizeBlogImageSrc(post.authorPhoto);

  return (
    <div className="mt-14 rounded-2xl border border-mist bg-pure-white p-6 md:p-8 shadow-sm">
      <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-5">
        About the Author
      </p>
      <div className="flex flex-col items-start gap-5 sm:flex-row">
        {authorPhoto ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-mist">
            <Image
              src={authorPhoto}
              alt={post.author}
              width={80}
              height={80}
              loading="lazy"
              unoptimized={shouldUnoptimizeBlogImage(authorPhoto)}
              className="h-full w-full object-cover object-top"
            />
          </div>
        ) : null}

        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl text-deep-navy">{post.author}</h3>
            {post.authorRole ? (
              <span className="rounded-full bg-powder-blue/50 px-3 py-1 text-[11px] font-body font-semibold uppercase tracking-[0.1em] text-tfrf-blue">
                {post.authorRole}
              </span>
            ) : null}
          </div>
          {post.authorBio ? (
            <p className="font-body text-body-s text-slate leading-relaxed">{post.authorBio}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

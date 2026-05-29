import Image from "next/image";
import Link from "next/link";
import { CONTAINER } from "@/data/site";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  const hasImage = Boolean(post.image);

  return (
    <header className="border-b border-mbh-forest/10 bg-mbh-forest-deep text-white">
      <div className={`${CONTAINER} py-8 lg:py-10`}>
        <nav
          className="mb-6 flex flex-wrap items-center gap-2 font-body text-[11px] text-white/50"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <i className="ri-arrow-right-s-line" aria-hidden />
          <Link href="/blog" className="transition hover:text-white">
            Insights
          </Link>
          <i className="ri-arrow-right-s-line" aria-hidden />
          <span className="text-white/70">{post.category}</span>
        </nav>

        <div className={hasImage ? "grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10" : "max-w-3xl"}>
          <div>
            <span className="inline-block font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-sage">
              {post.category}
            </span>
            <h1
              className="mt-3 font-display font-semibold leading-tight tracking-tight text-white"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 font-body text-[11px] text-white/55">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {hasImage ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-white/15">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useBlogPosts } from "@sweetmedia/blog-core";
import { CONTAINER } from "@/data/site";

export default function BlogFeatured() {
  const { posts, loading } = useBlogPosts();

  const post = posts.find((p) => p.featured) ?? posts[0];

  if (loading) {
    return (
      <section className="bg-mbh-forest-deep">
        <div className={`${CONTAINER} py-12 lg:py-16`}>
          <div className="grid animate-pulse gap-8 lg:grid-cols-12 lg:items-center">
            <div className="aspect-[16/10] rounded-2xl bg-white/10 lg:col-span-7" />
            <div className="space-y-4 lg:col-span-5">
              <div className="h-3 w-24 rounded bg-white/10" />
              <div className="h-10 w-full rounded bg-white/10" />
              <div className="h-16 w-full rounded bg-white/10" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="relative overflow-hidden bg-mbh-forest-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 48px, rgba(255,255,255,0.03) 48px, rgba(255,255,255,0.03) 49px)",
        }}
      />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-mbh-green/20" aria-hidden />

      <div className={`${CONTAINER} relative py-12 lg:py-16`}>
        <p className="mb-6 font-body text-[10px] font-bold uppercase tracking-[0.32em] text-mbh-sage">
          Cover story
        </p>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Link
            href={`/${post.slug}`}
            className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 lg:col-span-7"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mbh-forest-deep/50 to-transparent"
                aria-hidden
              />
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-mbh-green px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              {post.category}
            </span>
          </Link>

          <div className="lg:col-span-5">
            <div className="mb-4 flex flex-wrap items-center gap-3 font-body text-[11px] text-white/50">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden />
              <span>{post.readTime}</span>
            </div>

            <Link href={`/${post.slug}`} className="group block">
              <h2
                className="font-display font-semibold leading-[1.12] tracking-tight text-white transition group-hover:text-mbh-mint"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                {post.title}
              </h2>
            </Link>

            <p className="mt-4 font-body text-sm leading-relaxed text-white/65 line-clamp-4">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="min-w-0">
                <p className="truncate font-body text-sm font-semibold text-white">{post.author}</p>
                <p className="truncate font-body text-[11px] text-white/45">{post.authorRole}</p>
              </div>
              <Link
                href={`/${post.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-mbh-green px-5 py-2.5 font-body text-xs font-semibold text-white transition hover:bg-mbh-green-hover"
              >
                Read article
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

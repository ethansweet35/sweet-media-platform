"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";
import { BLOG_CONTAINER, BLOG_HEADING, blogAuthorInitials, blogAuthorName, DEFAULT_BLOG_AUTHOR_ROLE } from "@/components/pages/blog/blogTokens";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-35" />

      <div className="relative px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-32">
        <div className={BLOG_CONTAINER}>
          <div className="mb-8 flex items-center gap-2">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-body/70 transition hover:text-ink"
            >
              <i className="ri-arrow-left-line text-xs" aria-hidden />
              Blog
            </Link>
            <span className="text-border">/</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">{post.category}</span>
          </div>

          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-accent-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {post.category}
              </span>

              <h1
                className="mt-7 mb-6 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.75rem]"
                style={BLOG_HEADING}
              >
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="max-w-3xl text-base leading-8 text-body md:text-lg">{post.excerpt}</p>
              ) : null}

              <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-border pt-6 md:gap-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-muted">
                    {post.authorPhoto ? (
                      <Image
                        src={post.authorPhoto}
                        alt={blogAuthorName(post.author)}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-accent">
                        {blogAuthorInitials(post.author)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight text-ink">
                      {blogAuthorName(post.author)}
                    </p>
                    <p className="text-[11px] text-body">{post.authorRole || DEFAULT_BLOG_AUTHOR_ROLE}</p>
                  </div>
                </div>

                <div className="hidden h-9 w-px bg-border md:block" />

                <div className="flex items-center gap-2 text-body">
                  <i className="ri-calendar-line text-xs" aria-hidden />
                  <span className="text-[11px]">{post.date}</span>
                </div>

                <div className="flex items-center gap-2 text-body">
                  <i className="ri-time-line text-xs" aria-hidden />
                  <span className="text-[11px]">{post.readTime}</span>
                </div>
              </div>
            </div>

            {post.image ? (
              <div className="relative w-full max-w-[520px] lg:ml-auto">
                <div
                  className="absolute -inset-2 rounded-[2rem] bg-accent/25 md:-inset-3"
                  aria-hidden
                />
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/10 ring-1 ring-white/60">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-dark/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    <i className="ri-time-line text-xs text-accent" aria-hidden />
                    {post.readTime}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {post.tags?.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-white px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-body"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBlogPosts } from "@sweetmedia/blog-core";

export default function BlogFeatured() {
  const { posts, loading } = useBlogPosts();
  const router = useRouter();

  const post = posts.find((p) => p.featured);

  if (loading) {
    return (
      <section className="w-full bg-pure-white border-b border-mist">
        <div className="max-w-content mx-auto px-6 lg:px-16 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center animate-pulse">
            <div className="aspect-[4/3] bg-mist rounded-2xl" />
            <div className="space-y-4">
              <div className="h-4 bg-mist rounded w-1/3" />
              <div className="h-8 bg-mist rounded w-3/4" />
              <div className="h-4 bg-mist rounded w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="w-full bg-pure-white border-b border-mist">
      <div className="max-w-content mx-auto px-6 lg:px-16 py-14 md:py-20">
        <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-8">
          Featured Article
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-mist shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={900}
              priority
              className="w-full h-auto block"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block rounded-full bg-deep-navy/90 px-3 py-1.5 text-[10px] font-body font-semibold uppercase tracking-[0.14em] text-pure-white backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-5 text-caption font-body text-stone-blue">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-mist" />
              <span>{post.readTime}</span>
            </div>

            <h2 className="font-display text-[clamp(26px,3.5vw,40px)] text-deep-navy leading-[1.15] mb-5">
              {post.title}
            </h2>

            <p className="font-body text-body-m text-slate leading-relaxed mb-8">{post.excerpt}</p>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tfrf-blue text-pure-white">
                  <span className="text-xs font-body font-bold">
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-body text-body-s font-semibold text-deep-navy">{post.author}</p>
                  {post.authorRole ? (
                    <p className="text-caption font-body text-stone-blue">{post.authorRole}</p>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-deep-navy px-6 py-3 text-sm font-body font-semibold text-pure-white transition-colors hover:bg-tfrf-blue"
              >
                Read Article
                <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <section className="relative min-h-[420px] md:min-h-[480px] w-full overflow-hidden bg-deep-navy">
      {post.image ? (
        <>
          <Image
            src={post.image}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/92 via-deep-navy/75 to-tfrf-blue/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/40 via-transparent to-deep-navy/80" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-tfrf-blue/90 to-sky-blue/40" />
      )}

      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-sky-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-powder-blue/15 blur-3xl" />

      <div className={`relative z-10 max-w-content mx-auto px-6 lg:px-16 ${PAGE_TOP_NAV_PADDING} pb-14 md:pb-20`}>
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-[12px] font-body font-semibold uppercase tracking-[0.18em]">
          <Link href="/blog" className="text-pure-white/70 transition-colors hover:text-pure-white">
            <i className="ri-arrow-left-line mr-1.5 align-middle" />
            Blog
          </Link>
          <span className="text-pure-white/35">/</span>
          <span className="text-sky-blue">{post.category}</span>
        </nav>

        <div className="max-w-4xl">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-4">
            Family Recovery Journal
          </p>
          <h1 className="text-[clamp(32px,4.5vw,56px)] font-display text-pure-white leading-[1.1] mb-6">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="text-body-l font-body text-pure-white/85 leading-relaxed max-w-3xl mb-8">
              {post.excerpt}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4 md:gap-6 border-t border-pure-white/15 pt-6">
            <div className="flex items-center gap-3">
              {post.authorPhoto ? (
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-pure-white/25">
                  <Image src={post.authorPhoto} alt="" fill sizes="44px" className="object-cover" />
                </div>
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tfrf-blue/40 text-pure-white">
                  <i className="ri-user-line text-lg" />
                </div>
              )}
              <div>
                <p className="text-body-s font-body font-semibold text-pure-white">{post.author}</p>
                {post.authorRole ? (
                  <p className="text-caption font-body text-pure-white/60">{post.authorRole}</p>
                ) : null}
              </div>
            </div>
            <span className="hidden h-8 w-px bg-pure-white/20 md:block" />
            <span className="flex items-center gap-2 text-caption font-body text-pure-white/70">
              <i className="ri-calendar-line" />
              {post.date}
            </span>
            <span className="flex items-center gap-2 text-caption font-body text-pure-white/70">
              <i className="ri-time-line" />
              {post.readTime}
            </span>
          </div>
        </div>

        {post.tags?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-pure-white/20 bg-pure-white/10 px-3 py-1 text-[11px] font-body font-semibold uppercase tracking-[0.12em] text-pure-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

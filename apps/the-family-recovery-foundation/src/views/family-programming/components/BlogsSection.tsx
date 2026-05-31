'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useBlogPosts } from "@sweetmedia/blog-core";

function BlogCard({
  post,
  index,
  visible,
}: {
  post: { slug: string; title: string; excerpt: string; image: string; category: string };
  index: number;
  visible: boolean;
}) {
  return (
    <article
      className="group bg-pure-white rounded-xl border border-mist/50 overflow-hidden transition-all duration-500 hover:border-tfrf-blue/30 hover:shadow-md flex flex-col h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-mist" />
        )}
        <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors duration-300" />
        {post.category ? (
          <span className="absolute top-3 left-3 text-[11px] font-body font-semibold text-pure-white bg-tfrf-blue/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        ) : null}
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-[15px] md:text-[17px] font-body font-semibold text-deep-navy leading-snug mb-3 group-hover:text-tfrf-blue transition-colors">
          {post.title}
        </h3>
        <p className="text-[13px] md:text-[14px] font-body text-slate leading-relaxed flex-1 mb-4 line-clamp-4">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors mt-auto"
        >
          Read more
          <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { posts, loading } = useBlogPosts();
  const preview = posts.slice(0, 8);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-soft-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div
          className="text-center mb-10 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Learn More
          </p>
          <h2 className="text-display-s font-display text-deep-navy mb-4">Blogs</h2>
          <p className="text-body-m font-body text-slate max-w-xl mx-auto leading-relaxed">
            Information, services, and partnerships for recovery.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-slate font-body text-sm">Loading articles…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {preview.map((post, i) => (
              <BlogCard
                key={post.slug}
                post={{
                  slug: post.slug,
                  title: post.title,
                  excerpt: post.excerpt,
                  image: post.image,
                  category: post.category,
                }}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        )}

        {!loading && posts.length > 0 ? (
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-tfrf-blue hover:bg-mist transition-colors"
            >
              View all articles
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

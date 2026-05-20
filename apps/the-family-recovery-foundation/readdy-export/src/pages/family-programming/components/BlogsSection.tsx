import { useEffect, useRef, useState } from "react";
import { blogPosts } from "@/mocks/family-programming";

function BlogCard({
  post,
  index,
  visible,
}: {
  post: (typeof blogPosts)[0];
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
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors duration-300" />
        <span className="absolute top-3 left-3 text-[11px] font-body font-semibold text-pure-white bg-tfrf-blue/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-[15px] md:text-[17px] font-body font-semibold text-deep-navy leading-snug mb-3 group-hover:text-tfrf-blue transition-colors">
          {post.title}
        </h3>
        <p className="text-[13px] md:text-[14px] font-body text-slate leading-relaxed flex-1 mb-4 line-clamp-4">
          {post.excerpt}
        </p>
        <button className="inline-flex items-center gap-1.5 text-[13px] font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors cursor-pointer mt-auto">
          Read more
          <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
        </button>
      </div>
    </article>
  );
}

export default function BlogsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        {/* Section header */}
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
          <h2 className="text-display-s font-display text-deep-navy mb-4">
            Blogs
          </h2>
          <p className="text-body-m font-body text-slate max-w-xl mx-auto leading-relaxed">
            Information, services, and partnerships for recovery.
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostRelatedProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  const otherPosts = allPosts.filter((p) => p.id !== currentPost.id);

  const scored = otherPosts.map((post) => {
    const currentTags = new Set(currentPost.tags.map((t) => t.toLowerCase()));
    const postTags = post.tags.map((t) => t.toLowerCase());
    const tagOverlap = postTags.filter((t) => currentTags.has(t)).length;
    const sameCategory = post.category === currentPost.category ? 2 : 0;
    const score = tagOverlap * 3 + sameCategory;
    return { post, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
  });

  return scored.slice(0, 6).map((s) => s.post);
}

export default function PostRelated({ currentPost, allPosts }: PostRelatedProps) {
  const related = getRelatedPosts(currentPost, allPosts);

  if (related.length === 0) return null;

  return (
    <section className="w-full border-t border-mist bg-pure-white">
      <div className="max-w-content mx-auto px-6 lg:px-16 py-14 md:py-18">
        <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-8">
          Continue Reading
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {related.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-2xl border border-mist bg-soft-white transition-all duration-300 hover:border-tfrf-blue/30 hover:shadow-[0_8px_32px_rgba(30,58,95,0.08)]"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block rounded-full bg-deep-navy/90 px-2.5 py-1 text-[10px] font-body font-semibold uppercase tracking-[0.14em] text-pure-white backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2 text-caption font-body text-stone-blue">
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-mist" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-display text-base text-deep-navy leading-snug mb-3 line-clamp-2 transition-colors group-hover:text-tfrf-blue">
                    {post.title}
                  </h3>

                  <p className="font-body text-body-s text-slate leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-mist pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-tfrf-blue text-pure-white">
                        <span className="text-[9px] font-body font-bold">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-caption font-body text-slate">{post.author}</span>
                    </div>
                    <span className="flex items-center gap-1 text-caption font-body font-semibold uppercase tracking-[0.1em] text-tfrf-blue transition-colors group-hover:text-deep-navy">
                      Read
                      <i className="ri-arrow-right-line text-xs group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

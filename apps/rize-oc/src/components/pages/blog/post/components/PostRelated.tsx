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
    return { post, score: tagOverlap * 3 + sameCategory };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
  });

  return scored.slice(0, 3).map((s) => s.post);
}

export default function PostRelated({ currentPost, allPosts }: PostRelatedProps) {
  const related = getRelatedPosts(currentPost, allPosts);
  if (related.length === 0) return null;

  return (
    <section className="w-full bg-cream border-t border-[#EBEBEB]">
      <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-10 py-[80px]">
        {/* Label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-ink/20" />
          <span className="text-[10px] tracking-[0.32em] uppercase text-ink/40 font-semibold">
            Continue Reading
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-[#E8E8E8] overflow-hidden hover:border-ink/20 transition-colors block"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                      <i className="ri-article-line text-4xl" />
                    </div>
                  )}
                  {post.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-accent text-white text-[9px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3 text-[11px] text-ink/40">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-ink/20" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3
                    className="font-[family-name:var(--font-display)] font-normal text-ink leading-snug mb-3 line-clamp-2 group-hover:opacity-70 transition-opacity"
                    style={{ fontSize: "clamp(17px, 1.4vw, 21px)" }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-[13px] font-light text-ink/50 leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EBEBEB]">
                    <span className="text-[11px] text-ink/50">{post.author ?? "Rize OC"}</span>
                    <span className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase font-semibold text-accent group-hover:gap-2 transition-all">
                      Read <i className="ri-arrow-right-line text-xs" />
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

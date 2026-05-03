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
    <section className="w-full bg-white border-t border-neutral-100">
      <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-px bg-neutral-300" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold">
            Continue Reading
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {related.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 transition-all duration-300 block"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-[10px] tracking-[0.15em] uppercase font-bold text-[#2C3B2E] px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] text-neutral-400">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="text-[11px] text-neutral-400">{post.readTime}</span>
                  </div>

                  <h3
                    className="text-base font-medium text-neutral-900 leading-snug mb-3 group-hover:text-[#2C3B2E] transition-colors line-clamp-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#2C3B2E] flex items-center justify-center">
                        <span className="text-white text-[9px] font-bold">
                          {post.author.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500">{post.author}</span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] tracking-[0.1em] uppercase font-medium text-[#2C3B2E] group-hover:text-[#C8795A] transition-colors">
                      Read
                      <i className="ri-arrow-right-line text-xs group-hover:translate-x-0.5 transition-transform"></i>
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

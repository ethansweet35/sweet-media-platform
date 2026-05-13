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
    <section className="border-t border-[#eef2f7] bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-[2px] w-10 bg-[#e97a52]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">
            Continue Reading
          </span>
        </div>

        {/* Gapless grid */}
        <div className="grid grid-cols-1 gap-px bg-[#cdd8e8] md:grid-cols-3">
          {related.map((post) => (
            <article key={post.id} className="group bg-white">
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: "16/10" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute left-0 top-4">
                    <span className="bg-[#3a6697] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-[11px] text-[#94a3b8]">{post.date}</span>
                    <span className="h-3 w-px bg-[#cdd8e8]" />
                    <span className="text-[11px] text-[#94a3b8]">{post.readTime}</span>
                  </div>

                  <h3 className="font-heading mb-3 text-base font-bold leading-snug text-[#3a6697] transition-colors duration-200 group-hover:text-[#e97a52] line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-[#64748b]">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#eef2f7] pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center bg-[#3a6697]">
                        <span className="text-[9px] font-bold text-white">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[#64748b]">{post.author}</span>
                    </div>

                    <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#e97a52] transition-colors hover:text-[#3a6697]">
                      Read
                      <i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

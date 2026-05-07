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
    const tagOverlap = post.tags.filter((t) => currentTags.has(t.toLowerCase())).length;
    const sameCategory = post.category === currentPost.category ? 2 : 0;
    return { post, score: tagOverlap * 3 + sameCategory };
  });
  scored.sort((a, b) =>
    b.score !== a.score
      ? b.score - a.score
      : new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime()
  );
  return scored.slice(0, 3).map((s) => s.post);
}

export default function PostRelated({ currentPost, allPosts }: PostRelatedProps) {
  const related = getRelatedPosts(currentPost, allPosts);
  if (related.length === 0) return null;

  return (
    <section className="w-full bg-[#F5F7FA] border-t border-[#101E3F]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-px bg-[#166C96]" />
          <span
            className="text-[10px] tracking-[0.35em] uppercase text-[#166C96] font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Continue Reading
          </span>
        </div>

        {/* Cards — horizontal list on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#101E3F]/10">
          {related.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white flex flex-col overflow-hidden hover:shadow-[0_4px_24px_rgba(16,30,63,0.10)] transition-all duration-300"
            >
              {post.image && (
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#166C96] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}

              <div className="flex-1 flex flex-col p-5">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#166C96] border border-[#166C96]/30 px-2 py-0.5"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {post.category}
                  </span>
                  <span
                    className="text-[10px] text-[#101E3F]/35"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {post.readTime}
                  </span>
                </div>

                <h3
                  className="text-[#101E3F] leading-snug mb-3 flex-1 group-hover:text-[#166C96] transition-colors line-clamp-2"
                  style={{
                    fontFamily: "'Marcellus', serif",
                    fontSize: "clamp(15px, 1.4vw, 18px)",
                  }}
                >
                  {post.title}
                </h3>

                <div
                  className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#166C96] mt-3 pt-3 border-t border-[#101E3F]/8 group-hover:gap-2.5 transition-all"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Read Article
                  <i className="ri-arrow-right-line text-xs" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

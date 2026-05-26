import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";
import { BLOG_CONTAINER, BLOG_HEADING, BLOG_SECTION, blogAuthorName } from "@/components/pages/blog/blogTokens";

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
    <section className={`${BLOG_SECTION} border-t border-border bg-white`}>
      <div className={`${BLOG_CONTAINER} px-6 lg:px-10`}>
        <p className="mb-10 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Continue reading</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {related.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-3xl border border-border bg-white transition duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2 text-[11px] text-body">
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3
                    className="mb-3 line-clamp-2 text-base font-bold leading-snug text-ink transition group-hover:text-accent-dark"
                    style={BLOG_HEADING}
                  >
                    {post.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-body">{post.excerpt}</p>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="text-[11px] text-body">{blogAuthorName(post.author)}</span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-dark transition group-hover:text-accent">
                      Read
                      <i className="ri-arrow-right-line text-xs transition group-hover:translate-x-0.5" aria-hidden />
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

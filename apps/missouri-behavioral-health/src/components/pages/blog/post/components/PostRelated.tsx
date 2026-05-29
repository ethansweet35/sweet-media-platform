import Image from "next/image";
import Link from "next/link";
import { CONTAINER } from "@/data/site";
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

  return scored.slice(0, 4).map((s) => s.post);
}

export default function PostRelated({ currentPost, allPosts }: PostRelatedProps) {
  const related = getRelatedPosts(currentPost, allPosts);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-mbh-forest/10 bg-white py-12 md:py-14">
      <div className={CONTAINER}>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-mbh-forest md:text-2xl">
            Continue reading
          </h2>
          <Link
            href="/blog"
            className="font-body text-sm font-semibold text-mbh-green hover:text-mbh-forest"
          >
            All articles →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((post) => (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              className="group flex gap-4 rounded-xl border border-mbh-forest/10 bg-cream p-4 transition hover:border-mbh-green/30"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-white">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <span className="font-body text-[10px] font-bold uppercase tracking-wide text-mbh-green">
                  {post.category}
                </span>
                <h3 className="mt-1 font-display text-sm font-semibold leading-snug text-mbh-forest transition group-hover:text-mbh-green line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-1 font-body text-[11px] text-mbh-body/60">{post.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

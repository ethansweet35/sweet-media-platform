import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostInlineRelatedProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

function getInlineRelated(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  const otherPosts = allPosts.filter((p) => p.id !== currentPost.id);

  const scored = otherPosts.map((post) => {
    const currentTags = new Set(currentPost.tags.map((t) => t.toLowerCase()));
    const postTags = post.tags.map((t) => t.toLowerCase());
    const tagOverlap = postTags.filter((t) => currentTags.has(t)).length;
    const sameCategory = post.category === currentPost.category ? 1 : 0;
    return { post, score: tagOverlap * 2 + sameCategory };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
  });

  return scored.slice(0, 3).map((s) => s.post);
}

export default function PostInlineRelated({ currentPost, allPosts }: PostInlineRelatedProps) {
  const related = getInlineRelated(currentPost, allPosts);
  if (related.length === 0) return null;

  return (
    <aside
      className="my-10 rounded-xl border border-mbh-forest/10 bg-white p-5 md:p-6"
      aria-label="Related reading"
    >
      <p className="mb-4 font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-green">
        Related reading
      </p>
      <ul className="space-y-3">
        {related.map((post) => (
          <li key={post.id}>
            <Link
              href={`/${post.slug}`}
              className="group flex items-start gap-3 rounded-lg p-2 transition hover:bg-cream"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                {post.image ? (
                  <Image src={post.image} alt="" fill sizes="56px" className="object-cover" />
                ) : null}
              </div>
              <div className="min-w-0">
                <span className="font-body text-[10px] font-bold uppercase tracking-wide text-mbh-green">
                  {post.category}
                </span>
                <p className="mt-0.5 font-display text-sm font-semibold leading-snug text-mbh-forest transition group-hover:text-mbh-green line-clamp-2">
                  {post.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

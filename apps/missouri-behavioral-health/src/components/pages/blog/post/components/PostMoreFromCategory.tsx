import Image from "next/image";
import Link from "next/link";
import { CONTAINER } from "@/data/site";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostMoreFromCategoryProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export default function PostMoreFromCategory({
  currentPost,
  allPosts,
}: PostMoreFromCategoryProps) {
  const sameCategory = allPosts
    .filter((p) => p.id !== currentPost.id && p.category === currentPost.category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  const others = allPosts
    .filter((p) => p.id !== currentPost.id && p.category !== currentPost.category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, Math.max(0, 4 - sameCategory.length));

  const posts = [...sameCategory, ...others];
  if (posts.length === 0) return null;

  return (
    <section className="bg-cream-alt py-12 md:py-14">
      <div className={CONTAINER}>
        <h2 className="mb-6 font-display text-xl font-semibold text-mbh-forest">
          More on {currentPost.category}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              className="group overflow-hidden rounded-xl border border-mbh-forest/10 bg-white transition hover:border-mbh-green/30"
            >
              <div className="relative aspect-[16/10] bg-cream">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold leading-snug text-mbh-forest transition group-hover:text-mbh-green line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-1 font-body text-[11px] text-mbh-body/55">{post.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

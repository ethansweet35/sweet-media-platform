import PostHero from "@/components/pages/blog/post/components/PostHero";
import PostRelated from "@/components/pages/blog/post/components/PostRelated";
import PostMoreFromCategory from "@/components/pages/blog/post/components/PostMoreFromCategory";
import PostCta from "@/components/pages/blog/post/components/PostCta";
import BlogPostArticle from "@/views/blog/post/BlogPostArticle";
import { canonicalBlogPostUrl } from "@/lib/publicSiteUrl";
import type { BlogPost } from "@sweetmedia/blog-core";
import type { AutoLinkMapping } from "@sweetmedia/blog-core";

interface BlogPostViewServerProps {
  post: BlogPost;
  allPosts: BlogPost[];
  autoLinkMap: AutoLinkMapping[];
}

export default function BlogPostViewServer({
  post,
  allPosts,
  autoLinkMap,
}: BlogPostViewServerProps) {
  const canonicalUrl = canonicalBlogPostUrl(post.slug);

  return (
    <div className="min-h-screen bg-[var(--sr-linen)]">
      <PostHero post={post} />
      <BlogPostArticle
        post={post}
        allPosts={allPosts}
        autoLinkMap={autoLinkMap}
        canonicalUrl={canonicalUrl}
      />
      <PostRelated currentPost={post} allPosts={allPosts} />
      <PostMoreFromCategory currentPost={post} allPosts={allPosts} />
      <PostCta />
    </div>
  );
}

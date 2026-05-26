import type { Metadata } from "next";
import BlogPostViewServer from "@/views/blog/post/BlogPostViewServer";
import { DEMO_BLOG_POST, DEMO_BLOG_POSTS } from "@/lib/blogDemoData";

export const metadata: Metadata = {
  title: "Blog Article Template Preview | Adolescent Mental Health",
  robots: { index: false, follow: false },
};

/**
 * Static design preview — no database required.
 * Visit /blog/demo to review the full article template before importing content.
 */
export default function BlogDemoPage() {
  return (
    <>
      <div
        className="border-b border-accent/20 bg-accent/10 px-6 py-3 text-center text-sm text-ink lg:px-10"
        role="status"
      >
        <span className="font-semibold">Design preview</span>
        <span className="text-body"> — sample content only. Published posts will use this same layout at </span>
        <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">/blog/[slug]</code>
        <span className="text-body">.</span>
      </div>

      <BlogPostViewServer post={DEMO_BLOG_POST} allPosts={DEMO_BLOG_POSTS} autoLinkMap={[]} />
    </>
  );
}

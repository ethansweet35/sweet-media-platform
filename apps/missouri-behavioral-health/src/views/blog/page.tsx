"use client";

import { useMemo, useState } from "react";
import BlogHero from "@/components/pages/blog/components/BlogHero";
import BlogFeatured from "@/components/pages/blog/components/BlogFeatured";
import BlogGrid from "@/components/pages/blog/components/BlogGrid";
import { useBlogPosts } from "@sweetmedia/blog-core";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { posts } = useBlogPosts();

  const articleCount = useMemo(() => posts.length, [posts.length]);

  return (
    <div className="min-h-screen bg-cream">
      <main>
        <BlogHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          articleCount={articleCount}
        />
        {!searchQuery.trim() ? <BlogFeatured /> : null}
        <BlogGrid searchQuery={searchQuery} />
      </main>
    </div>
  );
}

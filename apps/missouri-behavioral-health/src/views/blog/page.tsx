"use client";

import { useState } from "react";
import BlogHero from "@/components/pages/blog/components/BlogHero";
import BlogGrid from "@/components/pages/blog/components/BlogGrid";
import { useBlogPosts } from "@sweetmedia/blog-core";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { posts, loading } = useBlogPosts();

  return (
    <div className="min-h-screen bg-cream">
      <main>
        <BlogHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          articleCount={loading ? undefined : posts.length}
        />
        <BlogGrid
          allPosts={posts}
          allLoading={loading}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import BlogHero from "@/components/pages/blog/components/BlogHero";
import BlogFeatured from "@/components/pages/blog/components/BlogFeatured";
import BlogGrid from "@/components/pages/blog/components/BlogGrid";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-soft-white">
      <main>
        <BlogHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <BlogFeatured />
        <BlogGrid searchQuery={searchQuery} />
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";

import BlogFeatured from "@/components/pages/blog/components/BlogFeatured";
import BlogGrid from "@/components/pages/blog/components/BlogGrid";
import CipherBlogHero from "@/components/pages/blog/components/CipherBlogHero";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#F5F5F3]">
      <main>
        <CipherBlogHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <BlogFeatured />
        <BlogGrid searchQuery={searchQuery} />
      </main>
    </div>
  );
}

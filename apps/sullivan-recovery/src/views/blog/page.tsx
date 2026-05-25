"use client";

import { useMemo, useState } from "react";
import { useBlogPosts } from "@sweetmedia/blog-core";
import BlogArchiveMasthead from "@/components/pages/blog/archive/BlogArchiveMasthead";
import BlogArchiveSpotlight from "@/components/pages/blog/archive/BlogArchiveSpotlight";
import BlogArchiveFeed from "@/components/pages/blog/archive/BlogArchiveFeed";
import BlogArchiveCta from "@/components/pages/blog/archive/BlogArchiveCta";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { posts, loading } = useBlogPosts();

  const featuredPost = useMemo(
    () => (searchQuery.trim() ? null : posts.find((p) => p.featured) ?? null),
    [posts, searchQuery],
  );

  const showSpotlight = !searchQuery.trim() && featuredPost;

  return (
    <div className="min-h-screen bg-[var(--sr-parchment)]">
      <BlogArchiveMasthead articleCount={loading ? undefined : posts.length} />
      {showSpotlight ? (
        <BlogArchiveSpotlight post={featuredPost} loading={loading} />
      ) : null}
      <BlogArchiveFeed searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <BlogArchiveCta />
    </div>
  );
}

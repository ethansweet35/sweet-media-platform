"use client";

import { useState } from "react";
import SiteHeader from "@/components/feature/SiteHeader";
import Footer from "@/components/pages/home/components/Footer";
import BlogHero from "@/components/pages/blog/components/BlogHero";
import BlogFeatured from "@/components/pages/blog/components/BlogFeatured";
import BlogGrid from "@/components/pages/blog/components/BlogGrid";
import BlogNewsletter from "@/components/pages/blog/components/BlogNewsletter";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader heroTheme="dark" ctaLabel="Get Started" ctaHref="/contact" />
      <main>
        <BlogHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <BlogFeatured />
        <BlogGrid searchQuery={searchQuery} />
        <BlogNewsletter />
      </main>
      <Footer />
    </div>
  );
}

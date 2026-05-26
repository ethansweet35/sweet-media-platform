"use client";

import { useState } from "react";
import { useBlogCategories } from "@sweetmedia/blog-core";
import BlogHero from "@/components/pages/blog/components/BlogHero";
import BlogFeatured from "@/components/pages/blog/components/BlogFeatured";
import BlogGrid from "@/components/pages/blog/components/BlogGrid";
import { AmhButton, DarkCtaSection, MarketingPage } from "@/components/marketing";
import { BLOG_SHELL } from "@/components/pages/blog/blogTokens";
import { SITE } from "@/lib/site";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { categories } = useBlogCategories();
  const topicOptions = categories.filter((c) => c !== "All").slice(0, 4);

  return (
    <MarketingPage>
      <div className={BLOG_SHELL}>
        <BlogHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          topicOptions={topicOptions}
        />
        <BlogFeatured />
        <BlogGrid
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <DarkCtaSection
          eyebrow="Need help now?"
          title="Questions about care for your teen?"
          description="Free consultations are confidential. Our admissions team can explain Virtual IOP, verify insurance, and help you understand next steps."
          actions={
            <>
              <AmhButton href="/contact" variant="darkPrimary" icon="ri-arrow-right-line">
                Contact admissions
              </AmhButton>
              <AmhButton href={SITE.phone.href} variant="darkSecondary" icon="ri-phone-fill" iconPosition="left">
                {SITE.phone.display}
              </AmhButton>
            </>
          }
        />
      </div>
    </MarketingPage>
  );
}

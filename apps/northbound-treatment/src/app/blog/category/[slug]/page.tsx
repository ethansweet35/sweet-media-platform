import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CategoryPage from "@/views/blog/category-page";
import { HERO_BG } from "@/views/home/assets";

export const revalidate = 3600;

const BLOG_OG_IMAGE = HERO_BG;

function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const label = humanizeSlug(slug);
  const fallback: Metadata = {
    title: `${label} Journal`,
    description: `Articles and resources from Northbound Treatment in the ${label} category.`,
    alternates: { canonical: `/blog/category/${slug}` },
    openGraph: {
      type: "website",
      title: `${label} Journal`,
      description: `Articles and resources from Northbound Treatment in the ${label} category.`,
      url: `/blog/category/${slug}`,
      images: [{ url: BLOG_OG_IMAGE, width: 1200, height: 630 }],
    },
  };
  return resolveTrackedPageMetadata(`/blog/category/${slug}`, fallback);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CategoryPage slug={slug} />;
}

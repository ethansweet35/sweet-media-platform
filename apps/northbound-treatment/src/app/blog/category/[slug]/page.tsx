import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CategoryPage from "@/views/blog/category-page";

export const dynamic = "force-dynamic";

const BLOG_OG_IMAGE =
  "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/og-blog.jpg";

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
    title: `${label} | Northbound Treatment Journal`,
    description: `Articles and resources from Northbound Treatment in the ${label} category.`,
    alternates: { canonical: `/blog/category/${slug}` },
    openGraph: {
      type: "website",
      title: `${label} | Northbound Treatment Journal`,
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

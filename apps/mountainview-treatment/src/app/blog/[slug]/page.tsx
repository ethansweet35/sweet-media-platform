import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlogPostPreviewPage from "@/views/blog/post/page";
import BlogPostViewServer from "@/views/blog/post/BlogPostViewServer";
import { DEFAULT_OG_IMAGE } from "@/lib/ogDefaults";
import {
  buildManualOnlyLinkMap,
  fetchManualLinkMappingsForServer,
  fetchPublishedBlogPostForMetadata,
  fetchPublishedBlogPostForRender,
  fetchPublishedBlogPostsForListing,
  fetchPublishedBlogPostSlugs,
} from "@sweetmedia/blog-core";
import { AuthProvider, OptimizationStatusBanner } from "@sweetmedia/admin-core";

export const revalidate = 3600;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await fetchPublishedBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mountainviewtreatment.com";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function slugToFallbackTitle(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toAbsoluteOgUrl(image: unknown): string {
  if (typeof image !== "string") return DEFAULT_OG_IMAGE;
  const trimmed = image.trim();
  if (!trimmed) return DEFAULT_OG_IMAGE;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `${SITE_URL}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}

function metaString(val: unknown, fallback = ""): string {
  if (typeof val === "string") return val;
  return fallback;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const row = await fetchPublishedBlogPostForMetadata(slug);

  const titleBase = metaString(row?.title) || slugToFallbackTitle(slug);
  const title = `${titleBase} | Mountain View Treatment`;
  const description =
    metaString(row?.meta_description).trim() ||
    metaString(row?.excerpt).trim() ||
    "Mental health, addiction recovery, and trauma-informed care resources from Mountain View Treatment.";

  const ogImageUrl = toAbsoluteOgUrl(row?.hero_image_url);

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title,
      description,
      siteName: "Mountain View Treatment",
      publishedTime: metaString(row?.published_at) || undefined,
      modifiedTime: metaString(row?.updated_at) || undefined,
      ...(metaString(row?.category) ? { section: metaString(row?.category) } : {}),
      ...(metaString(row?.author) ? { authors: [metaString(row?.author)] } : {}),
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

function BlogPostLoadingShell() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-6 pt-36 pb-20 animate-pulse">
        <div className="h-4 bg-neutral-100 rounded w-1/4 mb-8" />
        <div className="h-12 bg-neutral-100 rounded w-3/4 mb-6" />
        <div className="h-4 bg-neutral-100 rounded w-1/3 mb-10" />
        <div className="w-full h-[320px] md:h-[460px] bg-neutral-100 rounded-t-2xl" />
      </div>
    </div>
  );
}

function previewAdminRequested(sp: Record<string, string | string[] | undefined> | undefined) {
  const v = sp?.preview;
  if (v === "admin") return true;
  if (Array.isArray(v) && v.includes("admin")) return true;
  return false;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = searchParams !== undefined ? await searchParams : undefined;

  if (previewAdminRequested(sp)) {
    return (
      <AuthProvider>
        <Suspense fallback={<BlogPostLoadingShell />}>
          <BlogPostPreviewPage slug={slug} />
        </Suspense>
      </AuthProvider>
    );
  }

  const post = await fetchPublishedBlogPostForRender(slug);
  if (!post) notFound();

  const [allPosts, manualMappings] = await Promise.all([
    fetchPublishedBlogPostsForListing(),
    fetchManualLinkMappingsForServer(),
  ]);

  const autoLinkMap = buildManualOnlyLinkMap(manualMappings);

  return (
    <>
      {/* Show a subtle banner while a Cursor agent is rewriting this
          blog post's tsx — auto-hides via ISR once the run completes. */}
      {post.content_editor_id ? (
        <OptimizationStatusBanner
          contentEditorId={post.content_editor_id}
          brandName="Mountain View Treatment"
        />
      ) : null}
      <BlogPostViewServer post={post} allPosts={allPosts} autoLinkMap={autoLinkMap} />
    </>
  );
}

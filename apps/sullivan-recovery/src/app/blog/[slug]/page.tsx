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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sullivanrecovery.com";

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
  const title = `${titleBase} | Sullivan Recovery`;
  const description =
    metaString(row?.meta_description).trim() ||
    metaString(row?.excerpt).trim() ||
    "Mental health, addiction recovery, and trauma-informed care resources from Sullivan Recovery.";

  const ogImageUrl = toAbsoluteOgUrl(row?.hero_image_url);

  return {
    title,
    description,
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      type: "article",
      url: `/${slug}/`,
      title,
      description,
      siteName: "Sullivan Recovery",
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
    <div className="min-h-screen animate-pulse bg-[var(--sr-linen)]">
      <div className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)]">
        <div className="sr-container py-10">
          <div className="mb-6 h-3 w-24 rounded bg-[var(--sr-sand)]" />
          <div className="mb-4 h-12 max-w-2xl rounded bg-[var(--sr-sand)]" />
          <div className="mt-8 h-10 w-64 rounded bg-[var(--sr-sand)]" />
        </div>
        <div className="h-[min(40vh,360px)] bg-[var(--sr-sand)]/60" />
      </div>
      <div className="sr-container py-14">
        <div className="mb-6 h-4 max-w-xl rounded bg-[var(--sr-sand)]" />
        <div className="space-y-3">
          <div className="h-3 w-full rounded bg-[var(--sr-sand)]/80" />
          <div className="h-3 w-full rounded bg-[var(--sr-sand)]/80" />
          <div className="h-3 w-4/5 rounded bg-[var(--sr-sand)]/80" />
        </div>
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
          brandName="Sullivan Recovery"
        />
      ) : null}
      <BlogPostViewServer post={post} allPosts={allPosts} autoLinkMap={autoLinkMap} />
    </>
  );
}

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
import { AuthProvider } from "@sweetmedia/admin-core";
import { buildArticleSchema } from "@sweetmedia/seo-schema";
import { fetchBrandSettingsForServer } from "@/lib/fetchBrandSettings";

export const revalidate = 3600;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await fetchPublishedBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

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
  // titleBase is used for <title> — the root layout template appends "| Northbound Treatment"
  // ogTitle is used for OG/Twitter where the template does NOT apply
  const ogTitle = `${titleBase} | Northbound Treatment`;
  const description =
    metaString(row?.meta_description).trim() ||
    metaString(row?.excerpt).trim() ||
    "Mental health, addiction recovery, and trauma-informed care resources from Northbound Treatment.";

  const ogImageUrl = toAbsoluteOgUrl(row?.hero_image_url);

  return {
    title: titleBase,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: ogTitle,
      description,
      siteName: "Northbound Treatment",
      publishedTime: metaString(row?.published_at) || undefined,
      modifiedTime: metaString(row?.updated_at) || undefined,
      ...(metaString(row?.category) ? { section: metaString(row?.category) } : {}),
      ...(metaString(row?.author) ? { authors: [metaString(row?.author)] } : {}),
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

function BlogPostLoadingShell() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl animate-pulse px-6 pb-20 pt-36">
        <div className="mb-8 h-3 w-1/4 bg-[#eef2f7]" />
        <div className="mb-6 h-10 w-3/4 bg-[#eef2f7]" />
        <div className="mb-10 h-4 w-1/3 bg-[#eef2f7]" />
        <div className="h-[320px] w-full bg-[#eef2f7] md:h-[440px]" />
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

  const [allPosts, manualMappings, settings] = await Promise.all([
    fetchPublishedBlogPostsForListing(),
    fetchManualLinkMappingsForServer(),
    fetchBrandSettingsForServer(),
  ]);

  const autoLinkMap = buildManualOnlyLinkMap(manualMappings);
  const articleSchema = settings ? buildArticleSchema(post, settings) : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <BlogPostViewServer post={post} allPosts={allPosts} autoLinkMap={autoLinkMap} />
    </>
  );
}

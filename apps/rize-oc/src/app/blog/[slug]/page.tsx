import { permanentRedirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * WordPress blog posts live at the root: rizeoc.com/{slug}
 * This route permanently redirects any /blog/{slug} inbound link to /{slug}.
 */
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/${slug}`);
}

import { permanentRedirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * WordPress posts live at /{slug}/. Inbound /blog/{slug} links redirect to root.
 */
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/${slug}`);
}

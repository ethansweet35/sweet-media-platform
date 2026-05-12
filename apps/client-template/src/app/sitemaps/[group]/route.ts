import { SITEMAP_REVALIDATE_SECONDS } from "@sweetmedia/admin-core";
import { buildPublicSitemapGroupXml } from "@sweetmedia/admin-core/server";
import { getPublicSiteOrigin } from "@/lib/publicSiteUrl";

export const revalidate = SITEMAP_REVALIDATE_SECONDS;

export async function GET(
  _request: Request,
  context: { params: Promise<{ group: string }> },
) {
  const { group } = await context.params;
  const xml = await buildPublicSitemapGroupXml({
    origin: getPublicSiteOrigin(),
    groupId: decodeURIComponent(group),
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

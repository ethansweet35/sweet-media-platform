import { buildPublicSitemapIndexXml } from "@sweetmedia/admin-core/server";
import { getPublicSiteOrigin } from "@/lib/publicSiteUrl";

export const revalidate = 86400;

export async function GET() {
  const xml = await buildPublicSitemapIndexXml({
    origin: getPublicSiteOrigin(),
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

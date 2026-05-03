# New Client Launch Checklist

Use this checklist when creating a new client app from apps/client-template.

1. Copy the template app:
cd ~/Code/sweet-media-platform
cp -R apps/client-template apps/new-client-slug
rm -rf apps/new-client-slug/.next apps/new-client-slug/node_modules apps/new-client-slug/tsconfig.tsbuildinfo

2. Update package.json name to @sweetmedia/new-client-slug.

3. Run pnpm install.

4. Run pnpm --filter @sweetmedia/new-client-slug build.

5. Create a new Supabase project.

6. Run the schema file in Supabase SQL Editor: apps/new-client-slug/supabase/client-template-schema.sql

7. Seed admin_users with your admin email.

8. Seed brand_settings with the client brand values.

9. Create a public Supabase Storage bucket named site-assets.

10. Add Vercel env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SITE_URL.

11. Link Supabase CLI from apps/sweet-media using the new project ref.

12. Add Supabase Edge Function secrets: OPENROUTER_API_KEY, OPENAI_API_KEY, BLOG_WEBHOOK_SECRET, BLOG_IMAGE_BUCKET=site-assets.

13. Deploy shared Supabase Edge Functions.

14. Create Vercel project with root directory apps/new-client-slug.

15. Replace blank public pages with client-specific design, copy, imagery, and CTAs.

16. QA homepage, blog, blog posts, admin login, blog generation, blog image generation, contact form, metadata, domain, and Vercel root directory.

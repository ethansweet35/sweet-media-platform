# New Client Onboarding Checklist

Use this checklist every time a new client app is created from `apps/client-template`.

This is documentation for future client onboarding. Do not create a new Supabase project unless you are actively onboarding a real client.

The goal is that every new client has the same working foundation:

- App cloned from `client-template`
- Unique Supabase project
- Correct `.env.local`
- Complete schema
- Brand settings row
- Blog categories
- Storage bucket
- Admin user
- Deployed Edge Functions
- Tested Blog Writer
---

---

## 1. Create the client app

Clone/copy `apps/client-template` into `apps/{client-slug}`.

Examples:

- `apps/inner-peak-colorado`
- `apps/mental-health-for-teens`
- `apps/example-client`

Then update:

- Package name
- App name
- Brand name
- Navigation labels
- Metadata
- Visible placeholder copy
- Client-specific design/theme settings

The app needs a unique site ID:

`NEXT_PUBLIC_SITE_ID={client-slug}`

This value must match:

- `brand_settings.site_key`
- `blog_categories.site_id`
- the `siteKey` sent to `generate-blog-image`

Example:

`NEXT_PUBLIC_SITE_ID=mental-health-for-teens`

---

## 2. Create the Supabase project

Create one unique Supabase project per client.

Save these values:

- Project URL
- Publishable key
- Project ref
- Service role key

The service role key is only for Supabase Edge Function secrets. Do not put it in frontend `.env.local`.

---

## 3. Add local env

Create:

`apps/{client-slug}/.env.local`

Add:

`NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co`

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=CLIENT_PUBLISHABLE_KEY`

`NEXT_PUBLIC_SITE_ID={client-slug}`

Do not commit `.env.local`.

Before committing anything, run:

`git status --short`

If `.env.local` appears in Git status, stop and fix `.gitignore`.

---

## 4. Run the client template schema

In the client Supabase SQL Editor, run the schema from:

`apps/client-template/supabase/client-template-schema.sql`

This should create:

- `admin_users`
- `brand_settings`
- `blog_categories`
- `blog_posts`
- knowledge base tables
- storage policies
- RLS policies

Important blog columns that must exist on `blog_posts`:

- `category_id`
- `read_time`
- `featured`
- `author_photo`

If an older client project is missing them, run this in that client’s Supabase SQL Editor:

`alter table public.blog_posts add column if not exists category_id uuid;`

`alter table public.blog_posts add column if not exists read_time text;`

`alter table public.blog_posts add column if not exists featured boolean not null default false;`

`alter table public.blog_posts add column if not exists author_photo text;`

---

## 5. Update brand settings

After running the schema, update the default `brand_settings` row for the client.

Required values:

- `site_key`
- `site_name`
- `site_url`
- `image_bucket`
- `image_folder`
- `image_style_prompt`
- `image_negative_prompt`

The `site_key` must match the app’s `NEXT_PUBLIC_SITE_ID`.

Example:

`site_key = client-slug`

`image_bucket = site-assets`

`image_folder = blog-featured`

Check the row with:

`select site_name, site_url, site_key, image_bucket, image_folder, image_style_prompt from public.brand_settings;`

If the `site_key` is still `client-template`, update it before testing Blog Writer.

---

## 6. Add blog categories

Every client should have client-specific blog categories in `blog_categories`.

The category `site_id` must match the app’s `NEXT_PUBLIC_SITE_ID`.

Example:

`site_id = client-slug`

Check categories with:

`select id, site_id, name, slug, sort_order, is_active from public.blog_categories order by site_id, sort_order, name;`

If categories do not show in Blog Writer, check:

- `blog_categories.site_id` matches `NEXT_PUBLIC_SITE_ID`
- `blog_categories.is_active` is `true`
- RLS allows public read access to active categories

---

## 7. Create or verify storage bucket

In Supabase Storage, create or verify the bucket used by:

`brand_settings.image_bucket`

Common bucket names:

- `site-assets`
- `public_bucket`

The bucket must exist before image uploads can work.

The bucket should be public if the generated featured images need public URLs.

Check buckets with:

`select id, name, public from storage.buckets order by name;`

Make sure `brand_settings.image_bucket` points to a real bucket.

If image generation succeeds but upload fails, the bucket name is usually wrong.

Fix example:

`update public.brand_settings set image_bucket = 'public_bucket', image_folder = 'blog-featured', updated_at = now() where site_key = 'client-slug';`

---

## 8. Add Edge Function secrets

In the client Supabase project, add the required Edge Function secrets:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENROUTER_API_KEY`
- `OPENAI_API_KEY`

Optional image defaults:

- `BLOG_IMAGE_BUCKET`
- `BLOG_IMAGE_FOLDER`

The preferred source for image upload location is still:

- `brand_settings.image_bucket`
- `brand_settings.image_folder`

---

## 9. Deploy Edge Functions

From the repo root, deploy both functions to the client Supabase project:

`supabase functions deploy generate-blog-post --project-ref CLIENT_PROJECT_REF --workdir apps/sweet-media`

`supabase functions deploy generate-blog-image --project-ref CLIENT_PROJECT_REF --workdir apps/sweet-media`

The functions currently live under:

`apps/sweet-media/supabase/functions`

So always use:

`--workdir apps/sweet-media`

unless the functions are moved later.

---

## 10. Add admin user

In Supabase Auth:

- Create the admin user
- Set the password

Then add the admin user to `admin_users`:

`insert into public.admin_users (email, role) values ('admin@email.com', 'admin') on conflict (email) do update set role = excluded.role;`

Verify with:

`select id, email, role, created_at from public.admin_users order by created_at desc;`

---

## 11. Test locally

Start the dev server:

`pnpm dev`

Find the current local URL for the client app:

`@sweetmedia/{client-slug}:dev: - Local: http://localhost:PORT`

Open:

`http://localhost:PORT/admin/login`

Then test:

`/admin/blog-writer`

Confirm:

- Login works
- Categories load from `blog_categories`
- Blog post generates
- `category_id` does not error
- Featured image generates
- Featured image uploads successfully
- Featured image matches `brand_settings.image_style_prompt`
- Blog appears in Blog Posts

---

## 12. Common errors and fixes

### Missing `NEXT_PUBLIC_SUPABASE_URL`

Usually caused by:

- Opening the wrong local port/app
- Missing `.env.local`
- App has no real Supabase credentials
- Dev server was not restarted after env changes

Fix:

- Check the app’s current port in `pnpm dev`
- Check `apps/{client-slug}/.env.local`
- Restart the dev server

---

### Missing `category_id`

Fix:

`alter table public.blog_posts add column if not exists category_id uuid;`

---

### Missing `read_time`

Fix:

`alter table public.blog_posts add column if not exists read_time text;`

---

### Missing `featured`

Fix:

`alter table public.blog_posts add column if not exists featured boolean not null default false;`

---

### Missing `author_photo`

Fix:

`alter table public.blog_posts add column if not exists author_photo text;`

---

### Categories do not show in Blog Writer

Check:

`select id, site_id, name, slug, sort_order, is_active from public.blog_categories order by site_id, sort_order, name;`

Make sure:

- `blog_categories.site_id` matches `NEXT_PUBLIC_SITE_ID`
- `is_active` is `true`

---

### Featured image uses wrong branding

Check:

`select site_name, site_key, image_bucket, image_folder, image_style_prompt from public.brand_settings;`

Make sure:

- `brand_settings.site_key` matches `NEXT_PUBLIC_SITE_ID`
- Blog Writer sends `siteKey`
- `generate-blog-image` is deployed to that Supabase project

---

### Image generates but upload fails

Check buckets:

`select id, name, public from storage.buckets order by name;`

Make sure `brand_settings.image_bucket` exists.

---

### JSON parse error from blog generation

Make sure the deployed `generate-blog-post` function uses:

- `response_format: { type: "json_object" }`
- `max_tokens: 12000`
- `temperature: 0.4`

Then redeploy:

`supabase functions deploy generate-blog-post --project-ref CLIENT_PROJECT_REF --workdir apps/sweet-media`

---

## 13. Final checks before committing

Run:

`git status --short`

Confirm:

- No `.env.local` files are tracked
- No accidental generated files are staged
- Schema changes are committed
- Function changes are committed
- Client app changes are committed

Then commit with a clear message.

Example:

`git add docs/new-client-onboarding.md`

`git commit -m "Add new client onboarding checklist"`

`git push origin main`
# Developer Onboarding

Sweet Media Platform — everything you need from zero to running.

---

## Before anything else — get access from Ethan

These are **not automated**. Ethan must add you manually. GitHub and Vercel are one-time for your whole time on this team. Supabase is only needed if you're doing edge functions or schema work, and requires a separate invite per client org.

| Platform | What to ask for | One-time? |
|---|---|---|
| **GitHub** | Collaborator on `ethansweet35/sweet-media-platform` | Yes — covers all apps |
| **Vercel** | Team member on sweetmedia org | Yes — covers all client projects |
| **Supabase** | Org member | Per client org (edge functions / schema only) |

Once you have Vercel access, `vercel env pull .env.local` fetches all secrets automatically — you never need to ask for them individually.

---

## A. First-time setup

### 1. Install prerequisites

| Tool | Install | Verify |
|---|---|---|
| Node.js 22+ LTS | [nodejs.org](https://nodejs.org) or `brew install node` | `node --version` |
| pnpm 10.33.2 | `npm install -g pnpm@10.33.2` | `pnpm --version` |
| Cursor IDE | [cursor.com](https://cursor.com) | — |
| Vercel CLI | `npm install -g vercel` | `vercel --version` |
| GitHub CLI | `brew install gh` then `gh auth login` | `gh auth status` |
| Supabase CLI | `brew install supabase/tap/supabase` | `supabase --version` |

### 2. Clone and install

```bash
git clone https://github.com/ethansweet35/sweet-media-platform
cd sweet-media-platform
pnpm install
```

> Always run `pnpm install` from the **repo root** — it installs dependencies for all apps at once.

### 3. Open in Cursor

Open the `sweet-media-platform/` root as your workspace — **never a sub-app folder**. Cursor rules, skills, and AI context are all scoped to the root.

---

## B. Working on admin tools

All shared admin views, hooks, and components live in `packages/admin-core`. Each client app is a thin wrapper that imports from it — edit admin-core and every client gets the update automatically. You never touch `apps/*/src/app/admin/` for shared logic.

### 1. Pull env vars for the client you're testing against

Admin-core has no env vars of its own. Pick a client app to run locally and test against (sweet-media or cipher-billing are the usual choices).

```bash
cd apps/sweet-media        # or whichever client
vercel link                # first time only — select sweetmedia team + matching project
vercel env pull .env.local
```

### 2. Run the client app

Always run from the **repo root**:

```bash
pnpm --filter @sweetmedia/sweet-media dev
```

Then open `localhost:3000/admin`. You must have a row in the `admin_users` table for your email — ask Ethan to add you if you get a redirect loop.

### 3. Where things live in admin-core

| What | Path |
|---|---|
| Views (full-page components) | `src/views/` — `AdminBlogsPage`, `AdminBlogWriterPage`, etc. |
| Hooks (data fetching) | `src/hooks/` — `useBlogQueue`, `useTrackedPages`, `useDashboardData`, etc. |
| Auth / guard | `src/components/AdminGuard.tsx`, `src/context/AuthProvider.tsx` |
| Sidebar / chrome | `src/components/AdminChrome.tsx` |
| Types | `src/types/` |

---

## C. Working on a client site

### Client apps at a glance

| App | Package | What it is |
|---|---|---|
| `apps/sweet-media` | `@sweetmedia/sweet-media` | Agency marketing site + source of all edge functions |
| `apps/inner-peak-colorado` | `@sweetmedia/inner-peak-colorado` | Behavioral health / treatment center site |
| `apps/mental-health-for-teens` | `@sweetmedia/mental-health-for-teens` | Teen mental health site |
| `apps/cipher-billing` | `@sweetmedia/cipher-billing` | Behavioral health billing company — WP migration in progress |

### 1. Set up env vars (first time per client)

Each client has its own Supabase project — env vars are never shared across clients. Repeat for each app you work on.

```bash
cd apps/cipher-billing      # replace with the app you're working on
vercel link                 # one-time: select sweetmedia team + matching project
vercel env pull .env.local
```

Re-run `vercel env pull .env.local` any time a var is added or a secret is rotated.

### 2. Run a client site

Always run from the **repo root** using `--filter`:

```bash
pnpm --filter @sweetmedia/sweet-media dev
pnpm --filter @sweetmedia/inner-peak-colorado dev
pnpm --filter @sweetmedia/mental-health-for-teens dev
pnpm --filter @sweetmedia/cipher-billing dev
```

> Never run `next dev` directly inside an app folder.

### 3. Env vars reference

`vercel env pull` writes these automatically — do not copy from another client.

**Frontend (`NEXT_PUBLIC_*`)**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_ID` — e.g. `cipher-billing`
- `NEXT_PUBLIC_SITE_URL` — canonical domain

**Server-only**
- `SUPABASE_SERVICE_ROLE_KEY` — admin ops, postbuild page sync
- `RESEND_API_KEY` — contact form emails
- `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_BRAND_NAME` — optional

---

## Quick reference

| Command | Run from | What it does |
|---|---|---|
| `pnpm install` | repo root | Install / sync all workspace deps |
| `pnpm dev` | repo root | Run all apps in dev mode simultaneously |
| `pnpm --filter @sweetmedia/<slug> dev` | repo root | Run one specific app |
| `pnpm build` | repo root | Build all apps |
| `pnpm lint` | repo root | ESLint across all apps |
| `pnpm typecheck` | repo root | TypeScript checks across all apps |
| `vercel link` | `apps/<slug>/` | Link the folder to its Vercel project (one-time) |
| `vercel env pull .env.local` | `apps/<slug>/` | Pull all env vars from Vercel |
| `pnpm new-client` | repo root | Provision a brand-new client end-to-end |
| `pnpm scaffold-client` | repo root | Scaffold a new Next.js app from client-template |

---

*pnpm 10.33.2 · Turborepo 2.9.7 · Next.js 16 · React 19 · Tailwind v4*

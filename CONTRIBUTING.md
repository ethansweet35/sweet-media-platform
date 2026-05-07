# Developer Onboarding

Sweet Media Platform — everything you need from zero to running.

All commands in this guide are run in your **terminal** (macOS Terminal, iTerm, or the built-in terminal in Cursor via `` Ctrl+` ``).

---

## A. First-time setup

### 1. Install prerequisites

Do this first — none of it requires access to the repo or any platform.

---

**Homebrew** (Mac package manager — needed to install everything else)

In your terminal, run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the prompts. If you already have Homebrew, skip this.

---

**Node.js 22+ LTS**

In your terminal, run:

```bash
brew install node
```

Confirm it worked:

```bash
node --version
```

You should see something like `v22.x.x`.

---

**pnpm** (the package manager this repo uses instead of npm)

In your terminal, run:

```bash
npm install -g pnpm@10.33.2
```

Confirm it worked:

```bash
pnpm --version
```

You should see `10.33.2`.

---

**Cursor IDE**

```bash
brew install --cask cursor
```

Or download from [cursor.com](https://cursor.com) if the cask isn't available. This is the IDE everyone on the team uses — do not use VS Code for this project.

---

**Vercel CLI** (used to pull environment variables)

In your terminal, run:

```bash
npm install -g vercel
```

Confirm it worked:

```bash
vercel --version
```

---

**GitHub CLI** (optional but recommended)

In your terminal, run:

```bash
brew install gh
```

Then authenticate:

```bash
gh auth login
```

Follow the prompts — choose GitHub.com and authenticate via browser.

---

**Supabase CLI** (only needed if you'll touch edge functions or database schema)

```bash
brew install supabase/tap/supabase
```

---

### 2. Get access from Ethan

These are **not automated** — Ethan must add you to each platform manually. Send him a message and ask for all three at once.

| Platform | What to ask for | How often |
|---|---|---|
| **GitHub** | Collaborator on `ethansweet35/sweet-media-platform` | Once — covers everything |
| **Vercel** | Team member on the sweetmedia org | Once — covers all client projects |
| **Supabase** | Org member | Only if doing edge functions or schema work |

> **Why Vercel matters most:** once you're on the Vercel team, you can run one command to pull all environment variables for any project automatically. You will never need to ask anyone to share a `.env` file or secret.

---

### 3. Clone the repo

Once Ethan has added you to GitHub, open your terminal and run these one at a time:

```bash
git clone https://github.com/ethansweet35/sweet-media-platform
```

This downloads the repo to your current directory. Then move into it:

```bash
cd sweet-media-platform
```

Now install all dependencies. This one command handles every app in the repo:

```bash
pnpm install
```

> Always run `pnpm install` from this top-level `sweet-media-platform/` folder — never from inside an individual app folder.

---

### 4. Open the project in Cursor

In Cursor, go to **File → Open Folder** and select the `sweet-media-platform/` folder — the top-level one, not any folder inside it. Opening the root is important because Cursor's AI rules and context only work when the full repo is your workspace.

---

## B. Working on admin tools

The admin system (blog writer, sitemap, content tools, etc.) is shared across all client sites. All of that shared code lives in `packages/admin-core`. Each client app just imports from it — so if you edit something in admin-core, every client picks up the change automatically. You should never need to edit files inside `apps/*/src/app/admin/` for shared admin work.

---

### 1. Pull environment variables for the app you're testing against

Admin-core doesn't have its own environment variables — it runs inside a client app. Pick whichever client is most relevant to what you're testing (sweet-media and cipher-billing are the most common choices).

In your terminal, navigate into that app's folder. For example:

```bash
cd apps/sweet-media
```

If this is your first time using this app, link it to its Vercel project (one-time only per app):

```bash
vercel link
```

When prompted, select the **sweetmedia** team and choose the project that matches the app name.

Then pull the environment variables:

```bash
vercel env pull .env.local
```

This creates a `.env.local` file in the app folder with all the credentials the app needs to run. You don't need to edit it.

---

### 2. Run the app

Go back to the repo root first:

```bash
cd ../..
```

Then start the app with this command (always run from the repo root, not from inside the app folder):

```bash
pnpm --filter @sweetmedia/sweet-media dev
```

Open your browser and go to `http://localhost:3000/admin`. Log in with your credentials. If you get stuck in a redirect loop, ask Ethan to add your email to the `admin_users` table.

---

### 3. Where things live in admin-core

| What you're looking for | Where to find it |
|---|---|
| Page views (blog list, blog writer, sitemap, etc.) | `packages/admin-core/src/views/` |
| Data fetching hooks | `packages/admin-core/src/hooks/` |
| Login / auth guard | `packages/admin-core/src/components/AdminGuard.tsx` |
| Sidebar and navigation chrome | `packages/admin-core/src/components/AdminChrome.tsx` |
| TypeScript types | `packages/admin-core/src/types/` |

---

## C. Working on a client site

### Client apps at a glance

| Folder | What it is |
|---|---|
| `apps/sweet-media` | Sweet Media agency marketing site |
| `apps/inner-peak-colorado` | Behavioral health / treatment center site |
| `apps/mental-health-for-teens` | Teen mental health site |
| `apps/cipher-billing` | Behavioral health billing company (WordPress migration in progress) |

---

### 1. Pull environment variables (first time per client)

Each client has its own separate database and credentials — you cannot share env vars between clients. Do this for each client app you work on.

In your terminal, navigate into the app folder. For example, for cipher-billing:

```bash
cd apps/cipher-billing
```

Link it to its Vercel project (one-time only):

```bash
vercel link
```

Select the **sweetmedia** team and the matching project name. Then pull the env vars:

```bash
vercel env pull .env.local
```

Done. If a secret ever changes or a new variable is added, just run `vercel env pull .env.local` again from inside that app folder to refresh it.

---

### 2. Run a client site

Go back to the repo root first:

```bash
cd ../..
```

Then run the specific app using its name in the `--filter` flag:

```bash
# Sweet Media
pnpm --filter @sweetmedia/sweet-media dev

# Inner Peak Colorado
pnpm --filter @sweetmedia/inner-peak-colorado dev

# Mental Health for Teens
pnpm --filter @sweetmedia/mental-health-for-teens dev

# Cipher Billing
pnpm --filter @sweetmedia/cipher-billing dev
```

Open your browser to `http://localhost:3000`.

> Do not `cd` into an app folder and run `next dev` — always use the `--filter` command from the repo root.

---

## Quick reference

All of these are run from the **repo root** (`sweet-media-platform/`) unless the "Where" column says otherwise.

| Command | Where | What it does |
|---|---|---|
| `pnpm install` | repo root | Install all dependencies |
| `pnpm dev` | repo root | Run all apps at once |
| `pnpm --filter @sweetmedia/<name> dev` | repo root | Run one specific app |
| `pnpm build` | repo root | Build all apps |
| `pnpm lint` | repo root | Check code for errors |
| `pnpm typecheck` | repo root | Check TypeScript types |
| `vercel link` | inside `apps/<name>/` | Connect the folder to its Vercel project (one-time) |
| `vercel env pull .env.local` | inside `apps/<name>/` | Download all environment variables from Vercel |
| `pnpm new-client` | repo root | Provision a brand-new client from scratch |
| `pnpm scaffold-client` | repo root | Scaffold a new app from the client template |

---

*pnpm 10.33.2 · Turborepo 2.9.7 · Next.js 16 · React 19 · Tailwind v4*

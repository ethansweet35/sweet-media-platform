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
vercel link --project sweet-media-platform --yes
```

The Vercel project is **`sweet-media-platform`**, not `sweet-media` — using the folder name creates a duplicate project.

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
| `apps/northbound-treatment` | Residential addiction treatment center |
| `apps/inner-peak-colorado` | Behavioral health / IOP treatment center |
| `apps/cipher-billing` | Behavioral health billing company |
| `apps/addiction-interventions` | Certified intervention services |
| `apps/client-template` | Scaffold template — copy this to start a new brand |

---

### 1. Pull environment variables (first time per client)

Each client has its own separate database and credentials — you cannot share env vars between clients. Do this for each client app you work on.

In your terminal, navigate into the app folder. For example, for cipher-billing:

```bash
cd apps/cipher-billing
```

Link it to its Vercel project (one-time only):

```bash
vercel link --project <vercel-project-name> --yes
```

Use the slug for most brands (e.g. `cipher-billing`). Two exceptions — the Vercel project name differs from the folder:

| App folder | Vercel project name |
|---|---|
| `apps/sweet-media` | `sweet-media-platform` |
| `apps/inner-peak-colorado` | `inner-peak-colorado-platform` |

Or run `node scripts/dev-setup.mjs` from the repo root to link and pull every brand automatically. Then pull the env vars:

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

# Northbound Treatment
pnpm --filter @sweetmedia/northbound-treatment dev

# Inner Peak Colorado
pnpm --filter @sweetmedia/inner-peak-colorado dev

# Cipher Billing
pnpm --filter @sweetmedia/cipher-billing dev

# Addiction Interventions
pnpm --filter @sweetmedia/addiction-interventions dev
```

Open your browser to `http://localhost:3000`.

> Do not `cd` into an app folder and run `next dev` — always use the `--filter` command from the repo root.

---

---

## D. Starting a WordPress migration

Use this section every time Ethan hands you a new client to migrate off WordPress.

### What Ethan gives you

Before you start, get these four values from Ethan:

| Value | Example |
|---|---|
| **Client slug** | `acme-recovery` |
| **Brand display name** | `"Acme Recovery Center"` |
| **WordPress site URL** | `https://acmerecovery.com` |
| **Admin email** | `admin@acmerecovery.com` |

You need all four to run the provisioning script in Step 1.

---

### Step 1 — Pull the latest and create a branch

```bash
git pull origin main
git checkout -b migration/acme-recovery
pnpm install
```

---

### Step 2 — Hand off to Cursor AI

Open Cursor and start a new conversation. Paste this prompt with the four values filled in:

---

**Copy this prompt — fill in the four bracketed values:**

```
I'm migrating [Brand Name] from WordPress to a new app on this platform.
The WordPress site is at [https://site.com].
The client slug will be [slug] and the admin email is [admin@email.com].

Nothing has been set up yet — please follow the wordpress-migration skill
from the very beginning, starting with Supabase provisioning.
```

---

Cursor will read the `wordpress-migration` skill automatically and guide you through every step in order:
- Supabase provisioning + app scaffold
- Blog content migration
- Design token extraction + DevTools color/font verification
- Visual audit screenshots
- Homepage build (first, always)
- Inner page builds via the migration report checklist
- Deployment to Vercel + DNS cutover

The whole process is documented in detail in `docs/wp-migration-guide.md` if you need to reference anything outside of Cursor.

---

### What NOT to do

- Don't skip the design token step — color mismatches are the most common QA fail
- Don't commit `.env.local`, `design-tokens-*.json`, `migration-report-*.json`, or `wp-screenshots/` — they're gitignored for a reason
- Don't run `pnpm dev` from inside the app folder — always run from the repo root with `--filter`
- Don't take the WordPress site offline until Ethan confirms the cutover is verified (minimum 48 hours live)

---

## Git cheat sheet

All of these are run from the **repo root** unless noted.

| Command | What it does |
|---|---|
| `git status` | See what files you've changed |
| `git pull` | Pull the latest changes from main |
| `git checkout -b feature/my-branch` | Create a new branch and switch to it |
| `git checkout main` | Switch back to main |
| `git add .` | Stage all changed files |
| `git add apps/addiction-interventions/` | Stage only one app's files |
| `git commit -m "description of change"` | Commit staged changes |
| `git push` | Push your branch to GitHub |
| `git push -u origin HEAD` | Push a brand-new branch for the first time |
| `git log --oneline -10` | See the last 10 commits |
| `git diff` | See unstaged changes line by line |
| `git stash` | Temporarily shelve uncommitted changes |
| `git stash pop` | Restore shelved changes |

**Typical daily flow:**

```bash
git pull                                  # always start with latest
git checkout -b feature/my-change         # new branch for your work
# ... make changes ...
git add .
git commit -m "what you did"
git push -u origin HEAD                   # first push on a new branch
# open a PR on GitHub for review
```

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
| `vercel link --project <name> --yes` | inside `apps/<name>/` | Connect the folder to its Vercel project (one-time). Use `sweet-media-platform` / `inner-peak-colorado-platform` for those two brands. |
| `vercel env pull .env.local` | inside `apps/<name>/` | Download all environment variables from Vercel |
| `pnpm new-client` | repo root | Provision a brand-new client from scratch |
| `pnpm scaffold-client` | repo root | Scaffold a new app from the client template |

---

*pnpm 10.33.2 · Turborepo 2.9.7 · Next.js 16 · React 19 · Tailwind v4*

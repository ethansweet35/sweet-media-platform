# Redesign Tool — Project Brief

> Cursor: read this entire document before every task in `apps/sweet-media`, `packages/design-dna`, `packages/redesign-engine`, or `packages/admin-core/src/redesign`. The rules and contracts here override any conflicting assumption you might have from general knowledge.

## What we're building

An internal agency tool, run from `apps/sweet-media`'s admin, that turns a short brief into a complete, premium, *unique* marketing website. Output is a new `apps/<client>/` folder cloned from `apps/client-template` plus a Supabase Storage zip the agency can drop into the monorepo. The tool must produce sites that look like a top-tier agency portfolio — not like AI-generated templates. It must work for *any* industry.

The premise: premium design is taste plus iteration. We encode the taste (as DNAs) and automate the iteration (as a vision-driven QA loop).

## The four layers

```
┌────────────────────────────────────────────────────────────────────┐
│  packages/design-dna   ◆ FOUNDATION (already shipped, v0.1)        │
│  Type system, DNA library, theme/font generators, brief schema.    │
│  Pure code, no runtime dependencies on Supabase or external APIs.  │
└────────────────────────────────────────────────────────────────────┘
                              │ consumed by
                              ▼
┌────────────────────────────────────────────────────────────────────┐
│  packages/redesign-engine   ◆ PIPELINE (to build)                  │
│  Stage modules, agent prompts, service adapters. Stateless logic.  │
│  Called from Edge Functions; never imports admin or Next.js code.  │
└────────────────────────────────────────────────────────────────────┘
                              │ orchestrated by
                              ▼
┌────────────────────────────────────────────────────────────────────┐
│  apps/sweet-media/supabase/   ◆ RUNTIME (to build)                 │
│  Schema (redesign_* tables), queue, cron orchestrator, per-stage   │
│  Edge Functions matching the existing blog pipeline pattern.       │
└────────────────────────────────────────────────────────────────────┘
                              │ invoked by
                              ▼
┌────────────────────────────────────────────────────────────────────┐
│  packages/admin-core/src/redesign + apps/sweet-media/app/admin/    │
│  ◆ UI (to build)                                                   │
│  Brief form, DNA picker, moodboard picker, section reviewer,       │
│  project dashboard, export panel. Thin wrapper routes in the app.  │
└────────────────────────────────────────────────────────────────────┘
```

## Current state

**Shipped:**
- `packages/design-dna` (v0.1) — type system, Quiet Luxury DNA, theme CSS generator, font import generator, registry, brief schema, brief questions.

**Not yet:**
- Additional DNAs (need ~6 more for industry coverage)
- Primitive library inside `design-dna` (React section components tagged by DNA compatibility)
- `packages/redesign-engine` (entire package)
- Supabase schema migration + Edge Functions
- Admin UI for redesign

## Architecture rules — enforce these

1. **Tenant isolation.** Redesign data lives in `apps/sweet-media`'s Supabase only. Never write redesign tables to `apps/client-template/supabase/client-template-schema.sql`. Generated client sites get clean greenfield Supabase projects.

2. **Shared logic in packages, not apps.** Anything reused goes in a workspace package. `apps/sweet-media/app/admin/redesign/*` files are *thin wrappers* — they import views from `packages/admin-core/src/redesign/views/*` and pass nothing more than route params.

3. **Engine never imports app or admin code.** `packages/redesign-engine` is pure logic. It depends only on `@sweet/design-dna`, the Anthropic SDK, the fal.ai client, the Browserbase client, and `@supabase/supabase-js`. If you find yourself wanting to import React or Next.js in the engine, stop — that belongs in admin-core.

4. **DNA library is code, not data.** New DNAs are TypeScript modules in `packages/design-dna/src/dnas/`. Per-project synthesized DNAs live in the `redesign_dnas` Supabase table as JSONB.

5. **Stage modules are pure functions where possible.** Each pipeline stage is a TypeScript module exporting one async function `runStage(input, deps) => Promise<output>`. Side effects (DB writes, asset uploads) happen at the orchestrator layer, not inside the stage.

6. **No hardcoded brand identifiers in shared code.** No client names, no domain strings, no Supabase project IDs in `packages/*`.

## Stack reminder

- pnpm workspaces + turborepo
- Next.js 16 (app router), React 19, Tailwind v4 (CSS `@theme` directive, no `tailwind.config.ts` tokens)
- Supabase (auth, postgres, storage, edge functions)
- TypeScript strict, `noUncheckedIndexedAccess` on in `packages/design-dna` — match this in new packages
- Existing patterns to follow: `AuthProvider`, `AdminGuard`, `AdminChrome` from `admin-core`; the blog pipeline in `apps/sweet-media/supabase/functions/`

## Models and services

- **Anthropic API.** Models: `claude-opus-4-7` for taste calls (DNA synthesis, vision QA, design critique, copy direction). `claude-sonnet-4-6` for assembly and structured output. `claude-haiku-4-5-20251001` for fast filtering and routing.
- **Image generation.** FLUX 1.1 Pro via fal.ai for moodboards and any custom hero imagery. Falls back to DALL-E 3 via OpenAI for verticals where FLUX content policy blocks.
- **Headless browser.** Browserbase managed sessions for screenshots and live preview rendering during the QA loop.

API keys live in Supabase Edge Function secrets, not in `.env.local`, for parity with the existing blog pipeline.

## The aesthetic philosophy — why this works

Most AI website generators fail because they let the model design from scratch each time. This system constrains the model heavily — selection from primitives instead of generation of HTML — and iterates with vision feedback. Three failure modes to design *against*:

1. **Stylistic regression to mean** (everything becomes purple-gradient SaaS). Solved by DNAs as complete style languages, not theme variations. Quiet Luxury and Brutalist Tech produce structurally incompatible outputs.

2. **Layout drift** (boxes don't align, spacing inconsistent). Solved by primitives — tested layout components that the engine composes, not regenerates.

3. **Lifeless copy** (generic marketing speak). Solved by the Copy Director agent reading the brief's voice attributes and voice sample and producing brand-specific copy.

## Anti-patterns — refuse these outputs

These appear in `DesignDNA.antiPatterns.forbidden` per DNA, but some are universal. If you find yourself generating any of these into a section, stop and regenerate:

- Three-column-of-three feature grid with identical icons-in-circles
- Identical-height card layouts in a row
- Emoji icons inline with text
- Generic purple-blue gradient buttons or backgrounds
- Drop shadows on cards in editorial/luxury DNAs
- "Get started for free" CTAs in services or premium contexts
- Sans-serif display headlines in DNAs that specify serif display
- Fade-in-on-mount staggered across more than one element per viewport
- Hero with rotating phrase + chart visualization (the AI-template signal)
- Stock photography of people laughing at laptops

## Premium design principles to encode

- **Type scale ratio 1.333 or 1.5**, not the lazy 1.25. Premium hierarchy needs bigger jumps.
- **Spacing scales with deliberate non-linear jumps** (4.5rem, 6rem, 9rem, 13.5rem at the high end). Editorial rhythm is not 64px-everywhere.
- **One unexpected element per page** — an oversized pull quote, a marquee, a sidebar timeline. Picked from a tagged library, not invented.
- **Animations on intent** (scroll-linked, hover-revealed) rather than fade-in-on-mount decoration.
- **Real content density on first paint** — never empty hero with all content fading in. Premium sites arrive whole.
- **CTAs typographic** (text + rule, text + arrow) more often than filled rounded buttons in editorial DNAs.

## Key contracts — read these files before writing related code

- `packages/design-dna/src/types.ts` — every DNA, every primitive, every stage types against this
- `packages/design-dna/src/dnas/quiet-luxury.ts` — the reference DNA, template for all others
- `packages/design-dna/src/brief/schema.ts` — the Brief type, input to the pipeline
- `packages/design-dna/src/brief/questions.ts` — the form definition

## Naming conventions

- Workspace packages: `@sweet/<name>` — if your monorepo uses a different prefix, rename consistently across `package.json` exports, `tsconfig.json` paths, and import statements
- Files: kebab-case for TS (`generate-theme-css.ts`), PascalCase for components (`BriefForm.tsx`)
- Pipeline stages: verb-noun (`synthesize-brief`, `generate-moodboard`)
- Supabase tables: snake_case, prefixed with feature area (`redesign_projects`, `redesign_briefs`)
- DNA IDs: kebab-case (`quiet-luxury`, `brutalist-tech`)
- Primitive variant IDs: kebab-case, descriptive (`editorial-split-rule`, `centered-serif-statement`)

## What "done" looks like for any task

- TypeScript strict typecheck passes (`pnpm typecheck` at the package or repo root)
- Files placed at exactly the paths the prompt specifies
- No new top-level dependencies introduced without an explicit reason
- No edits to files outside the task's scope
- If schema changes: migration SQL file at `apps/sweet-media/supabase/migrations/<timestamp>_<name>.sql` plus corresponding TypeScript types

## When in doubt

Match the patterns in `apps/sweet-media/supabase/functions/` for Edge Functions, `packages/admin-core/src/` for shared admin UI, and `packages/design-dna/src/` for typed library code. The conventions in those folders are load-bearing; don't deviate without surfacing the reason.

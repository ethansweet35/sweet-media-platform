---
name: new-brand-prototype
description: Guided intake and build workflow for creating a new brand website prototype on this platform. Use when starting a new brand, new client site, or new web prototype from scratch. Guides through Design DNA axis selection, Refero visual research, design token definition, image generation, design-preview page, and homepage build. Use eagerly whenever a new app directory is being set up or a user says "new brand", "new client", or "build a site for". Also covers WordPress migration replicate mode — when migrating an existing site, follow the Replicate Mode section before Phase 4.
---

# New Brand Prototype Workflow

Complete every phase in sequence. Do not skip ahead.

---

## Replicate Mode — Migrating an Existing WordPress/Elementor Site

Use this mode instead of Phases 1–4 when the goal is to **preserve an existing design** (e.g. migrating from WordPress/Elementor). The build phases (5–8) remain identical.

### RM-1 — Run the Design Token Extractor

```bash
node scripts/extract-wp-design-tokens.mjs --wp-url https://existing-site.com
```

This writes `design-tokens-[slug].json` to the repo root with extracted Elementor global colors, font families detected from Google Fonts links, and a `platformTokenSheet` scaffold to fill in.

### RM-1.5 — Migrate WordPress Site Images

Run immediately after RM-1. This downloads all images from the WordPress media library and homepage, uploads them to the client's Supabase `site-assets/images/wp-migrated/` bucket, and writes a local mapping file for use during page builds.

```bash
node scripts/migrate-wp-site-images.mjs \
  --wp-url https://existing-site.com \
  --site-id brand-slug
```

The script auto-detects `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from `apps/<brand-slug>/.env.local`.

Output: `image-map-{site-id}.json` at repo root — a JSON map of `originalWpUrl → supabasePublicUrl`.

**Important:**
- Only original (full-resolution) images are uploaded — WP size variants are skipped since Next.js handles responsive resizing via `next/image`
- WP REST `/media` endpoint requires auth if protected; the script falls back to homepage HTML crawl automatically
- Use `map[originalUrl]` when referencing images in page components during Track B build
- For pages with no suitable WP source image, use `GenerateImage` per `platform-unique-page-imagery` rule
- Run with `--dry-run` first on large sites to preview what will be uploaded

### RM-2 — Verify in Browser DevTools

Open the live WordPress site and complete the `platformTokenSheet` in the JSON file:

- **Colors:** Inspect hero background, section backgrounds, headings, body text, CTA button, CTA text. Use Elements → Computed → background-color / color.
- **Fonts:** Elements → Computed → font-family on `h1` and `p`. Check for Google Fonts `<link>` tags in `<head>`.
- **Spacing:** Box model on 2-3 representative sections — record the padding-top/bottom values.
- **Border radius:** Inspect CTA buttons and any card components.
- **Accent:** CTA button background color = accent primary.

### RM-3 — Take Viewport Screenshots

Capture screenshots at 375px, 768px, 1440px for every page using the browser's responsive mode. These are your reference documents for Track B page building. Store them locally — do not commit to the repo.

### RM-4 — Map to Design DNA Axes

Using the extracted tokens, assign the 8 Design DNA axes to accurately describe the *existing* design rather than inventing a new one. Explain each axis choice in terms of what exists on the live site.

Then **skip directly to Phase 4** using the completed `platformTokenSheet` as your token values. Phase 5 (image generation) is required for any pages where WP images cannot be re-hosted exactly.

---

## Phase 1 — Brand Intake

Collect the following before doing anything else. Ask if not provided:

- Brand name and intended app directory (`apps/<brand-slug>`)
- Industry / category
- Target audience (who is this for?)
- Brand tone (1–2 sentences describing the feeling or personality)
- Any visual references, mood words, or color directions the user has in mind

## Phase 1.5 — Creative Concept Statement

Before selecting Design DNA axes, define a **Creative Concept** — one sentence that acts as the artistic anchor for every design decision on this site. This is what makes the site feel like a piece of art rather than just a well-designed site.

A good concept describes the *experience* or *feeling*, not the features:
- "A sanctuary accessed through a window in nature" → Inner Peak
- "A performance dashboard for behavioral health marketers" → Sweet Media
- "A teen-run editorial magazine that takes mental health seriously" → candidate for Mental Health For Teens

Bad concepts describe functionality: "A clean, professional mental health website."

Write the concept first. Every Design DNA axis choice that follows should be defensible from the concept statement. Present it to the user for approval before moving to Phase 2.

## Phase 2 — Design DNA Selection

Read the Design DNA registry from `.cursor/rules/platform-premium-art-direction.mdc`.

For each of the 8 axes, propose a choice that fits the brand and explain the reasoning. Then verify: your 8 proposed choices must differ from every existing registered brand on **at least 6 axes**. If you're within 2 matches of an existing brand, change the overlapping choices.

Present the full 8-axis selection to the user as a table. Get explicit approval before proceeding.

**For each axis, also derive the concrete implementation detail:**

| Axis | What to define |
|---|---|
| Background archetype | Surface treatment in code (e.g. solid hex, CSS gradient, image strategy) |
| Palette temperature | 4–6 specific hex values: primary bg, secondary bg, surface/card, primary text, secondary text |
| Hero centerpiece | What the hero graphic or focal element will be |
| Typography personality | Specific font names (Google Fonts or system), weight range, pairing |
| Motion language | What animates, what doesn't, timing approach |
| Section rhythm | How sections alternate color/treatment, standard padding values |
| Accent treatment | Specific accent hex value(s) |
| Brand voice signal | CTA copy tone, headline approach, trust-building strategy |

## Phase 3 — Refero Visual Research

Use the Refero MCP (`refero_search_screens`) to find reference screens before writing any code.

Run two searches on the `web` platform:

1. A query combining the hero centerpiece + palette (e.g. `"premium dark abstract website hero geometric animation"`)
2. A query combining the industry + brand mood (e.g. `"teen mental health therapy website clean minimal"`)

Review results. Identify 2–3 specific UI patterns, layout approaches, or design details worth incorporating. Summarize findings for the user — don't just list URLs.

## Phase 4 — Design Token Definition

Define the complete token set before writing any component. Present this to the user for approval:

```
Brand: [Name]
App: apps/[slug]

--- Colors ---
Primary background:   #______
Secondary background: #______
Surface/card:         #______
Primary text:         #______
Secondary text:       #______
Accent primary:       #______
Accent secondary:     #______ (if applicable)
Border/divider:       rgba(______, 0.__)

--- Typography ---
Display font:  [Name], weights [range]
Body font:     [Name], weights [range]
Heading tracking: [e.g. -0.02em]
Body line-height: [e.g. 1.7]

--- Spacing & Shape ---
Spacing unit:      [e.g. 8px base]
Border radius:     [e.g. 4px / 12px / 24px / pill]
Section padding:   [e.g. py-24 standard / py-32 hero]
Max content width: [e.g. max-w-7xl]

--- CTAs ---
Primary:   bg [hex] / text [hex] / shape [pill|rounded|square]
Secondary: [border|ghost] treatment
```

## Phase 5 — Generate Brand Images

Using the `GenerateImage` tool, generate the first 2 images for the brand. Write specific, on-brand prompts — not generic.

1. **Hero image** — matches the background archetype, palette, and brand mood
2. **Content image** — a secondary scene that supports the brand voice

Then upload both images to the brand's Supabase `site-assets/images/` bucket per the `platform-unique-page-imagery` rule. Name them:
- `[brand-prefix]_hero01.jpg`
- `[brand-prefix]_content01.jpg`

## Phase 6 — Design Preview Page

Build `apps/[slug]/src/app/design-preview/page.tsx` as a single Server Component (no metadata needed, this is internal). This page is the visual contract and must show all of the following:

1. **Color palette** — a row of swatches with hex labels for every token
2. **Typography scale** — h1, h2, h3, body, caption, label — rendered in the approved fonts
3. **CTA variants** — primary, secondary, ghost buttons side by side
4. **Hero preview** — the full hero section using the hero image and background archetype
5. **Two section examples** — showing the section rhythm (alternating backgrounds, spacing, content cards or content blocks)

**Stop here. Show the user the design-preview page and get explicit approval before Phase 7.**

## Phase 6.5 — Section Composition Plan

Before writing any component, define every homepage section's composition. Read `platform-section-composition.mdc` for the full rules. For each section, complete:

```
Section: [Name]
Level: Standard / Elevated / Signature
Layout archetype: [specific — not "grid with content"]
Heading pattern: [eyebrow+h2 / full-width h2 / mega-heading / no-heading / quote-as-heading]
Background: [token]
Compositional departure: [what makes it distinct, or "none" for Standard]
```

**Before proceeding, verify:**
- [ ] At least 2 Signature sections
- [ ] `eyebrow → h2 → paragraph` pattern used 3 times max
- [ ] No two consecutive sections share the same grid structure
- [ ] At least one heading at 100px+ on desktop
- [ ] At least one section with no display heading

Present the Section Composition Plan and get approval before Phase 7.

## Phase 7 — Homepage Build

Build the full homepage using the approved Design DNA, tokens, and Section Composition Plan. Decompose into named section components under `src/views/home/components/`. The page route is a thin wrapper.

Apply all 8 registered Design DNA choices throughout. Every section must:
- Use the approved palette (no new hex values introduced)
- Use the approved fonts (no new families introduced)
- Follow the section rhythm and apply all axis choices consistently
- Match the motion language choice (don't add animations if the axis is `static-cinematic`)

Validate before declaring done:
- [ ] Renders correctly at 375px, 768px, 1440px
- [ ] LCP asset (hero image/video) is optimized (`priority`, `quality` set, `sizes` specified)
- [ ] Heading hierarchy is correct (one h1, logical h2/h3 cascade)
- [ ] All interactive elements have visible focus states
- [ ] Color contrast passes for primary text and CTA labels

## Phase 8 — Registry Update

Add the new brand's 8-axis choices to the Design DNA registry in `.cursor/rules/platform-premium-art-direction.mdc`. Include the specific hex values and implementation details in the Details column.

---

## Reference: Design Differentiation Check

Use this quick check after Phase 2 to verify the new brand is distinct:

```
Existing brands and their axis combos:
- sweet-media:          solid-dark-abstract | cool-midnight | data-visualization | editorial-serif-contrast | ambient-particles-orbit | dark-dominant | pure-white | performance-ROI
- inner-peak-colorado:  photo-video-overlay | warm-forest | editorial-photography | editorial-serif-warmth | static-cinematic | alternating-cream | warm-amber-copper | care-sanctuary
- mental-health-for-teens: gradient-mesh-abstract | neutral-sand | TBD | geometric-sans | micro-interactions-only | TBD | electric-pop | clinical-trust

New brand must share no more than 2 axis choices with any single existing brand.
```

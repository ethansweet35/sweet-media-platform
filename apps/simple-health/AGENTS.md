<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Simple Health — WP Replication Process

**Live WP site:** https://getsimplehealth.us  
**Supabase ref:** `zxpkxysqzxozgocfuvug`  
**Migrated images base URL:** `https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated/`  
**Image map:** `apps/simple-health-migration/image-map.json` (WP URL → Supabase URL)  
**Migration content:** `apps/simple-health-migration/migration-report.json` → `.pageContents[]`

## Mandatory process for every new page

1. **Take a WP screenshot first** using Playwright before writing any code:
   ```bash
   node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.setViewportSize({width:1440,height:900});await p.goto('https://getsimplehealth.us/<slug>/',{waitUntil:'networkidle',timeout:30000});await p.screenshot({path:'wp-screenshots/simple-health/<slug>-wp.png',fullPage:true});await b.close();console.log('done');})()"
   ```
2. **Read the screenshot** with the Read tool to understand exact layout, section order, and component patterns before writing any JSX.
3. **Extract page content** from migration report:
   ```bash
   node -e "const r=require('./migration-report.json');const p=r.pageContents.find(x=>x.slug==='<slug>');console.log(p.rawHtml.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0,8000))"
   ```
4. **Resolve images** — scaled WP variants (e.g. `-1024x768.png`) are NOT in the map; strip the size suffix to get the original key.
5. **Build the page** in `src/views/<route>/page.tsx` + thin `src/app/<route>/page.tsx` route with `generateMetadata` + `resolveTrackedPageMetadata`.
6. **Screenshot the local build** and diff section-by-section against WP:
   ```bash
   node -e "... page.goto('http://localhost:3000/<route>') ... page.screenshot({clip:{x:0,y:0,width:1440,height:700}})"
   ```
7. **Fix differences** until layout matches.
8. **Run `tsc --noEmit`** — zero errors required before moving on.

## Brand tokens

| Token | Value |
|---|---|
| Background cream | `#FAF7F4` |
| Clay accent | `#C67B5C` |
| Clay hover | `#B86B4E` |
| Clay text | `#9A5640` |
| Body text | `#3A3A3A` / `#555` |
| Heading | `#2A2A2A` |
| Border | `#E8E2D9` |
| Cobalt (skin) | `#2B81AA` |
| Sage (peptides) | `#6B7456` |
| Container | `mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12` |
| Serif font | `font-serif` (DM Serif Text) |
| Schedule CTA | `https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13219022` |

## Page file structure

```
src/app/<route>/page.tsx          ← thin route: generateMetadata + import View
src/views/<route>/page.tsx        ← all JSX, "use client" if interactive
```

## Known page → image mappings

| Page | Hero image filename |
|---|---|
| `/weight-loss` | `women-using-GLP-1-weight-loss-products-1.png` (left col of metabolic section) |
| `/semaglutide` | `ChatGPT-Image-May-2-2026-02_39_28-PM.png` |
| `/tirzepatide` | `ChatGPT-Image-May-2-2026-02_38_47-PM.png` |
| `/retatrutide` | `ChatGPT-Image-May-2-2026-02_25_30-PM.png` |
| `/oral-semaglutide` | `ORAL-Sem-3.png` (hero); `ORAL-Sem-1..6.png` (gallery) |

## Medication sub-page template sections (in order)

1. Hero — eyebrow (efficacy tier), H1 (med name), subtitle, price badge, description, 2 CTAs, 3 trust badges, hero image (right col)
2. Three feature callout cards (mechanism / results / key benefit)
3. "The science, in full detail" — 3-tab section (How It Works | Clinical Trials | Dosing Schedule)
4. Side effects — 6-card grid with frequency + severity badge
5. Questions/FAQ — accordion
6. Consultation Fees — same 3-tier pricing used on `/weight-loss`

## Shared components to reuse across pages

- `CheckItem` — clay checkmark list item
- `FaqItem` — accordion with open/close state
- `ConsultationFees` — the 3-tier pricing footer section (identical on all pages)
- Process steps (4-step "Simple Process") — identical copy/layout on every page

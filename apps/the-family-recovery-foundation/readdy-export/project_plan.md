# The Family Recovery Foundation Website Rebuild

## 1. Project Description
A modern, editorial-style website for The Family Recovery Foundation (TFRF), a nonprofit supporting families impacted by addiction. The design is warm, quiet, and dignified — built around a "lifeline" metaphor that visually connects every section. The site evokes safety, hope, and dignity through restrained typography, monochromatic blues, and thoughtful photography.

**Target users:** Families seeking help for addiction, donors, partners, and community members.
**Core value:** Position TFRF as a trustworthy, compassionate resource — not a corporate nonprofit or clinical service.

## 2. Page Structure
- `/` — Homepage (hero, mission, three pillars, impact, stories, partners, donation CTA, newsletter, footer)
- `/get-help` — Get Help (highest-priority conversion page)
- `/family-program` — Family Program page
- `/stories` — Stories index
- `/story/:id` — Individual story detail
- `/about` — About Us
- `/donate` — Donation page
- `/contact` — Contact

## 3. Core Features
- [ ] Editorial homepage with scroll-driven "lifeline" SVG animation
- [ ] Responsive navigation with mobile hamburger menu
- [ ] Hero section with full-bleed photography and word-by-word headline reveal
- [ ] Three Pillars section (Prevention, Education, Support)
- [ ] Impact stats section with monumental numbers
- [ ] Featured story and story grid components
- [ ] Donation CTA section with amount cards
- [ ] Newsletter subscription form
- [ ] Partner logos and trust signals
- [ ] Faith note section (optional based on identity)
- [ ] Video embed section
- [ ] Footer with locations, links, contact info
- [ ] `prefers-reduced-motion` accessibility support

## 4. Data Model Design
No database required for V1. All content is static/markup-based. Future phases may add:
- Stories CMS collection
- Team members
- Event listings
- Impact metrics

## 5. Backend / Third-party Integration Plan
- **Supabase:** Not required for V1. May be added later for contact form storage or story CMS.
- **Shopify:** Not applicable — nonprofit, not e-commerce.
- **Stripe:** Considered for V2 custom donation flow. V1 will use Donorbox embed or simple donation links.
- **YouTube:** Embedded video player for content channel.
- **Forms:** Newsletter and contact forms via Readdy form endpoints.

## 6. Development Phase Plan

### Phase 1: Foundation + Homepage
- Goal: Build the design system (colors, typography, spacing, fonts) and the full homepage
- Deliverable: Complete, responsive homepage with all sections per the creative brief

### Phase 2: Navigation + Footer + Global Components
- Goal: Build the navigation, footer, mobile menu, and reusable components
- Deliverable: Working nav with scroll effects, hamburger menu, footer with locations

### Phase 3: Get Help Page
- Goal: Build the highest-stakes conversion page
- Deliverable: Full Get Help page with pathways, steps, stories, FAQ

### Phase 4: Family Program + Stories Pages
- Goal: Build the Family Program page and Stories index/detail pages
- Deliverable: Magazine-style editorial pages

### Phase 5: About + Donate + Contact
- Goal: Complete remaining pages
- Deliverable: About, Donate, Contact pages

### Phase 6: Motion Polish + Accessibility + Performance
- Goal: Add scroll-triggered reveals, lifeline animation, hover states, accessibility audit
- Deliverable: Production-ready site with all motion and a11y features
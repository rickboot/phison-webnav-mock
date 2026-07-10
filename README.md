# Phison 2027 Website IA Prototype

An internal information architecture prototype for reviewing Phison's proposed 2027 top navigation and subnavigation structure. This is **not** an official production design.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repository to GitHub (or connect your local project).
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — no extra configuration required.
4. Deploy. All pages are statically generated.

Alternatively, using the Vercel CLI:

```bash
npx vercel
```

## Project Structure

```
app/
  layout.tsx              # Root layout with header, footer, noindex metadata
  page.tsx                # Home page
  product-finder/         # Mock Product Finder
  contact-sales/          # Mock Contact Sales
  [section]/              # Section landing pages (solutions, resources, etc.)
  [section]/[slug]/       # Individual subnav mock pages
components/
  Header.tsx              # Sticky top nav with mega menus
  MegaMenu.tsx            # Desktop mega menu panel
  Footer.tsx              # Site footer
  Hero.tsx                # Hero, breadcrumb, CTA band
  CardGrid.tsx            # Card grid components
  PageTemplate.tsx        # Standard mock page template
  ProductFinderMock.tsx   # Product Finder with filters
data/
  nav.ts                  # Navigation hierarchy (edit to update IA)
  pages.ts                # Home content and mock product data
public/
  Phison-SVG.svg          # Official Phison logo (used in header & footer)
```

## Replacing Logo & Assets

The header and footer use `/Phison-SVG.svg`. To swap the logo, replace that file or update the `src` in `components/Header.tsx` and `components/Footer.tsx`:

```tsx
<Image
  src="/Phison-SVG.svg"
  alt="PHISON"
  width={146}
  height={28}
  ...
/>
```

## Navigation Data

All navigation structure lives in `data/nav.ts`. Edit this file to add, remove, or reorganize menu items. Each item needs a `label`, `href`, and `description`. Section landing pages and sub-pages are generated automatically from this data.

## Internal Prototype Notice

- A discreet banner reads: "2027 Website IA Prototype — Internal Review Only"
- `robots` metadata is set to `noindex, nofollow`
- All page copy is representative placeholder content for navigation validation

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Static generation only — no backend or database

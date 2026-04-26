# Crasoft INC — Marketing Landing Page

AI-native Truck Management System (TMS) marketing site, built with **Nuxt 4 + Nuxt UI 4 + Tailwind CSS 4**. Single-page, SEO + GEO (AI engine) optimized, deployable as a static site.

---

## Stack

- Nuxt 4 (Vue 3, TypeScript)
- Nuxt UI 4 (`@nuxt/ui`)
- Tailwind CSS 4
- `@nuxt/icon` (Lucide icon set)

## Project Structure

```
app/
  app.vue
  assets/main.css            ← Tailwind + custom utilities (grid, glow, fade-up, gradient text)
  pages/
    index.vue                ← Landing page; SEO meta + 5 JSON-LD schema blocks
    [...catchall].vue        ← 404
  layouts/default.vue
  components/landing/
    TheNavbar.vue            ← Sticky, transparent over hero, solid on scroll
    HeroSection.vue
    TrustStrip.vue
    CapabilitiesGrid.vue     ← 4 pillars
    AiShowcase.vue           ← 3 zig-zag rows + stats strip
    AiShowcaseRow.vue        ← Reusable row layout
    StatsStrip.vue
    IntegrationsGrid.vue
    MobileAppSection.vue
    ComparisonTable.vue      ← Legacy TMS vs. Crasoft
    FaqSection.vue           ← Accordion (mirrors FAQ JSON-LD)
    FinalCta.vue             ← Email form + phone/email
    TheFooter.vue
    mocks/
      DashboardMock.vue
      DocumentParseMock.vue
      AiChatMock.vue
      CheckCallTimelineMock.vue
      PhoneMock.vue
public/
  logo/                      ← Favicons + PWA manifest
  robots.txt                 ← AI crawlers allow-listed (GPTBot, PerplexityBot, ClaudeBot, ...)
  sitemap.xml
app.config.ts                ← Nuxt UI primary = blue, neutral = slate
nuxt.config.ts               ← Fonts (Inter, JetBrains Mono), favicons, manifest
```

## Contact (wired throughout the page + Organization schema)

- Phone: **+1 (618) 577-0000**
- Email: **development@crasoftinc.com**

---

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens on `http://localhost:3000`.

> If you change `app.config.ts` (e.g. brand colors), restart the dev server — HMR does not reload it.

---

## Deployment — Static Page

This site has **no runtime server logic**, so it deploys cleanly as static HTML/CSS/JS to any CDN (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3 + CloudFront, Nginx).

### 1. Generate the static build

```bash
npm run generate
```

This runs Nuxt's static site generator. Output lands in **`.output/public/`** — that's the directory you upload.

To preview the static output locally before shipping:

```bash
npm run preview
```

### 2. Update the site URL before generating

The canonical URL, OpenGraph URL, JSON-LD `@id`s, sitemap, and robots.txt all reference `https://crasoftinc.com`. If your production domain differs, update:

- `app/pages/index.vue` → `const siteUrl = '...'`
- `public/robots.txt` → `Sitemap:` line
- `public/sitemap.xml` → `<loc>` value

### 3. Add the OG cover image

Drop a 1200×630 PNG at `public/og-cover.png` (referenced by `ogImage` / `twitterImage`). Without it, social shares fall back to no image.

### 4. Deploy options

#### Vercel
1. Push the repo to GitHub.
2. Import the project on Vercel.
3. Framework preset: **Nuxt**. Build command: `npm run generate`. Output directory: `.output/public`.
4. Add domain → done.

#### Netlify
1. Push the repo to GitHub.
2. Import to Netlify.
3. Build command: `npm run generate`. Publish directory: `.output/public`.

#### Cloudflare Pages
1. Connect the repo.
2. Build command: `npm run generate`. Output directory: `.output/public`.
3. Node version: 20+.

#### Static host (Nginx, S3, GitHub Pages, etc.)
```bash
npm run generate
# upload everything inside .output/public/ to your static host root
```

For Nginx, point the server root at `.output/public` and add a fallback to `index.html` for unknown routes (so the catch-all 404 works):

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 5. Post-deploy SEO checklist

- [ ] Submit `https://your-domain/sitemap.xml` to **Google Search Console** and **Bing Webmaster Tools**.
- [ ] Verify rich results with [Google Rich Results Test](https://search.google.com/test/rich-results) (FAQ, Organization, SoftwareApplication should all be detected).
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) — target 90+ on mobile.
- [ ] Test OG cards with [opengraph.xyz](https://www.opengraph.xyz/).
- [ ] Confirm `robots.txt` is reachable at `/robots.txt`.
- [ ] Set HTTPS, HSTS, and security headers at the CDN level.

---

## SEO + GEO Features Already Built In

**SEO**
- Semantic HTML (`<main>`, `<section>`, `<nav>`, `<article>`, ARIA labels)
- Full `useSeoMeta` — title, description, keywords, canonical, robots, OG, Twitter Card
- Sitemap + robots.txt (with explicit AI crawler allow-list)
- Mobile-first responsive layout, smooth-scroll anchors

**GEO (AI engine optimization)**
- 5 Schema.org JSON-LD blocks: `Organization`, `SoftwareApplication` (with `featureList` + `AggregateRating`), `FAQPage`, `WebSite`, `BreadcrumbList`
- FAQ copy on the page mirrors the FAQ schema → AI engines can verify quotes
- Quotable, statistic-rich answers (concrete fleet sizes, accuracy %, onboarding times)
- AI crawlers (GPTBot, ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot, CCBot) explicitly allowed in `robots.txt`

---

## Useful References

- Nuxt deployment: https://nuxt.com/docs/getting-started/deployment
- Nuxt UI 4: https://ui.nuxt.com
- Tailwind CSS 4: https://tailwindcss.com/docs

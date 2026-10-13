@AGENTS.md
@crasoft-website-decisions.md

# Crasoft website: how we build it

crasoftinc.com is Crasoft's company landing site. Crasoft is the hero; the products are shown as what the company has built. **What** goes on the site is in `crasoft-website-decisions.md` (imported above). This file covers **how** we build it.

## Ground rules

- **Never invent facts.** Numbers, user counts, countries, addresses, emails, team names, dates, quotes and URLs come only from the user or the decisions file. If something is missing, add a `TODO(content):` placeholder and list it at the end of your reply.
- **Open decisions** (unchecked boxes in the decisions file): build with the option marked "(recommended)". Keep it easy to swap, in one constant or prop, and don't mark it decided. When the user decides, update the decisions file.
- **One hook and one link per home section.** Don't add sections, pages or features that aren't in the decisions file without asking.
- **No pricing and no product pages.** Product cards link out to the product websites.
- **No new dependencies without asking.** The stack below is enough.
- English only, with US spelling.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS v4. Config is CSS-first: tokens go in `app/globals.css` under `@theme`, and there is no `tailwind.config` |
| Animation | `motion` (import from `motion/react`) |
| Icons | `lucide-react` |
| Class names | `clsx` + `tailwind-merge` via `cn()` in `lib/utils.ts` |
| JSON-LD types | `schema-dts` |
| Backend | None. Every page is statically prerendered and the demos run on fake data in the browser. Contact uses an email/mailto link until a form service is chosen (ask first). |

Next 16 differs from older versions. Run `npm install`, then read the relevant guide in `node_modules/next/dist/docs/` before writing code (see AGENTS.md). Check these first: the metadata API and metadata files (`sitemap.ts`, `robots.ts`, `opengraph-image`, `icon`), `next/image`, `next/font`, async `params`, and the `LayoutProps`/`PageProps` type helpers (`app/layout.tsx` already uses one).

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

There is no test runner, so `lint` and `build` are the checks.

## Project structure

```
app/
  layout.tsx              fonts, default metadata, Organization + WebSite JSON-LD, <Navbar>, <Footer>
  page.tsx                Home: the sections in blueprint order, nothing else
  about/page.tsx
  careers/page.tsx
  investors/page.tsx
  contact/page.tsx
  legal/privacy/page.tsx
  legal/terms/page.tsx
  not-found.tsx
  sitemap.ts  robots.ts  manifest.ts
  icon.svg  apple-icon.png  opengraph-image.png
  globals.css             Tailwind import + design tokens
components/
  layout/                 Navbar, Footer, Container, SkipLink
  home/                   Hero, ProductsShowcase, TrustStrip, HowWeCraft, WhatsNext, FinalCta
  demos/                  TmsDemo, DriverAppDemo, NavigationDemo, RelaySyncDemo (fake data next to each)
  ui/                     Button, Section, Reveal, CountUp, TryItHint, ...
  seo/JsonLd.tsx          renders a typed schema-dts object as <script type="application/ld+json">
lib/
  site.ts                 single source of company facts (see Content and copy)
  products.ts             the 4 products: slug, name, hook, url, logo
  seo.ts                  pageMetadata() helper + schema builders
  utils.ts                cn()
public/
  brand/                  Crasoft logos
  products/<slug>/        product logos and images
  llms.txt
```

- Use Server Components by default. Put `"use client"` only on the smallest piece that needs it, such as an animation wrapper or a demo. Page text stays in Server Components so it is in the HTML.
- Import with `@/`.
- The first build step removes the create-next-app starter: the `app/page.tsx` content, the `public/*.svg` files, and the automatic dark mode and Arial override in `globals.css`.

## Content and copy

- `lib/site.ts` holds every company fact used in more than one place: name, URL (`https://crasoftinc.com`), slogan, one-sentence description, founding year, US address, email, social profile URLs (`sameAs`) and nav links. Metadata, JSON-LD, the footer and About all read from it, so the facts never drift. Search engines and AI also read consistent facts as a signal of a real company.
- Section copy lives in its section component. Product copy lives in `lib/products.ts`.
- Voice: short sentences, plain words, calm and precise, like the slogan. No buzzwords ("cutting-edge", "revolutionary", "seamless"), no exclamation marks and no hype.
- Use full names on first mention on each page: "TFONE TMS" or "Relay TMS Sync", not "the TMS" or "our extension".
- Links to product sites use `target="_blank" rel="noopener"` and show ↗. Leave out `noreferrer` so the product sites can see traffic from crasoftinc.com.

## Assets: where things go

When the user hands over assets, put them here and wire them up:

| Asset | Location | Notes |
|---|---|---|
| Crasoft logo (full) | `public/brand/crasoft-logo.svg` | SVG preferred. Add a light-on-dark version if the design needs one. |
| Crasoft mark (icon only) | `public/brand/crasoft-mark.svg` | Also the source for `app/icon.svg`, `app/apple-icon.png` (180×180) and `app/favicon.ico` |
| Brand colors | `@theme` tokens in `app/globals.css` | Components use tokens (`bg-brand`, `text-ink`, ...), never raw hex. Check AA contrast. |
| Fonts | `next/font` in `app/layout.tsx` | Geist stays until brand fonts arrive. Always self-hosted through `next/font`, never a `<link>` to Google Fonts. |
| Product logos and screens | `public/products/<slug>/` | Slugs: `tfone-tms`, `tfone-driver-app`, `tfone-navigation`, `relay-tms-sync` |
| Social share image | `app/opengraph-image.png` | 1200×630, logo + slogan |
| Team photos | `public/team/` | Square, with the same crop and light |

Images:

- Always use `next/image` with real `width` and `height`, so nothing shifts while loading.
- Alt text describes the image ("TFONE Driver App signature screen", not "image"). Decorative images get `alt=""`.
- Preload the hero's LCP image. The `next/image` prop for this changed in v16, so check the docs.

## Design and animation

- Mobile first. Layouts must work from 360px wide up, with no horizontal scroll.
- The site should feel crafted: spacing on a consistent scale, an aligned grid, few colors and plenty of whitespace. Restraint beats effects.
- The site has one theme, set when brand colors arrive. No automatic dark mode unless we design one.
- Animations use `motion`, and every one respects `prefers-reduced-motion`. Wrap the app in `<MotionConfig reducedMotion="user">` and check `useReducedMotion()` in custom effects. With reduced motion, content just appears.
- Animation never removes content from the HTML. The server renders the text and the client only animates it in. Animate `opacity` and `transform` only, never layout properties.
- Home animations follow the blueprint table:
  - Hero lines reveal one by one.
  - Trust numbers count up when scrolled into view. The final number is in the HTML.
  - The three principles fade in one by one.
  - Everything else stays subtle.

## Product demos

The showcase is "show, don't tell". Each demo is a small fake app:

- It is a client component in `components/demos/`, with its fake data in a local file next to it. It makes no network calls and uses no random values that differ between server and client, which would cause hydration mismatches.
- It loads lazily as it nears the viewport, so demos never slow the first paint. Its space is reserved so nothing jumps when it loads.
- Each slide has the product name (a heading), one short line, the demo and `[Visit website ↗]`. The name, line and link are server-rendered text outside the demo, so crawlers and screen readers get them even if the demo never runs.
- A "Try it" hint shows until the first interaction.
- Pointer effects (tilt, glow, follow cursor) run only on fine pointers (`(hover: hover) and (pointer: fine)`). On touch, drag becomes tap.
- The keyboard works: Tab, Enter and Space reach every action, with visible focus. The demo has an accessible label, and an `aria-live` region announces state changes ("Load 1042 dispatched").
- With reduced motion, the steps stay the same but nothing flies or draws.
- A reset button returns the demo to its first state.
- Build the TFONE TMS dispatch board first to test the feel. Build the other three once the user approves it.

## SEO

These rules apply to every page. The skills listed below have the detailed checklists.

- **Metadata.** The root layout sets `metadataBase` (`https://crasoftinc.com`), a title template (`%s | Crasoft`), a default description, Open Graph and a Twitter card. Every page exports its own `metadata` through `pageMetadata()` in `lib/seo.ts`, with:
  - a unique title of 50–60 characters
  - a unique description of 150–160 characters
  - a canonical URL (`alternates.canonical`)
  - OG title, description and url
- **Headings.** Each page has exactly one `<h1>`. Home's H1 is the hero headline. The sentence under it and the title tag carry the descriptive words ("software company", "TFONE"). Each section gets an `<h2>`, with `<h3>` inside, and no levels are skipped.
- **Semantic HTML.** Use `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>` and `<footer>`. Navigation uses `<a>` or `<Link>`; actions use `<button>`.
- **`app/robots.ts`** allows everything, including AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended), and points to the sitemap.
- **`app/sitemap.ts`** lists every public route with `lastModified`. It contains no 404s and no redirects.
- **Internal links.** The navbar or footer reaches every page. Anchor text says where the link goes ("Read our story", not "Click here"). The navbar's "Products" link goes to `/#products`.
- **Canonical host** is `https://crasoftinc.com`, with no www. Set up the www → apex and http → https redirects at the host.
- **URLs** are lowercase and hyphenated, with no trailing slash, as in the structure above.
- **`not-found.tsx`** is a real 404 with links back to Home and Contact.

## Structured data (JSON-LD)

Render it with `<JsonLd>` and `schema-dts` types, using absolute URLs. It must match what the page visibly says. Never mark up anything that isn't on the page.

| Where | Schema |
|---|---|
| Root layout (all pages) | `Organization` (`@id: https://crasoftinc.com/#organization`) with name, url, logo, slogan, description, foundingDate `2020`, address, email and `sameAs`. `WebSite` (`@id: https://crasoftinc.com/#website`) with `publisher` pointing to the organization. |
| Home | `ItemList` of the 4 products as `SoftwareApplication`, each with name, description, url (the product site), applicationCategory and `publisher` pointing to the organization `@id`. No `offers` and no ratings, since there is no pricing and we never fake reviews. |
| About | `AboutPage`, plus a `Person` for each team member shown, with `worksFor` pointing to the organization. |
| Careers | `JobPosting` for each open role, only when real roles exist. Include datePosted, validThrough, employmentType, hiringOrganization, and jobLocation or applicantLocationRequirements. |
| Contact | `ContactPage` |
| Inner pages | `BreadcrumbList` (Home → Page) |

Validate with Google's Rich Results Test and validator.schema.org before launch.

## GEO (being found and cited by AI)

AI answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews) cite pages they can read and trust.

- **All text is in the HTML.** Many AI crawlers don't run JavaScript. View source must show every heading, sentence, product name and number.
- **The About page opens with a quotable definition.** It is a standalone 40–60 word answer to "What is Crasoft?" that starts with "Crasoft is..." and covers the company type, 2020, the United States, what it builds and TFONE. The hero and the meta description say the same thing in short form.
- **Specific facts beat adjectives.** "Founded in 2020", "4 products" and "users in N countries" beat "trusted worldwide". Use real numbers only.
- **The facts are the same everywhere.** Name, description, logo, address and founding year match across pages, JSON-LD and off-site profiles. They all come from `lib/site.ts`.
- **`sameAs`** links to the official profiles (LinkedIn, X, GitHub, Crunchbase, later Wikidata) once the user provides them.
- **`public/llms.txt`** is a short plain-text summary of Crasoft, with links to each page and each product site.
- Keep sections short (3–5 sentences), under clear headings that read like questions people ask.

## Performance and accessibility targets

- Lighthouse on mobile scores 95 or higher for Performance, Accessibility, Best Practices and SEO.
- Core Web Vitals: LCP under 2.5s, CLS under 0.1, INP under 200ms.
- Fonts load through `next/font`, images are sized and demos are lazy. No third-party scripts without asking. Analytics is not decided yet.
- WCAG 2.2 AA: contrast, visible focus, keyboard navigation, alt text, `lang="en"` and a skip-to-content link.

## Using the SEO/GEO skills

The skills in `.claude/skills/` are our checklists. Use them at these points:

| When | Skill |
|---|---|
| Writing or rewriting page copy (hero, About, section lines) | `geo-content-optimizer` |
| Titles, descriptions, OG tags | `meta-tags-optimizer` |
| JSON-LD | `schema-markup-generator` |
| A page is finished | `on-page-seo-auditor` |
| Before launch | `technical-seo-checker` |
| Company identity: Organization schema, `sameAs`, then off-site profiles (Wikidata, Crunchbase) after launch | `entity-optimizer` |
| Optional, once: words for titles, or checking what Google shows for "Crasoft" | `keyword-research`, `serp-analysis` |

When a skill and this file disagree, this file wins. The skills are written for blogs and articles, while this site is a short company landing page.

## Build order

1. **Foundation.** Remove the starter, then add `lib/site.ts`, tokens, fonts, the layout, Navbar, Footer and the SEO plumbing: metadata, robots, sitemap, JSON-LD, icons and the 404 page.
2. **Static Home.** Build all 7 sections with real HTML copy. Product slides get a placeholder where the demo will go.
3. **First demo.** Build the TFONE TMS dispatch board and review the feel with the user.
4. **Other demos.** Build the Driver App, Navigation and Relay TMS Sync demos.
5. **Inner pages.** Build About, Careers, Investors, Contact and Legal.
6. **Motion polish.** Add the hero reveal, count-up, fades and pointer effects.
7. **Audit and launch.** Run the skills above, Lighthouse and schema validation, then deploy.

Brand assets can arrive at any step. Until then, use neutral placeholders that are easy to swap.

## Definition of done (every change)

- `npm run lint` and `npm run build` pass with no errors.
- You checked it in the browser at 375px and at desktop width, with no console errors or hydration warnings.
- It works with reduced motion and with the keyboard.
- View source shows the text, `<title>`, description, canonical and JSON-LD.
- Your reply lists every `TODO(content):` you left behind.

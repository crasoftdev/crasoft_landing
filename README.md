# Crasoft website

The company landing site for Crasoft, served at [crasoftinc.com](https://crasoftinc.com). Crasoft is the focus of the site, and its products appear as work the company has built. Product cards link out to each product's own website.

## Stack

- Next.js 16 (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4, configured CSS-first. Tokens live in `app/globals.css` and there is no `tailwind.config`.
- `motion` for animation, `lucide-react` for icons, `clsx` + `tailwind-merge` for class names
- `schema-dts` for typed JSON-LD

There is no backend. Every page is statically prerendered, and the product demos run in the browser on fake data. The contact form opens a `mailto:` link until a form service is chosen.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server |
| `npm run build` | Builds the production site |
| `npm run start` | Serves the production build |
| `npm run lint` | Runs ESLint |

There is no test runner. `lint` and `build` are the checks.

> This version of Next.js has breaking changes compared with older ones. Read the relevant guide in `node_modules/next/dist/docs/` before writing code.

## Project structure

```
app/                  routes, layout, metadata files (robots, sitemap, icons, manifest), 404
components/
  home/               Home page sections
  demos/              interactive product demos (TFONE TMS, Driver App, Navigation)
  layout/             Navbar, Footer, MobileMenu
  seo/JsonLd.tsx      renders typed JSON-LD
  ui/                 shared UI pieces
lib/
  site.ts             company facts: name, URL, slogan, email, nav links
  products.ts         product names, lines and links
  seo.ts              metadata helper and schema builders
  utils.ts            cn()
public/               logos, web app icons, llms.txt
```

Company facts live in `lib/site.ts` and product copy in `lib/products.ts`, so metadata, JSON-LD and page text always match.

## Contributing

`CLAUDE.md` has the build rules: content, SEO, accessibility, animation and performance targets. Before you open a change:

- `npm run lint` and `npm run build` pass.
- The page works at 375px and at desktop width, with the keyboard, and with reduced motion.
- View source shows the page text, title, description, canonical and JSON-LD.

## Deployment

The site is built to deploy on Vercel. Preview hosts send `X-Robots-Tag: noindex` (see `next.config.ts`), so only `crasoftinc.com` gets indexed. The canonical host is `https://crasoftinc.com`, without www. Set up the www → apex and http → https redirects at the host.

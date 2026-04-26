# Crasoft INC — Landing Page Build Spec

> **Target stack:** Nuxt 4 + Nuxt UI + Tailwind CSS
> **Page type:** Single-page marketing landing
> **Goal:** Convert fleet operators / brokers into demo requests
> **Tone:** Confident, modern, AI-forward, slightly technical

---

## 1. Brand Foundation

| Field | Value |
|---|---|
| Company | **Crasoft INC** |
| Product | AI-native Truck Management System |
| Hero headline | **Get your fleet to the next level** |
| Sub-headline | The TMS that thinks, acts, and scales with you — so your team doesn't have to. |
| Primary CTA | Book a Demo |
| Secondary CTA | See it in Action |

### Color Palette

```
Primary:     #1E40AF  (blue-700)     — main brand
Primary-alt: #4F46E5  (indigo-600)   — gradients, accents
Accent:      #06B6D4  (cyan-500)     — "AI / live" indicators
Success:     #10B981  (emerald-500)  — automation badges
Dark BG:     #0B1220  (custom slate) — hero, footer
Surface:     #F8FAFC  (slate-50)     — light sections
Text dark:   #0F172A  (slate-900)
Text muted:  #64748B  (slate-500)
```

Use `nuxt/ui` primary color override:
```ts
// app.config.ts
export default defineAppConfig({
  ui: { primary: 'blue', gray: 'slate' }
})
```

### Typography

- Headings: **Inter** or **Geist** — `font-bold`, tight tracking on H1/H2
- Body: same family, `font-normal`
- Mono accents (for code/AI hints): **JetBrains Mono** or **Geist Mono**

### Page width / layout

- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section vertical padding: `py-20 lg:py-28`
- Standard landing length — **no infinite scroll**. Keep it ~7 sections.

---

## 2. Page Structure (Order)

1. Navbar (sticky)
2. Hero
3. Trust strip / "Built for"
4. Core capabilities (4 pillars)
5. AI & Automation showcase
6. Integrations
7. Mobile app section
8. Why Crasoft (comparison)
9. Final CTA
10. Footer

---

## 3. Section-by-Section Spec

### 3.1 Navbar

**Behavior:** Sticky top, transparent over hero, solid white with shadow on scroll.

**Layout:**
- Left: `Crasoft` logo (text + small bolt/route icon)
- Center: links — `Product`, `AI`, `Integrations`, `Pricing`, `Company`
- Right: `Sign in` (ghost button) + `Book a Demo` (primary `UButton`)

**Component:** `UContainer` + flex, height `h-16`.

```
<UButton color="primary" variant="solid" size="md">Book a Demo</UButton>
<UButton color="gray" variant="ghost" size="md">Sign in</UButton>
```

---

### 3.2 Hero Section

**Background:** Dark (`bg-slate-950`) with subtle radial gradient (blue-900 → slate-950) + faint grid pattern overlay (SVG, 1px lines, 8% opacity).

**Layout:** Two-column on desktop, stacked on mobile.

**Left column (text):**

- **Eyebrow** (small, cyan-400, uppercase tracking-wide):
  `AI-NATIVE TMS · BUILT FOR 2026`

- **H1** (text-5xl lg:text-7xl, font-bold, white):
  `Get your fleet to the next level.`

- **Sub** (text-lg lg:text-xl, slate-300, max-w-xl):
  `Crasoft is the truck management system where AI handles the busywork — dispatch, document parsing, driver check-ins, ETA updates — and your team focuses on growth.`

- **CTAs** (flex gap-3):
  - `Book a Demo` — primary, large
  - `Watch 2-min Tour` — ghost with play icon

- **Trust line** below CTAs (text-sm, slate-400):
  `Trusted by carriers running 5–500 trucks · No credit card required`

**Right column (visual):**

A faux product screenshot — build it as an actual styled HTML card, not an image. Suggested:

- Dashboard mockup card with rounded-xl, ring-1 ring-slate-700, shadow-2xl
- Inside: a "Loads" table with 3-4 rows (status pills, MC numbers, route arrows)
- Top-right corner: floating "AI Assistant" chip showing a fake message:
  `"Bekzod, load #4821 — driver is 22 min late. Want me to notify the broker?"`
- Add a glowing dot (cyan, pulsing) next to "Live"

This handcrafted mock signals product depth without needing real screenshots.

---

### 3.3 Trust Strip

Thin section, white background, `py-10`.

**Content:**
Small uppercase label centered: `BUILT FOR MODERN FLEETS`

Below it, a row of 5–6 placeholder logos as text/badges (you can replace later):
`Amazon Freight · Coyote · JB Hunt · Werner · Schneider · CH Robinson`

Render as muted `text-slate-400 font-medium` separated by dots, or as gray-scale pill components.

> Note: Use generic phrasing like "Compatible with major shipper portals" rather than implying endorsements you don't have yet.

---

### 3.4 Core Capabilities — "Everything you need, nothing you don't"

**Section heading (centered):**
- Eyebrow: `THE PLATFORM`
- H2: `One TMS. Every workflow.`
- Sub: `From load creation to driver settlement — Crasoft replaces 6+ tools your dispatchers juggle today.`

**Layout:** 4-card grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`).

Each card: `UCard` with icon (top), title, 2-line description, "Learn more →" link.

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | truck | **Load Management** | Create, dispatch, and track loads with stops, commodities, and financials in one view. |
| 2 | users | **Driver & Fleet** | Manage drivers, trucks, trailers, HOS, and documents. Real-time location via ELD. |
| 3 | building-2 | **Customers & Carriers** | MC/DOT verification, insurance tracking, broker scorecards — automated. |
| 4 | bar-chart-3 | **Analytics & Settlements** | Deadhead %, revenue per mile, on-time rate, driver pay — calculated live. |

Use `lucide-vue-next` icons (Nuxt UI compatible).

---

### 3.5 AI & Automation Showcase — **The differentiator**

This is your money section. Make it bigger and visually distinct.

**Background:** Dark again (`bg-slate-950`) to mirror hero — creates a rhythm.

**Heading:**
- Eyebrow (cyan-400): `AI THAT ACTUALLY WORKS`
- H2 (white): `Most human jobs, automated.`
- Sub (slate-300): `Crasoft's AI agents read documents, talk to drivers, update brokers, and flag exceptions — 24/7. Your team stops being a call center.`

**Layout:** Tabs or alternating rows. Recommend **3 alternating rows** (zig-zag layout):

#### Row 1 — Document AI (image right, text left)
**Title:** `Document parsing, in seconds.`
**Body:** Drop a Rate Confirmation, BOL, or POD — Crasoft extracts shipper, consignee, stops, rates, weights, and reference numbers automatically. PDFs, scans, photos — all handled.
**Tags:** `Rate Cons` · `BOLs` · `PODs` · `Lumper Receipts`
**Visual:** Mock card showing PDF on left, extracted JSON fields appearing on right with checkmarks.

#### Row 2 — AI Dispatcher (image left, text right)
**Title:** `An assistant that actually dispatches.`
**Body:** Ask "What loads are at risk today?" or "Find me a backhaul out of Dallas under 400 miles" — your AI dispatcher answers using your live data, your tenant, your drivers. Tool-calling on a tenant-safe query layer.
**Tags:** `Tool calling` · `Multi-tenant` · `Read + Act`
**Visual:** Chat interface mock with 2-3 message exchanges.

#### Row 3 — Automated Check-Calls (image right, text left)
**Title:** `No more "where's my driver?" calls.`
**Body:** Crasoft auto-pings drivers, parses replies, updates ETAs, and notifies brokers — all without a dispatcher lifting a finger. Voice, SMS, and in-app.
**Tags:** `Auto check-ins` · `Broker updates` · `ETA recalc`
**Visual:** Timeline of automated events on a load.

**Below all three rows — a stats strip:**

```
65%  fewer manual updates
4hrs saved per dispatcher per day
99.2% document parse accuracy
24/7 AI agents on duty
```

Use `grid grid-cols-2 lg:grid-cols-4`, big numbers (`text-4xl`), small labels.

> ⚠️ Adjust those numbers to match what you can actually defend in a sales call. Round-but-honest > impressive-but-fake.

---

### 3.6 Integrations Section

**Heading:**
- Eyebrow: `CONNECTED`
- H2: `Plays well with your existing stack.`
- Sub: `ELDs, load boards, accounting, mapping, communication — Crasoft connects to the tools you already pay for.`

**Layout:** Grid of integration cards or a single "logo cloud" with categories.

**Recommended:** 4 category columns, each with 3-4 logos/names.

| ELD & Telematics | Load Boards | Accounting & Payments | Maps & Routing |
|---|---|---|---|
| EVO ELD | DAT | QuickBooks | HERE Maps |
| Samsara | Truckstop | Bill.com | Google Maps |
| Motive | Sylectus | Comdata | PC*MILER |
| Geotab | — | RTS | — |

**Below the grid:** A line + button:
`Don't see your tool? We have an open API and webhooks. → View Integration Docs`

---

### 3.7 Mobile App Section

**Background:** Light gradient — `bg-gradient-to-br from-slate-50 to-blue-50`.

**Layout:** Two-column. Left: text. Right: a styled phone mockup.

**Left:**
- Eyebrow: `FOR DRIVERS`
- H2: `The driver app drivers actually open.`
- Body: `Built for the cab — not the office. Drivers see their next stop, sign PODs, scan documents, log HOS, and chat with dispatch in one app. Works offline.`
- Feature checklist (3–4 items with checkmark icons):
  - Stop-by-stop navigation with live ETAs
  - One-tap document scan & upload
  - HOS-aware dispatch suggestions
  - Push notifications + voice replies
- Buttons: `App Store` / `Google Play` placeholder badges

**Right:** Build a phone frame (rounded-[3rem], dark border, w-72) with a fake "Next Stop" screen inside — load card, address, ETA, big "Arrived" button.

---

### 3.8 Why Crasoft — Comparison

**Heading:**
- Eyebrow: `WHY CRASOFT`
- H2: `Old TMS vs. Crasoft.`
- Sub: `If your TMS still feels like a 2010 spreadsheet with a login, you're losing margin every week.`

**Layout:** Two-column comparison table.

| Legacy TMS | Crasoft |
|---|---|
| Manual data entry from rate cons | AI parses every document |
| Dispatcher calls every driver hourly | Automated check-ins, exceptions only |
| Reports are static and weekly | Live metrics: deadhead, RPM, on-time |
| Integrations cost extra and take months | API-first, integrations in days |
| One-size-fits-all UI | Multi-tenant, customizable per company |
| Mobile app is an afterthought | Driver-first design |

Render with two `UCard` components side by side, left muted/gray, right brand-colored with subtle glow.

---

### 3.9 Final CTA Section

**Background:** Solid primary (`bg-blue-700`) or gradient (`from-blue-700 to-indigo-700`).

**Layout:** Centered, max-w-3xl.

**Content:**
- H2 (white, text-4xl lg:text-5xl): `Ready to run your fleet on autopilot?`
- Sub (blue-100, text-lg): `See Crasoft on a 30-minute call. We'll import a sample load, run it through the AI, and show you exactly where it fits in your operation.`
- Form (inline on desktop, stacked mobile):
  - Email input (`UInput`, large)
  - `Book a Demo` button (white bg, blue text)
- Below form: `No credit card · No long calls · Live demo with a real engineer`

---

### 3.10 Footer

**Background:** `bg-slate-950`, white text, `py-16`.

**Layout:** 4 columns + bottom bar.

| Product | Company | Resources | Legal |
|---|---|---|---|
| Features | About | Documentation | Privacy |
| AI & Automation | Careers | API Reference | Terms |
| Integrations | Contact | Changelog | Security |
| Mobile App | Blog | Status | DPA |

**Bottom bar:**
- Left: `© 2026 Crasoft INC. All rights reserved.`
- Right: small social icons (X, LinkedIn, GitHub)

Above the columns, a brief brand block (logo + 1 line):
`Crasoft INC — The AI-native TMS for modern fleets.`

---

## 4. Component & File Structure

Suggested Nuxt 4 file layout:

```
pages/
  index.vue                  ← assembles all sections

components/
  landing/
    TheNavbar.vue
    HeroSection.vue
    TrustStrip.vue
    CapabilitiesGrid.vue
    AiShowcase.vue
    AiShowcaseRow.vue        ← reusable for the 3 zig-zag rows
    StatsStrip.vue
    IntegrationsGrid.vue
    MobileAppSection.vue
    ComparisonTable.vue
    FinalCta.vue
    TheFooter.vue
  mocks/
    DashboardMock.vue        ← faux product screenshot in hero
    DocumentParseMock.vue
    AiChatMock.vue
    CheckCallTimelineMock.vue
    PhoneMock.vue
```

Keep all section components **self-contained** — easier to reorder later.

---

## 5. Animation & Polish

Keep it tasteful — not a cartoon.

- **Hero:** subtle fade-up on load (use `@vueuse/motion` or simple Tailwind `animate-in`)
- **Stats strip:** count-up animation when scrolled into view
- **AI showcase rows:** fade-in with slight x-offset on intersection
- **Cards:** `hover:shadow-xl hover:-translate-y-0.5 transition`
- **Pulsing "live" dot:** Tailwind `animate-pulse` on a small `bg-cyan-400 rounded-full`

Library suggestion: `@vueuse/motion` — works well with Nuxt 4.

---

## 6. SEO & Meta

In `pages/index.vue`:

```ts
useSeoMeta({
  title: 'Crasoft INC — AI-Native Truck Management System',
  description: 'Get your fleet to the next level. Crasoft is the TMS where AI handles dispatch, documents, and check-calls — so your team focuses on growth.',
  ogTitle: 'Crasoft INC — Modern AI TMS for Fleets',
  ogDescription: 'AI-native TMS. Automated dispatch, document parsing, driver check-ins. Built for modern carriers.',
  ogImage: '/og-cover.png',
  twitterCard: 'summary_large_image'
})
```

---

## 7. Responsive Breakpoints

- Mobile-first. Test at: 375px, 768px, 1024px, 1440px.
- Hero: stack columns under `lg`, hide the dashboard mock under `md` (optional — or shrink it).
- Capabilities grid: 1 col → 2 → 4
- AI showcase rows: stack vertically under `lg`, alternating order disabled (always image-on-top)
- Stats strip: 2 cols mobile, 4 cols desktop

---

## 8. Build Order (Recommended)

1. Set up `app.config.ts` with brand colors + Nuxt UI primary
2. Build `TheNavbar` + `TheFooter` (skeleton scaffolding)
3. Build `HeroSection` with `DashboardMock` — this sets the design tone
4. Build `CapabilitiesGrid` (easy win, 4 cards)
5. Build `AiShowcase` + the 3 rows + `StatsStrip` (biggest payoff section)
6. Fill in `IntegrationsGrid`, `MobileAppSection`, `ComparisonTable`
7. Build `FinalCta` + polish
8. Add animations last
9. SEO meta + favicon + OG image

---

## 9. Copy Reference Sheet (Quick-grab)

**Primary tagline:** Get your fleet to the next level.
**Sub-tagline:** The TMS that thinks, acts, and scales with you — so your team doesn't have to.

**Section H2s:**
- One TMS. Every workflow.
- Most human jobs, automated.
- Plays well with your existing stack.
- The driver app drivers actually open.
- Old TMS vs. Crasoft.
- Ready to run your fleet on autopilot?

**Reusable phrases:**
- "AI-native, not AI-bolted-on"
- "Built for the cab, not the office"
- "Stop being a call center. Start being a carrier."
- "Multi-tenant by design"
- "API-first, integration-ready"

---

## 10. What NOT to Do

- ❌ Don't use stock images of trucks on highways at sunset — every TMS site does this. Use product mocks instead.
- ❌ Don't list every feature you have. Pick 4 pillars + AI as the hero.
- ❌ Don't put pricing on the page yet unless you've validated tiers — use "Book a Demo" as the universal CTA.
- ❌ Don't oversell automation %. "Most" / "many" is more credible than "100%".
- ❌ Don't skip the comparison section — it's where prospects mentally commit.

---

**End of spec.** Build top-to-bottom in the order above. Ship the hero + capabilities + AI showcase first as a v1, then layer the rest.

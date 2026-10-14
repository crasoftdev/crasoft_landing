import Image, { type StaticImageData } from "next/image";
import relaySyncLoads from "@/public/products/relay-tms-sync/relay-sync-loads.png";
import tfsignDashboard from "@/public/products/tfsign/tfsign-dashboard.png";
import { getProduct, navigationStores, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { buttonClass, container, eyebrow, h2, lead } from "@/components/ui/styles";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { DemoControls, Timeline } from "@/components/demos/Timeline";
import { FitScale } from "@/components/demos/FitScale";
import { StepList } from "@/components/demos/parts";
import { TMS_LOOP, TMS_SIZE, TmsDemo } from "@/components/demos/TmsDemo";
import { DRIVER_LOOP, DRIVER_SIZE, DriverAppDemo } from "@/components/demos/DriverAppDemo";
import { NAV_OVERVIEW_SIZE, NavigationOverview } from "@/components/demos/NavigationOverview";

// Copy from the Claude Design (Crasoft Home.dc.html and the two demo files).

const TMS_STEPS = [
  { title: "See every truck on the map", line: "Driver, trailer and delivery in one tap", t: 0, e: 4300 },
  { title: "AI finds the next load", line: "It searches load boards and ranks the best ones", t: 4300, e: 8800 },
  { title: "Book it in one click", line: "The load is created and sent to the driver", t: 8800, e: 13000 },
  { title: "See what you earn and keep", line: "Income, expenses and profit in one view", t: 13000 },
];

const DRIVER_STEPS = [
  { title: "New loads arrive by themselves", line: "Assigned in TMS, on the phone in seconds", t: 0, e: 5200 },
  { title: "Truck-safe navigation", line: "Routes that fit the truck’s height and weight", t: 5200, e: 11000 },
  { title: "Chat with dispatch", line: "Every message stays with the load", t: 11000, e: 16200 },
  { title: "Call in one tap", line: "No searching for phone numbers", t: 16200, e: 19400 },
  { title: "See every paycheck", line: "Earnings by load and by week", t: 19400 },
];

// The smaller products, as cards under the two demos.
const CARD_PRODUCTS = [getProduct("tfone-navigation"), getProduct("tfsign"), getProduct("relay-tms-sync")];

// Screenshots for the cards without a live demo, 4:3 at ~1300px wide.
const CARD_IMAGES: Partial<Record<Product["slug"], { src: StaticImageData; alt: string }>> = {
  tfsign: { src: tfsignDashboard, alt: "TFSign dashboard with documents waiting for signature" },
  "relay-tms-sync": { src: relaySyncLoads, alt: "Relay TMS Sync's Sync loads button on the Relay Trips page, with its week menu open" },
};

const tagline = "font-display text-[clamp(30px,3.4vw,46px)] leading-[1.05] font-semibold tracking-[-0.025em] text-balance";

export function Products() {
  const tms = getProduct("tfone-tms");
  const driver = getProduct("tfone-driver-app");

  return (
    <section id="products" aria-labelledby="products-heading" className={cn(container, "pt-28 pb-10 lg:pt-[120px]")}>
      <div className="reveal grid items-end gap-x-16 gap-y-6 lg:grid-cols-2">
        <div>
          <p className={eyebrow}>Our products</p>
          <h2 id="products-heading" className={cn(h2, "mt-4")}>
            Products we build and run ourselves.
          </h2>
        </div>
        <p className={lead}>
          Our first product family is TFONE, made for trucking companies in the US. More product lines are on the
          way.
        </p>
      </div>

      <div className="reveal mt-16 flex flex-wrap items-center gap-4">
        <span className="font-display text-2xl font-semibold">TFONE</span>
        <span className="text-[15px] text-muted">Software for trucking companies</span>
        <span aria-hidden="true" className="h-px min-w-10 flex-1 bg-ring" />
      </div>

      {/* TFONE TMS */}
      <Timeline loop={TMS_LOOP} className="mt-10 grid items-center gap-10 lg:grid-cols-[330px_minmax(0,1fr)] lg:gap-14">
        <article aria-labelledby="tms-name">
          <h3 id="tms-name" className={eyebrow}>
            {tms.name}
          </h3>
          <p className={cn(tagline, "mt-4")}>Let AI handle the repetitive work.</p>
          <p className="mt-[18px] text-[17px] leading-[1.6] text-pretty text-muted">
            {tms.name} finds loads, plans trips and keeps every truck in view. Your team stops doing the same tasks
            over and over, and spends its time on work that grows the business.
          </p>
          <StepList steps={TMS_STEPS} className="mt-8" />
          <VisitWebsite product={tms} className="mt-8" />
        </article>
        <div className="min-w-0">
          <FitScale {...TMS_SIZE} className="mx-auto">
            <TmsDemo />
          </FitScale>
          <DemoControls name={tms.name} className="mt-4 justify-end" />
        </div>
      </Timeline>

      {/* TFONE Driver App */}
      <Timeline loop={DRIVER_LOOP} className="mt-24 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
        <article aria-labelledby="driver-name" className="lg:order-last">
          <h3 id="driver-name" className={eyebrow}>
            {driver.name}
          </h3>
          <p className={cn(tagline, "mt-4")}>Everything a driver needs, in one app.</p>
          <p className="mt-[18px] text-[17px] leading-[1.6] text-pretty text-muted">
            Connected to TFONE TMS. Drivers get their loads automatically, drive with truck-safe navigation, talk to
            dispatch and see what they earned, all from the road.
          </p>
          <StepList steps={DRIVER_STEPS} className="mt-7" />
          <VisitWebsite product={driver} className="mt-8" />
        </article>
        <div className="relative flex min-w-0 flex-col items-center py-5">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 aspect-square w-[min(620px,100%)] -translate-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-light)_35%,transparent)_0%,transparent_68%)]"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 aspect-square w-[min(520px,95%)] -translate-1/2 rounded-full border border-ring"
          />
          <FitScale {...DRIVER_SIZE}>
            <DriverAppDemo />
          </FitScale>
          <DemoControls name={driver.name} className="relative mt-6" />
        </div>
      </Timeline>

      <div className="reveal mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CARD_PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}

function VisitWebsite({ product, className }: { product: Product; className?: string }) {
  if (!product.url) return null;
  return (
    <ExternalLink href={product.url} className={buttonClass("solid", className)}>
      Visit the {product.name} website
    </ExternalLink>
  );
}

function ProductCard({ product }: { product: Product }) {
  const stores = product.slug === "tfone-navigation" ? navigationStores.filter((s) => s.href) : [];
  const image = CARD_IMAGES[product.slug];
  return (
    <article aria-labelledby={`${product.slug}-name`} className="flex flex-col rounded-3xl border border-line bg-card p-6">
      {product.slug === "tfone-navigation" ? (
        <FitScale {...NAV_OVERVIEW_SIZE} className="overflow-hidden rounded-[14px]">
          <NavigationOverview />
        </FitScale>
      ) : (
        image && (
          <Image
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 1024px) 322px, (min-width: 768px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-[14px] border border-line object-cover object-top"
          />
        )
      )}
      <p className="mt-5 text-[13px] font-semibold text-brand-strong">{product.kind}</p>
      <h3 id={`${product.slug}-name`} className="mt-2 font-display text-[22px] font-semibold">
        {product.name}
      </h3>
      <p className="mt-2.5 leading-[1.55] text-muted">{product.line}</p>
      {(stores.length > 0 || product.url) && (
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {stores.map((store) => (
            <ExternalLink
              key={store.label}
              href={store.href!}
              className="rounded-[10px] bg-ink px-3.5 py-2.5 text-[13px] font-semibold text-surface transition-colors hover:bg-brand-strong"
            >
              {store.label}
            </ExternalLink>
          ))}
          {product.url && (
            <ExternalLink href={product.url} className={buttonClass("outline", "px-4 py-2 text-[13px]")}>
              Visit website
            </ExternalLink>
          )}
        </div>
      )}
    </article>
  );
}

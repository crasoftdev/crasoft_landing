import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { RefreshCw, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// The "product family" orbit from the Claude Design (Hero Animation Options, 1b).
// The Crasoft gear sits in the center and the products circle it. Hovering or
// focusing a product pauses the orbit and shows its line. Pure CSS, so this stays
// a Server Component and every name and line is in the HTML.

type OrbitItem = {
  id: string;
  label: string; // pill text
  title: string; // tooltip heading: the full product name
  line: string; // tooltip text
  // What sits in the pill's tile: a product logo, or a glyph when there is none.
  icon?: string;
  glyph?: LucideIcon;
  featured?: boolean;
  upcoming?: boolean; // dashed outline: not released yet
};

// Every tile is the same light square, so logos need a transparent background.
// TODO(content): a transparent TFONE Navigation logo; until then it uses the TFONE
// logo (its own icon is drawn on a dark background).
const TFONE_ICON = "/tfone_logo_icon.png";

// Outer ring: the main TFONE products.
const OUTER: OrbitItem[] = [
  {
    id: "tms",
    icon: TFONE_ICON,
    label: "TFONE TMS",
    title: "TFONE TMS",
    line: "One place to manage loads, dispatch, drivers, trucks, billing and documents.",
    featured: true,
  },
  {
    id: "driver",
    icon: TFONE_ICON,
    label: "Driver App",
    title: "TFONE Driver App",
    line: "Drivers see loads, update status and send documents from the road.",
  },
  {
    id: "nav",
    icon: TFONE_ICON,
    label: "Navigation",
    title: "TFONE Navigation",
    line: "Routes planned for your truck’s height and size.",
  },
];

// Inner ring: the add-ons, and the next product.
const INNER: OrbitItem[] = [
  {
    id: "sign",
    icon: TFONE_ICON,
    label: "TFSign",
    title: "TFSign",
    line: "Sign documents online, without printing or scanning.",
  },
  {
    id: "relay",
    glyph: RefreshCw,
    label: "Relay TMS Sync",
    title: "Relay TMS Sync",
    line: "A Chrome extension that syncs loads from Relay into TFONE TMS.",
  },
  {
    id: "next",
    glyph: Sparkles,
    label: "Next product",
    title: "Next product",
    line: "Our next product is in the works.",
    upcoming: true,
  },
];

// One full turn, in ms. Slow on purpose: the orbit is atmosphere, not a show.
const SPEED = {
  dashed: 120_000,
  outerDot: 26_000,
  innerDot: 18_000,
  gear: 40_000,
  // Both product rings share one speed and direction, so pills never collide.
  products: 70_000,
};

const dur = (ms: number) => ({ "--orbit-dur": `${ms}ms` }) as CSSProperties;

// Places items evenly on a ring, starting at `startDeg` (0° = 3 o'clock, clockwise).
function placeOnRing(count: number, startDeg: number) {
  return Array.from({ length: count }, (_, i) => {
    const rad = ((startDeg + (360 / count) * i) * Math.PI) / 180;
    const pct = (v: number) => `${(50 + 50 * v).toFixed(2)}%`;
    return { left: pct(Math.cos(rad)), top: pct(Math.sin(rad)) };
  });
}

function Ring({
  items,
  startDeg,
  inner = false,
  className,
}: {
  items: OrbitItem[];
  startDeg: number;
  inner?: boolean;
  className: string;
}) {
  const spots = placeOnRing(items.length, startDeg);
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-[2] has-[a:hover]:z-10 has-[a:focus-visible]:z-10",
        "orbit-spin",
        className,
      )}
      style={dur(SPEED.products)}
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          className="absolute z-[2] w-max -translate-x-1/2 -translate-y-1/2 has-[a:hover]:z-10 has-[a:focus-visible]:z-10"
          style={spots[i]}
        >
          {/* Turns against the ring so the pill stays upright. Inner pills sit a
              little smaller, so the two rings read as near and far. */}
          <div className={cn("orbit-rev", inner && "scale-[0.92]")} style={dur(SPEED.products)}>
            <OrbitPill item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}

function OrbitTile({ item }: { item: OrbitItem }) {
  const Glyph = item.glyph;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-[8px] border sm:size-8 sm:rounded-[10px]",
        item.upcoming ? "border-dashed border-line-strong bg-transparent" : "border-line bg-card",
      )}
    >
      {item.icon ? (
        <Image
          src={item.icon}
          alt=""
          width={32}
          height={32}
          className="size-[90%] object-contain"
        />
      ) : (
        Glyph && <Glyph className="size-3.5 text-brand-strong sm:size-4" strokeWidth={2} />
      )}
    </span>
  );
}

function OrbitPill({ item }: { item: OrbitItem }) {
  const tipId = `orbit-tip-${item.id}`;
  return (
    <div className="group relative">
      <Link
        href="/#products"
        aria-describedby={tipId}
        className={cn(
          "orbit-pill pointer-events-auto flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 whitespace-nowrap shadow-[0_10px_30px_-16px_rgb(42_42_34/0.3)] backdrop-blur-sm transition-[scale,border-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] sm:gap-2.5 sm:py-1.5 sm:pr-4 sm:pl-1.5",
          "hover:scale-[1.06] hover:border-brand-light hover:shadow-[0_20px_40px_-18px_rgb(124_95_69/0.5)]",
          "focus-visible:scale-[1.06] focus-visible:border-brand-light",
          item.featured && "border-brand-light bg-card ring-4 ring-brand/10",
          item.upcoming && "border-dashed border-line-strong bg-card/60 text-muted",
          !item.featured && !item.upcoming && "border-ring bg-card/90",
        )}
      >
        <OrbitTile item={item} />
        <span className="font-display text-[13px] font-semibold sm:text-[15px]">{item.label}</span>
      </Link>
      <div
        id={tipId}
        role="tooltip"
        className="pointer-events-none invisible absolute top-[calc(100%+10px)] left-1/2 z-10 w-56 -translate-x-1/2 rounded-[14px] border border-ring bg-card px-3.5 py-3 text-left opacity-0 shadow-[0_20px_40px_-16px_rgb(42_42_34/0.35)] transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100 group-has-[a:focus-visible]:visible group-has-[a:focus-visible]:opacity-100"
      >
        <span className="block text-xs font-semibold text-brand-strong">{item.title}</span>
        <span className="mt-1 block text-sm leading-[1.45] whitespace-normal text-ink">
          {item.line}
        </span>
      </div>
    </div>
  );
}

export function HeroOrbit({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "orbit relative aspect-square w-[min(540px,calc(100vw-110px))] lg:w-[min(540px,100%)]",
        className,
      )}
    >
      {/* Rings and moving dots: decoration only. */}
      <div aria-hidden="true">
        {/* The outer rings fade toward the bottom, so the orbit sits in the page
            instead of on it. */}
        <div className="absolute inset-[-6%] [mask-image:linear-gradient(to_bottom,#000_35%,rgb(0_0_0/0.2))]">
          <div className="absolute inset-[5.36%] rounded-full border border-ring" />
          <div
            className="orbit-spin absolute inset-0 rounded-full border border-dashed border-line-strong/60"
            style={dur(SPEED.dashed)}
          />
        </div>
        <div className="absolute inset-[19%] rounded-full border border-ring/80" />
        <div className="orbit-spin absolute inset-0" style={dur(SPEED.outerDot)}>
          <span className="absolute top-full left-1/2 -mt-[4px] -ml-[4px] size-2 rounded-full bg-brand/80" />
        </div>
        <div className="orbit-rev absolute inset-[19%]" style={dur(SPEED.innerDot)}>
          <span className="absolute top-1/2 left-full -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-brand-light" />
        </div>
        <div className="orbit-halo absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 w-[44%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand)_18%,transparent)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 flex aspect-square w-[28%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ring bg-card shadow-[0_24px_60px_-24px_rgb(151_120_92/0.5),inset_0_-6px_16px_-10px_rgb(151_120_92/0.25)]">
          <Image
            src="/logo_icon.svg"
            alt=""
            width={96}
            height={96}
            className="orbit-spin size-[64%]"
            style={dur(SPEED.gear)}
          />
        </div>
      </div>

      {/* Inner pills sit between the outer ones (offset by 60°). */}
      <Ring items={OUTER} startDeg={-90} className="inset-0" />
      <Ring items={INNER} startDeg={90} inner className="inset-[19%]" />
    </div>
  );
}

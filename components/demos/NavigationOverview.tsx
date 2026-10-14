import { CarFront, Fuel, Scale, Sofa, Truck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/components/demos/routes";
import { fitProjection, splitRoute, toPath } from "@/components/demos/map";
import { FuelPin, Pin, type FuelBrand } from "@/components/demos/parts";

// A still of TFONE Navigation for its product card: the whole Atlanta → Charlotte
// route seen from high up, with a weigh station and fuel stops along it. Static,
// server-rendered markup with no animation. Fake data only.

export const NAV_OVERVIEW_SIZE = { width: 360, height: 270 };

const { width: W, height: H } = NAV_OVERVIEW_SIZE;
const project = fitProjection(ROUTES.next, { left: 34, top: 70, right: W - 52, bottom: H - 30 });
const route = ROUTES.next.map(project);
const along = (f: number) => project(splitRoute(ROUTES.next, f).at);

const WEIGH_STATIONS = [0.05].map(along);
const FUEL_STOPS: { brand: FuelBrand; f: number; price: string; low?: boolean }[] = [
  { brand: "pilot", f: 0.22, price: "3.89" },
  { brand: "fuel", f: 0.405, price: "3.79", low: true },
  { brand: "loves", f: 0.595, price: "3.92" },
  { brand: "ta", f: 0.8, price: "3.95" },
];

// Faint roads around the route, for a sense of the map.
const ROADS = [
  "M0 230 C80 218 150 230 230 204 S330 182 360 172",
  "M18 270 C54 206 62 144 108 64",
  "M270 270 C270 206 296 144 360 108",
  "M0 108 C72 117 144 99 216 64 S306 28 360 36",
];

// The filter row, scrolled as in the app so both active filters show.
const FILTERS: { name: string; Icon: LucideIcon; on?: boolean }[] = [
  { name: "Weigh stations", Icon: Scale, on: true },
  { name: "Truck stops", Icon: Truck },
  { name: "Rest areas", Icon: Sofa },
  { name: "Fuel", Icon: Fuel, on: true },
  { name: "Wash", Icon: CarFront },
];

const chip = "flex h-[26px] flex-none items-center gap-1 rounded-full border px-2.5";

export function NavigationOverview() {
  const end = route.at(-1)!;
  return (
    <div
      role="img"
      aria-label="TFONE Navigation map: a truck route from Atlanta to Charlotte, with fuel stations, their diesel prices and a weigh station along the way."
      data-nosnippet=""
      className="relative overflow-hidden bg-tf-map font-sans text-tf-text"
      style={{ width: W, height: H }}
    >
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {ROADS.map((d) => (
          <path key={d} d={d} className="stroke-tf-road" strokeWidth="3" />
        ))}
        <path d={toPath(route)} className="stroke-tf-blue-line" strokeWidth="9" />
        <path d={toPath(route)} className="stroke-tf-blue-strong" strokeWidth="5" />
      </svg>

      {/* Start: the truck */}
      <span
        className="absolute size-3.5 -translate-1/2 rounded-full border-[3px] border-card bg-tf-blue-strong shadow-[0_0_0_6px_rgb(59_130_246/0.25)]"
        style={{ left: route[0][0], top: route[0][1] }}
      />
      <span className="absolute text-[10px] font-semibold text-tf-dim" style={{ left: route[0][0] - 20, top: route[0][1] + 10 }}>
        Atlanta
      </span>

      {/* End: Charlotte */}
      <span
        className="absolute -mt-[22px] -ml-[11px] flex size-[22px] -rotate-45 items-center justify-center rounded-[50%_50%_50%_0] border-2 border-card bg-tf-blue-strong"
        style={{ left: end[0], top: end[1] }}
      >
        <span className="size-1.5 rounded-full bg-card" />
      </span>
      <span className="absolute text-[10px] font-semibold text-tf-dim" style={{ left: end[0] - 22, top: end[1] + 6 }}>
        Charlotte
      </span>

      {WEIGH_STATIONS.map((at, i) => (
        <Pin key={i} at={at} tone="bg-tf-orange" tag={<span className="text-tf-green">Open</span>}>
          <Scale className="size-3.5" />
        </Pin>
      ))}
      {FUEL_STOPS.map((stop) => (
        <FuelPin key={stop.price} at={along(stop.f)} brand={stop.brand} price={stop.price} low={stop.low} />
      ))}

      <div className="absolute top-2.5 -left-[61px] flex gap-1.5 text-[11px] font-semibold whitespace-nowrap">
        {FILTERS.map(({ name, Icon, on }) => (
          <span key={name} className={cn(chip, on ? "border-tf-go bg-tf-go text-card" : "border-tf-line-strong bg-tf-raised")}>
            <Icon className="size-3" />
            {name}
          </span>
        ))}
      </div>

    </div>
  );
}

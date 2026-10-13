import type { ReactNode } from "react";
import Image from "next/image";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES, type LatLng } from "@/components/demos/routes";
import { fitProjection, heading, px, splitRoute, toPath, type Point } from "@/components/demos/map";
import { Arrow, Click, Cursor, Curtain, Pill, TFONE_ICON } from "@/components/demos/parts";

// The TFONE TMS window from the Claude Design ("TFONE TMS Demo.html"), as static
// markup that <Timeline loop={TMS_LOOP}> plays. Fake data only. Two scenes:
//   0–13s   live map: pick truck 196, AI finds the next load, book it
//   13–22s  accounting report
// The map is drawn as SVG on the server (no map tiles, no map library).

export const TMS_LOOP = 22_000;
export const TMS_SIZE = { width: 942, height: 666 }; // window incl. 1px border

const MAP = { width: 940, height: 564 }; // below the app's 56px top bar

const TRUCKS = [
  { id: "196", key: "t196", f: 0.86, main: true },
  { id: "204", key: "t204", f: 0.5 },
  { id: "211", key: "t211", f: 0.45 },
  { id: "188", key: "t188", f: 0.6 },
  { id: "173", key: "t173", f: 0.4 },
  { id: "169", key: "t169", f: 0.7 },
] as const;

// Faint city names, so the stylized map reads as the US South.
const CITIES: { name: string; at: LatLng }[] = [
  { name: "St. Louis", at: ROUTES.t204[0] },
  { name: "Memphis", at: ROUTES.t204.at(-1)! },
  { name: "Houston", at: ROUTES.t211[0] },
  { name: "New Orleans", at: ROUTES.t211.at(-1)! },
  { name: "Oklahoma City", at: ROUTES.t188[0] },
  { name: "Little Rock", at: ROUTES.t188.at(-1)! },
  { name: "Nashville", at: ROUTES.t173[0] },
  { name: "Austin", at: ROUTES.t169[0] },
];

// Fit every route into the part of the map left of the drawer.
const project = fitProjection([...TRUCKS.flatMap((t) => ROUTES[t.key]), ...ROUTES.next], {
  left: 50,
  top: 80,
  right: MAP.width - 470,
  bottom: MAP.height - 40,
});
const path = (points: LatLng[]) => toPath(points.map(project));

const trucks = TRUCKS.map((truck) => {
  const split = splitRoute(ROUTES[truck.key], truck.f);
  const at = project(split.at);
  return { ...truck, split, at, deg: heading(at, project(split.ahead)) };
});
const mainTruck = trucks[0];

const NAV = ["Home", "Dispatch", "Fleet", "Safety", "Accounting", "HR", "Settings"];

const LOADS = [
  { route: "Atlanta, GA → Charlotte, NC", rate: "$1,180", board: "DAT", color: "text-tf-blue", meta: "245 mi · Today 4 PM", best: true, t: 7200 },
  { route: "Atlanta, GA → Jacksonville, FL", rate: "$1,420", board: "TRUCKSTOP", color: "text-tf-orange", meta: "346 mi · Tomorrow 8 AM", side: "$4.10/mi", t: 7350 },
  { route: "Atlanta, GA → Nashville, TN", rate: "$940", board: "123LOADBOARD", color: "text-brand-light", meta: "250 mi · Tomorrow 10 AM", side: "$3.76/mi", t: 7500 },
];

const AI_CHECKS = [
  { label: "Checking DAT, Truckstop, 123Loadboard", t: 4800, done: 5600 },
  { label: "Matching trailer and driver hours", t: 5500, done: 6200 },
  { label: "Ranking by rate per mile", t: 6100, done: 6800 },
];

const KPIS = [
  { label: "Income", to: 1.84, dec: 2, pre: "$", suf: "M", change: "+32%", tone: "g", t: 13300 },
  { label: "Expenses", to: 1.31, dec: 2, pre: "$", suf: "M", change: "+21%", tone: "n", t: 13450 },
  { label: "Net profit", to: 530, pre: "$", suf: "k", change: "+68%", tone: "g", t: 13600, green: true },
  { label: "Profit margin", to: 29, suf: "%", change: "+6 pts", tone: "g", t: 13750 },
] as const;

// Income and expenses by month, as bar heights in the 240-high chart.
const MONTHS = [
  ["Jan", 94.4, 70.9],
  ["Feb", 105.1, 76.6],
  ["Mar", 100.7, 74.1],
  ["Apr", 117.2, 84.2],
  ["May", 126.0, 89.3],
  ["Jun", 135.5, 95.6],
  ["Jul", 147.6, 103.2],
  ["Aug", 160.2, 110.8],
  ["Sep", 178.6, 124.8],
] as const;

const SPEND = [
  { label: "Driver pay", amount: "$612k", share: "47%", width: 100, color: "bg-tf-green" },
  { label: "Fuel", amount: "$384k", share: "29%", width: 62.7, color: "bg-tf-blue" },
  { label: "Truck payments", amount: "$148k", share: "11%", width: 24.2, color: "bg-brand-light" },
  { label: "Repairs and maintenance", amount: "$72k", share: "5%", width: 11.8, color: "bg-tf-orange" },
  { label: "Insurance", amount: "$58k", share: "4%", width: 9.5, color: "bg-tf-purple" },
  { label: "Tolls and other", amount: "$36k", share: "3%", width: 5.9, color: "bg-tf-faint" },
];

const card = "rounded-xl border border-tf-line bg-tf-panel";

export function TmsDemo() {
  return (
    <div
      role="img"
      aria-label="Animated demo of TFONE TMS: a dispatcher picks a truck on the live map, AI finds and books its next load, then the accounting report shows income, expenses and profit."
      data-nosnippet=""
      className="overflow-hidden rounded-[14px] border border-tf-line-strong bg-tf-bg font-sans shadow-[0_40px_80px_-40px_rgb(42_42_34/0.55)]"
      style={{ width: TMS_SIZE.width, height: TMS_SIZE.height }}
    >
      {/* Browser bar */}
      <div className="flex h-11 items-center gap-2 border-b border-tf-line-strong bg-tf-raised px-4">
        <span className="size-[11px] rounded-full bg-tf-dot-red" />
        <span className="size-[11px] rounded-full bg-tf-dot-yellow" />
        <span className="size-[11px] rounded-full bg-tf-dot-green" />
        <div className="ml-6 grid h-7 max-w-[460px] flex-1 items-center rounded-full bg-tf-line-strong px-3.5 text-[13px] text-tf-soft *:[grid-area:1/1]">
          <span data-a="fade" data-t="0" data-e="13000">app.thetfone.com/dispatch/map</span>
          <span data-a="fade" data-t="13000">app.thetfone.com/accounting/reports</span>
        </div>
      </div>

      <div data-stage="" className="relative h-[620px] overflow-hidden text-tf-text">
        {/* App top bar */}
        <div className="relative z-[4] flex h-14 items-center justify-between border-b border-tf-line bg-tf-bg px-[22px]">
          <span className="text-lg font-bold">
            <span className="text-tf-blue">TF</span>ONE
          </span>
          <div className="flex gap-1 text-[13px]">
            {NAV.map((item) => (
              <span key={item} className="relative flex items-center gap-1 rounded-lg px-3 py-[7px] text-tf-soft">
                {item}
                {item !== "Home" && <ChevronDown className="size-3" />}
                {(item === "Dispatch" || item === "Accounting") && (
                  <span
                    data-a="fade"
                    data-t={item === "Dispatch" ? "0" : "13000"}
                    data-e={item === "Dispatch" ? "13000" : undefined}
                    className="absolute inset-0 flex items-center gap-1 rounded-lg bg-tf-green-bg px-3 py-[7px] text-tf-green"
                  >
                    {item}
                    <ChevronDown className="size-3" />
                  </span>
                )}
              </span>
            ))}
          </div>
          <span className="flex size-[30px] items-center justify-center rounded-full bg-tf-go text-[13px] font-semibold text-card">
            B
          </span>
        </div>

        <MapScene />
        <ReportScene />

        <Click t={1900} at="truck" />
        <Click t={4300} at="find" />
        <Click t={8800} at="opt1" />
        <Cursor
          end={9700}
          path="800:360,470;1800:@truck;2300:@truck;3000:560,300;4200:@find;4800:@find;7600:@opt1:-60,140;8700:@opt1;9300:@opt1"
        />
        <Curtain className="bg-tf-bg" />
      </div>
    </div>
  );
}

function MapScene() {
  return (
    <div data-a="fade" data-t="0" data-e="13000" className="absolute inset-x-0 top-14 bottom-0 bg-tf-map">
      <svg
        width={MAP.width}
        height={MAP.height}
        viewBox={`0 0 ${MAP.width} ${MAP.height}`}
        className="absolute inset-0"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <pattern id="tms-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" className="stroke-tf-raised" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={MAP.width} height={MAP.height} fill="url(#tms-grid)" />
        {/* Every route as a faint road. */}
        {[...trucks.map((t) => ROUTES[t.key]), ROUTES.next].map((points, i) => (
          <path key={i} d={path(points)} className="stroke-tf-road" strokeWidth="6" />
        ))}
        {/* Truck 196: driven part, then the rest of the way to Atlanta. */}
        <path data-a="draw" data-t="2100" data-d="500" d={path(mainTruck.split.done)} className="stroke-tf-done" strokeWidth="4" />
        <path data-a="draw" data-t="2500" data-d="600" d={path(mainTruck.split.rest)} className="stroke-tf-green" strokeWidth="5" />
        {/* The load AI books next. */}
        <path data-a="draw" data-t="11300" data-d="900" d={path(ROUTES.next)} className="stroke-tf-blue" strokeWidth="5" />
      </svg>

      {CITIES.map((city) => (
        <span
          key={city.name}
          className="absolute flex -translate-x-1 -translate-y-1 items-center gap-1.5 text-[11px] text-tf-faint"
          style={px(project(city.at))}
        >
          <span className="size-2 rounded-full border border-tf-done bg-tf-map" />
          {city.name}
        </span>
      ))}

      <MapPin label="Pickup" place="Dallas, TX" at={project(ROUTES.t196[0])} tone="faint" t={2100} />
      <MapPin label="Delivery" place="Atlanta, GA" at={project(ROUTES.t196.at(-1)!)} tone="green" t={2800} />
      <MapPin label="Next delivery" place="Charlotte, NC" at={project(ROUTES.next.at(-1)!)} tone="blue" t={12000} />

      {trucks.map((truck, i) => (
        <TruckMarker key={truck.id} truck={truck} index={i} />
      ))}

      <div className="absolute top-4 left-4 z-10 flex gap-2 text-[13px]">
        <span className={cn(card, "px-3.5 py-[9px] font-semibold")}>Live map</span>
        <span className={cn(card, "px-3.5 py-[9px] text-tf-soft")}>
          <span className="text-tf-green">●</span> 6 trucks moving
        </span>
      </div>

      <Drawer />
      <BookedDialog />
    </div>
  );
}

// Pickup is a hollow ring; deliveries are filled squares.
const PIN_TONES = {
  faint: { dot: "rounded-full border-tf-faint bg-tf-bg", edge: "border-l-tf-faint" },
  green: { dot: "rounded-[4px] border-tf-green bg-tf-green", edge: "border-l-tf-green" },
  blue: { dot: "rounded-[4px] border-tf-blue bg-tf-blue", edge: "border-l-tf-blue" },
};

function MapPin({
  label,
  place,
  at,
  tone,
  t,
}: {
  label: string;
  place: string;
  at: Point;
  tone: keyof typeof PIN_TONES;
  t: number;
}) {
  return (
    <div data-a="pop" data-t={t} className="absolute z-[5] size-0" style={px(at)}>
      <span
        className={cn(
          "absolute -top-2 -left-2 size-4 border-[3px] shadow-[0_0_0_4px_rgb(0_0_0/0.35)]",
          PIN_TONES[tone].dot,
        )}
      />
      <span
        className={cn(
          "absolute -top-[17px] left-3.5 rounded-lg border border-l-[3px] border-tf-line-strong bg-tf-raised px-[9px] py-1 text-xs leading-[1.3] whitespace-nowrap text-tf-text",
          PIN_TONES[tone].edge,
        )}
      >
        <span className="block text-[10px] tracking-[0.05em] text-tf-faint uppercase">{label}</span>
        {place}
      </span>
    </div>
  );
}

function TruckMarker({ truck, index }: { truck: (typeof trucks)[number]; index: number }) {
  const main = "main" in truck && truck.main;
  return (
    <div
      data-a="fade"
      data-t={300 + index * 90}
      data-target={main ? "truck" : undefined}
      className="absolute z-[6] -mt-[17px] -ml-[17px] size-[34px]"
      style={px(truck.at)}
    >
      <span
        className={cn("demo-ring absolute inset-0 rounded-full border-2", main ? "border-tf-go" : "border-tf-blue-strong")}
        style={{ animationDelay: `${index * 0.35}s` }}
      />
      {main && (
        <span data-a="fade" data-t="2000" className="absolute -inset-[9px] rounded-full border-[1.5px] border-tf-green bg-tf-green/15" />
      )}
      <span
        className={cn(
          "absolute inset-0.5 flex items-center justify-center rounded-full border-2 border-tf-map",
          main ? "bg-tf-go" : "bg-tf-blue-strong",
        )}
        style={{ transform: `rotate(${truck.deg.toFixed(0)}deg)` }}
      >
        <Arrow />
      </span>
      <span className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 rounded-md border border-tf-line-strong bg-tf-raised px-[7px] py-px text-[11px] font-semibold">
        {truck.id}
      </span>
    </div>
  );
}

function Drawer() {
  return (
    <div
      data-a="slide"
      data-x="360"
      data-t="2100"
      data-d="600"
      className="absolute top-0 right-0 bottom-0 z-20 flex w-[350px] flex-col gap-3 border-l border-tf-line bg-tf-panel p-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Truck 196</span>
        <span className="grid justify-items-end *:[grid-area:1/1]">
          <span data-a="fade" data-t="0" data-e="9000">
            <Pill tone="g">On a load</Pill>
          </span>
          <span data-a="pop" data-t="9000">
            <Pill tone="b">Next load booked</Pill>
          </span>
        </span>
      </div>

      <div className={cn(card, "grid grid-cols-2 gap-x-3 gap-y-2 px-3 py-2.5 text-[13px]")}>
        <Field label="Driver">James Carter</Field>
        <Field label="Truck">Freightliner Cascadia</Field>
        <Field label="Trailer">53&apos; Dry van · T-408</Field>
        <Field label="Driving hours left">9h 20m</Field>
        <div className="col-span-2 border-t border-tf-line pt-2">
          <Field label="Delivering to">
            Atlanta, GA · <span className="text-tf-green">ETA 1:40 PM</span>
          </Field>
        </div>
      </div>

      <div
        data-target="find"
        className="flex h-11 items-center justify-center gap-2 rounded-[10px] bg-tf-go text-sm font-semibold text-card"
      >
        <Sparkles className="size-4" />
        Find next load with AI
      </div>

      <div className="grid content-start *:[grid-area:1/1]">
        <div data-a="show" data-t="4500" data-e="7000" className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="demo-spin flex size-[30px] items-center justify-center rounded-full bg-[conic-gradient(from_0deg,var(--color-tf-green),var(--color-tf-blue),var(--color-brand-light),var(--color-tf-green))]">
              <span className="flex size-6 items-center justify-center rounded-full bg-tf-panel text-tf-green">
                <Sparkles className="size-3.5" />
              </span>
            </span>
            TFONE AI is looking for loads…
          </div>
          {AI_CHECKS.map((check) => (
            <div key={check.label} data-a="show" data-t={check.t} className={cn(card, "flex justify-between px-3 py-2.5 text-[13px]")}>
              <span>{check.label}</span>
              <span data-a="fade" data-t={check.done} className="text-tf-green">
                <Check className="size-4" />
              </span>
            </div>
          ))}
          <div className="demo-shimmer h-2 rounded-lg bg-[linear-gradient(90deg,var(--color-tf-raised)_0,var(--color-tf-line-strong)_50%,var(--color-tf-raised)_100%)]" />
        </div>

        <div className="flex flex-col gap-2">
          <div data-a="fade" data-t="7100" className="flex items-center gap-1.5 text-[13px] text-tf-dim">
            <Sparkles className="size-3.5 text-tf-green" />3 loads found near Atlanta, GA
          </div>
          {LOADS.map((load) => (
            <div
              key={load.route}
              data-a="show"
              data-t={load.t}
              data-target={load.best ? "opt1" : undefined}
              className={cn(card, "px-3 py-2.5", load.best && "border-tf-go")}
            >
              <div className="flex items-center justify-between gap-2 text-sm font-semibold">
                <span>{load.route}</span>
                <span>{load.rate}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-tf-faint">
                <span>
                  <span className={cn("font-bold tracking-[0.04em]", load.color)}>{load.board}</span> · {load.meta}
                </span>
                {load.best ? (
                  <Pill tone="g" className="px-2 py-0.5 text-[11px]">
                    Best match
                  </Pill>
                ) : (
                  <span>{load.side}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-[11px] text-tf-faint">{label}</div>
      {children}
    </div>
  );
}

function BookedDialog() {
  const rows = [
    ["Source", <span key="s" className="text-tf-blue">DAT</span>],
    ["Rate", "$1,180 · $4.82/mi"],
    ["Pickup", "Today, 4:00 PM"],
    ["Driver", "James Carter · Truck 196"],
  ] as const;
  return (
    <div
      data-a="fade"
      data-t="8950"
      data-e="11200"
      data-d="300"
      className="absolute inset-0 z-30 flex items-center justify-center bg-tf-frame/60 backdrop-blur-[3px]"
    >
      <div
        data-a="pop"
        data-t="9050"
        data-d="450"
        className="relative w-[380px] overflow-hidden rounded-[20px] border border-tf-line-strong bg-tf-panel px-[26px] pt-7 pb-[22px] text-center shadow-[0_40px_80px_rgb(0_0_0/0.6)]"
      >
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[200px] w-[260px] -translate-x-1/2 bg-[radial-gradient(circle,rgb(47_180_90/0.28)_0%,transparent_70%)]" />
        <div className="relative mx-auto flex size-[72px] items-center justify-center rounded-[20px] bg-card shadow-[0_12px_30px_-8px_rgb(76_155_255/0.55)]">
          <Image src={TFONE_ICON} alt="" width={54} height={54} className="size-[54px] object-contain" />
          <span
            data-a="pop"
            data-t="9400"
            className="absolute -right-2 -bottom-2 flex size-7 items-center justify-center rounded-full border-[3px] border-tf-panel bg-tf-go text-card"
          >
            <Check className="size-3.5" strokeWidth={3} />
          </span>
        </div>
        <div className="relative mt-5 text-[22px] font-semibold">Load booked</div>
        <div className="relative mt-1.5 text-sm text-tf-dim">L0005 · Atlanta, GA → Charlotte, NC</div>
        <div data-a="show" data-t="9500" className="relative mt-[18px] border-t border-tf-line text-left">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-tf-line py-[9px] text-[13px]">
              <span className="text-tf-faint">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
        <div data-a="show" data-t="9800" className="relative mt-3.5 flex items-center justify-center gap-2 text-[13px] text-tf-green">
          <span className="size-1.5 rounded-full bg-tf-green" />
          Sent to the driver&apos;s app
        </div>
        <div className="relative mt-[18px] grid grid-cols-2 gap-2 text-sm">
          <span className="flex h-10 items-center justify-center rounded-[10px] border border-tf-line-strong text-tf-soft">Close</span>
          <span className="flex h-10 items-center justify-center rounded-[10px] bg-tf-go font-semibold text-card">View load</span>
        </div>
      </div>
    </div>
  );
}

function ReportScene() {
  return (
    <div data-a="fade" data-t="13000" className="absolute inset-x-0 top-14 bottom-0 flex flex-col gap-3.5 px-[22px] py-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Company overview</div>
          <div className="mt-0.5 text-[13px] text-tf-faint">January – September 2026</div>
        </div>
        <div className="flex gap-0.5 rounded-[9px] border border-tf-line-strong p-[3px] text-[13px]">
          <span className="px-3 py-1.5 text-tf-dim">Month</span>
          <span className="px-3 py-1.5 text-tf-dim">Quarter</span>
          <span className="rounded-md bg-tf-line px-3 py-1.5">Year</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {KPIS.map((kpi) => (
          <div key={kpi.label} data-a="show" data-t={kpi.t} className={cn(card, "p-4")}>
            <div className="text-xs text-tf-dim">{kpi.label}</div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span
                data-a="count"
                data-t={kpi.t + 200}
                data-d="2200"
                data-to={kpi.to}
                data-dec={"dec" in kpi ? kpi.dec : undefined}
                data-pre={"pre" in kpi ? kpi.pre : undefined}
                data-suf={kpi.suf}
                className={cn("text-[26px] font-semibold", "green" in kpi && "text-tf-green")}
              >
                {("pre" in kpi ? kpi.pre : "") + ("dec" in kpi ? kpi.to.toFixed(kpi.dec) : kpi.to) + kpi.suf}
              </span>
              <span data-a="pop" data-t={kpi.t + 2400}>
                <Pill tone={kpi.tone} className="font-semibold">
                  {kpi.change}
                </Pill>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-[1.6fr_1fr] gap-3">
        <div data-a="show" data-t="13900" className={cn(card, "px-5 py-[18px]")}>
          <div className="flex items-center justify-between text-sm font-semibold">
            Income and expenses by month
            <span className="flex gap-3.5 text-xs font-normal text-tf-dim">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-[2px] bg-tf-green" />
                Income
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-[2px] bg-tf-done" />
                Expenses
              </span>
            </span>
          </div>
          <div
            data-a="pop"
            data-t="16000"
            className="mt-3 inline-flex gap-3.5 rounded-lg border border-tf-line-strong bg-tf-raised px-3 py-1.5 text-xs whitespace-nowrap"
          >
            <span className="text-tf-dim">September</span>
            <span>
              Income <b>$282k</b>
            </span>
            <span>
              Expenses <b>$197k</b>
            </span>
            <span className="text-tf-green">
              Kept <b>$85k</b>
            </span>
          </div>
          <svg viewBox="0 0 660 240" className="mt-2.5 block h-[270px] w-full overflow-visible">
            {[20, 83, 147].map((y) => (
              <line key={y} x1="0" y1={y} x2="660" y2={y} className="stroke-tf-line" />
            ))}
            <line x1="0" y1="210" x2="660" y2="210" className="stroke-tf-line-strong" />
            <g fontSize="11" className="fill-tf-faint">
              {MONTHS.map(([month, income, expense], i) => {
                const x = 22 + i * 72;
                const t = 14300 + i * 120;
                return (
                  <g key={month}>
                    <rect data-a="grow" data-t={t} data-d="700" x={x} y={210 - income} width="24" height={income} rx="4" className="fill-tf-green" />
                    <rect data-a="grow" data-t={t + 60} data-d="700" x={x + 28} y={210 - expense} width="24" height={expense} rx="4" className="fill-tf-done" />
                    <text x={x + 26} y="230" textAnchor="middle">
                      {month}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div data-a="show" data-t="14100" className={cn(card, "flex flex-col gap-3.5 px-5 py-[18px]")}>
          <div className="flex justify-between text-sm font-semibold">
            Where the money goes
            <span className="text-xs font-normal text-tf-faint">$1.31M total</span>
          </div>
          {SPEND.map((row, i) => (
            <div key={row.label}>
              <div className="flex justify-between text-[13px]">
                <span className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-[2px]", row.color)} />
                  {row.label}
                </span>
                <span className="whitespace-nowrap">
                  <span className="font-semibold">{row.amount}</span> <span className="text-tf-faint">{row.share}</span>
                </span>
              </div>
              <div className="mt-[7px] h-[5px] overflow-hidden rounded-[5px] bg-tf-line">
                <div
                  data-a="fill"
                  data-t={15000 + i * 150}
                  data-d="800"
                  className={cn("h-full origin-left rounded-[5px]", row.color)}
                  style={{ width: `${row.width}%` }}
                />
              </div>
            </div>
          ))}
          <div className="mt-auto text-xs text-tf-faint">Sample data</div>
        </div>
      </div>
    </div>
  );
}

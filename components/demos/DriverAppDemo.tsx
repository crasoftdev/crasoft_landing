import Image from "next/image";
import {
  ArrowUp,
  CarFront,
  ChevronLeft,
  ChevronUp,
  CornerUpRight,
  DollarSign,
  Fuel,
  List,
  MessageCircle,
  MicOff,
  Navigation,
  Navigation2,
  Phone,
  Scale,
  Search,
  SendHorizontal,
  SlidersHorizontal,
  Sofa,
  SquareParking,
  Truck,
  Volume2,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { px, type Point } from "@/components/demos/map";
import { Click, Curtain, FuelPin, Pill, Pin, TFONE_ICON, type FuelBrand } from "@/components/demos/parts";

// The TFONE Driver App phone from the Claude Design ("TFONE Driver App Demo.html"),
// as static markup that <Timeline loop={DRIVER_LOOP}> plays. Fake data only.
//   0–5.2s     a new load arrives          5.2–11s   truck-safe navigation
//   11–16.2s   chat with dispatch          16.2–19.4s call dispatch
//   19.4–26s   earnings

export const DRIVER_LOOP = 26_000;
export const DRIVER_SIZE = { width: 340, height: 700 };

const SCREEN = { width: 320, height: 680 };
const MAP = { width: SCREEN.width, height: SCREEN.height - 44 - 66 }; // between status and tab bar

// The navigation map, in its own coordinates: a layer DRIVE px taller than the
// screen that slides down by DRIVE while the truck holds still at PUCK.
const DRIVE = 260;
const PUCK: Point = [160, 380];
const HIGHWAY = `M160 ${MAP.height + DRIVE} V${PUCK[1]} C160 280 225 220 232 0`;
const STREETS = [
  "M0 790 L320 750",
  "M0 600 L320 640",
  "M160 690 Q164 640 200 625",
  "M0 350 Q150 320 320 280",
  "M0 120 L320 160",
];
const LANES = [
  "M58 830 L74 0",
  "M280 830 C282 520 296 300 304 0",
  "M0 700 L58 698",
  "M74 470 L160 474",
  "M232 520 L282 516",
  "M0 230 L72 236",
  "M196 60 L300 40",
];
const SHIELDS: Point[] = [
  [172, 700],
  [204, 360],
];
const WEIGH_STATIONS: Point[] = [
  [198, 440],
  [104, 570],
];
const FUEL_STOPS: { brand: FuelBrand; at: Point; price: string; low?: boolean }[] = [
  { brand: "loves", at: [108, 300], price: "3.89" },
  { brand: "pilot", at: [212, 340], price: "3.92" },
  { brand: "ta", at: [206, 225], price: "3.95" },
  { brand: "fuel", at: [84, 420], price: "3.79", low: true },
];

// The filter chips. `on` is when the driver turns one on.
const FACILITIES: { name: string; Icon: LucideIcon; on?: number }[] = [
  { name: "Weigh stations", Icon: Scale, on: 6200 },
  { name: "Truck stops", Icon: Truck },
  { name: "Parking", Icon: SquareParking },
  { name: "Rest areas", Icon: Sofa },
  { name: "Fuel", Icon: Fuel, on: 8400 },
  { name: "Service", Icon: Wrench },
  { name: "Wash", Icon: CarFront },
];
const CHIP_SCROLL = 300;

const TABS = [
  { label: "Loads", Icon: List, t: 0, e: 5200 },
  { label: "Navigate", Icon: Navigation, t: 5200, e: 11000 },
  { label: "Chat", Icon: MessageCircle, t: 11000, e: 19400 },
  { label: "Earnings", Icon: DollarSign, t: 19400 },
];

const WEEK = [
  ["Mon", 55],
  ["Tue", 80],
  ["Wed", 40],
  ["Thu", 95],
  ["Fri", 60],
  ["Sat", 100],
  ["Sun", 30],
] as const;

const PAST_LOADS = [
  { route: "Atlanta → Charlotte", meta: "L0005 · 245 mi · In progress", pay: "$354", now: true },
  { route: "Dallas → Atlanta", meta: "L0004 · 781 mi · Delivered", pay: "$1,062" },
  { route: "Memphis → Dallas", meta: "L0003 · 452 mi · Delivered", pay: "$780" },
  { route: "Houston → Memphis", meta: "L0002 · 562 mi · Delivered", pay: "$650" },
];

const card = "rounded-2xl border border-tf-line bg-tf-panel";
const chip =
  "relative flex h-[30px] flex-none items-center gap-1.5 rounded-full border border-tf-line-strong bg-tf-raised px-3 shadow-[0_2px_6px_rgb(0_0_0/0.35)]";
const scene = "absolute inset-x-0 top-11 bottom-[66px]";
const label = "text-[11px] text-tf-faint";

export function DriverAppDemo() {
  return (
    <div
      role="img"
      aria-label="Animated demo of the TFONE Driver App: a new load arrives, the driver navigates on a truck-safe route, chats and calls dispatch, then checks the week's earnings."
      data-nosnippet=""
      className="rounded-[54px] bg-tf-frame p-2.5 font-sans shadow-[0_50px_90px_-40px_rgb(42_42_34/0.6),inset_0_0_0_1px_var(--color-tf-line-strong)]"
      style={{ width: DRIVER_SIZE.width, height: DRIVER_SIZE.height }}
    >
      <div data-stage="" className="relative size-full overflow-hidden rounded-[44px] bg-tf-bg text-tf-text">
        <StatusBar />
        <LoadsScene />
        <NavigateScene />
        <ChatScene />
        <EarningsScene />
        <TabBar />
        <CallScreen />
        <Notification />

        <Click t={4500} at="navigate" className="size-11 -mt-[22px] -ml-[22px]" />
        <Click t={12200} at="input" className="size-11 -mt-[22px] -ml-[22px]" />
        <Click t={13500} at="send" className="size-11 -mt-[22px] -ml-[22px]" />
        <Click t={15900} at="call" className="size-11 -mt-[22px] -ml-[22px]" />
        <Click t={19000} at="end" className="size-11 -mt-[22px] -ml-[22px]" />
        <Curtain className="bg-tf-bg" />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-40 flex h-11 items-center justify-between px-[26px] text-[13px] font-semibold">
      <span>9:41</span>
      <span className="absolute top-[9px] left-1/2 h-[26px] w-24 -translate-x-1/2 rounded-full bg-tf-frame" />
      <span className="flex items-center gap-1.5 text-[11px]">
        5G
        <span className="inline-flex h-[11px] w-[22px] rounded-[3px] border-[1.5px] border-tf-text p-px">
          <span className="flex-1 rounded-[1px] bg-tf-text" />
        </span>
      </span>
    </div>
  );
}

function LoadsScene() {
  return (
    <div data-a="fade" data-t="0" data-e="5200" className={cn(scene, "flex flex-col gap-3.5 px-[18px] py-2")}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[13px] text-tf-faint">Good afternoon,</div>
          <div className="text-[22px] font-semibold">James</div>
        </div>
        <Image src={TFONE_ICON} alt="" width={36} height={36} className="size-9 rounded-[10px] bg-card object-contain p-1" />
      </div>
      <div className="flex gap-2">
        <div className={cn(card, "flex-1 px-3 py-2.5")}>
          <div className={label}>Hours left</div>
          <div className="mt-0.5 font-semibold">9h 20m</div>
        </div>
        <div className={cn(card, "flex-1 px-3 py-2.5")}>
          <div className={label}>Truck</div>
          <div className="mt-0.5 font-semibold">196</div>
        </div>
      </div>
      <div className="text-[15px] font-semibold">My loads</div>
      <div className="grid *:[grid-area:1/1]">
        <div
          data-a="fade"
          data-t="0"
          data-e="1900"
          className={cn(card, "flex h-60 flex-col items-center justify-center gap-1.5 border-dashed text-[13px] text-tf-faint")}
        >
          <span className="size-5 rounded-full border-2 border-tf-faint" />
          Waiting for the next load
        </div>
        <div data-a="pop" data-t="1900" className={cn(card, "flex flex-col gap-3 border-tf-go p-4")}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-tf-dim">L0005</span>
            <Pill tone="g" className="px-[9px] text-[11px]">
              Assigned
            </Pill>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center pt-1">
              <span className="size-2.5 rounded-full border-2 border-tf-faint" />
              <span className="my-[3px] w-0.5 flex-1 bg-tf-line-strong" />
              <span className="size-2.5 rounded-[2px] bg-tf-green" />
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div>
                <div className="font-semibold">Atlanta, GA</div>
                <div className={label}>Pickup · Today 4:00 PM</div>
              </div>
              <div>
                <div className="font-semibold">Charlotte, NC</div>
                <div className={label}>Delivery · Today 8:00 PM</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between border-t border-tf-line pt-2.5 text-[13px]">
            <span className="text-tf-faint">245 mi</span>
            <span className="whitespace-nowrap">
              Your pay <b className="text-tf-green">$354</b>
            </span>
          </div>
          <div className="grid grid-cols-[1fr_44px_44px] gap-2">
            <span
              data-target="navigate"
              className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-tf-go text-sm font-semibold text-card"
            >
              <Navigation className="size-4" />
              Navigate
            </span>
            <span className="flex h-11 items-center justify-center rounded-xl border border-tf-line-strong bg-tf-raised">
              <MessageCircle className="size-4" />
            </span>
            <span className="flex h-11 items-center justify-center rounded-xl border border-tf-line-strong bg-tf-raised">
              <Phone className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Heading-up navigation, like the TFONE Navigation app in dark mode: the truck
// stays put and the map slides under it. The slide is a single transform, so it
// runs on the compositor and stays smooth.
function NavigateScene() {
  const layer = { width: MAP.width, height: MAP.height + DRIVE };
  return (
    <div data-a="fade" data-t="5200" data-e="11000" className={cn(scene, "overflow-hidden bg-tf-map")}>
      <div
        data-a="move"
        data-y={DRIVE}
        data-t="5200"
        data-d="5800"
        data-ease="linear"
        className="absolute inset-x-0"
        style={{ top: -DRIVE, height: layer.height }}
      >
        <svg
          width={layer.width}
          height={layer.height}
          viewBox={`0 0 ${layer.width} ${layer.height}`}
          className="absolute inset-0"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {LANES.map((d) => (
            <path key={d} d={d} className="stroke-tf-road" strokeWidth="3" />
          ))}
          {STREETS.map((d) => (
            <path key={d} d={d} className="stroke-tf-line-strong" strokeWidth="6" />
          ))}
          <path d={HIGHWAY} className="stroke-tf-line-strong" strokeWidth="20" />
          <path d={HIGHWAY} className="stroke-tf-blue-line" strokeWidth="12" />
          <path d={HIGHWAY} className="stroke-tf-blue-strong" strokeWidth="7" />
          {SHIELDS.map(([x, y]) => (
            <g key={y} transform={`translate(${x} ${y})`}>
              <path d="M0 0H20V11Q20 18 10 21Q0 18 0 11Z" className="fill-tf-blue-strong stroke-card" strokeWidth="1.2" />
              <path d="M0 0H20V5H0Z" className="fill-tf-red" />
              <text x="10" y="15" textAnchor="middle" className="fill-card text-[8px] font-bold">
                85
              </text>
            </g>
          ))}
        </svg>

        {WEIGH_STATIONS.map((at, i) => (
          <Pin key={i} at={at} t={6300 + i * 120} tone="bg-tf-orange" tag={<span className="text-tf-green">Open</span>}>
            <Scale className="size-3.5" />
          </Pin>
        ))}
        {FUEL_STOPS.map((stop, i) => (
          <FuelPin key={stop.price} {...stop} t={8500 + i * 120} />
        ))}
      </div>

      {/* The driven part of the route, behind the truck */}
      <span className="absolute bottom-0 w-3 -translate-x-1/2 bg-tf-done" style={{ left: PUCK[0], top: PUCK[1] }} />

      {/* The truck */}
      <span className="absolute z-[3] size-16 -translate-x-1/2 -translate-y-1/2" style={px(PUCK)}>
        <span className="absolute inset-0 rounded-full bg-tf-blue/20" />
        <span className="absolute inset-3.5 flex items-center justify-center rounded-full bg-card shadow-[0_2px_8px_rgb(0_0_0/0.5)]">
          <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M7 1 L12.5 12.5 L7 9.6 L1.5 12.5 Z" className="fill-tf-blue-strong" />
          </svg>
        </span>
      </span>

      {/* Next maneuver */}
      <div className="absolute inset-x-2 top-1.5 z-10 overflow-hidden rounded-2xl bg-tf-go text-card shadow-[0_12px_24px_rgb(0_0_0/0.4)]">
        <div className="flex items-center gap-3 px-3 pt-2.5 pb-2">
          <div className="flex w-11 flex-col items-center">
            <ArrowUp className="size-6" />
            <span className="text-[11px] font-semibold">2.4 mi</span>
          </div>
          <div className="flex-1 text-xl font-bold">I-85 N</div>
          <span className="flex size-8 items-center justify-center rounded-full bg-tf-frame/25">
            <MicOff className="size-4" />
          </span>
        </div>
        <div className="flex items-center gap-1 bg-tf-frame/15 px-3 py-1 text-[11px] font-semibold">
          Then <CornerUpRight className="size-3" /> Exit 30
        </div>
      </div>

      {/* Facility filters. The row scrolls to show more of them. */}
      <div
        data-a="move"
        data-x={-CHIP_SCROLL}
        data-t="7300"
        data-d="700"
        className="absolute top-[94px] left-2 z-10 flex gap-1.5 text-xs font-semibold whitespace-nowrap"
      >
        <span className={cn(chip, "w-[30px] justify-center px-0")}>
          <Search className="size-3.5" />
        </span>
        {FACILITIES.map(({ name, Icon, on }) => (
          <span key={name} className={chip}>
            <Icon className="size-3.5" />
            {name}
            {on && (
              <>
                <span
                  data-a="fade"
                  data-t={on}
                  className="absolute -inset-px flex items-center gap-1.5 rounded-full bg-tf-go px-[13px] text-card"
                >
                  <Icon className="size-3.5" />
                  {name}
                </span>
                <Click t={on - 100} className="top-1/2 left-1/2" />
              </>
            )}
          </span>
        ))}
      </div>

      {/* Speed limit and current speed */}
      <div className="absolute top-[134px] left-2 z-10 flex items-center gap-2 rounded-xl border border-tf-line-strong bg-tf-panel py-1.5 pr-2.5 pl-1.5 shadow-[0_4px_12px_rgb(0_0_0/0.4)]">
        <span className="flex w-[34px] flex-col items-center rounded-md border-2 border-tf-frame bg-card py-0.5 text-tf-frame">
          <span className="text-center text-[6px] leading-[1.1] font-bold">SPEED LIMIT</span>
          <span className="text-[17px] leading-none font-bold">65</span>
        </span>
        <span className="flex flex-col items-center">
          <span className="text-xl leading-none font-bold">62</span>
          <span className="text-[10px] text-tf-dim">mph</span>
        </span>
      </div>

      <div className="absolute right-2.5 bottom-[106px] z-10 flex flex-col gap-2.5">
        {[Navigation2, Volume2, SlidersHorizontal].map((Icon, i) => (
          <span
            key={i}
            className="flex size-10 items-center justify-center rounded-full border border-tf-line-strong bg-tf-raised shadow-[0_4px_12px_rgb(0_0_0/0.4)]"
          >
            <Icon className="size-[18px]" />
          </span>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-[36px_1fr_36px] items-center rounded-t-[20px] border-t border-tf-line bg-tf-panel px-3.5 pt-3 pb-3.5">
        <span className="flex size-9 items-center justify-center rounded-full border border-tf-line-strong">
          <X className="size-4" />
        </span>
        <div className="text-center">
          <div className="text-xl font-bold text-tf-green">3h 40m</div>
          <div className="text-[13px] font-semibold">238 mi · 7:52 PM</div>
          <div className="text-[11px] text-tf-faint">Charlotte, NC</div>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full border border-tf-line-strong">
          <ChevronUp className="size-4" />
        </span>
      </div>
    </div>
  );
}

function ChatScene() {
  const them = "max-w-[78%] self-start rounded-[16px_16px_16px_4px] bg-tf-raised px-3 py-2.5 text-sm leading-[1.4]";
  return (
    <div data-a="fade" data-t="11000" data-e="19400" className={cn(scene, "flex flex-col")}>
      <div className="flex items-center gap-2.5 border-b border-tf-raised px-3.5 pt-2 pb-3">
        <ChevronLeft className="size-5 text-tf-faint" />
        <span className="flex size-9 items-center justify-center rounded-full bg-tf-blue-bg font-semibold text-tf-blue-soft">
          S
        </span>
        <div className="flex-1">
          <div className="text-[15px] font-semibold">Sarah · Dispatch</div>
          <div className="text-[11px] text-tf-green">● Online · Load L0005</div>
        </div>
        <span data-target="call" className="flex size-10 items-center justify-center rounded-full bg-tf-go">
          <Phone className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2.5 p-3.5">
        <div className={cn(label, "text-center")}>Today</div>
        <div data-a="show" data-t="11300" className={them}>
          Hi James, the receiver asks for arrival by 8 PM. All good?
        </div>
        <div
          data-a="show"
          data-t="13700"
          className="max-w-[78%] self-end rounded-[16px_16px_4px_16px] bg-tf-go px-3 py-2.5 text-sm leading-[1.4] text-card"
        >
          Yes, ETA is 7:52 PM. On my way.
        </div>
        <div data-a="fade" data-t="14300" data-e="14900" className="flex gap-1 self-start rounded-2xl bg-tf-raised px-3.5 py-2.5">
          {[0, 0.2, 0.4].map((delay) => (
            <span key={delay} className="demo-dots size-1.5 rounded-full bg-tf-dim" style={{ animationDelay: `${delay}s` }} />
          ))}
        </div>
        <div data-a="show" data-t="14900" className={them}>
          Perfect, thank you! Drive safe.
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-tf-raised px-3.5 py-2.5">
        <div
          data-target="input"
          className="grid h-10 flex-1 items-center overflow-hidden rounded-full border border-tf-line-strong bg-tf-raised px-3.5 text-[13px] *:[grid-area:1/1]"
        >
          <span data-a="fade" data-t="0" data-e="12300" className="text-tf-faint">
            Message
          </span>
          <span data-a="type" data-t="12300" data-d="1100" data-e="13600" className="whitespace-nowrap">
            Yes, ETA is 7:52 PM. On my way.
          </span>
          <span data-a="fade" data-t="13600" className="text-tf-faint">
            Message
          </span>
        </div>
        <span data-target="send" className="flex size-10 items-center justify-center rounded-full bg-tf-go text-card">
          <SendHorizontal className="size-4" />
        </span>
      </div>
    </div>
  );
}

function EarningsScene() {
  return (
    <div data-a="fade" data-t="19400" className={cn(scene, "flex flex-col gap-3 px-[18px] py-2")}>
      <div className="text-[22px] font-semibold">Earnings</div>
      <div className={cn(card, "p-4")}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-tf-faint">This week</span>
          <Pill tone="g" className="px-[9px] text-[11px]">
            Paid Friday
          </Pill>
        </div>
        <div data-a="count" data-t="19700" data-d="1800" data-to="2846" data-pre="$" className="mt-1 text-[32px] font-bold">
          $2,846
        </div>
        <div className="mt-3 flex h-[70px] items-end gap-2">
          {WEEK.map(([day, h], i) => (
            <span
              key={day}
              data-a="grow"
              data-t={20000 + i * 80}
              className={cn("flex-1 origin-bottom rounded-[4px]", day === "Sat" ? "bg-tf-green" : "bg-tf-line-strong")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-tf-faint">
          {WEEK.map(([day]) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
      <div className="text-sm font-semibold">By load</div>
      <div className={cn(card, "px-3.5 py-1")}>
        {PAST_LOADS.map((load, i) => (
          <div
            key={load.meta}
            data-a="show"
            data-t={20600 + i * 150}
            className="flex items-center justify-between border-b border-tf-line py-[11px] last:border-b-0"
          >
            <div>
              <div className="text-sm">{load.route}</div>
              <div className={label}>{load.meta}</div>
            </div>
            <b className={cn("text-sm", load.now && "text-tf-green")}>{load.pay}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 grid h-[66px] grid-cols-4 border-t border-tf-raised bg-tf-bg px-2 pt-2 pb-3.5 text-[11px]">
      {TABS.map(({ label: name, Icon, t, e }) => (
        <div key={name} className="relative flex flex-col items-center gap-[3px] text-tf-faint">
          <Icon className="size-4" />
          {name}
          <div
            data-a="fade"
            data-t={t}
            data-e={e}
            className="absolute inset-0 flex flex-col items-center gap-[3px] bg-tf-bg text-tf-green"
          >
            <Icon className="size-4" />
            {name}
          </div>
        </div>
      ))}
    </div>
  );
}

function CallScreen() {
  return (
    <div
      data-a="fade"
      data-t="16200"
      data-e="19400"
      data-d="350"
      className="absolute inset-0 z-[55] flex flex-col items-center bg-[linear-gradient(180deg,var(--color-tf-blue-bg)_0%,var(--color-tf-bg)_70%)] px-6 pt-[110px] pb-[50px]"
    >
      <div className="relative size-[110px]">
        <span className="demo-ring absolute inset-0 rounded-full border-2 border-tf-blue" />
        <span className="demo-ring absolute inset-0 rounded-full border-2 border-tf-blue [animation-delay:1s]" />
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-tf-blue-line text-[42px] font-semibold text-tf-blue-soft">
          S
        </span>
      </div>
      <div className="mt-7 text-2xl font-semibold">Sarah</div>
      <div className="mt-1 text-sm text-tf-dim">Dispatch · TFONE</div>
      <div className="mt-3 grid justify-items-center text-[15px] *:[grid-area:1/1]">
        <span data-a="fade" data-t="0" data-e="17500" className="text-tf-blue-soft">
          Calling…
        </span>
        <span data-a="fade" data-t="17500" className="text-tf-green">
          Connected · 00:08
        </span>
      </div>
      <div className="mt-auto flex gap-[26px] text-xs">
        <span className="flex size-[60px] items-center justify-center rounded-full bg-tf-line text-tf-soft">Mute</span>
        <span className="flex size-[60px] items-center justify-center rounded-full bg-tf-line text-tf-soft">Speaker</span>
        <span data-target="end" className="flex size-[60px] items-center justify-center rounded-full bg-tf-red font-semibold text-card">
          End
        </span>
      </div>
    </div>
  );
}

function Notification() {
  return (
    <div data-a="slide" data-y="-130" data-t="1100" data-d="550" data-e="3600" className="absolute inset-x-2.5 top-[46px] z-[70]">
      <div className="flex gap-2.5 rounded-[20px] border border-tf-line-strong bg-tf-raised/95 p-3 shadow-[0_20px_40px_rgb(0_0_0/0.5)] backdrop-blur-md">
        <Image src={TFONE_ICON} alt="" width={38} height={38} className="size-[38px] flex-none rounded-[10px] bg-card object-contain p-1" />
        <div className="min-w-0 flex-1">
          <div className="flex justify-between text-[11px] text-tf-dim">
            <span>TFONE Driver</span>
            <span>now</span>
          </div>
          <div className="mt-0.5 text-sm font-semibold">New load assigned</div>
          <div className="mt-px text-xs text-tf-soft">Atlanta, GA → Charlotte, NC · Pickup 4:00 PM</div>
        </div>
      </div>
    </div>
  );
}

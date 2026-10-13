import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { px, type Point } from "@/components/demos/map";

// Small pieces shared by the demos. All of them are driven by the timeline
// (engine.ts) through their data attributes.

export const TFONE_ICON = "/tfone_logo_icon.png";

// A status pill in the TFONE app: green (good), blue (info) or neutral.
const PILL_TONES = {
  g: "border-tf-green-line bg-tf-green-bg text-tf-green",
  b: "border-tf-blue-line bg-tf-blue-bg text-tf-blue",
  n: "border-tf-line-strong bg-tf-raised text-tf-soft",
};

export function Pill({
  tone,
  className,
  children,
}: {
  tone: keyof typeof PILL_TONES;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("rounded-full border px-2.5 py-[3px] text-xs whitespace-nowrap", PILL_TONES[tone], className)}>
      {children}
    </span>
  );
}

// The heading arrow inside a truck marker.
export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 1 L12.5 12.5 L7 9.6 L1.5 12.5 Z" className="fill-card" />
    </svg>
  );
}

// A tap ripple at `ms`, on the element whose data-target is `at` (or at the
// position given in `className`).
export function Click({ t, at, className }: { t: number; at?: string; className?: string }) {
  return (
    <div
      data-a="click"
      data-t={t}
      data-at={at}
      className={cn("pointer-events-none absolute z-50 -mt-5 -ml-5 size-10 rounded-full bg-card/40 opacity-0", className)}
    />
  );
}

// The pointer that moves between targets. `path` is "ms:x,y;ms:@target;...".
export function Cursor({ path, end }: { path: string; end: number }) {
  return (
    <div data-a="cursor" data-path={path} data-e={end} className="pointer-events-none absolute top-0 left-0 z-50 size-0 opacity-0">
      <svg width="22" height="22" viewBox="0 0 22 22" className="block drop-shadow-[0_2px_4px_rgb(0_0_0/0.5)]">
        <path
          d="M3 2 L3 18 L7.5 13.8 L10.5 20 L13.2 18.8 L10.3 12.6 L16.5 12.4 Z"
          className="fill-card stroke-tf-bg"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Fades over the demo as the loop wraps, so the restart is not a jump cut.
export function Curtain({ className }: { className?: string }) {
  return <div data-a="curtain" className={cn("pointer-events-none absolute inset-0 z-[60] opacity-0", className)} />;
}

// The highlighted step list beside a demo. Each step's bar shows while the demo
// is on that step. The text is server-rendered for readers and crawlers.
export function StepList({
  steps,
  className,
}: {
  steps: { title: string; line: string; t: number; e?: number }[];
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-col border-t border-ring", className)}>
      {steps.map((step) => (
        <li key={step.title} className="relative border-b border-ring py-3.5 pl-[18px]">
          <span
            aria-hidden="true"
            data-a="fade"
            data-t={step.t}
            data-e={step.e}
            className="absolute top-3.5 bottom-3.5 left-0 w-[3px] rounded-[3px] bg-brand"
          />
          <span className="block font-semibold">{step.title}</span>
          <span className="mt-0.5 block text-sm text-muted">{step.line}</span>
        </li>
      ))}
    </ol>
  );
}

// A map pin with a price or status tag beside it. `at` is the pin's tip. With
// `t` it pops in at that ms of the timeline; without it, it is static.
export function Pin({
  at,
  t,
  tone,
  low,
  tag,
  children,
}: {
  at: Point;
  t?: number;
  tone: string;
  low?: boolean;
  tag: ReactNode;
  children: ReactNode;
}) {
  return (
    <span data-a={t == null ? undefined : "pop"} data-t={t} className="absolute z-[2] flex items-start" style={px([at[0] - 14, at[1] - 34])}>
      <span
        className={cn(
          "flex size-7 -rotate-45 items-center justify-center rounded-[50%_50%_50%_0] border-2 border-card text-[10px] font-bold text-card shadow-[0_2px_6px_rgb(0_0_0/0.5)]",
          tone,
        )}
      >
        <span className="flex rotate-45">{children}</span>
      </span>
      <span
        className={cn(
          "-ml-1 rounded-md px-1.5 py-0.5 text-center text-[10px] leading-tight font-bold",
          low ? "bg-tf-blue-strong text-card" : "bg-tf-frame text-tf-text",
        )}
      >
        {tag}
      </span>
    </span>
  );
}

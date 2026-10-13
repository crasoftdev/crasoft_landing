import { cn } from "@/lib/utils";

// Shared class lists, so every button and heading on the site matches the hero.

export const button = {
  base: "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[translate,background-color,border-color,color,box-shadow] duration-300",
  // Dark pill: the main action in a section.
  solid:
    "bg-ink px-6 py-3.5 text-surface hover:-translate-y-0.5 hover:bg-brand-strong hover:text-card hover:shadow-[0_14px_30px_-12px_rgb(124_95_69/0.6)]",
  // Outlined pill: the quieter action.
  outline:
    "border border-line-strong px-[23px] py-[13px] text-ink hover:-translate-y-0.5 hover:border-ink hover:bg-card",
};

export const buttonClass = (variant: "solid" | "outline", className?: string) =>
  cn(button.base, button[variant], className);

// Small uppercase label above a heading.
export const eyebrow = "font-mono text-[13px] tracking-[0.06em] text-brand-strong uppercase";

// Section <h2>.
export const h2 =
  "font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] font-semibold tracking-[-0.025em] text-balance";

// Paragraph under a section heading.
export const lead = "text-lg leading-[1.6] text-pretty text-muted";

// Section frame: one width and gutter for the whole site.
export const container = "mx-auto w-full max-w-[1200px] px-4 sm:px-6";

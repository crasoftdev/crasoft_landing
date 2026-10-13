import { cn } from "@/lib/utils";
import { container } from "@/components/ui/styles";
import { showPlaceholders } from "@/components/home/placeholders";

// "Trusted by" strip from the Claude Design. Development-only until real content
// exists (see placeholders.ts).
export function Proof() {
  if (!showPlaceholders) return null;
  return (
    <section aria-label="Trusted by (placeholder)" className="border-y border-line bg-surface-alt">
      <div className={cn(container, "flex flex-wrap items-center justify-between gap-8 py-10")}>
        <p className="font-mono text-xs tracking-[0.06em] text-muted uppercase">Placeholder · Trusted by</p>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="flex h-10 w-[120px] items-center justify-center rounded-lg border border-dashed border-line-strong text-xs text-muted"
            >
              Logo
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-10">
          {["00+", "00k"].map((value) => (
            <div key={value}>
              <div className="font-display text-[32px] font-semibold">{value}</div>
              <div className="text-sm text-muted">Metric placeholder</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

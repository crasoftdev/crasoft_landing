import { cn } from "@/lib/utils";
import { container, eyebrow } from "@/components/ui/styles";
import { showPlaceholders } from "@/components/home/placeholders";

// Client story from the Claude Design. Development-only until a real story
// exists (see placeholders.ts). Never fill this with an invented quote.
export function CaseStudy() {
  if (!showPlaceholders) return null;
  return (
    <section aria-label="Client story (placeholder)" className={cn(container, "pt-28 pb-10 lg:pt-[120px]")}>
      <div className="reveal grid items-center gap-12 rounded-[28px] border border-line bg-card p-[clamp(28px,5vw,64px)] lg:grid-cols-2">
        <div>
          <p className={eyebrow}>Placeholder · Client story</p>
          <p className="mt-6 font-display text-[clamp(24px,2.6vw,34px)] leading-[1.3] font-medium tracking-[-0.01em] text-pretty">
            “Placeholder quote. A short sentence from a client about how Crasoft’s software changed their day-to-day
            work.”
          </p>
          <div className="mt-8 flex items-center gap-3.5">
            <div className="size-12 rounded-full border border-dashed border-line-strong bg-surface-alt" />
            <div>
              <div className="font-semibold">Client name</div>
              <div className="text-sm text-muted">Role, Company</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["00%", "0x"].map((value) => (
            <div key={value} className="rounded-[18px] bg-surface p-6">
              <div className="font-display text-[40px] font-semibold">{value}</div>
              <div className="mt-1.5 text-[15px] text-muted">Result placeholder</div>
            </div>
          ))}
          <div className="col-span-2 aspect-[16/7] rounded-[18px] bg-[repeating-linear-gradient(135deg,var(--color-line)_0_10px,var(--color-surface-alt)_10px_20px)]" />
        </div>
      </div>
    </section>
  );
}

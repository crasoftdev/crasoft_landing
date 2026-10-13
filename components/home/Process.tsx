import { cn } from "@/lib/utils";
import { container, eyebrow, h2 } from "@/components/ui/styles";

// Copy from the Claude Design (Crasoft Home.dc.html).
const STEPS = [
  { title: "Discover", line: "We listen. You tell us how your work runs today and what you want to change." },
  { title: "Design", line: "We show you how it will look and work, before anything is built." },
  { title: "Build", line: "We build it in small parts and share progress with you along the way." },
  { title: "Support", line: "After launch, we stay with you to fix, improve and grow it." },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className={cn(container, "pt-28 pb-10 lg:pt-[120px]")}>
      <div className="reveal max-w-[720px]">
        <p className={eyebrow}>How we work</p>
        <h2 id="process-heading" className={cn(h2, "mt-4")}>
          Four clear steps, from first call to launch.
        </h2>
      </div>
      <ol className="reveal mt-14 grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="py-7 pr-6">
            <span className="font-mono text-[13px] text-brand-strong">Step {i + 1}</span>
            <h3 className="mt-4 font-display text-2xl font-semibold">{step.title}</h3>
            <p className="mt-2.5 leading-[1.6] text-muted">{step.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

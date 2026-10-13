import { cn } from "@/lib/utils";
import { container, eyebrow, h2, lead } from "@/components/ui/styles";

// Copy from the Claude Design (Crasoft Home.dc.html).
const SERVICES = [
  {
    title: "Turn your idea into a product",
    line: "For founders and startups with an idea. We design, build and launch it with you.",
  },
  {
    title: "Software for your business",
    line: "Websites, mobile apps and tools made to fit the way your company works.",
  },
  {
    title: "Support after launch",
    line: "We keep improving, fixing and growing your software after it goes live.",
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className={cn(container, "pt-28 pb-10 lg:pt-[120px]")}>
      <div className="reveal max-w-[720px]">
        <p className={eyebrow}>Services</p>
        <h2 id="services-heading" className={cn(h2, "mt-4")}>
          We can build your software too.
        </h2>
        <p className={cn(lead, "mt-5")}>
          The same team that makes our products builds custom software for people and companies.
        </p>
      </div>
      <ol className="reveal mt-14 grid gap-5 md:grid-cols-3">
        {SERVICES.map((service, i) => (
          <li key={service.title} className="rounded-3xl border border-line bg-card p-8">
            <span aria-hidden="true" className="font-display text-[15px] font-semibold text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-10 font-display text-[26px] font-semibold tracking-[-0.01em]">{service.title}</h3>
            <p className="mt-3 leading-[1.6] text-muted">{service.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

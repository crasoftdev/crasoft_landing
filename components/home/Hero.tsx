import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactHref, site } from "@/lib/site";
import { HeroOrbit } from "@/components/home/HeroOrbit";

// Copy from the Claude Design (Crasoft Home.dc.html). Swap here.
const HEADLINE = "We turn everyday problems into simple software.";
const SUPPORTING_LINE = `${site.name} designs and builds easy-to-use software for businesses. We make our own products, and we build custom software for companies and founders.`;
const ACTIONS = {
  primary: { label: "Book a call", href: contactHref },
  secondary: { label: "See our products", href: "/#products" },
};

// Each block rises in one after another, then the orbit fades in.
const STEP_MS = 110;
const delay = (i: number) => ({ animationDelay: `${100 + i * STEP_MS}ms` });

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-20%] right-[-10%] -z-10 aspect-square w-[70%] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-sand)_70%,transparent)_0%,transparent_65%)]"
      />
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-[72px] lg:pb-[88px]">
        <div className="xl:-ml-8 2xl:-ml-24">
          <h1
            id="hero-heading"
            className="animate-rise font-display text-[clamp(40px,5.6vw,76px)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance motion-reduce:animate-none"
            style={delay(0)}
          >
            {HEADLINE}
          </h1>
          <p
            className="mt-6 max-w-[520px] animate-rise text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-pretty text-muted motion-reduce:animate-none"
            style={delay(1)}
          >
            {SUPPORTING_LINE}
          </p>
          <div
            className="mt-9 flex animate-rise flex-wrap gap-3 motion-reduce:animate-none"
            style={delay(2)}
          >
            <Link
              href={ACTIONS.primary.href}
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 font-semibold text-surface transition-[translate,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-brand-strong hover:text-card hover:shadow-[0_14px_30px_-12px_rgb(124_95_69/0.6)]"
            >
              {ACTIONS.primary.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-[translate] group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href={ACTIONS.secondary.href}
              className="inline-flex items-center rounded-full border border-line-strong bg-card/60 px-[27px] py-[15px] font-semibold text-ink transition-[translate,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-card"
            >
              {ACTIONS.secondary.label}
            </Link>
          </div>
        </div>

        <HeroOrbit className="my-6 animate-orbit-in justify-self-center [animation-delay:200ms] motion-reduce:animate-none" />
      </div>
    </section>
  );
}

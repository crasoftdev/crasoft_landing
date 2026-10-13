import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonClass, container, eyebrow, lead } from "@/components/ui/styles";

// Copy from the Claude Design (Crasoft Home.dc.html).
export function Investors() {
  return (
    <section aria-labelledby="investors-heading" className={cn(container, "pt-28 pb-10 lg:pt-[120px]")}>
      <div className="reveal grid items-start gap-x-16 gap-y-8 border-t border-ink pt-10 lg:grid-cols-2">
        <div>
          <p className={eyebrow}>Investors &amp; partners</p>
          <h2
            id="investors-heading"
            className="mt-4 font-display text-[clamp(30px,3.6vw,46px)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance"
          >
            We’re building a family of useful software products.
          </h2>
        </div>
        <div>
          <p className={lead}>
            TFONE is our first. Our plan is to keep making simple, reliable products for industries that still run on
            paper, phone calls and spreadsheets. If you’d like to invest or work with us, we’d love to talk.
          </p>
          <Link href={contactHref} className={buttonClass("outline", "mt-7")}>
            Talk to the founders
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

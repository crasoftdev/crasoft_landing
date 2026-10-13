import type { Metadata } from "next";
import Link from "next/link";
import { contactHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonClass, container, eyebrow, lead } from "@/components/ui/styles";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className={cn(container, "flex flex-1 flex-col justify-center py-28")}>
      <p className={eyebrow}>404</p>
      <h1 className="mt-4 font-display text-[clamp(40px,5.6vw,76px)] leading-[1.02] font-semibold tracking-[-0.035em]">
        Page not found.
      </h1>
      <p className={cn(lead, "mt-6 max-w-[520px]")}>This page doesn’t exist or has moved.</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className={buttonClass("solid")}>
          Back to the home page
        </Link>
        <Link href={contactHref} className={buttonClass("outline")}>
          Contact us
        </Link>
      </div>
    </main>
  );
}

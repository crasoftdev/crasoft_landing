import Image from "next/image";
import Link from "next/link";
import { contactHref, navLinks, site } from "@/lib/site";
import { buttonClass, container } from "@/components/ui/styles";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className={cn(container, "flex items-center justify-between gap-6 py-3.5")}>
        <Link href="/" className="flex shrink-0 items-center rounded-md">
          <Image
            src={site.logo}
            alt={site.name}
            width={2172}
            height={724}
            preload
            sizes="144px"
            className="h-12 w-auto mix-blend-multiply"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 min-[860px]:flex">
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink transition-colors hover:text-brand-strong">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={contactHref} className={buttonClass("solid", "px-5 py-2.5 text-[15px]")}>
            Book a call
          </Link>
        </nav>

        <MobileMenu className="min-[860px]:hidden" />
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { legalLinks, navLinks, site } from "@/lib/site";
import { container } from "@/components/ui/styles";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { cn } from "@/lib/utils";

const TAGLINE = "Software products for everyday business work.";

const linkClass = "text-muted transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-alt">
      <div className={cn(container, "grid grid-cols-1 gap-10 pt-14 pb-8 sm:grid-cols-2 lg:grid-cols-4")}>
        <div className="flex flex-col gap-3.5">
          <Link href="/" className="-ml-1.5 self-start rounded-md">
            <Image
              src={site.logo}
              alt={site.name}
              width={2172}
              height={724}
              sizes="156px"
              className="h-[52px] w-auto mix-blend-multiply"
            />
          </Link>
          <p className="max-w-[260px] text-[15px] leading-[1.6] text-muted">{TAGLINE}</p>
        </div>

        <nav aria-labelledby="footer-company" className="text-[15px]">
          <h2 id="footer-company" className="mb-3.5 font-semibold">
            Company
          </h2>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-products" className="text-[15px]">
          <h2 id="footer-products" className="mb-3.5 font-semibold">
            Products
          </h2>
          <ul className="flex flex-col gap-2.5">
            {products.map((product) => (
              <li key={product.slug}>
                {product.url ? (
                  <ExternalLink href={product.url} className={linkClass}>
                    {product.name}
                  </ExternalLink>
                ) : (
                  <Link href="/#products" className={linkClass}>
                    {product.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-[15px]">
          <h2 className="mb-3.5 font-semibold">Contact</h2>
          <address className="flex flex-col gap-2.5 text-muted not-italic">
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
            {/* TODO(content): phone and US address, from lib/site.ts once set. */}
          </address>
        </div>
      </div>

      <div className={container}>
        <div className="flex flex-wrap justify-between gap-3 border-t border-ring pt-5 pb-8 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

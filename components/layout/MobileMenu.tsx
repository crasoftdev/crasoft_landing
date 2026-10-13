"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { contactHref, navLinks } from "@/lib/site";
import { buttonClass } from "@/components/ui/styles";
import { cn } from "@/lib/utils";

// The menu button and dropdown on narrow screens. The same links are in the
// desktop <nav>, so they are in the HTML whether or not this ever opens.
export function MobileMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-card text-ink"
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-line bg-surface px-4 pt-2 pb-6 shadow-[0_24px_40px_-24px_rgb(42_42_34/0.35)] sm:px-6"
      >
        <ul className="flex flex-col text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={close} className="block py-3 text-ink">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={contactHref} onClick={close} className={cn(buttonClass("solid"), "mt-3 w-full")}>
          Book a call
        </Link>
      </nav>
    </div>
  );
}

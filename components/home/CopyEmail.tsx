"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Copies the company email, for visitors whose browser has no email app set up.
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard blocked: the email is still visible and selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-[54px] items-center justify-center gap-2 rounded-full border border-line-strong px-6 font-semibold transition-colors hover:border-ink",
        className,
      )}
    >
      {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

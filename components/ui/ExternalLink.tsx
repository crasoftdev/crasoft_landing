import type { ComponentProps } from "react";

// Link to a product website. Opens in a new tab and keeps the referrer (no
// `noreferrer`), so product sites can see traffic from crasoftinc.com.
export function ExternalLink({ children, ...props }: Omit<ComponentProps<"a">, "target" | "rel">) {
  return (
    <a target="_blank" rel="noopener" {...props}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

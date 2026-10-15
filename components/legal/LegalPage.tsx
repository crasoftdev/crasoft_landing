import type { ReactNode } from "react";
import { legalEffectiveDate, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { container, eyebrow, lead } from "@/components/ui/styles";

// The company name as it appears in legal text.
export const legalName = site.legalName ?? site.name;

const effective = new Date(`${legalEffectiveDate}T00:00:00Z`).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

// Shared frame for Privacy and Terms: one H1, the effective date, a short intro,
// then numbered sections.
export function LegalPage({
  title,
  path,
  intro,
  children,
}: {
  title: string;
  path: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <main id="main" className={cn(container, "flex-1 pt-20 pb-28 lg:pt-28")}>
      <JsonLd data={breadcrumbSchema(title, path)} />
      <article className="max-w-[720px]">
        <p className={eyebrow}>Legal</p>
        <h1 className="mt-4 font-display text-[clamp(40px,5.6vw,64px)] leading-[1.05] font-semibold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          Effective <time dateTime={legalEffectiveDate}>{effective}</time>
        </p>
        <div className={cn(lead, "mt-8")}>{intro}</div>
        <div className="mt-12 flex flex-col gap-10">{children}</div>
      </article>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-[-0.015em]">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 leading-[1.7] text-pretty text-muted [&_a]:font-semibold [&_a]:text-brand-strong [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

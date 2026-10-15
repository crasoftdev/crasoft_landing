import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { container } from "@/components/ui/styles";
import { CopyEmail } from "@/components/home/CopyEmail";

// No form service yet, so visitors email us directly.
// TODO(content): pick a form service (ask first) if a form should come back.
const include = [
  "What you need built, or what isn’t working today",
  "Your company and how many people will use it",
  "When you’d like to start",
];

const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Hello Crasoft")}`;

// Copy from the Claude Design (Crasoft Home.dc.html), with the form swapped for email.
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className={cn(container, "pt-28 pb-28 lg:py-[120px]")}>
      <div className="reveal grid gap-12 rounded-[32px] bg-ink p-[clamp(24px,5vw,64px)] text-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <p className="font-mono text-[13px] tracking-[0.06em] text-brand-light uppercase">Book a call</p>
          <h2
            id="contact-heading"
            className="mt-4 font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] font-semibold tracking-[-0.025em] text-balance"
          >
            Let’s talk about what you need.
          </h2>
          <p className="mt-5 max-w-[440px] text-lg leading-[1.6] text-ring">
            Email us and tell us what you need. We’ll reply within one business day to set up a call.
          </p>
          {/* TODO(content): phone number, once set in lib/site.ts. */}
        </div>

        <div className="flex flex-col rounded-3xl bg-surface p-[clamp(20px,3vw,36px)] text-ink">
          <p className="text-sm font-semibold text-muted">Email us at</p>
          <a
            href={mailto}
            className="mt-2 font-display text-[clamp(24px,3.2vw,36px)] leading-tight font-semibold tracking-[-0.02em] break-all underline-offset-[6px] hover:text-brand-strong hover:underline"
          >
            {site.email}
          </a>

          <h3 className="mt-8 text-sm font-semibold">A few lines is enough. It helps to include:</h3>
          <ul className="mt-3 space-y-2.5 leading-[1.6] text-muted">
            {include.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[11px] size-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:pt-8">
            <a
              href={mailto}
              className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-ink font-semibold text-surface transition-colors hover:bg-brand-strong"
            >
              <Mail aria-hidden="true" className="size-4" />
              Write to us
            </a>
            <CopyEmail />
          </div>
        </div>
      </div>
    </section>
  );
}

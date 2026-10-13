import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { container } from "@/components/ui/styles";
import { ContactForm } from "@/components/home/ContactForm";

// Copy from the Claude Design (Crasoft Home.dc.html).
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
            Tell us a little about you. We’ll get back to you within one business day to set up a call.
          </p>
          <p className="mt-10 text-ring">
            <a href={`mailto:${site.email}`} className="underline-offset-4 hover:text-surface hover:underline">
              {site.email}
            </a>
          </p>
          {/* TODO(content): phone number, once set in lib/site.ts. */}
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

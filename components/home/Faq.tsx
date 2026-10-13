import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { container, eyebrow, h2 } from "@/components/ui/styles";

// Copy from the Claude Design (Crasoft Home.dc.html). Native <details>, so the
// answers are in the HTML and it works without JavaScript. They share a `name`,
// so opening one closes the others.
const FAQS = [
  {
    q: "What does Crasoft do?",
    a: "We are a software company. We build our own software products, like the TFONE family for trucking companies, and we also build custom software for other businesses and founders.",
  },
  {
    q: "I have an idea but no technical team. Can you help?",
    a: "Yes. That is one of the main things we do. We help you shape the idea, design it, build it and launch it. You don’t need to know anything technical.",
  },
  {
    q: "How long does it take to build something?",
    // TODO(content): add a typical timeline range.
    a: "It depends on the size of the project. After our first call, we give you a clear plan with a timeline.",
  },
  {
    q: "How much does it cost?",
    // TODO(content): add a pricing note, if any.
    a: "Every project is different. We give you a clear price after we understand what you need.",
  },
  {
    q: "Is TFONE only for large trucking companies?",
    // TODO(content): confirm the fleet sizes and plans TFONE supports.
    a: "No. TFONE works for small and large carriers.",
  },
  {
    q: "Do you help after the software is live?",
    a: "Yes. We keep fixing, improving and adding features so your software grows with your business.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className={cn(container, "pt-28 pb-10 lg:pt-[120px]")}>
      <div className="reveal grid items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <p className={eyebrow}>FAQ</p>
          <h2 id="faq-heading" className={cn(h2, "mt-4")}>
            Questions, answered.
          </h2>
        </div>
        <div className="border-t border-ring">
          {FAQS.map((faq, i) => (
            <details key={faq.q} name="faq" open={i === 0} className="group border-b border-ring">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[22px] font-display text-[19px] font-medium [&::-webkit-details-marker]:hidden">
                <h3>{faq.q}</h3>
                <span
                  aria-hidden="true"
                  className="flex size-8 flex-none items-center justify-center rounded-full border border-line-strong text-brand-strong"
                >
                  <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>
              <p className="pr-12 pb-6 leading-[1.65] text-pretty text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

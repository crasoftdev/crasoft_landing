"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// The "Book a call" form from the Claude Design. There is no form service yet,
// so sending opens the visitor's email app with everything filled in, addressed
// to the company email.
// TODO(content): pick a form service (ask first), then post to it instead of mailto.

const SIZES = ["Just me", "2–10 people", "11–50 people", "51–200 people", "200+ people"];
const INTERESTS = ["TFONE products", "Build my idea", "Software for my business", "Partnership or investment"];

type Fields = { name: string; company: string; email: string; size: string; interest: string; message: string };
type Errors = Partial<Record<"name" | "email" | "interest", string>>;

const EMPTY: Fields = { name: "", company: "", email: "", size: "", interest: "", message: "" };

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (!f.name.trim()) errors.name = "Please add your name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) errors.email = "Please add a valid email.";
  if (!f.interest) errors.interest = "Please pick one.";
  return errors;
}

function mailtoHref(f: Fields) {
  const details = [
    `Name: ${f.name.trim()}`,
    f.company.trim() && `Company: ${f.company.trim()}`,
    `Email: ${f.email.trim()}`,
    f.size && `Company size: ${f.size}`,
    `Interested in: ${f.interest}`,
  ].filter(Boolean);
  const body = [...details, "", f.message.trim()].join("\n").trim();
  const subject = `Book a call: ${f.interest}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const input =
  "h-12 rounded-xl border border-line-strong bg-card px-3.5 text-base font-normal text-ink outline-none transition-colors focus:border-brand aria-[invalid=true]:border-danger";
const fieldLabel = "flex flex-col gap-1.5 text-sm font-semibold";
const errorText = "text-[13px] font-medium text-danger";

export function ContactForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstBad = (["name", "email", "interest"] as const).find((k) => found[k]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstBad}"]`)?.focus();
      return;
    }
    window.location.href = mailtoHref(fields);
    setSentTo(fields.name.trim().split(/\s+/)[0]);
  };

  if (sentTo !== null) {
    return (
      <div role="status" className="flex flex-col justify-center rounded-3xl bg-surface p-10 text-ink">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand text-card">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h3 className="mt-6 font-display text-[28px] font-semibold">Thanks, {sentTo}.</h3>
        <p className="mt-2.5 leading-[1.6] text-muted">
          Your email app should now open with your message. Send it, and we’ll reply within one business day. If it
          didn’t open, write to us at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-strong underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY);
            setSentTo(null);
          }}
          className="mt-7 self-start rounded-full border border-line-strong px-5 py-3 font-semibold transition-colors hover:border-ink"
        >
          Write another message
        </button>
      </div>
    );
  }

  const err = (key: keyof Errors) =>
    errors[key] ? { "aria-invalid": true, "aria-describedby": `${id}-${key}-error` } : {};

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={submit}
      className="grid gap-4 rounded-3xl bg-surface p-[clamp(20px,3vw,36px)] text-ink sm:grid-cols-2"
    >
      <label className={fieldLabel}>
        Name
        <input
          data-field="name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={fields.name}
          onChange={(e) => set("name")(e.target.value)}
          className={input}
          {...err("name")}
        />
        {errors.name && (
          <span id={`${id}-name-error`} className={errorText}>
            {errors.name}
          </span>
        )}
      </label>

      <label className={fieldLabel}>
        Company
        <input
          name="company"
          autoComplete="organization"
          placeholder="Optional"
          value={fields.company}
          onChange={(e) => set("company")(e.target.value)}
          className={input}
        />
      </label>

      <label className={fieldLabel}>
        Email
        <input
          data-field="email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={fields.email}
          onChange={(e) => set("email")(e.target.value)}
          className={input}
          {...err("email")}
        />
        {errors.email && (
          <span id={`${id}-email-error`} className={errorText}>
            {errors.email}
          </span>
        )}
      </label>

      <label className={fieldLabel}>
        Company size
        <select
          name="size"
          value={fields.size}
          onChange={(e) => set("size")(e.target.value)}
          className={cn(input, "px-3")}
        >
          <option value="">Select</option>
          {SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="flex flex-col gap-2 sm:col-span-2" {...err("interest")}>
        <legend className="mb-2 text-sm font-semibold">What are you interested in?</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((option, i) => (
            <label key={option} className="cursor-pointer">
              <input
                data-field={i === 0 ? "interest" : undefined}
                type="radio"
                name="interest"
                value={option}
                checked={fields.interest === option}
                onChange={() => set("interest")(option)}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-line-strong bg-card px-4 py-2.5 text-[15px] font-medium transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-strong hover:border-ink">
                {option}
              </span>
            </label>
          ))}
        </div>
        {errors.interest && (
          <span id={`${id}-interest-error`} className={errorText}>
            {errors.interest}
          </span>
        )}
      </fieldset>

      <label className={cn(fieldLabel, "sm:col-span-2")}>
        Message
        <textarea
          name="message"
          rows={4}
          placeholder="A few words about what you need"
          value={fields.message}
          onChange={(e) => set("message")(e.target.value)}
          className={cn(input, "h-auto resize-y py-3")}
        />
      </label>

      <button
        type="submit"
        className="h-[54px] rounded-full bg-ink font-semibold text-surface transition-colors hover:bg-brand-strong sm:col-span-2"
      >
        Book a call
      </button>
    </form>
  );
}

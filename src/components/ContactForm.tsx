"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Arrow } from "./ui";

// Footer contact form. The site is a STATIC export (no server / API route), so
// on submit this composes a prefilled email to siteConfig.email via the
// visitor's mail client. To collect submissions server-side instead, replace
// the body of `handleSubmit` with a POST to a form backend (e.g. Formspree or
// Web3Forms, which both work from static hosting via a public key), or add a
// Next API route — the latter requires turning off `output: "export"`.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `New project enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company && `Company: ${company}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mx-auto mt-10 max-w-xl text-center">
        <p className="text-lg font-medium">Thanks — your email client should have opened.</p>
        <p className="mt-2 text-sm text-muted">
          If it didn&apos;t, email us directly at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-fg underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm text-muted underline underline-offset-4 transition-colors hover:text-fg"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 grid max-w-xl gap-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <Field label="Company" name="company" autoComplete="organization" optional />
      <label className="flex flex-col gap-2">
        <span className="text-sm text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell us a little about your project…"
          className="w-full resize-y rounded-lg border border-line-strong bg-surface px-4 py-3 text-sm text-fg placeholder:text-dim transition-colors focus-visible:border-fg/40 focus-visible:outline-none"
        />
      </label>
      <button
        type="submit"
        className="group mt-2 inline-flex items-center justify-center gap-2.5 justify-self-center rounded-full bg-btn px-6 py-3 text-[0.9375rem] font-medium text-btn-ink transition-opacity duration-200 hover:opacity-90"
      >
        Send message
        <Arrow className="transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  optional,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-muted">
        {label}
        {optional && <span className="text-dim"> (optional)</span>}
      </span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-lg border border-line-strong bg-surface px-4 py-3 text-sm text-fg placeholder:text-dim transition-colors focus-visible:border-fg/40 focus-visible:outline-none"
      />
    </label>
  );
}

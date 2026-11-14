"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { asset } from "@/lib/asset";
import { Arrow } from "./ui";

// Contact form. The site is a static export, so submissions POST to an ASP.NET
// handler (public/api/contact.ashx) that IIS on SmarterASP runs and that sends
// the email over SMTP. Where that handler doesn't exist (next dev, GitHub
// Pages) the request fails and the visitor is offered a mailto fallback.
//
// `detailed` adds phone / service / budget fields (used on /contact).

type Status = "idle" | "sending" | "sent" | "error";

const ENDPOINT = "/api/contact.ashx";

export function ContactForm({
  detailed = false,
  services = [],
}: {
  detailed?: boolean;
  services?: string[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [mailto, setMailto] = useState(`mailto:${siteConfig.email}`);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    setMailto(
      `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        `New project enquiry from ${name}`,
      )}&body=${encodeURIComponent(String(data.get("message") ?? ""))}`,
    );

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(asset(ENDPOINT), {
        method: "POST",
        body: new URLSearchParams(data as unknown as Record<string, string>),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!res.ok || !json?.ok) throw new Error(json?.message || "We couldn't send your message right now.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error && !(err instanceof TypeError) ? err.message : "We couldn't send your message right now.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="mx-auto mt-10 max-w-xl text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-line-strong bg-surface">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-5 text-lg font-medium">Thanks — your message is on its way.</p>
        <p className="mt-2 text-sm text-muted">We usually reply within one business day.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-muted underline underline-offset-4 transition-colors hover:text-fg"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 grid max-w-xl gap-4 text-left" noValidate={false}>
      {/* Honeypot — hidden from people, filled by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required maxLength={100} />
        <Field label="Email" name="email" type="email" autoComplete="email" required maxLength={200} />
      </div>
      {detailed ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company" name="company" autoComplete="organization" optional maxLength={150} />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" optional maxLength={50} />
        </div>
      ) : (
        <Field label="Company" name="company" autoComplete="organization" optional maxLength={150} />
      )}
      {detailed && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Service" name="service" options={services} />
          <Select
            label="Budget"
            name="budget"
            options={["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"]}
          />
        </div>
      )}
      <label className="flex flex-col gap-2">
        <span className="text-sm text-muted">Message</span>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={detailed ? 6 : 4}
          placeholder="Tell us a little about your project…"
          className={inputClass + " resize-y"}
        />
      </label>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-line-strong bg-surface px-4 py-3 text-sm text-muted">
          {error} You can also email us directly at{" "}
          <a href={mailto} className="text-fg underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group mt-2 inline-flex items-center justify-center gap-2.5 justify-self-center rounded-full bg-btn px-6 py-3 text-[0.9375rem] font-medium text-btn-ink transition-opacity duration-200 hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"}
        <Arrow className="transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-line-strong bg-surface px-4 py-3 text-sm text-fg placeholder:text-dim transition-colors focus-visible:border-fg/40 focus-visible:outline-none";

function Label({ label, optional }: { label: string; optional?: boolean }) {
  return (
    <span className="text-sm text-muted">
      {label}
      {optional && <span className="text-dim"> (optional)</span>}
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  optional,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <Label label={label} optional={optional} />
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        className={inputClass}
      />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-2">
      <Label label={label} optional />
      <select name={name} defaultValue="" className={inputClass + " appearance-none"}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

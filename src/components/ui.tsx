import Image from "next/image";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { asset } from "@/lib/asset";

export function Logo({ heightClass = "h-7" }: { heightClass?: string }) {
  return (
    <a href="#home" className="flex items-center gap-2" aria-label={`${siteConfig.name} home`}>
      {siteConfig.logo ? (
        <>
          <Image
            src={asset(siteConfig.logo)}
            alt={siteConfig.name}
            width={336}
            height={100}
            className={`logo-on-dark ${heightClass} w-auto`}
            priority
          />
          {siteConfig.logoLight && (
            <Image
              src={asset(siteConfig.logoLight)}
              alt={siteConfig.name}
              width={322}
              height={100}
              className={`logo-on-light ${heightClass} w-auto`}
              priority
            />
          )}
        </>
      ) : (
        <>
          <svg width="22" height="20" viewBox="0 0 22 20" fill="currentColor" aria-hidden>
            <path d="M11 0l11 20H0L11 0zm0 6.5L5.2 17h11.6L11 6.5z" />
          </svg>
          <span className="text-xl font-semibold tracking-[-0.03em]">{siteConfig.name}</span>
        </>
      )}
    </a>
  );
}

// Text that rolls up to a duplicate on hover of the nearest `.group`.
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-strong bg-bg/60 px-4 py-2 text-sm font-medium backdrop-blur">
      {children}
    </span>
  );
}

// Mixed-type headings: wrap a word in <Serif> for the italic serif accent.
export function Serif({ children }: { children: ReactNode }) {
  return <span className="font-serif font-light italic tracking-[-0.02em]">{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${centered ? "mx-auto items-center text-center" : "items-start"}`}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 className="text-4xl font-semibold leading-[1.05] tracking-h2 text-balance sm:text-5xl md:text-[3.5rem]">
        {title}
      </h2>
      {body && <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{body}</p>}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
}: {
  href: string;
  children: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
}) {
  const styles =
    variant === "primary"
      ? "bg-btn text-btn-ink hover:opacity-90"
      : "border border-line-strong text-fg hover:border-fg/40 hover:bg-fg/[0.04]";
  const sizes = size === "sm" ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-[0.9375rem]";
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${sizes} ${styles}`}
    >
      <Roll>{children}</Roll>
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0 text-fg">
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 px-4 py-24 sm:px-8 md:py-32 ${className}`}>
      <div className="mx-auto max-w-[1376px]">{children}</div>
    </section>
  );
}

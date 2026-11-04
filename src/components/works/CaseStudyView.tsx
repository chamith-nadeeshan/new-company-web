"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/data/content";
import { asset } from "@/lib/asset";
import { Arrow, Serif } from "../ui";
import { RevealText, RevealBlock } from "./CaseMedia";
import { CaseGallery } from "./CaseGallery";

export function CaseStudyView({
  study,
  related,
}: {
  study: CaseStudy;
  related: CaseStudy[];
}) {
  return (
    <article className="pt-32 sm:pt-40">
      {/* ---------- 1. Title + Project Overview ---------- */}
      <section className="mx-auto max-w-[1376px] px-4 sm:px-8">
        <Link
          href="/works"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <Arrow className="rotate-[225deg]" />
          All works
        </Link>

        <RevealText
          as="h1"
          text={study.title}
          className="mt-8 text-[clamp(3rem,12vw,10rem)] font-semibold leading-[0.9] tracking-h1"
          stagger={60}
        />

        <p className="mb-6 mt-12 text-sm uppercase tracking-[0.2em] text-muted">
          Project Overview
        </p>
        {/* Overview paragraph on the left, action buttons on the right. */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <RevealText
            as="p"
            text={study.overview}
            className="max-w-3xl text-balance text-xl font-light leading-[1.4] tracking-h3 sm:text-2xl md:text-[1.75rem]"
            stagger={14}
          />
          <div className="flex shrink-0 flex-wrap gap-3">
            <PillLink href="/works">See all work</PillLink>
            {study.liveUrl && (
              <PillLink href={study.liveUrl} primary external>
                Preview site
              </PillLink>
            )}
          </div>
        </div>
      </section>

      {/* ---------- 2. Metadata row (centered columns with icons) ---------- */}
      <section className="mx-auto max-w-[1376px] px-4 py-14 sm:px-8 sm:py-16">
        <RevealBlock>
          <dl className="grid grid-cols-2 gap-y-10 border-y border-line py-10 sm:grid-cols-4">
            <Meta icon={<IndustryIcon />} label="Industry" value={study.industry} />
            <Meta icon={<ClockIcon />} label="Created" value={study.created} />
            <Meta icon={<PagesIcon />} label="Pages" value={study.pagesCount} />
            <Meta icon={<PlatformIcon />} label="Platform" value={study.platform} />
          </dl>
        </RevealBlock>
      </section>

      {/* ---------- 4. Gallery: full-bleed horizontal carousel ---------- */}
      <section className="pb-24 sm:pb-32">
        <CaseGallery images={study.gallery} title={study.title} />
      </section>

      {/* ---------- 5. Brief / Approach / Outcome ---------- */}
      <section className="mx-auto max-w-[1376px] px-4 sm:px-8">
        <div className="grid gap-x-16 gap-y-14 border-t border-line py-20 md:grid-cols-3 md:py-28">
          <Note index="01" heading="The Brief" body={study.brief} />
          <Note index="02" heading="The Approach" body={study.approach} />
          <Note index="03" heading="The Outcome" body={study.outcome} />
        </div>
      </section>

      {/* ---------- 6. About the project ---------- */}
      <section className="mx-auto max-w-[1376px] px-4 pb-20 sm:px-8 sm:pb-28">
        <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">
            About the project
          </p>
          <RevealText
            as="p"
            text={study.about}
            className="max-w-3xl text-balance text-xl font-light leading-[1.45] tracking-h3 sm:text-2xl"
            stagger={12}
          />
        </div>
      </section>

      {/* ---------- 7. Pages + Features lists ---------- */}
      <section className="mx-auto max-w-[1376px] px-4 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-x-16 gap-y-14 border-y border-line py-14 md:grid-cols-2">
          <ListColumn title="Pages" items={study.pages} />
          <ListColumn title="Features" items={study.features} />
        </div>
      </section>

      {/* ---------- 8. More projects ---------- */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1376px] px-4 pb-24 sm:px-8 sm:pb-32">
          <h2 className="mb-10 text-3xl font-semibold tracking-h2 sm:text-4xl">
            More <Serif>projects</Serif>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/works/${r.slug}`}
                className="cs-card group block"
              >
                <div className="cs-card-media relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-elevated">
                  <Image
                    src={asset(r.cover)}
                    alt={r.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-h3 sm:text-2xl">
                    {r.title}
                  </h3>
                  <span className="shrink-0 text-sm text-dim">{r.created}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{r.category}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="mb-1 text-fg">{icon}</span>
      <dd className="text-lg font-semibold text-fg sm:text-xl">{value}</dd>
      <dt className="text-sm text-muted">{label}</dt>
    </div>
  );
}

/* --- Metadata icons (22px, stroke = currentColor) --- */
function IndustryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 21h18M4 21V10l8-5 8 5v11M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PagesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="8" y="3" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7v12a2 2 0 002 2h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlatformIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Note({
  index,
  heading,
  body,
}: {
  index: string;
  heading: string;
  body: string;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="text-sm text-dim">{index}</span>
        <h2 className="text-xl font-semibold tracking-h3 sm:text-2xl">
          {heading}
        </h2>
      </div>
      <RevealText
        as="p"
        text={body}
        className="text-base leading-relaxed text-muted sm:text-lg"
        stagger={8}
      />
    </div>
  );
}

function ListColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-6 text-sm uppercase tracking-[0.2em] text-muted">{title}</p>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-4 border-b border-line py-4 text-lg tracking-h3 sm:text-xl"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-blue" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PillLink({
  href,
  children,
  primary = false,
  external = false,
}: {
  href: string;
  children: string;
  primary?: boolean;
  external?: boolean;
}) {
  const cls = `group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[0.9375rem] font-medium transition-all duration-200 ease-brand ${
    primary
      ? "border-transparent bg-btn text-btn-ink hover:opacity-90"
      : "border-line-strong text-fg hover:border-fg/40 hover:bg-fg/[0.04]"
  }`;
  const inner = (
    <>
      {children}
      <Arrow className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

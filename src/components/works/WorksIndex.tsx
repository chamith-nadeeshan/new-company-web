"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseStudy } from "@/data/content";
import { asset } from "@/lib/asset";
import { Arrow } from "../ui";

export function WorksIndex({ studies }: { studies: CaseStudy[] }) {
  const [active, setActive] = useState("All");

  // Build the filter row from every tag used, keeping first-seen order.
  const filters = useMemo(() => {
    const seen: string[] = [];
    for (const s of studies)
      for (const t of s.tags) if (!seen.includes(t)) seen.push(t);
    return ["All", ...seen];
  }, [studies]);

  const shown =
    active === "All"
      ? studies
      : studies.filter((s) => s.tags.includes(active));

  return (
    <section className="mx-auto max-w-[1376px] px-4 pb-28 pt-32 sm:px-8 sm:pt-40">
      {/* Centered hero title: "Our" in sans, "Works" in italic serif. */}
      <h1 className="anim-lift text-center text-[clamp(3.5rem,15vw,13rem)] font-semibold leading-[0.9] tracking-h1">
        Our <span className="font-serif font-light italic">Works</span>
      </h1>

      {/* Filter pills */}
      <div className="anim-rise mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3 sm:mt-16">
        {filters.map((f) => {
          const on = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={on}
              className={`rounded-full border px-5 py-2.5 text-[0.9375rem] transition-all duration-200 ease-brand ${
                on
                  ? "border-transparent bg-btn text-btn-ink"
                  : "border-line-strong text-muted hover:border-fg/40 hover:text-fg"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid — remount on filter change so cards re-enter with a stagger. */}
      <div
        key={active}
        className="mt-16 grid gap-6 sm:mt-24 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
      >
        {shown.map((study, i) => (
          <Link
            key={study.slug}
            href={`/works/${study.slug}`}
            className="cs-card group block [animation:hero-rise_0.6s_var(--ease-brand)_backwards]"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="cs-card-media relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-elevated">
              <Image
                src={asset(study.cover)}
                alt={study.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <span className="pointer-events-none absolute right-4 top-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-500 ease-brand group-hover:translate-y-0 group-hover:opacity-100">
                <Arrow />
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-h3 sm:text-2xl">
                {study.title}
              </h2>
              <span className="shrink-0 text-sm text-dim">{study.created}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{study.category}</p>
          </Link>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-24 text-center text-muted">
          No projects in this category yet.
        </p>
      )}
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost } from "@/data/content";
import { asset } from "@/lib/asset";
import { Arrow } from "../ui";

// Gradient cover tiles keyed by `tone` — all within the brand amber, varied so
// adjacent cards read differently. No image assets required.
const TONES = [
  "radial-gradient(120% 120% at 20% 0%, #fcbf72 0%, #f2921e 45%, #b56a12 100%)",
  "radial-gradient(120% 120% at 80% 0%, #fbb457 0%, #d97d16 48%, #6b3d08 100%)",
  "radial-gradient(130% 120% at 50% 0%, #f2921e 0%, #c2721a 50%, #2b1702 100%)",
];

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState("All");

  // Build the filter row from every tag used, keeping first-seen order.
  const filters = useMemo(() => {
    const seen: string[] = [];
    for (const p of posts)
      for (const t of p.tags) if (!seen.includes(t)) seen.push(t);
    return ["All", ...seen];
  }, [posts]);

  const shown =
    active === "All" ? posts : posts.filter((p) => p.tags.includes(active));

  return (
    <section className="mx-auto max-w-[1376px] px-4 pb-28 pt-32 sm:px-8 sm:pt-40">
      {/* Centered hero title: "Our" in sans, "Blog" in italic serif. */}
      <h1 className="anim-lift text-center text-[clamp(3.5rem,15vw,13rem)] font-semibold leading-[0.9] tracking-h1">
        Our <span className="font-serif font-light italic">Blog</span>
      </h1>
      <p className="anim-rise mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted sm:text-lg">
        Notes on design, performance and building the web — straight from the studio.
      </p>

      {/* Filter pills */}
      <div className="anim-rise mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3 sm:mt-14">
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
        className="mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
      >
        {shown.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="cs-card group block [animation:hero-rise_0.6s_var(--ease-brand)_backwards]"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="cs-card-media shine relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              {post.cover ? (
                <Image
                  src={asset(post.cover)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-[center_top] transition-transform duration-700 ease-brand group-hover:scale-105"
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-brand group-hover:scale-105"
                    style={{ background: TONES[post.tone] }}
                  />
                  {/* Dotted stage overlay, matching the service scenes. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1.3px)] [background-size:13px_13px] [mask-image:radial-gradient(120%_95%_at_50%_-5%,#000_0%,transparent_72%)]"
                  />
                </>
              )}
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {post.tags[0]}
              </span>
              <span className="pointer-events-none absolute right-4 top-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-500 ease-brand group-hover:translate-y-0 group-hover:opacity-100">
                <Arrow />
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <time dateTime={post.dateISO}>{post.date}</time>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="mt-2 text-xl font-semibold tracking-h3 sm:text-2xl">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-24 text-center text-muted">
          No posts in this category yet.
        </p>
      )}
    </section>
  );
}

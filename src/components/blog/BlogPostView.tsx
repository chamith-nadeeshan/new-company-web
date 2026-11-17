import Image from "next/image";
import Link from "next/link";
import type { BlogBlock, BlogPost } from "@/data/content";
import { asset } from "@/lib/asset";
import { Reveal } from "../Reveal";
import { Arrow, Serif } from "../ui";

// Gradient cover tiles keyed by `tone` — must match BlogIndex.
const TONES = [
  "radial-gradient(120% 120% at 20% 0%, #fcbf72 0%, #f2921e 45%, #b56a12 100%)",
  "radial-gradient(120% 120% at 80% 0%, #fbb457 0%, #d97d16 48%, #6b3d08 100%)",
  "radial-gradient(130% 120% at 50% 0%, #f2921e 0%, #c2721a 50%, #2b1702 100%)",
];

export function BlogPostView({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  return (
    <article className="pt-32 sm:pt-40">
      {/* ---------- Header ---------- */}
      <header className="mx-auto max-w-3xl px-4 sm:px-8">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <Arrow className="rotate-[225deg]" />
          All posts
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="inline-flex items-center rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-muted">
            {post.tags[0]}
          </span>
          <time dateTime={post.dateISO}>{post.date}</time>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-h1 sm:text-5xl md:text-[3.5rem]">
          {post.title}
        </h1>
        <p className="mt-6 text-balance text-lg font-light leading-relaxed text-muted sm:text-xl">
          {post.excerpt}
        </p>
        <p className="mt-6 text-sm text-muted">By {post.author}</p>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="mx-auto mt-12 max-w-[1100px] px-4 sm:px-8">
        <div className="shine relative aspect-[16/8] overflow-hidden rounded-2xl border border-line">
          {post.cover ? (
            <Image
              src={asset(post.cover)}
              alt={post.title}
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover object-[center_top]"
              priority
            />
          ) : (
            <div className="absolute inset-0" style={{ background: TONES[post.tone] }} />
          )}
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-6">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </div>

      {/* ---------- More posts ---------- */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1376px] px-4 pb-24 sm:px-8 sm:pb-32">
          <h2 className="mb-10 border-t border-line pt-16 text-3xl font-semibold tracking-h2 sm:text-4xl">
            More <Serif>reading</Serif>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="cs-card group block">
                <div className="cs-card-media shine relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                  {r.cover ? (
                    <Image
                      src={asset(r.cover)}
                      alt={r.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-[center_top] transition-transform duration-700 ease-brand group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-brand group-hover:scale-105"
                      style={{ background: TONES[r.tone] }}
                    />
                  )}
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {r.tags[0]}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <time dateTime={r.dateISO}>{r.date}</time>
                  <span aria-hidden>·</span>
                  <span>{r.readTime}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-h3 sm:text-2xl">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-8 text-2xl font-semibold tracking-h2 text-balance sm:text-3xl">
          {block.text}
        </h2>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-blue pl-6 text-xl font-light italic leading-relaxed text-fg-strong sm:text-2xl">
          {block.text}
        </blockquote>
      );

    case "list":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-fg-strong sm:text-lg">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "section":
      return (
        <Reveal className="mt-10">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue text-lg font-bold text-black">
              {block.num}
            </span>
            <h2 className="text-2xl font-semibold tracking-h2 sm:text-3xl">
              {block.title}
            </h2>
          </div>
          <p className="mt-3 font-serif text-xl font-light italic text-accent sm:text-2xl">
            {block.question}
          </p>
        </Reveal>
      );

    case "figure":
      return (
        <Reveal>
          <figure className="my-2">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface p-2 sm:p-3">
              <Image
                src={asset(block.image)}
                alt={block.caption ?? ""}
                width={1600}
                height={1195}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full rounded-xl"
              />
            </div>
            {block.caption && (
              <figcaption className="mt-3 text-center text-sm italic text-muted">
                {block.caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
      );

    case "callout":
      return (
        <div className="rounded-xl border-l-2 border-blue bg-surface px-5 py-4 text-base leading-relaxed text-fg-strong sm:text-lg">
          {block.label && <span className="font-semibold text-fg">{block.label} </span>}
          {block.text}
        </div>
      );

    case "table":
      return (
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full border-collapse text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-line-strong">
                {block.head.map((h, i) => (
                  <th
                    key={h}
                    className={`py-3 pr-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted ${i === block.head.length - 1 ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-b border-line">
                  {row.map((cell, i) => {
                    if (i === 0)
                      return (
                        <td key={i} className="py-4 pr-4 font-medium text-fg">
                          {cell}
                        </td>
                      );
                    if (i === row.length - 1)
                      return (
                        <td key={i} className="py-4 text-right">
                          <span className="inline-flex items-center rounded-full bg-blue/15 px-3 py-1 text-xs font-semibold text-accent">
                            {cell}
                          </span>
                        </td>
                      );
                    return (
                      <td key={i} className="py-4 pr-4 text-fg-strong">
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "steps":
      return (
        <ol className="flex flex-col gap-5">
          {block.items.map((item, i) => (
            <li key={item.lead} className="flex gap-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line-strong text-sm font-semibold text-fg">
                {i + 1}
              </span>
              <p className="text-base leading-relaxed text-fg-strong sm:text-lg">
                <span className="font-semibold text-fg">{item.lead} </span>
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      );

    case "cta":
      return (
        <Reveal>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-line-strong bg-elevated px-6 py-10 shadow-section sm:px-10 sm:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, #f2921e, transparent 70%)" }}
            />
            <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {block.eyebrow}
            </p>
            <h2 className="relative mt-4 text-3xl font-semibold leading-[1.05] tracking-h2 text-balance sm:text-4xl">
              {block.title}
            </h2>
            <div className="relative mt-5 flex flex-col gap-4">
              {block.body.map((p) => (
                <p key={p} className="text-base leading-relaxed text-fg-strong sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
            <Link
              href={block.buttonHref}
              className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3 text-[0.9375rem] font-medium text-btn-ink transition-all duration-200 ease-brand hover:opacity-90"
            >
              {block.buttonLabel}
              <Arrow className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      );

    default:
      return (
        <p className="text-base leading-relaxed text-fg-strong sm:text-lg">{block.text}</p>
      );
  }
}

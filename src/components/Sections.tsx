import Image from "next/image";
import { faqs, posts, pricing, projects, sliderRow1, sliderRow2, stats, techStack } from "@/data/content";
import { asset } from "@/lib/asset";
import {
  siDocker,
  siFigma,
  siFlutter,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { siteConfig } from "@/config/site";
import { Reveal } from "./Reveal";
import { Arrow, Button, Check, Section, SectionHeading, Serif } from "./ui";

type Project = (typeof projects)[number];

// Placeholder project screenshot: gradient canvas with an abstract site layout.
function ProjectShot({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div
      className={`shine relative overflow-hidden rounded-xl ${className}`}
      style={{ background: `linear-gradient(140deg, ${p.from}, ${p.to})` }}
    >
      <div className="absolute inset-[9%] rounded-lg border border-white/25 bg-black/25 p-[5%] backdrop-blur-[2px]">
        <div className="flex items-center justify-between">
          <span className="h-2 w-1/5 rounded-full bg-white/60" />
          <span className="h-3 w-1/6 rounded-full bg-white/80" />
        </div>
        <div className="mt-[12%] h-[10%] w-3/5 rounded bg-white/70" />
        <div className="mt-[4%] h-[6%] w-2/5 rounded bg-white/40" />
        <div className="mt-[10%] grid grid-cols-3 gap-[4%]">
          <div className="aspect-[4/3] rounded bg-white/15" />
          <div className="aspect-[4/3] rounded bg-white/15" />
          <div className="aspect-[4/3] rounded bg-white/15" />
        </div>
      </div>
    </div>
  );
}

// Brand marks from Simple Icons (CC0). AWS isn't in that set (removed at
// Amazon's request), so it falls back to a neutral cloud glyph.
const stackIcons: Record<string, string> = {
  "Next.js": siNextdotjs.path,
  React: siReact.path,
  TypeScript: siTypescript.path,
  "Node.js": siNodedotjs.path,
  Figma: siFigma.path,
  PostgreSQL: siPostgresql.path,
  Flutter: siFlutter.path,
  Docker: siDocker.path,
  "Tailwind CSS": siTailwindcss.path,
};
const cloudGlyph = "M6.5 19a4.5 4.5 0 01-.6-8.96A6 6 0 0117.4 8.6 4.7 4.7 0 0117.5 19h-11z";

export function TechStack() {
  return (
    <section aria-label="Technology stack" className="px-4 py-20 sm:px-8">
      <ul className="mx-auto grid max-w-[880px] grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-3 md:grid-cols-5">
        {techStack.map((t, i) => (
          <li key={t}>
            <Reveal delay={i * 40} className="flex justify-center">
              <span className="flex items-center gap-2.5 text-fg/85 transition-opacity duration-200 hover:text-fg">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-[22px] shrink-0">
                  <path d={stackIcons[t] ?? cloudGlyph} />
                </svg>
                <span className="whitespace-nowrap text-[1.1875rem] font-medium tracking-[-0.02em]">{t}</span>
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Intro() {
  const rows = [sliderRow1, sliderRow2];
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24">
      {/* Drifting real project screenshots */}
      <div aria-hidden className="marquee-wrap flex flex-col gap-3 lg:absolute lg:inset-y-0 lg:left-[34%] lg:right-0 lg:justify-center">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div
              className={`marquee gap-3 pr-3 ${r % 2 ? "marquee-reverse" : ""}`}
              style={{ ["--duration" as string]: `${60 + r * 10}s` }}
            >
              {[...row, ...row].map((s, i) => (
                <div
                  key={`${s.image}-${i}`}
                  className="relative h-[200px] shrink-0 overflow-hidden rounded-xl sm:h-[240px]"
                  style={{ aspectRatio: `${s.w} / ${s.h}` }}
                >
                  <Image src={asset(s.image)} alt="" fill sizes="(max-width: 640px) 360px, 430px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] bg-gradient-to-r from-bg from-55% to-transparent lg:block"
      />

      <div className="relative mx-auto mt-14 max-w-[1376px] px-4 sm:px-8 lg:mt-0 lg:py-24">
        <Reveal className="max-w-[460px]">
          <h2 className="text-[2.25rem] font-semibold leading-[1.1] tracking-h3">
            Design that speaks.
            <br />
            Code that performs.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {siteConfig.name} builds focused digital products that people enjoy using and businesses can rely on. We
            combine thoughtful design with solid engineering to help you launch faster and grow with confidence.
          </p>
          <div className="mt-8 flex gap-2.5">
            <Button href="#services">About Us</Button>
            <Button href="#works" variant="ghost">
              See our work
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <Section className="!py-0">
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`p-8 ${i > 0 ? "border-line lg:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}>
            <Reveal delay={i * 80}>
              <p className="text-4xl font-semibold tracking-h2 sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Works() {
  return (
    <Section id="works">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Works"
            title={
              <>
                Selected <Serif>projects</Serif>
              </>
            }
          />
        </Reveal>
        <Reveal delay={100}>
          <Button href="#contact" variant="ghost">
            Start a project
          </Button>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2">
        {projects.slice(0, 4).map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 120}>
            <a href="#contact" className="group block">
              <div className="rounded-2xl border border-line bg-surface p-3 transition-colors duration-200 group-hover:border-line-strong">
                <ProjectShot p={p} className="aspect-[16/11] transition-transform duration-700 ease-brand group-hover:scale-[0.985]" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-h3">{p.title}</h3>
                  <p className="text-sm text-muted">{p.category}</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-300 ease-brand group-hover:bg-btn group-hover:text-btn-ink">
                  <Arrow />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Pricing() {
  return (
    <Section id="pricing">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title={
            <>
              Clear plans, <Serif>no surprises</Serif>
            </>
          }
          body="Starting prices for typical engagements. Every project gets a fixed quote after discovery."
        />
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {pricing.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 100}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                plan.featured ? "border-line-strong bg-[image:var(--wash)] shadow-section" : "border-line bg-surface"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-btn px-3 py-1 text-xs font-medium text-btn-ink">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-semibold tracking-h3">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.note}</p>
              <p className="mt-8 text-5xl font-semibold tracking-h2">
                {plan.price}
                <span className="ml-2 text-sm font-normal tracking-normal text-muted">starting</span>
              </p>
              <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-8 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-fg-strong">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Button href="#contact" variant={plan.featured ? "primary" : "ghost"}>
                  Get started
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Blog() {
  return (
    <Section id="blog">
      <Reveal>
        <SectionHeading
          eyebrow="Blogs"
          title={
            <>
              Notes from <Serif>the studio</Serif>
            </>
          }
        />
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.title} delay={i * 100}>
            <a href="#" className="group block">
              <div
                className="shine aspect-[16/10] rounded-2xl border border-line transition-transform duration-700 ease-brand group-hover:scale-[0.98]"
                style={{ background: `radial-gradient(circle at 30% 20%, ${post.to}, ${post.from} 70%)` }}
              />
              <div className="mt-5 flex items-center gap-3 text-xs text-muted">
                <span className="rounded-full border border-line-strong px-2.5 py-1">{post.tag}</span>
                <time>{post.date}</time>
              </div>
              <h3 className="mt-3 text-xl font-semibold leading-snug tracking-h3">{post.title}</h3>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionHeading
            eyebrow="FAQs"
            title={
              <>
                Questions, <Serif>answered</Serif>
              </>
            }
            body="Can't find what you need? Send us a message."
          />
        </Reveal>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <details className="group rounded-2xl border border-line bg-surface px-6 transition-colors duration-200 open:border-line-strong">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-h3">
                  {f.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-xl leading-none transition-transform duration-300 ease-brand group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

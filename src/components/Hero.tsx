import { projects } from "@/data/content";
import { siteConfig } from "@/config/site";
import { Badge, Button, Serif } from "./ui";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[150px] sm:pt-[168px]">
      {/* Blue light columns, fading in, with a solid stage behind the copy */}
      <div aria-hidden className="anim-aurora pointer-events-none absolute inset-x-0 top-[68px] h-[1150px]">
        <div className="aurora absolute inset-0" />
        <div className="hero-veil absolute inset-x-[25%] top-0 h-[560px] max-lg:inset-x-[8%]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-8">
        <div className="anim-rise">
          <Badge>Built In Detail</Badge>
        </div>

        <h1
          className="anim-rise mt-7 text-[clamp(2.75rem,8vw,5.75rem)] font-semibold leading-[1.02] tracking-h1"
          style={{ animationDelay: "60ms" }}
        >
          Engineered <Serif>Software</Serif>
          <br />
          <Serif>Built</Serif> to Scale
        </h1>

        <p
          className="anim-rise mt-6 max-w-xl text-lg text-fg-strong sm:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          {siteConfig.tagline}.
        </p>

        <div className="anim-rise mt-8 flex flex-wrap justify-center gap-2.5" style={{ animationDelay: "180ms" }}>
          <Button href="#contact">Get in touch</Button>
          <Button href="#works" variant="ghost">
            See our work
          </Button>
        </div>
      </div>

      <div className="anim-lift relative mx-auto mt-16 max-w-[1376px] px-4 sm:px-8">
        <ProductWindow />
      </div>
    </section>
  );
}

/* An original "project console" mockup: project list, live preview, and quality metrics. */
function ProductWindow() {
  const metrics = [
    { label: "Performance", value: 98 },
    { label: "Accessibility", value: 100 },
    { label: "Best Practices", value: 100 },
    { label: "SEO", value: 99 },
  ];

  return (
    <div className="blue-frame relative overflow-hidden rounded-t-[18px] border-b-0 bg-bg [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="hidden items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted sm:flex">
          <span className="size-1.5 rounded-full bg-[#28c840]" />
          production · deployed 2m ago
        </div>
        <div className="flex -space-x-2">
          {["#0068ad", "#3d3d3d"].map((c) => (
            <span key={c} className="size-7 rounded-full border-2 border-bg" style={{ background: c }} />
          ))}
        </div>
      </div>

      <div className="grid h-[440px] grid-cols-1 md:h-[560px] md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr_280px]">
        {/* Project list */}
        <aside className="hidden flex-col gap-1 border-r border-line p-4 md:flex">
          <div className="mb-3 grid grid-cols-3 rounded-lg bg-surface p-1 text-xs text-muted">
            <span className="rounded-md py-1.5 text-center">Repos</span>
            <span className="rounded-md bg-surface-strong py-1.5 text-center text-fg">Projects</span>
            <span className="rounded-md py-1.5 text-center">Team</span>
          </div>
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                i === 0 ? "bg-blue-700 text-white" : "text-muted"
              }`}
            >
              <span className="size-2 rounded-sm" style={{ background: p.to }} />
              {p.title}
            </div>
          ))}
        </aside>

        {/* Preview */}
        <div className="relative overflow-hidden bg-surface-2 p-5">
          <div
            className="relative h-full overflow-hidden rounded-xl border-2 border-fg/80"
            style={{ background: `linear-gradient(140deg, ${projects[0].from}, ${projects[0].to})` }}
          >
            <div className="flex items-center justify-between px-5 py-4 text-xs text-white/80">
              <span className="font-semibold">Northwind</span>
              <span className="rounded-full bg-white px-3 py-1 font-medium text-black">Sign up</span>
            </div>
            <div className="absolute inset-x-6 bottom-16">
              <p className="text-3xl font-semibold leading-tight tracking-h2 text-white sm:text-5xl">
                Freight, tracked
                <br />
                <span className="font-serif font-light italic">in real time</span>
              </p>
              <div className="mt-5 flex gap-2">
                <span className="h-8 w-28 rounded-full bg-white/90" />
                <span className="h-8 w-24 rounded-full border border-white/50" />
              </div>
            </div>
          </div>

          {/* Floating toolbar */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-line-strong bg-bg/90 p-1.5 backdrop-blur">
            {["M4 4l7 16 2-7 7-2z", "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5", "M4 12h16M12 4v16"].map((d, i) => (
              <span key={d} className={`grid size-9 place-items-center rounded-lg ${i === 0 ? "bg-blue text-white" : "text-fg"}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d={d} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ))}
            <span className="px-2 font-mono text-xs text-muted">v2.4.1</span>
          </div>
        </div>

        {/* Metrics */}
        <aside className="hidden flex-col border-l border-line lg:flex">
          <div className="border-b border-line p-5">
            <p className="text-sm font-semibold">Lighthouse</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-lg border border-line bg-surface p-3">
                  <p className="text-2xl font-semibold tracking-h3 text-[#28c840]">{m.value}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-line p-5">
            <p className="text-sm font-semibold">Pipeline</p>
            <ul className="mt-4 flex flex-col gap-3 text-xs">
              {["Lint & type-check", "Unit tests", "E2E tests", "Deploy"].map((s) => (
                <li key={s} className="flex items-center justify-between text-muted">
                  {s}
                  <span className="rounded-md bg-surface-strong px-2 py-0.5 text-[#28c840]">passed</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5">
            <p className="text-sm font-semibold">Response time</p>
            <div className="mt-4 flex h-16 items-end gap-1">
              {[40, 55, 35, 60, 45, 70, 50, 38, 62, 48, 42, 58].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 origin-bottom rounded-sm bg-blue/70"
                  style={{ height: `${h}%`, animation: `bar-grow 3s ${i * 0.15}s ease-in-out infinite` }}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

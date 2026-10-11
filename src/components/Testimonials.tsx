"use client";

import { useEffect, useRef, useState } from "react";
import type { GeometryCollection, Topology } from "topojson-specification";
import { stats, testimonials } from "@/data/content";

// "120+" → ["120", "+"], "8 yrs" → ["8", "yrs"]
const splitStat = (v: string) => {
  const m = v.match(/^([\d.,]+)\s*(.*)$/);
  return m ? [m[1], m[2]] : [v, ""];
};

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  // Auto-advance; restarts the timer whenever the slide changes or hover ends.
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearTimeout(id);
  }, [count, paused, index]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-8 md:py-32">
      <DotGlobe />

      <div className="relative mx-auto max-w-[1120px]">
        <h2 className="text-center text-[clamp(4rem,12.5vw,11rem)] font-semibold leading-[0.8] tracking-h1">
          Testimonials
        </h2>

        {/* Cards overlap the lower part of the heading; their glass blurs it.
            No Reveal wrapper here: an animated ancestor would stop backdrop-filter
            from seeing the heading behind the cards. */}
        <div className="relative -mt-[clamp(1.5rem,4vw,4.5rem)] grid gap-4 lg:grid-cols-[363fr_741fr]">
          <div className="glass-card flex flex-col justify-center gap-10 p-10">
            {stats.slice(0, 3).map((s) => {
              const [num, suffix] = splitStat(s.value);
              return (
                <div key={s.label}>
                  <p className="text-[3.5rem] font-semibold leading-none tracking-h2">
                    {num}
                    <sup className="ml-1 align-super text-[1.5rem] font-normal text-blue">
                      {suffix}
                    </sup>
                  </p>
                  <p className="mt-3 text-sm text-muted">{s.label}</p>
                </div>
              );
            })}
          </div>

          <figure
            className="glass-card flex min-h-[422px] flex-col p-8 sm:p-11"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <div className="flex items-start justify-between">
              <p className="border-b border-line-strong pb-4 text-sm tabular-nums">
                {String(index + 1).padStart(2, "0")}
                <span className="text-muted">
                  {" "}
                  / {String(count).padStart(2, "0")}
                </span>
              </p>
              <svg
                width="38"
                height="28"
                viewBox="0 0 38 28"
                fill="currentColor"
                aria-hidden
                className="text-dim"
              >
                <path d="M0 0h16v14c0 7.5-4.2 12.6-12 14l-2-4.2c3.8-1.2 5.8-3.6 6-7.8H0V0zm22 0h16v14c0 7.5-4.2 12.6-12 14l-2-4.2c3.8-1.2 5.8-3.6 6-7.8h-8V0z" />
              </svg>
            </div>

            <div
              className="mt-6 flex gap-1.5 text-[#ffb840]"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
              ))}
            </div>

            <blockquote
              key={`q-${index}`}
              className="my-auto animate-[quote-in_0.6s_var(--ease-brand)] py-8 text-xl font-medium leading-[1.45] tracking-[-0.01em] sm:text-2xl"
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <figcaption className="flex items-center justify-between gap-4">
              <div
                key={`a-${index}`}
                className="flex animate-[quote-in_0.6s_var(--ease-brand)] items-center gap-4"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong bg-surface-strong font-medium">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-medium uppercase tracking-wide">
                    {t.name}
                  </span>
                  <span className="block text-sm text-muted">{t.role}</span>
                </span>
              </div>
              <div className="flex shrink-0 gap-2">
                <NavButton
                  label="Previous testimonial"
                  onClick={() => setIndex((index - 1 + count) % count)}
                  flip
                />
                <NavButton
                  label="Next testimonial"
                  onClick={() => setIndex((index + 1) % count)}
                />
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function NavButton({
  label,
  onClick,
  flip,
}: {
  label: string;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border border-line-strong transition-colors duration-200 ease-brand hover:bg-fg hover:text-bg"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className={flip ? "rotate-180" : ""}
      >
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* Slowly rotating dotted Earth. Land comes from Natural Earth (public domain)
   via world-atlas: the land shapes are rasterised once to a small equirectangular
   mask, then every point of an even lat/lon grid that falls on land becomes a dot. */
function DotGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DEG = Math.PI / 180;
    const TILT = 22 * DEG;
    let points: { lat: number; lon: number }[] = [];
    let raf = 0;
    let visible = false;
    let cancelled = false;
    let size = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const rot = -1.9 + time * 0.00005; // start with Europe/Africa facing the viewer
      const r = size / 2 - 4;
      const cx = size / 2;
      const light = document.documentElement.dataset.theme === "light";
      const rgb = light ? "0,0,0" : "255,255,255";
      ctx.clearRect(0, 0, size, size);

      // Faint sphere body so the globe reads as a ball, not floating dots.
      const body = ctx.createRadialGradient(cx - r * 0.3, cx - r * 0.35, r * 0.1, cx, cx, r);
      body.addColorStop(0, `rgba(${rgb},0.07)`);
      body.addColorStop(1, `rgba(${rgb},0.01)`);
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cx, r, 0, Math.PI * 2);
      ctx.fill();

      for (const p of points) {
        const lon = p.lon + rot;
        const x = Math.cos(p.lat) * Math.sin(lon);
        const y0 = Math.sin(p.lat);
        const z0 = Math.cos(p.lat) * Math.cos(lon);
        const y = y0 * Math.cos(TILT) - z0 * Math.sin(TILT);
        const z = y0 * Math.sin(TILT) + z0 * Math.cos(TILT);
        if (z <= 0.02) continue;
        const alpha = (light ? 0.5 : 0.9) * (0.15 + 0.85 * z);
        const d = 0.9 + 1.5 * z;
        ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
        ctx.fillRect(cx + x * r - d / 2, cx - y * r - d / 2, d, d);
      }
      if (visible && !reduceMotion) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (visible && points.length) raf = requestAnimationFrame(draw);
    };

    // Build the land mask off the critical path (map data is loaded lazily).
    (async () => {
      const [{ default: topology }, { feature }, { geoEquirectangular, geoPath }] = await Promise.all([
        import("world-atlas/land-110m.json"),
        import("topojson-client"),
        import("d3-geo"),
      ]);
      if (cancelled) return;
      const W = 720;
      const H = 360;
      const mask = document.createElement("canvas");
      mask.width = W;
      mask.height = H;
      const mctx = mask.getContext("2d", { willReadFrequently: true });
      if (!mctx) return;
      const topo = topology as unknown as Topology<{ land: GeometryCollection }>;
      const land = feature(topo, topo.objects.land);
      const projection = geoEquirectangular().translate([W / 2, H / 2]).scale(W / (2 * Math.PI));
      mctx.fillStyle = "#000";
      mctx.beginPath();
      geoPath(projection, mctx)(land);
      mctx.fill();
      const pixels = mctx.getImageData(0, 0, W, H).data;
      const onLand = (latD: number, lonD: number) => {
        const px = Math.min(W - 1, Math.floor(((lonD + 180) / 360) * W));
        const py = Math.min(H - 1, Math.floor(((90 - latD) / 180) * H));
        return pixels[(py * W + px) * 4 + 3] > 128;
      };

      const STEP = 1.7; // degrees between dots
      const next: typeof points = [];
      for (let latD = -80; latD <= 82; latD += STEP) {
        const lonStep = STEP / Math.max(Math.cos(latD * DEG), 0.15);
        for (let lonD = -180; lonD < 180; lonD += lonStep) {
          if (onLand(latD, lonD)) next.push({ lat: latD * DEG, lon: lonD * DEG });
        }
      }
      points = next;
      draw(0);
      start();
    })();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);
    resize();
    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[2%] aspect-square w-[min(780px,125vw)] -translate-x-1/2"
    />
  );
}

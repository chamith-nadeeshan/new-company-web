"use client";

import { useEffect, useRef } from "react";
// Brand marks from Simple Icons (CC0).
import {
  siFirebase,
  siGooglecloud,
  siShopify,
  siStripe,
  siSupabase,
  siVercel,
  siWebflow,
  siWordpress,
} from "simple-icons";
import { platforms } from "@/data/content";
import { Reveal } from "./Reveal";
import { DotField } from "./ServicesGrid";

const logos: Record<string, string> = {
  Vercel: siVercel.path,
  "Google Cloud": siGooglecloud.path,
  Shopify: siShopify.path,
  WordPress: siWordpress.path,
  Webflow: siWebflow.path,
  Stripe: siStripe.path,
  Firebase: siFirebase.path,
  Supabase: siSupabase.path,
};

export function PlatformsGrid() {
  return (
    <section aria-label="Platforms" className="px-4 pb-24 sm:px-8 md:pb-32">
      <div className="mx-auto grid max-w-[1376px] items-stretch gap-5 lg:grid-cols-[1fr_1fr]">
        {/* Copy over an animated starfield */}
        <Reveal className="relative flex min-h-[300px] items-center overflow-hidden rounded-2xl bg-black text-white">
          <Starfield />
          <div className="relative px-6 py-14 sm:px-16">
            <h2 className="text-[2rem] font-semibold leading-[1.12] tracking-h3 sm:text-[2.5rem]">
              Any platform.
              <br />
              One standard of quality.
            </h2>
            <p className="mt-4 max-w-[520px] text-lg leading-[1.65] text-white/60">
              Whatever stack your product runs on, our work stays{" "}
              <span className="text-white">fast</span>,{" "}
              <span className="text-white">secure</span>,{" "}
              <span className="text-white">accessible</span> and easy to
              maintain.
            </p>
            <a
              href="#works"
              className="group mt-7 inline-flex items-center rounded-lg bg-white/12 px-4 py-2.5 text-[0.9375rem] font-medium text-white transition-colors duration-200 ease-brand hover:bg-white/20"
            >
              <span className="roll">
                <span>See our work</span>
                <span aria-hidden>See our work</span>
              </span>
            </a>
          </div>
        </Reveal>

        {/* Logo grid with shared inner dividers */}
        <Reveal delay={100}>
          <ul className="grid h-full grid-cols-2 overflow-hidden rounded-2xl border border-line-strong sm:grid-cols-4 lg:grid-rows-2">
            {platforms.map((name, i) => (
              <li
                key={name}
                data-dots-host
                className={`group relative grid aspect-square place-items-center border-line-strong sm:aspect-[11/10] lg:aspect-auto ${
                  i % 4 !== 0 ? "sm:border-l" : ""
                } ${i % 2 !== 0 ? "max-sm:border-l" : ""} ${i >= 4 ? "sm:border-t" : ""} ${i >= 2 ? "max-sm:border-t" : ""}`}
              >
                <DotField />
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="img"
                  aria-label={name}
                  className="relative size-[34px] text-fg opacity-75 transition-opacity duration-500 ease-brand group-hover:opacity-100 sm:size-[50px]"
                >
                  <path d={logos[name]} />
                </svg>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* Procedural Milky Way: a soft dust band with darker lanes and a dense core of
   stars is rendered once to an offscreen canvas; each frame pans it slowly and
   twinkles a layer of brighter stars on top. */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const PAN = 40; // px of slack on each side so drifting stars wrap off-screen
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let visible = false;
    let slope = 0; // band slope, so stars travel along it
    let sky: HTMLCanvasElement | null = null;
    let twinklers: {
      x: number;
      y: number;
      r: number;
      phase: number;
      speed: number;
      glow: boolean;
      vx: number; // continuous drift (px/s) along the band
      vy: number;
    }[] = [];

    const gauss = () =>
      (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;

    // Position on the diagonal band: t along it (0..1), d across it (in band widths).
    const onBand = (t: number, d: number, bw: number, bh: number) => {
      const angle = Math.atan2(-bh * 0.55, bw);
      const cx = bw * (-0.1 + t * 1.2);
      const cy = bh * 0.8 + (cx - bw * -0.1) * Math.tan(angle);
      const nx = -Math.sin(angle);
      const ny = Math.cos(angle);
      const width = bh * 0.2;
      return [cx + nx * d * width, cy + ny * d * width] as const;
    };

    const buildSky = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const sw = w + PAN * 2;
      const off = document.createElement("canvas");
      off.width = sw * dpr;
      off.height = h * dpr;
      const g = off.getContext("2d");
      if (!g) return null;
      g.scale(dpr, dpr);

      // Dust clouds: cool blue-white near the core, warmer at the edges.
      for (let i = 0; i < 260; i++) {
        const d = gauss() * 1.2;
        const [x, y] = onBand(Math.random(), d, sw, h);
        const r = 30 + Math.random() * 90;
        const warm = Math.abs(d) > 0.7 || Math.random() < 0.25;
        const grad = g.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(
          0,
          warm ? "rgba(150,115,90,0.045)" : "rgba(165,180,225,0.06)",
        );
        grad.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = grad;
        g.fillRect(x - r, y - r, r * 2, r * 2);
      }

      // Dark dust lanes cut through the middle of the band.
      g.globalCompositeOperation = "destination-out";
      for (let i = 0; i < 70; i++) {
        const [x, y] = onBand(Math.random(), gauss() * 0.35, sw, h);
        const r = 12 + Math.random() * 38;
        const grad = g.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, "rgba(0,0,0,0.5)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = grad;
        g.fillRect(x - r, y - r, r * 2, r * 2);
      }
      g.globalCompositeOperation = "source-over";

      // Thousands of faint stars, densest along the band.
      const dense = Math.round((sw * h) / 120);
      for (let i = 0; i < dense; i++) {
        const inBand = i % 4 !== 0;
        const [x, y] = inBand
          ? onBand(Math.random(), gauss() * 1.1, sw, h)
          : [Math.random() * sw, Math.random() * h];
        const a = 0.15 + Math.random() * (inBand ? 0.45 : 0.35);
        g.fillStyle = `rgba(${Math.random() < 0.2 ? "200,215,255" : "255,255,255"},${a.toFixed(2)})`;
        g.fillRect(
          x,
          y,
          Math.random() < 0.9 ? 0.7 : 1.1,
          Math.random() < 0.9 ? 0.7 : 1.1,
        );
      }
      return off;
    };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sky = buildSky();
      // Stars drift along the band; deeper (slower) ones give parallax.
      slope = Math.tan(Math.atan2(-h * 0.55, w + PAN * 2));
      twinklers = Array.from({ length: Math.round((w * h) / 2100) }, () => {
        const sp = 5 + Math.random() * 22; // px/s
        return {
          x: Math.random() * (w + PAN * 2),
          y: Math.random() * h,
          r: 0.5 + Math.random() * 0.8,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 2.2,
          glow: Math.random() < 0.06,
          vx: -sp,
          vy: -sp * slope,
        };
      });
    };

    const skyW = () => w + PAN * 2;

    const draw = (time: number) => {
      const t = time / 1000;
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      ctx.clearRect(0, 0, w, h);

      // Dust cloud: one draw, gently oscillating within the PAN slack so its
      // edges never pull into view — no seam. The moving stars carry the motion.
      const pan = Math.sin(t * 0.05) * PAN * 0.6;
      if (sky) ctx.drawImage(sky, -PAN + pan, 0, skyW(), h);

      // Stars travel along the band (parallax by speed) and wrap around.
      const sw = skyW();
      for (const s of twinklers) {
        if (dt) {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          if (s.x < 0) s.x += sw;
          else if (s.x > sw) s.x -= sw;
          if (s.y < 0) s.y += h;
          else if (s.y > h) s.y -= h;
        }
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        const x = s.x - PAN;
        if (s.glow) {
          const g = ctx.createRadialGradient(x, s.y, 0, x, s.y, 6);
          g.addColorStop(0, `rgba(255,255,255,${(0.9 * tw).toFixed(3)})`);
          g.addColorStop(0.3, `rgba(200,220,255,${(0.25 * tw).toFixed(3)})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.fillRect(x - 6, s.y - 6, 12, 12);
        } else {
          ctx.fillStyle = `rgba(255,255,255,${(0.8 * tw).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (visible && !reduceMotion) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      last = 0; // avoid a huge dt jump after being paused off-screen
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    setup();
    draw(0);
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setup();
        draw(performance.now());
      }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_95%_100%_at_45%_50%,black_60%,transparent_100%)]"
    />
  );
}

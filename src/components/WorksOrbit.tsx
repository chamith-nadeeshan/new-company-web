"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { showcase } from "@/data/content";
import { asset } from "@/lib/asset";
import { Button } from "./ui";

type Card = (typeof showcase)[number];

// Spread cards evenly over a sphere (golden-angle spiral), as lon/lat in degrees.
// Latitude is squashed so cards stay near the equator band, like a planet ring.
const placements = showcase.map((_, i) => {
  const n = showcase.length;
  const y = 1 - ((i + 0.5) / n) * 2;
  const lat = Math.asin(y) * (180 / Math.PI) * 0.55;
  const lon = (i * 137.508) % 360;
  return { lat, lon };
});

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export function WorksOrbit() {
  const roomRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll-driven sphere rotation with eased (inertial) follow.
  // Per frame we only write transforms and opacities (compositor-only properties);
  // card positions are static and set on mount/resize.
  useEffect(() => {
    const room = roomRef.current;
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (!room || !stage || !scene) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let target = 0;
    let current = 0;
    let raf = 0;
    let last = 0;
    const shadeLevels = placements.map(() => -1);

    const readProgress = () => {
      const rect = room.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      target = clamp(-rect.top / travel);
    };

    const placeCards = () => {
      const radius = clamp(window.innerWidth * 0.42, 250, 620);
      placements.forEach(({ lat, lon }, i) => {
        const el = cardRefs.current[i];
        if (el) {
          el.style.transform = `rotateY(${lon}deg) rotateX(${lat}deg) translateZ(${radius}px)`;
        }
      });
    };

    const apply = (p: number) => {
      // Enter: grow from a distant sphere; then rotate ~1.25 turns while tilting.
      const enter = clamp(p / 0.18);
      const scale = 0.55 + 0.45 * (1 - Math.pow(1 - enter, 3));
      const spin = -40 + p * 450;
      const tilt = 14 - p * 22;

      stage.style.transform = `scale(${scale.toFixed(4)})`;
      stage.style.opacity = (0.2 + 0.8 * enter).toFixed(3);
      scene.style.transform = `rotateX(${tilt.toFixed(3)}deg) rotateY(${spin.toFixed(3)}deg)`;

      // Darken cards on the far side via an overlay's opacity (no filter repaints).
      placements.forEach(({ lat, lon }, i) => {
        const facing =
          Math.cos(((lon + spin) * Math.PI) / 180) *
          Math.cos((lat * Math.PI) / 180);
        const shade = Math.round((1 - clamp((facing + 1) / 2)) * 0.65 * 100) / 100;
        if (shade !== shadeLevels[i]) {
          shadeLevels[i] = shade;
          const el = shadeRefs.current[i];
          if (el) el.style.opacity = String(shade);
        }
      });
    };

    // Frame-rate independent exponential smoothing; stops once settled.
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      current += (target - current) * (reduceMotion ? 1 : 1 - Math.exp(-dt * 7));
      if (Math.abs(target - current) < 0.00005) current = target;
      apply(current);
      if (current !== target) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        last = 0;
      }
    };

    const kick = () => {
      readProgress();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      placeCards();
      kick();
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    placeCards();
    readProgress();
    current = target;
    apply(current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Flowing blue light lines behind the sphere.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf = 0;
    let visible = false;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const lines = Array.from({ length: 7 }, (_, i) => ({
      base: 0.12 + i * 0.13,
      amp: 0.08 + (i % 3) * 0.04,
      freq: 1.2 + (i % 4) * 0.45,
      speed: 0.12 + (i % 3) * 0.06,
      phase: i * 1.7,
    }));

    const draw = (time: number) => {
      const t = time / 1000;
      const light = document.documentElement.dataset.theme === "light";
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";

      lines.forEach((l, i) => {
        const alpha = light ? 0.18 + (i % 2) * 0.08 : 0.35 + (i % 2) * 0.2;
        const rgb = light ? "194,114,26" : "242,146,30";
        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += 12) {
          const u = x / w;
          const y =
            h * l.base +
            Math.sin(u * Math.PI * l.freq + t * l.speed + l.phase) * h * l.amp +
            Math.sin(u * Math.PI * l.freq * 2.3 - t * l.speed * 1.4) *
              h *
              l.amp *
              0.35;
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Wide faint stroke for the glow, then the thin core line.
        ctx.lineWidth = 7;
        ctx.strokeStyle = `rgba(${rgb},${(alpha * 0.18).toFixed(3)})`;
        ctx.stroke();
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = `rgba(${rgb},${alpha})`;
        ctx.stroke();
      });

      if (visible && !reduceMotion) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="works"
      ref={roomRef}
      className="relative h-[420vh] scroll-mt-0"
      aria-label="Our works"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 size-full"
        />
        {/* Grain + edge fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--bg)_85%)]"
        />

        <div className="absolute inset-0 grid place-items-center [perspective:1600px]">
          {/* Stage only scales; the heading sits in it at z=0 facing the viewer, so
              cards on the rotating sphere pass in front of and behind it. */}
          <div
            ref={stageRef}
            className="relative size-0 [transform-style:preserve-3d] will-change-transform"
          >
            <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(3.5rem,14vw,13rem)] font-semibold leading-none tracking-h1">
              Our <span className="font-serif font-light italic">Works</span>
            </h2>

            <div
              ref={sceneRef}
              className="absolute left-0 top-0 [transform-style:preserve-3d] will-change-transform"
            >
              {showcase.map((card, i) => (
                <div
                  key={card.brand}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute left-0 top-0 -ml-[80px] -mt-[50px] h-[100px] w-[160px] sm:-ml-[160px] sm:-mt-[100px] sm:h-[200px] sm:w-[320px]"
                >
                  <ShowcaseCard card={card} />
                  <div
                    ref={(el) => {
                      shadeRefs.current[i] = el;
                    }}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl bg-black opacity-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-10 flex justify-center">
          <Button href="#contact">Start your project</Button>
        </div>
      </div>
    </section>
  );
}

/* A mini website mock: nav bar, headline, hero photo. Visible from both sides like a sheet of glass. */
function ShowcaseCard({ card }: { card: Card }) {
  const dark = card.theme === "dark";
  return (
    <div
      className={`flex size-full flex-col overflow-hidden rounded-xl border p-2 shadow-[0_30px_60px_-20px_#000] sm:p-3 ${
        dark
          ? "border-white/15 bg-[#111] text-white"
          : "border-black/10 bg-[#f7f5f0] text-black"
      }`}
    >
      <div className="flex items-center justify-between text-[6px] sm:text-[8px]">
        <span className="font-semibold">{card.brand}.</span>
        <span className="flex gap-2 opacity-60">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </span>
        <span
          className={`rounded-full px-1.5 py-0.5 ${dark ? "bg-white text-black" : "bg-black text-white"}`}
        >
          Book
        </span>
      </div>
      <p className="mt-1.5 text-[10px] font-semibold leading-tight tracking-tight sm:mt-2 sm:text-[15px]">
        {card.headline}
      </p>
      <div className="relative mt-1.5 flex-1 overflow-hidden rounded-md sm:mt-2">
        <Image
          src={asset(card.image)}
          alt=""
          fill
          sizes="320px"
          loading="eager"
          className="object-cover"
        />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
// Font Awesome Free icons — CC BY 4.0, https://fontawesome.com/license/free
import {
  faBolt,
  faCartShopping,
  faCloud,
  faCode,
  faGlobe,
  faMobileScreenButton,
  faPenNib,
  faPuzzlePiece,
  faRocket,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { services } from "@/data/content";
import { Reveal } from "./Reveal";
import { RobotFollower } from "./RobotFollower";
import { Button } from "./ui";

// One icon per service, same order as `services`.
const icons: IconDefinition[] = [
  faGlobe,
  faCode,
  faMobileScreenButton,
  faCartShopping,
  faPenNib,
  faCloud,
  faPuzzlePiece,
  faBolt,
  faRocket,
  faScrewdriverWrench,
];

function Icon({ icon }: { icon: IconDefinition }) {
  const [w, h, , , path] = icon.icon;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      fill="currentColor"
      aria-hidden
      className="size-7 shrink-0 text-fg"
    >
      {(Array.isArray(path) ? path : [path]).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function ServiceCard({
  s,
  i,
}: {
  s: (typeof services)[number];
  i: number;
}) {
  return (
    <Reveal delay={(i % 5) * 60}>
      <a href="#contact" data-dots-host className="svc-card group">
        <DotField />
        <span aria-hidden className="svc-beam" />
        <span aria-hidden className="svc-beam svc-beam-b" />
        <span className="relative flex flex-col items-center gap-[21px]">
          <Icon icon={icons[i]} />
          <span className="whitespace-pre-line text-center text-[16px] leading-[21px] text-dim transition-colors duration-300 ease-brand group-hover:text-fg">
            {s.label}
          </span>
        </span>
      </a>
    </Reveal>
  );
}

export function ServicesGrid() {
  return (
    <section id="services" className="scroll-mt-24 px-4 pb-5 pt-24 sm:px-8 md:pt-32">
      <div className="mx-auto max-w-[1376px]">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-[2.75rem] font-semibold leading-[1.02] tracking-h2 sm:text-6xl md:text-[4rem]">
            Software that
            <br />
            moves you forward.
          </h2>
          <div className="flex shrink-0 gap-3">
            <Button href="#pricing">View all services</Button>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center rounded-full bg-surface-strong px-5 py-2.5 text-[0.9375rem] font-medium text-fg transition-colors duration-200 ease-brand hover:bg-line-strong"
            >
              <span className="roll">
                <span>Start a project</span>
                <span aria-hidden>Start a project</span>
              </span>
            </a>
          </div>
        </Reveal>

        {/* Below xl: the original responsive grid (no room for the robot beside
            it, so it's omitted here). */}
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:hidden">
          {services.map((s, i) => (
            <li key={s.title}>
              <ServiceCard s={s} i={i} />
            </li>
          ))}
        </ul>

        {/* xl+: six cards | robot | four cards. The robot has its own centre
            column so it never overlaps a card. The 3fr / 2fr weights keep every
            card the same square size across both groups. */}
        <div className="mt-12 hidden items-center gap-3 xl:flex">
          <ul className="grid grid-cols-3 gap-3" style={{ flex: "3 1 0" }}>
            {services.slice(0, 6).map((s, i) => (
              <li key={s.title}>
                <ServiceCard s={s} i={i} />
              </li>
            ))}
          </ul>

          <div
            aria-hidden
            className="flex w-[clamp(200px,17vw,280px)] shrink-0 justify-center"
          >
            <RobotFollower className="h-[clamp(260px,22vw,380px)] [aspect-ratio:480/853]" />
          </div>

          <ul className="grid grid-cols-2 gap-3" style={{ flex: "2 1 0" }}>
            {services.slice(6).map((s, i) => (
              <li key={s.title}>
                <ServiceCard s={s} i={i + 6} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Twinkling grid of tiny square dots, drawn only while its [data-dots-host]
   ancestor is hovered. */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = canvas?.closest<HTMLElement>("[data-dots-host]");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !card || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const PITCH = 7;
    const SIZE = 1.6;
    let dots: {
      x: number;
      y: number;
      phase: number;
      speed: number;
      blue: boolean;
      fade: number;
    }[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = PITCH / 2; y < h; y += PITCH) {
        for (let x = PITCH / 2; x < w; x += PITCH) {
          // Quieter towards the centre so the icon and label stay readable.
          const dx = (x - w / 2) / (w / 2);
          const dy = (y - h / 2) / (h / 2);
          const fade = Math.min(1, 0.25 + Math.hypot(dx, dy) * 0.85);
          dots.push({
            x,
            y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.6 + Math.random() * 2.4,
            blue: Math.random() < 0.18,
            fade,
          });
        }
      }
    };

    const light = () => document.documentElement.dataset.theme === "light";

    const draw = (time: number) => {
      const t = time / 1000;
      const isLight = light();
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * d.speed + d.phase);
        const a = (0.08 + twinkle * twinkle * 0.62) * d.fade;
        ctx.fillStyle = d.blue
          ? `rgba(${isLight ? "194,114,26" : "242,146,30"},${a.toFixed(3)})`
          : `rgba(${isLight ? "0,0,0" : "255,255,255"},${(a * (isLight ? 0.5 : 0.75)).toFixed(3)})`;
        ctx.fillRect(d.x - SIZE / 2, d.y - SIZE / 2, SIZE, SIZE);
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!dots.length || canvas.clientWidth !== w) setup();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    // Keep drawing through the fade-out, then stop.
    const stop = () => {
      window.setTimeout(() => {
        if (!card.matches(":hover")) cancelAnimationFrame(raf);
      }, 500);
    };

    card.addEventListener("pointerenter", start);
    card.addEventListener("pointerleave", stop);
    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerenter", start);
      card.removeEventListener("pointerleave", stop);
    };
  }, []);

  return (
    <span aria-hidden className="svc-dots">
      <canvas ref={canvasRef} className="size-full" />
    </span>
  );
}

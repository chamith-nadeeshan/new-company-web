"use client";

import { useEffect, useRef } from "react";

// Flowing, glowing light-ribbon streaks drifting across a dark page — the brand
// (orange) take on Visuvate's blue canvas background.
//
// Performance notes: the canvas is FIXED and only viewport-sized (not the full
// scrollable page), rendered at DPR 1, throttled to ~30fps, and uses NO
// `shadowBlur` (the expensive part). The glow comes from a GPU-cheap CSS
// `blur()` filter applied to the whole element instead.
export function AuroraStreaks({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const root = getComputedStyle(document.documentElement);
    const c1 = root.getPropertyValue("--color-blue").trim() || "#f2921e";
    const c2 = root.getPropertyValue("--color-blue-300").trim() || "#fbb457";

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;

    const ribbons = Array.from({ length: 11 }, (_, i) => ({
      amp: 70 + (i % 4) * 55,
      freq: 0.0015 + (i % 4) * 0.0007,
      speed: 0.00016 + (i % 3) * 0.00007,
      phase: i * 1.37,
      offset: (i + 0.5) / 11,
      tilt: (i % 2 === 0 ? 1 : -1) * (0.16 + (i % 3) * 0.06),
      width: 1.4 + (i % 3) * 0.9,
      color: i % 3 === 0 ? c2 : c1,
      alpha: 0.4 + (i % 3) * 0.12,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      // DPR 1 is plenty — the whole layer is blurred anyway.
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (const r of ribbons) {
        const baseY = r.offset * h;
        const steps = 40;
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * (w + 240) - 120;
          const y =
            baseY +
            (x - w / 2) * r.tilt +
            Math.sin(x * r.freq + r.phase + t * r.speed) * r.amp +
            Math.sin(x * r.freq * 0.5 + t * r.speed * 1.7) * (r.amp * 0.4);
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Soft band
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.alpha * 0.4;
        ctx.lineWidth = r.width * 3.5;
        ctx.stroke();
        // Bright core
        ctx.globalAlpha = Math.min(1, r.alpha * 2);
        ctx.lineWidth = r.width * 0.9;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    if (reduce) {
      draw(0);
      window.removeEventListener("resize", resize);
      // Keep resize responsive even when static.
      window.addEventListener("resize", () => {
        resize();
        draw(0);
      });
      return () => window.removeEventListener("resize", resize);
    }

    let raf = 0;
    let last = 0;
    const FRAME = 1000 / 30; // cap at 30fps
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME) return;
      last = now;
      draw(now);
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}

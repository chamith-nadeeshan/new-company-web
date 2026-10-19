"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

// Frames in /public/robot-frames are a single monotonic head sweep extracted
// from robot.mp4: 000 looks to the viewer's left, ~024 faces front, 047 looks
// to the viewer's right. We map the pointer's horizontal angle to a frame and
// ease toward it each rAF so the head turn stays smooth.
const FRAME_COUNT = 48;
const CENTER = 0.5; // normalized position where the robot faces front
const EASE = 0.17; // per-frame approach factor (lower = smoother/slower)

const frameSrc = (i: number) =>
  asset(`/robot-frames/${String(i).padStart(3, "0")}.webp`);

export function RobotFollower({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Preload every frame up front (~0.7 MB total).
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const im = new Image();
      im.decoding = "async";
      im.src = frameSrc(i);
      im.onload = () => render(current);
      imgs[i] = im;
    }

    let w = 0;
    let h = 0;
    let target = CENTER;
    let current = CENTER;
    let raf = 0;
    let lastDrawn = -1;

    const render = (t: number) => {
      const idx = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(t * (FRAME_COUNT - 1))),
      );
      const im = imgs[idx];
      if (!im || !im.complete || !im.naturalWidth) return;
      if (idx === lastDrawn) return;
      lastDrawn = idx;
      ctx.clearRect(0, 0, w, h);
      // object-contain: fit the frame inside the canvas, centered.
      const ir = im.naturalWidth / im.naturalHeight;
      const cr = w / h;
      let dw: number;
      let dh: number;
      if (ir > cr) {
        dw = w;
        dh = w / ir;
      } else {
        dh = h;
        dw = h * ir;
      }
      ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawn = -1;
      render(current);
    };

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.0006) current = target;
      render(current);
      raf = current !== target ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      // The head sits in the upper third of the frame — aim from there so the
      // robot genuinely looks *at* the pointer rather than at its own feet.
      const headX = rect.left + rect.width / 2;
      const headY = rect.top + rect.height * 0.3;
      const dx = e.clientX - headX;
      const dy = e.clientY - headY;
      // Horizontal angle to the pointer. Depth grows with vertical distance, so a
      // pointer directly above/below reads as "facing front", and one off to the
      // side reads as a full turn — the head reaches its extreme ~one body-height
      // away. atan2 keeps it symmetric left/right.
      const depth = Math.max(rect.height * 0.55, Math.abs(dy) * 0.9, 90);
      const angle = Math.atan2(dx, depth); // radians, +right / -left
      const MAX_TURN = 0.82; // ~47°, maps to the sweep extremes
      const n = Math.max(-1, Math.min(1, angle / MAX_TURN));
      // Pointer left (n<0) must turn the head toward the viewer's left. In this
      // sweep that is the *high* frame index, so invert: front at 0.5.
      target = CENTER - n * 0.5;
      if (reduceMotion) {
        current = target;
        render(current);
      } else {
        kick();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

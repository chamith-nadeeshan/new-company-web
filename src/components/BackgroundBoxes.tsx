"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

// Rounded squares scattered across the hero that float around, bounce off the
// edges and knock into each other. Start positions are fixed (not random) so
// SSR and client match. left/top in %, size in px (scaled by --box-scale),
// vx/vy in px/s. `mobile` marks the subset kept on phones.
// A rAF loop handles the motion/collisions; anime.js plays the impact "bump".
const BOXES: { left: number; top: number; size: number; vx: number; vy: number; mobile?: boolean }[] = [
  { left: 6, top: 14, size: 150, vx: 18, vy: 12, mobile: true },
  { left: 2, top: 58, size: 95, vx: 22, vy: -16 },
  { left: 14, top: 78, size: 120, vx: -14, vy: -18, mobile: true },
  { left: 22, top: 34, size: 70, vx: 26, vy: 20 },
  { left: 30, top: 66, size: 90, vx: -20, vy: 14 },
  { left: 44, top: 8, size: 80, vx: 16, vy: 24 },
  { left: 40, top: 86, size: 110, vx: 18, vy: -14, mobile: true },
  { left: 60, top: 12, size: 72, vx: -24, vy: 18 },
  { left: 56, top: 72, size: 64, vx: 20, vy: 22 },
  { left: 72, top: 40, size: 130, vx: -16, vy: -12 },
  { left: 82, top: 10, size: 100, vx: 14, vy: 18, mobile: true },
  { left: 88, top: 50, size: 160, vx: -12, vy: 16, mobile: true },
  { left: 90, top: 82, size: 90, vx: 18, vy: -20 },
  { left: 68, top: 88, size: 75, vx: -18, vy: -16 },
];

const MAX_SPEED = 40; // px/s — keep the drift calm even after many hits
const BUMP_COOLDOWN = 350; // ms between impact animations per box

type Body = { i: number; x: number; y: number; vx: number; vy: number; r: number; rot: number; spin: number; lastBump: number };

export function BackgroundBoxes() {
  const rootRef = useRef<HTMLDivElement>(null);
  const outerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const innerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const flashRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = root.clientWidth;
    let h = root.clientHeight;

    // Boxes are treated as circles for collisions — close enough for rounded
    // squares and keeps the maths cheap. Only boxes CSS actually shows take
    // part, at their rendered (breakpoint-scaled) size.
    const bodies: Body[] = [];
    BOXES.forEach((b, i) => {
      const el = outerRefs.current[i];
      if (!el || !el.offsetWidth) return;
      const size = el.offsetWidth;
      bodies.push({
        i,
        x: (b.left / 100) * w + size / 2,
        y: (b.top / 100) * h + size / 2,
        vx: b.vx,
        vy: b.vy,
        r: size / 2,
        rot: 0,
        spin: (i % 2 ? -1 : 1) * (4 + (i % 4) * 2),
        lastBump: 0,
      });
    });

    // The static markup positions boxes with left/top; switch to transforms.
    outerRefs.current.forEach((el) => {
      if (el) {
        el.style.left = "0";
        el.style.top = "0";
      }
    });

    const bump = (b: Body, now: number, strength: number) => {
      const el = innerRefs.current[b.i];
      if (!el || now - b.lastBump < BUMP_COOLDOWN) return;
      b.lastBump = now;
      const s = 1 + Math.min(0.12, 0.04 + strength * 0.002);
      animate(el, {
        scale: [
          { to: s, duration: 140, ease: "outQuad" },
          { to: 1, duration: 700, ease: "outElastic(1, .45)" },
        ],
      });
      const flash = flashRefs.current[b.i];
      if (flash) {
        animate(flash, {
          opacity: [
            { to: 1, duration: 110, ease: "outQuad" },
            { to: 0, duration: 900, ease: "outQuad" },
          ],
        });
      }
    };

    const ro = new ResizeObserver(() => {
      w = root.clientWidth;
      h = root.clientHeight;
    });
    ro.observe(root);

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.rot += b.spin * dt;

        // Walls
        if (b.x - b.r < 0) {
          b.x = b.r;
          b.vx = Math.abs(b.vx);
          bump(b, now, Math.abs(b.vx));
        } else if (b.x + b.r > w) {
          b.x = w - b.r;
          b.vx = -Math.abs(b.vx);
          bump(b, now, Math.abs(b.vx));
        }
        if (b.y - b.r < 0) {
          b.y = b.r;
          b.vy = Math.abs(b.vy);
          bump(b, now, Math.abs(b.vy));
        } else if (b.y + b.r > h) {
          b.y = h - b.r;
          b.vy = -Math.abs(b.vy);
          bump(b, now, Math.abs(b.vy));
        }
      }

      // Box-vs-box: elastic collision, mass ∝ area.
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const c = bodies[j];
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const minDist = a.r + c.r;
          const distSq = dx * dx + dy * dy;
          if (distSq >= minDist * minDist || distSq === 0) continue;

          const dist = Math.sqrt(distSq);
          const nx = dx / dist;
          const ny = dy / dist;
          const ma = a.r * a.r;
          const mc = c.r * c.r;

          // Push apart so they don't stick together.
          const overlap = minDist - dist;
          a.x -= nx * overlap * (mc / (ma + mc));
          a.y -= ny * overlap * (mc / (ma + mc));
          c.x += nx * overlap * (ma / (ma + mc));
          c.y += ny * overlap * (ma / (ma + mc));

          const rel = (a.vx - c.vx) * nx + (a.vy - c.vy) * ny;
          if (rel <= 0) continue; // already separating
          const impulse = (2 * rel) / (ma + mc);
          a.vx -= impulse * mc * nx;
          a.vy -= impulse * mc * ny;
          c.vx += impulse * ma * nx;
          c.vy += impulse * ma * ny;

          // Hits set the boxes spinning the other way.
          a.spin = -a.spin;
          c.spin = -c.spin;

          bump(a, now, rel);
          bump(c, now, rel);
        }
      }

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const speed = Math.hypot(b.vx, b.vy);
        if (speed > MAX_SPEED) {
          b.vx *= MAX_SPEED / speed;
          b.vy *= MAX_SPEED / speed;
        }
        const el = outerRefs.current[b.i];
        if (el) {
          el.style.transform = `translate3d(${(b.x - b.r).toFixed(1)}px,${(b.y - b.r).toFixed(1)}px,0) rotate(${b.rot.toFixed(2)}deg)`;
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="bg-boxes pointer-events-none absolute inset-0 overflow-hidden [-webkit-mask-image:radial-gradient(115%_150%_at_50%_50%,transparent_0%,black_34%,black_100%)] [mask-image:radial-gradient(115%_150%_at_50%_50%,transparent_0%,black_34%,black_100%)]"
    >
      {BOXES.map((b, i) => (
        <span
          key={i}
          ref={(el) => {
            outerRefs.current[i] = el;
          }}
          className={`absolute will-change-transform ${b.mobile ? "" : "max-sm:hidden"}`}
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `calc(${b.size}px * var(--box-scale))`,
            height: `calc(${b.size}px * var(--box-scale))`,
          }}
        >
          <span
            ref={(el) => {
              innerRefs.current[i] = el;
            }}
            className="bg-box"
          >
            <span
              ref={(el) => {
                flashRefs.current[i] = el;
              }}
              className="bg-box-flash"
            />
          </span>
        </span>
      ))}
    </div>
  );
}

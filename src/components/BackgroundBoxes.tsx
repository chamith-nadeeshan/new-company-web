import type { CSSProperties } from "react";

// Subtle rounded squares scattered across the hero that drift slowly, like the
// corelabs reference. Positions are fixed (not random) so SSR and client match.
// left/top in %, size in px, dx/dy drift in px, rot in deg, dur/delay in s.
const BOXES: {
  left: number;
  top: number;
  size: number;
  dx: number;
  dy: number;
  rot: number;
  dur: number;
  delay: number;
}[] = [
  { left: 6, top: 14, size: 150, dx: 26, dy: 18, rot: 5, dur: 26, delay: 0 },
  { left: 2, top: 58, size: 95, dx: 20, dy: -22, rot: -4, dur: 30, delay: 3 },
  { left: 14, top: 78, size: 120, dx: -18, dy: -16, rot: 3, dur: 28, delay: 1 },
  { left: 22, top: 34, size: 70, dx: 22, dy: 24, rot: 6, dur: 22, delay: 5 },
  { left: 30, top: 66, size: 90, dx: -24, dy: 18, rot: -5, dur: 32, delay: 2 },
  { left: 44, top: 8, size: 80, dx: 18, dy: 26, rot: 4, dur: 27, delay: 4 },
  { left: 40, top: 86, size: 110, dx: 20, dy: -20, rot: -3, dur: 31, delay: 6 },
  { left: 60, top: 12, size: 72, dx: -20, dy: 22, rot: 5, dur: 24, delay: 1.5 },
  { left: 56, top: 72, size: 64, dx: 16, dy: 20, rot: -6, dur: 23, delay: 3.5 },
  { left: 72, top: 40, size: 130, dx: -22, dy: -18, rot: 4, dur: 29, delay: 0.5 },
  { left: 82, top: 10, size: 100, dx: 24, dy: 20, rot: -4, dur: 33, delay: 2.5 },
  { left: 88, top: 50, size: 160, dx: -20, dy: 24, rot: 3, dur: 34, delay: 5.5 },
  { left: 90, top: 82, size: 90, dx: 18, dy: -22, rot: -5, dur: 26, delay: 4.5 },
  { left: 68, top: 88, size: 75, dx: -16, dy: -18, rot: 6, dur: 28, delay: 2 },
];

export function BackgroundBoxes() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [-webkit-mask-image:radial-gradient(115%_150%_at_50%_50%,transparent_0%,black_34%,black_100%)] [mask-image:radial-gradient(115%_150%_at_50%_50%,transparent_0%,black_34%,black_100%)]"
    >
      {BOXES.map((b, i) => (
        <span
          key={i}
          className="bg-box"
          style={
            {
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              "--dx": `${b.dx}px`,
              "--dy": `${b.dy}px`,
              "--rot": `${b.rot}deg`,
              "--dur": `${b.dur}s`,
              "--delay": `${b.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

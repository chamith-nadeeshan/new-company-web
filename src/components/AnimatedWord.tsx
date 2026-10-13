"use client";

import { useEffect, useState } from "react";

// The hero accent word, à la escolhadigital.com: every couple of seconds it
// flips on the X axis and swaps to the next playful Rubik display font.
const FONTS = [
  "var(--font-rubik-bubbles)",
  "var(--font-rubik-glitch)",
  "var(--font-rubik-iso)",
  "var(--font-rubik-maze)",
  "var(--font-rubik-moonrocks)",
  "var(--font-rubik-puddles)",
];

const HOLD = 2200; // ms a font stays before the next flip
const FLIP = 360; // ms the flip takes

export function AnimatedWord({ children }: { children: string }) {
  const [idx, setIdx] = useState(0);
  const [angle, setAngle] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const interval = window.setInterval(() => {
      // Flip out (edge-on)…
      setAnimate(true);
      setAngle(-90);
      timers.push(
        window.setTimeout(() => {
          // …swap the font while hidden and jump to the far side with no
          // transition, then flip back in on the next frame.
          setIdx((v) => (v + 1) % FONTS.length);
          setAnimate(false);
          setAngle(90);
          requestAnimationFrame(() => {
            setAnimate(true);
            setAngle(0);
          });
        }, FLIP),
      );
    }, HOLD);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <span className="inline-block [perspective:600px]">
      <span
        className="inline-block text-blue"
        style={{
          fontFamily: FONTS[idx],
          transform: `rotateX(${angle}deg)`,
          transformOrigin: "center",
          transition: animate
            ? `transform ${FLIP}ms var(--ease-brand)`
            : "none",
        }}
      >
        {children}
      </span>
    </span>
  );
}

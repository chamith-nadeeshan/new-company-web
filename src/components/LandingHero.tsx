"use client";

import { useEffect, useRef } from "react";

const WORD = "SCALABLE";
const ACCENT_LETTERS = 2; // first letters rendered in blue

// Two formations for the cube cluster, in cube units (x right, y up, z toward viewer).
// A: a rising staircase (columns of 1-4 cubes). B: the same cubes spread into a helix.
const staircase: [number, number, number][] = [];
[1, 2, 3, 4].forEach((height, col) => {
  for (let h = 0; h < height; h++) staircase.push([col - 1.5, h - 1.5, 0]);
});
const helix: [number, number, number][] = staircase.map((_, i) => {
  const angle = (i / staircase.length) * Math.PI * 2.2;
  return [Math.cos(angle) * 2.6, i * 0.62 - 3, Math.sin(angle) * 2.6];
});
const BLUE_INDEX = staircase.length - 1; // top of the tallest column

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export function LandingHero() {
  const roomRef = useRef<HTMLElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadowRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);

  // Size the headline so the word spans the full content width at any viewport.
  useEffect(() => {
    const word = wordRef.current;
    const box = word?.parentElement;
    if (!word || !box) return;
    const fit = () => {
      word.style.fontSize = "100px";
      const ratio = box.clientWidth / word.scrollWidth;
      word.style.fontSize = `${Math.floor(100 * ratio * 100) / 100}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const room = roomRef.current;
    const group = groupRef.current;
    if (!room || !group) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0;
    let current = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const readProgress = () => {
      const rect = room.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      target = travel > 0 ? clamp(-rect.top / travel) : 0;
    };

    const apply = (p: number, time: number) => {
      const unit = window.innerWidth < 640 ? 34 : 64;
      const idle = reduceMotion ? 0 : Math.sin(time / 2600) * 8;

      group.style.transform = `rotateX(-28deg) rotateY(${(45 + idle + p * 160).toFixed(2)}deg)`;

      staircase.forEach((from, i) => {
        const el = cubeRefs.current[i];
        if (!el) return;
        // Stagger so cubes peel off one after another.
        const local = smooth(clamp(p * 1.6 - (i / staircase.length) * 0.6));
        const to = helix[i];
        const x = (from[0] + (to[0] - from[0]) * local) * unit;
        const y = (from[1] + (to[1] - from[1]) * local) * unit;
        const z = (from[2] + (to[2] - from[2]) * local) * unit;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${(-y).toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${(local * 90).toFixed(1)}deg)`;
      });

      if (shadowRef.current) {
        shadowRef.current.style.transform = `translateX(-50%) scale(${(1 + p * 0.5).toFixed(3)}, ${(1 - p * 0.3).toFixed(3)})`;
        shadowRef.current.style.opacity = (0.9 - p * 0.5).toFixed(3);
      }
      if (accentRef.current) {
        accentRef.current.style.opacity = (1 - p * 0.55).toFixed(3);
      }
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      current += (target - current) * (reduceMotion ? 1 : 1 - Math.exp(-dt * 7));
      apply(current, now);
      // Keep the gentle idle sway running while on screen.
      if (visible && (!reduceMotion || Math.abs(target - current) > 0.0001)) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        last = 0;
      }
    };

    const kick = () => {
      readProgress();
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(room);

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    readProgress();
    current = target;
    apply(current, 0);
    kick();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, []);

  return (
    <section id="home" ref={roomRef} className="relative h-[170vh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-4 pt-[68px] sm:px-8">
        <div className="relative flex flex-1 items-center justify-center">
          {/* Oversized headline */}
          <h1
            ref={wordRef}
            aria-label={`${WORD} software, engineered to grow`}
            className="flex w-max select-none whitespace-nowrap text-[18vw] font-normal leading-none tracking-[-0.045em]"
          >
            <span ref={accentRef} className="flex text-blue">
              {WORD.slice(0, ACCENT_LETTERS)
                .split("")
                .map((ch, i) => (
                  <Letter key={i} ch={ch} i={i} />
                ))}
            </span>
            {WORD.slice(ACCENT_LETTERS)
              .split("")
              .map((ch, i) => (
                <Letter key={i} ch={ch} i={i + ACCENT_LETTERS} />
              ))}
          </h1>

          {/* Ground shadow */}
          <div
            ref={shadowRef}
            aria-hidden
            className="anim-aurora pointer-events-none absolute left-1/2 top-[66%] h-16 w-[300px] rounded-[50%] bg-[radial-gradient(closest-side,var(--cube-shadow),transparent)] blur-md sm:top-[70%] sm:h-24 sm:w-[560px]"
          />

          {/* Cube cluster */}
          <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="anim-drop [perspective:2000px]">
              <div ref={groupRef} className="relative size-0 [transform-style:preserve-3d] will-change-transform">
                {staircase.map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      cubeRefs.current[i] = el;
                    }}
                    className="absolute left-0 top-0 [transform-style:preserve-3d]"
                  >
                    <Cube blue={i === BLUE_INDEX} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="anim-rise relative pb-10 sm:pb-14" style={{ animationDelay: "500ms" }}>
          <p className="text-xl leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
            we turn hard problems into simple software.
          </p>
          <p className="font-serif text-xl font-light italic leading-snug text-blue sm:text-[1.75rem]">
            and we make it look easy.
          </p>
        </div>
      </div>
    </section>
  );
}

function Letter({ ch, i }: { ch: string; i: number }) {
  return (
    <span aria-hidden className="anim-rise inline-block" style={{ animationDelay: `${80 + i * 45}ms` }}>
      {ch}
    </span>
  );
}

// A CSS cube centred on its origin; face shades come from theme tokens.
function Cube({ blue }: { blue: boolean }) {
  const faces: { t: string; c: string }[] = [
    { t: "translateZ(var(--half))", c: blue ? "var(--blue-front)" : "var(--cube-front)" },
    { t: "rotateY(180deg) translateZ(var(--half))", c: blue ? "var(--blue-side)" : "var(--cube-side)" },
    { t: "rotateY(90deg) translateZ(var(--half))", c: blue ? "var(--blue-side)" : "var(--cube-side)" },
    { t: "rotateY(-90deg) translateZ(var(--half))", c: blue ? "var(--blue-front)" : "var(--cube-front)" },
    { t: "rotateX(90deg) translateZ(var(--half))", c: blue ? "var(--blue-top)" : "var(--cube-top)" },
    { t: "rotateX(-90deg) translateZ(var(--half))", c: blue ? "var(--blue-side)" : "var(--cube-side)" },
  ];
  return (
    <div className="cube relative [transform-style:preserve-3d]">
      {faces.map((f, i) => (
        <span
          key={i}
          className="absolute inset-0 [backface-visibility:hidden]"
          style={{ transform: f.t, background: f.c }}
        />
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { showcase } from "@/data/content";
import { asset } from "@/lib/asset";

// Trionn-style "design in motion" ribbon: the project cards are the facets of a
// large vertical-axis cylinder, placed edge-to-edge via `rotateY(i*STEP)
// translateZ(R)`. The whole cylinder is tilted (rotateX/rotateZ) so it sweeps
// diagonally across the screen, and scroll spins it around rotateY — the front
// facet faces the viewer full-size while neighbours curve away into depth as one
// continuous band. `preserve-3d` depth-sorts the cards for us.
//
// Per frame we only write transforms / opacity (compositor-only). R and the card
// size are derived from the viewport on resize.

const COUNT = showcase.length;
const STEP = 360 / COUNT; // angle between adjacent facets
const SCROLL_TRAVEL = 300; // degrees of spin across the section's scroll
const IDLE_DEG_PER_SEC = 2.2; // gentle continuous drift

// Static tilt of the whole cylinder — raises the right side and tips it so we
// read the band from slightly below-front (the diagonal "smile" sweep).
const TILT_X = 7;
const TILT_Z = -10;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export function ProductReveal() {
  const roomRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const room = roomRef.current;
    const ring = ringRef.current;
    if (!room || !ring) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let target = 0; // scroll progress 0..1
    let current = 0; // eased follow
    let idle = 0; // accumulated idle rotation (deg)
    let raf = 0;
    let last = 0;
    let visible = false;

    // Lay out the facets as a closed cylinder: R = (cardW/2) / tan(STEP/2) makes
    // adjacent cards meet edge-to-edge. Recomputed on resize.
    const placeCards = () => {
      const cardW = clamp(window.innerWidth * 0.26, 190, 360);
      const cardH = Math.round(cardW * 1.32);
      const R = Math.round(cardW / 2 / Math.tan((Math.PI * STEP) / 360));
      for (let i = 0; i < COUNT; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        el.style.width = `${Math.round(cardW)}px`;
        el.style.height = `${cardH}px`;
        el.style.marginLeft = `${-Math.round(cardW / 2)}px`;
        el.style.marginTop = `${-Math.round(cardH / 2)}px`;
        el.style.transform = `rotateY(${i * STEP}deg) translateZ(${R}px)`;
      }
    };

    const readProgress = () => {
      const rect = room.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      target = travel > 0 ? clamp(-rect.top / travel) : 0;
    };

    const apply = (rotDeg: number) => {
      ring.style.transform = `rotateX(${TILT_X}deg) rotateZ(${TILT_Z}deg) rotateY(${rotDeg.toFixed(
        2,
      )}deg)`;

      // Fade cards as they rotate to the back of the cylinder so we never see a
      // mirrored card floating through the front of the band.
      for (let i = 0; i < COUNT; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const facing = Math.cos(((i * STEP + rotDeg) * Math.PI) / 180);
        el.style.opacity = clamp((facing + 0.62) / 0.5).toFixed(3);
      }
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;

      current += (target - current) * (reduceMotion ? 1 : 1 - Math.exp(-dt * 7));
      if (Math.abs(target - current) < 0.00005) current = target;
      if (!reduceMotion) idle += dt * IDLE_DEG_PER_SEC;

      apply(current * SCROLL_TRAVEL + idle);

      const settled = current === target;
      if (visible && (!settled || !reduceMotion)) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        last = 0;
      }
    };

    const kick = () => {
      readProgress();
      if (visible && !raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      placeCards();
      readProgress();
      apply(current * SCROLL_TRAVEL + idle);
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(room);

    placeCards();
    readProgress();
    current = target;
    apply(current * SCROLL_TRAVEL + idle);

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={roomRef}
      id="motion"
      className="relative h-[300vh]"
      aria-label="Work in motion"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Headline sitting behind the ribbon. */}
        <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center text-center">
          <h2 className="whitespace-nowrap text-[clamp(3rem,13vw,12rem)] font-semibold leading-[0.9] tracking-h1 text-fg">
            WORK IN
          </h2>
          <p className="my-3 text-[11px] font-medium uppercase leading-relaxed tracking-[0.25em] text-muted sm:text-xs">
            Shipping ideas through
            <br />
            daily product practice.
          </p>
          <h2 className="whitespace-nowrap text-[clamp(3rem,13vw,12rem)] font-semibold leading-[0.9] tracking-h1 text-fg">
            MOTION
          </h2>
        </div>

        {/* The cylinder. Camera sits in front; the ring spins on rotateY. */}
        <div className="absolute inset-0 z-10 grid place-items-center [perspective:1700px]">
          <div
            ref={ringRef}
            className="relative size-0 will-change-transform [transform-style:preserve-3d]"
          >
            {showcase.map((card, i) => (
              <div
                key={card.brand}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 will-change-[transform,opacity] [backface-visibility:hidden]"
              >
                <RevealCard card={card} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom-left caption + bottom-right link, like the reference. */}
        <div className="absolute inset-x-0 bottom-8 z-20 flex items-end justify-between px-6 sm:bottom-10 sm:px-10">
          <p className="max-w-[16rem] text-xs leading-relaxed text-muted sm:text-sm">
            Concepts, builds, and interface experiments from our recent client
            work.
          </p>
          <a
            href="#works"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-fg sm:text-sm"
          >
            View all work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

type Card = (typeof showcase)[number];

function RevealCard({ card }: { card: Card }) {
  const dark = card.theme === "dark";
  return (
    <div
      className={`flex size-full flex-col overflow-hidden rounded-xl border p-3 shadow-[0_50px_80px_-30px_#000] ${
        dark
          ? "border-white/15 bg-[#111] text-white"
          : "border-black/10 bg-[#f7f5f0] text-black"
      }`}
    >
      <div className="flex items-center justify-between text-[9px] sm:text-[11px]">
        <span className="font-semibold">{card.brand}®</span>
        <span className="opacity-60">↗</span>
      </div>
      <div className="relative mt-2.5 flex-1 overflow-hidden rounded-md">
        <Image
          src={asset(card.image)}
          alt={card.brand}
          fill
          sizes="360px"
          loading="eager"
          className="object-cover"
        />
      </div>
      <p className="mt-2.5 text-[10px] font-semibold uppercase leading-tight tracking-tight sm:text-[13px]">
        {card.headline}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedWord } from "./AnimatedWord";
import { BackgroundBoxes } from "./BackgroundBoxes";
import { EditorMockup } from "./EditorMockup";

// Landing section styled after escolhadigital.com: Montserrat, a big centered
// headline whose accent word flips through playful display fonts, a gooey
// morphing gray line, and two pill buttons. The design-tool window sits below
// the copy and straddles the fold: the hero background is trimmed to stop at
// ~70% of the window's height, so its bottom ~30% spills onto the neutral area
// below — the window reads as shared between the two sections.

const MORPH_WORDS = [
  "a cutting-edge app",
  "a stunning website",
  "your online presence",
];

const CYCLE = 10.5; // seconds — keep in sync with the ed-morph keyframes
const SPILL_RATIO = 0.3; // fraction of the window that hangs below the hero bg

export function DigitalHero() {
  const winRef = useRef<HTMLDivElement>(null);
  const [spill, setSpill] = useState(150); // px of the window below the hero bg

  useEffect(() => {
    const el = winRef.current;
    if (!el) return;
    const measure = () => setSpill(Math.round(el.offsetHeight * SPILL_RATIO));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      aria-label="Intro"
      className="relative text-fg"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      {/* Hero backdrop — trimmed to end 30% up the window so the window's lower
          portion sits on the neutral page background below. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 overflow-hidden bg-bg"
        style={{
          bottom: spill,
          // Dissolve the lower edge (glow included) into the black below so the
          // hero/neutral boundary has no visible seam.
          WebkitMaskImage: "linear-gradient(to bottom, #000 calc(100% - 220px), transparent)",
          maskImage: "linear-gradient(to bottom, #000 calc(100% - 220px), transparent)",
        }}
      >
        <div className="hero-glow" />
        <BackgroundBoxes />
      </div>

      {/* Copy */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-[clamp(88px,15vh,172px)] text-center">
        <h1 className="mx-auto max-w-[18ch] text-[clamp(26px,3.6vw,56px)] font-semibold leading-[1.16] tracking-[-0.05em]">
          We create <AnimatedWord>awesome</AnimatedWord> digital experiences!
        </h1>

        <div className="mt-6 text-[clamp(13px,1.4vw,18px)] font-medium leading-none sm:mt-7">
          <span className="ed-morph">
            {MORPH_WORDS.map((word, i) => (
              <span
                key={word}
                style={{ animationDelay: `${(CYCLE / MORPH_WORDS.length) * i}s` }}
              >
                {word}
              </span>
            ))}
          </span>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:mt-11">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3 text-sm font-medium text-btn-ink transition-transform duration-300 ease-brand hover:-translate-y-0.5"
          >
            Contact Us
            <span aria-hidden>→</span>
          </a>
          <a
            href="#works"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 ease-brand hover:bg-fg/5"
          >
            Portfolio
            <span aria-hidden>→</span>
          </a>
        </div>

        {/* Design-tool window */}
        <div ref={winRef} className="relative z-10 mt-14 w-full sm:mt-16">
          <EditorMockup />
        </div>
      </div>
    </section>
  );
}

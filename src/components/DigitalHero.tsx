import { AnimatedWord } from "./AnimatedWord";
import { BackgroundBoxes } from "./BackgroundBoxes";

// Landing section styled after escolhadigital.com: Montserrat, a big centered
// headline whose accent word flips through playful display fonts, a gooey
// morphing gray line, and two pill buttons.

const MORPH_WORDS = [
  "a cutting-edge app",
  "a stunning website",
  "your online presence",
];

const CYCLE = 10.5; // seconds — keep in sync with the ed-morph keyframes

export function DigitalHero() {
  return (
    <section
      aria-label="Intro"
      className="relative flex min-h-[clamp(600px,88vh,1000px)] flex-col items-center justify-center overflow-hidden bg-bg px-4 text-center text-fg"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      <div aria-hidden className="hero-glow" />
      <BackgroundBoxes />

      <h1 className="relative z-10 mx-auto max-w-[18ch] text-[clamp(40px,7vw,120px)] font-semibold leading-[1.1] tracking-[-0.05em]">
        We create <AnimatedWord>awesome</AnimatedWord> digital experiences!
      </h1>

      <div className="relative z-10 mt-8 text-[clamp(18px,2.6vw,34px)] font-medium leading-none sm:mt-10">
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

      <div className="absolute bottom-[clamp(32px,6vh,72px)] left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-4">
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
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { asset } from "@/lib/asset";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

// A single image that wipes open + zooms out on enter, then drifts (parallax)
// as it scrolls through the viewport. `strength` is the max drift in px.
export function ParallaxMedia({
  image,
  alt,
  ratio = "16/10",
  caption,
  priority = false,
  strength = 48,
  className = "",
}: {
  image: string;
  alt: string;
  ratio?: string;
  caption?: string;
  priority?: boolean;
  strength?: number;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const parRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const par = parRef.current;
    if (!frame || !par) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveal + parallax are both driven off the scroll position (not an
    // IntersectionObserver), matching WorksOrbit — this is robust with Lenis
    // smooth scroll and can never leave a frame stuck in its hidden state.
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight;

      // Reveal (wipe/zoom) once the frame's top has crossed into the viewport.
      if (rect.top < vh * 0.9 && rect.bottom > 0) frame.classList.add("is-in");

      if (reduce) return;
      // Off-screen: skip the parallax math.
      if (rect.bottom < 0 || rect.top > vh) return;
      // 0 as the frame enters from the bottom, 1 as it leaves at the top.
      const p = clamp((vh - rect.top) / (vh + rect.height));
      par.style.setProperty("--py", `${(p - 0.5) * 2 * strength}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update(); // initial pass reveals anything already in view

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <figure className={className}>
      <div ref={frameRef} className="cs-frame" style={{ aspectRatio: ratio }}>
        <div className="cs-scale">
          <div ref={parRef} className="cs-par">
            <Image
              src={asset(image)}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              priority={priority}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

// Splits text into word-masks that slide up with a stagger when scrolled into
// view. Use for headings and short statements. `as` picks the wrapping element.
export function RevealText({
  text,
  as: Tag = "p",
  className = "",
  stagger = 45,
  start = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  stagger?: number;
  start?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={`cs-lines ${className}`}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="cs-w">
            <span style={{ "--d": `${start + i * stagger}ms` } as never}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

// A simple fade/slide-up wrapper for blocks that aren't text or media.
export function RevealBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Site-wide smooth (inertial) scrolling. Lenis drives the real scroll position,
// so the scroll-driven sections (WorksOrbit, Starfield, …) keep working off the
// native `scroll` event. Disabled entirely when the user prefers reduced motion.
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Lenis sets its own scroll handling; CSS smooth-scroll fights it.
    document.documentElement.style.scrollBehavior = "auto";

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Route in-page anchor clicks through Lenis so jumps are smooth too.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = link?.getAttribute("href");
      if (!link || !hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      document.documentElement.style.scrollBehavior = "";
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // App Router client navigations swap the page content without remounting this
  // provider, so Lenis keeps the previous route's scroll limit — on a taller
  // page that leaves the bottom unreachable. Recompute once the new DOM paints.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    const raf = requestAnimationFrame(() => lenis.resize());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}

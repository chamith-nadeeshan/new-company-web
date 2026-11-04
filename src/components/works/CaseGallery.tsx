"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

type Shot = { image: string; ratio?: string };

// Full-bleed horizontal carousel of screenshot cards with prev/next arrows and
// scroll-snap, matching the Visuvate case-study gallery. Native horizontal
// scroll + snap drives the motion; the arrows step one card at a time.
export function CaseGallery({ images, title }: { images: Shot[]; title: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="group/gallery relative">
      <div
        ref={trackRef}
        onScroll={updateEdges}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:gap-6 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((shot, i) => (
          <figure
            key={i}
            data-card
            className="w-[86%] shrink-0 snap-start sm:w-[58%] lg:w-[40%]"
          >
            <div
              className="relative overflow-hidden rounded-2xl border border-line bg-elevated"
              style={{ aspectRatio: shot.ratio ?? "16/9" }}
            >
              <Image
                src={asset(shot.image)}
                alt={`${title} — screen ${i + 1}`}
                fill
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 58vw, 40vw"
                priority={i === 0}
                className="object-cover transition-transform duration-700 ease-brand hover:scale-[1.03]"
              />
            </div>
          </figure>
        ))}
      </div>

      <Arrow dir="prev" onClick={() => step(-1)} disabled={atStart} />
      <Arrow dir="next" onClick={() => step(1)} disabled={atEnd} />
    </div>
  );
}

function Arrow({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const prev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={prev ? "Previous" : "Next"}
      className={`absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-all duration-200 ease-brand hover:bg-black/80 disabled:pointer-events-none disabled:opacity-0 sm:size-14 ${
        prev ? "left-3 sm:left-5" : "right-3 sm:right-5"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={prev ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

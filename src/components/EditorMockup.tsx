"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { reelShots } from "@/data/content";
import { asset } from "@/lib/asset";

type Card = (typeof reelShots)[number];

// A faux design-tool window (à la visuvate.com) placed below the hero: fixed
// editor chrome — top toolbar, a Layers panel, a properties panel, a floating
// dock — wrapped around a center canvas whose website previews scroll in a
// draggable, hold-to-preview marquee. Styled in the site's own tokens (amber
// accent on the dark theme).
const LAYERS = [
  "Hero",
  "Tech Stack",
  "Introduction",
  "Featured Works",
  "Services",
  "Approach",
  "FAQs",
  "CTA",
  "Footer",
] as const;

const PAGES = ["Home", "About", "Work", "Services", "Contact"] as const;

// Properties shown in the right panel for each layer.
const LAYER_PROPS: Record<
  (typeof LAYERS)[number],
  { width: string; height: string; maxWidth: string; direction: "row" | "column"; distribute: string }
> = {
  Hero: { width: "1fr", height: "100vh", maxWidth: "1440", direction: "column", distribute: "Center" },
  "Tech Stack": { width: "1fr", height: "Auto", maxWidth: "1200", direction: "row", distribute: "Between" },
  Introduction: { width: "1fr", height: "Auto", maxWidth: "960", direction: "column", distribute: "Start" },
  "Featured Works": { width: "1fr", height: "Auto", maxWidth: "1200", direction: "row", distribute: "Start" },
  Services: { width: "1fr", height: "Auto", maxWidth: "1200", direction: "column", distribute: "Start" },
  Approach: { width: "1fr", height: "Auto", maxWidth: "1200", direction: "column", distribute: "End" },
  FAQs: { width: "1fr", height: "Auto", maxWidth: "800", direction: "column", distribute: "Start" },
  CTA: { width: "1fr", height: "480", maxWidth: "1200", direction: "row", distribute: "Center" },
  Footer: { width: "1fr", height: "Auto", maxWidth: "1440", direction: "row", distribute: "Between" },
};

const POSITIONS = ["Relative", "Absolute", "Fixed", "Sticky"] as const;
const DEVICE_WIDTH = { desktop: 1488, mobile: 390 } as const;

const SPEEDS = [0.5, 1, 2] as const;
const DRAG_THRESHOLD = 6;

export function EditorMockup() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Marquee/drag state lives in refs so the rAF loop never re-renders.
  const offset = useRef(0);
  const loop = useRef(0); // width of one copy (wrap distance)
  const stride = useRef(0); // one card + gap, for "jump to layer"
  const paused = useRef(false);
  const speed = useRef(1);
  const drag = useRef<{ startX: number; startOffset: number; moved: boolean } | null>(null);

  const [tab, setTab] = useState<"Pages" | "Layers" | "Assets">("Layers");
  const [activeLayer, setActiveLayer] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [handTool, setHandTool] = useState(false);
  const [light, setLight] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [activePage, setActivePage] = useState(0);
  const [activeAsset, setActiveAsset] = useState(0);
  const [positions, setPositions] = useState<Record<string, (typeof POSITIONS)[number]>>({});
  const [directions, setDirections] = useState<Record<string, "row" | "column">>({});
  const [held, setHeld] = useState<number | null>(null);

  const layerName = LAYERS[activeLayer];
  const props = LAYER_PROPS[layerName];
  const position = positions[layerName] ?? "Relative";
  const direction = directions[layerName] ?? props.direction;
  const mobile = device === "mobile";

  const cards = [...reelShots, ...reelShots];

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    loop.current = track.scrollWidth / 2;
    const first = track.firstElementChild as HTMLElement | null;
    const second = track.children[1] as HTMLElement | null;
    if (first && second) stride.current = second.offsetLeft - first.offsetLeft;
  }, []);

  const wrap = (v: number) => {
    const L = loop.current;
    if (!L) return v;
    return ((v % L) - L) % L;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    measure();

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      if (!paused.current && !drag.current && held === null) {
        offset.current = wrap(offset.current - 90 * speed.current * dt);
      }
      track.style.transform = `translate3d(${offset.current.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      paused.current = true;
      setPlaying(false);
    }
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    document.fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [measure, held]);

  // Pointer drag over the canvas. A near-still press on a shot = hold-to-preview.
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, startOffset: offset.current, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      d.moved = true;
      setHeld(null);
    }
    if (d.moved) offset.current = wrap(d.startOffset + dx);
  };
  const endDrag = (e: React.PointerEvent) => {
    drag.current = null;
    setHeld(null);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const togglePlay = () => {
    paused.current = playing;
    setPlaying((p) => !p);
  };
  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    speed.current = SPEEDS[next];
  };

  // Clicking a layer highlights it and jumps the canvas to that preview.
  const selectLayer = (i: number) => {
    setActiveLayer(i);
    jumpTo(i);
  };
  const jumpTo = (i: number) => {
    if (stride.current) offset.current = wrap(-stride.current * (i % reelShots.length));
  };
  const selectAsset = (i: number) => {
    setActiveAsset(i);
    jumpTo(i);
  };
  const cyclePosition = () =>
    setPositions((p) => ({
      ...p,
      [layerName]: POSITIONS[(POSITIONS.indexOf(position) + 1) % POSITIONS.length],
    }));
  const setDirection = (d: "row" | "column") => setDirections((p) => ({ ...p, [layerName]: d }));

  return (
    <div aria-label="Design preview" role="group" className="mx-auto w-full max-w-[1240px]">
      <div>
        {/* Editor window */}
        <div
          data-editor-theme={light ? "light" : "dark"}
          className={`overflow-hidden rounded-[18px] border border-line text-fg shadow-[0_40px_90px_-40px_#000] transition-colors duration-300 ${
            light ? "bg-white" : "bg-[#0a0a0a]"
          }`}
        >
          {/* ---- top toolbar ---- */}
          <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2.5 sm:px-4">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-blue text-sm font-bold text-black">
                V
              </span>
              <ChevronRight className="text-dim" />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div role="group" aria-label="Preview device" className="flex items-center gap-1 rounded-lg bg-surface p-1">
                {(["desktop", "mobile"] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-label={d === "desktop" ? "Desktop view" : "Mobile view"}
                    aria-pressed={device === d}
                    onClick={() => setDevice(d)}
                    className={`grid size-7 place-items-center rounded-md transition-colors ${
                      device === d ? "bg-surface-strong text-fg" : "text-dim hover:text-muted"
                    }`}
                  >
                    {d === "desktop" ? <DesktopIcon /> : <MobileIcon />}
                  </button>
                ))}
              </div>
              <div className="hidden items-center gap-2 rounded-lg bg-surface px-3 py-1.5 text-xs text-muted sm:flex">
                <span className="tabular-nums">w {DEVICE_WIDTH[device]}px</span>
                <span className="text-dim">|</span>
                <SearchIcon className="size-3" />
                <span>100%</span>
              </div>
            </div>

            <div className="flex -space-x-2">
              <span
                className={`size-7 rounded-full border-2 bg-gradient-to-br from-blue to-blue-700 ${
                  light ? "border-white" : "border-[#0a0a0a]"
                }`}
              />
              <span
                className={`size-7 rounded-full border-2 bg-gradient-to-br from-fg/70 to-fg/30 ${
                  light ? "border-white" : "border-[#0a0a0a]"
                }`}
              />
            </div>
          </div>

          {/* ---- body: left panel | canvas | right panel ---- */}
          <div className="grid lg:grid-cols-[232px_1fr_248px]">
            {/* left: layers */}
            <aside className="hidden flex-col border-r border-line p-3 lg:flex">
              <div className="grid grid-cols-3 gap-1 rounded-lg bg-surface p-1 text-xs font-medium">
                {(["Pages", "Layers", "Assets"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`rounded-md py-1.5 transition-colors ${
                      tab === t ? "bg-surface-strong text-fg" : "text-dim hover:text-muted"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {tab !== "Assets" && (
                <div className="mt-3 flex items-center justify-between rounded-lg border border-line px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2 font-medium">
                    <HomeIcon className="text-muted" /> {PAGES[activePage]}
                  </span>
                  <ChevronDown className="text-dim" />
                </div>
              )}

              {tab === "Pages" && (
                <ul className="mt-2 flex flex-col gap-0.5">
                  {PAGES.map((name, i) => {
                    const active = i === activePage;
                    return (
                      <li key={name}>
                        <button
                          type="button"
                          onClick={() => setActivePage(i)}
                          className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                            active
                              ? "bg-blue font-medium text-black"
                              : "text-muted hover:bg-fg/5 hover:text-fg"
                          }`}
                        >
                          <PageIcon className={active ? "text-black" : "text-dim"} />
                          <span className="truncate">{name}</span>
                          <span className={`ml-auto text-xs ${active ? "text-black/60" : "text-dim"}`}>
                            /{i === 0 ? "" : name.toLowerCase()}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {tab === "Assets" && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {reelShots.map((shot, i) => (
                    <button
                      key={shot.image}
                      type="button"
                      onClick={() => selectAsset(i)}
                      className={`overflow-hidden rounded-lg border text-left transition-colors ${
                        i === activeAsset ? "border-blue" : "border-line hover:border-line-strong"
                      }`}
                    >
                      <span className="relative block aspect-[4/3] bg-surface">
                        <Image
                          src={asset(shot.image)}
                          alt=""
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </span>
                      <span className="block truncate px-2 py-1.5 text-[11px] text-muted">
                        {shot.image.split("/").pop()}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {tab === "Layers" && (
              <ul className="mt-2 flex flex-col gap-0.5">
                {LAYERS.map((name, i) => {
                  const active = i === activeLayer;
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        onClick={() => selectLayer(i)}
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                          active
                            ? "bg-blue font-medium text-black"
                            : "text-muted hover:bg-fg/5 hover:text-fg"
                        }`}
                      >
                        <ChevronRight
                          className={`size-3 shrink-0 ${active ? "text-black/70" : "text-dim"}`}
                        />
                        <LayersIcon className={active ? "text-black" : "text-dim"} />
                        <span className="truncate">{name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              )}
            </aside>

            {/* center: canvas with scrolling website previews + dock */}
            <div
              className={`relative overflow-hidden transition-colors duration-300 ${
                light ? "bg-[#ebe9e4]" : "bg-[#0e0e0e]"
              }`}
            >
              {/* edge fades */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r sm:w-16 ${
                  light ? "from-[#ebe9e4]" : "from-[#0e0e0e]"
                } to-transparent`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l sm:w-16 ${
                  light ? "from-[#ebe9e4]" : "from-[#0e0e0e]"
                } to-transparent`}
              />

              <div
                onPointerEnter={() => (paused.current = true)}
                onPointerLeave={(e) => {
                  if (playing) paused.current = false;
                  endDrag(e);
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                className={`flex h-[320px] items-center sm:h-[440px] ${
                  handTool ? "cursor-grab active:cursor-grabbing" : "cursor-default"
                } touch-pan-y select-none`}
                style={{ touchAction: "pan-y" }}
              >
                <div ref={trackRef} className="flex w-max gap-4 px-6 will-change-transform sm:gap-6 sm:px-10">
                  {cards.map((card, i) => (
                    <PreviewCard
                      key={i}
                      card={card}
                      mobile={mobile}
                      dimmed={held !== null && held !== i}
                      active={held === i}
                      onHoldStart={() => {
                        if (!drag.current?.moved) setHeld(i);
                      }}
                      onHoldEnd={() => setHeld((h) => (h === i ? null : h))}
                    />
                  ))}
                </div>
              </div>

              {/* floating dock */}
              <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2">
                <div className={`flex items-center gap-1 rounded-2xl border border-line p-1.5 transition-colors duration-300 ${
                    light ? "bg-white/90" : "bg-[#141414]/90"
                  } shadow-[0_20px_50px_-20px_#000] backdrop-blur-md`}>
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={playing ? "Pause marquee" : "Play marquee"}
                    className="grid size-10 place-items-center rounded-xl bg-blue text-black transition-transform duration-200 ease-brand hover:scale-105"
                  >
                    {playing ? <PauseIcon /> : <PlayIcon />}
                  </button>
                  <DockBtn label="Search"><SearchIcon /></DockBtn>
                  <DockBtn
                    label="Drag tool"
                    active={handTool}
                    onClick={() => setHandTool((h) => !h)}
                  >
                    <HandIcon />
                  </DockBtn>
                  <button
                    type="button"
                    onClick={cycleSpeed}
                    aria-label="Marquee speed"
                    className="grid h-10 min-w-10 place-items-center rounded-xl px-2 text-xs font-semibold tabular-nums text-fg transition-colors hover:bg-fg/10"
                  >
                    {SPEEDS[speedIdx]}×
                  </button>
                  <DockBtn
                    label={light ? "Switch to dark mode" : "Switch to light mode"}
                    onClick={() => setLight((l) => !l)}
                  >
                    {light ? <MoonIcon /> : <SunIcon />}
                  </DockBtn>
                  <DockBtn label="Language"><TranslateIcon /></DockBtn>
                </div>
              </div>
            </div>

            {/* right: properties */}
            <aside className="hidden flex-col gap-5 border-l border-line p-4 text-sm lg:flex">
              <IconRow />
              <p className="-mb-2 truncate text-xs text-dim">
                {PAGES[activePage]} / <span className="text-fg">{layerName}</span>
              </p>
              <PropGroup title="Position">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted">Type</span>
                  <button
                    type="button"
                    onClick={cyclePosition}
                    aria-label={`Position type: ${position}. Click to change.`}
                    className="flex flex-1 items-center justify-end gap-1.5 rounded-md bg-surface px-2.5 py-1.5 text-xs text-fg transition-colors hover:bg-surface-strong"
                  >
                    {position} <ChevronDown className="size-3 text-dim" />
                  </button>
                </div>
              </PropGroup>
              <PropGroup title="Size" plus>
                <PropRow label="Width" value={props.width} select="Fill" />
                <PropRow
                  label="Height"
                  value={props.height}
                  select={props.height === "Auto" ? "Fit" : "Fixed"}
                />
                <PropRow label="Max Width" value={mobile ? "390" : props.maxWidth} select="Fixed" />
              </PropGroup>
              <PropGroup title="Layout">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Direction</span>
                  <div className="flex gap-1">
                    {(["row", "column"] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        aria-label={d === "row" ? "Horizontal" : "Vertical"}
                        aria-pressed={direction === d}
                        onClick={() => setDirection(d)}
                        className={`grid size-8 place-items-center rounded-md transition-colors ${
                          direction === d ? "bg-surface-strong text-fg" : "bg-surface text-dim hover:text-muted"
                        }`}
                      >
                        {d === "row" ? "↔" : "↕"}
                      </button>
                    ))}
                  </div>
                </div>
                <PropRow label="Distribute" value={props.distribute} wide muted />
              </PropGroup>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- canvas preview card ---------------- */
function PreviewCard({
  card,
  mobile,
  dimmed,
  active,
  onHoldStart,
  onHoldEnd,
}: {
  card: Card;
  mobile: boolean;
  dimmed: boolean;
  active: boolean;
  onHoldStart: () => void;
  onHoldEnd: () => void;
}) {
  const dark = card.theme === "dark";
  return (
    <figure
      onPointerDown={onHoldStart}
      onPointerUp={onHoldEnd}
      onPointerCancel={onHoldEnd}
      className={`reel-frame group/card relative shrink-0 overflow-hidden shadow-[0_30px_60px_-28px_#000] transition-[transform,opacity,filter,width] duration-500 ease-brand ${
        mobile
          ? "aspect-[9/16] w-[150px] rounded-[22px] border-4 border-[#1c1c1c] sm:w-[220px]"
          : "aspect-[16/10] w-[300px] rounded-xl border sm:w-[560px]"
      } ${
        dark ? "bg-[#101010]" : "bg-[#f7f5f0]"
      } ${active ? "z-30 scale-[1.04]" : ""} ${dimmed ? "scale-[0.97] opacity-40 blur-[1px]" : ""}`}
    >
      <div className="relative h-full">
        <Image
          src={asset(card.image)}
          alt={`${card.brand} — ${card.headline}`}
          fill
          sizes="(max-width: 640px) 300px, 560px"
          draggable={false}
          className={`object-cover ${mobile ? "object-top" : ""}`}
        />
        {mobile && (
          <span
            aria-hidden
            className="absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/80"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
          <p className="text-sm font-semibold leading-tight text-white sm:text-lg">{card.headline}</p>
        </div>
        <div
          className={`pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-blue px-3 py-1.5 text-xs font-medium text-black shadow-lg transition-opacity duration-200 ${
            active ? "opacity-0" : "opacity-0 group-hover/card:opacity-100"
          }`}
        >
          <HoldIcon /> Press &amp; Hold
        </div>
      </div>
    </figure>
  );
}

/* ---------------- right-panel helpers ---------------- */
function IconRow() {
  return (
    <div className="flex items-center justify-between border-b border-line pb-4 text-dim">
      {["⊢", "＋", "⊣", "⊤", "＋", "⊥", "▯", "▭"].map((g, i) => (
        <span key={i} className="grid size-6 place-items-center rounded text-xs hover:text-fg">
          {g}
        </span>
      ))}
    </div>
  );
}
function PropGroup({ title, plus, children }: { title: string; plus?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{title}</span>
        {plus && <span className="text-dim">＋</span>}
      </div>
      {children}
    </div>
  );
}
function PropRow({
  label,
  value,
  select,
  wide,
  muted,
}: {
  label: string;
  value: string;
  select?: string;
  wide?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted">{label}</span>
      <div className={`flex gap-1.5 ${wide ? "flex-1 justify-end" : ""}`}>
        <span
          className={`rounded-md bg-surface px-2.5 py-1.5 text-xs ${wide ? "flex-1 text-right" : "w-[62px]"} ${
            muted ? "text-muted" : "text-fg"
          }`}
        >
          {value}
        </span>
        {select && (
          <span className="flex w-[64px] items-center justify-between rounded-md bg-surface px-2 py-1.5 text-xs text-muted">
            {select} <ChevronDown className="size-3" />
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- dock button ---------------- */
function DockBtn({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`grid size-10 place-items-center rounded-xl transition-colors ${
        active ? "bg-fg/15 text-fg" : "text-muted hover:bg-fg/10 hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------------- icons ---------------- */
const ic = "currentColor";
function PlayIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill={ic} aria-hidden><path d="M8 5v14l11-7z" /></svg>;
}
function PauseIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill={ic} aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>;
}
function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={ic} strokeWidth="2" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" strokeLinecap="round" />
    </svg>
  );
}
function HandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={ic} aria-hidden>
      <path d="M9 3a1 1 0 00-1 1v6H7V6a1 1 0 10-2 0v8.5a6.5 6.5 0 0013 0V8a1 1 0 10-2 0v2h-1V5a1 1 0 10-2 0v5h-1V4a1 1 0 00-1-1z" />
    </svg>
  );
}
function MoonIcon() {
  return <svg viewBox="0 0 24 24" width="17" height="17" fill={ic} aria-hidden><path d="M20 14.5A8 8 0 019.5 4a7 7 0 108.9 10.5c.4-.1.7.3.6.6-.3.1-.7.3-1 .4z" /><path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" /></svg>;
}
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={ic} strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}
function PageIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={ic} strokeWidth="2" className={className} aria-hidden><path d="M6 3h8l4 4v14H6z" strokeLinejoin="round" /><path d="M14 3v4h4" strokeLinejoin="round" /></svg>;
}
function TranslateIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={ic} strokeWidth="1.8" aria-hidden>
      <path d="M4 5h8M8 3v2c0 4-2 7-5 8M6 8c0 3 3 5 6 6" strokeLinecap="round" />
      <path d="m13 19 3-7 3 7M14 17h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function HoldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill={ic} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={ic} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function DesktopIcon() {
  return <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={ic} strokeWidth="2" aria-hidden><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M8 20h8M12 16v4" strokeLinecap="round" /></svg>;
}
function MobileIcon() {
  return <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={ic} strokeWidth="2" aria-hidden><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" strokeLinecap="round" /></svg>;
}
function HomeIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={ic} strokeWidth="2" className={className} aria-hidden><path d="M4 10 12 4l8 6v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z" strokeLinejoin="round" /></svg>;
}
function LayersIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={ic} strokeWidth="2" className={className} aria-hidden><path d="m12 3 9 5-9 5-9-5z" strokeLinejoin="round" /><path d="m3 13 9 5 9-5" strokeLinejoin="round" /></svg>;
}
function ChevronRight({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={ic} strokeWidth="2" className={className} aria-hidden><path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function ChevronDown({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={ic} strokeWidth="2" className={className} aria-hidden><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

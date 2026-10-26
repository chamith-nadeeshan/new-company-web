// Animated faux-UI scenes shown inside each service card (brand take on
// visuvate.com/services). Each scene is pure CSS/SVG — motion comes from the
// `svc-*` keyframe classes in globals.css, which the global prefers-reduced-motion
// block freezes. Scenes are mapped to `services` by index in `scenes` below.
import type { ReactNode } from "react";

/* ---------------- shared primitives ---------------- */

// A light "website preview" panel (dark text on near-white), like the reference.
function Panel({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`rounded-lg bg-white/95 text-black shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] ring-1 ring-black/5 ${className}`}
    >
      {children}
    </div>
  );
}

// A dark glassy "tool" panel (light text), the editor-style surface.
function Glass({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`rounded-lg bg-[#141414]/90 text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

// Fake browser/window top bar with traffic lights.
function WinBar({ title, dark = false }: { title?: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 border-b px-2.5 py-1.5 ${
        dark ? "border-white/10" : "border-black/10"
      }`}
    >
      <span className="size-1.5 rounded-full bg-[#f2921e]" />
      <span className="size-1.5 rounded-full bg-black/20" />
      <span className="size-1.5 rounded-full bg-black/20" />
      {title && (
        <span
          className={`ml-2 text-[9px] font-semibold tracking-wide ${
            dark ? "text-white/60" : "text-black/50"
          }`}
        >
          {title}
        </span>
      )}
    </div>
  );
}

function Bar({ w, className = "" }: { w: string; className?: string }) {
  return (
    <span
      className={`block h-1.5 rounded-full bg-black/10 ${className}`}
      style={{ width: w }}
    />
  );
}

// A small pill badge that floats over the scene.
function Chip({
  className = "",
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-lg ${className}`}
    >
      {children}
    </span>
  );
}

const Stage = ({ children }: { children: ReactNode }) => (
  <div className="absolute inset-0 z-10 grid place-items-center p-5">{children}</div>
);

/* ---------------- 0 · Custom Websites ---------------- */
function CustomWebsites() {
  return (
    <Stage>
      <Panel className="svc-float w-[76%] overflow-hidden">
        <WinBar title="studio.site" />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold">Studio</span>
            <span className="flex gap-2 text-[8px] text-black/40">
              <span>Work</span>
              <span>About</span>
              <span className="rounded-full bg-black px-1.5 py-0.5 text-white">
                Contact
              </span>
            </span>
          </div>
          <div className="mt-2.5 h-14 rounded-md bg-gradient-to-br from-[#2b2b2b] to-[#555] p-2">
            <span className="text-[11px] font-bold text-white">
              Crafted, not
              <br />
              assembled.
            </span>
            <span className="mt-1 inline-block rounded bg-[#f2921e] px-1.5 py-0.5 text-[7px] font-semibold text-black">
              Start a project
            </span>
          </div>
          <div className="mt-2 flex gap-2">
            <Bar w="38%" className="h-5 rounded-md bg-black/5" />
            <Bar w="30%" className="h-5 rounded-md bg-black/5" />
            <Bar w="24%" className="h-5 rounded-md bg-[#f2921e]/25" />
          </div>
        </div>
      </Panel>
      <Chip
        className="absolute left-3 bottom-3 svc-float-sm bg-white text-black"
        style={{ animationDelay: "-2s" }}
      >
        Custom ✓
      </Chip>
    </Stage>
  );
}

/* ---------------- 1 · Web Applications ---------------- */
function WebApplications() {
  const bars = [0.5, 0.8, 0.45, 1, 0.7, 0.9];
  return (
    <Stage>
      <Glass className="svc-float w-[80%] overflow-hidden">
        <WinBar title="dashboard" dark />
        <div className="flex">
          <div className="flex w-10 flex-col gap-1.5 border-r border-white/10 p-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full ${i === 0 ? "bg-[#f2921e]" : "bg-white/15"}`}
              />
            ))}
          </div>
          <div className="flex-1 p-3">
            <div className="flex gap-2">
              <div className="flex-1 rounded-md bg-white/5 p-1.5">
                <span className="text-[13px] font-bold text-[#fbb457]">
                  2.4k
                </span>
                <span className="block text-[7px] text-white/40">Active</span>
              </div>
              <div className="flex-1 rounded-md bg-white/5 p-1.5">
                <span className="text-[13px] font-bold text-white">98%</span>
                <span className="block text-[7px] text-white/40">Uptime</span>
              </div>
            </div>
            <div className="mt-2.5 flex h-10 items-end gap-1.5">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="svc-bar flex-1 rounded-sm bg-gradient-to-t from-[#c2721a] to-[#fbb457]"
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </Glass>
    </Stage>
  );
}

/* ---------------- 2 · Mobile Apps ---------------- */
function MobileApps() {
  return (
    <Stage>
      <div className="svc-float relative h-[88%] w-[38%] overflow-hidden rounded-[18px] border-4 border-[#1c1c1c] bg-white shadow-[0_22px_50px_-18px_rgba(0,0,0,0.7)]">
        <span className="absolute left-1/2 top-1.5 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-black/70" />
        <div className="svc-scroll flex flex-col gap-2 p-2.5 pt-5">
          <div className="h-12 rounded-lg bg-gradient-to-br from-[#f2921e] to-[#c2721a]" />
          <Bar w="70%" className="h-2" />
          <Bar w="90%" className="h-2" />
          <div className="mt-1 grid grid-cols-2 gap-2">
            <div className="h-10 rounded-lg bg-black/5" />
            <div className="h-10 rounded-lg bg-black/5" />
            <div className="h-10 rounded-lg bg-[#f2921e]/20" />
            <div className="h-10 rounded-lg bg-black/5" />
          </div>
          <Bar w="80%" className="h-2" />
          <div className="h-10 rounded-lg bg-black/5" />
        </div>
      </div>
      <Chip
        className="absolute right-4 top-6 svc-float-sm bg-[#f2921e] text-black"
        style={{ animationDelay: "-1.5s" }}
      >
        iOS · Android
      </Chip>
    </Stage>
  );
}

/* ---------------- 3 · eCommerce (node network) ---------------- */
function Ecommerce() {
  const nodes = [
    { x: 16, y: 26, d: "M7 7h10l-1 7H8z M9 17h.01 M15 17h.01" }, // bag
    { x: 16, y: 74, d: "M3 7h13l-1.5 7H6z M8 18a1 1 0 11-2 0 1 1 0 012 0" }, // cart
    { x: 84, y: 20, d: "M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" }, // shield
    { x: 84, y: 80, d: "M4 7l8-4 8 4-8 4z M4 7v6l8 4 8-4V7" }, // box
    { x: 92, y: 50, d: "M6 3v18M6 3h9l-2 4 2 4H6" }, // tag/flag
  ];
  return (
    <div className="absolute inset-0 z-10">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" preserveAspectRatio="none">
        {nodes.map((n, i) => (
          <path
            key={i}
            d={`M50 50 C ${(50 + n.x) / 2} 50, ${n.x} ${(50 + n.y) / 2}, ${n.x} ${n.y}`}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="0.8"
            className="svc-flow"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </svg>
      {/* centre: cart */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 svc-ping rounded-full bg-white/40" />
        <div className="svc-float relative grid size-12 place-items-center rounded-full bg-white text-black shadow-xl">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 4h2l2 12h10l2-8H6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="17" cy="20" r="1.4" />
          </svg>
          <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[#f2921e] text-[8px] font-bold text-black">
            3
          </span>
        </div>
      </div>
      {/* satellite icon nodes */}
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-lg svc-float-sm"
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 0.4}s` }}
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={n.d} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ---------------- 4 · UI / UX Design (tool panel) ---------------- */
function UiUxDesign() {
  const swatches = ["#f2921e", "#fbb457", "#c2721a", "#ffffff", "#1c1c1c"];
  return (
    <Stage>
      <Glass className="svc-float w-[74%] p-3">
        <div className="flex items-center justify-between text-[10px] font-semibold">
          <span>Fill</span>
          <span className="text-white/40">Shadow</span>
        </div>
        <div className="mt-2 h-10 rounded-md bg-gradient-to-r from-[#f2921e] via-[#fbb457] to-[#c2721a]" />
        <div className="mt-2.5 flex gap-1.5">
          {swatches.map((c, i) => (
            <span
              key={c}
              className="svc-pulse size-5 rounded-full ring-1 ring-white/20"
              style={{ background: c, animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between rounded-md bg-white/5 px-2 py-1.5 text-[9px]">
          <span className="text-white/50">Radius</span>
          <div className="mx-2 h-1 flex-1 rounded-full bg-white/10">
            <span className="block h-full w-2/3 rounded-full bg-[#f2921e]" />
          </div>
          <span className="tabular-nums text-white/70">16</span>
        </div>
      </Glass>
      <Chip
        className="absolute right-4 bottom-4 svc-float-sm bg-white text-black"
        style={{ animationDelay: "-2.5s" }}
      >
        Auto-layout
      </Chip>
    </Stage>
  );
}

/* ---------------- 5 · Cloud & DevOps (pipeline) ---------------- */
function CloudDevOps() {
  const steps = ["Build", "Test", "Ship"];
  return (
    <Stage>
      <div className="w-[82%]">
        <div className="relative flex items-center justify-between">
          <svg viewBox="0 0 100 10" className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2" preserveAspectRatio="none">
            <path d="M6 5 H94" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" className="svc-flow" />
          </svg>
          {steps.map((s, i) => (
            <div key={s} className="relative flex flex-col items-center gap-1.5">
              <span
                className="svc-float grid size-9 place-items-center rounded-full bg-white text-black shadow-lg"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {i === 2 ? (
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="size-2.5 rounded-full bg-[#f2921e]" />
                )}
              </span>
              <span className="text-[9px] font-semibold text-white/80">{s}</span>
            </div>
          ))}
        </div>
        <Glass className="mt-3 flex items-center gap-2 px-3 py-2">
          <span className="size-2 rounded-full bg-[#4ade80] svc-pulse" />
          <span className="text-[9px] text-white/70">deploy · prod</span>
          <span className="ml-auto font-mono text-[9px] text-[#fbb457]">v2.4.1</span>
        </Glass>
      </div>
    </Stage>
  );
}

/* ---------------- 6 · API & Integrations (hub) ---------------- */
function ApiIntegrations() {
  const eps = [
    { x: 14, y: 22 },
    { x: 14, y: 78 },
    { x: 86, y: 22 },
    { x: 86, y: 78 },
  ];
  return (
    <div className="absolute inset-0 z-10">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" preserveAspectRatio="none">
        {eps.map((e, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={e.x}
            y2={e.y}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.8"
            className="svc-flow"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 svc-ping rounded-xl bg-white/30" />
        <div className="svc-float relative grid size-12 place-items-center rounded-xl bg-white font-mono text-xs font-bold text-black shadow-xl">
          API
        </div>
      </div>
      {eps.map((e, i) => (
        <div
          key={i}
          className="svc-float-sm absolute flex h-7 -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-md bg-[#141414]/90 px-2 font-mono text-[8px] text-[#fbb457] shadow-lg ring-1 ring-white/10"
          style={{ left: `${e.x}%`, top: `${e.y}%`, animationDelay: `${i * 0.35}s` }}
        >
          {["GET", "POST", "PUT", "SYNC"][i]}
        </div>
      ))}
    </div>
  );
}

/* ---------------- 7 · AI Solutions (chat) ---------------- */
function AiSolutions() {
  return (
    <Stage>
      <Glass className="svc-float w-[80%] overflow-hidden">
        <WinBar title="assistant" dark />
        <div className="space-y-2 p-3">
          <div className="ml-auto w-[60%] rounded-lg rounded-tr-sm bg-white/10 px-2 py-1.5 text-[9px] text-white/70">
            Draft a launch plan
          </div>
          <div className="flex items-start gap-1.5">
            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#f2921e] text-[8px] text-black">
              ✦
            </span>
            <div className="w-[72%] rounded-lg rounded-tl-sm bg-white/5 px-2 py-1.5">
              <span className="svc-type block text-[9px] text-white/80">
                Analysing goals and drafting…
              </span>
              <span className="mt-1 flex gap-1">
                <span className="size-1 rounded-full bg-[#fbb457] svc-pulse" />
                <span
                  className="size-1 rounded-full bg-[#fbb457] svc-pulse"
                  style={{ animationDelay: "0.3s" }}
                />
                <span
                  className="size-1 rounded-full bg-[#fbb457] svc-pulse"
                  style={{ animationDelay: "0.6s" }}
                />
              </span>
            </div>
          </div>
        </div>
      </Glass>
      <Chip
        className="absolute left-4 top-5 svc-float-sm bg-[#f2921e] text-black"
        style={{ animationDelay: "-2s" }}
      >
        ✦ AI
      </Chip>
    </Stage>
  );
}

/* ---------------- 8 · Performance & SEO (gauge) ---------------- */
function Performance() {
  return (
    <Stage>
      <Panel className="svc-float flex w-[80%] items-center gap-4 p-4">
        <div className="relative size-16 shrink-0">
          <svg viewBox="0 0 100 100" className="size-full">
            <path
              d="M15 85 A40 40 0 1 1 85 85"
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M15 85 A40 40 0 0 1 72 28"
              fill="none"
              stroke="#f2921e"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* needle */}
            <g className="svc-needle" style={{ transformOrigin: "50px 85px" }}>
              <line x1="50" y1="85" x2="50" y2="36" stroke="#1c1c1c" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            <circle cx="50" cy="85" r="5" fill="#1c1c1c" />
          </svg>
          <span className="absolute inset-x-0 bottom-0 text-center text-[10px] font-bold text-black">
            99
          </span>
        </div>
        <div className="flex-1 space-y-1.5">
          {[
            ["LCP", 0.9],
            ["CLS", 0.75],
            ["SEO", 1],
          ].map(([label, w], i) => (
            <div key={label as string} className="flex items-center gap-2">
              <span className="w-7 text-[8px] font-semibold text-black/50">{label}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/5">
                <span
                  className="svc-pulse block h-full rounded-full bg-gradient-to-r from-[#c2721a] to-[#fbb457]"
                  style={{
                    width: `${(w as number) * 100}%`,
                    transformOrigin: "left",
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

/* ---------------- 9 · Maintenance & Support (shield) ---------------- */
function Maintenance() {
  return (
    <Stage>
      <div className="relative grid place-items-center">
        <span className="absolute size-20 svc-ping rounded-full bg-white/25" />
        <span
          className="absolute size-20 svc-ping rounded-full bg-white/25"
          style={{ animationDelay: "1.3s" }}
        />
        <div className="svc-float relative grid size-16 place-items-center rounded-2xl bg-white text-black shadow-xl">
          <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="#f2921e" strokeWidth="2">
            <path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <Chip
        className="absolute left-4 bottom-4 svc-float-sm bg-[#141414]/90 text-[#4ade80] ring-1 ring-white/10"
        style={{ animationDelay: "-1s" }}
      >
        <span className="size-1.5 rounded-full bg-[#4ade80] svc-pulse" /> 24/7 monitored
      </Chip>
    </Stage>
  );
}

/* ---------------- registry ---------------- */
// Same order as `services` in data/content.ts.
const scenes = [
  CustomWebsites,
  WebApplications,
  MobileApps,
  Ecommerce,
  UiUxDesign,
  CloudDevOps,
  ApiIntegrations,
  AiSolutions,
  Performance,
  Maintenance,
];

export function ServiceScene({ i }: { i: number }) {
  const Scene = scenes[i % scenes.length];
  return (
    <div className="svc-scene">
      <Scene />
    </div>
  );
}

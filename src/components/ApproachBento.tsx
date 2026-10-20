"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { approach, projects, showcase } from "@/data/content";
import { asset } from "@/lib/asset";
import { Reveal } from "./Reveal";

// Real interface screenshots shown behind the step 01 marquee cards.
const marqueeShots = ["/pp/agency.jpg", "/pp/travel.jpg", "/pp/motion-studio.jpg"];

type Step = (typeof approach)[number];

// Trig results can differ in the last digit between Node and the browser, which
// breaks hydration; rounding keeps server and client attribute strings identical.
const round2 = (n: number) => Math.round(n * 100) / 100;

// Body copy with the highlight phrase in the primary text colour.
function Body({ step }: { step: Step }) {
  const [before, after] = step.body.split(step.highlight);
  return (
    <p className="mt-3 max-w-[560px] text-[1.0625rem] leading-[1.65] text-muted sm:text-lg">
      {before}
      <span className="text-fg">{step.highlight}</span>
      {after}
    </p>
  );
}

function Card({
  step,
  art,
  children,
  delay = 0,
}: {
  step: Step;
  art?: ReactNode;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-line bg-elevated lg:h-[600px]">
        {art && (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {art}
          </div>
        )}
        <header className="relative p-7 sm:p-9">
          <h3 className="text-[1.875rem] font-semibold leading-tight tracking-h3 sm:text-[2.25rem]">
            {step.title}
          </h3>
          <Body step={step} />
        </header>
        <div aria-hidden className="relative min-h-[260px] flex-1">
          {children}
        </div>
      </article>
    </Reveal>
  );
}

export function ApproachBento() {
  const [s1, s2, s3, s4, s5, s6] = approach;
  return (
    <section className="scroll-mt-24 px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1376px]">
        <Reveal>
          <h2 className="text-[2.75rem] font-semibold leading-none tracking-h2 sm:text-6xl md:text-[4rem]">
            Our Approach
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.44fr_1fr]">
          <Card step={s1}>
            <SitesMarquee />
          </Card>
          <Card step={s2} delay={100} art={<PlanetArt />}>
            <Phones />
          </Card>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.44fr]">
          <Card step={s3} art={<StreakArt />}>
            <Laptop />
          </Card>
          <Card step={s4} delay={100} art={<StarsArt />}>
            <Editor />
          </Card>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.44fr_1fr]">
          <Card step={s5} art={<SilkArt />}>
            <ReleaseTable />
          </Card>
          <Card
            step={s6}
            delay={100}
            art={<div className="absolute inset-0 bg-[image:var(--wash)]" />}
          >
            <Dial />
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ---------- 01 · Scrolling row of site previews ---------- */
function SitesMarquee() {
  const sites = showcase
    .slice(0, 6)
    .map((s, i) => ({ ...s, ...projects[i % projects.length] }));
  return (
    <div className="marquee-wrap absolute inset-x-0 bottom-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="marquee items-end gap-5 pl-5"
        style={{ ["--duration" as string]: "45s" }}
      >
        {[...sites, ...sites].map((s, i) => (
          <div key={i} className="w-[340px] shrink-0 sm:w-[460px]">
            <div className="mb-2 flex gap-1.5 pl-1">
              <span className="size-2 rounded-full bg-[#ff5f57]" />
              <span className="size-2 rounded-full bg-[#febc2e]" />
              <span className="size-2 rounded-full bg-[#28c840]" />
            </div>
            <div className="relative h-[260px] overflow-hidden rounded-t-md sm:h-[330px]">
              <Image
                src={asset(marqueeShots[i % marqueeShots.length])}
                alt={`${s.brand} interface`}
                fill
                sizes="460px"
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 02 · Floating phones over a glowing blue planet ---------- */
function PlanetArt() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_125%,#f2921e_0%,#3a1f05_42%,transparent_72%)]" />
      <div className="absolute inset-x-[-32%] bottom-[-128%] aspect-square rounded-full bg-[radial-gradient(circle_at_50%_12%,#fbb457,#c2721a_38%,#2a1603_72%)] shadow-[0_-45px_130px_-20px_#f2921e]" />
    </>
  );
}

function Phones() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-2 sm:gap-4">
      <div className="breathe translate-y-12 -rotate-[10deg]">
        <PhoneFrame>
          <MinimalLightUI />
        </PhoneFrame>
      </div>
      <div
        className="breathe z-10 -translate-y-1 rotate-[9deg]"
        style={{ animationDelay: "-3s" }}
      >
        <PhoneFrame>
          <MinimalDarkUI />
        </PhoneFrame>
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[316px] w-[156px] sm:h-[356px] sm:w-[176px]">
      {/* Titanium frame */}
      <div className="absolute inset-0 rounded-[34px] bg-[linear-gradient(135deg,#dfe3e8,#8b9199_22%,#f4f6f8_50%,#6c7177_78%,#cdd2d8)] p-[3px] shadow-[0_35px_70px_-22px_rgba(0,0,0,0.75)]">
        <div className="relative h-full w-full overflow-hidden rounded-[31px] bg-black p-[2.5px]">
          <div className="relative h-full w-full overflow-hidden rounded-[29px]">
            {children}
            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-[7px] z-20 h-[17px] w-[50px] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
      {/* Side buttons */}
      <span className="absolute -left-[2px] top-[72px] h-5 w-[2px] rounded-l bg-[#71767c]" />
      <span className="absolute -left-[2px] top-[104px] h-9 w-[2px] rounded-l bg-[#71767c]" />
      <span className="absolute -left-[2px] top-[146px] h-9 w-[2px] rounded-l bg-[#71767c]" />
      <span className="absolute -right-[2px] top-[120px] h-12 w-[2px] rounded-r bg-[#71767c]" />
    </div>
  );
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "bg-white" : "bg-black";
  return (
    <div
      className={`relative z-10 flex items-center justify-between px-5 pt-[7px] text-[8px] font-semibold ${dark ? "text-white" : "text-black"}`}
    >
      <span>9:41</span>
      <span className="flex items-end gap-[3px]">
        <span className="flex items-end gap-[1.5px]">
          {[3, 5, 7, 9].map((h) => (
            <span
              key={h}
              className={`w-[2px] rounded-sm ${c}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </span>
        <span
          className={`ml-[1px] h-[8px] w-[11px] rounded-[2px] border ${dark ? "border-white" : "border-black"} p-[1px]`}
        >
          <span className={`block h-full w-2/3 rounded-[1px] ${c}`} />
        </span>
      </span>
    </div>
  );
}

/* Minimal light UI — clean product landing */
function MinimalLightUI() {
  return (
    <div className="flex h-full flex-col bg-[#fbfbfc] text-[#0b0b0d]">
      <StatusBar />
      <div className="mt-[6px] flex items-center justify-between px-[18px]">
        <span className="flex items-center gap-[5px] text-[11px] font-semibold tracking-tight">
          <span className="grid size-[15px] place-items-center rounded-[5px] bg-blue text-white">
            <span className="text-[9px] font-bold leading-none">L</span>
          </span>
          Lumen
        </span>
        <span className="flex flex-col gap-[3px]">
          <span className="h-[1.5px] w-[13px] rounded bg-black/70" />
          <span className="h-[1.5px] w-[13px] rounded bg-black/70" />
          <span className="h-[1.5px] w-[9px] rounded bg-black/70" />
        </span>
      </div>

      <div className="px-[18px] pt-6">
        <span className="inline-flex items-center gap-[4px] rounded-full bg-blue/10 px-[7px] py-[3px] text-[6.5px] font-medium text-blue">
          <Star className="size-[7px]" /> 4.9 · 2,340 reviews
        </span>
        <p className="mt-[10px] text-[1.3rem] font-semibold leading-[1.06] tracking-tight">
          Care that comes
          <br />
          <span className="text-black/35">to you,</span> today.
        </p>
        <p className="mt-[7px] text-[8px] leading-relaxed text-black/45">
          Personalized interfaces designed for clarity, calm and ease.
        </p>
        <div className="mt-[14px] flex items-center gap-[6px]">
          <span className="inline-flex h-[26px] flex-1 items-center justify-center gap-[5px] whitespace-nowrap rounded-full bg-[#0b0b0d] pl-[12px] pr-[5px] text-[7.5px] font-semibold text-white">
            Book now
            <span className="grid size-[17px] place-items-center rounded-full bg-blue text-[#0b0b0d]">
              <Arrow className="size-[8px]" />
            </span>
          </span>
          <span className="inline-flex h-[26px] items-center justify-center whitespace-nowrap rounded-full border border-black/15 px-[13px] text-[7.5px] font-semibold">
            Learn more
          </span>
        </div>
      </div>

      <div className="mt-auto p-[10px]">
        <div className="rounded-xl border border-black/[0.06] bg-white p-[9px] shadow-[0_8px_20px_-12px_rgba(0,0,0,0.25)]">
          <p className="text-[6.5px] font-semibold uppercase tracking-wider text-black/40">
            Available now
          </p>
          <div className="mt-[7px] flex items-center gap-[7px]">
            <span className="size-[22px] shrink-0 rounded-full bg-gradient-to-br from-blue-300 to-blue-700" />
            <span className="min-w-0 flex-1">
              <span className="block text-[8.5px] font-semibold leading-tight">
                Jonathan Reed
              </span>
              <span className="block text-[6.5px] text-black/45">
                Product Designer
              </span>
            </span>
            <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-blue text-white">
              <Arrow className="size-[7px]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Minimal dark UI — bold typographic portfolio */
function MinimalDarkUI() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0c] text-white">
      <StatusBar dark />
      <div className="mt-[6px] flex items-center justify-between px-[18px]">
        <span className="text-[12px] font-bold tracking-tight">
          Show<span className="text-blue">in</span>
        </span>
        <span className="flex items-center gap-[6px]">
          <span className="rounded-md border border-white/25 px-[7px] py-[3px] text-[7px] font-medium">
            Hire me
          </span>
          <span className="flex flex-col gap-[3px]">
            <span className="h-[1.5px] w-[11px] rounded bg-white/80" />
            <span className="h-[1.5px] w-[11px] rounded bg-white/80" />
          </span>
        </span>
      </div>

      <div className="px-[18px] pt-[22px]">
        <p className="text-[6.5px] font-medium uppercase tracking-[0.3em] text-white/40">
          01 — Introduction
        </p>
        <div className="mt-[10px] flex items-start justify-between">
          <p className="text-[1.5rem] font-black uppercase leading-[0.9] tracking-[-0.02em]">
            Expert
            <br />
            freelance
            <br />
            designer
          </p>
          <Asterisk className="mt-[3px] size-[26px] shrink-0 text-blue" />
        </div>
        <p className="mt-[12px] max-w-[85%] text-[7.5px] leading-relaxed text-white/45">
          Transforming ideas into reality with bold design and digital
          creativity.
        </p>
      </div>

      <div className="mt-auto flex items-stretch gap-[6px] p-[10px]">
        <span className="flex w-[52px] shrink-0 flex-col justify-between rounded-lg bg-blue p-[8px] text-[8px] font-black uppercase leading-[0.95] text-white">
          Hire
          <br />
          me
          <Arrow className="size-[9px] rotate-45" />
        </span>
        <span className="flex-1 rounded-lg bg-gradient-to-br from-[#17120c] via-blue-700 to-blue" />
      </div>
    </div>
  );
}

/* ---- tiny inline icons for the mockups ---- */
function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Asterisk({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-full bg-blue/15 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="size-2/3 text-blue"
      >
        <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
      </svg>
    </span>
  );
}

/* ---------- 03 · Laptop dashboard over a blue light streak ---------- */
function StreakArt() {
  return (
    <div className="absolute -right-1/3 -top-1/4 h-[150%] w-[85%] rotate-[28deg] bg-[linear-gradient(90deg,transparent,#c2721a_35%,#f2921e_48%,#fbb457_50%,#0a0600_52%,transparent)] opacity-90 blur-[2px]" />
  );
}

function Laptop() {
  return (
    <div className="absolute -right-10 bottom-0 left-10 sm:left-12">
      <div className="rounded-t-2xl border-[6px] border-b-0 border-[#1c1c1f] bg-[#1c1c1f] shadow-2xl">
        <div className="flex h-[300px] overflow-hidden rounded-t-lg bg-[#f6f7f9] text-black sm:h-[340px]">
          <div className="flex w-10 flex-col items-center gap-4 border-r border-black/5 py-4">
            <span className="size-4 rounded-full bg-blue" />
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`size-3 rounded ${i === 0 ? "bg-black/70" : "bg-black/15"}`}
              />
            ))}
          </div>
          <div className="flex-1 p-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                ["$48,210", "Revenue"],
                ["12,904", "Active users"],
                ["3.2%", "Conversion"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-base font-semibold">{v}</p>
                  <p className="text-[9px] text-black/50">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-white p-3 shadow-sm">
              <p className="text-[10px] font-semibold">Weekly traffic</p>
              <div className="mt-2 flex h-28 items-end gap-2">
                {[45, 62, 38, 70, 55, 82, 64].map((h, i) => (
                  <div key={i} className="flex h-full flex-1 items-end gap-0.5">
                    <span
                      className="flex-1 origin-bottom rounded-sm bg-[#c2721a]"
                      style={{
                        height: `${h}%`,
                        animation: `bar-grow 3.2s ${i * 0.18}s ease-in-out infinite`,
                      }}
                    />
                    <span
                      className="flex-1 rounded-sm bg-[#fbb457]"
                      style={{ height: `${h * 0.6}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 04 · Test runner with collaborators' cursors ---------- */
function StarsArt() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,#0a1f3d,transparent_60%)]" />
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(1px_1px_at_20px_30px,#fff,transparent),radial-gradient(1px_1px_at_120px_80px,#9cf,transparent),radial-gradient(1px_1px_at_200px_160px,#fff,transparent),radial-gradient(1px_1px_at_60px_190px,#fff,transparent)] [background-size:240px_220px]" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue/40 to-transparent" />
    </>
  );
}

function Editor() {
  const tests = [
    "auth › signs in",
    "auth › resets password",
    "cart › applies coupon",
    "checkout › pays",
    "a11y › contrast",
    "e2e › onboarding",
  ];
  return (
    <div className="absolute inset-x-6 bottom-0 top-2 sm:inset-x-9">
      <div className="flex h-full overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-[#0c0c0e] text-white">
        <div className="w-[42%] border-r border-white/10 p-3 text-[11px]">
          <div className="mb-3 flex gap-1 rounded-md bg-white/5 p-1 text-[10px] text-white/50">
            <span className="flex-1 rounded bg-white/10 py-1 text-center text-white">
              Tests
            </span>
            <span className="flex-1 py-1 text-center">Coverage</span>
          </div>
          <ul className="space-y-2">
            {tests.map((t, i) => (
              <li
                key={t}
                className="flex items-center gap-2 text-white/75"
                style={{
                  animation: `fade-in 0.4s ${0.3 + i * 0.35}s backwards`,
                }}
              >
                <span className="grid size-3.5 place-items-center rounded-full bg-[#28c840] text-[8px] text-black">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[10px] text-[#28c840]">6 passed · 0 failed</p>
        </div>
        <div className="flex-1 space-y-2.5 p-4">
          {[
            [12, 40, "#c084fc"],
            [20, 55, "#fbb457"],
            [20, 35, "#fff"],
            [28, 60, "#fbbf24"],
            [20, 45, "#fbb457"],
            [12, 25, "#c084fc"],
            [12, 50, "#fff"],
            [20, 38, "#fbb457"],
          ].map(([indent, width, color], i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-4 text-right font-mono text-[9px] text-white/25">
                {i + 1}
              </span>
              <span
                className="h-2 rounded opacity-70"
                style={{
                  marginLeft: Number(indent),
                  width: `${width}%`,
                  background: String(color),
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Cursor name="Ana" className="left-[38%] top-[30%]" path="cursor-a" />
      <Cursor name="Sam" className="left-[70%] top-[58%]" path="cursor-b" />
    </div>
  );
}

function Cursor({
  name,
  className,
  path,
}: {
  name: string;
  className: string;
  path: string;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ animation: `${path} 7s ease-in-out infinite` }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        className="text-blue drop-shadow"
        aria-hidden
      >
        <path d="M3 2l17 8-7.5 2.2L9.5 20z" fill="currentColor" />
      </svg>
      <span className="ml-3 inline-block rounded-full bg-blue px-3 py-1 text-xs font-medium text-white">
        {name}
      </span>
    </div>
  );
}

/* ---------- 05 · Release log over soft silk ---------- */
function SilkArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_10%_0%,#3a4a52_0%,transparent_45%),radial-gradient(90%_70%_at_100%_10%,#1f2a30_0%,transparent_55%),linear-gradient(160deg,#151a1d,#0b0b0c_60%)]" />
  );
}

function ReleaseTable() {
  const rows = [
    ["v2.4.1", "Performance improvements", "08 Oct 2026"],
    ["v2.4.0", "New billing dashboard", "24 Sep 2026"],
    ["v2.3.2", "Accessibility fixes", "12 Sep 2026"],
    ["v2.3.1", "Faster image loading", "29 Aug 2026"],
    ["v2.3.0", "Team workspaces", "15 Aug 2026"],
    ["v2.2.4", "Security patch", "02 Aug 2026"],
  ];
  return (
    <div className="absolute inset-x-6 bottom-0 top-0 sm:left-9 sm:right-0">
      <div className="h-full overflow-hidden rounded-tl-xl border border-b-0 border-white/10 bg-[#0b0b0c]/95 text-white">
        <div className="grid grid-cols-[1fr_auto_auto] gap-6 border-b border-white/10 px-6 py-4 text-sm text-white/50 sm:grid-cols-[2fr_1fr_0.6fr]">
          <span>Release</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        <div className="relative h-full overflow-hidden">
          <ul className="animate-[release-scroll_18s_linear_infinite]">
            {[...rows, ...rows].map(([v, title, date], i) => (
              <li
                key={i}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-6 border-b border-white/10 px-6 py-4 text-sm sm:grid-cols-[2fr_1fr_0.6fr]"
              >
                <span className="flex items-center gap-3">
                  <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-white/70">
                    {v}
                  </span>
                  <span className="truncate">{title}</span>
                </span>
                <span className="text-white/60">{date}</span>
                <span className="flex items-center gap-1.5 text-[#28c840]">
                  <span className="size-1.5 rounded-full bg-[#28c840]" />
                  Live
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- 06 · Live dial ---------- */
function Dial() {
  const ref = useRef<SVGSVGElement>(null);

  // Start each hand at the visitor's current time by offsetting its rotation.
  useEffect(() => {
    const now = new Date();
    const secs =
      now.getHours() * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds() +
      now.getMilliseconds() / 1000;
    const hands: [string, number][] = [
      [".dial-hour", 43200],
      [".dial-min", 3600],
      [".dial-sec", 60],
    ];
    for (const [sel, period] of hands) {
      const el = ref.current?.querySelector<SVGGElement>(sel);
      if (el) el.style.animationDelay = `-${secs % period}s`;
    }
  }, []);

  const ticks = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="absolute inset-0 grid place-items-center pb-6">
      <svg
        ref={ref}
        viewBox="-110 -110 220 220"
        className="w-[78%] max-w-[380px] drop-shadow-[0_30px_40px_#000]"
      >
        <defs>
          <linearGradient id="bezel" x1="0" y1="-1" x2="0" y2="1">
            <stop offset="0" stopColor="#d9d9d9" />
            <stop offset="0.5" stopColor="#4a4a4a" />
            <stop offset="1" stopColor="#bdbdbd" />
          </linearGradient>
        </defs>
        <circle r="106" fill="url(#bezel)" />
        <circle r="100" fill="#050505" />
        {ticks.map((i) => {
          const major = i % 5 === 0;
          return (
            <line
              key={i}
              x1="0"
              y1={major ? -92 : -94}
              x2="0"
              y2={major ? -76 : -88}
              stroke={major ? "#f2f2f2" : "#6b6b6b"}
              strokeWidth={major ? 3.2 : 1}
              strokeLinecap="round"
              transform={`rotate(${i * 6})`}
            />
          );
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const a = ((i * 30 - 90) * Math.PI) / 180;
          return (
            <text
              key={i}
              x={round2(Math.cos(a) * 64)}
              y={round2(Math.sin(a) * 64 + 4)}
              textAnchor="middle"
              fontSize="10"
              fill="#a3a3a3"
              fontFamily="var(--font-geist)"
            >
              {i === 0 ? 60 : i * 5}
            </text>
          );
        })}
        <g
          className="dial-hand dial-hour"
          style={{ animationDuration: "43200s" }}
        >
          <path d="M-3.5 8 L-2 -46 L2 -46 L3.5 8 Z" fill="#e5e5e5" />
        </g>
        <g
          className="dial-hand dial-min"
          style={{ animationDuration: "3600s" }}
        >
          <path d="M-2.5 10 L-1.5 -72 L1.5 -72 L2.5 10 Z" fill="#f5f5f5" />
        </g>
        <g className="dial-hand dial-sec" style={{ animationDuration: "60s" }}>
          <line
            x1="0"
            y1="18"
            x2="0"
            y2="-86"
            stroke="#f2921e"
            strokeWidth="1.2"
          />
          <circle r="2.6" fill="#f2921e" />
        </g>
        <circle r="1.2" fill="#000" />
      </svg>
    </div>
  );
}

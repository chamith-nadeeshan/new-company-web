"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Button, Logo, Roll } from "./ui";

// top: transparent, full width · glass: full-width frosted bar · compact: floating pill
type NavState = "top" | "glass" | "compact";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<NavState>("top");

  useEffect(() => {
    const onScroll = () => {
      // Shrink to the pill once the landing section has scrolled away.
      const hero = document.getElementById("home");
      const heroEnd = hero ? hero.offsetTop + hero.offsetHeight - 68 : 600;
      const y = window.scrollY;
      setState(y > heroEnd ? "compact" : y > 24 ? "glass" : "top");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Contact lives in the CTA button on desktop.
  const links = siteConfig.nav.filter((n) => n.label !== "Contact");
  const compact = state === "compact" && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[padding,background-color,border-color,backdrop-filter] duration-500 ease-brand ${
        compact
          ? "border-transparent px-3 pt-3 sm:pt-5"
          : state === "glass" || open
            ? "border-line bg-nav backdrop-blur-[24px] backdrop-saturate-150"
            : "border-transparent"
      }`}
    >
      <nav
        className={`relative mx-auto flex items-center justify-between border transition-[max-width,height,padding,background-color,border-color,border-radius] duration-500 ease-brand ${
          compact
            ? "h-[60px] max-w-[920px] rounded-lg border-line bg-nav px-3 backdrop-blur-[24px] backdrop-saturate-150"
            : "h-[68px] max-w-[1380px] rounded-none border-transparent px-4 sm:px-8"
        }`}
      >
        <Logo heightClass="h-5" wordmarkClass="text-[1.375rem]" />

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {links.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`group text-[0.9375rem] transition-colors duration-200 ${
                  i === 0 ? "font-medium text-fg" : "text-muted hover:text-fg"
                }`}
              >
                <Roll>{item.label}</Roll>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Button href="#contact" size="sm">
              Let&apos;s Connect
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 grid size-10 place-items-center rounded-full border border-line-strong lg:hidden"
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-fg transition-all duration-300 ease-brand ${open ? "top-1 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-fg transition-all duration-300 ease-brand ${open ? "top-1 -rotate-45" : "top-2"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu with numbered items */}
      <div
        className={`fixed inset-0 top-[68px] z-40 flex flex-col bg-bg px-6 pb-10 pt-6 transition-all duration-500 ease-brand lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {siteConfig.nav.map((item, i) => (
            <li key={item.href} className="border-b border-line">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-4 text-3xl font-medium tracking-h3"
              >
                <span className="text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-1 text-sm text-muted">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <span>{siteConfig.phone}</span>
        </div>
      </div>
    </header>
  );
}

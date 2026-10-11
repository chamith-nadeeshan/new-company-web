"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

// The theme lives on <html data-theme>, set before paint by the inline script in layout.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
  const isLight = theme === "light";

  const toggle = () => {
    const next: Theme = isLight ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Toggle light theme"
      onClick={toggle}
      className="relative h-6 w-11 shrink-0 rounded-full border border-line-strong bg-surface-strong transition-colors duration-200"
    >
      <span
        className={`absolute top-1/2 size-[18px] -translate-y-1/2 rounded-full bg-fg shadow transition-[left] duration-300 ease-brand ${
          isLight ? "left-[22px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

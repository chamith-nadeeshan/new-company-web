"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

// The year is read in the browser rather than at build/prerender time, so the
// footer stays current without a rebuild and works with static export.
export function Year() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year}</>;
}

import { cacheLife } from "next/cache";

// Cached so the page can still be prerendered; refreshed daily.
export async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

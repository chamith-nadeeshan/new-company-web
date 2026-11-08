import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Static export: emitted as /manifest.webmanifest and linked automatically.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.jpg", sizes: "2048x2048", type: "image/jpeg" },
      { src: "/apple-icon.jpg", sizes: "2048x2048", type: "image/jpeg" },
    ],
  };
}

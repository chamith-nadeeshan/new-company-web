import type { NextConfig } from "next";

// The site is a fully static export (`output: "export"` → `out/`). All routes are
// prerendered: /, /about, /services, /works and every /works/[slug] via
// generateStaticParams. No Node server is needed on the host — serve `out/`
// directly (IIS/shared Windows hosting, GitHub Pages, any static host).
//
// `npm run build:pages` sets GITHUB_PAGES=1 to add the project basePath for
// https://<user>.github.io/new-company-web/. Any other host (Windows/IIS,
// Vercel static) builds with no basePath via plain `npm run build`.
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? "/new-company-web" : "";

const nextConfig: NextConfig = {
  output: "export",
  // IIS/static hosts serve /about/index.html cleanly with trailing slashes.
  trailingSlash: true,
  basePath,
  experimental: {
    agentUpgrade: "security",
  },
  images: {
    // Static hosts have no image optimizer.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

// `npm run build:pages` sets GITHUB_PAGES=1 to produce a static export served
// from https://<user>.github.io/new-company-web/.
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? "/new-company-web" : "";

const nextConfig: NextConfig = {
  // Partial prerendering is not supported with static export.
  cacheComponents: !pages,
  partialPrefetching: !pages,
  ...(pages && { output: "export", basePath, trailingSlash: true }),
  images: {
    // Static hosts have no image optimizer.
    unoptimized: pages,
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

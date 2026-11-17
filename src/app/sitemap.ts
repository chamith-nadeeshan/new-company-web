import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { blogPosts, caseStudies, services } from "@/data/content";

// Static export: emitted as /sitemap.xml at build time. URLs carry a trailing
// slash to match `trailingSlash: true` and the per-page canonicals.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const url = (path: string) => `${base}/${path ? `${path}/` : ""}`;
  const now = new Date();

  const topLevel: MetadataRoute.Sitemap = [
    { url: url(""), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("works"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: url("terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const workPages: MetadataRoute.Sitemap = caseStudies.map((s) => ({
    url: url(`works/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: url(`blog/${p.slug}`),
    lastModified: p.dateISO,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...topLevel, ...servicePages, ...workPages, ...blogPages];
}

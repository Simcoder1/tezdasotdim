import type { MetadataRoute } from "next";
import { SEO_PAGES } from "./lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tezdasotdim.vercel.app";
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/katalog`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/telegram-bot`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...SEO_PAGES.map((page) => ({
      url: `${siteUrl}/telegram-bot/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}

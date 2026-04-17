import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://acm23.org";
  const pages = [
    "",
    "/about",
    "/program",
    "/speakers",
    "/registration",
    "/abstract",
    "/dates",
    "/committees",
    "/venue",
    "/contact",
  ];

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}

import type { MetadataRoute } from "next";
import {
  getAllCityHubSlugs,
  getCityHubHref,
} from "@/data/landingPages";

const SITE_URL = "https://wesselpawel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const cityHubs: MetadataRoute.Sitemap = getAllCityHubSlugs().map((citySlug) => ({
    url: `${SITE_URL}${getCityHubHref(citySlug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...cityHubs];
}

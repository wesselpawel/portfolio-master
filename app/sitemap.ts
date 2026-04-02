import type { MetadataRoute } from "next";
import {
  getAllCityHubSlugs,
  getAllLandingPagePaths,
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
    {
      url: `${SITE_URL}/realizations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/polityka-prywatnosci`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/polityka-cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const landingPages: MetadataRoute.Sitemap = getAllLandingPagePaths().map(
    (pathname) => ({
      url: `${SITE_URL}${pathname}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const cityHubs: MetadataRoute.Sitemap = getAllCityHubSlugs().map((citySlug) => ({
    url: `${SITE_URL}${getCityHubHref(citySlug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...cityHubs, ...landingPages];
}

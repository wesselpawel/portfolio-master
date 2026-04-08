/** @type {import('next-sitemap').IConfig} */
import { polishCities, getAllCitySlugs } from "./lib/polishCities";
import { getDocuments, getBlogPosts } from "./common/firebase";

module.exports = {
  siteUrl: process.env.SITE_URL || "https://quixy.pl",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*"],
  generateIndexSitemap: false,

  // Additional paths for dynamic routes
  additionalPaths: async (config) => {
    const paths = [];

    try {
      // Add existing blog posts
      const [collectionDocs, legacyDoc] = await Promise.all([
        getDocuments("blog"),
        getBlogPosts(),
      ]);

      const legacyPosts = Array.isArray(legacyDoc?.posts)
        ? legacyDoc.posts
        : [];
      const combined = [...(collectionDocs || []), ...legacyPosts];

      combined.forEach((post) => {
        if (post?.slug || post?.url || post?.postId) {
          const slug = post.slug || post.url || post.postId;
          paths.push({
            loc: `/oferta/${slug}`,
            changefreq: "weekly",
            priority: 0.8,
            lastmod: new Date(post.creationTime || Date.now()).toISOString(),
          });
        }
      });
    } catch (error) {
      console.error("Error fetching blog posts for sitemap:", error);
    }

    // Add all city-based pages
    const citySlugs = getAllCitySlugs();
    citySlugs.forEach((slug) => {
      paths.push({
        loc: `/oferta/${slug}`,
        changefreq: "monthly",
        priority: 0.9, // High priority for city pages
        lastmod: new Date().toISOString(),
      });
    });

    return paths;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    additionalSitemaps: ["https://quixy.pl/sitemap.xml"],
  },

  transform: async (config, path) => {
    // Custom transform for different page types
    if (path.startsWith("/oferta/strona-internetowa-")) {
      // High priority for city pages
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    if (path.startsWith("/oferta/")) {
      // Medium priority for other blog posts
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Default priority for other pages
    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};

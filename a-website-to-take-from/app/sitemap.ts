import { MetadataRoute } from "next";
import { getDocuments, getBlogPosts } from "@/common/firebase";
import { getAllCitySlugs } from "@/lib/polishCities";
import { getProducts } from "@/common/firebase/quixy";
import { polishToEnglish } from "@/utils/polishToEnglish";
import { getAllGrudziadzServiceLeaves } from "@/lib/grudziadz/serviceIndex";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://quixy.pl";

  const grudziadzHub: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/grudziadz`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const grudziadzServicePages: MetadataRoute.Sitemap =
    getAllGrudziadzServiceLeaves().map((leaf) => ({
      url: `${baseUrl}/grudziadz/${leaf.publicSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Get existing blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const [collectionDocs, legacyDoc]: any = await Promise.all([
      getDocuments("blog"),
      getBlogPosts(),
    ]);

    const legacyPosts = Array.isArray(legacyDoc?.posts) ? legacyDoc.posts : [];
    const combined = [...(collectionDocs || []), ...legacyPosts];

    blogPages = combined
      .filter((post) => post?.slug || post?.url || post?.postId)
      .map((post) => {
        const slug = post.slug || post.url || post.postId;
        return {
          url: `${baseUrl}/oferta/${slug}`,
          lastModified: new Date(post.creationTime || Date.now()),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      });
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  // Get all city-based pages
  const citySlugs = getAllCitySlugs();
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${baseUrl}/oferta/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    newsPages = products.map((product: any) => ({
      url: `${baseUrl}/news/${product.url}`,
      lastModified: new Date(
        product.updatedAt || product.createdAt || Date.now()
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
  }
  // --- OFERTA DLA FIRM ---
  let ofertaPages: MetadataRoute.Sitemap = [];
  try {
    const jobs = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
    ).then((res) => res.json());

    jobs.forEach((service: any) => {
      const slug = polishToEnglish(service.title);
      // /oferta/dla-firm/[slug]
      ofertaPages.push({
        url: `${baseUrl}/oferta/dla-firm/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      service.data.forEach((category: any) => {
        const categorySlug = polishToEnglish(category.title);
        // /oferta/dla-firm/[slug]/[category]
        ofertaPages.push({
          url: `${baseUrl}/oferta/dla-firm/${slug}/${categorySlug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });

        category.data.forEach((job: any) => {
          const jobSlug = polishToEnglish(job.title);
          // /oferta/dla-firm/[slug]/[category]/[job]
          ofertaPages.push({
            url: `${baseUrl}/oferta/dla-firm/${slug}/${categorySlug}/${jobSlug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          });
        });
      });
    });
  } catch (error) {
    console.error("Error fetching oferta dla firm for sitemap:", error);
  }

  return [
    ...staticPages,
    ...grudziadzHub,
    ...grudziadzServicePages,
    ...blogPages,
    ...cityPages,
    ...ofertaPages,
    ...newsPages,
  ];
}

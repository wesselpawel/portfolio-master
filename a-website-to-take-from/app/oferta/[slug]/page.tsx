import Image from "next/image";
import Link from "next/link";
import { getDocuments, getBlogPosts } from "@/common/firebase";
import { Post } from "@/types";
import Hero from "@/components/hero/Hero";
import { FaBook } from "react-icons/fa";
import ParallaxImage from "@/components/ParallaxImage";
import ParallaxSection from "@/components/ParallaxSection";
import Cta from "@/components/cta/Cta";
import { Metadata } from "next";
import Script from "next/script";
import FaqSection from "./FaqSection";
import {
  getAllCitySlugs,
  isCitySlug,
  slugToCity,
  getCityDisplayName,
  getCityNominative,
} from "@/lib/polishCities";
import { generateCityPost } from "@/lib/cityPostGenerator";
import PricingHero from "@/components/landing/PricingHero";
import BlogSection from "@/components/landing/BlogSection";
import OpinionsSection from "@/components/landing/OpinionsSection";
import ReachSection from "@/components/landing/ReachSection";
import { notFound } from "next/navigation";
import { getUsersData } from "@/lib/getUsersData";
import JobBoardList from "@/components/quixyComponents/JobBoardList";
import HeroIntro from "@/components/landing/HeroIntro";
import MainCard from "@/components/landing/MainCard";
import ProjectShowcase from "@/components/ProjectShowcase";
import Contact from "@/components/quixyComponents/Contact";

// Remove top-level await for getUsers, move to page function

// Generate static params for all city-based slugs
export async function generateStaticParams() {
  try {
    // Get existing blog post slugs
    const [collectionDocs, legacyDoc]: any = await Promise.all([
      getDocuments("blog"),
      getBlogPosts(),
    ]);

    const legacyPosts = Array.isArray(legacyDoc?.posts) ? legacyDoc.posts : [];
    const combined: Post[] = [...(collectionDocs || []), ...legacyPosts];
    const blogSlugs = combined
      .map((post) => ({ slug: post.slug || post.url || post.postId }))
      .filter(Boolean);

    // Get all city-based slugs
    const citySlugs = getAllCitySlugs().map((slug) => ({ slug }));

    // Combine both types of slugs
    return [...blogSlugs, ...citySlugs];
  } catch (error) {
    console.error("Error generating static params:", error);
    // Fallback to just city slugs if blog fetching fails
    return getAllCitySlugs().map((slug) => ({ slug }));
  }
}

// Helper function to get post data
async function getPostData(slug: string): Promise<Post | null> {
  try {
    // First, check database for all posts (including city posts)
    const [collectionDocs, legacyDoc]: any = await Promise.all([
      getDocuments("blog"),
      getBlogPosts(),
    ]);
    const legacyPosts = Array.isArray(legacyDoc?.posts) ? legacyDoc.posts : [];
    const combined: Post[] = [...(collectionDocs || []), ...legacyPosts];

    // Look for exact match in database first
    const existingPost =
      combined.find((p) => p?.slug === slug) ||
      combined.find((p) => p?.url === slug) ||
      combined.find((p) => p?.postId === slug);

    if (existingPost) {
      return existingPost;
    }

    // If not found and it's a city-based slug, generate fallback content
    if (isCitySlug(slug)) {
      const cityName = slugToCity(slug);
      if (cityName) {
        // Generate on-the-fly content as fallback
        return generateCityPost(cityName);
      }
    }

    return null;
  } catch (e) {
    console.error("Error fetching post data:", e);
    return null;
  }
}

// Metadata generation function
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    // Enhanced 404 metadata for city pages
    if (isCitySlug(params.slug)) {
      const cityName = slugToCity(params.slug);
      const displayName = cityName
        ? getCityDisplayName(cityName)
        : "Polski Miasto";
      return {
        title: `Tworzenie stron internetowych ${displayName} | Quixy Studio`,
        description: `W Quixy tworzymy sklepy internetowe, platformy internetowe oraz prowadzimy marketing. Strony internetowe ${displayName}.`,
      };
    }

    return {
      title: "Artykuł nie znaleziony | Quixy Studio",
      description: "Nie znaleziono artykułu. Sprawdź adres i spróbuj ponownie.",
    };
  }

  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription || post.intro || "Artykuł z Quixy Studio";
  const keywords = post.metaKeywords || post.tags || [];
  const imageUrl =
    typeof post.mainImage === "string" &&
    (post.mainImage.startsWith("http://") ||
      post.mainImage.startsWith("https://") ||
      post.mainImage.startsWith("/"))
      ? post.mainImage
      : "/assets/earth.jpg";

  const url = `https://quixy.pl/oferta/${params.slug}`;

  return {
    title: `${title}`,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
    authors: [{ name: "Quixy Studio", url: "https://quixy.pl" }],
    publisher: "Quixy Studio",
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Quixy Studio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: new Date(post.creationTime).toISOString(),
      modifiedTime: new Date(post.creationTime).toISOString(),
      authors: ["Quixy Studio"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@quixystudio",
      site: "@quixystudio",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function PageContent({
  post,
  slug,
  talents,
  companies,
}: {
  post: Post;
  slug: string;
  talents: any[];
  companies: any[];
}) {
  // Generate JSON-LD structured data for FAQ
  const faqJsonLd =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  // Generate JSON-LD structured data for Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.intro || post.metaDescription,
    image:
      // Use globe image for city-based posts, otherwise use post's main image
      isCitySlug(slug)
        ? "/assets/earth.jpg"
        : typeof post.mainImage === "string" &&
          (post.mainImage.startsWith("http://") ||
            post.mainImage.startsWith("https://") ||
            post.mainImage.startsWith("/"))
        ? post.mainImage
        : "/assets/earth.jpg",
    author: {
      "@type": "Organization",
      name: "Quixy Studio",
      url: "https://quixy.pl",
    },
    publisher: {
      "@type": "Organization",
      name: "Quixy Studio",
      logo: {
        "@type": "ImageObject",
        url: "https://quixy.pl/quixy-logo.png",
      },
    },
    datePublished: new Date(post.creationTime).toISOString(),
    dateModified: new Date(post.creationTime).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://quixy.pl/oferta/${slug}`,
    },
    keywords: post.tags?.join(", "),
  };
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      {faqJsonLd && (
        <Script
          id="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      )}

      <div className="relative w-screen overflow-x-hidden">
        <div className="fixed left-0 top-0 w-full h-full">
          <Hero />
        </div>
        <div className="font-sans w-full bg-zinc-800 pb-48 h-full">
          <HeroIntro city={getCityNominative(slugToCity(slug)!)} />

          <main className="font-sans overflow-visible relative items-center min-h-screen grid grid-cols-1 z-30">
            <section className={`max-w-[90vw] mx-auto h-max z-50`}>
              <MainCard
                talents={talents}
                companies={companies}
                city={getCityNominative(slugToCity(slug)!)}
              />
              <ProjectShowcase dictionary={dictionary} />
              <BlogSection />
              <Contact isLandingPage={true} />
              <div className="relative z-10 w-full mt-24">
                <article className="w-full mx-auto">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white p-8 md:p-12 overflow-hidden rounded-2xl shadow-xl border border-gray-100">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-100 to-green-100 rounded-full translate-y-24 -translate-x-24 opacity-20"></div>

                    {/* Header Section */}
                    <div className="relative z-10 mb-12">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                        <div className="flex-1">
                          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Lokalna obsługa
                          </div>
                          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight font-gotham mb-4">
                            {post.title}
                          </h2>
                          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                            Profesjonalne strony internetowe dostosowane do
                            potrzeb Twojej firmy. Nowoczesny design, szybka
                            realizacja, konkurencyjne ceny.
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <Image
                              src="/assets/quixy-logo.png"
                              width={400}
                              height={400}
                              alt="Quixy Studio Strony Internetowe Logo"
                              className="w-auto h-24 lg:h-32 drop-shadow-lg"
                              priority
                            />
                            <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg opacity-20 blur-lg"></div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            500+
                          </div>
                          <div className="text-sm text-gray-600">
                            Zrealizowanych projektów
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            24h
                          </div>
                          <div className="text-sm text-gray-600">
                            Czas odpowiedzi
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            5 lat
                          </div>
                          <div className="text-sm text-gray-600">
                            Doświadczenia
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">
                            100%
                          </div>
                          <div className="text-sm text-gray-600">
                            Zadowolonych klientów
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10">
                      {post.intro && (
                        <div className="mb-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-3 font-gotham">
                                Dlaczego warto wybrać nas?
                              </h3>
                              <p className="text-gray-700 text-base lg:text-lg leading-relaxed whitespace-pre-line">
                                {post.intro}
                              </p>
                            </div>
                          </div>
                          <div className="mt-6 flex items-center space-x-4">
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                            <div className="text-sm text-gray-500 font-medium">
                              Sprawdź naszą ofertę
                            </div>
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                          </div>
                        </div>
                      )}

                      {post.sections && post.sections.length > 0 && (
                        <div className="space-y-16">
                          {post.sections.map((section, idx) => (
                            <section key={idx} className="relative">
                              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                {section.title && (
                                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                                    <div className="flex items-center space-x-4">
                                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                          {idx + 1}
                                        </span>
                                      </div>
                                      <h2 className="text-2xl lg:text-3xl text-gray-900 font-bold font-gotham">
                                        {section.title}
                                      </h2>
                                    </div>
                                  </div>
                                )}
                                <div className="p-8">
                                  <div
                                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-gotham prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:text-gray-700 prose-li:text-gray-700 prose-li:leading-relaxed prose-a:text-green-600 prose-a:hover:text-green-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-ol:text-gray-700"
                                    dangerouslySetInnerHTML={{
                                      __html: section.content,
                                    }}
                                  />
                                </div>
                              </div>
                            </section>
                          ))}
                        </div>
                      )}

                      {post.outro && (
                        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-3 font-gotham">
                                Gotowy na start?
                              </h3>
                              <p className="text-gray-700 text-base lg:text-lg leading-relaxed whitespace-pre-line">
                                {post.outro}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* FAQ Section */}
                      <div className="mt-16">
                        <FaqSection faqs={post.faq} />
                      </div>

                      {/* CTA Section */}
                      <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
                        <div className="max-w-2xl mx-auto">
                          <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-gotham">
                            Rozpocznij swój projekt już dziś!
                          </h3>
                          <p className="text-green-100 text-lg mb-6">
                            Skontaktuj się z nami i otrzymaj bezpłatną wycenę w
                            ciągu 24 godzin
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Cta label="Dodaj zlecenie" />
                            <Link
                              href="/contact"
                              title="Skontaktuj się"
                              className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                            >
                              Bezpłatna konsultacja
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Opinions Section */}
                      <div className="mt-16">
                        <div className="max-w-[450px]">
                          <OpinionsSection darkBg={false} />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
                <div className="max-w-[90vw] mx-auto font-sans my-12">
                  <div className="bg-white rounded-xl p-6">
                    <PricingHero city={getCityNominative(slugToCity(slug)!)} />
                    <div className="my-12 mx-auto bg-gradient-to-b from-gray-100 via-zinc-100 to-gray-100 rounded-2xl p-6">
                      <div className="relative sm:px-8">
                        <span className="font-gotham font-semibold text-zinc-800 drop-shadow-lg shadow-black w-full text-lg sm:text-3xl lg:text-4xl flex flex-row items-center justify-center mb-2 tracking-tight max-w-3xl text-center mx-auto">
                          Zaufani freelancerzy oraz firmy współpracujące z
                          Quixy!
                        </span>
                        <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-6"></div>
                        <div className="mt-6">
                          <JobBoardList
                            talents={talents}
                            companies={companies}
                          />
                        </div>
                      </div>
                      <p className="text-zinc-700 text-base sm:text-lg max-w-3xl mx-auto text-center mt-14 font-gotham font-light leading-relaxed px-2">
                        W poszukiwaniu firmy lub freelancera?{" "}
                        <span className="font-semibold text-blue-600">
                          Sprawdź ofertę zaufanych partnerów Quixy Studio.
                        </span>{" "}
                        Możesz dodawać zlecenia dla freelancerów lub zlecenia
                        dla firm.
                      </p>
                    </div>
                    <ReachSection markers={markers} />
                  </div>
                  {/* <BlogSection /> */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // If the slug is a city slug but not a valid city, show 404
  if (isCitySlug(slug) && !slugToCity(slug)) {
    notFound();
  }

  const post = await getPostData(slug);

  // If it's a city slug, but the city is not valid, show 404
  if (isCitySlug(slug) && !slugToCity(slug)) {
    notFound();
  }

  // If it's not a city slug and not a post, show 404
  if (!post) {
    notFound();
  }

  // Fetch users, talents, companies here
  let users: any[] = [];
  let talents: any[] = [];
  let companies: any[] = [];
  try {
    users = await getUsersData();
    talents = users.filter(
      (user) => user.seek && user.configured && user.access
    );
    companies = users.filter(
      (user) => !user.seek && user.configured && user.access
    );
  } catch (e) {
    // fallback to empty arrays if error
    talents = [];
    companies = [];
  }

  return (
    <PageContent
      post={post}
      slug={slug}
      talents={talents}
      companies={companies}
    />
  );
}
const markers = [
  {
    style: "w-[8%] absolute top-[40%] left-[9.5%] sm:left-[8.5%]",
    label: "Szczecin - Strona internetowa dla restauracji",
  },
  {
    style: "w-[10%] absolute top-[58%] left-[18%]",
    label: "Zielona Góra - Sklep online z elektroniką",
  },
  {
    style: "w-[6%] absolute top-[69%] left-[33%]",
    label: "Wrocław - Portfolio fotografa",
  },
  {
    style: "w-[6%] absolute top-[76%] left-[43%]",
    label: "Opole - Strona dla kancelarii prawnej",
  },
  {
    style: "w-[6%] absolute top-[67%] left-[44.5%]",
    label: "Katowice - Sklep internetowy z odzieżą",
  },
  {
    style: "w-[8%] absolute top-[81%] left-[56.5%]",
    label: "Kraków - Strona internetowa dla hotelu",
  },
  {
    style: "w-[8%] absolute top-[78%] left-[72.5%]",
    label: "Rzeszów - Portal edukacyjny",
  },
  {
    style: "w-[10%] absolute top-[57%] left-[79%]",
    label: "Lublin - Strona internetowa dla lekarza",
  },
  {
    style: "w-[8%] absolute top-[65%] left-[60.5%]",
    label: "Kielce - Blog kulinarny",
  },
  {
    style: "w-[10%] absolute top-[50%] left-[47.5%]",
    label: "Łódź - Portfolio grafika",
  },
  {
    style: "w-[8%] absolute top-[46%] left-[30%]",
    label: "Poznań - Strona internetowa dla agencji marketingowej",
  },
  {
    style: "w-[8%] absolute top-[36%] left-[22%]",
    label: "Gorzów Wlkp. - Strona internetowa dla szkoły językowej",
  },
  {
    style: "w-[10%] absolute top-[27%] left-[37.5%]",
    label: "Bydgoszcz - Sklep internetowy z zabawkami",
  },
  {
    style: "w-[8%] absolute top-[44%] left-[65%]",
    label: "Radom - Strona internetowa dla architekta",
  },
  {
    style: "w-[8%] absolute top-[34%] left-[56%]",
    label: "Białystok - Portal informacyjny",
  },
  {
    style: "w-[10%] absolute top-[23%] left-[78%]",
    label: "Suwałki - Strona internetowa dla firmy budowlanej",
  },
  {
    style: "w-[10%] absolute top-[14.5%] sm:top-[13.5%] left-[58%]",
    label: "Olsztyn - Strona internetowa dla przedszkola",
    aos: "zoom-in",
  },
  {
    style: "w-[10%] absolute top-[6%] left-[32%]",
    label: "Gdańsk - Strona internetowa dla salonu fryzjerskiego",
  },
  {
    style: "w-[10%] absolute top-[10%] left-[10%]",
    label: "Koszalin - Strona internetowa dla trenera personalnego",
  },
];
const dictionary = {
  HomePage: {
    projects: [
      {
        name: "Blackbellart.com",
        shortDescription:
          "Aplikacja internetowa dla artysty. Sklep z obrazami, oferta usług tatuatorskich.",
        images: [
          "/images/projects/blackbellart/hero.webp",
          "/images/projects/blackbellart/shop.webp",
          "/images/projects/blackbellart/shopItem.webp",
          "/images/projects/blackbellart/tattooBlog.webp",
          "/images/projects/blackbellart/tattoos.webp",
          "/images/projects/blackbellart/contact.webp",
        ],
        link: "https://www.blackbellartstudio.pl/",
        type: "Sklep Online",
        technologies: [
          "React",
          "TypeScript",
          "Next",
          "Redux",
          "Stripe",
          "Firebase",
          "Tailwind",
          "ThreeJS",
          "PWA",
        ],
        colors: ["#252326", "#8F26F3", "#22C55E"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["regular", "bold", "light", "italic"],
          },
          {
            fontName: "Gilroy",
            variants: ["regular"],
          },
          {
            fontName: "GraublauWeb",
            variants: ["regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/art-tattoo",
      },
      {
        name: "Zaklejki.pl",
        shortDescription:
          "Sklep internetowy z kolekcją ponad 2000 ręcznie wycinanych naklejkami.",
        images: [
          "/images/projects/zaklejki/hero.webp",
          "/images/projects/zaklejki/lottery.webp",
          "/images/projects/zaklejki/shop.webp",
          "/images/projects/zaklejki/product.webp",
        ],
        link: "https://www.zaklejki.pl/",
        type: "Sklep Online",
        technologies: ["React", "Next", "Firebase", "Python", "Web Scraping"],
        colors: ["#F389EC", "#FFFFFF", "#4338CA"],
        fonts: [
          {
            fontName: "Inter",
            variants: ["regular", "bold"],
          },
          {
            fontName: "Druk-wide",
            variants: ["bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/zaklejki",
      },
      {
        name: "Manicuregrudziadz.pl",
        shortDescription:
          "Strona dedykowana usługom manicure, gdzie mozna zarezerwować terminy, i otrzymać rabaty za zapraszanie znajomych. ",
        images: [
          "/images/projects/manicuregrudziadz/hero.webp",
          "/images/projects/manicuregrudziadz/dashboard.webp",
          "/images/projects/manicuregrudziadz/rezerwacje.webp",
        ],
        link: "https://www.manicuregrudziadz.pl/",
        type: "Front-end z bazą danych",
        technologies: [
          "React",
          "TypeScript",
          "Next",
          "Redux",
          "Firebase",
          "Tailwind",
        ],
        colors: ["#3F3F46", "#FACC15", "#4F46E5"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["light", "light italic", "regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/manicuregrudziadz",
      },
      {
        name: "Quixy.pl",
        shortDescription:
          "Platforma internetowa z ofertami pracy zdalnej, która połączy klientów z talentami, czyli osobami, które zrealizują wizję klienta.",
        images: [
          "/images/projects/quixy/hero.png",
          "/images/projects/quixy/why-us.png",
          "/images/projects/quixy/footer.png",
          "/images/projects/quixy/register.png",
          "/images/projects/quixy/dashboard.png",
        ],
        link: "https://www.quixy.pl/",
        type: "Aplikacja Full-stack",
        technologies: [
          "React",
          "Next",
          "Tailwind",
          "Firebase",
          "PWA",
          "ThreeJS",
          "Stripe",
          "openai",
          "redux",
          "Mikropłatności",
        ],
        colors: ["#126b91", "#14A800", "#27272A"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["light", "light italic", "regular", "bold"],
          },
          {
            fontName: "Gotham",
            variants: ["light", "regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/quixy",
      },
      {
        name: "Fryzurykaminska.pl",
        shortDescription:
          "Strona wizytówka z ofertą usług fryzjerskich, kontaktem i portfolio.",
        images: [
          "/images/projects/fryzurykaminska/hero.webp",
          "/images/projects/fryzurykaminska/offer.webp",
        ],
        link: "https://www.fryzurykaminska.pl/",
        type: "Front-end z bazą danych",
        technologies: ["React", "Next", "Tailwind"],
        colors: ["#22C55E", "#F3F4F6", "#93C5FD"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/fryzury-kaminska",
      },
      {
        name: "Radcadeluga.pl",
        shortDescription:
          "Strona wizytówka dla kancelarii. Lista usług, kontakt.",
        images: [
          "/images/projects/kancelariadeluga/hero.webp",
          "/images/projects/kancelariadeluga/offer.webp",
        ],
        link: "https://www.delugakancelaria.pl/",
        type: "Front-end z bazą danych",
        technologies: ["React", "Next", "Firebase"],
        colors: ["#685A50", "#4ADE80", "#D8B4FE"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/kancelaria-artur-deluga",
      },
    ],
  },
};

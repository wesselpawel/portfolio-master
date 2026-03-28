import { getBreadcrumbLinks, type LandingPageContent } from "@/data/landingPages";

const SITE_URL = "https://wesselpawel.com";

function toAbsoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname}`;
}

export function getLandingPageStructuredData(page: LandingPageContent) {
  if (!page.slug) {
    return null;
  }

  const pageUrl = toAbsoluteUrl(`/${page.slug}`);
  const breadcrumbLinks = getBreadcrumbLinks(page.slug);

  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": `${pageUrl}#service`,
      name: page.seo.title,
      url: pageUrl,
      description: page.seo.description,
      areaServed: page.cityName
        ? {
            "@type": "City",
            name: page.cityName,
          }
        : undefined,
      serviceType: page.portfolioHeading,
      provider: {
        "@type": "Person",
        name: "Paweł Wessel",
        url: SITE_URL,
      },
      telephone: "+48 721 417 154",
      email: "hello@wesselpawel.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PL",
      },
      sameAs: [
        "https://github.com/wesiudev",
        "https://linkedin.com/in/wesselpawel",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: breadcrumbLinks.map((link, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: link.label,
        item: toAbsoluteUrl(link.href),
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: page.intent.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

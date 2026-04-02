import type { Metadata } from "next";
import CityHubPage from "@/components/CityHubPage";
import { getAllCityHubSlugs, getLandingPageCityBySlug } from "@/data/landingPages";
import { notFound } from "next/navigation";
import { getCityPexelsPhotos } from "@/utils/pexels";

type CityHubRouteProps = {
  params: {
    city: string;
  };
};

export function generateStaticParams() {
  return getAllCityHubSlugs().map((city) => ({ city }));
}

export function generateMetadata({ params }: CityHubRouteProps): Metadata {
  const city = getLandingPageCityBySlug(params.city);

  if (!city) {
    return {};
  }

  const canonicalUrl = `https://wesselpawel.com/projektowanie-internetowe/${city.slug}`;

  return {
    title: `Projektowanie stron WWW ${city.name} - strony firmowe, landing page i SEO`,
    description: `Projektujemy strony WWW ${city.context.inLocative}, ktore buduja widocznosc w Google i generuja realne zapytania. Strony firmowe, landing page, sklepy internetowe i SEO lokalne w jednym hubie.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `Projektowanie stron WWW ${city.name}`,
      description: `Sprawdz oferte projektowania stron WWW, landing page, sklepow internetowych i SEO lokalnego ${city.context.inLocative}.`,
      siteName: "WWW Expert",
    },
  };
}

export default async function CityHubRoute({ params }: CityHubRouteProps) {
  const city = getLandingPageCityBySlug(params.city);

  if (!city) {
    notFound();
  }

  const cityPhotos = await getCityPexelsPhotos(city);

  return <CityHubPage city={city} cityPhotos={cityPhotos} />;
}

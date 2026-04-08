import type { Metadata } from "next";
import CityHubPage from "@/components/CityHubPage";
import {
  getAllCityHubSlugs,
  getCityHubHref,
  getLandingPageCityBySlug,
} from "@/data/landingPages";
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

  const canonicalUrl = `https://wesselpawel.com${getCityHubHref(city.slug)}`;
  const   title = `Tworzenie stron internetowych ${city.name} | Strony WWW dla firm`;
  const description = `Tworzenie stron internetowych ${city.context.inLocative}, które budują widoczność w Google. Wizytówka Twojej firmy w Google.`;
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: "Paweł Wessel",
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

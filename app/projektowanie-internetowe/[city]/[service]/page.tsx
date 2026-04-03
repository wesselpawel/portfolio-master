import IndexPage from "@/components/IndexPage";
import {
  getAllCityServiceRouteParams,
  getLandingPageByRouteParams,
  getLandingPageMetadata,
} from "@/data/landingPages";
import { notFound } from "next/navigation";
import { getLandingPageStructuredData } from "@/utils/structuredData";

type CityServiceRouteProps = {
  params: {
    city: string;
    service: string;
  };
};

export function generateStaticParams() {
  return getAllCityServiceRouteParams();
}

export function generateMetadata({ params }: CityServiceRouteProps) {
  const page = getLandingPageByRouteParams(params.city, params.service);

  if (!page) {
    return {};
  }

  return {
    ...getLandingPageMetadata(page),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function CityServiceRoute({ params }: CityServiceRouteProps) {
  const page = getLandingPageByRouteParams(params.city, params.service);

  if (!page) {
    notFound();
  }

  const structuredData = getLandingPageStructuredData(page);

  return (
    <>
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      ) : null}
      <IndexPage pageContent={page} />
    </>
  );
}

import IndexPage from "@/components/IndexPage";
import {
  getAllLandingPageSlugs,
  getLandingPageBySlug,
  getLandingPageMetadata,
} from "@/data/landingPages";
import { notFound } from "next/navigation";
import { getLandingPageStructuredData } from "@/utils/structuredData";

type LandingPageRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllLandingPageSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: LandingPageRouteProps) {
  const page = getLandingPageBySlug(params.slug);

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

export default function LandingPageRoute({ params }: LandingPageRouteProps) {
  const page = getLandingPageBySlug(params.slug);

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

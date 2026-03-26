import IndexPage from "@/components/IndexPage";
import {
  getAllLandingPageSlugs,
  getLandingPageBySlug,
  getLandingPageMetadata,
} from "@/data/landingPages";
import { notFound } from "next/navigation";

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

  return getLandingPageMetadata(page);
}

export default function LandingPageRoute({ params }: LandingPageRouteProps) {
  const page = getLandingPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return <IndexPage pageContent={page} />;
}

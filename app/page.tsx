import IndexPage from "@/components/IndexPage";
import { HOME_LANDING_PAGE, getLandingPageMetadata } from "@/data/landingPages";
import { getLandingPageStructuredData } from "@/utils/structuredData";

export const metadata = getLandingPageMetadata(HOME_LANDING_PAGE);

export default function Page() {
  const structuredData = getLandingPageStructuredData(HOME_LANDING_PAGE);

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
      <div>
        <IndexPage pageContent={HOME_LANDING_PAGE} />
      </div>
    </>
  );
}

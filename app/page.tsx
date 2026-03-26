import IndexPage from "@/components/IndexPage";
import { HOME_LANDING_PAGE, getLandingPageMetadata } from "@/data/landingPages";

export const metadata = getLandingPageMetadata(HOME_LANDING_PAGE);

export default function Page() {
  return (
    <div>
      <IndexPage pageContent={HOME_LANDING_PAGE} />
    </div>
  );
}

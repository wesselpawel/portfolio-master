import Content from "./Content";
import { Metadata } from "next";

const SITE_URL = "https://wesselpawel.com";

export const metadata: Metadata = {
  title: "WWW Expert - O mnie",
  description:
    "Tworzę strony, sklepy i platformy internetowe dla firm. Zobacz, jak wyglądała moja droga w web developmencie.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: "WWW Expert - O mnie",
    description:
      "Tworzę strony, sklepy i platformy internetowe dla firm. Zobacz, jak wyglądała moja droga w web developmencie.",
    siteName: "WWW Expert",
  },
  twitter: {
    title: "WWW Expert - O mnie",
    description:
      "Tworzę strony, sklepy i platformy internetowe dla firm. Zobacz, jak wyglądała moja droga w web developmencie.",
  },
};

export default function Page() {
  return (
    <div>
      <Content />
    </div>
  );
}

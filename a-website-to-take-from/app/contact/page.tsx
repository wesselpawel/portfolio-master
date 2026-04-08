import Contact from "@/components/quixyComponents/Contact";
import { Metadata } from "next";

export default async function Page() {
  return <Contact />;
}

export const metadata: Metadata = {
  publisher: "quixy.pl",
  manifest: "/manifest.json",
  authors: [
    {
      name: "quixy",
      url: "https://quixy.pl",
    },
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  title: "Eksperci ds. IT, marketingu i designu dla swojego biznesu",
  description:
    "Tworzymy skuteczne strony WWW, marketing w social media i kampanie Google Ads. Transparentne ceny i realne wyniki biznesowe.",
};

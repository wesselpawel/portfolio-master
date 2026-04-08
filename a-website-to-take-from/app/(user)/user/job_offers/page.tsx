import Postings from "@/components/quixyComponents/Postings/Postings";
import { Metadata } from "next";

export default async function Page() {
  return (
    <div>
      <Postings />
    </div>
  );
}

export const metadata: Metadata = {
  publisher: "wesiu.dev",
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
  title: `Twoje Oferty Pracy - Panel Użytkownika`,
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
};

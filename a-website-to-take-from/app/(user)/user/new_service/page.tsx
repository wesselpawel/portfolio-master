import { Metadata } from "next";
import dynamic from "next/dynamic";
const NewService = dynamic(
  () => import("@/components/quixyComponents/NewService")
);
export default function Page() {
  return (
    <div>
      <NewService />
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
  title: "Nowa usługa - Panel Użytkownika",
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
};

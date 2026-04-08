import LeadsList from "@/components/quixyComponents/LeadsList";
import { Metadata } from "next";

export default async function Page() {
  return (
    <div>
      <LeadsList />
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
  title: `Zlecenia i aplikacje - Panel Użytkownika`,
  description: "Przeglądaj swoje zlecenia i aplikacje na twoje oferty pracy",
};

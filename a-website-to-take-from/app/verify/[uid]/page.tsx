import VerifyEmail from "./VerifyEmail";
import { Metadata } from "next";
import Loading from "@/app/loading";

export default async function Page(props: {
  params: Promise<{ uid: string }>;
}) {
  const params = await props.params;
  return (
    <div className="text-center">
      <div className="bg-white w-full h-screen flex items-center justify-center flex-col left-0 top-0">
        <VerifyEmail userId={params?.uid} />
        <Loading />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  publisher: "wesiu.dev",
  manifest: "/manifest.json",
  authors: [
    {
      name: "wesiudev",
      url: "https://wesiudev.com",
    },
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  title: "Przetwarzanie danych...",
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
};

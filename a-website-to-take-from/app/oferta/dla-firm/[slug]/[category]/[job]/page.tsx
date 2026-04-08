import Link from "next/link";
import { polishToEnglish } from "../../../../../../utils/polishToEnglish";
import JobBoardList from "@/components/quixyComponents/JobBoardList";
const BlogPostList = dynamic(
  () => import("@/components/quixyComponents/BlogPostList")
);

import dynamic from "next/dynamic";
import { getPosts } from "@/lib/getPosts";
import { getContent } from "@/lib/getContent";
import { Suspense } from "react";
import Loadinger from "@/app/loading";
import Hero from "@/components/hero/Hero";
const InitializeUser = dynamic(
  () => import("@/components/quixyComponents/InitializeUser")
);
export const revalidate = 600;
export const dynamicParams = true;
export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const offers = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/offers?tubylytylkofigi=${process.env.API_SECRET_KEY}&category=${params.job}`,
    { next: { revalidate: 600 } }
  ).then((res) => res.json());
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/users/${params.job}`,
    { next: { revalidate: 600 } }
  ).then((res: any) => res.json());
  const content = await getContent(params.job);
  return (
    <Suspense fallback={<Loadinger />}>
      <div className="w-full h-full bg-zinc-800">
        <div className="h-screen w-screen fixed left-0 top-0 z-0">
          <Hero />
        </div>
        <div className="relative pt-[65px] lg:pt-[92px] font-sans min-h-screen flex flex-col w-full">
          <InitializeUser />
          <section className="py-12 xl:py-24 text-left relative bg-black/50">
            {/* Główna zawartość */}
            <div className="relative z-50 w-full mx-auto container px-4 lg:px-12">
              {/* Główny nagłówek */}
              <h1
                style={{ lineHeight: 1.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
              >
                <span className="text-green-500">
                  {content?.informal_title_plural}
                </span>{" "}
                do Twoich usług.
              </h1>

              {/* Opis */}
              <p className="lg:text-base text-gray-100 max-w-2xl mb-6">
                Najlepsi specjaliści na polskim rynku zrealizują Twoją wizję.
              </p>

              {/* Przyciski */}
              <div className="flex gap-4">
                <Link
                  className="hover:underline text-white py-2 px-4 border border-white rounded-md"
                  href="/register"
                >
                  Wpisz się
                </Link>
                <Link
                  className="bg-gradient-to-b from-ctaStart to-ctaEnd text-white py-2 px-4 rounded-md shadow-md hover:scale-105 duration-100"
                  href="/register"
                >
                  Dodaj ofertę
                </Link>
              </div>
            </div>
          </section>
          <div className="mx-auto container px-4 lg:px-12">
            <div className="my-12 w-full flex flex-col">
              <JobBoardList
                talents={users.filter((user: any) => user.seek)}
                companies={users.filter((user: any) => !user.seek)}
                content={content}
              />
            </div>
            <div
              className={`p-3 lg:p-6 rounded-xl ${
                offers.length > 0
                  ? "bg-gradient-to-r from-primary to-cta"
                  : "bg-white"
              }`}
            >
              <div>
                <h3 className={`text-black font-extrabold text-xl lg:text-3xl`}>
                  {content?.title} - Zlecenia
                </h3>
                <p
                  className={`text-black flex items-center flex-wrap text-wrap`}
                >
                  Szukasz zleceń jako{" "}
                  {content?.informal_title_singular.toLowerCase()}?{" "}
                  <Link href="/register" className="text-blue-500 ml-1">
                    Zostań partnerem
                  </Link>
                </p>
                
              </div>
            </div>

            {/* Content */}
            <div className="w-full flex flex-col lg:flex-row bg-white mt-12 p-6 rounded-xl">
              <section className="text-left">
                <h3
                  style={{ lineHeight: 1.5 }}
                  className="font-extrabold text-black text-xl lg:text-3xl mb-3"
                >
                  Czym zajmują się
                  <span className="ml-2 text-black">
                    {content?.informal_title_plural.toLowerCase()}?
                  </span>
                </h3>
                <div
                  className="text-black max-w-3xl markdownSlug !bg-transparent"
                  dangerouslySetInnerHTML={{
                    __html: content?.description,
                  }}
                />
              </section>
            </div>
          </div>
          <div className="p-6 lg:p-12 w-full bg-black/50 mt-12">
            <span className="text-xl font-extrabold text-white mb-12">
              Tagi
            </span>
            <ul className="flex overflow-x-scroll lg:overflow-visible w-full lg:flex-wrap items-center gap-4 text-sm lg:text-base">
              {content?.synonyms.map((item: any, i: number) => (
                <li
                  key={i}
                  className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all"
                >
                  #{item.toLowerCase()}
                </li>
              ))}
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #firmy
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zleceniadlafirm
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zleceniadlafreelancerow
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #ilezarabia
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #freelance
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zarobki
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #znajdzprace
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #rekrutacja
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #pracazdalna
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #freelancer
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #jobboards
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #joboffers
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #ofertypracy
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #ogloszeniaoprace
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; category: string; job: string };
}): Promise<Metadata> {
  // Fetch all jobs data
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());

  // Find the category name in Polish
  const categoryObj = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => ({ category: subItem.title }))
    )
    .find((item: any) => polishToEnglish(item.category) === params.category);
  const category = categoryObj?.category || params.category;

  // Get job content
  const job = await getContent(params.job);

  // Compose metadata fields
  const title = `${
    job?.title || params.job
  } Zlecenia i Oferta Usług dla Firm | ${category}`;
  const description = `Usługi dla firm. Sprawdź aktualne oferty pracy i zlecenia dla firm w kategorii ${category}.`;
  const keywords = [
    job?.title,
    job?.genitive,
    job?.instrumental,
    category,
    "zlecenia",
    "oferty pracy",
    "usługi dla firm",
    "freelance",
    "praca zdalna",
    "job board",
    "ogłoszenia o pracę",
    "zarobki",
    "rekrutacja",
    "znajdź pracę",
    "quixy",
  ]
    .filter(Boolean)
    .join(", ");

  const imageUrl = job?.mainImage
    ? job.mainImage
    : "/favicons/android-chrome-512x512.png";

  const url = `https://quixy.pl/oferta/dla-firm/${params.slug}/${params.category}/${params.job}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Quixy Studio", url: "https://quixy.pl" }],
    publisher: "Quixy Studio",
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Quixy",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "pl_PL",
    },
    twitter: {
      card: "summary_large_image",
      site: "@quixy",
      title,
      description,
      images: [imageUrl],
      creator: "@quixystudio",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

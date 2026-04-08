import Link from "next/link";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import { FaBriefcase } from "react-icons/fa";
import JobBoardList from "@/components/quixyComponents/JobBoardList";
import dynamic from "next/dynamic";
import { getServices } from "@/lib/getServices";
import { getPosts } from "@/lib/getPosts";
import { getContent } from "@/lib/getContent";
import Loadinger from "@/app/loading";
import { Suspense } from "react";
import Hero from "@/components/hero/Hero";
import InitializeUser from "@/components/quixyComponents/InitializeUser";
const BlogPostList = dynamic(
  () => import("@/components/quixyComponents/BlogPostList")
);
// Generowanie parametrów statycznych
export async function generateStaticParams() {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 600 } }
  ).then((res) => res.json());
  return jobs.flatMap((service: any) =>
    service.data.flatMap((subItem: any) => ({ category: subItem.title }))
  );
}
export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 600 } }
  ).then((res) => res.json());
  const cat: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const slug = cat?.data.find(
    (item: any) => polishToEnglish(item.title) === params.category
  );
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/users/${params.category}`
  ).then((res: any) => res.json());
  const content = await getContent(params.category);
  const services = await getServices();
  const posts = await getPosts();
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
                Zatrudnij najlepszych specjalistów od{" "}
                <b className="text-white">{content?.genitive}</b> i zrealizuj
                swój projekt z ich wsparciem!
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

          <div className="w-full mx-auto container px-4 lg:px-12 flex flex-col items-center justify-center">
            {/* Sekcja główna */}
            <div className="mt-12 w-full">
              <div className="flex flex-col mx-auto ">
                <JobBoardList
                  talents={users.filter((user: any) => user.seek)}
                  companies={users.filter((user: any) => !user.seek)}
                  content={content}
                />
              </div>
            </div>

            {/* Podkategorie */}
            {slug?.data?.length > 0 && (
              <div className="bg-white p-6 mt-12 w-full rounded-xl">
                <h3 className="text-black text-2xl lg:text-3xl font-extrabold mb-6">
                  {slug.title} - zlecenia
                </h3>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {slug.data.map((item: any, index: number) => (
                    <Link
                      href={`/oferta/dla-firm/${params.slug}/${
                        params.category
                      }/${polishToEnglish(item.title)}`}
                      key={index}
                      className="p-1 hover:scale-105 duration-100 flex items-center bg-gradient-to-br from-zinc-600 to-zinc-700 text-white pr-4 h-[50px] rounded-lg shadow-md hover:shadow-lg transition"
                    >
                      <div className="flex items-center justify-center aspect-square h-full rounded-md bg-white text-zinc-700">
                        <FaBriefcase className="w-6 h-6" />
                      </div>
                      <span className="font-coco w-full flex items-center justify-center text-center gap-3">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sekcja opisu */}
            <div className="p-6 w-full flex flex-col lg:flex-row bg-white mt-12 rounded-xl">
              <div>
                {/* Główna sekcja tekstowa */}
                <section className="w-full">
                  {/* Nagłówek */}
                  <h3 className="font-extrabold text-black text-xl lg:text-3xl mb-3">
                    Czym zajmują się{" "}
                    {content?.informal_title_plural?.toLowerCase()}?
                  </h3>

                  {/* Opis - obsługa HTML */}
                  <div
                    className="text-gray-800 text-sm sm:text-base leading-relaxed markdownSlug"
                    dangerouslySetInnerHTML={{
                      __html: content?.description,
                    }}
                  />
                </section>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 lg:px-12">
            <BlogPostList posts={posts} />
          </div>
          <div className="mt-12 p-6 lg:p-12 w-full bg-black/50">
            <span className="text-xl font-extrabold text-white text-center mb-12">
              Tagi
            </span>
            <ul className="flex overflow-x-scroll lg:overflow-visible w-full lg:flex-wrap gap-4 text-sm lg:text-base">
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
  const job = await getContent(params.category);

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
    // Extended metadata fields
    metadataBase: new URL("https://quixy.pl"),
    category: category,
    applicationName: "Quixy",
    creator: "Quixy Studio",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    colorScheme: "dark",
    themeColor: "#22c55e",
    formatDetection: {
      email: true,
      address: false,
      telephone: true,
    },
    icons: [
      { rel: "icon", url: "/favicons/favicon.ico" },
      { rel: "apple-touch-icon", url: "/favicons/apple-touch-icon.png" },
      {
        rel: "icon",
        url: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
    manifest: "/manifest.json",
  };
}

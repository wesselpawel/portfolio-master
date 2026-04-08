import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import JobBoardList from "@/components/quixyComponents/JobBoardList";
import Loadinger from "@/app/loading";
import Hero from "@/components/hero/Hero";
import dynamic from "next/dynamic";
import { getContent } from "@/lib/getContent";
import {
  getGrudziadzServiceByPublicSlug,
  getGrudziadzStaticParams,
} from "@/lib/grudziadz/serviceIndex";
import { polishToEnglish } from "@/utils/polishToEnglish";

const InitializeUser = dynamic(
  () => import("@/components/quixyComponents/InitializeUser")
);

export const revalidate = 600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getGrudziadzStaticParams();
}

export default async function GrudziadzServicePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const leaf = getGrudziadzServiceByPublicSlug(params.slug);
  if (!leaf) notFound();

  const contentSlug = leaf.contentSlug;

  const [offersRes, usersRes, content] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_URL}/apiQuixy/offers?tubylytylkofigi=${process.env.API_SECRET_KEY}&category=${contentSlug}`,
      { next: { revalidate: 600 } }
    ).then((r) => r.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_URL}/apiQuixy/users/${contentSlug}`,
      { next: { revalidate: 600 } }
    ).then((r: any) => r.json()),
    getContent(contentSlug),
  ]);

  const offers = Array.isArray(offersRes) ? offersRes : [];
  const users = Array.isArray(usersRes) ? usersRes : [];

  return (
    <Suspense fallback={<Loadinger />}>
      <div className="w-full min-h-screen bg-zinc-800">
        <div className="h-screen w-screen fixed left-0 top-0 z-0">
          <Hero />
        </div>
        <div className="relative pt-[65px] lg:pt-[92px] font-sans min-h-screen flex flex-col w-full">
          <InitializeUser />
          <section className="py-12 xl:py-24 text-left relative bg-black/50">
            <div className="relative z-50 w-full mx-auto container px-4 lg:px-12">
              <nav className="text-sm text-zinc-400 mb-4">
                <Link href="/" className="hover:text-white">
                  Strona główna
                </Link>
                <span className="mx-2">/</span>
                <Link href="/grudziadz" className="hover:text-white">
                  Grudziądz
                </Link>
                <span className="mx-2">/</span>
                <span className="text-zinc-300">{leaf.title}</span>
              </nav>
              <p className="text-emerald-400 text-sm font-medium mb-2">
                Grudziądz · {leaf.serviceTitle} · {leaf.categoryTitle}
              </p>
              <h1
                style={{ lineHeight: 1.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
              >
                <span className="text-green-500">
                  {content?.informal_title_plural}
                </span>{" "}
                — usługi w Grudziądzu
              </h1>
              <p className="lg:text-base text-gray-100 max-w-2xl mb-6">
                Najlepsi specjaliści na polskim rynku zrealizują Twoją wizję.
              </p>
              <div className="flex flex-wrap gap-4">
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
              <h3
                className={`${
                  offers.length > 0 ? "text-white" : "text-black"
                } font-extrabold text-xl lg:text-3xl`}
              >
                {content?.title} — Zlecenia
              </h3>
            </div>

            <div className="w-full flex flex-col lg:flex-row bg-white mt-12 p-6 rounded-xl">
              <section className="text-left w-full">
                <h3
                  style={{ lineHeight: 1.5 }}
                  className="font-extrabold text-black text-xl lg:text-3xl mb-3"
                >
                  Czym zajmują się{" "}
                  <span className="text-black">
                    {content?.informal_title_plural?.toLowerCase()}?
                  </span>
                </h3>
                <div
                  className="text-black max-w-3xl markdownSlug !bg-transparent"
                  dangerouslySetInnerHTML={{
                    __html: content?.description ?? "",
                  }}
                />
              </section>
            </div>

            <p className="text-zinc-500 text-sm mt-8 mb-12">
              Pełna ścieżka kategorii (dawny URL 3-segmentowy):{" "}
              <Link
                href={`/oferta/dla-firm/${polishToEnglish(
                  leaf.serviceTitle
                )}/${polishToEnglish(leaf.categoryTitle)}/${polishToEnglish(
                  leaf.title
                )}`}
                className="text-emerald-400 hover:underline"
              >
                oferta dla firm
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const leaf = getGrudziadzServiceByPublicSlug(slug);
  if (!leaf) return { title: "Nie znaleziono" };

  const job = await getContent(leaf.contentSlug);
  const city = "Grudziądz";
  const title = `${job?.title || leaf.title} — ${city} | Quixy`;
  const description = `Usługi w ${city}: ${leaf.title}. ${leaf.categoryTitle} w ${leaf.serviceTitle}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pl_PL",
    },
    alternates: {
      canonical: `https://quixy.pl/grudziadz/${leaf.publicSlug}`,
    },
  };
}

import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { IProject } from "@/types";
import UserStickyTop from "@/components/quixyComponents/UserStickyTop";
import { IoLocationOutline } from "react-icons/io5";
import Viewer from "@/components/quixyComponents/AddJobOffer/Viewer";
import JobBoardList from "@/components/quixyComponents/JobBoardList";
import LeadCard from "@/components/quixyComponents/Dashboard/LeadCard";
import { Suspense } from "react";
import Loadinger from "@/app/loading";
import Tags from "@/components/quixyComponents/Tags";

export const revalidate = 60;
export const dynamicParams = true;
export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<any>;
}) {
  const params = await props.params;
  const talent = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/companies/${params.slug}`
  ).then((res: any) => res.json());
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/getSimilarTalents?tubylytylkofigi=${process.env.API_SECRET_KEY}&id=${talent.uid}`
  ).then((res: any) => res.json());
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/getSimilarCompanies?tubylytylkofigi=${process.env.API_SECRET_KEY}&id=${talent.uid}`
  ).then((res: any) => res.json());
  return (
    <Suspense fallback={<Loadinger />}>
      <div className="relative min-h-screen font-sans pt-16 pb-24 bg-white">
        {/* GATE / OVERLAY */}
        {!talent?.access && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-accentStart/70 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900">
                Wyświetl się w platformie Quixy
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Jesteś właścicielem tego profilu? Dokończ konfigurację lub opłać
                wpisowe.
              </p>

              <div className="relative mt-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                {talent?.hourRate && (
                  <div className="absolute right-0 top-0 rounded-tr-2xl rounded-bl-xl bg-gradient-to-b from-ctaStart to-ctaEnd px-3 py-1 text-xs font-extrabold text-white shadow-sm">
                    {talent.hourRate} zł/h
                  </div>
                )}

                {/* MINI HEADER */}
                <div className="flex items-start gap-4">
                  {talent?.photoURL ? (
                    <span className="relative inline-flex h-20 w-20 overflow-hidden rounded-full ring-1 ring-slate-200 shadow-sm">
                      <Image
                        src={talent.photoURL}
                        alt={talent?.name || "Profil"}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </span>
                  ) : (
                    <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-primaryStart to-primaryEnd text-white ring-1 ring-slate-200 shadow-sm">
                      <FaUser className="text-2xl" />
                    </span>
                  )}

                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <h4 className="truncate text-lg font-semibold text-slate-900">
                      {talent?.name || "Brak nazwy"}
                    </h4>
                    {talent?.city && (
                      <div className="mt-1 inline-flex items-center text-sm text-slate-700">
                        <IoLocationOutline className="mr-1 text-lg text-primaryStart" />
                        <span className="truncate">{talent.city}, Polska</span>
                      </div>
                    )}
                    {talent?.title && (
                      <span className="mt-2 inline-block truncate rounded-full bg-primaryStart/10 px-3 py-1 text-xs font-medium text-primaryStart">
                        {talent.title}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/user"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-ctaStart to-ctaEnd px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctaStart"
              >
                Przejdź do panelu
              </Link>
            </div>
          </div>
        )}

        {/* STICKY USER BAR */}
        <div className="fixed bottom-0 left-0 z-[100] w-full">
          <UserStickyTop slugData={talent} />
        </div>

        {/* PAGE CONTENT */}
        <div className="container relative mx-auto px-4 lg:px-12">
          <section className="py-6">
            {/* HEADER */}
            <div className="flex items-start gap-4">
              {talent?.photoURL ? (
                <span className="relative inline-flex h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full ring-1 ring-slate-200 shadow-sm">
                  <Image
                    src={talent.photoURL}
                    alt={talent?.name || "Profil"}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </span>
              ) : (
                <span className="inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-b from-primaryStart to-primaryEnd text-white ring-1 ring-slate-200 shadow-sm">
                  <FaUser className="text-2xl sm:text-3xl" />
                </span>
              )}

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg sm:text-xl font-bold text-slate-900">
                  {talent?.name || "Nie podano"}
                </h2>

                {talent?.city && (
                  <div className="mt-1 flex items-center text-sm text-slate-700">
                    <IoLocationOutline className="mr-1 text-lg text-primaryStart" />
                    <span className="truncate">{talent.city}, Polska</span>
                  </div>
                )}
                {talent?.title && (
                  <span className="mt-1 inline-block truncate rounded-full bg-primaryStart/10 px-3 py-1 text-xs font-medium text-primaryStart">
                    {talent.title}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {talent?.preferences && talent.preferences.length > 0 ? (
                  talent.preferences.map((item: string, i: number) => (
                    <span
                      key={`${item}-${i}`}
                      className="inline-flex items-center rounded-full bg-primaryStart/10 px-3 py-1 text-xs sm:text-sm font-medium text-primaryStart"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">
                    Brak danych o dostępności
                  </span>
                )}
                {/* SERVICES COUNT */}
                {talent?.projects && (
                  <div>
                    <div className="inline-flex items-center rounded-full bg-primaryStart/10 px-3 py-1 text-xs sm:text-sm font-medium text-primaryStart">
                      {talent.projects.length === 0 ? (
                        <span className="text-red-500">0 usług</span>
                      ) : (
                        <span>
                          {talent.projects.length}{" "}
                          {talent.projects.length === 1
                            ? "usługa"
                            : talent.projects.length % 10 >= 2 &&
                              talent.projects.length % 10 <= 4 &&
                              !(
                                talent.projects.length % 100 >= 12 &&
                                talent.projects.length % 100 <= 14
                              )
                            ? "usługi"
                            : "usług"}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            {talent?.description && (
              <div className="mt-10">
                <div className="mt-3">
                  <div className="reset prose max-w-none text-slate-800">
                    <Viewer value={talent.description} displayBlack />
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES */}
            {talent?.projects?.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-slate-900">
                  Kup od wykonawcy
                </h2>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {talent.projects.map((project: IProject, i: number) => (
                    <LeadCard key={i} service={project} slug />
                  ))}
                </div>
              </div>
            )}

            {/* TAGS + AVAILABILITY */}
            <div
              className={`mt-10 grid gap-6 ${
                talent?.tags?.length > 10
                  ? "grid-cols-1"
                  : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Specjalizacje
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <Tags talent={talent} />
                  {(!talent?.tags || talent?.tags?.length === 0) && (
                    <span className="text-sm text-slate-500">
                      Brak podanych specjalizacji…
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* SIMILAR PROFILES */}
        <div className="container mx-auto mt-6 px-4 pb-12 lg:px-12">
          <div className="rounded-2xl bg-white">
            <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 text-center">
              Zobacz podobne profile
            </h2>
            <div className="mt-3">
              <JobBoardList talents={talents} companies={companies} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/companies/${params.slug}`
  ).then((res: any) => res.json());
  const title = !slug.access
    ? `${slug.title} - ${slug.name} | ${slug.city}`
    : !slug?.googleTitle
    ? `${slug?.title} - ${slug?.name} | ${slug?.city}`
    : slug?.googleTitle;
  const description = !slug.access
    ? "Jesteś właścicelem tego konta? Skonfiguruj lub opłać wpisowe aby wyświetlać swój profil w Quixy."
    : !slug.googleDescription
    ? `Profile z ofertami usług - ${slug?.title} - ${slug.name} | ${
        slug?.tags[0]?.title || ""
      } ${slug?.tags[1]?.title || ""} ${slug?.tags[2]?.title || ""} ${
        slug?.tags[3]?.title || ""
      } ${slug?.tags[4]?.title || ""} ${slug?.tags[5]?.title || ""} ${
        slug?.tags[6]?.title || ""
      } ${slug?.tags[7]?.title || ""}`
    : slug.googleDescription;
  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `https://quixy.pl/firma/${params.slug}`,
      title,
      description,
      siteName: "Quixy",
      images: [
        {
          url: slug?.photoURL || "/favicons/android-chrome-192x192.png",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@quixy",
      title,
      description,
      image: {
        url: slug?.photoURL || "/favicons/android-chrome-192x192.png",
      },
    },
  };
}

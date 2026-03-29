import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COMPANY_SERVICE_LABELS,
  getCompanyProfileBySlug,
  getCompanyProfileSlugs,
} from "@/data/companyProfiles";
import { getQuixyCompanyProfileBySlug } from "@/lib/quixyCompanies";

type CompanyProfileRouteProps = {
  params: {
    slug: string;
  };
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getCompanyProfileSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CompanyProfileRouteProps): Promise<Metadata> {
  const company =
    (await getQuixyCompanyProfileBySlug(params.slug)) ??
    getCompanyProfileBySlug(params.slug);

  if (!company) {
    return {};
  }

  return {
    title: `${company.name} | Profil firmy`,
    description: company.shortDescription,
  };
}

export default async function CompanyProfileRoute({
  params,
}: CompanyProfileRouteProps) {
  const company =
    (await getQuixyCompanyProfileBySlug(params.slug)) ??
    getCompanyProfileBySlug(params.slug);

  if (!company) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex w-[90vw] max-w-6xl flex-col gap-8 pb-20 pt-36">
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/65">
          <Link href="/" className="transition hover:text-yellow-200">
            Start
          </Link>
          <span className="text-white/25">/</span>
          <span className="text-white">Profil firmy</span>
        </div>

        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.14),transparent_30%),linear-gradient(180deg,rgba(30,41,59,0.96),rgba(15,23,42,0.92))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200/85">
            Profil firmy
          </p>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            {company.name}
          </h1>
          {company.title ? (
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-100/90">
              {company.title}
            </p>
          ) : null}
          <p className="mt-4 max-w-3xl font-dosis text-base leading-relaxed text-white/80 sm:text-lg">
            {company.headline}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-yellow-100">
              {company.cityName}
            </span>
            {company.tags.map((tag) => (
              <span
                key={`${company.slug}-${tag}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-4xl font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
            {company.shortDescription}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#darmowa-wycena"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-300 px-5 py-3 text-sm font-bold text-black transition hover:brightness-105"
            >
              Przejdź do formularza
            </Link>
            {company.website ? (
              <Link
                href={company.website}
                target="_blank"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Odwiedź stronę
              </Link>
            ) : null}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
              Lokalizacja
            </p>
            <p className="mt-3 text-xl font-bold text-white">{company.cityName}</p>
            <p className="mt-3 font-dosis text-sm leading-relaxed text-white/70">
              Publiczny profil firmy dostępny w portfolio jako część podpiętej
              bazy użytkowników.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
              Zakres
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {company.services.map((service) => (
                <span
                  key={`${company.slug}-${service}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85"
                >
                  {COMPANY_SERVICE_LABELS[service]}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
              Kontakt
            </p>
            <div className="mt-3 space-y-3 font-dosis text-sm text-white/80">
              {company.website ? (
                <Link
                  href={company.website}
                  target="_blank"
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                >
                  {company.website}
                </Link>
              ) : null}
              {company.phone ? (
                <Link
                  href={`tel:${company.phone.replace(/\s+/g, "")}`}
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                >
                  {company.phone}
                </Link>
              ) : null}
              {company.email ? (
                <Link
                  href={`mailto:${company.email}`}
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                >
                  {company.email}
                </Link>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

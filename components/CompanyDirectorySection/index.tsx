"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COMPANY_SERVICE_LABELS,
  getCompanyPromoHeading,
  getFeaturedCompanyProfiles,
  type CompanyProfile,
} from "@/data/companyProfiles";

type CompanyDirectorySectionProps = {
  currentSlug?: string;
};

export default function CompanyDirectorySection({
  currentSlug,
}: CompanyDirectorySectionProps) {
  const [companies, setCompanies] = useState<CompanyProfile[]>(
    getFeaturedCompanyProfiles(currentSlug, 3),
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadCompanies() {
      try {
        const searchParams = new URLSearchParams({
          limit: "3",
        });

        if (currentSlug) {
          searchParams.set("currentSlug", currentSlug);
        }

        const response = await fetch(`/api/companies?${searchParams.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const nextCompanies = (await response.json()) as CompanyProfile[];

        if (Array.isArray(nextCompanies) && nextCompanies.length) {
          setCompanies(nextCompanies);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Failed to load companies", error);
        }
      }
    }

    loadCompanies();

    return () => {
      controller.abort();
    };
  }, [currentSlug]);

  if (!companies.length) {
    return null;
  }

  const heading = getCompanyPromoHeading(currentSlug);

  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
            Profil firmy
          </p>
          <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
            {heading}
          </h3>
          <p className="mt-3 max-w-3xl font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
            Przejdź do profilu firmy, żeby zobaczyć zakres współpracy, sposób
            działania i podstawowe dane kontaktowe.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {companies.map((company) => (
          <article
            key={company.slug}
            className="rounded-2xl border border-white/10 bg-black/20 p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-yellow-100">
                {company.cityName}
              </span>
              {company.tags.slice(0, 2).map((tag) => (
                <span
                  key={`${company.slug}-${tag}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h4 className="mt-4 text-lg font-bold text-white sm:text-xl">
              {company.name}
            </h4>
            {company.title ? (
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-yellow-100/85">
                {company.title}
              </p>
            ) : null}
            <p className="mt-2 font-dosis text-sm leading-relaxed text-white/80 sm:text-base">
              {company.headline}
            </p>
            <p className="mt-3 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
              {company.shortDescription}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {company.services.slice(0, 4).map((service) => (
                <span
                  key={`${company.slug}-${service}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80"
                >
                  {COMPANY_SERVICE_LABELS[service]}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/company/${company.slug}`}
                className="inline-flex items-center justify-center rounded-xl bg-yellow-300 px-4 py-3 text-sm font-bold text-black transition hover:brightness-105"
              >
                Zobacz profil firmy
              </Link>
              {company.website ? (
                <Link
                  href={company.website}
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Strona www
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

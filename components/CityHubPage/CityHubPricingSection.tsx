import Link from "next/link";
import CityHubQuoteConfigurator from "@/components/CityHubPage/CityHubQuoteConfigurator";
import { cityHubPricingData } from "@/data/cityHubPricing";
import { getServiceHref } from "@/data/landingPages";
type CityHubPricingSectionProps = {
  citySlug: string;
  cityName: string;
};

export default function CityHubPricingSection({
  citySlug,
  cityName,
}: CityHubPricingSectionProps) {
  const { tables } = cityHubPricingData;

  return (
    <section
      id="cennik-hub"
      className="scroll-mt-28 border-b border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.92))] py-14 lg:py-20"
      aria-label={`Cennik stron WWW i sklepów — ${cityName}`}
    >
      <div className="mx-auto w-[90vw] max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200/85">
            Cennik {cityName}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Porównanie pakietów — strony WWW i sklepy
          </h2>
          <p className="mt-4 font-dosis text-base leading-relaxed text-white/70 sm:text-lg">
            Najpierw możesz złożyć własny zakres w konfiguratorze, potem
            porównaj szczegóły w tabelach poniżej.
          </p>
        </div>

        <div className="mt-10">
          <CityHubQuoteConfigurator citySlug={citySlug} cityName={cityName} />
        </div>

        <div className="mt-16 flex flex-col gap-16">
          {tables.map((table) => (
            <div key={table.id}>
              {table.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/75">
                  {table.eyebrow}
                </p>
              ) : null}
              <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {table.title}
              </h3>
              {table.description ? (
                <p className="mt-3 max-w-3xl font-dosis text-sm leading-relaxed text-white/65 sm:text-base">
                  {table.description}
                </p>
              ) : null}

              <div className="mt-6 overflow-x-auto rounded-[28px] border border-white/10 bg-slate-950/40 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/30">
                      <th
                        scope="col"
                        className="sticky left-0 z-20 min-w-[180px] bg-slate-950/95 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm sm:min-w-[220px] sm:px-5"
                      >
                        Element
                      </th>
                      {table.packages.map((pkg) => (
                        <th
                          key={pkg.id}
                          scope="col"
                          className={`px-3 py-4 align-bottom sm:px-4 ${
                            pkg.highlight
                              ? "border-x border-yellow-300/35 bg-yellow-300/[0.07]"
                              : ""
                          }`}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-base font-bold text-white sm:text-lg">
                              {pkg.name}
                            </span>
                            <span className="text-lg font-extrabold text-yellow-300 sm:text-xl">
                              {pkg.priceFrom}
                            </span>
                            {pkg.priceNote ? (
                              <span className="text-xs font-normal font-dosis leading-snug text-white/55">
                                {pkg.priceNote}
                              </span>
                            ) : null}
                            <Link
                              href={getServiceHref(pkg.serviceKey, citySlug)}
                              className="mt-3 inline-flex w-max items-center rounded-xl bg-yellow-300 px-3 py-2 text-xs font-bold text-slate-950 transition hover:brightness-105 sm:text-sm"
                            >
                              Szczegóły usługi
                            </Link>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.featureRows.map((row, rowIndex) => (
                      <tr
                        key={row.key}
                        className={
                          rowIndex % 2 === 0
                            ? "bg-white/[0.02]"
                            : "bg-transparent"
                        }
                      >
                        <th
                          scope="row"
                          className="sticky left-0 z-10 border-t border-white/5 bg-slate-950/95 px-4 py-3 text-left align-top backdrop-blur-sm sm:px-5"
                        >
                          <span className="font-semibold text-white/90">
                            {row.label}
                          </span>
                          {row.hint ? (
                            <span className="mt-1 block font-dosis text-xs font-normal leading-relaxed text-white/45">
                              {row.hint}
                            </span>
                          ) : null}
                        </th>
                        {table.packages.map((pkg) => {
                          const cell =
                            table.values[pkg.id]?.[row.key] ?? "—";
                          return (
                            <td
                              key={`${pkg.id}-${row.key}`}
                              className={`border-t border-white/5 px-3 py-3 align-top font-dosis text-white/80 sm:px-4 ${
                                pkg.highlight
                                  ? "border-x border-yellow-300/20 bg-yellow-300/[0.04]"
                                  : ""
                              }`}
                            >
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

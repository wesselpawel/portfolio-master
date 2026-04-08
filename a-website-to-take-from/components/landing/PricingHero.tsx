import Image from "next/image";
import Cta from "@/components/cta/Cta";

export default function PricingHero({ city }: { city: string }) {
  return (
    <div>
      <h2 className="text-center mx-auto block mb-6 text-3xl lg:text-4xl font-bold text-zinc-800 drop-shadow-md shadow-black">
        Cennik stron internetowych {city ? city : ""}
      </h2>
      <p className="text-center mx-auto text-gray-600 mt-3 text-sm lg:text-base max-w-4xl">
        Transparentny cennik dopasowany do Twoich celów. Poniższe ceny są
        orientacyjne (od), dokładną wycenę przygotuje freelancer lub firma po
        krótkim briefie.
      </p>

      <div className="mt-6 overflow-x-auto text-zinc-800 drops-shadow-lg shadow-black">
        <table className="min-w-full text-left text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="bg-zinc-100 text-zinc-800 font-semibold px-4 py-3 rounded-tl-lg border border-zinc-200">
                Usługa
              </th>
              <th className="bg-zinc-100 text-zinc-800 font-semibold px-4 py-3 border-t border-b border-zinc-200">
                Zakres
              </th>
              <th className="bg-zinc-100 text-zinc-800 font-semibold px-4 py-3 rounded-tr-lg border border-zinc-200">
                Cena od
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-3 border border-zinc-200">Landing page</td>
              <td className="px-4 py-3 border border-zinc-200">
                Projekt + wdrożenie, sekcja ofertowa, formularz lead
              </td>
              <td className="px-4 py-3 border border-zinc-200 font-semibold">
                2 900 zł*
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 border border-zinc-200">
                Strona firmowa
              </td>
              <td className="px-4 py-3 border border-zinc-200">
                Do 6 podstron, CMS, SEO techniczne
              </td>
              <td className="px-4 py-3 border border-zinc-200 font-semibold">
                4 900 zł*
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 border border-zinc-200">
                Sklep internetowy
              </td>
              <td className="px-4 py-3 border border-zinc-200">
                Katalog produktów, płatności, integracje
              </td>
              <td className="px-4 py-3 border border-zinc-200 font-semibold">
                8 900 zł*
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 border border-zinc-200">
                Aplikacja/Platforma
              </td>
              <td className="px-4 py-3 border border-zinc-200">
                Dedykowana architektura i funkcje
              </td>
              <td className="px-4 py-3 border border-zinc-200 font-semibold">
                15 000 zł*
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="bg-zinc-50 px-4 py-2 text-xs text-zinc-500"
              >
                &nbsp;
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 border border-zinc-200">
                Google Ads – Start
              </td>
              <td className="px-4 py-3 border border-zinc-200">
                Konta, GA4, GTM, 1-2 kampanie, optymalizacja
              </td>
              <td className="px-4 py-3 border border-zinc-200 font-semibold">
                1 500 zł/mc*
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 border border-zinc-200">
                Google Ads – Pro
              </td>
              <td className="px-4 py-3 border border-zinc-200">
                Rozszerzona struktura, A/B testy, raporty
              </td>
              <td className="px-4 py-3 border border-zinc-200 font-semibold">
                2 900 zł/mc*
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 border border-zinc-200">
                Social Media – Prowadzenie
              </td>
              <td className="px-4 py-3 border border-zinc-200">
                Strategia, kreacje, publikacje, moderacja
              </td>
              <td className="px-4 py-3 border border-zinc-200 font-semibold">
                1 900 zł/mc*
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 mb-3 text-xs text-zinc-500">
        * Ceny netto „od”. Końcowa wycena zależy od firmy, freelancera oraz
        zakresu, ilości podstron, integracji i budżetów mediowych. Budżet reklam
        nie jest wliczony w abonament.
      </div>

      <Cta label="Darmowa wycena" />
    </div>
  );
}

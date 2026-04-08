import Image from "next/image";
import Cta from "@/components/cta/Cta";

export default function HeroAds() {
  return (
    <div className="mt-12">
      <div className="w-[90vw] sm:w-3/4 mx-auto bg-gradient-to-br from-white via-zinc-50 to-blue-50 rounded-2xl p-6 lg:p-10 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-zinc-800 leading-tight">
              Kampanie Google Ads
            </h1>
            <p className="text-gray-600 mt-3 text-sm lg:text-base">
              Skuteczna reklama w Google, która dowozi realne wyniki. Tworzymy i
              optymalizujemy kampanie Search, Performance Max i Display, tak by
              zwiększać sprzedaż i pozyskiwać leady.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="bg-white rounded-lg p-3 border border-zinc-200">
                Dokładne targetowanie i słowa kluczowe
              </li>
              <li className="bg-white rounded-lg p-3 border border-zinc-200">
                Stała optymalizacja budżetu i stawek
              </li>
              <li className="bg-white rounded-lg p-3 border border-zinc-200">
                Raporty i czytelne KPI co miesiąc
              </li>
              <li className="bg-white rounded-lg p-3 border border-zinc-200">
                Integracja GA4 i Google Tag Manager
              </li>
            </ul>

            <div className="mt-6">
              <Cta label="Zamów bezpłatną konsultację" />
            </div>
          </div>

          <div className="order-1 lg:order-none">
            <div className="bg-white rounded-xl p-4 shadow-md border flex items-center justify-center">
              <Image
                src="/images/projects/quixy/image-generator.png"
                width={900}
                height={650}
                alt="Kampanie Google Ads"
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

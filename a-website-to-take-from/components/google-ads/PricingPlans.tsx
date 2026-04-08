import Cta from "@/components/cta/Cta";

export default function PricingPlans() {
  return (
    <div className="mt-12">
      <div className="w-[90vw] sm:w-3/4 mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl p-6 lg:p-10 shadow-lg">
        <h2 className="text-3xl lg:text-4xl font-bold text-zinc-800 text-center mb-6">
          Cennik kampanii Google Ads
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-zinc-200 shadow">
            <h3 className="text-xl font-bold text-zinc-800">Start</h3>
            <p className="text-sm text-gray-600 mt-1">dla małych firm</p>
            <div className="text-3xl font-bold mt-4">600 zł</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>Konfiguracja kont, GA4 i GTM</li>
              <li>1 kampania Search</li>
              <li>Podstawowe rozszerzenia reklam</li>
              <li>Tygodniowa optymalizacja</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-emerald-300 shadow-lg">
            <h3 className="text-xl font-bold text-zinc-800">Pro</h3>
            <p className="text-sm text-gray-600 mt-1">rozwój i testy</p>
            <div className="text-3xl font-bold mt-4">1200 zł</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>Search + Performance Max</li>
              <li>A/B testy reklam i stron</li>
              <li>Zaawansowane konwersje</li>
              <li>Raport miesięczny KPI</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 border border-zinc-200 shadow">
            <h3 className="text-xl font-bold text-zinc-800">Premium</h3>
            <p className="text-sm text-gray-600 mt-1">maksymalny efekt</p>
            <div className="text-3xl font-bold mt-4">1600 zł</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>Pełny miks kampanii</li>
              <li>Zaawansowana analityka i tagowanie</li>
              <li>Audyt landingów i rekomendacje UX</li>
              <li>Co-tygodniowe raporty</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Cta label="Zamów wycenę kampanii" />
          <div className="text-xs text-zinc-500 mt-2">
            Ceny netto „od”. Budżet mediowy rozliczany osobno w Google Ads.
          </div>
        </div>
      </div>
    </div>
  );
}

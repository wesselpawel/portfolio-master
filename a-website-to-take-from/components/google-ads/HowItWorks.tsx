export default function HowItWorks() {
  const steps = [
    {
      title: "Analiza i strategia",
      desc: "Poznajemy Twój biznes, definiujemy cele, dobieramy typy kampanii i słowa kluczowe.",
    },
    {
      title: "Implementacja i tagowanie",
      desc: "Konfigurujemy GA4, GTM i konwersje. Przygotowujemy struktury kampanii i reklamy.",
    },
    {
      title: "Optymalizacja",
      desc: "Regularnie optymalizujemy stawki, kreacje, frazy i budżety, by rosnąć w ROI.",
    },
    {
      title: "Raporty i rozwój",
      desc: "Przejrzyste raporty KPI i rekomendacje rozwoju wraz z testami A/B.",
    },
  ];
  return (
    <div className="mt-12">
      <div className="w-[90vw] sm:w-3/4 mx-auto bg-gradient-to-br from-white via-zinc-50 to-blue-50 rounded-2xl p-6 lg:p-10 shadow-lg">
        <h2 className="text-3xl lg:text-4xl font-bold text-zinc-800 text-center mb-6">
          Jak pracujemy z Google Ads?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 border border-zinc-200 shadow-sm"
            >
              <div className="text-emerald-600 text-sm font-semibold">
                Krok {i + 1}
              </div>
              <div className="text-lg font-bold text-zinc-800 mt-1">
                {s.title}
              </div>
              <p className="text-sm text-gray-700 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

const defaultFaqs = [
  {
    q: "Ile budżetu potrzebuję na start?",
    a: "Zwykle rekomendujemy od 1500–3000 zł miesięcznie, zależnie od branży i konkurencji.",
  },
  {
    q: "Czy przygotowujecie landing page?",
    a: "Tak. Doradzamy lub tworzymy landing page i wdrażamy śledzenie konwersji.",
  },
  {
    q: "Kiedy zobaczę efekty?",
    a: "Pierwsze wyniki najczęściej w 1–2 tygodnie. Pełny potencjał po 1–2 miesiącach optymalizacji.",
  },
];

export default function FaqAds({
  faqs = defaultFaqs,
}: {
  faqs?: { q: string; a: string }[];
}) {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="mt-12">
      <div className="w-[90vw] sm:w-3/4 mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl p-6 lg:p-10 shadow-lg">
        <span className="text-3xl lg:text-4xl font-bold text-zinc-800 text-center mb-6">
          FAQ. Najczęstsze pytania
        </span>
        <div className="grid grid-cols-1 gap-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-zinc-200">
              <button
                className="w-full text-left px-4 py-3 font-semibold text-zinc-800"
                onClick={() => setActive(active === i ? null : i)}
              >
                {f.q}
              </button>
              {active === i && (
                <div className="px-4 pb-4 text-sm text-gray-700">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

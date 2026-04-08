import Hero from "@/components/hero/Hero";
import { Metadata } from "next";
export default async function Page() {
  return (
    <div className="md:flex flex-col md:items-center md:justify-between md:space-x-8 md:space-y-0 space-y-8 md:py-12 py-8">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-green-500 via-zinc-600 to-black z-10">
        <Hero />
      </div>
      <div className="mx-auto px-4 z-20 py-24">
        <h1 className="mt-12 text-white text-2xl lg:text-3xl font-gotham w-full">
          DLA FREELANCERÓW I FIRM
        </h1>
        <div className="text-2xl lg:text-3xl font-gotham mt-12">
          <p className=" mt-12">
            QUIXY TO NIE TYLKO NARZĘDZIE, TO FILOZOFIA NOWOCZESNEGO BIZNESU, O
            KTÓREJ PRZYSZŁOŚĆ WALCZYMY KAŻDEGO DNIA. STWORZYLIŚMY PLATFORMĘ,
            KTÓRA ŁĄCZY MOŻLIWOŚCI PRACY ZDALNEJ Z MOCĄ SZTUCZNEJ INTELIGENCJI,
            ABYŚ MÓGŁ TWORZYĆ LEPSZĄ PRZYSZŁOŚĆ DLA SIEBIE I SWOJEJ FIRMY.
          </p>
          <p className=" mt-12">
            NIE CHODZI O TO, ABYŚ PODĄŻAŁ ZA TRENDAMI. CHODZI O TO, ABYŚ JE
            TWORZYŁ! DZIĘKI QUIXY, WSZYSTKIE TWOJE INNOWACYJNE POMYSŁY ZOSTANĄ
            ZREALIZOWANE, A TY BĘDZIESZ MIAŁ DOSTĘP DO NARZĘDZI, KTÓRE POMOGĄ CI
            WZBOGACIĆ TWOJE PRZEDSIĘBIORSTWO, NIEZALEŻNIE OD TEGO, GDZIE SIĘ
            ZNAJDUJESZ.
          </p>
          <p className=" mt-12">
            KAŻDY, KTO WIERZY W TO, ŻE PRZYSZŁOŚĆ BIZNESU TO ZARZĄDZANIE CZASEM
            I ZASOBAMI Z WYKORZYSTANIEM NAJNOWSZYCH TECHNOLOGII, POWINIEN BYĆ
            CZĘŚCIĄ SPOŁECZNOŚCI QUIXY. NASZ AI BUSINESS PLANNER, NASZE
            GENERATORY I NARZĘDZIA PRACY ZDALNEJ TO NIE TYLKO TECHNOLOGIA – TO
            KROK W KIERUNKU LEPSZEJ PRZYSZŁOŚCI.
          </p>
          <p className=" mt-12">
            NIE CZEKAJ NA LEPSZE JUTRO, ZACZNIJ TWORZYĆ JE JUŻ DZIŚ Z QUIXY!
            WSPÓLNIE ZBUDUJEMY PRZYSZŁOŚĆ, W KTÓREJ INNOWACJE SĄ DOSTĘPNE DLA
            KAŻDEGO. Z QUIXY OGRANICZENIA NIE ISTNIEJĄ.
          </p>
        </div>
        <span className="text-xl font-coco italic text-white mt-12">
          Paweł Wessel
        </span>
      </div>
    </div>
  );
}
export const metadata: Metadata = {
  publisher: "quixy.pl",
  manifest: "/manifest.json",

  verification: {
    google: "google85185d3abec28326.html",
  },
  title: "O nas - Misja Quixy",
  description:
    "Quixy to przyszłość freelancera. Łączymy możliwości pracy zdalnej z mocą sztucznej inteligencji, abyś mógł tworzyć lepszą przyszłość dla siebie i swojej firmy.",
  keywords: [
    "misja quixy, praca zdalna, sztuczna inteligencja, innowacje, przyszłość freelancera, narzędzia biznesowe, zarządzanie czasem, technologia w biznesie",
  ],
};

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export default async function Page() {
  return (
    <div className="md:flex flex-col md:items-center md:justify-between md:space-x-8 md:space-y-0 space-y-8 md:py-12 py-8">
      <div className="mx-auto px-4">
        <h1 className="p-3  mt-12 bg-gradient-to-r from-primary to-cta text-white text-2xl lg:text-3xl font-gotham w-full">
          NASZA MISJA - QUIXY – PRZYSZŁOŚĆ PRACY ZDALNEJ
        </h1>
        <div className="text-2xl lg:text-3xl font-gotham mt-12">
          <p className="text-zinc-700  bg-white mt-12">
            QUIXY TO NIE TYLKO NARZĘDZIE, TO FILOZOFIA NOWOCZESNEGO BIZNESU, O
            KTÓREJ PRZYSZŁOŚĆ WALCZYMY KAŻDEGO DNIA. STWORZYLIŚMY PLATFORMĘ,
            KTÓRA ŁĄCZY MOŻLIWOŚCI PRACY ZDALNEJ Z MOCĄ SZTUCZNEJ INTELIGENCJI,
            ABYŚ MÓGŁ TWORZYĆ LEPSZĄ PRZYSZŁOŚĆ DLA SIEBIE I SWOJEJ FIRMY.
          </p>
          <p className="text-zinc-700  bg-white mt-12">
            NIE CHODZI O TO, ABYŚ PODĄŻAŁ ZA TRENDAMI. CHODZI O TO, ABYŚ JE
            TWORZYŁ! DZIĘKI QUIXY, WSZYSTKIE TWOJE INNOWACYJNE POMYSŁY ZOSTANĄ
            ZREALIZOWANE, A TY BĘDZIESZ MIAŁ DOSTĘP DO NARZĘDZI, KTÓRE POMOGĄ CI
            WZBOGACIĆ TWOJE PRZEDSIĘBIORSTWO, NIEZALEŻNIE OD TEGO, GDZIE SIĘ
            ZNAJDUJESZ.
          </p>
          <p className="text-zinc-700  bg-white mt-12">
            KAŻDY, KTO WIERZY W TO, ŻE PRZYSZŁOŚĆ BIZNESU TO ZARZĄDZANIE CZASEM
            I ZASOBAMI Z WYKORZYSTANIEM NAJNOWSZYCH TECHNOLOGII, POWINIEN BYĆ
            CZĘŚCIĄ SPOŁECZNOŚCI QUIXY. NASZ AI BUSINESS PLANNER, NASZE
            GENERATORY I NARZĘDZIA PRACY ZDALNEJ TO NIE TYLKO TECHNOLOGIA – TO
            KROK W KIERUNKU LEPSZEJ PRZYSZŁOŚCI.
          </p>
          <p className="text-zinc-700  bg-white mt-12">
            NIE CZEKAJ NA LEPSZE JUTRO, ZACZNIJ TWORZYĆ JE JUŻ DZIŚ Z QUIXY!
            WSPÓLNIE ZBUDUJEMY PRZYSZŁOŚĆ, W KTÓREJ INNOWACJE SĄ DOSTĘPNE DLA
            KAŻDEGO. Z QUIXY OGRANICZENIA NIE ISTNIEJĄ.
          </p>
        </div>
        <Link
          href="/register"
          className="text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-primary to-cta text-white mt-4 w-full p-2 py-1.5 text-center"
        >
          Zarejestruj się
        </Link>
      </div>
      <div className="md:w-1/2 mb-12 grid grid-cols-1 sm:grid-cols-2">
        <div className="mt-12 flex items-center justify-center">
          <Image
            src="/assets/gif/gihome.webp"
            width={512}
            height={512}
            alt="Praca zdalna w biurze"
            title="Praca zdalna w biurze"
            style={{ boxShadow: "0px 0px 5px black" }}
            className=" w-[80%] sm:w-auto mt-4 lg:mt-0 h-auto sm:h-[200px]"
          />
        </div>
        <div className="mt-12 flex items-center justify-center">
          <Image
            src="/assets/gif/giremotework.webp"
            width={512}
            height={512}
            alt="Praca zdalna w biurze"
            title="Praca zdalna w biurze"
            style={{ boxShadow: "0px 0px 5px black" }}
            className=" h-auto sm:h-[200px] mt-4 lg:mt-0 w-[80%] sm:w-auto"
          />
        </div>
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
    "Quixy to przyszłość pracy zdalnej. Łączymy możliwości pracy zdalnej z mocą sztucznej inteligencji, abyś mógł tworzyć lepszą przyszłość dla siebie i swojej firmy.",
};

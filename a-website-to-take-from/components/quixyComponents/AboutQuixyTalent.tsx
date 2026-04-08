"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCheck, FaCheckCircle, FaChevronRight } from "react-icons/fa";
import { BsFillSignStopFill } from "react-icons/bs";
import logo from "../../public/assets/quixy-logo.png";
export default function AboutQuixyfreelancer() {
  const [content, setContent] = useState<"company" | "freelancer">(
    "freelancer"
  );

  return (
    <section
      aria-label="Quixy — dla firm i freelancerów"
      className="mt-12 relative pb-12"
    >
      {/* EPIC background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-50 via-white to-zinc-50" />
      <div className="absolute inset-x-0 -top-24 -z-10 h-72 bg-gradient-to-r from-blue-800/30 via-blue-950/20 to-transparent blur-3xl" />

      <div className="mx-auto rounded-2xl border border-zinc-200/70 bg-white/90 shadow-xl backdrop-blur pb-12">
        {/* Top header */}
        <header className="px-6 pt-6 sm:px-10 sm:pt-10">
          <h2 className="text-2xl sm:text-3xl 2xl:text-5xl font-extrabold tracking-tight text-zinc-900">
            Zbuduj przewagę. Teraz.
          </h2>
          {content === "company" && (
            <p className="mt-4 text-zinc-700">
              Zbuduj widoczność, skróć czas rekrutacji i uruchom projekt w
              dniach, nie tygodniach.
            </p>
          )}
          {content === "freelancer" && (
            <p className="mt-4 text-zinc-700">
              Pokaż swoje umiejętności i zacznij rozmawiać z klientami.
            </p>
          )}

          {/* Tabs */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setContent("company")}
              className={`text-sm sm:text-base font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-sm ring-1 ${
                content === "company"
                  ? "bg-zinc-900 text-white ring-zinc-900/20 hover:brightness-110"
                  : "bg-zinc-100 text-zinc-900 ring-zinc-200 hover:bg-zinc-200"
              }`}
              aria-pressed={content === "company"}
            >
              FIRMA
            </button>
            <button
              onClick={() => setContent("freelancer")}
              className={`text-sm sm:text-base font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-sm ring-1 ${
                content === "freelancer"
                  ? "bg-zinc-900 text-white ring-zinc-900/20 hover:brightness-110"
                  : "bg-zinc-100 text-zinc-900 ring-zinc-200 hover:bg-zinc-200"
              }`}
              aria-pressed={content === "freelancer"}
            >
              FREELANCER
            </button>
          </div>
        </header>

        {/* Panels */}
        {content === "company" && (
          <div className="px-6 pb-8 sm:px-10 sm:pb-12">
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Copy */}
              <div>
                <ul className="mt-6 flex flex-col gap-1.5 text-zinc-900">
                  <li className="relative flex">
                    <div className="relative bg-blue-600 rounded-lg h-8 w-8 aspect-square flex items-center justify-center">
                      <FaCheckCircle className="min-h-5 min-w-5 text-white" />
                    </div>
                    <div className="max-w-xl pl-2 font-gotham font-light">
                      Precyzyjne dopasowanie specjalistów do wymagań — mniej
                      rozmów, więcej efektów.
                    </div>
                  </li>
                  <li className="relative flex">
                    <div className="relative bg-blue-600 rounded-lg h-8 w-8 aspect-square flex items-center justify-center">
                      <FaCheckCircle className="min-h-5 min-w-5 text-white" />
                    </div>
                    <div className="max-w-xl pl-2 font-gotham font-light">
                      Gotowe pipeline’y freelancerów w IT, marketingu, animacji
                      i e-commerce.
                    </div>
                  </li>
                  <li className="relative flex">
                    <div className="relative bg-blue-600 rounded-lg h-8 w-8 aspect-square flex items-center justify-center">
                      <FaCheckCircle className="min-h-5 min-w-5 text-white" />
                    </div>
                    <div className="max-w-xl pl-2 font-gotham font-light">
                      Wbudowane generowanie leadów — stały dopływ rozmów
                      sprzedażowych.
                    </div>
                  </li>
                  <li className="relative flex">
                    <div className="relative bg-blue-600 rounded-lg h-8 w-8 aspect-square flex items-center justify-center">
                      <FaCheckCircle className="min-h-5 min-w-5 text-white" />
                    </div>
                    <div className="max-w-xl pl-2 font-gotham font-light">
                      CCRM do współpracy klient–zespół: przejrzyste statusy,
                      terminy, odpowiedzialności.
                    </div>
                  </li>
                  <li className="relative flex">
                    <div className="relative bg-blue-600 rounded-lg h-8 w-8 aspect-square flex items-center justify-center">
                      <FaCheckCircle className="min-h-5 min-w-5 text-white" />
                    </div>
                    <div className="max-w-xl pl-2 font-gotham font-light">
                      Odciąż swój zespół — my dostarczamy specjalistów, Ty
                      utrzymujesz tempo realizacji.
                    </div>
                  </li>
                </ul>{" "}
                <Link
                  href="/register"
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-green-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-md ring-1 ring-black/5 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/70"
                >
                  Dołącz jako firma
                </Link>
              </div>
            </div>
          </div>
        )}

        {content === "freelancer" && (
          <div className="px-6 pb-8 sm:px-10 sm:pb-12">
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Copy */}
              <div>
                <ul className="mt-6 flex flex-col gap-1.5 text-zinc-900">
                  <li className="relative flex">
                    <div className="relative bg-blue-600 rounded-lg h-8 w-8 aspect-square flex items-center justify-center">
                      <FaCheckCircle className="min-h-5 min-w-5 text-white" />
                    </div>
                    <div className="max-w-xl pl-2 font-gotham font-light">
                      Bezpośredni dostęp do zleceń w IT, e-commerce, marketingu
                      i animacji.
                    </div>
                  </li>
                  <li className="relative flex">
                    <div className="relative bg-blue-600 rounded-lg h-8 w-8 aspect-square flex items-center justify-center">
                      <FaCheckCircle className="min-h-5 min-w-5 text-white" />
                    </div>
                    <div className="max-w-xl pl-2 font-gotham font-light">
                      Profile, które sprzedają Twoje kompetencje — jasne zakresy
                      i portfolio w jednym miejscu.
                    </div>
                  </li>
                  <li className="relative flex">
                    <div className="relative bg-blue-600 rounded-lg h-8 w-8 aspect-square flex items-center justify-center">
                      <FaCheckCircle className="min-h-5 min-w-5 text-white" />
                    </div>
                    <div className="max-w-xl pl-2 font-gotham font-light">
                      AI do tworzenia treści i wizualizacji ofert (wkrótce) —
                      szybciej docierasz do decyzji.
                    </div>
                  </li>
                  <li className="relative flex">
                    <div className="relative bg-blue-600 rounded-lg h-8 w-8 aspect-square flex items-center justify-center">
                      <FaCheckCircle className="min-h-5 min-w-5 text-white" />
                    </div>
                    <div className="max-w-xl pl-2 font-gotham font-light">
                      Sprzedawaj gotowe projekty, aplikacje i usługi na rynku
                      Quixy — monetyzuj swój dorobek.
                    </div>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-green-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-md ring-1 ring-black/5 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/70"
                >
                  Dołącz bez firmy
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto max-w-[95%] py-16">
        <div className="flex flex-col-reverse md:flex-row text-black w-full">
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold flex items-center">
              Dołącz już dziś!
            </h2>
            <p className="text-left max-w-[40rem] mb-3 mt-2">
              Zapoznaj się z naszymi tablicami ofert i rynkiem usług! Wyświetlaj
              swój profil jako freelancer lub firma.
            </p>
            <div className="w-full">
              <Link
                href="/register"
                className="w-max max-w-full flex items-center gap-3 rounded-md font-gotham bg-gradient-to-r from-ctaStart to-ctaEnd hover:scale-105 duration-100 text-white px-4 py-2 text-center"
              >
                Utwórz profil
                <FaChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Comparison Section */}
      <div className="mx-auto mt-12 max-w-6xl px-3 lg:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          Stare platformy freelancerskie? Pora na coś świeżego.
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Quixy */}
          <div className="relative rounded-2xl border border-emerald-200 bg-green-50/80 p-6 shadow-md">
            <p className="text-xl font-bold text-green-800">Quixy</p>
            <Image
              src={logo}
              width={150}
              height={150}
              alt="Quixy Logo"
              className="absolute -right-2 -top-4 h-12 w-auto mb-4"
              priority
            />
            <ul className="mt-4 space-y-3 text-green-900 font-gotham font-light">
              <li>Świeże, aktualne zlecenia codziennie</li>
              <li>Zweryfikowane profile i realni klienci</li>
              <li>Inteligentne dopasowanie ofert</li>
              <li>Technologia Google i AI</li>
              <li>Średni czas odpowiedzi — godziny, nie dni</li>
            </ul>
          </div>
          {/* Other platforms */}
          <div className="relative rounded-2xl border border-red-200 bg-red-50/80 p-6 shadow-sm">
            <div className="absolute -right-2 -top-4">
              <BsFillSignStopFill className="text-red-500 w-12 h-12" />
            </div>
            <p className="text-xl font-bold text-red-800">
              Platformy freelancerskie
            </p>
            <ul className="font-gotham mt-4 space-y-3 text-red-900 font-light">
              <li>Rdza, boty i przestarzałe ogłoszenia</li>
              <li>Martwe konta i brak aktywności</li>
              <li>Chaotyczny proces pozyskiwania leadów</li>
              <li>Brak realnego wsparcia technologicznego</li>
              <li>Długie oczekiwanie na odpowiedź</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

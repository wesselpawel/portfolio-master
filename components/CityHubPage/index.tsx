import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import {
  getCityServiceLinks,
  getCityTargetLinks,
  getSiblingCityHubLinks,
} from "@/data/landingPages";
import type { LandingPageCity } from "@/data/polishCities";
import type { PexelsCityPhoto } from "@/utils/pexels";
import CityHubHeroShell from "./CityHubHeroShell";
import CityHubPricingSection from "./CityHubPricingSection";
import HeroWebsiteCostCalculator from "../HeroSection/HeroWebsiteCostCalculator";
import Map from "./Map";
import Opinions from "../opinions/Opinions";
import OpinionsSection from "@/components/OpinionsSection";

type CityHubPageProps = {
  city: LandingPageCity;
  cityPhotos?: PexelsCityPhoto[];
};

const RESULT_PROOFS = [
  {
    src: "/results/google-search-console-summary.png",
    title: "Google Search Console",
    description: "Raport podsumowujący kliknięcia i wyświetlenia strony w wyszukiwarce.",
  },
  {
    src: "/results/google-search-console-performance.png",
    title: "Skuteczność w Google",
    description: "Widoczność i ruch organiczny mierzone na realnych danych z Search Console.",
  },
  {
    src: "/results/google-ads-results.png",
    title: "Google Ads",
    description: "Wyniki kampanii z kliknięciami, wyświetleniami, CPC i kosztem działań.",
  },
  {
    src: "/results/google-analytics-recommendation.png",
    title: "Google Analytics",
    description: "Wzrost zainteresowania konkretną stroną i rekomendacje wynikające z danych.",
  },
  {
    src: "/results/google-partner.png",
    title: "Google Partner",
    description: "Dowód pracy z ekosystemem Google i zrozumienia procesu pozyskiwania ruchu.",
  },
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getHubKeywordPhrases(cityName: string): string[] {
  return [
    `Tworzenie stron internetowych ${cityName}`,
    `tworzenie stron internetowych ${cityName}`,
    `projekt strony internetowej ${cityName}`,
    `Projekt strony internetowej ${cityName}`,
    `tworzenie strony internetowej ${cityName}`,
    `Tworzenie strony internetowej ${cityName}`,
    `strona internetowa ${cityName}`,
    `Strona internetowa ${cityName}`,
    `Projektowanie stron WWW ${cityName}`,
    `projektowanie stron WWW ${cityName}`,
    `strony internetowe ${cityName}`,
    `Strony internetowe ${cityName}`,
    `Tworzenie stron WWW ${cityName}`,
    `landing page ${cityName}`,
    `Landing page ${cityName}`,
    `sklep internetowy`,
    `sklepy internetowe ${cityName}`,
    `pozycjonowanie lokalne`,
    `SEO`,
  ];
}

function highlightHubKeywords(text: string, cityName: string): ReactNode {
  const phrases = Array.from(new Set(getHubKeywordPhrases(cityName))).sort(
    (left, right) => right.length - left.length,
  );

  const regex = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(regex);

  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => {
    const isKeyword = phrases.some(
      (phrase) => phrase.toLowerCase() === part.toLowerCase(),
    );

    if (!isKeyword) {
      return part;
    }

    return (
      <strong key={`${part}-${index}`} className="font-semibold text-white">
        {part}
      </strong>
    );
  });
}

function getServiceCardContent(cityName: string) {
  return [
    {
      title: `Strony internetowe ${cityName}`,
      description: `Projektuję nowoczesne strony internetowe dla firm z ${cityName} - szybkie, przejrzyste i zoptymalizowane pod klientów.`,
    },
    {
      title: `Projektowanie stron WWW ${cityName}`,
      description:
        "Tworzę strony WWW od podstaw - od struktury i UX po design i wdrożenie.",
    },
    {
      title: `Landing page ${cityName}`,
      description:
        "Projektuję landing page nastawione na konwersję i generowanie leadów.",
    },
    {
      title: `Sklepy internetowe ${cityName}`,
      description:
        "Buduję sklepy internetowe, które sprzedają - od prostych wdrożeń po rozbudowane e-commerce.",
    },
    {
      title: `Strony internetowe na sprzedaż ${cityName}`,
      description:
        "Gotowe strony WWW do szybkiego startu - idealne dla lokalnych biznesów.",
    },
    {
      title: `Pozycjonowanie stron WWW ${cityName}`,
      description:
        "Zwiększam widoczność Twojej strony w Google i pomagam zdobywać klientów lokalnie.",
    },
  ];
}

function getTargetHubLabel(label: string, cityName: string): string {
  return label.replace(/^Strona dla /, "Strona WWW dla ").replace(cityName, cityName);
}
const markers = [
  {
    style: "w-[8%] absolute top-[40%] left-[9.5%] sm:left-[8.5%]",
    label: "Szczecin - Strona internetowa dla restauracji",
  },
  {
    style: "w-[10%] absolute top-[58%] left-[18%]",
    label: "Zielona Góra - Sklep online z elektroniką",
  },
  {
    style: "w-[6%] absolute top-[69%] left-[33%]",
    label: "Wrocław - Portfolio fotografa",
  },
  {
    style: "w-[6%] absolute top-[76%] left-[43%]",
    label: "Opole - Strona dla kancelarii prawnej",
  },
  {
    style: "w-[6%] absolute top-[67%] left-[44.5%]",
    label: "Katowice - Sklep internetowy z odzieżą",
  },
  {
    style: "w-[8%] absolute top-[81%] left-[56.5%]",
    label: "Kraków - Strona internetowa dla hotelu",
  },
  {
    style: "w-[8%] absolute top-[78%] left-[72.5%]",
    label: "Rzeszów - Portal edukacyjny",
  },
  {
    style: "w-[10%] absolute top-[57%] left-[79%]",
    label: "Lublin - Strona internetowa dla lekarza",
  },
  {
    style: "w-[8%] absolute top-[65%] left-[60.5%]",
    label: "Kielce - Blog kulinarny",
  },
  {
    style: "w-[10%] absolute top-[50%] left-[47.5%]",
    label: "Łódź - Portfolio grafika",
  },
  {
    style: "w-[8%] absolute top-[46%] left-[30%]",
    label: "Poznań - Strona internetowa dla agencji marketingowej",
  },
  {
    style: "w-[8%] absolute top-[36%] left-[22%]",
    label: "Gorzów Wlkp. - Strona internetowa dla szkoły językowej",
  },
  {
    style: "w-[10%] absolute top-[27%] left-[37.5%]",
    label: "Bydgoszcz - Sklep internetowy z zabawkami",
  },
  {
    style: "w-[8%] absolute top-[44%] left-[65%]",
    label: "Radom - Strona internetowa dla architekta",
  },
  {
    style: "w-[8%] absolute top-[34%] left-[56%]",
    label: "Białystok - Portal informacyjny",
  },
  {
    style: "w-[10%] absolute top-[23%] left-[78%]",
    label: "Suwałki - Strona internetowa dla firmy budowlanej",
  },
  {
    style: "w-[10%] absolute top-[12%] left-[58%]",
    label: "Olsztyn - Strona internetowa dla przedszkola",
    
  },
  {
    style: "w-[10%] absolute top-[6%] left-[32%]",
    label: "Gdańsk - Strona internetowa dla salonu fryzjerskiego",
  },
  {
    style: "w-[10%] absolute top-[15%] left-[10%]",
    label: "Koszalin - Strona internetowa dla trenera personalnego",
  },
];

export default function CityHubPage({
  city,
  cityPhotos = [],
}: CityHubPageProps) {
  const serviceLinks = getCityServiceLinks(city.slug);
  const targetLinks = getCityTargetLinks(city.slug, 4);
  const siblingCityHubLinks = getSiblingCityHubLinks(city.slug, 8);
  const serviceCards = getServiceCardContent(city.name);
  const cityGenitive = city.hasTrustedCases ? city.cases.dopelniacz : city.name;
  const cityLocative = city.hasTrustedCases ? city.cases.miejscownik : city.name;

  return (
    <div className="bg-slate-950 text-white">
      <CityHubHeroShell citySlug={city.slug}>
          <div>
            
            <h1 className="mt-4 font-cocosharp text-2xl font-bold leading-tight text-white sm:text-3xl">
              Tworzenie stron internetowych {city.name}
            </h1>
            <p className="mt-5 max-w-3xl font-dosis text-base leading-relaxed text-white">
              Chcesz wiedzieć{" "}
              <Link
                href="/koszt-stworzenia-strony-internetowej-2026-rok"
                className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
              >
                ile kosztuje tworzenie strony internetowej
              </Link>{" "}
              {highlightHubKeywords(
                `${city.context.inLocative}? - Jesteś w dobrym miejscu. Skontaktuj się ze mną i otrzymaj darmową wycenę.`,
                city.name,
              )}
            </p>
            <p className="mt-4 max-w-3xl font-dosis text-base leading-relaxed text-white">
              Zajmuję się tworzeniem stron internetowych {city.context.inLocative}. Umieszczę Twój biznes w widocznym miejscu wyszukiwarki Google.
            </p>
            

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#cennik-hub"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(253,224,71,0.25)] transition hover:brightness-105"
              >
                Zobacz cennik
              </Link>
              
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
           <HeroWebsiteCostCalculator />
          </div>
      </CityHubHeroShell>

      <CityHubPricingSection citySlug={city.slug} cityName={city.name} />

      <section className="mx-auto w-[90vw] max-w-7xl py-16 lg:py-20">
        <h2 className="text-2xl font-bold text-white">Tworzymy strony internetowe w całej Polsce</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">

<div className="">

        <Map markers={markers} /> 
</div>
        <Opinions />
        <OpinionsSection />
        </div>
      </section>

      {cityPhotos.length ? (
        <section className="mx-auto w-[90vw] max-w-7xl py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200/80">
              Miasto i kontekst
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Zobacz {city.name} na zdjeciach
            </h2>
            <p className="mt-4 font-dosis text-base leading-relaxed text-white/70 sm:text-lg">
              Dodajemy lokalny kontekst miasta przez fotografie powiazane z dana
              lokalizacja. Dzieki temu hub strony WWW {city.context.inLocative}
              zyskuje bardziej miejski, lokalny charakter.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {cityPhotos.map((photo) => (
              <article
                key={photo.id}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
              >
                <div className="overflow-hidden border-b border-white/10">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1200}
                    height={800}
                    className="h-72 w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-lg font-semibold text-white">{city.name}</p>
                  <p className="mt-2 font-dosis text-sm leading-relaxed text-white/70">
                    {photo.alt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/60">
                    <Link
                      href={photo.photographerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-yellow-200"
                    >
                      Foto: {photo.photographer}
                    </Link>
                    <Link
                      href={photo.pexelsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-yellow-200"
                    >
                      Zobacz w Pexels
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section id="oferty" className="mx-auto w-[90vw] max-w-7xl py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200/80">
            Tworzenie stron WWW {city.name} - co mogę dla Ciebie zrobić
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            W zależności od tego, czego potrzebujesz, mogę stworzyć
          </h2>
          <p className="mt-4 font-dosis text-base leading-relaxed text-white/70 sm:text-lg">
            Jeśli nie masz pewności, co wybrać - pomogę dobrać najlepsze
            rozwiązanie dla Twojego biznesu.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {serviceLinks.map((link, index) => (
            <Link
              key={`${city.slug}-hub-offer-${index}`}
              id={`hub-offer-${index}`}
              href={link.href}
              className="group scroll-mt-28 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition hover:border-yellow-300/40 hover:bg-[linear-gradient(180deg,rgba(253,224,71,0.12),rgba(255,255,255,0.04))]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-200/80">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {serviceCards[index]?.title ?? link.label}
              </h3>
              <p className="mt-3 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
                {highlightHubKeywords(
                  serviceCards[index]?.description ?? "",
                  city.name,
                )}
              </p>
              <span className="mt-5 inline-flex text-sm font-semibold text-yellow-200 transition group-hover:translate-x-1">
                Przejdz do oferty
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="wyniki"
        className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.84))] py-16 lg:py-20"
      >
        <div className="mx-auto w-[90vw] max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200/80">
              Wyniki naszych projektow
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Tworzenie stron internetowych to nie tylko wygląd - to realne efekty
            </h2>
            <p className="mt-4 font-dosis text-base leading-relaxed text-white/70 sm:text-lg">
              Pokazuję dane z narzędzi Google, które potwierdzają skuteczność
              działań: wzrost kliknięć, widoczności, ruchu i lepsze wykorzystanie
              kampanii. Jeśli chcesz zobaczyć, jak te wyniki łączą się z gotowymi
              wdrożeniami, przejdź też do{" "}
              <Link
                href="/realizations"
                className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
              >
                realizacji
              </Link>
              .
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {RESULT_PROOFS.map((proof) => (
              <article
                key={proof.src}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-black/20 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
              >
                <div className="border-b border-white/10 p-5">
                  <p className="text-lg font-semibold text-white">{proof.title}</p>
                  <p className="mt-2 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
                    {proof.title === "Google Search Console"
                      ? "Wzrost klikniec i widocznosci strony w wynikach wyszukiwania."
                      : proof.title === "Google Ads"
                        ? "Skuteczne kampanie i lepsza kontrola kosztow pozyskania ruchu."
                        : proof.title === "Google Analytics"
                          ? "Realny ruch na stronie i zachowanie uzytkownikow po wdrozeniu."
                          : proof.title === "Google Partner"
                            ? "Doswiadczenie w pracy z ekosystemem Google i narzedziami reklamowymi."
                            : "Dane potwierdzajace skutecznosc dzialan SEO i widocznosci."}
                  </p>
                </div>
                <div className="p-4">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
                    <Image
                      src={proof.src}
                      alt={proof.title}
                      width={1200}
                      height={700}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[90vw] max-w-7xl py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/80">
              Strony WWW dla branz w {city.name}
            </p>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Projektuję strony dopasowane do konkretnych usług i klientów
              lokalnych
            </h2>
            <p className="mt-4 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
              To dodatkowe podstrony, które porządkują lokalne intencje i
              wzmacniają główny hub miasta. Dla części branż możesz też porównać
              ofertę z moimi{" "}
              <Link
                href="/realizations"
                className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
              >
                realizacjami
              </Link>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {targetLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  {getTargetHubLabel(link.label, city.name)}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/80">
              Projektowanie stron WWW w innych miastach
            </p>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Działam nie tylko w {city.name}
            </h2>
            <p className="mt-4 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
              Projektuję strony WWW również w innych miastach. Te linki wzmacniają
              lokalną architekturę strony i pomagają porównywać sąsiednie rynki.
              Jeśli chcesz, mogę przygotować podobną stronę także dla lokalizacji
              blisko {cityLocative}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {siblingCityHubLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection
        content={{
          title: `${city.name} - strona internetowa dopasowana do Twojego biznesu`,
          subtitle:
            `Jeśli prowadzisz firmę ${city.context.inLocative} i nie masz jeszcze strony, obecna strona nie działa albo chcesz zwiększyć liczbę klientów - napisz do mnie. Powiedz, czego potrzebujesz, a przygotuję propozycję strony internetowej dopasowanej do Twojego biznesu.`,
          imageAlt: `Strona internetowa ${city.name}`,
        }}
      />
    </div>
  );
}

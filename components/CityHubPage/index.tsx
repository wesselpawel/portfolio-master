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

function renderInlineLinks(
  links: Array<{ href: string; label: string }>,
  transformLabel?: (label: string) => string,
) {
  return links.map((link, index) => {
    const isLast = index === links.length - 1;
    const isSecondToLast = index === links.length - 2;

    return (
      <span key={link.href}>
        <Link
          href={link.href}
          className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
        >
          {transformLabel ? transformLabel(link.label) : link.label}
        </Link>
        {!isLast ? (isSecondToLast ? " oraz " : ", ") : null}
      </span>
    );
  });
}

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
  const highlightedServiceLinks = serviceLinks.slice(0, 4);

  return (
    <div className="bg-slate-950 text-white">
      <CityHubHeroShell citySlug={city.slug}>
          <div>
            
            <h1 className="mt-4 font-cocosharp text-4xl font-bold leading-tight text-yellow-300 sm:text-5xl">
              Tworzenie stron internetowych {city.name}
            </h1>
            <p className="mt-5 max-w-3xl font-dosis text-base leading-relaxed text-white/75 sm:text-lg">
              {highlightHubKeywords(
                `Jeśli szukasz kogoś, kto zajmie się tworzeniem strony internetowej ${city.name} - jesteś w dobrym miejscu. Projektuję i tworzę strony internetowe dla firm z ${cityGenitive}, które chcą być widoczne w Google i zdobywać nowych klientów.`,
                city.name,
              )}
            </p>
            <p className="mt-4 max-w-3xl font-dosis text-base leading-relaxed text-white/70 sm:text-lg">
              Nie robię "ładnych wizytówek" - buduję strony, które mają konkretny
              cel: zapytania, telefony i sprzedaż. Ten hub porządkuje wszystkie
              usługi związane z tworzeniem i projektowaniem stron WWW{" "}
              {city.context.inLocative} w jednym miejscu.
            </p>
            <p className="mt-4 max-w-3xl font-dosis text-base leading-relaxed text-white/70 sm:text-lg">
              Jeśli chcesz najpierw zobaczyć efekty, sprawdź{" "}
              <Link
                href="/realizations"
                className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
              >
                moje realizacje
              </Link>
              . Możesz też od razu przejść do usług takich jak{" "}
              {renderInlineLinks(highlightedServiceLinks, (label) =>
                label.replace("Pozycjonowanie stron internetowych", "Pozycjonowanie stron WWW"),
              )}
              .
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#cennik-hub"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(253,224,71,0.25)] transition hover:brightness-105"
              >
                Zobacz cennik
              </Link>
              <Link
                href="#konfigurator-wyceny"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-yellow-300/35 bg-yellow-300/10 px-5 py-3 text-sm font-semibold text-yellow-100 transition hover:border-yellow-300/50 hover:bg-yellow-300/15"
              >
                Skonfiguruj wycenę
              </Link>
              <Link
                href="#oferty"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                Zobacz ofertę
              </Link>
              <Link
                href="/realizations"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                Zobacz wyniki i realizacje
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold text-white">
              Strona internetowa {city.name} - od pomysłu do wdrożenia
            </p>
            <p className="mt-2 font-dosis text-sm leading-relaxed text-white/70">
              Każda strona internetowa {city.context.inLocative}, którą tworzę,
              zaczyna się od zrozumienia Twojego biznesu.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3">
              {[
                `projekt strony internetowej ${city.name}`,
                `tworzenie strony internetowej ${city.name}`,
                "wdrożenie i optymalizacja",
                "przygotowanie pod pozycjonowanie lokalne",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white/85"
                >
                  {highlightHubKeywords(item, city.name)}
                </div>
              ))}
            </div>
            <p className="mt-5 font-dosis text-sm leading-relaxed text-white/70">
              Dzięki temu nie musisz koordynować kilku osób - wszystko masz w
              jednym miejscu. A jeśli chcesz zobaczyć, jak taki proces kończy się
              w praktyce, zajrzyj do{" "}
              <Link
                href="/realizations"
                className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
              >
                realizacji
              </Link>
              .
            </p>
          </div>
      </CityHubHeroShell>

      <CityHubPricingSection citySlug={city.slug} cityName={city.name} />

      <section className="mx-auto w-[90vw] max-w-7xl py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/80">
              Projekt strony internetowej {city.name}
            </p>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Projekt strony internetowej to nie tylko wygląd
            </h2>
            <p className="mt-4 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
              {highlightHubKeywords(
                `Tworzę projekty, które są czytelne dla użytkownika, prowadzą klienta do kontaktu, dobrze wyglądają na telefonie i są przygotowane pod SEO w ${cityLocative}.`,
                city.name,
              )}
            </p>
            <p className="mt-4 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
              Każdy projekt strony internetowej {city.context.inLocative}
              dopasowuję do branży i tego, jak klienci faktycznie szukają usług.
              Zobacz też, jak to łączę z{" "}
              <Link
                href={serviceLinks[5]?.href ?? "/realizations"}
                className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
              >
                pozycjonowaniem stron WWW
              </Link>{" "}
              i{" "}
              <Link
                href="/realizations"
                className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
              >
                realnymi wdrożeniami
              </Link>
              .
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/80">
              Strony internetowe {city.name} - podejście
            </p>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Patrzę na stronę jak na narzędzie do pozyskiwania klientów
            </h2>
            <p className="mt-4 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
              Nie działam szablonowo. Każda strona internetowa dla firmy{" "}
              {city.context.fromGenitive} jest projektowana tak, żeby wyróżniała
              się na tle konkurencji, była szybka i prosta w obsłudze oraz
              generowała realne zapytania.
            </p>
            <p className="mt-4 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
              Łączę projekt strony internetowej, tworzenie strony WWW, myślenie pod
              Google i SEO oraz doświadczenie z realnymi wynikami. Część z tych
              efektów pokazuję bezpośrednio na stronie{" "}
              <Link
                href="/realizations"
                className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
              >
                realizacje
              </Link>
              .
            </p>
          </div>
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
              key={link.href}
              href={link.href}
              className="group rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition hover:border-yellow-300/40 hover:bg-[linear-gradient(180deg,rgba(253,224,71,0.12),rgba(255,255,255,0.04))]"
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

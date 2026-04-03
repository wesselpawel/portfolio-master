import type { Metadata } from "next";
import {
  getLandingPageTargetRecords,
  type LandingPageTargetRecord,
} from "@/data/landingPageTargets";
import {
  ALL_POLISH_CITIES,
  type LandingPageCity,
} from "@/data/polishCities";

export type LandingPageOffer = {
  name: string;
  description: string;
  highlighted?: boolean;
  image?: string;
  imageAlt?: string;
  price?: number;
};

export type LandingPageStep = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export type LandingPageFaqItem = {
  question: string;
  answer: string;
  relatedLinks?: readonly LandingPageLink[];
};

export type LandingPageLink = {
  href: string;
  label: string;
};

export type LandingPageHeroContent = {
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  floatingPromptPrimary: string;
  floatingPromptSecondary: string;
};

export type LandingPageFormContent = {
  title: string;
  subtitle: string;
  requirementsPlaceholder: string;
  sendLabel: string;
  successMessage: string;
};

export type LandingPageIntentContent = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  ctaTitle: string;
  ctaDescription: string;
  primaryCtaLabel: string;
  offerLabel: string;
  offerOptions: LandingPageOffer[];
  offerSupportingLinks?: LandingPageLink[];
  whyTitle: string;
  whyIntro: string;
  whyPoints: string[];
  processTitle: string;
  processSteps: LandingPageStep[];
  includedTitle: string;
  includedParagraphs: string[];
  includedListLabel: string;
  includedItems: string[];
  includedCtaLabel: string;
  faqTitle: string;
  faqIntro: string;
  faqItems: LandingPageFaqItem[];
  faqCtaLabel: string;
  nextStepEyebrow: string;
  nextStepTitle: string;
  nextStepDescription: string;
  nextStepPrimaryCtaLabel: string;
  nextStepSecondaryCtaLabel: string;
};

export type LandingPageContactContent = {
  title: string;
  subtitle: string;
  imageAlt: string;
};

export type LandingPageSeoContent = {
  title: string;
  description: string;
};

export type LandingPageServiceKey =
  | "website"
  | "design"
  | "landing"
  | "store"
  | "sale"
  | "seo";

export type LandingPageContent = {
  key: string;
  slug?: string;
  serviceKey?: LandingPageServiceKey;
  citySlug?: string;
  cityName?: string;
  targetKey?: string;
  targetLabel?: string;
  addedDate: string;
  seo: LandingPageSeoContent;
  hero: LandingPageHeroContent;
  form: LandingPageFormContent;
  intent: LandingPageIntentContent;
  portfolioHeading: string;
  contact: LandingPageContactContent;
};

export type LandingPageServiceRouteParam =
  | "tworzenie-stron-internetowych"
  | "projektowanie-stron-www"
  | "tworzenie-landing-page"
  | "tworzenie-sklepow-internetowych"
  | "strony-internetowe-na-sprzedaz"
  | "seo";

type CityLandingPageInput = Omit<
  LandingPageContent,
  | "key"
  | "slug"
  | "serviceKey"
  | "citySlug"
  | "cityName"
  | "targetKey"
  | "targetLabel"
  | "addedDate"
  | "form"
  | "contact"
> & {
  form?: Partial<LandingPageFormContent>;
  contact?: LandingPageContactContent;
};

type GenericLandingPageInput = Omit<
  LandingPageContent,
  | "key"
  | "slug"
  | "serviceKey"
  | "citySlug"
  | "cityName"
  | "targetKey"
  | "targetLabel"
  | "addedDate"
  | "form"
  | "contact"
> & {
  slug: string;
  form?: Partial<LandingPageFormContent>;
  contact?: LandingPageContactContent;
};

const SITE_URL = "https://wesselpawel.com";
const DEFAULT_CITY_SLUG = "grudziadz";
export const CITY_HUB_BASE_SEGMENT = "projektowanie-stron";
const ALL_SERVICE_KEYS: LandingPageServiceKey[] = [
  "website",
  "design",
  "landing",
  "store",
  "sale",
  "seo",
];
const DEFAULT_CONTEXTUAL_SERVICE_KEYS: LandingPageServiceKey[] = [
  "website",
  "design",
  "landing",
  "store",
  "sale",
  "seo",
];

const SERVICE_LABELS: Record<LandingPageServiceKey, string> = {
  website: "Strony internetowe",
  design: "Projektowanie stron www",
  landing: "Landing page",
  store: "Sklepy internetowe",
  sale: "Strony internetowe na sprzedaż",
  seo: "Pozycjonowanie stron internetowych",
};

const SERVICE_ROUTE_SEGMENTS: Record<
  LandingPageServiceKey,
  LandingPageServiceRouteParam
> = {
  website: "tworzenie-stron-internetowych",
  design: "projektowanie-stron-www",
  landing: "tworzenie-landing-page",
  store: "tworzenie-sklepow-internetowych",
  sale: "strony-internetowe-na-sprzedaz",
  seo: "seo",
};

export function getServiceLabel(serviceKey: LandingPageServiceKey): string {
  return SERVICE_LABELS[serviceKey];
}

const DEFAULT_FORM_CONTENT: LandingPageFormContent = {
  title: "Formularz kontaktowy",
  subtitle: "Opisz krótko projekt i zostaw numer telefonu.",
  requirementsPlaceholder:
    "Opisz czego potrzebujesz, jaki jest cel strony i jaki termin Cię interesuje...",
  sendLabel: "Wyślij zapytanie",
  successMessage: "Dzięki! Twoje zapytanie zostało wysłane.",
};

const DEFAULT_CONTACT_CONTENT: LandingPageContactContent = {
  title: "Masz pomysł na stronę internetową?",
  subtitle: "Zamów darmową wycenę, wypełniając formularz poniżej",
  imageAlt: "Zamów stronę internetową",
};

type LandingPageDateKey =
  | "home"
  | "website-overview"
  | "design-overview"
  | "landing-overview"
  | "store-overview"
  | "seo-overview"
  | "website-city"
  | "design-city"
  | "landing-city"
  | "store-city"
  | "seo-city"
  | "sale-overview"
  | "sale-city"
  | "target-city";

const LANDING_PAGE_ADDED_DATES: Record<LandingPageDateKey, string> = {
  home: "2026-04-01",
  "website-overview": "2026-04-02",
  "design-overview": "2026-04-03",
  "landing-overview": "2026-04-01",
  "store-overview": "2026-04-02",
  "seo-overview": "2026-04-03",
  "website-city": "2026-04-01",
  "design-city": "2026-04-02",
  "landing-city": "2026-04-03",
  "store-city": "2026-04-01",
  "seo-city": "2026-04-02",
  "sale-overview": "2026-04-03",
  "sale-city": "2026-04-01",
  "target-city": "2026-04-02",
};

function getLandingPageAddedDate(key: LandingPageDateKey): string {
  return LANDING_PAGE_ADDED_DATES[key];
}

const ALL_CITIES: LandingPageCity[] = ALL_POLISH_CITIES;
const DEFAULT_CITY = ALL_CITIES.find((city) => city.slug === DEFAULT_CITY_SLUG);

if (!DEFAULT_CITY) {
  throw new Error(`Default city "${DEFAULT_CITY_SLUG}" was not found in the city dataset.`);
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function getDistanceBetweenCitiesKm(
  left: LandingPageCity,
  right: LandingPageCity,
): number {
  const earthRadiusKm = 6371;
  const latitudeDelta = toRadians(right.latitude - left.latitude);
  const longitudeDelta = toRadians(right.longitude - left.longitude);
  const leftLatitude = toRadians(left.latitude);
  const rightLatitude = toRadians(right.latitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(leftLatitude) *
      Math.cos(rightLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
}

function createMetadata(page: LandingPageContent): Metadata {
  const pathname = getLandingPageHref(page);
  const url = `${SITE_URL}${pathname}`;

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: page.seo.title,
      description: page.seo.description,
      siteName: "WWW Expert",
      images: [
        {
          url: `${SITE_URL}/assets/pinkdonut.png`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: page.seo.title,
      description: page.seo.description,
      images: [
        {
          url: `${SITE_URL}/assets/pinkdonut.png`,
        },
      ],
    },
  };
}

function createSlug(serviceKey: LandingPageServiceKey, citySlug: string): string {
  switch (serviceKey) {
    case "website":
      return `tworzenie-stron-internetowych-${citySlug}`;
    case "design":
      return `projektowanie-stron-www-${citySlug}`;
    case "landing":
      return `tworzenie-landing-page-${citySlug}`;
    case "store":
      return `tworzenie-sklepow-internetowych-${citySlug}`;
    case "sale":
      return `strony-internetowe-na-sprzedaz-${citySlug}`;
    case "seo":
      return `seo-${citySlug}`;
  }
}

function getCityServiceSlug(
  serviceKey: LandingPageServiceKey,
  citySlug: string,
): string | undefined {
  if (citySlug === DEFAULT_CITY_SLUG) {
    switch (serviceKey) {
      case "website":
        return undefined;
      case "landing":
        return "landing-page";
      case "store":
        return "sklepy-internetowe";
      case "seo":
        return "seo";
      default:
        return createSlug(serviceKey, citySlug);
    }
  }

  return createSlug(serviceKey, citySlug);
}

function createTargetSlug(targetSlug: string, citySlug: string): string {
  return `strona-internetowa-dla-${targetSlug}-${citySlug}`;
}

export function getCityHubHref(citySlug: string): string {
  return `/${CITY_HUB_BASE_SEGMENT}/${citySlug}`;
}

export function getServiceRouteParam(
  serviceKey: LandingPageServiceKey,
): LandingPageServiceRouteParam {
  return SERVICE_ROUTE_SEGMENTS[serviceKey];
}

export function getServiceHref(
  serviceKey: LandingPageServiceKey,
  citySlug: string,
): string {
  return `${getCityHubHref(citySlug)}/${getServiceRouteParam(serviceKey)}`;
}

export function getServiceKeyFromRouteParam(
  routeParam: string,
): LandingPageServiceKey | null {
  const matchedEntry = Object.entries(SERVICE_ROUTE_SEGMENTS).find(
    ([, segment]) => segment === routeParam,
  );

  return (matchedEntry?.[0] as LandingPageServiceKey | undefined) ?? null;
}

function getCityContext(city: LandingPageCity) {
  return {
    ...city,
    ...city.context,
    upperName: city.name.toUpperCase(),
  };
}

function createServiceLink(
  serviceKey: LandingPageServiceKey,
  city: LandingPageCity,
): LandingPageLink {
  return {
    href: getServiceHref(serviceKey, city.slug),
    label: `${SERVICE_LABELS[serviceKey]} ${city.name}`,
  };
}

function createOfferSupportingLinks(
  currentServiceKey: LandingPageServiceKey,
  city: LandingPageCity,
): LandingPageLink[] {
  const selectedKeys = ALL_SERVICE_KEYS
    .filter((serviceKey) => serviceKey !== currentServiceKey)
    .slice(0, 3);

  return selectedKeys.map((serviceKey) => createServiceLink(serviceKey, city));
}

function createCityLandingPage(
  serviceKey: LandingPageServiceKey,
  city: LandingPageCity,
  addedDate: string,
  input: CityLandingPageInput,
): LandingPageContent {
  const slug = getCityServiceSlug(serviceKey, city.slug);

  return {
    key: slug ?? `${serviceKey}:${city.slug}`,
    slug,
    serviceKey,
    citySlug: city.slug,
    cityName: city.name,
    addedDate,
    seo: input.seo,
    hero: input.hero,
    form: {
      ...DEFAULT_FORM_CONTENT,
      ...input.form,
    },
    intent: input.intent,
    portfolioHeading: input.portfolioHeading,
    contact: input.contact ?? DEFAULT_CONTACT_CONTENT,
  };
}

function createGenericLandingPage(
  serviceKey: LandingPageServiceKey,
  addedDate: string,
  input: GenericLandingPageInput,
): LandingPageContent {
  return {
    key: input.slug,
    slug: input.slug,
    serviceKey,
    addedDate,
    seo: input.seo,
    hero: input.hero,
    form: {
      ...DEFAULT_FORM_CONTENT,
      ...input.form,
    },
    intent: input.intent,
    portfolioHeading: input.portfolioHeading,
    contact: input.contact ?? DEFAULT_CONTACT_CONTENT,
  };
}

function createHomepageLandingPage(): LandingPageContent {
  return {
    key: "home",
    addedDate: getLandingPageAddedDate("home"),
    seo: {
      title: "Tworzenie stron internetowych - Paweł Wessel",
      description:
        "Projektuję i wdrażam strony internetowe, które pomagają firmom zdobywać klientów — nie tylko dobrze wyglądać.",
    },
    hero: {
      headingPrefix: "Tworzenie ",
      headingHighlight: "stron internetowych",
      headingSuffix: " - design, wdrożenie i rozwój",
      description:
        "Projektuję i wdrażam strony internetowe, które pomagają firmom zdobywać klientów — nie tylko dobrze wyglądać.",
      floatingPromptPrimary: "Masz pomysł na stronę internetową?",
      floatingPromptSecondary: "Porozmawiajmy o Twoim projekcie.",
    },
    form: DEFAULT_FORM_CONTENT,
    intent: {
      eyebrow: "Strony WWW - szybkie i solidne",
      heading: "Strony internetowe, które realnie sprzedają — nie tylko dobrze wyglądają.",
      paragraphs: [
        "Projektuję responsywne strony WWW, z nowoczesnym designem i pozycjonowaniem SEO - większa widoczność witryny i klienci z Google? Skontaktuj się.",
        
      ],
      ctaTitle: "Chcesz omówić projekt?",
      ctaDescription:
        "Przejdź do formularza i opisz, czego potrzebujesz.",
      primaryCtaLabel: "Darmowa wycena",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Landing page",
          description:
            "Strona WWW dla jednej usługi lub kampanii Google Ads.",
          highlighted: true,
          image:"/images/projects/hexon/hero.png",
          imageAlt: "Strona internetowa landing page z branży energetycznej",price:700,
        },
        {
          name: "Strona wizytówka",
          description:
            "Strona internetowa wyświetlająca ofertę w Google.",
          image:"/images/projects/kancelariadeluga/hero.webp",
          imageAlt: "Strona internetowa wizytówka kancelarii prawniczej w Grudziądzu",price:1200,
        },
        {
          name: "Strona firmowa",
          description:
            "Strona internetowa dla firmy, z pozycjonowaniem SEO.",
          image:"/images/projects/glazurnikgrudziadz/hero.png",
          imageAlt: "Strona firmowa dla glazurnika z Grudziądza",price:2000,
        },
      ],
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Nie buduję tylko estetycznych ekranów. Skupiam się na tym, żeby strona pracowała na kontakt, sprzedaż i rozwój SEO.",
      whyPoints: [
        "Projekt i treści układane pod decyzję zakupową użytkownika",
        "Wdrożenie gotowe pod dalszy rozwój podstron SEO",
        "Bezpośredni kontakt od planu po publikację",
        "Nacisk na szybkość działania, mobile i czytelne CTA",
        "Możliwość skalowania strony na kolejne miasta i usługi",
      ],
      processTitle: "Jak powstaje strona, która zdobywa klientów",
      processSteps: [
        {
          title: "Ustalenie celu i zakresu",
          description:
            "Nie zaczynam od designu — zaczynam od tego, co ma zarabiać. Ustalamy, kto jest Twoim klientem i co strona ma dla niego zrobić.",
            image:"/tworzenie-strony-internetowej/poczatek-tworzenia-strony-internetowej.png",
        },
        {
          title: "Struktura i komunikacja",
          description:
            "Układam stronę tak, żeby prowadziła użytkownika krok po kroku do kontaktu. Treści, nagłówki i sekcje mają sprzedawać — nie tylko wyglądać.",
            image:"/tworzenie-strony-internetowej/strona-internetowa-w-trakcie-tworzenia.png",
        },
        {
          title: "Wdrożenie i dopracowanie",
          description:
            "Buduję stronę, dbam o szybkość, SEO i działanie na każdym urządzeniu. Testujemy, poprawiamy i dopinamy wszystko przed publikacją.",
            image:"/tworzenie-strony-internetowej/strona-internetowa-jest-prawie-gotowa.png",
        },
        {
          title: "Rozwój i skalowanie",
          description:
            "Strona startuje, ale to dopiero początek. Możemy ją rozwijać o kolejne podstrony, SEO i nowe źródła klientów.",
            image:"/tworzenie-strony-internetowej/twoja-strona-internetowa-została-stworzona.png",
        },
      ],
      includedTitle: "Co otrzymujesz w standardzie",
      includedParagraphs: [
        "Zakres dopasowuję do projektu - od prostego landing page po rozbudowaną stronę firmową z zapleczem pod SEO lokalne.",
        "Celem jest rozwiązanie, które porządkuje ofertę i daje solidną bazę pod dalszy wzrost.",
      ],
      includedListLabel: "Najczęściej w projekcie uwzględniam:",
      includedItems: [
        "układ strony dopasowany do usługi i grupy docelowej",
        "mocne CTA do formularza, telefonu i maila",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        "responsywność na telefon, tablet i desktop",
        "przygotowanie pod dalszy rozwój city pages",
        "wdrożenie i konfigurację formularza kontaktowego",
      ],
      includedCtaLabel: "Chcę dostać wycenę",
      faqTitle: "FAQ",
      faqIntro:
        "Najczęstsze pytania od firm, które planują nową stronę lub rozwój SEO lokalnego.",
      faqItems: [
        {
          question: "Czy można zacząć od jednej strony i później ją rozbudować?",
          answer:
            "Tak. To częsty scenariusz: najpierw powstaje solidna baza, a później dokładane są kolejne usługi, miasta i sekcje wspierające widoczność.",
        },
        {
          question: "Czy pomagasz też z treściami i architekturą informacji?",
          answer:
            "Tak. Pomagam uporządkować ofertę, logikę podstron i komunikaty tak, aby całość była czytelna i bardziej sprzedażowa.",
        },
        {
          question: "Czy nowa strona może być przygotowana pod SEO lokalne?",
          answer:
            "Tak. Już na etapie planowania można przygotować nagłówki, sekcje i strukturę pod rozwój fraz lokalnych oraz podstron miejskich.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle: "Chcesz zbudować stronę, którą później łatwo skalować?",
      nextStepDescription:
        "Opisz, co sprzedajesz i na jakie miasta lub usługi chcesz się pozycjonować. Przygotuję propozycję kierunku i wycenę.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Wybrane realizacje stron internetowych",
    contact: DEFAULT_CONTACT_CONTENT,
  };
}

function createWebsiteOverviewPage(): LandingPageContent {
  return createGenericLandingPage(
    "website",
    getLandingPageAddedDate("website-overview"),
    {
    slug: "strony-internetowe",
    seo: {
      title: "Strony internetowe - tworzenie stron www dla firm",
      description:
        "Tworzę strony internetowe i strony www dla firm. Projektuję i wdrażam serwisy, które pomagają lepiej prezentować ofertę, budować zaufanie i zdobywać klientów.",
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: "STRONY INTERNETOWE",
      headingSuffix: " - NOWOCZEŚNIE, SKUTECZNIE I POD KLIENTÓW",
      description:
        "Pomagam firmom tworzyć strony internetowe i strony www, które dobrze pokazują ofertę, wzmacniają wiarygodność i prowadzą użytkownika do kontaktu.",
      floatingPromptPrimary: "Chcesz stronę internetową lub stronę www?",
      floatingPromptSecondary: "Porozmawiajmy o stronie internetowej dla Twojej firmy",
    },
    intent: {
      eyebrow: "Strony internetowe",
      heading: "Strony internetowe, które pomagają zdobywać klientów",
      paragraphs: [
        "Tworzę strony internetowe i strony www dla firm, które chcą lepiej prezentować ofertę, szybciej domykać zapytania i budować profesjonalny wizerunek w sieci.",
        "Jeśli interesuje Cię tworzenie stron www albo potrzebujesz nowej strony internetowej dla firmy, zaplanujmy rozwiązanie dopasowane do branży, budżetu i tego, jak Twoi klienci podejmują decyzję.",
      ],
      ctaTitle: "Chcesz zamówić stronę internetową?",
      ctaDescription:
        "Przejdź do formularza i opisz firmę, zakres strony oraz główny cel projektu.",
      primaryCtaLabel: "Przejdź do formularza i opisz stronę",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Landing page",
          description:
            "Dla jednej usługi lub kampanii. Szybki start i prosty układ nastawiony na kontakt.",
        },
        {
          name: "Strona firmowa",
          description:
            "Najlepsza opcja dla firm, które chcą pokazać ofertę, proces i regularnie pozyskiwać klientów z Google.",
          highlighted: true,
        },
        {
          name: "Rozbudowany serwis",
          description:
            "Dla firm, które potrzebują większej liczby podstron, bloga, rozwoju etapami lub zaplecza pod SEO.",
        },
      ],
      whyTitle: "Dlaczego warto zlecić mi wykonanie strony internetowej",
      whyIntro:
        "Dobra strona internetowa powinna nie tylko dobrze wyglądać, ale przede wszystkim ułatwiać klientowi zrozumienie oferty i wykonanie następnego kroku.",
      whyPoints: [
        "Projekt dopasowany do branży, oferty i celu strony",
        "Układ i treści prowadzące użytkownika do kontaktu",
        "Połączenie estetyki, użyteczności i SEO",
        "Responsywność i szybkość działania od początku wdrożenia",
        "Bezpośredni kontakt od pomysłu po publikację",
      ],
      processTitle: "Jak wygląda tworzenie strony internetowej",
      processSteps: [
        {
          title: "1. Rozmowa i wycena",
          description:
            "Ustalamy cel strony, zakres projektu i najlepszy kierunek dla Twojej firmy.",
        },
        {
          title: "2. Struktura i komunikacja",
          description:
            "Przygotowuję układ sekcji, hierarchię treści i sposób prezentacji oferty.",
        },
        {
          title: "3. Wdrożenie i poprawki",
          description:
            "Tworzę stronę, konfiguruję formularze i dopracowuję detale potrzebne do startu.",
        },
        {
          title: "4. Publikacja i rozwój",
          description:
            "Po uruchomieniu strony możesz rozwijać kolejne podstrony, treści i działania SEO.",
        },
      ],
      includedTitle: "Co otrzymujesz w ramach strony internetowej",
      includedParagraphs: [
        "Zakres dopasowuję do tego, czy potrzebujesz prostego landing page, klasycznej strony firmowej czy bardziej rozbudowanego serwisu.",
        "Celem jest strona internetowa, która porządkuje ofertę, wspiera sprzedaż i buduje zaufanie.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt dopasowany do marki, oferty i odbiorcy",
        "pełną responsywność na telefon, tablet i desktop",
        "mocne CTA do formularza, telefonu i maila",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        "podstawy SEO i przygotowanie do dalszego rozwoju",
        "konfigurację formularza kontaktowego",
      ],
      includedCtaLabel: "Chcę dostać wycenę strony internetowej",
      faqTitle: "FAQ o stronach internetowych",
      faqIntro:
        "Najczęstsze pytania od firm, które planują nową stronę internetową.",
      faqItems: [
        {
          question: "Ile kosztuje strona internetowa?",
          answer:
            "Cena zależy od zakresu: liczby sekcji, podstron, funkcji i ilości treści. Najczęściej najlepszym rozwiązaniem jest strona firmowa z ofertą, procesem, FAQ i wyraźnym kontaktem.",
          relatedLinks: [
            { href: "/landing-page", label: "Landing page" },
            { href: "/sklepy-internetowe", label: "Sklepy internetowe" },
            { href: "/projektowanie-stron-www", label: "Projektowanie stron www" },
          ],
        },
        {
          question: "Jak długo trwa realizacja strony internetowej?",
          answer:
            "Proste projekty można wdrożyć szybciej, a bardziej rozbudowane realizowane są etapami. Dokładny termin ustalam po krótkiej rozmowie.",
        },
        {
          question: "Czy pomagasz z treściami i układem strony?",
          answer:
            "Tak. Pomagam uporządkować ofertę, zaplanować strukturę i przygotować komunikaty, które lepiej sprzedają.",
          relatedLinks: [
            { href: "/projektowanie-stron-www", label: "Projektowanie stron www" },
            { href: "/landing-page", label: "Landing page" },
          ],
        },
        {
          question: "Czy strona może wspierać SEO?",
          answer:
            "Tak. Dobrze zaplanowana strona może wspierać frazy usługowe, budować widoczność i ułatwiać rozwój kolejnych podstron SEO.",
          relatedLinks: [
            { href: "/pozycjonowanie-stron-internetowych", label: "Pozycjonowanie stron internetowych" },
            { href: "/landing-page", label: "Landing page" },
          ],
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle: "Chcesz stronę internetową, która będzie pracować na klientów?",
      nextStepDescription:
        "Opisz, czym zajmuje się Twoja firma i czego oczekujesz od strony. Wrócę z propozycją rozwiązania oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Realizacje stron internetowych dla firm",
    contact: {
      title: "Chcesz nową stronę internetową?",
      subtitle:
        "Opisz firmę i zakres strony, a przygotuję propozycję rozwiązania",
      imageAlt: "Strona internetowa dla firmy",
    },
    },
  );
}

function createWebDesignOverviewPage(): LandingPageContent {
  return createGenericLandingPage(
    "design",
    getLandingPageAddedDate("design-overview"),
    {
    slug: "projektowanie-stron-www",
    seo: {
      title: "Projektowanie stron www - UX, redesign i identyfikacja",
      description:
        "Projektowanie stron www z naciskiem na UX, architekturę informacji, redesign, branding i kierunek wizualny dla firm.",
    },
    hero: {
      headingPrefix: "PROJEKTUJĘ ",
      headingHighlight: "STRONY WWW",
      headingSuffix: " - UX, REDESIGN I SPÓJNA IDENTYFIKACJA",
      description:
        "Pomagam firmom uporządkować UX, strukturę treści i warstwę wizualną strony tak, aby marka wyglądała spójniej i była łatwiejsza w odbiorze.",
      floatingPromptPrimary: "Chcesz odświeżyć design strony lub marki?",
      floatingPromptSecondary: "Porozmawiajmy o projekcie UX i redesignie",
    },
    form: {
      requirementsPlaceholder:
        "Opisz obecną stronę, problemy UX, styl wizualny, potrzebę redesignu lub zakres brandingu...",
    },
    intent: {
      eyebrow: "Projektowanie stron www",
      heading: "Projektowanie stron www, które poprawia UX, komunikację i odbiór marki",
      paragraphs: [
        "Projektuję strony www dla firm, które chcą poprawić doświadczenie użytkownika, uporządkować architekturę informacji i nadać marce bardziej dopracowany kierunek wizualny.",
        "Jeśli interesuje Cię projektowanie strony www, redesign istniejącego serwisu albo odświeżenie identyfikacji, zacznijmy od analizy układu, treści i problemów UX.",
      ],
      ctaTitle: "Chcesz zaprojektować stronę www?",
      ctaDescription:
        "Przejdź do formularza i opisz obecną stronę, problemy UX, kierunek wizualny oraz zakres redesignu.",
      primaryCtaLabel: "Przejdź do formularza i opisz projekt",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Redesign strony",
          description:
            "Dla firm, które mają już stronę, ale chcą poprawić układ, czytelność, hierarchię treści i odbiór marki.",
        },
        {
          name: "Projekt UX/UI strony firmowej",
          description:
            "Najlepsza opcja dla firm, które chcą przemyśleć ścieżkę użytkownika, sekcje, komunikację i wygląd serwisu przed wdrożeniem.",
          highlighted: true,
        },
        {
          name: "Branding i kierunek wizualny",
          description:
            "Dla firm, które poza projektem strony chcą uporządkować identyfikację, styl komunikacji lub bazę pod logo i materiały wizualne.",
        },
      ],
      whyTitle: "Dlaczego warto zlecić mi projektowanie strony www",
      whyIntro:
        "Dobry design strony www to nie tylko estetyka. To przede wszystkim lepszy UX, czytelna hierarchia treści i spójny odbiór marki na każdym ekranie.",
      whyPoints: [
        "Analiza problemów UX i miejsc, w których użytkownik gubi się na stronie",
        "Przemyślana hierarchia sekcji, nagłówków i komunikatów",
        "Design dopasowany do marki, oferty i sposobu podejmowania decyzji przez klienta",
        "Redesign oparty na czytelności, zaufaniu i spójności wizualnej",
        "Możliwość połączenia projektu strony z brandingiem lub odświeżeniem identyfikacji",
      ],
      processTitle: "Jak wygląda projektowanie strony www i redesign",
      processSteps: [
        {
          title: "1. Audyt obecnej strony lub brief nowego projektu",
          description:
            "Sprawdzam, co dziś nie działa: układ, kolejność informacji, wizualna spójność i to, jak użytkownik porusza się po stronie.",
        },
        {
          title: "2. Architektura informacji i UX",
          description:
            "Układam strukturę sekcji, priorytety treści, ścieżkę użytkownika i sposób prezentacji oferty.",
        },
        {
          title: "3. Kierunek wizualny i projekt interfejsu",
          description:
            "Przygotowuję warstwę wizualną strony, dobór komponentów, styl komunikacji i założenia dla responsywnych widoków.",
        },
        {
          title: "4. Przekazanie do wdrożenia i rozwój marki",
          description:
            "Po projekcie wiadomo, jak wdrożyć stronę i jak dalej rozwijać branding, logo, kolejne podstrony lub redesign innych widoków.",
        },
      ],
      includedTitle: "Co otrzymujesz w ramach projektu strony www",
      includedParagraphs: [
        "Zakres dopasowuję do projektu - od redesignu jednej strony po pełny projekt UX/UI strony firmowej z kierunkiem wizualnym marki.",
        "Celem jest nie tylko estetyczny efekt, ale też uporządkowanie doświadczenia użytkownika, komunikacji i wizualnej spójności.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "analizę obecnego układu i najważniejszych problemów UX",
        "czytelną strukturę sekcji, nagłówków i komunikatów",
        "projekt dopasowany do marki, odbiorcy i celu strony",
        "założenia responsywne na telefon, tablet i desktop",
        "kierunek wizualny wspierający zaufanie i czytelność",
        "bazę pod redesign, branding lub dalsze wdrożenie strony",
      ],
      includedCtaLabel: "Chcę dostać wycenę projektu",
      faqTitle: "FAQ o projektowaniu stron www",
      faqIntro:
        "Najczęstsze pytania od firm, które planują projektowanie strony www.",
      faqItems: [
        {
          question: "Czym różni się projektowanie strony od samego wdrożenia?",
          answer:
            "Projektowanie skupia się na UX, architekturze informacji, wyglądzie, hierarchii treści i odbiorze marki. Wdrożenie to dopiero późniejsze przełożenie tego na działającą stronę.",
        },
        {
          question: "Czy pomagasz przy redesignie istniejącej strony?",
          answer:
            "Tak. Mogę przeanalizować obecną stronę, wskazać problemy UX i zaproponować nowy układ sekcji, nagłówków oraz komunikacji.",
          relatedLinks: [
            { href: "/strony-internetowe", label: "Strony internetowe" },
            { href: "/landing-page", label: "Landing page" },
          ],
        },
        {
          question: "Czy projekt będzie dopasowany do urządzeń mobilnych?",
          answer:
            "Tak. Już na etapie projektowania uwzględniam responsywność i to, jak użytkownik korzysta ze strony na telefonie.",
        },
        {
          question: "Czy w ramach projektu pomagasz też z brandingiem albo logo?",
          answer:
            "Tak, jeśli tego potrzebujesz. Mogę pomóc uporządkować kierunek wizualny marki, styl komunikacji i bazę pod identyfikację lub dalsze prace nad logo.",
          relatedLinks: [
            { href: "/strony-internetowe", label: "Strony internetowe" },
            { href: "/strony-internetowe-na-sprzedaz", label: "Strony internetowe na sprzedaż" },
          ],
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz uporządkować UX, redesign lub kierunek wizualny swojej strony?",
      nextStepDescription:
        "Opisz obecną stronę, problemy z komunikacją albo potrzebę redesignu. Wrócę z propozycją kierunku i wyceną projektu.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Projekty UX, redesigny i kierunki wizualne stron dla firm",
    contact: {
      title: "Chcesz poprawić design, UX albo branding strony?",
      subtitle:
        "Opisz obecną stronę lub zakres redesignu, a przygotuję kierunek i wycenę",
      imageAlt: "Projekt UX i redesign strony www",
    },
    },
  );
}

function createLandingPageOverviewPage(): LandingPageContent {
  return createGenericLandingPage(
    "landing",
    getLandingPageAddedDate("landing-overview"),
    {
    slug: "landing-page",
    seo: {
      title: "Landing page - strony sprzedażowe pod kampanie i leady",
      description:
        "Tworzę landing page dla firm. Strony pod kampanie, usługi i reklamy, zaprojektowane tak, by zwiększać liczbę zapytań i kontaktów.",
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: "LANDING PAGE",
      headingSuffix: " - POD LEADY, REKLAMY I KONKRETNĄ OFERTĘ",
      description:
        "Projektuję landing page dla firm, które chcą szybko przetestować ofertę, wesprzeć kampanię i kierować użytkownika do jednego celu.",
      floatingPromptPrimary: "Chcesz uruchomić skuteczny landing page?",
      floatingPromptSecondary: "Porozmawiajmy o landing page pod kampanię",
    },
    form: {
      requirementsPlaceholder:
        "Opisz ofertę, kampanię, grupę docelową i główny cel landing page...",
    },
    intent: {
      eyebrow: "Landing page",
      heading: "Landing page, który skupia uwagę i zwiększa liczbę zapytań",
      paragraphs: [
        "Tworzę landing page dla firm, które chcą promować konkretną usługę, kampanię lub ofertę bez rozpraszania użytkownika zbędnymi sekcjami.",
        "Jeśli interesuje Cię landing page, zaprojektujmy stronę, która prowadzi klienta do jednego celu: telefonu, formularza albo zapytania.",
      ],
      ctaTitle: "Chcesz zamówić landing page?",
      ctaDescription:
        "Przejdź do formularza i opisz ofertę, reklamę albo usługę, którą chcesz promować.",
      primaryCtaLabel: "Przejdź do formularza i opisz landing page",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Landing page pod usługę",
          description:
            "Dla jednej usługi, gdy liczy się prosty układ, szybki kontakt i wysoka czytelność oferty.",
          highlighted: true,
        },
        {
          name: "Landing page pod kampanię",
          description:
            "Dla działań reklamowych, promocji lub okresowych akcji, gdzie liczy się szybki start i dobra konwersja.",
        },
        {
          name: "Landing page rozwijany etapami",
          description:
            "Dla firm, które chcą zacząć od jednej strony i z czasem rozbudować ją o kolejne warianty lub sekcje.",
        },
      ],
      whyTitle: "Dlaczego warto zlecić mi stworzenie landing page",
      whyIntro:
        "Dobry landing page nie ma być rozbudowany. Ma być prosty, czytelny i skupiony na jednym działaniu użytkownika.",
      whyPoints: [
        "Skupienie całego układu na jednym celu konwersji",
        "Sekcje, które prowadzą od problemu do kontaktu",
        "Mocne CTA i uproszczona ścieżka użytkownika",
        "Dopasowanie strony do reklamy, usługi lub konkretnej oferty",
        "Szybkie wdrożenie bez zbędnej rozbudowy",
      ],
      processTitle: "Jak wygląda tworzenie landing page",
      processSteps: [
        {
          title: "1. Ustalenie celu landing page",
          description:
            "Definiujemy, czy najważniejszy ma być telefon, formularz, lead czy zapis.",
        },
        {
          title: "2. Układ treści i argumentów",
          description:
            "Przygotowuję strukturę sekcji, argumenty sprzedażowe i sposób prowadzenia użytkownika.",
        },
        {
          title: "3. Wdrożenie i konfiguracja",
          description:
            "Tworzę landing page, dbam o responsywność i podpinam formularz lub inne elementy kontaktowe.",
        },
        {
          title: "4. Publikacja i dalsze testy",
          description:
            "Po uruchomieniu strony możesz dalej rozwijać kolejne warianty kampanii lub ofert.",
        },
      ],
      includedTitle: "Co otrzymujesz w ramach landing page",
      includedParagraphs: [
        "Zakres dopasowuję do celu strony - od prostego landing page pod jedną usługę po bardziej rozbudowaną stronę kampanijną.",
        "Najważniejsze jest to, żeby landing page był szybki, konkretny i skuteczny sprzedażowo.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt landing page pod jedną ofertę lub kampanię",
        "układ skoncentrowany na konwersji",
        "pełną responsywność na telefon i desktop",
        "sekcje sprzedażowe, argumenty i FAQ",
        "mocne CTA do formularza, telefonu lub maila",
        "konfigurację formularza kontaktowego i przygotowanie do publikacji",
      ],
      includedCtaLabel: "Chcę dostać wycenę landing page",
      faqTitle: "FAQ o landing page",
      faqIntro:
        "Najczęstsze pytania od firm, które planują landing page.",
      faqItems: [
        {
          question: "Dla kogo landing page będzie najlepszym rozwiązaniem?",
          answer:
            "Dla firm, które promują jedną usługę, ofertę lub kampanię i chcą skupić użytkownika na jednym celu działania.",
        },
        {
          question: "Czy landing page nadaje się pod reklamy?",
          answer:
            "Tak. To jedno z najlepszych zastosowań, bo landing page można zaprojektować dokładnie pod konkretny komunikat reklamowy.",
        },
        {
          question: "Czy landing page może zastąpić stronę firmową?",
          answer:
            "Czasem tak, jeśli na start chcesz promować jedną usługę. Przy większej ofercie zwykle lepsza będzie pełna strona firmowa.",
          relatedLinks: [
            { href: "/strony-internetowe", label: "Strony internetowe" },
            { href: "/projektowanie-stron-www", label: "Projektowanie stron www" },
          ],
        },
        {
          question: "Jak szybko można wdrożyć landing page?",
          answer:
            "Zwykle szybciej niż rozbudowaną stronę, bo zakres jest mniejszy i skupiony na jednej ofercie.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz landing page, który będzie wspierał konkretną usługę lub kampanię?",
      nextStepDescription:
        "Opisz, co chcesz promować i jaki ma być cel strony. Wrócę z propozycją układu oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Realizacje landing page i stron sprzedażowych",
    contact: {
      title: "Chcesz landing page dla swojej oferty?",
      subtitle: "Opisz ofertę lub kampanię, a przygotuję propozycję strony",
      imageAlt: "Landing page dla firmy",
    },
    },
  );
}

function createStoreOverviewPage(): LandingPageContent {
  return createGenericLandingPage(
    "store",
    getLandingPageAddedDate("store-overview"),
    {
    slug: "sklepy-internetowe",
    seo: {
      title: "Sklepy internetowe - projekt i wdrożenie ecommerce",
      description:
        "Tworzę sklepy internetowe dla firm. Projektuję sprzedaż online, wdrażam koszyk, płatności i układ nastawiony na konwersję.",
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: "SKLEPY INTERNETOWE",
      headingSuffix: " - SPRZEDAWAJ WYGODNIEJ ONLINE",
      description:
        "Projektuję sklepy internetowe dla firm, które chcą sprzedawać online w uporządkowany, szybki i wygodny sposób.",
      floatingPromptPrimary: "Chcesz uruchomić sklep internetowy?",
      floatingPromptSecondary: "Porozmawiajmy o Twojej sprzedaży online",
    },
    form: {
      requirementsPlaceholder:
        "Opisz asortyment, sposób sprzedaży, integracje i cele sklepu internetowego...",
    },
    intent: {
      eyebrow: "Sklepy internetowe",
      heading: "Sklepy internetowe, które pomagają sprzedawać",
      paragraphs: [
        "Tworzę sklepy internetowe dla firm, które chcą zacząć sprzedawać online albo uporządkować obecny proces zakupowy.",
        "Jeśli interesuje Cię sklep internetowy dopasowany do Twojej oferty, zaplanujmy wdrożenie tak, aby był wygodny dla klientów i prosty w obsłudze po Twojej stronie.",
      ],
      ctaTitle: "Chcesz uruchomić sklep internetowy?",
      ctaDescription:
        "Przejdź do formularza i opisz asortyment, model sprzedaży i oczekiwane funkcje.",
      primaryCtaLabel: "Przejdź do formularza i opisz sklep",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Sklep start",
          description:
            "Dla mniejszej oferty i szybkiego wejścia w ecommerce. Najważniejsze funkcje gotowe do startu.",
        },
        {
          name: "Sklep firmowy",
          description:
            "Najlepsza opcja dla firm, które chcą połączyć sprzedaż online z czytelną prezentacją marki i oferty.",
          highlighted: true,
        },
        {
          name: "Rozbudowany ecommerce",
          description:
            "Dla firm, które potrzebują większej liczby kategorii, integracji, automatyzacji lub rozwoju etapami.",
        },
      ],
      whyTitle: "Dlaczego warto ze mną współpracować przy sklepie internetowym",
      whyIntro:
        "Sklep internetowy ma nie tylko wyglądać dobrze, ale przede wszystkim upraszczać zakup i zwiększać sprzedaż.",
      whyPoints: [
        "Układ sklepu projektowany pod konwersję i wygodę zakupów",
        "Jasna prezentacja oferty, kategorii i kart produktów",
        "Wsparcie przy wyborze funkcji, integracji i sposobu wdrożenia",
        "Dbałość o szybkość działania oraz doświadczenie na telefonie",
        "Bezpośredni kontakt od planu sklepu po publikację",
      ],
      processTitle: "Jak powstaje strona, która zdobywa klientów",
      processSteps: [
        {
          title: "1. Analiza sprzedaży i zakresu",
          description:
            "Ustalamy, co sprzedajesz, jak wygląda proces zamówienia i jakie funkcje są potrzebne na start.",
        },
        {
          title: "2. Struktura sklepu i makieta",
          description:
            "Planowanie kategorii, produktu, koszyka oraz sekcji, które mają wspierać decyzję zakupową.",
        },
        {
          title: "3. Wdrożenie i konfiguracja",
          description:
            "Tworzę sklep, konfiguruję formularze, podstawowe elementy sprzedaży i niezbędne poprawki.",
        },
        {
          title: "4. Publikacja i rozwój",
          description:
            "Po starcie sklep jest gotowy do działania, a Ty możesz rozwijać go etapami wraz ze wzrostem oferty.",
        },
      ],
      includedTitle: "Co otrzymujesz w cenie",
      includedParagraphs: [
        "Zakres dopasowuję do projektu - od prostego sklepu startowego po bardziej rozbudowany ecommerce.",
        "Celem jest sklep internetowy, który porządkuje sprzedaż i ułatwia klientowi zakup.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt sklepu dopasowany do oferty i grupy docelowej",
        "pełną responsywność na telefon, tablet i desktop",
        "układ wspierający zakup oraz kontakt",
        "sekcje sprzedażowe, FAQ i argumenty zakupowe",
        "przygotowanie pod dalszy rozwój i kolejne etapy",
        "konfigurację formularza kontaktowego",
        "przygotowanie sklepu do publikacji",
      ],
      includedCtaLabel: "Chcę dostać wycenę sklepu",
      faqTitle: "FAQ o sklepach internetowych",
      faqIntro:
        "Najczęstsze pytania od firm, które planują uruchomić sklep internetowy.",
      faqItems: [
        {
          question: "Ile kosztuje sklep internetowy?",
          answer:
            "Cena zależy od liczby produktów, widoków, integracji i poziomu rozbudowania. Zakres ustalam po krótkiej rozmowie o ofercie i modelu sprzedaży.",
        },
        {
          question: "Czy pomagasz zaplanować strukturę sklepu?",
          answer:
            "Tak. Pomagam uporządkować kategorie, strukturę sklepu, najważniejsze sekcje i ścieżkę zakupową.",
          relatedLinks: [
            { href: "/projektowanie-stron-www", label: "Projektowanie stron www" },
            { href: "/landing-page", label: "Landing page" },
          ],
        },
        {
          question: "Czy sklep będzie działał dobrze na telefonie?",
          answer:
            "Tak. Każdy sklep projektuję z myślą o użytkownikach mobilnych, bo to oni często stanowią dużą część ruchu.",
        },
        {
          question: "Czy sklep można później rozwijać?",
          answer:
            "Tak. System jest przygotowany tak, aby można było etapami dodawać kolejne funkcje, sekcje i integracje.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz uruchomić sklep internetowy bez chaotycznego wdrożenia?",
      nextStepDescription:
        "Opisz, co sprzedajesz i czego potrzebujesz. Wrócę z propozycją rozwiązania oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Wybrane realizacje i wdrożenia ecommerce",
    contact: {
      title: "Chcesz uruchomić sklep internetowy?",
      subtitle: "Zamów wycenę, wypełniając formularz poniżej",
      imageAlt: "Sklep internetowy",
    },
    },
  );
}

function createSeoOverviewPage(): LandingPageContent {
  return createGenericLandingPage(
    "seo",
    getLandingPageAddedDate("seo-overview"),
    {
    slug: "pozycjonowanie-stron-internetowych",
    seo: {
      title: "Pozycjonowanie stron internetowych - SEO lokalne dla firm",
      description:
        "Pomagam lokalnym firmom zwiększać widoczność w Google. Pozycjonowanie stron internetowych z naciskiem na audyt SEO, lokalne frazy, content i strukturę informacji.",
    },
    hero: {
      headingPrefix: "PROWADZĘ ",
      headingHighlight: "POZYCJONOWANIE STRON INTERNETOWYCH",
      headingSuffix: " - ZWIĘKSZ WIDOCZNOŚĆ W GOOGLE",
      description:
        "Pomagam firmom poprawić widoczność w Google, uporządkować treści i lepiej odpowiadać na realne zapytania klientów.",
      floatingPromptPrimary: "Chcesz pozycjonować stronę lokalnie?",
      floatingPromptSecondary: "Porozmawiajmy o SEO dla Twojej firmy",
    },
    form: {
      requirementsPlaceholder:
        "Opisz branżę, obecną stronę i cele pozycjonowania lokalnego...",
    },
    intent: {
      eyebrow: "Pozycjonowanie stron internetowych",
      heading: "Pozycjonowanie stron internetowych, które wspiera pozyskiwanie klientów",
      paragraphs: [
        "Pomagam firmom zwiększać widoczność strony na lokalne frazy oraz lepiej odpowiadać na realne intencje użytkowników.",
        "Jeśli interesuje Cię pozycjonowanie strony internetowej, zacznijmy od audytu SEO, analizy treści, struktury nagłówków i miejsc, w których tracisz widoczność lub zapytania.",
      ],
      ctaTitle: "Chcesz zwiększyć widoczność strony?",
      ctaDescription:
        "Przejdź do formularza i opisz obecną stronę, branżę oraz cele SEO.",
      primaryCtaLabel: "Przejdź do formularza i opisz stronę",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Audyt SEO",
          description:
            "Dla firm, które chcą zrozumieć, co blokuje widoczność strony i od czego zacząć poprawę.",
        },
        {
          name: "SEO lokalne",
          description:
            "Najlepsza opcja dla firm, które chcą być częściej znajdowane przez klientów w Google.",
          highlighted: true,
        },
        {
          name: "Stałe rozwijanie treści",
          description:
            "Dla firm, które chcą etapowo rozbudowywać widoczność strony, sekcje ofertowe i long-tail.",
        },
      ],
      whyTitle: "Dlaczego warto zlecić mi pozycjonowanie strony",
      whyIntro:
        "SEO lokalne nie polega tylko na dodaniu kilku słów kluczowych. Liczy się struktura, treść i intencja użytkownika.",
      whyPoints: [
        "Skupienie na frazach lokalnych, audycie SEO i intencjach zakupowych",
        "Poprawa układu treści, nagłówków i struktury informacji",
        "Praca nad widocznością, a nie nad przypadkowym dokładaniem treści",
        "Jasne rekomendacje dotyczące contentu, on-page i priorytetów SEO",
        "Bezpośredni kontakt i konkretne priorytety wdrożeniowe",
      ],
      processTitle: "Jak wygląda pozycjonowanie strony",
      processSteps: [
        {
          title: "1. Audyt SEO i analiza fraz",
          description:
            "Sprawdzam obecną widoczność, lokalne frazy, strukturę treści, nagłówki i elementy, które blokują wzrost.",
        },
        {
          title: "2. Plan zmian contentowych i on-page",
          description:
            "Układam priorytety: co poprawić najpierw w treści, strukturze informacji, sekcjach i lokalnych sygnałach SEO.",
        },
        {
          title: "3. Wdrożenie rekomendacji SEO",
          description:
            "Wprowadzam lub rozpisuję zmiany w treści, nagłówkach, sekcjach i stronach, które wspierają widoczność oraz jakość ruchu.",
        },
        {
          title: "4. Monitoring i dalszy rozwój",
          description:
            "Ustalamy kolejne kroki: rozwój contentu, dalszą optymalizację lokalnych fraz i porządkowanie architektury strony.",
        },
      ],
      includedTitle: "Co otrzymujesz w ramach pozycjonowania",
      includedParagraphs: [
        "Zakres dopasowuję do tego, czy potrzebujesz szybkiego audytu SEO, lokalnego SEO czy dalszego rozwoju treści i struktury strony.",
        "Celem jest lepsza widoczność strony na frazy lokalne, mocniejsza zgodność z intencją użytkownika i większa liczba wartościowych zapytań.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "audyt obecnej strony i lokalnych fraz",
        "rekomendacje dotyczące struktury nagłówków, sekcji i linkowania",
        "propozycje treści wspierających SEO lokalne i long-tail",
        "wskazanie najważniejszych priorytetów contentowych i on-page",
        "lepsze dopasowanie strony do intencji użytkownika",
        "plan dalszego rozwoju widoczności",
      ],
      includedCtaLabel: "Chcę dostać wycenę SEO",
      faqTitle: "FAQ o pozycjonowaniu stron",
      faqIntro:
        "Najczęstsze pytania od firm, które planują pozycjonowanie strony internetowej.",
      faqItems: [
        {
          question: "Czy pozycjonowanie lokalne ma sens dla małej firmy?",
          answer:
            "Tak. Dla lokalnych usług i firm często to właśnie frazy lokalne dają najbardziej wartościowy ruch i realne zapytania od klientów.",
        },
        {
          question: "Od czego zaczyna się współpraca SEO?",
          answer:
            "Zaczynam od audytu SEO: sprawdzenia strony, treści, struktury informacji, lokalnych fraz i najsłabszych miejsc, które dziś ograniczają widoczność.",
        },
        {
          question: "Czy trzeba przebudować całą stronę?",
          answer:
            "Nie zawsze. Czasem wystarczą poprawki treści, nagłówków, linkowania i architektury informacji, a czasem potrzebna jest głębsza przebudowa wybranych sekcji.",
        },
        {
          question: "Na czym skupiasz się przy SEO lokalnym?",
          answer:
            "Na lokalnych frazach, widoczności w Google, strukturze treści, architekturze informacji, nagłówkach i stronach, które realnie odpowiadają na intencję użytkownika.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz poprawić widoczność strony bez przypadkowych działań?",
      nextStepDescription:
        "Opisz swoją branżę, obecną stronę i cele. Wrócę z propozycją sensownego kierunku oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Audyty, treści i strony wspierające SEO lokalne",
    contact: {
      title: "Chcesz poprawić widoczność strony w Google?",
      subtitle:
        "Opisz obecną stronę, problemy z widocznością i cele SEO, a przygotuję kierunek działań",
      imageAlt: "Pozycjonowanie strony internetowej",
    },
    },
  );
}

function createWebsitePage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);
  const isDefaultCity = city.slug === DEFAULT_CITY_SLUG;

  return createCityLandingPage(
    "website",
    city,
    getLandingPageAddedDate("website-city"),
    {
    seo: {
      title: isDefaultCity
        ? "WWW Expert Grudziądz - Tworzenie Stron WWW"
        : `WWW Expert ${city.name} - Tworzenie stron WWW`,
      description: isDefaultCity
        ? "Tworzę strony WWW w Grudziądzu dla firm. Projekt, wdrożenie i SEO lokalne."
        : `Tworzę strony internetowe dla firm ${c.fromGenitive}, które są czytelne, szybkie i gotowe na nowych klientów.`,
    },
    hero: {
      headingPrefix: "Tworzenie ",
      headingHighlight: `stron WWW ${c.inLocative}`,
      headingSuffix: " - Cennik Stron WWW Expert",
      description: isDefaultCity ? `Zobacz mój cennik z ofertą stron WWW Grudziądz, które są szybkie i pomagają zdobywać klientów` : `Zobacz mój cennik stron WWW ${city.name}, które są szybkie i pomagają zdobywać klientów.`,
      floatingPromptPrimary: `Potrzebujesz strony WWW ${c.inLocative}?`,
      floatingPromptSecondary: `Napisz, czego potrzebujesz ${c.inLocative}.`,
    },
    intent: {
      eyebrow: `Strony WWW ${city.name}`,
      heading: `Strony internetowe ${c.inLocative}, które są czytelne, szybkie i gotowe na klientów.`,
      paragraphs: [
        `Tworzę strony WWW dla firm ${c.fromGenitive}. Bez lania wody: dobra struktura, nowoczesny wygląd i SEO lokalne.`,
      ],
      ctaTitle: "Chcesz zamówić stronę WWW?",
      ctaDescription:
        "Napisz krótko, czego potrzebujesz.",
      primaryCtaLabel: "Darmowa wycena",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Prosta strona WWW",
          description:
            "Jedna usługa, jedna oferta i mocne CTA.",
          image: "/images/projects/hexon/hero.png",
          imageAlt: "Landing page dla jednej usługi z wyraźnym CTA i sekcją hero",
          price: 700,
        },
        {
          name: "Wizytówka WWW",
          description:
            "Prosta strona firmy widoczna w Google.",
          highlighted: true,
          image: "/images/projects/kancelariadeluga/hero.webp",
          imageAlt: "Strona internetowa wizytówka kancelarii prawniczej w Grudziądzu",
          price: 1200,
        },
        {
          name: "Strona WWW Firmowa",
          description:
            "Większa strona firmy z miejscem na SEO.",
          image: "/images/projects/glazurnikgrudziadz/hero.png",
          imageAlt: "Strona firmowa dla glazurnika z Grudziądza",
          price: 2000,
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("website", city),
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Stawiam na stronę, która wygląda dobrze i ma ułatwiać kontakt.",
      whyPoints: [
        "Projekt i treści układane pod decyzję zakupową użytkownika",
        "Wdrożenie gotowe pod dalszy rozwój podstron SEO",
        "Bezpośredni kontakt od planu po publikację",
        "Nacisk na szybkość działania, mobile i czytelne CTA",
        "Możliwość skalowania strony na kolejne miasta i usługi",
      ],
      processTitle: "Jak wygląda praca nad stroną",
      processSteps: [
        {
          title: "Ustalenie celu i zakresu",
          description:
            "Najpierw ustalamy, dla kogo jest strona i co ma załatwiać.",
          image:
            "/tworzenie-strony-internetowej/poczatek-tworzenia-strony-internetowej.png",
          imageAlt:
            "Pierwszy etap tworzenia strony internetowej: rozmowa o celu i zakresie projektu",
        },
        {
          title: "Struktura i komunikacja",
          description:
            "Układam treści i sekcje tak, żeby wszystko było jasne i prowadziło do kontaktu.",
          image:
            "/tworzenie-strony-internetowej/strona-internetowa-w-trakcie-tworzenia.png",
          imageAlt:
            "Drugi etap tworzenia strony internetowej: projektowanie struktury i komunikacji",
        },
        {
          title: "Wdrożenie i dopracowanie",
          description:
            "Buduję stronę, dbam o szybkość i SEO, a przed publikacją wszystko testuję.",
          image:
            "/tworzenie-strony-internetowej/strona-internetowa-jest-prawie-gotowa.png",
          imageAlt:
            "Trzeci etap tworzenia strony internetowej: wdrożenie i dopracowanie szczegółów",
        },
        {
          title: "Rozwój i skalowanie",
          description:
            "Po starcie można rozwijać stronę o kolejne podstrony, usługi i SEO.",
          image:
            "/tworzenie-strony-internetowej/twoja-strona-internetowa-została-stworzona.png",
          imageAlt:
            "Czwarty etap tworzenia strony internetowej: publikacja i dalszy rozwój serwisu",
        },
      ],
      includedTitle: "Co otrzymujesz w standardzie",
      includedParagraphs: [
        "Zakres dopasowuję do projektu — od prostego landing page po rozbudowaną stronę firmową z zapleczem pod SEO lokalne.",
        `Celem jest rozwiązanie dla firmy ${c.fromGenitive}, które porządkuje ofertę i daje solidną bazę pod dalszy wzrost.`,
      ],
      includedListLabel: "Najczęściej w projekcie uwzględniam:",
      includedItems: [
        "układ strony dopasowany do usługi i grupy docelowej",
        "mocne CTA do formularza, telefonu i maila",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        "responsywność na telefon, tablet i desktop",
        `przygotowanie pod dalszy rozwój fraz lokalnych związanych z ${city.name}`,
        "wdrożenie i konfigurację formularza kontaktowego",
      ],
      includedCtaLabel: "Chcę dostać wycenę",
      faqTitle: "FAQ",
      faqIntro:
        "Najczęstsze pytania od firm, które planują nową stronę lub rozwój SEO lokalnego.",
      faqItems: [
        {
          question: "Czy można zacząć od jednej strony i później ją rozbudować?",
          answer:
            "Tak. To częsty scenariusz: najpierw powstaje solidna baza, a później dokładane są kolejne usługi, miasta i sekcje wspierające widoczność.",
          relatedLinks: [
            createServiceLink("landing", city),
            createServiceLink("store", city),
            createServiceLink("seo", city),
          ],
        },
        {
          question: "Czy pomagasz też z treściami i architekturą informacji?",
          answer:
            "Tak. Pomagam uporządkować ofertę, logikę podstron i komunikaty tak, aby całość była czytelna i bardziej sprzedażowa.",
        },
        {
          question: `Czy nowa strona może być przygotowana pod SEO lokalne ${c.inLocative}?`,
          answer:
            "Tak. Już na etapie planowania można przygotować nagłówki, sekcje i strukturę pod rozwój fraz lokalnych oraz podstron miejskich.",
          relatedLinks: [
            createServiceLink("seo", city),
            createServiceLink("landing", city),
          ],
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz prostą i skuteczną stronę?",
      nextStepDescription:
        `Napisz, czym zajmuje się Twoja firma i na jakich klientach Ci zależy. Przygotuję kierunek i wycenę dla firmy ${c.fromGenitive}.`,
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Wybrane realizacje stron internetowych ${c.inLocative}`,
    contact: {
      title: `Masz pomysł na stronę internetową ${c.inLocative}?`,
      subtitle:
        "Napisz kilka zdań i wrócę z wyceną.",
      imageAlt: `Strona internetowa dla firmy ${c.fromGenitive}`,
    },
    },
  );
}

function createWebDesignPage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage(
    "design",
    city,
    getLandingPageAddedDate("design-city"),
    {
    seo: {
      title: `Projektowanie stron www ${city.name} - Paweł Wessel`,
      description: `Projektowanie stron www ${c.inLocative} z naciskiem na UX, architekturę informacji, redesign, branding i kierunek wizualny dla firm.`,
    },
    hero: {
      headingPrefix: "Projektowanie ",
      headingHighlight: `stron www ${c.inLocative}`,
      headingSuffix: " - UX, redesign i spójna identyfikacja",
      description: `Projektuję strony www dla firm ${c.fromGenitive}, które chcą uporządkować komunikację, poprawić UX i lepiej wyglądać w oczach klientów.`,
      floatingPromptPrimary: `Chcesz odświeżyć design strony ${c.inLocative}?`,
      floatingPromptSecondary: `Porozmawiajmy o projekcie UX i redesignie ${c.inLocative}.`,
    },
    form: {
      requirementsPlaceholder:
        "Opisz obecną stronę, problemy UX, styl wizualny, potrzebę redesignu lub zakres brandingu...",
    },
    intent: {
      eyebrow: `Projektowanie stron www ${city.name} - UX i redesign`,
      heading: `Projektowanie stron www ${c.inLocative}, które porządkuje UX, komunikację i odbiór marki.`,
      paragraphs: [
        `Projektuję strony www dla firm ${c.fromGenitive} i okolic, które chcą poprawić doświadczenie użytkownika, uporządkować architekturę informacji i nadać marce bardziej dopracowany kierunek wizualny.`,
        `Jeśli interesuje Cię projektowanie strony www ${c.inLocative}, redesign istniejącego serwisu albo odświeżenie identyfikacji, zacznijmy od analizy układu, treści i problemów UX.`,
      ],
      ctaTitle: "Chcesz omówić projekt strony?",
      ctaDescription:
        "Przejdź do formularza i opisz obecną stronę, problemy UX, kierunek wizualny oraz zakres redesignu.",
      primaryCtaLabel: "Darmowa wycena",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Redesign strony",
          description:
            "Dla firm, które mają już stronę, ale chcą poprawić układ, czytelność, hierarchię treści i odbiór marki.",
        },
        {
          name: "Projekt UX/UI strony firmowej",
          description:
            "Najlepsza opcja dla firm, które chcą przemyśleć ścieżkę użytkownika, sekcje, komunikację i wygląd serwisu przed wdrożeniem.",
          highlighted: true,
        },
        {
          name: "Branding i kierunek wizualny",
          description:
            "Dla firm, które poza projektem strony chcą uporządkować identyfikację, styl komunikacji lub bazę pod logo i materiały wizualne.",
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("design", city),
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Dobry design strony www to nie tylko estetyka. Chodzi o to, żeby użytkownik szybciej rozumiał ofertę, a marka wyglądała spójnie i profesjonalnie.",
      whyPoints: [
        "Analiza problemów UX i miejsc, w których użytkownik gubi się na stronie",
        "Przemyślana hierarchia sekcji, nagłówków i komunikatów",
        "Design dopasowany do marki, oferty i sposobu podejmowania decyzji przez klienta",
        "Redesign oparty na czytelności, zaufaniu i spójności wizualnej",
        "Możliwość połączenia projektu strony z brandingiem lub odświeżeniem identyfikacji",
      ],
      processTitle: "Jak wygląda projektowanie strony www i redesign",
      processSteps: [
        {
          title: "Audyt obecnej strony lub brief nowego projektu",
          description:
            "Sprawdzam, co dziś nie działa: układ, kolejność informacji, wizualna spójność i to, jak użytkownik porusza się po stronie.",
        },
        {
          title: "Architektura informacji i UX",
          description:
            "Układam strukturę sekcji, priorytety treści, ścieżkę użytkownika i sposób prezentacji oferty.",
        },
        {
          title: "Kierunek wizualny i projekt interfejsu",
          description:
            "Przygotowuję warstwę wizualną strony, dobór komponentów, styl komunikacji i założenia dla responsywnych widoków.",
        },
        {
          title: "Przekazanie do wdrożenia i rozwój marki",
          description:
            "Po projekcie wiadomo, jak wdrożyć stronę i jak dalej rozwijać branding, logo, kolejne podstrony lub redesign innych widoków.",
        },
      ],
      includedTitle: "Co otrzymujesz w standardzie",
      includedParagraphs: [
        "Zakres dopasowuję do projektu — od redesignu jednej strony po pełny projekt UX/UI strony firmowej z kierunkiem wizualnym marki.",
        `Celem jest projekt dla firmy ${c.fromGenitive}, który poprawia użyteczność, komunikację i wizualną spójność.`,
      ],
      includedListLabel: "Najczęściej w projekcie uwzględniam:",
      includedItems: [
        "analizę obecnego układu i najważniejszych problemów UX",
        "czytelną strukturę sekcji, nagłówków i komunikatów",
        "projekt dopasowany do marki, odbiorcy i celu strony",
        "założenia responsywne na telefon, tablet i desktop",
        "kierunek wizualny wspierający zaufanie i czytelność",
        "bazę pod redesign, branding lub dalsze wdrożenie strony",
      ],
      includedCtaLabel: "Chcę dostać wycenę projektu",
      faqTitle: "FAQ",
      faqIntro: `Najczęstsze pytania od firm, które planują projektowanie strony www ${c.inLocative}.`,
      faqItems: [
        {
          question: "Czym różni się projektowanie strony od samego wdrożenia?",
          answer:
            "Projektowanie skupia się na UX, architekturze informacji, wyglądzie, hierarchii treści i odbiorze marki. Wdrożenie to dopiero późniejsze przełożenie tego na działającą stronę.",
        },
        {
          question: "Czy pomagasz przy redesignie istniejącej strony?",
          answer:
            "Tak. Mogę przeanalizować obecną stronę, wskazać problemy UX i zaproponować nowy układ sekcji, nagłówków oraz komunikacji.",
          relatedLinks: [
            createServiceLink("website", city),
            createServiceLink("landing", city),
          ],
        },
        {
          question: "Czy projekt będzie dopasowany do urządzeń mobilnych?",
          answer:
            "Tak. Już na etapie projektowania uwzględniam responsywność i to, jak użytkownik korzysta ze strony na telefonie.",
        },
        {
          question: "Czy w ramach projektu pomagasz też z brandingiem albo logo?",
          answer:
            "Tak, jeśli tego potrzebujesz. Mogę pomóc uporządkować kierunek wizualny marki, styl komunikacji i bazę pod identyfikację lub dalsze prace nad logo.",
          relatedLinks: [
            createServiceLink("website", city),
            createServiceLink("sale", city),
          ],
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz uporządkować UX, redesign lub kierunek wizualny swojej strony?",
      nextStepDescription:
        `Opisz obecną stronę, problemy z komunikacją albo potrzebę redesignu. Przygotuję propozycję kierunku i wycenę dla firmy ${c.fromGenitive}.`,
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Wybrane projekty UX, redesigny i kierunki wizualne ${c.inLocative}`,
    contact: {
      title: `Chcesz poprawić design, UX albo branding strony ${c.inLocative}?`,
      subtitle: "Opisz obecną stronę lub zakres redesignu, a przygotuję kierunek i wycenę",
      imageAlt: `Projekt UX i redesign strony www ${c.inLocative}`,
    },
    },
  );
}

function createLandingPageServicePage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage(
    "landing",
    city,
    getLandingPageAddedDate("landing-city"),
    {
    seo: {
      title: `Tworzenie landing page ${city.name} - Paweł Wessel`,
      description: `Projektuję landing page dla firm ${c.fromGenitive}, które mają prowadzić użytkownika do jednego celu: kontaktu, telefonu albo zapytania.`,
    },
    hero: {
      headingPrefix: "Tworzenie ",
      headingHighlight: `landing page ${c.inLocative}`,
      headingSuffix: " - pod leady, reklamy i konkretną ofertę",
      description:
        `Projektuję landing page dla firm ${c.fromGenitive}, które chcą szybko przetestować ofertę, wesprzeć kampanię i kierować użytkownika do jednego celu.`,
      floatingPromptPrimary: `Chcesz uruchomić skuteczny landing page ${c.inLocative}?`,
      floatingPromptSecondary: `Porozmawiajmy o landing page pod kampanię ${c.inLocative}.`,
    },
    form: {
      requirementsPlaceholder:
        "Opisz ofertę, kampanię, grupę docelową i główny cel landing page...",
    },
    intent: {
      eyebrow: `Landing page ${city.name} - szybki start kampanii`,
      heading: `Landing page ${c.inLocative}, który skupia uwagę i zwiększa liczbę zapytań.`,
      paragraphs: [
        `Tworzę landing page dla firm ${c.fromGenitive} i okolic, które chcą promować konkretną usługę, kampanię lub ofertę bez rozpraszania użytkownika zbędnymi sekcjami.`,
        `Jeśli interesuje Cię landing page ${c.inLocative}, zaprojektujmy stronę, która prowadzi klienta do jednego celu: telefonu, formularza albo zapytania.`,
      ],
      ctaTitle: "Chcesz omówić landing page?",
      ctaDescription:
        "Przejdź do formularza i opisz ofertę, reklamę albo usługę, którą chcesz promować.",
      primaryCtaLabel: "Darmowa wycena",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Landing page pod usługę",
          description:
            "Dla jednej usługi, gdy liczy się prosty układ, szybki kontakt i wysoka czytelność oferty.",
          highlighted: true,
          image: "/images/projects/hexon/hero.png",
          imageAlt:
            "Landing page pod jedną usługę z mocnym nagłówkiem i prostym CTA",
          price: 700,
        },
        {
          name: "Landing page pod kampanię",
          description:
            "Dla działań reklamowych, promocji lub okresowych akcji, gdzie liczy się szybki start i dobra konwersja.",
          image: "/images/projects/dziendiety/test.png",
          imageAlt:
            "Landing page kampanijny z formularzem leadowym i prostą ścieżką konwersji",
          price: 1100,
        },
        {
          name: "Landing page rozwijany etapami",
          description:
            "Dla firm, które chcą zacząć od jednej strony i z czasem rozbudować ją o kolejne warianty lub sekcje.",
          image: "/images/projects/dziendiety/howitworks.png",
          imageAlt:
            "Landing page przygotowany do dalszej rozbudowy o kolejne sekcje i warianty",
          price: 1600,
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("landing", city),
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Dobry landing page nie ma być rozbudowany. Ma być prosty, czytelny i skupiony na jednym działaniu użytkownika.",
      whyPoints: [
        "Skupienie całego układu na jednym celu konwersji",
        "Sekcje, które prowadzą od problemu do kontaktu",
        "Mocne CTA i uproszczona ścieżka użytkownika",
        "Dopasowanie strony do reklamy, usługi lub konkretnej oferty",
        "Szybkie wdrożenie bez zbędnej rozbudowy",
      ],
      processTitle: "Jak powstaje landing page, który zbiera leady",
      processSteps: [
        {
          title: "Ustalenie celu landing page",
          description:
            "Definiujemy, czy najważniejszy ma być telefon, formularz, lead czy zapis.",
          image: "/images/projects/dziendiety/howitworks.png",
          imageAlt:
            "Planowanie celu i konwersji dla landing page pod kampanię lub usługę",
        },
        {
          title: "Układ treści i argumentów",
          description:
            "Przygotowuję strukturę sekcji, argumenty sprzedażowe i sposób prowadzenia użytkownika.",
          image: "/images/projects/dziendiety/underhero.png",
          imageAlt:
            "Projekt sekcji, argumentów sprzedażowych i logiki komunikacji na landing page",
        },
        {
          title: "Wdrożenie i konfiguracja",
          description:
            "Tworzę landing page, dbam o responsywność i podpinam formularz lub inne elementy kontaktowe.",
          image: "/images/projects/hexon/hero.png",
          imageAlt:
            "Wdrożenie landing page z wyraźnym CTA i układem nastawionym na leady",
        },
        {
          title: "Publikacja i dalsze testy",
          description:
            "Po uruchomieniu strony możesz dalej rozwijać kolejne warianty kampanii lub ofert.",
          image: "/images/projects/dziendiety/faq.png",
          imageAlt:
            "Rozwój landing page po publikacji poprzez testy i dalszą optymalizację treści",
        },
      ],
      includedTitle: "Co otrzymujesz w standardzie",
      includedParagraphs: [
        "Zakres dopasowuję do celu strony — od prostego landing page pod jedną usługę po bardziej rozbudowaną stronę kampanijną.",
        `Najważniejsze jest to, żeby landing page dla firmy ${c.fromGenitive} był szybki, konkretny i skuteczny sprzedażowo.`,
      ],
      includedListLabel: "Najczęściej w projekcie uwzględniam:",
      includedItems: [
        "projekt landing page pod jedną ofertę lub kampanię",
        "układ skoncentrowany na konwersji",
        "pełną responsywność na telefon i desktop",
        "sekcje sprzedażowe, argumenty i FAQ",
        "mocne CTA do formularza, telefonu lub maila",
        "konfigurację formularza kontaktowego i przygotowanie do publikacji",
      ],
      includedCtaLabel: "Chcę dostać wycenę landing page",
      faqTitle: "FAQ",
      faqIntro: `Najczęstsze pytania od firm, które planują landing page ${c.inLocative}.`,
      faqItems: [
        {
          question: "Dla kogo landing page będzie najlepszym rozwiązaniem?",
          answer:
            "Dla firm, które promują jedną usługę, ofertę lub kampanię i chcą skupić użytkownika na jednym celu działania.",
        },
        {
          question: "Czy landing page nadaje się pod reklamy?",
          answer:
            "Tak. To jedno z najlepszych zastosowań, bo landing page można zaprojektować dokładnie pod konkretny komunikat reklamowy.",
        },
        {
          question: "Czy landing page może zastąpić stronę firmową?",
          answer:
            "Czasem tak, jeśli na start chcesz promować jedną usługę. Przy większej ofercie zwykle lepsza będzie pełna strona firmowa.",
          relatedLinks: [
            createServiceLink("website", city),
            createServiceLink("store", city),
          ],
        },
        {
          question: "Jak szybko można wdrożyć landing page?",
          answer:
            "Zwykle szybciej niż rozbudowaną stronę, bo zakres jest mniejszy i skupiony na jednej ofercie.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz landing page, który będzie wspierał konkretną usługę lub kampanię?",
      nextStepDescription:
        `Opisz, co chcesz promować i jaki ma być cel strony. Przygotuję propozycję układu oraz wycenę dla firmy ${c.fromGenitive}.`,
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Wybrane realizacje landing page i stron sprzedażowych ${c.inLocative}`,
    contact: {
      title: `Chcesz landing page dla swojej oferty ${c.inLocative}?`,
      subtitle: "Opisz ofertę lub kampanię, a przygotuję propozycję strony",
      imageAlt: `Landing page dla firmy ${c.fromGenitive}`,
    },
    },
  );
}

function createStorePage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage(
    "store",
    city,
    getLandingPageAddedDate("store-city"),
    {
    seo: {
      title: `Tworzenie sklepów internetowych ${city.name} - Paweł Wessel`,
      description: `Projektuję sklepy internetowe dla firm ${c.fromGenitive}, które mają porządkować sprzedaż online i ułatwiać klientowi zakup.`,
    },
    hero: {
      headingPrefix: "Tworzenie ",
      headingHighlight: `sklepów internetowych ${c.inLocative}`,
      headingSuffix: " - ecommerce, wdrożenie i rozwój",
      description:
        `Projektuję sklepy internetowe dla firm ${c.fromGenitive}, które chcą sprzedawać online w uporządkowany, szybki i wygodny sposób.`,
      floatingPromptPrimary: `Chcesz uruchomić sklep internetowy ${c.inLocative}?`,
      floatingPromptSecondary: `Porozmawiajmy o Twojej sprzedaży online ${c.inLocative}.`,
    },
    form: {
      requirementsPlaceholder:
        "Opisz asortyment, sposób sprzedaży, integracje i cele sklepu internetowego...",
    },
    intent: {
      eyebrow: `Sklepy internetowe ${city.name} - sprzedaż bez chaosu`,
      heading: `Sklepy internetowe ${c.inLocative}, które pomagają sprzedawać — nie komplikować zakupu.`,
      paragraphs: [
        `Tworzę sklepy internetowe dla firm ${c.fromGenitive} i okolic, które chcą zacząć sprzedawać online albo uporządkować obecny proces zakupowy.`,
        "Jeśli interesuje Cię sklep internetowy dopasowany do Twojej oferty, zaplanujmy wdrożenie tak, aby był wygodny dla klientów i prosty w obsłudze po Twojej stronie.",
      ],
      ctaTitle: "Chcesz omówić sklep internetowy?",
      ctaDescription:
        "Przejdź do formularza i opisz asortyment, model sprzedaży i oczekiwane funkcje.",
      primaryCtaLabel: "Darmowa wycena",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Sklep start",
          description:
            "Dla mniejszej oferty i szybkiego wejścia w ecommerce. Najważniejsze funkcje gotowe do startu.",
          image: "/images/projects/stickerka/hero.png",
          imageAlt:
            "Sklep internetowy start z prostą ofertą produktów i szybkim wejściem online",
          price: 2500,
        },
        {
          name: "Sklep firmowy",
          description:
            "Najlepsza opcja dla firm, które chcą połączyć sprzedaż online z czytelną prezentacją marki i oferty.",
          highlighted: true,
          image: "/images/projects/blackbellart/hero.png",
          imageAlt:
            "Sklep internetowy firmowy łączący markę, ofertę i sprzedaż produktów",
          price: 4500,
        },
        {
          name: "Rozbudowany ecommerce",
          description:
            "Dla firm, które potrzebują większej liczby kategorii, integracji, automatyzacji lub rozwoju etapami.",
          image: "/images/projects/stickerka/checkout.png",
          imageAlt:
            "Rozbudowany sklep internetowy z bardziej zaawansowanym procesem zakupowym",
          price: 8000,
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("store", city),
      whyTitle: "Dlaczego warto ze mną współpracować przy sklepie internetowym",
      whyIntro:
        "Sklep internetowy ma nie tylko wyglądać dobrze, ale przede wszystkim upraszczać zakup i zwiększać sprzedaż.",
      whyPoints: [
        "Układ sklepu projektowany pod konwersję i wygodę zakupów",
        "Jasna prezentacja oferty, kategorii i kart produktów",
        "Wsparcie przy wyborze funkcji, integracji i sposobu wdrożenia",
        "Dbałość o szybkość działania oraz doświadczenie na telefonie",
        "Bezpośredni kontakt od planu sklepu po publikację",
      ],
      processTitle: "Jak powstaje sklep, który ułatwia sprzedaż",
      processSteps: [
        {
          title: "Analiza sprzedaży i zakresu",
          description:
            "Ustalamy, co sprzedajesz, jak wygląda proces zamówienia i jakie funkcje są potrzebne na start.",
          image: "/images/projects/stickerka/underHero.png",
          imageAlt:
            "Analiza oferty, kategorii i modelu sprzedaży przed wdrożeniem sklepu internetowego",
        },
        {
          title: "Struktura sklepu i makieta",
          description:
            "Planowanie kategorii, produktu, koszyka oraz sekcji, które mają wspierać decyzję zakupową.",
          image: "/images/projects/blackbellart/products.png",
          imageAlt:
            "Projekt struktury sklepu internetowego z kategoriami i kartami produktów",
        },
        {
          title: "Wdrożenie i konfiguracja",
          description:
            "Tworzę sklep, konfiguruję formularze, podstawowe elementy sprzedaży i niezbędne poprawki.",
          image: "/images/projects/blackbellart/cart.png",
          imageAlt:
            "Wdrożenie sklepu internetowego z koszykiem i kluczowymi funkcjami sprzedażowymi",
        },
        {
          title: "Publikacja i rozwój",
          description:
            "Po starcie sklep jest gotowy do działania, a Ty możesz rozwijać go etapami wraz ze wzrostem oferty.",
          image: "/images/projects/stickerka/chart.png",
          imageAlt:
            "Rozwój sklepu internetowego po publikacji wraz ze wzrostem oferty i sprzedaży",
        },
      ],
      includedTitle: "Co otrzymujesz w standardzie",
      includedParagraphs: [
        "Zakres dopasowuję do projektu — od prostego sklepu startowego po bardziej rozbudowany ecommerce.",
        `Celem jest sklep internetowy dla firmy ${c.fromGenitive}, który porządkuje sprzedaż i ułatwia klientowi zakup.`,
      ],
      includedListLabel: "Najczęściej w projekcie uwzględniam:",
      includedItems: [
        "projekt sklepu dopasowany do oferty i grupy docelowej",
        "pełną responsywność na telefon, tablet i desktop",
        "układ wspierający zakup oraz kontakt",
        "sekcje sprzedażowe, FAQ i argumenty zakupowe",
        "przygotowanie pod dalszy rozwój i kolejne etapy",
        "konfigurację formularza kontaktowego",
        "przygotowanie sklepu do publikacji",
      ],
      includedCtaLabel: "Chcę dostać wycenę sklepu",
      faqTitle: "FAQ",
      faqIntro: `Najczęstsze pytania od firm, które planują uruchomić sklep internetowy ${c.inLocative}.`,
      faqItems: [
        {
          question: "Ile kosztuje sklep internetowy?",
          answer:
            "Cena zależy od liczby produktów, widoków, integracji i poziomu rozbudowania. Zakres ustalam po krótkiej rozmowie o ofercie i modelu sprzedaży.",
        },
        {
          question: "Czy pomagasz zaplanować strukturę sklepu?",
          answer:
            "Tak. Pomagam uporządkować kategorie, strukturę sklepu, najważniejsze sekcje i ścieżkę zakupową.",
          relatedLinks: [
            createServiceLink("website", city),
            createServiceLink("landing", city),
          ],
        },
        {
          question: "Czy sklep będzie działał dobrze na telefonie?",
          answer:
            "Tak. Każdy sklep projektuję z myślą o użytkownikach mobilnych, bo to oni często stanowią dużą część ruchu.",
        },
        {
          question: "Czy sklep można później rozwijać?",
          answer:
            "Tak. System jest przygotowany tak, aby można było etapami dodawać kolejne funkcje, sekcje i integracje.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz uruchomić sklep internetowy bez chaotycznego wdrożenia?",
      nextStepDescription:
        `Opisz, co sprzedajesz i czego potrzebujesz. Przygotuję propozycję rozwiązania oraz wycenę dla firmy ${c.fromGenitive}.`,
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Wybrane realizacje i wdrożenia ecommerce ${c.inLocative}`,
    contact: {
      title: `Chcesz uruchomić sklep internetowy ${c.inLocative}?`,
      subtitle: "Zamów wycenę, wypełniając formularz poniżej",
      imageAlt: `Sklep internetowy ${c.inLocative}`,
    },
    },
  );
}

function createSeoPage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage(
    "seo",
    city,
    getLandingPageAddedDate("seo-city"),
    {
    seo: {
      title: `Pozycjonowanie stron internetowych ${city.name} - Paweł Wessel`,
      description: `Pomagam firmom ${c.fromGenitive} zwiększać widoczność w Google. SEO lokalne oparte na audycie, treści, strukturze i realnych intencjach użytkownika.`,
    },
    hero: {
      headingPrefix: "Pozycjonowanie ",
      headingHighlight: `stron internetowych ${c.inLocative}`,
      headingSuffix: " - większa widoczność i lepsze zapytania z Google",
      description: `Pomagam firmom ${c.fromGenitive} poprawić widoczność w Google, uporządkować treści i lepiej odpowiadać na lokalne zapytania klientów.`,
      floatingPromptPrimary: `Chcesz pozycjonować stronę ${c.inLocative}?`,
      floatingPromptSecondary: `Porozmawiajmy o SEO dla Twojej firmy ${c.inLocative}.`,
    },
    form: {
      requirementsPlaceholder:
        "Opisz branżę, obecną stronę i cele pozycjonowania lokalnego...",
    },
    intent: {
      eyebrow: `Pozycjonowanie stron internetowych ${city.name} - SEO lokalne`,
      heading: `Pozycjonowanie stron internetowych ${c.inLocative}, które wspiera pozyskiwanie klientów.`,
      paragraphs: [
        `Pomagam firmom ${c.fromGenitive} zwiększać widoczność strony na lokalne frazy oraz lepiej odpowiadać na realne intencje użytkowników.`,
        `Jeśli interesuje Cię pozycjonowanie strony internetowej ${c.inLocative}, zacznijmy od audytu SEO, analizy treści, struktury nagłówków i miejsc, w których tracisz widoczność lub zapytania.`,
      ],
      ctaTitle: "Chcesz omówić SEO lokalne?",
      ctaDescription:
        "Przejdź do formularza i opisz obecną stronę, branżę oraz cele SEO.",
      primaryCtaLabel: "Darmowa wycena",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Audyt SEO",
          description:
            "Dla firm, które chcą zrozumieć, co blokuje widoczność strony i od czego zacząć poprawę.",
          image: "/images/projects/glazurnikgrudziadz/underHero.png",
          imageAlt:
            "Audyt SEO strony internetowej z analizą treści, struktury i widoczności",
          price: 600,
        },
        {
          name: "SEO lokalne",
          description:
            `Najlepsza opcja dla firm, które działają ${c.inLocative} i chcą być częściej znajdowane przez klientów.`,
          highlighted: true,
          image: "/images/projects/glazurnikgrudziadz/hero.png",
          imageAlt:
            "Lokalne SEO dla firm usługowych z widocznością na frazy miejskie",
          price: 1200,
        },
        {
          name: "Stałe rozwijanie treści",
          description:
            "Dla firm, które chcą etapowo rozbudowywać widoczność strony, sekcje ofertowe i long-tail.",
          image: "/images/projects/dziendiety/faq.png",
          imageAlt:
            "Rozwój treści SEO i sekcji odpowiadających na pytania użytkowników",
          price: 1800,
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("seo", city),
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "SEO lokalne nie polega tylko na dodaniu kilku słów kluczowych. Liczy się struktura, treść i intencja użytkownika.",
      whyPoints: [
        "Skupienie na frazach lokalnych, audycie SEO i intencjach zakupowych",
        "Poprawa układu treści, nagłówków i struktury informacji",
        "Praca nad widocznością, a nie nad przypadkowym dokładaniem treści",
        "Jasne rekomendacje dotyczące contentu, on-page i priorytetów SEO",
        "Bezpośredni kontakt i konkretne priorytety wdrożeniowe",
      ],
      processTitle: "Jak wygląda pozycjonowanie strony",
      processSteps: [
        {
          title: "Audyt SEO i analiza fraz",
          description:
            "Sprawdzam obecną widoczność, lokalne frazy, strukturę treści, nagłówki i elementy, które blokują wzrost.",
          image: "/images/projects/glazurnikgrudziadz/hero.png",
          imageAlt:
            "Audyt SEO strony internetowej i analiza lokalnych fraz kluczowych",
        },
        {
          title: "Plan zmian contentowych i on-page",
          description:
            "Układam priorytety: co poprawić najpierw w treści, strukturze informacji, sekcjach i lokalnych sygnałach SEO.",
          image: "/images/projects/glazurnikgrudziadz/wspolpraca.png",
          imageAlt:
            "Plan zmian contentowych, struktury strony i priorytetów SEO on-page",
        },
        {
          title: "Wdrożenie rekomendacji SEO",
          description:
            "Wprowadzam lub rozpisuję zmiany w treści, nagłówkach, sekcjach i stronach, które wspierają widoczność oraz jakość ruchu.",
          image: "/images/projects/glazurnikgrudziadz/cennik.png",
          imageAlt:
            "Wdrożenie rekomendacji SEO w treści, sekcjach i układzie strony internetowej",
        },
        {
          title: "Monitoring i dalszy rozwój",
          description:
            "Ustalamy kolejne kroki: rozwój contentu, dalszą optymalizację lokalnych fraz i porządkowanie architektury strony.",
          image: "/images/projects/glazurnikgrudziadz/footer.png",
          imageAlt:
            "Dalszy rozwój SEO lokalnego i porządkowanie architektury strony po wdrożeniu",
        },
      ],
      includedTitle: "Co otrzymujesz w standardzie",
      includedParagraphs: [
        "Zakres dopasowuję do tego, czy potrzebujesz szybkiego audytu SEO, lokalnego SEO czy dalszego rozwoju treści i struktury strony.",
        `Celem jest lepsza widoczność strony firmy ${c.fromGenitive} na frazy lokalne, większa zgodność z intencją użytkownika i więcej wartościowych zapytań.`,
      ],
      includedListLabel: "Najczęściej w projekcie uwzględniam:",
      includedItems: [
        "audyt obecnej strony i lokalnych fraz",
        "rekomendacje dotyczące struktury nagłówków, sekcji i linkowania",
        "propozycje treści wspierających SEO lokalne i long-tail",
        "wskazanie najważniejszych priorytetów contentowych i on-page",
        "lepsze dopasowanie strony do intencji użytkownika",
        "plan dalszego rozwoju widoczności",
      ],
      includedCtaLabel: "Chcę dostać wycenę SEO",
      faqTitle: "FAQ",
      faqIntro: `Najczęstsze pytania od firm, które planują pozycjonowanie strony internetowej ${c.inLocative}.`,
      faqItems: [
        {
          question: "Czy pozycjonowanie lokalne ma sens dla małej firmy?",
          answer:
            "Tak. Dla lokalnych usług i firm często to właśnie frazy lokalne dają najbardziej wartościowy ruch i realne zapytania od klientów.",
        },
        {
          question: "Od czego zaczyna się współpraca SEO?",
          answer:
            "Zaczynam od audytu SEO: sprawdzenia strony, treści, struktury informacji, lokalnych fraz i najsłabszych miejsc, które dziś ograniczają widoczność.",
        },
        {
          question: "Czy trzeba przebudować całą stronę?",
          answer:
            "Nie zawsze. Czasem wystarczą poprawki treści, nagłówków, linkowania i architektury informacji, a czasem potrzebna jest głębsza przebudowa wybranych sekcji.",
        },
        {
          question: "Na czym skupiasz się przy SEO lokalnym?",
          answer:
            "Na lokalnych frazach, widoczności w Google, strukturze treści, architekturze informacji, nagłówkach i stronach, które realnie odpowiadają na intencję użytkownika.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz poprawić widoczność strony bez przypadkowych działań?",
      nextStepDescription:
        `Opisz swoją branżę, obecną stronę i cele. Przygotuję propozycję sensownego kierunku oraz wycenę dla firmy ${c.fromGenitive}.`,
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Wybrane audyty, treści i strony wspierające SEO lokalne ${c.inLocative}`,
    contact: {
      title: `Chcesz poprawić widoczność strony w Google ${c.inLocative}?`,
      subtitle: "Opisz obecną stronę, problemy z widocznością i cele SEO, a przygotuję kierunek działań",
      imageAlt: `Pozycjonowanie strony internetowej ${c.inLocative}`,
    },
    },
  );
}

function createSaleHomePage(): LandingPageContent {
  return {
    key: "strony-internetowe-na-sprzedaz",
    slug: "strony-internetowe-na-sprzedaz",
    serviceKey: "sale",
    addedDate: getLandingPageAddedDate("sale-overview"),
    seo: {
      title:
        "Strony internetowe na sprzedaż - gotowe strony, sklepy i platformy",
      description:
        "Gotowe strony internetowe, sklepy internetowe i platformy internetowe na sprzedaż dla firm. Tworzę także dedykowane oprogramowanie dopasowane do procesów, sprzedaży i rozwoju biznesu.",
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: "STRONY INTERNETOWE NA SPRZEDAŻ",
      headingSuffix:
        " - GOTOWE WDROŻENIA, SKLEPY I SYSTEMY DLA FIRM",
      description:
        "Projektuję i wdrażam gotowe strony internetowe, sklepy internetowe, platformy oraz dedykowane oprogramowanie dla firm, które chcą szybciej wejść online lub rozwinąć własny produkt.",
      floatingPromptPrimary: "Szukasz strony, sklepu lub platformy na sprzedaż?",
      floatingPromptSecondary: "Porozmawiajmy o rozwiązaniu dla Twojej firmy",
    },
    form: {
      ...DEFAULT_FORM_CONTENT,
      requirementsPlaceholder:
        "Opisz, czy potrzebujesz strony, sklepu, platformy albo dedykowanego oprogramowania i jaki cel ma realizować projekt...",
    },
    intent: {
      eyebrow:
        "Gotowe strony internetowe, sklepy internetowe i platformy na sprzedaż",
      heading:
        "Rozwiązania, które można dopasować do firmy, procesu sprzedaży i dalszego rozwoju",
      paragraphs: [
        "Pomagam firmom uruchamiać gotowe strony internetowe, sklepy internetowe oraz platformy, które można szybko dopasować do konkretnej oferty, modelu działania i potrzeb klientów.",
        "Jeśli poza stroną potrzebujesz bardziej rozbudowanego systemu, przygotuję także dedykowane oprogramowanie dla firmy - od panelu klienta po procesy, automatyzacje i logikę biznesową.",
      ],
      ctaTitle: "Chcesz omówić gotowe rozwiązanie dla firmy?",
      ctaDescription:
        "Przejdź do formularza i opisz, czy interesuje Cię gotowa strona, sklep, platforma czy dedykowane oprogramowanie.",
      primaryCtaLabel: "Przejdź do formularza i opisz projekt",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Gotowa strona firmowa",
          description:
            "Dla firm, które chcą szybciej wystartować z dopracowaną stroną internetową i dopasować ją do własnej oferty.",
        },
        {
          name: "Sklep internetowy na sprzedaż",
          description:
            "Dla firm, które chcą sprzedawać online na gotowym fundamencie z możliwością dalszej rozbudowy.",
          highlighted: true,
        },
        {
          name: "Platforma lub system dedykowany",
          description:
            "Dla firm, które potrzebują bardziej zaawansowanego rozwiązania: paneli, procesów, automatyzacji i logiki biznesowej.",
        },
      ],
      whyTitle: "Dlaczego warto zlecić mi takie wdrożenie",
      whyIntro:
        "Nie sprzedaję przypadkowych szablonów. Buduję rozwiązania, które można realnie dopasować do procesu sprzedaży, oferty i dalszego rozwoju firmy.",
      whyPoints: [
        "Szybszy start niż przy budowie wszystkiego od zera",
        "Dopasowanie układu, treści i funkcji do konkretnej firmy",
        "Możliwość rozbudowy o sklep, platformę lub dedykowany moduł",
        "Myślenie o sprzedaży, wygodzie użytkownika i SEO lokalnym",
        "Bezpośredni kontakt od planu po publikację",
      ],
      processTitle: "Jak wygląda przygotowanie rozwiązania na sprzedaż",
      processSteps: [
        {
          title: "1. Analiza potrzeb i zakresu",
          description:
            "Ustalamy, czy najlepsza będzie gotowa strona, sklep, platforma czy bardziej dedykowany system dla Twojej firmy.",
        },
        {
          title: "2. Dopasowanie struktury i funkcji",
          description:
            "Przygotowuję układ, sekcje, komunikację oraz funkcje, które mają wspierać sprzedaż i codzienną obsługę.",
        },
        {
          title: "3. Wdrożenie i personalizacja",
          description:
            "Dostosowuję rozwiązanie do Twojej marki, oferty, procesu i potrzebnych integracji.",
        },
        {
          title: "4. Publikacja i dalszy rozwój",
          description:
            "Po wdrożeniu możesz rozwijać projekt o kolejne moduły, podstrony, automatyzacje i funkcje dedykowane.",
        },
      ],
      includedTitle:
        "Co otrzymujesz w ramach strony, sklepu lub platformy na sprzedaż",
      includedParagraphs: [
        "Zakres dopasowuję do tego, czy potrzebujesz szybkiego wdrożenia strony firmowej, sklepu internetowego czy bardziej rozbudowanego systemu.",
        "Celem jest rozwiązanie, które daje dobry punkt startowy, a jednocześnie pozwala firmie rosnąć bez przebudowy wszystkiego od zera.",
      ],
      includedListLabel: "Najczęściej w projekcie uwzględniam:",
      includedItems: [
        "dopasowanie projektu do marki, oferty i modelu działania firmy",
        "sekcje lub widoki wspierające sprzedaż, kontakt i decyzję zakupową",
        "konfigurację formularzy, procesów i podstawowych integracji",
        "responsywność na telefon, tablet i desktop",
        "bazę pod rozwój sklepu, platformy lub funkcji dedykowanych",
        "przygotowanie do publikacji i dalszego skalowania",
      ],
      includedCtaLabel: "Chcę dostać wycenę rozwiązania",
      faqTitle: "FAQ o stronach, sklepach i platformach na sprzedaż",
      faqIntro:
        "Najczęstsze pytania od firm, które szukają gotowej strony, sklepu internetowego lub platformy do wdrożenia.",
      faqItems: [
        {
          question: "Co oznacza strona internetowa na sprzedaż?",
          answer:
            "To gotowe lub częściowo gotowe rozwiązanie, które można dopasować do firmy, oferty i procesu działania bez budowy wszystkiego od zera.",
        },
        {
          question: "Czy mogę kupić gotową stronę i dopasować ją do swojej firmy?",
          answer:
            "Tak. Właśnie na tym polega ten model: bazowe rozwiązanie przyspiesza start, a ja dopasowuję układ, treści, funkcje i identyfikację do Twojego biznesu.",
        },
        {
          question: "Czy przygotowujesz także sklepy internetowe i platformy?",
          answer:
            "Tak. Oprócz stron firmowych tworzę sklepy internetowe, platformy oraz bardziej rozbudowane rozwiązania dla firm.",
        },
        {
          question: "Czy da się rozbudować takie wdrożenie o dedykowane funkcje?",
          answer:
            "Tak. Jeśli potrzebujesz panelu klienta, automatyzacji, procesu zamówień albo innej logiki biznesowej, mogę rozbudować projekt o dedykowane oprogramowanie.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz sprawdzić, czy gotowa strona, sklep lub platforma będzie dobra dla Twojej firmy?",
      nextStepDescription:
        "Opisz branżę, model działania i to, czego potrzebujesz. Przygotuję kierunek rozwiązania oraz wycenę wdrożenia.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading:
      "Wybrane realizacje stron, sklepów i platform internetowych",
    contact: {
      title: "Chcesz kupić gotową stronę, sklep lub platformę?",
      subtitle:
        "Opisz potrzeby firmy, a przygotuję propozycję rozwiązania i wycenę",
      imageAlt:
        "Gotowa strona internetowa, sklep internetowy lub platforma na sprzedaż",
    },
  };
}

function createSalePage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage(
    "sale",
    city,
    getLandingPageAddedDate("sale-city"),
    {
    seo: {
      title: `Strony internetowe na sprzedaż ${city.name} - Paweł Wessel`,
      description: `Gotowe strony internetowe, sklepy internetowe i platformy internetowe na sprzedaż ${c.inLocative}. Tworzę także dedykowane oprogramowanie dla firm ${c.fromGenitive}.`,
    },
    hero: {
      headingPrefix: "Gotowe ",
      headingHighlight: `strony na sprzedaż ${c.inLocative}`,
      headingSuffix: " - strony, sklepy i systemy dla firm",
      description: `Pomagam firmom ${c.fromGenitive} uruchamiać gotowe strony internetowe, sklepy, platformy i rozwiązania dopasowane do sprzedaży, procesu działania oraz rozwoju biznesu.`,
      floatingPromptPrimary:
        `Szukasz gotowej strony, sklepu lub platformy ${c.inLocative}?`,
      floatingPromptSecondary: `Porozmawiajmy o wdrożeniu ${c.inLocative}.`,
    },
    form: {
      requirementsPlaceholder:
        "Opisz, czy potrzebujesz strony, sklepu, platformy albo systemu dedykowanego i jaki problem ma rozwiązać wdrożenie...",
    },
    intent: {
      eyebrow: `Strony internetowe na sprzedaż ${city.name} - szybki start`,
      heading: `Gotowe strony, sklepy i platformy ${c.inLocative} dla firm, które chcą szybciej wdrożyć rozwiązanie.`,
      paragraphs: [
        `Tworzę dla firm ${c.fromGenitive} gotowe strony internetowe, sklepy internetowe i platformy, które można dopasować do oferty, procesu sprzedaży i realnych potrzeb biznesu.`,
        `Jeśli interesują Cię strony internetowe na sprzedaż ${c.inLocative}, mogę przygotować zarówno szybsze wdrożenie na gotowym fundamencie, jak i bardziej rozbudowane rozwiązanie z funkcjami dedykowanymi.`,
      ],
      ctaTitle: "Chcesz omówić gotowe rozwiązanie dla firmy?",
      ctaDescription:
        "Przejdź do formularza i opisz, czy interesuje Cię strona, sklep, platforma czy dedykowane oprogramowanie.",
      primaryCtaLabel: "Darmowa wycena",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Gotowa strona firmowa",
          description:
            "Dla firm, które chcą szybciej wystartować z dopracowaną stroną i dopasować ją do swojej oferty.",
        },
        {
          name: "Sklep internetowy na sprzedaż",
          description:
            "Dla firm, które chcą sprzedawać online na gotowym fundamencie z opcją dalszej rozbudowy.",
          highlighted: true,
        },
        {
          name: "Platforma lub system dedykowany",
          description:
            "Dla firm, które potrzebują paneli, procesów, automatyzacji lub bardziej złożonego rozwiązania.",
        },
      ],
      offerSupportingLinks: [
        createServiceLink("website", city),
        createServiceLink("store", city),
        createServiceLink("design", city),
      ],
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Chodzi nie tylko o szybszy start. Najważniejsze jest to, żeby rozwiązanie było dopasowane do firmy, sposobu działania i dalszego rozwoju.",
      whyPoints: [
        "Szybsze wejście online niż przy budowie wszystkiego od zera",
        "Możliwość dopasowania projektu do marki, oferty i procesu",
        "Rozbudowa o sklep, platformę lub funkcje dedykowane",
        "Myślenie o sprzedaży, wygodzie użytkownika i SEO lokalnym",
        "Bezpośredni kontakt od analizy po publikację",
      ],
      processTitle:
        "Jak wygląda przygotowanie strony, sklepu lub platformy na sprzedaż",
      processSteps: [
        {
          title: "Analiza potrzeb firmy",
          description:
            "Ustalamy, czy najlepsza będzie gotowa strona, sklep, platforma czy rozwiązanie rozbudowane o funkcje dedykowane.",
        },
        {
          title: "Dopasowanie układu i funkcji",
          description:
            "Przygotowuję strukturę, komunikację i funkcje pod ofertę, sprzedaż oraz codzienną pracę firmy.",
        },
        {
          title: "Personalizacja i wdrożenie",
          description:
            "Dostosowuję rozwiązanie do marki, procesu i potrzebnych integracji, a następnie przygotowuję je do startu.",
        },
        {
          title: "Publikacja i rozwój",
          description:
            "Po wdrożeniu możesz dalej rozwijać projekt o kolejne sekcje, moduły, automatyzacje i funkcje.",
        },
      ],
      includedTitle: "Co otrzymujesz w standardzie",
      includedParagraphs: [
        `Zakres dopasowuję do tego, czy potrzebujesz gotowej strony internetowej, sklepu internetowego czy bardziej rozbudowanej platformy dla firmy ${c.fromGenitive}.`,
        "Celem jest wdrożenie, które daje szybki punkt startowy, ale jednocześnie pozwala rozwijać firmę bez chaotycznej przebudowy.",
      ],
      includedListLabel: "Najczęściej w projekcie uwzględniam:",
      includedItems: [
        "dopasowanie układu, treści i funkcji do firmy",
        "sekcje lub widoki wspierające sprzedaż i kontakt",
        "konfigurację formularzy, procesów i podstawowych integracji",
        "responsywność na telefon, tablet i desktop",
        "bazę pod rozwój sklepu, platformy lub systemu dedykowanego",
        "przygotowanie do publikacji i dalszego skalowania",
      ],
      includedCtaLabel: "Chcę dostać wycenę rozwiązania",
      faqTitle: "FAQ",
      faqIntro: `Najczęstsze pytania od firm, które szukają gotowego rozwiązania ${c.inLocative}.`,
      faqItems: [
        {
          question: "Co oznacza strona internetowa na sprzedaż?",
          answer:
            "To gotowe lub częściowo gotowe rozwiązanie, które można dopasować do firmy, oferty i procesu bez budowy wszystkiego od zera.",
        },
        {
          question: "Czy mogę kupić gotową stronę i dopasować ją do swojej firmy?",
          answer:
            "Tak. To właśnie główna zaleta takiego wdrożenia: bazę przygotowuję wcześniej, a potem dopasowuję ją do Twojej marki, treści i funkcji.",
          relatedLinks: [
            createServiceLink("website", city),
            createServiceLink("design", city),
          ],
        },
        {
          question: "Czy przygotowujesz także sklepy internetowe i platformy?",
          answer:
            "Tak. Oprócz stron firmowych tworzę sklepy internetowe, platformy i bardziej rozbudowane systemy dla firm.",
          relatedLinks: [
            createServiceLink("store", city),
            createServiceLink("website", city),
          ],
        },
        {
          question: "Czy takie wdrożenie można rozbudować o dedykowane funkcje?",
          answer:
            "Tak. Jeśli potrzebujesz panelu klienta, automatyzacji, dodatkowych kroków procesu albo niestandardowej logiki biznesowej, mogę rozbudować projekt o dedykowane oprogramowanie.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz sprawdzić, czy gotowa strona, sklep lub platforma będzie dobra dla Twojej firmy?",
      nextStepDescription:
        `Opisz branżę, model działania i zakres potrzebnego wdrożenia. Przygotuję propozycję rozwiązania oraz wycenę dla firmy ${c.fromGenitive}.`,
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Wybrane realizacje stron, sklepów i platform ${c.inLocative}`,
    contact: {
      title: `Chcesz kupić gotową stronę, sklep lub platformę ${c.inLocative}?`,
      subtitle:
        "Opisz potrzeby firmy, a przygotuję propozycję rozwiązania i wycenę",
      imageAlt: `Gotowa strona internetowa, sklep lub platforma dla firmy ${c.fromGenitive}`,
    },
    },
  );
}

function createTargetAudiencePage(
  target: LandingPageTargetRecord,
  city: LandingPageCity,
): LandingPageContent {
  const c = getCityContext(city);
  const slug = createTargetSlug(target.slug, city.slug);
  const targetPageLabel = `Strona internetowa dla ${target.audienceLabel}`;
  const [serviceOfferCard, trustOfferCard, seoOfferCard] = target.offerCards;

  return {
    key: slug,
    slug,
    serviceKey: "website",
    citySlug: city.slug,
    cityName: city.name,
    targetKey: target.key,
    targetLabel: target.audienceLabel,
    addedDate: getLandingPageAddedDate("target-city"),
    seo: {
      title: `${targetPageLabel} ${city.name} - Paweł Wessel`,
      description: `Projektuję strony internetowe dla ${target.businessLabel} ${c.inLocative}. Stawiam na czytelną ofertę, lokalne SEO i prostą ścieżkę do kontaktu.`,
    },
    hero: {
      headingPrefix: "Strona internetowa dla ",
      headingHighlight: target.audienceLabel,
      headingSuffix: ` ${city.name} - więcej zaufania i zapytań`,
      description: `Tworzę strony internetowe dla ${target.businessLabel} ${c.inLocative}, które pokazują ofertę, budują wiarygodność i prowadzą klienta prosto do kontaktu.`,
      floatingPromptPrimary: `Potrzebujesz strony dla ${target.audienceLabel} ${c.inLocative}?`,
      floatingPromptSecondary: `Przygotuję projekt dopasowany do ${target.categoryLabel} i klientów ${c.fromGenitive}.`,
    },
    form: {
      title: `Zapytaj o stronę dla ${target.audienceLabel}`,
      subtitle: `Opisz ofertę ${target.businessLabel}, miasto działania i cel strony.`,
      requirementsPlaceholder:
        "Napisz, jakie usługi oferujesz, jakie pytania zadają klienci i jaki efekt ma dać nowa strona...",
      sendLabel: "Wyślij zapytanie",
      successMessage: "Dzięki! Przygotuję propozycję strony dopasowanej do Twojej branży.",
    },
    intent: {
      eyebrow: `${targetPageLabel} ${city.name}`,
      heading: `Projekt strony dla ${target.businessLabel}, który ułatwia zdobywanie zapytań ${c.inLocative}.`,
      paragraphs: [
        `Jeśli prowadzisz ${target.businessLabel} ${c.inLocative}, Twoja strona powinna szybko wyjaśniać zakres usług, wzmacniać zaufanie i skracać drogę do pierwszego kontaktu.`,
        `Takie wdrożenie przygotowuję pod ${target.primaryGoal}, lokalne wyszukiwania oraz dalszą rozbudowę o kolejne usługi, wpisy i podstrony targetowe.`,
      ],
      ctaTitle: "Chcesz omówić stronę dla swojej branży?",
      ctaDescription:
        "Przejdź do formularza i opisz, jakie usługi chcesz pokazać oraz na jakich klientach Ci zależy.",
      primaryCtaLabel: "Darmowa wycena",
      offerLabel: "Zakres projektu",
      offerOptions: [
        {
          name: "Strona usługowa",
          description: `Czytelna prezentacja ${target.categoryLabel}, specjalizacji i procesu współpracy.`,
          highlighted: serviceOfferCard.highlighted ?? true,
          image: serviceOfferCard.image,
          imageAlt: serviceOfferCard.imageAlt,
          price: serviceOfferCard.price,
        },
        {
          name: "Sekcje zaufania",
          description: `Układ pod opinie, odpowiedzi na pytania klientów i elementy, które obniżają barierę kontaktu.`,
          highlighted: trustOfferCard.highlighted,
          image: trustOfferCard.image,
          imageAlt: trustOfferCard.imageAlt,
          price: trustOfferCard.price,
        },
        {
          name: "SEO lokalne",
          description: `Struktura treści przygotowana pod frazy lokalne związane z ${target.categoryLabel} ${c.inLocative}.`,
          highlighted: seoOfferCard.highlighted,
          image: seoOfferCard.image,
          imageAlt: seoOfferCard.imageAlt,
          price: seoOfferCard.price,
        },
      ],
      offerSupportingLinks: [
        createServiceLink("landing", city),
        createServiceLink("store", city),
        createServiceLink("seo", city),
      ],
      whyTitle: `Dlaczego taka strona działa dla ${target.businessLabel}`,
      whyIntro: `Klient szukający ${target.categoryLabel} porównuje nie tylko ofertę, ale też wiarygodność, specjalizację i wygodę kontaktu.`,
      whyPoints: target.trustSignals.map(
        (signal) => `Projekt uwzględnia ${signal}.`,
      ),
      processTitle: "Jak wygląda realizacja",
      processSteps: [
        {
          title: "Strategia i zakres",
          description: `Ustalamy, które usługi, specjalizacje i pytania klientów powinny znaleźć się na stronie ${target.businessLabel}.`,
        },
        {
          title: "Makieta i treści",
          description: `Układam strukturę pod sprzedaż, lokalne SEO i elementy budujące zaufanie jeszcze przed wdrożeniem designu.`,
        },
        {
          title: "Wdrożenie i rozwój",
          description: `Publikuję stronę, porządkuję CTA i zostawiam bazę pod kolejne podstrony dla usług lub następnych miast.`,
        },
      ],
      includedTitle: "Co zawiera podstrona targetowa",
      includedParagraphs: [
        `To nie jest tylko zmiana nagłówka pod frazę. Każda strona dla ${target.audienceLabel} wykorzystuje osobny komunikat, argumenty sprzedażowe i lokalny kontekst miasta.`,
        `Dzięki temu możesz rozwijać kolejne podstrony z jednego źródła danych, a później podpiąć te rekordy pod Firebase lub inny CMS.`,
      ],
      includedListLabel: "W standardzie",
      includedItems: [
        ...target.featureHighlights,
        "sekcję FAQ pod najczęstsze pytania klientów",
        "formularz kontaktowy z jasnym CTA",
        `przygotowanie pod dalszy rozwój fraz lokalnych związanych z ${city.name}`,
      ],
      includedCtaLabel: "Zamów wycenę",
      faqTitle: "FAQ",
      faqIntro: `Najczęstsze pytania o projekt strony dla ${target.audienceLabel} ${c.inLocative}.`,
      faqItems: [
        {
          question: `Co powinna zawierać strona internetowa dla ${target.audienceLabel}?`,
          answer: `Najważniejsze są jasna prezentacja oferty, szybkie pokazanie specjalizacji, elementy zaufania i wygodna droga do kontaktu. Dla ${target.businessLabel} szczególnie ważna jest też struktura treści pod lokalne wyszukiwania.`,
          relatedLinks: [
            createServiceLink("website", city),
            createServiceLink("seo", city),
          ],
        },
        {
          question: "Czy taka podstrona może być potem zarządzana z bazy danych?",
          answer: "Tak. Ten model można łatwo przenieść do Firebase, bo treść jest budowana z rekordów targetu i miasta. W praktyce wystarczy podmienić lokalne dane na odczyt z bazy, bez zmiany routingu i komponentów.",
        },
        {
          question: `Czy taka strona pomoże w SEO lokalnym ${c.inLocative}?`,
          answer: `Tak, pod warunkiem że treści odpowiadają na realne pytania klientów i są osadzone w lokalnym kontekście. Dlatego układ strony przygotowuję pod rozwój o kolejne usługi, wpisy i frazy związane z ${city.name}.`,
        },
        {
          question: "Jak szybko można uruchomić pierwszą wersję?",
          answer: "Najczęściej pierwszą wersję projektu da się przygotować szybko, jeśli mamy gotowy zakres usług, materiały i priorytety. Potem tę samą strukturę można powielać dla kolejnych targetów lub miast.",
          relatedLinks: [createServiceLink("landing", city)],
        },
      ],
      faqCtaLabel: "Porozmawiajmy o projekcie",
      nextStepEyebrow: "Następny krok",
      nextStepTitle: `Zaprojektujmy stronę dla ${target.audienceLabel} ${c.inLocative}`,
      nextStepDescription:
        "Wyślij krótki opis firmy i usług. Przygotuję propozycję struktury, zakresu oraz kierunku rozwoju kolejnych podstron targetowych.",
      nextStepPrimaryCtaLabel: "Wyślij zapytanie",
      nextStepSecondaryCtaLabel: "Zobacz pozostałe usługi",
    },
    portfolioHeading: `Strony internetowe dla ${target.businessLabel}`,
    contact: {
      title: `Chcesz stronę dla ${target.audienceLabel} ${c.inLocative}?`,
      subtitle:
        "Opisz ofertę, miasto działania i najważniejsze usługi, a przygotuję kierunek wdrożenia.",
      imageAlt: `Strona internetowa dla ${target.businessLabel} ${c.inLocative}`,
    },
  };
}

export const HOME_LANDING_PAGE = createWebsitePage(DEFAULT_CITY);

const TARGET_LANDING_PAGE_RECORDS = getLandingPageTargetRecords();

export const TARGET_AUDIENCE_LANDING_PAGES: LandingPageContent[] =
  TARGET_LANDING_PAGE_RECORDS.flatMap((target) =>
    ALL_CITIES.map((city) => createTargetAudiencePage(target, city)),
  );

export const SEO_LANDING_PAGES: LandingPageContent[] = [
  ...ALL_CITIES.flatMap((city) => [
    city.slug === DEFAULT_CITY_SLUG ? HOME_LANDING_PAGE : createWebsitePage(city),
    createWebDesignPage(city),
    createLandingPageServicePage(city),
    createStorePage(city),
    createSalePage(city),
    createSeoPage(city),
  ]),
  ...TARGET_AUDIENCE_LANDING_PAGES,
];

const LANDING_PAGE_BY_SLUG = new Map(
  SEO_LANDING_PAGES.filter((page) => Boolean(page.slug)).map((page) => [
    page.slug as string,
    page,
  ]),
);

const LANDING_PAGE_BY_SERVICE_AND_CITY = new Map(
  SEO_LANDING_PAGES.filter((page) => !page.targetKey).map((page) => [
    `${page.serviceKey}:${page.citySlug}`,
    page,
  ]),
);

const LANDING_PAGE_BY_PATH = new Map(
  SEO_LANDING_PAGES.map((page) => [getLandingPageHref(page), page]),
);

const LANDING_PAGE_BY_TARGET_AND_CITY = new Map(
  TARGET_AUDIENCE_LANDING_PAGES.map((page) => [
    `${page.targetKey}:${page.citySlug}`,
    page,
  ]),
);

function getCitySlugForContext(currentSlug?: string): string {
  return LANDING_PAGE_BY_SLUG.get(currentSlug ?? "")?.citySlug ?? DEFAULT_CITY_SLUG;
}

export function getLandingPageBySlug(slug: string): LandingPageContent | null {
  return LANDING_PAGE_BY_SLUG.get(slug) ?? null;
}

export function getLandingPageByPathname(
  pathname: string,
): LandingPageContent | null {
  return LANDING_PAGE_BY_PATH.get(pathname) ?? null;
}

export function getLandingPageCityBySlug(
  citySlug: string,
): LandingPageCity | null {
  return ALL_CITIES.find((city) => city.slug === citySlug) ?? null;
}

export function getServiceLandingPage(
  citySlug: string,
  serviceKey: LandingPageServiceKey,
): LandingPageContent | null {
  return LANDING_PAGE_BY_SERVICE_AND_CITY.get(`${serviceKey}:${citySlug}`) ?? null;
}

export function getLandingPageByRouteParams(
  citySlug: string,
  serviceRouteParam: string,
): LandingPageContent | null {
  const serviceKey = getServiceKeyFromRouteParam(serviceRouteParam);

  if (!serviceKey) {
    return null;
  }

  return getServiceLandingPage(citySlug, serviceKey);
}

export function getAllCityHubSlugs(): string[] {
  return ALL_CITIES.map((city) => city.slug);
}

export function getAllCityServiceRouteParams(): Array<{
  city: string;
  service: LandingPageServiceRouteParam;
}> {
  return ALL_CITIES.flatMap((city) =>
    ALL_SERVICE_KEYS.map((serviceKey) => ({
      city: city.slug,
      service: getServiceRouteParam(serviceKey),
    })),
  );
}

export function getAllLandingPagePaths(): string[] {
  return SEO_LANDING_PAGES.map((page) => getLandingPageHref(page));
}

export function getAllLandingPageSlugs(): string[] {
  return SEO_LANDING_PAGES.filter((page): page is LandingPageContent & { slug: string } =>
    Boolean(page.slug),
  ).map((page) => page.slug);
}

export function getLandingPageMetadata(page: LandingPageContent): Metadata {
  return createMetadata(page);
}

export function getBreadcrumbLinks(currentSlug?: string): LandingPageLink[] {
  const page = LANDING_PAGE_BY_SLUG.get(currentSlug ?? "");

  if (page?.slug && page.serviceKey && !page.citySlug) {
    return [
      {
        href: "/",
        label: "Start",
      },
      {
        href: getLandingPageHref(page),
        label: SERVICE_LABELS[page.serviceKey],
      },
    ];
  }

  if (!page?.slug || !page.citySlug || !page.cityName || !page.serviceKey) {
    return [];
  }

  const currentPageLabel = `${SERVICE_LABELS[page.serviceKey]} ${page.cityName}`;

  if (page.targetKey && page.targetLabel) {
    return [
      {
        href: "/",
        label: "Start",
      },
      {
        href: getCityHubHref(page.citySlug),
        label: page.cityName,
      },
      {
        href: getLandingPageHref(page),
        label: `Dla ${page.targetLabel}`,
      },
    ];
  }

  if (page.serviceKey === "website") {
    return [
      {
        href: "/",
        label: "Start",
      },
      {
        href: getCityHubHref(page.citySlug),
        label: page.cityName,
      },
    ];
  }

  return [
    {
      href: "/",
      label: "Start",
    },
    {
      href: getCityHubHref(page.citySlug),
      label: page.cityName,
    },
    {
      href: getLandingPageHref(page),
      label: currentPageLabel,
    },
  ];
}

export function getCurrentCityServiceLinks(
  currentSlug?: string,
  includeCurrent = true,
): LandingPageLink[] {
  const currentPage = LANDING_PAGE_BY_SLUG.get(currentSlug ?? "");
  const citySlug = currentPage?.citySlug ?? DEFAULT_CITY_SLUG;

  return ALL_SERVICE_KEYS.map((serviceKey) =>
    LANDING_PAGE_BY_SERVICE_AND_CITY.get(`${serviceKey}:${citySlug}`),
  )
    .filter(
      (page): page is LandingPageContent =>
        Boolean(page && page.cityName && page.serviceKey),
    )
    .filter((page) => includeCurrent || page.slug !== currentSlug)
    .map((page) => ({
      href: getLandingPageHref(page),
      label: `${SERVICE_LABELS[page.serviceKey as LandingPageServiceKey]} ${page.cityName}`,
    }));
}

export function getCityServiceLinks(
  citySlug: string,
  includeServiceKey?: LandingPageServiceKey,
): LandingPageLink[] {
  return ALL_SERVICE_KEYS.map((serviceKey) =>
    LANDING_PAGE_BY_SERVICE_AND_CITY.get(`${serviceKey}:${citySlug}`),
  )
    .filter(
      (page): page is LandingPageContent =>
        Boolean(page && page.cityName && page.serviceKey),
    )
    .filter((page) => includeServiceKey !== page.serviceKey)
    .map((page) => ({
      href: getLandingPageHref(page),
      label: `${SERVICE_LABELS[page.serviceKey as LandingPageServiceKey]} ${page.cityName}`,
    }));
}

export function getCurrentCityTargetLinks(
  currentSlug?: string,
  includeCurrent = true,
): LandingPageLink[] {
  const currentPage = LANDING_PAGE_BY_SLUG.get(currentSlug ?? "");
  const citySlug = currentPage?.citySlug ?? DEFAULT_CITY_SLUG;

  return TARGET_LANDING_PAGE_RECORDS.map((target) =>
    LANDING_PAGE_BY_TARGET_AND_CITY.get(`${target.key}:${citySlug}`),
  )
    .filter(
      (page): page is LandingPageContent =>
        Boolean(page?.slug && page.cityName && page.targetLabel),
    )
    .filter((page) => includeCurrent || page.slug !== currentSlug)
    .map((page) => ({
      href: getLandingPageHref(page),
      label: `Strona dla ${page.targetLabel} ${page.cityName}`,
    }));
}

export function getCityTargetLinks(
  citySlug: string,
  limit?: number,
): LandingPageLink[] {
  const links = TARGET_LANDING_PAGE_RECORDS.map((target) =>
    LANDING_PAGE_BY_TARGET_AND_CITY.get(`${target.key}:${citySlug}`),
  )
    .filter(
      (page): page is LandingPageContent =>
        Boolean(page?.slug && page.cityName && page.targetLabel),
    )
    .map((page) => ({
      href: getLandingPageHref(page),
      label: `Strona dla ${page.targetLabel} ${page.cityName}`,
    }));

  return typeof limit === "number" ? links.slice(0, limit) : links;
}

export function getSiblingCityLinks(
  currentSlug?: string,
  limit = 6,
): LandingPageLink[] {
  const currentPage = LANDING_PAGE_BY_SLUG.get(currentSlug ?? "");

  if (currentPage?.targetKey && currentPage.targetLabel) {
    return ALL_CITIES.filter((city) => city.slug !== currentPage.citySlug)
      .map((city) =>
        LANDING_PAGE_BY_TARGET_AND_CITY.get(`${currentPage.targetKey}:${city.slug}`),
      )
      .filter(
        (page): page is LandingPageContent =>
          Boolean(page?.slug && page.cityName && page.targetLabel),
      )
      .slice(0, limit)
      .map((page) => ({
        href: getLandingPageHref(page),
        label: `Strona dla ${page.targetLabel} ${page.cityName}`,
      }));
  }

  const serviceKey = currentPage?.serviceKey ?? "website";
  const currentCitySlug = currentPage?.citySlug ?? DEFAULT_CITY_SLUG;

  return ALL_CITIES.filter((city) => city.slug !== currentCitySlug)
    .map((city) =>
      LANDING_PAGE_BY_SERVICE_AND_CITY.get(`${serviceKey}:${city.slug}`),
    )
    .filter(
      (page): page is LandingPageContent =>
        Boolean(page && page.cityName && page.serviceKey),
    )
    .slice(0, limit)
    .map((page) => ({
      href: getLandingPageHref(page),
      label: `${SERVICE_LABELS[serviceKey]} ${page.cityName}`,
    }));
}

export function getSiblingCityHubLinks(
  citySlug: string,
  limit = 6,
): LandingPageLink[] {
  const currentCity = getLandingPageCityBySlug(citySlug);

  if (!currentCity) {
    return [];
  }

  return ALL_CITIES.filter((city) => city.slug !== citySlug)
    .sort(
      (left, right) =>
        getDistanceBetweenCitiesKm(currentCity, left) -
        getDistanceBetweenCitiesKm(currentCity, right),
    )
    .slice(0, limit)
    .map((city) => ({
      href: getCityHubHref(city.slug),
      label: `Projektowanie stron WWW ${city.name}`,
    }));
}

export function getHomepageSectionLinks(
  isHomepage: boolean,
): LandingPageLink[] {
  return [
    {
      href: isHomepage ? "#darmowa-wycena" : "#darmowa-wycena",
      label: "Zamów wycenę",
    },
  ];
}

export function getLandingPageLink(
  serviceKey: LandingPageServiceKey,
  currentSlug?: string,
): LandingPageLink | null {
  const citySlug = getCitySlugForContext(currentSlug);
  const page = LANDING_PAGE_BY_SERVICE_AND_CITY.get(`${serviceKey}:${citySlug}`);

  if (!page || !page.cityName) {
    return null;
  }

  return {
    href: getLandingPageHref(page),
    label: `${SERVICE_LABELS[serviceKey]} ${page.cityName}`,
  };
}

export function getPrimaryLandingPageLink(
  serviceKey: LandingPageServiceKey,
  currentSlug?: string,
): LandingPageLink | null {
  const citySlug = getCitySlugForContext(currentSlug);
  const page = LANDING_PAGE_BY_SERVICE_AND_CITY.get(`${serviceKey}:${citySlug}`);

  if (!page || !page.cityName) {
    return null;
  }

  return {
    href: getLandingPageHref(page),
    label: `${SERVICE_LABELS[serviceKey]} ${page.cityName}`,
  };
}

export function getPrimaryServiceLinks(currentSlug?: string): LandingPageLink[] {
  return ALL_SERVICE_KEYS.map((serviceKey) =>
    getPrimaryLandingPageLink(serviceKey, currentSlug),
  ).filter((link): link is LandingPageLink => Boolean(link));
}

export function getContextualLandingPageLinks(
  currentSlug?: string,
  limit = 3,
): LandingPageLink[] {
  const currentPage = LANDING_PAGE_BY_SLUG.get(currentSlug ?? "");
  const currentHref = currentPage
    ? getLandingPageHref(currentPage)
    : getLandingPageHref(currentSlug);

  return DEFAULT_CONTEXTUAL_SERVICE_KEYS.filter(
    (serviceKey) => serviceKey !== currentPage?.serviceKey,
  )
    .map((serviceKey) => getLandingPageLink(serviceKey, currentSlug))
    .filter((link): link is LandingPageLink => Boolean(link))
    .filter((link) => link.href !== currentHref)
    .slice(0, limit);
}

export function getLandingPageHref(
  input?: LandingPageContent | string,
): string {
  if (!input) {
    return "/";
  }

  if (typeof input === "string") {
    const page = LANDING_PAGE_BY_SLUG.get(input);
    return page ? getLandingPageHref(page) : `/${input}`;
  }

  if (!input.slug) {
    return "/";
  }

  if (input.targetKey || !input.serviceKey || !input.citySlug) {
    return `/${input.slug}`;
  }

  return getServiceHref(input.serviceKey, input.citySlug);
}

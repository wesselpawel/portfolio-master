import type { Metadata } from "next";
import citiesData from "@/data/cities.json";

export type LandingPageOffer = {
  name: string;
  description: string;
  highlighted?: boolean;
};

export type LandingPageStep = {
  title: string;
  description: string;
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

type LandingPageCityCases = {
  mianownik: string;
  dopelniacz: string;
  celownik: string;
  biernik: string;
  narzednik: string;
  miejscownik: string;
  wolacz: string;
};

type LandingPageCity = {
  slug: string;
  name: string;
  cases: LandingPageCityCases;
};

export type LandingPageContent = {
  key: string;
  slug?: string;
  serviceKey?: LandingPageServiceKey;
  citySlug?: string;
  cityName?: string;
  seo: LandingPageSeoContent;
  hero: LandingPageHeroContent;
  form: LandingPageFormContent;
  intent: LandingPageIntentContent;
  portfolioHeading: string;
  contact: LandingPageContactContent;
};

type CityLandingPageInput = Omit<
  LandingPageContent,
  "key" | "slug" | "serviceKey" | "citySlug" | "cityName" | "form" | "contact"
> & {
  form?: Partial<LandingPageFormContent>;
  contact?: LandingPageContactContent;
};

type GenericLandingPageInput = Omit<
  LandingPageContent,
  "key" | "slug" | "serviceKey" | "citySlug" | "cityName" | "form" | "contact"
> & {
  slug: string;
  form?: Partial<LandingPageFormContent>;
  contact?: LandingPageContactContent;
};

const SITE_URL = "https://wesselpawel.com";
const DEFAULT_CITY_SLUG = "grudziadz";
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

const GRUDZIADZ_CITY: LandingPageCity = {
  slug: "grudziadz",
  name: "Grudziądz",
  cases: {
    mianownik: "Grudziądz",
    dopelniacz: "Grudziądza",
    celownik: "Grudziądzowi",
    biernik: "Grudziądz",
    narzednik: "Grudziądzem",
    miejscownik: "Grudziądzu",
    wolacz: "Grudziądzu",
  },
};

const ALL_CITIES: LandingPageCity[] = [
  GRUDZIADZ_CITY,
  ...(citiesData as LandingPageCity[]),
];

function createMetadata(page: LandingPageContent): Metadata {
  const pathname = page.slug ? `/${page.slug}` : "/";
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
      siteName: "wesselpawel.com",
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
      return `strony-internetowe-${citySlug}`;
    case "design":
      return `projektowanie-stron-www-${citySlug}`;
    case "landing":
      return `landing-page-${citySlug}`;
    case "store":
      return `sklepy-internetowe-${citySlug}`;
    case "sale":
      return `strony-internetowe-na-sprzedaz-${citySlug}`;
    case "seo":
      return `pozycjonowanie-stron-internetowych-${citySlug}`;
  }
}

function getCityContext(city: LandingPageCity) {
  return {
    ...city,
    inLocative: `w ${city.cases.miejscownik}`,
    fromGenitive: `z ${city.cases.dopelniacz}`,
    locativeUpper: city.cases.miejscownik.toUpperCase(),
    upperName: city.name.toUpperCase(),
  };
}

function createServiceLink(
  serviceKey: LandingPageServiceKey,
  city: LandingPageCity,
): LandingPageLink {
  return {
    href: `/${createSlug(serviceKey, city.slug)}`,
    label: `${SERVICE_LABELS[serviceKey]} ${city.name}`,
  };
}

function createOfferSupportingLinks(
  currentServiceKey: LandingPageServiceKey,
  city: LandingPageCity,
): LandingPageLink[] {
  const preferredKeys: LandingPageServiceKey[] = ["website", "design", "landing"];
  const fallbackKeys: LandingPageServiceKey[] = ["seo", "store", "sale"];

  const selectedKeys = [...preferredKeys, ...fallbackKeys]
    .filter((serviceKey) => serviceKey !== currentServiceKey)
    .slice(0, 3);

  return selectedKeys.map((serviceKey) => createServiceLink(serviceKey, city));
}

function createCityLandingPage(
  serviceKey: LandingPageServiceKey,
  city: LandingPageCity,
  input: CityLandingPageInput,
): LandingPageContent {
  const slug = createSlug(serviceKey, city.slug);

  return {
    key: slug,
    slug,
    serviceKey,
    citySlug: city.slug,
    cityName: city.name,
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
  input: GenericLandingPageInput,
): LandingPageContent {
  return {
    key: input.slug,
    slug: input.slug,
    serviceKey,
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
    seo: {
      title: "Strony internetowe dla firm - Paweł Wessel",
      description:
        "Tworzę strony internetowe, landing page, sklepy internetowe i podstrony SEO dla firm, które chcą zdobywać więcej wartościowych zapytań.",
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: "STRONY INTERNETOWE",
      headingSuffix: " - POD SPRZEDAŻ, WIDOCZNOŚĆ I REALNE ZAPYTANIA",
      description:
        "Projektuję i wdrażam strony internetowe dla firm, które chcą lepiej prezentować ofertę, budować zaufanie i prowadzić użytkownika prosto do kontaktu.",
      floatingPromptPrimary: "Masz pomysł na stronę internetową?",
      floatingPromptSecondary: "Porozmawiajmy o Twoim projekcie",
    },
    form: DEFAULT_FORM_CONTENT,
    intent: {
      eyebrow: "Strony internetowe, landing page i SEO lokalne",
      heading: "Wdrożenia, które łączą design, sprzedaż i lokalne SEO",
      paragraphs: [
        "Pomagam firmom planować strony internetowe tak, aby dobrze komunikowały ofertę i wspierały konkretny cel biznesowy.",
        "Jeśli chcesz rozwijać widoczność na miasta i usługi, przygotuję strukturę, treści oraz landing pages gotowe do dalszego skalowania.",
      ],
      ctaTitle: "Chcesz omówić projekt?",
      ctaDescription:
        "Przejdź do formularza i opisz, czego potrzebujesz. Możemy zacząć od jednej strony albo od całej struktury pod SEO lokalne.",
      primaryCtaLabel: "Przejdź do formularza i opisz projekt",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Strona firmowa",
          description:
            "Dla firm, które chcą uporządkować ofertę, wizerunek i proces pozyskiwania zapytań.",
          highlighted: true,
        },
        {
          name: "Landing page",
          description:
            "Dla jednej usługi, kampanii albo oferty, gdy najważniejsza jest szybka konwersja.",
        },
        {
          name: "SEO lokalne i city pages",
          description:
            "Dla firm, które chcą rozwijać widoczność na miasta, usługi i intencje lokalne.",
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
      processTitle: "Jak wygląda współpraca",
      processSteps: [
        {
          title: "1. Ustalenie celu i zakresu",
          description:
            "Rozmawiamy o ofercie, odbiorcy i tym, co ma realnie dawać nowa strona.",
        },
        {
          title: "2. Struktura i komunikacja",
          description:
            "Układam sekcje, nagłówki i kierunek treści pod sprzedaż oraz SEO.",
        },
        {
          title: "3. Wdrożenie i iteracja",
          description:
            "Buduję stronę, konfiguruję kontakt i dopracowuję szczegóły przed publikacją.",
        },
        {
          title: "4. Rozwój pod kolejne podstrony",
          description:
            "Jeśli chcesz, rozbudowujemy serwis o lokalne landing pages i kolejne usługi.",
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
  return createGenericLandingPage("website", {
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
  });
}

function createWebDesignOverviewPage(): LandingPageContent {
  return createGenericLandingPage("design", {
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
  });
}

function createLandingPageOverviewPage(): LandingPageContent {
  return createGenericLandingPage("landing", {
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
  });
}

function createStoreOverviewPage(): LandingPageContent {
  return createGenericLandingPage("store", {
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
      processTitle: "Jak wygląda współpraca",
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
  });
}

function createSeoOverviewPage(): LandingPageContent {
  return createGenericLandingPage("seo", {
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
  });
}

function createWebsitePage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage("website", city, {
    seo: {
      title: `Strony internetowe ${city.name} - tworzenie stron www dla firm`,
      description: `Tworzę strony internetowe i strony www dla firm ${c.fromGenitive}. Projektuję i wdrażam serwisy, które pomagają lepiej prezentować ofertę, budować zaufanie i zdobywać klientów.`,
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: `STRONY INTERNETOWE W ${c.locativeUpper}`,
      headingSuffix: " - NOWOCZEŚNIE, SKUTECZNIE I POD KLIENTÓW",
      description: `Pomagam firmom ${c.fromGenitive} tworzyć strony internetowe i strony www, które dobrze pokazują ofertę, wzmacniają wiarygodność i prowadzą użytkownika do kontaktu.`,
      floatingPromptPrimary: `Chcesz stronę internetową lub stronę www ${c.inLocative}?`,
      floatingPromptSecondary: `Porozmawiajmy o stronie internetowej ${c.inLocative}`,
    },
    intent: {
      eyebrow: `Strony internetowe ${city.name}`,
      heading: `Strony internetowe ${c.inLocative}, które pomagają zdobywać klientów`,
      paragraphs: [
        `Tworzę strony internetowe i strony www dla firm ${c.fromGenitive} i okolic, które chcą lepiej prezentować ofertę, szybciej domykać zapytania i budować profesjonalny wizerunek w sieci.`,
        `Jeśli interesuje Cię tworzenie stron www ${c.inLocative} albo potrzebujesz nowej strony internetowej dla firmy, zaplanujmy rozwiązanie dopasowane do branży, budżetu i tego, jak Twoi klienci podejmują decyzję.`,
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
            "Najlepsza opcja dla lokalnych firm. Pozwala pokazać ofertę, proces i regularnie pozyskiwać klientów z Google.",
          highlighted: true,
        },
        {
          name: "Rozbudowany serwis",
          description:
            "Dla firm, które potrzebują większej liczby podstron, bloga, rozbudowanej oferty lub rozwoju etapami.",
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("website", city),
      whyTitle: "Dlaczego warto zlecić mi wykonanie strony internetowej",
      whyIntro:
        "Dobra strona internetowa powinna nie tylko dobrze wyglądać, ale przede wszystkim ułatwiać klientowi zrozumienie oferty i wykonanie następnego kroku.",
      whyPoints: [
        "Projekt dopasowany do branży, oferty i celu strony",
        "Układ i treści prowadzące użytkownika do kontaktu",
        "Połączenie estetyki, użyteczności i local SEO",
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
        `Celem jest strona internetowa dla firmy ${c.fromGenitive}, która porządkuje ofertę, wspiera sprzedaż i buduje zaufanie.`,
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt dopasowany do marki, oferty i odbiorcy",
        "pełną responsywność na telefon, tablet i desktop",
        "mocne CTA do formularza, telefonu i maila",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        `podstawy local SEO dla fraz typu "strony internetowe ${city.name}" i "tworzenie stron www ${city.name}"`,
        "konfigurację formularza kontaktowego",
      ],
      includedCtaLabel: "Chcę dostać wycenę strony internetowej",
      faqTitle: `FAQ o stronach internetowych ${c.inLocative}`,
      faqIntro: `Najczęstsze pytania od firm, które planują nową stronę internetową ${c.inLocative}.`,
      faqItems: [
        {
          question: `Ile kosztuje strona internetowa ${c.inLocative}?`,
          answer:
            "Cena zależy od zakresu: liczby sekcji, podstron, funkcji i ilości treści. Najczęściej najlepszym rozwiązaniem jest strona firmowa z ofertą, procesem, FAQ i wyraźnym kontaktem.",
          relatedLinks: [
            createServiceLink("landing", city),
            createServiceLink("store", city),
            createServiceLink("design", city),
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
            createServiceLink("design", city),
            createServiceLink("landing", city),
          ],
        },
        {
          question: "Czy strona może wspierać SEO lokalne?",
          answer:
            "Tak. Dobrze zaplanowana strona może wspierać frazy lokalne, budować widoczność i ułatwiać rozwój kolejnych podstron SEO.",
          relatedLinks: [
            createServiceLink("seo", city),
            createServiceLink("landing", city),
          ],
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz stronę internetową, która będzie pracować na klientów?",
      nextStepDescription:
        "Opisz, czym zajmuje się Twoja firma i czego oczekujesz od strony. Wrócę z propozycją rozwiązania oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Realizacje stron internetowych dla firm ${c.fromGenitive}`,
    contact: {
      title: "Chcesz nową stronę internetową?",
      subtitle:
        "Opisz firmę i zakres strony, a przygotuję propozycję rozwiązania",
      imageAlt: `Strona internetowa dla firmy ${c.fromGenitive}`,
    },
  });
}

function createWebDesignPage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage("design", city, {
    seo: {
      title: `Projektowanie stron www ${city.name} - UX, redesign i identyfikacja`,
      description: `Projektowanie stron www ${c.inLocative} z naciskiem na UX, architekturę informacji, redesign, branding i kierunek wizualny dla firm.`,
    },
    hero: {
      headingPrefix: "PROJEKTUJĘ ",
      headingHighlight: `STRONY WWW ${c.inLocative.toUpperCase()}`,
      headingSuffix: " - UX, REDESIGN I SPÓJNA IDENTYFIKACJA",
      description: `Pomagam firmom ${c.fromGenitive} uporządkować UX, strukturę treści i warstwę wizualną strony tak, aby marka wyglądała spójniej i była łatwiejsza w odbiorze.`,
      floatingPromptPrimary: "Chcesz odświeżyć design strony lub marki?",
      floatingPromptSecondary: `Porozmawiajmy o projekcie UX i redesignie ${c.inLocative}`,
    },
    form: {
      requirementsPlaceholder:
        "Opisz obecną stronę, problemy UX, styl wizualny, potrzebę redesignu lub zakres brandingu...",
    },
    intent: {
      eyebrow: `Projektowanie stron www - ${city.name}`,
      heading: "Projektowanie stron www, które poprawia UX, komunikację i odbiór marki",
      paragraphs: [
        `Projektuję strony www dla firm ${c.fromGenitive} i okolic, które chcą poprawić doświadczenie użytkownika, uporządkować architekturę informacji i nadać marce bardziej dopracowany kierunek wizualny.`,
        `Jeśli interesuje Cię projektowanie strony www ${c.inLocative}, redesign istniejącego serwisu albo odświeżenie identyfikacji, zacznijmy od analizy układu, treści i problemów UX.`,
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
      offerSupportingLinks: createOfferSupportingLinks("design", city),
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
        "Opisz obecną stronę, problemy z komunikacją albo potrzebę redesignu. Wrócę z propozycją kierunku i wyceną projektu.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Projekty UX, redesigny i kierunki wizualne stron dla firm ${c.fromGenitive}`,
    contact: {
      title: "Chcesz poprawić design, UX albo branding strony?",
      subtitle: "Opisz obecną stronę lub zakres redesignu, a przygotuję kierunek i wycenę",
      imageAlt: `Projekt UX i redesign strony www ${c.inLocative}`,
    },
  });
}

function createLandingPageServicePage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage("landing", city, {
    seo: {
      title: `Landing page ${city.name} - strony sprzedażowe pod kampanie i leady`,
      description: `Tworzę landing page dla firm ${c.fromGenitive}. Strony pod kampanie, usługi i reklamy, zaprojektowane tak, by zwiększać liczbę zapytań i kontaktów.`,
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: `LANDING PAGE ${city.name.toUpperCase()}`,
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
      eyebrow: `Landing page - ${city.name}`,
      heading: `Landing page ${c.inLocative}, który skupia uwagę i zwiększa liczbę zapytań`,
      paragraphs: [
        `Tworzę landing page dla firm ${c.fromGenitive} i okolic, które chcą promować konkretną usługę, kampanię lub ofertę bez rozpraszania użytkownika zbędnymi sekcjami.`,
        `Jeśli interesuje Cię landing page ${c.inLocative}, zaprojektujmy stronę, która prowadzi klienta do jednego celu: telefonu, formularza albo zapytania.`,
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
      offerSupportingLinks: createOfferSupportingLinks("landing", city),
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
            createServiceLink("design", city),
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
    portfolioHeading: `Realizacje landing page i stron sprzedażowych ${c.fromGenitive}`,
    contact: {
      title: "Chcesz landing page dla swojej oferty?",
      subtitle: "Opisz ofertę lub kampanię, a przygotuję propozycję strony",
      imageAlt: `Landing page dla firmy ${c.fromGenitive}`,
    },
  });
}

function createStorePage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage("store", city, {
    seo: {
      title: `Sklepy internetowe ${city.name} - projekt i wdrożenie ecommerce`,
      description: `Tworzę sklepy internetowe dla firm ${c.fromGenitive}. Projektuję sprzedaż online, wdrażam koszyk, płatności i układ nastawiony na konwersję.`,
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: "SKLEPY INTERNETOWE",
      headingSuffix: ` - SPRZEDAWAJ WYGODNIEJ ${c.inLocative.toUpperCase()}`,
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
      eyebrow: `Sklepy internetowe ${city.name}`,
      heading: `Sklepy internetowe ${c.inLocative}, które pomagają sprzedawać`,
      paragraphs: [
        `Tworzę sklepy internetowe dla firm ${c.fromGenitive} i okolic, które chcą zacząć sprzedawać online albo uporządkować obecny proces zakupowy.`,
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
      processTitle: "Jak wygląda współpraca",
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
            createServiceLink("design", city),
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
        "Opisz, co sprzedajesz i czego potrzebujesz. Wrócę z propozycją rozwiązania oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Wybrane realizacje i wdrożenia ecommerce ${c.fromGenitive}`,
    contact: {
      title: "Chcesz uruchomić sklep internetowy?",
      subtitle: "Zamów wycenę, wypełniając formularz poniżej",
      imageAlt: `Sklep internetowy ${c.inLocative}`,
    },
  });
}

function createSeoPage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage("seo", city, {
    seo: {
      title: `Pozycjonowanie stron internetowych ${city.name} - SEO lokalne dla firm`,
      description: `Pomagam lokalnym firmom zwiększać widoczność w Google. Pozycjonowanie stron internetowych ${c.inLocative} z naciskiem na audyt SEO, lokalne frazy, content i strukturę informacji.`,
    },
    hero: {
      headingPrefix: "PROWADZĘ ",
      headingHighlight: `POZYCJONOWANIE STRON INTERNETOWYCH ${city.name.toUpperCase()}`,
      headingSuffix: " - ZWIĘKSZ LOKALNĄ WIDOCZNOŚĆ W GOOGLE",
      description: `Pomagam firmom ${c.fromGenitive} poprawić widoczność w Google, uporządkować treści i lepiej odpowiadać na lokalne zapytania klientów.`,
      floatingPromptPrimary: "Chcesz pozycjonować stronę lokalnie?",
      floatingPromptSecondary: "Porozmawiajmy o SEO dla Twojej firmy",
    },
    form: {
      requirementsPlaceholder:
        "Opisz branżę, obecną stronę i cele pozycjonowania lokalnego...",
    },
    intent: {
      eyebrow: `Pozycjonowanie stron internetowych ${city.name}`,
      heading: `Pozycjonowanie stron internetowych ${c.inLocative}, które wspiera pozyskiwanie klientów`,
      paragraphs: [
        `Pomagam firmom ${c.fromGenitive} i okolic zwiększać widoczność strony na lokalne frazy oraz lepiej odpowiadać na realne intencje użytkowników.`,
        `Jeśli interesuje Cię pozycjonowanie strony internetowej ${c.inLocative}, zacznijmy od audytu SEO, analizy treści, struktury nagłówków i miejsc, w których tracisz widoczność lub zapytania.`,
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
            `Najlepsza opcja dla firm, które działają ${c.inLocative} i chcą być częściej znajdowane przez klientów.`,
          highlighted: true,
        },
        {
          name: "Stałe rozwijanie treści",
          description:
            "Dla firm, które chcą etapowo rozbudowywać widoczność strony, sekcje ofertowe i long-tail.",
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("seo", city),
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
        "Opisz swoją branżę, obecną stronę i cele. Wrócę z propozycją sensownego kierunku oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Audyty, treści i strony wspierające SEO lokalne ${c.fromGenitive}`,
    contact: {
      title: "Chcesz poprawić widoczność strony w Google?",
      subtitle: "Opisz obecną stronę, problemy z widocznością i cele SEO, a przygotuję kierunek działań",
      imageAlt: `Pozycjonowanie strony internetowej ${c.inLocative}`,
    },
  });
}

function createSaleHomePage(): LandingPageContent {
  return {
    key: "strony-internetowe-na-sprzedaz",
    slug: "strony-internetowe-na-sprzedaz",
    serviceKey: "sale",
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

  return createCityLandingPage("sale", city, {
    seo: {
      title: `Strony internetowe na sprzedaż ${city.name} - gotowe wdrożenia dla firm`,
      description: `Gotowe strony internetowe, sklepy internetowe i platformy internetowe na sprzedaż ${c.inLocative}. Tworzę także dedykowane oprogramowanie dla firm ${c.fromGenitive}.`,
    },
    hero: {
      headingPrefix: "GOTOWE ",
      headingHighlight: `STRONY NA SPRZEDAŻ ${city.name.toUpperCase()}`,
      headingSuffix: " - STRONY, SKLEPY I SYSTEMY DLA FIRM",
      description: `Pomagam firmom ${c.fromGenitive} uruchamiać gotowe strony internetowe, sklepy, platformy i rozwiązania dopasowane do sprzedaży, procesu działania oraz rozwoju biznesu.`,
      floatingPromptPrimary:
        "Szukasz gotowej strony, sklepu lub platformy dla firmy?",
      floatingPromptSecondary: `Porozmawiajmy o wdrożeniu ${c.inLocative}`,
    },
    form: {
      requirementsPlaceholder:
        "Opisz, czy potrzebujesz strony, sklepu, platformy albo systemu dedykowanego i jaki problem ma rozwiązać wdrożenie...",
    },
    intent: {
      eyebrow: `Strony internetowe na sprzedaż ${city.name}`,
      heading: `Gotowe strony, sklepy i platformy ${c.inLocative} dla firm, które chcą szybciej wdrożyć rozwiązanie`,
      paragraphs: [
        `Tworzę dla firm ${c.fromGenitive} gotowe strony internetowe, sklepy internetowe i platformy, które można dopasować do oferty, procesu sprzedaży i realnych potrzeb biznesu.`,
        `Jeśli interesują Cię strony internetowe na sprzedaż ${c.inLocative}, mogę przygotować zarówno szybsze wdrożenie na gotowym fundamencie, jak i bardziej rozbudowane rozwiązanie z funkcjami dedykowanymi.`,
      ],
      ctaTitle: "Chcesz omówić gotowe rozwiązanie dla firmy?",
      ctaDescription:
        "Przejdź do formularza i opisz, czy interesuje Cię strona, sklep, platforma czy dedykowane oprogramowanie.",
      primaryCtaLabel: "Przejdź do formularza i opisz projekt",
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
      whyTitle:
        "Dlaczego warto zlecić mi przygotowanie strony lub platformy na sprzedaż",
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
          title: "1. Analiza potrzeb firmy",
          description:
            "Ustalamy, czy najlepsza będzie gotowa strona, sklep, platforma czy rozwiązanie rozbudowane o funkcje dedykowane.",
        },
        {
          title: "2. Dopasowanie układu i funkcji",
          description:
            "Przygotowuję strukturę, komunikację i funkcje pod ofertę, sprzedaż oraz codzienną pracę firmy.",
        },
        {
          title: "3. Personalizacja i wdrożenie",
          description:
            "Dostosowuję rozwiązanie do marki, procesu i potrzebnych integracji, a następnie przygotowuję je do startu.",
        },
        {
          title: "4. Publikacja i rozwój",
          description:
            "Po wdrożeniu możesz dalej rozwijać projekt o kolejne sekcje, moduły, automatyzacje i funkcje.",
        },
      ],
      includedTitle:
        "Co otrzymujesz w ramach rozwiązania na sprzedaż dla firmy",
      includedParagraphs: [
        `Zakres dopasowuję do tego, czy potrzebujesz gotowej strony internetowej, sklepu internetowego czy bardziej rozbudowanej platformy dla firmy ${c.fromGenitive}.`,
        "Celem jest wdrożenie, które daje szybki punkt startowy, ale jednocześnie pozwala rozwijać firmę bez chaotycznej przebudowy.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "dopasowanie układu, treści i funkcji do firmy",
        "sekcje lub widoki wspierające sprzedaż i kontakt",
        "konfigurację formularzy, procesów i podstawowych integracji",
        "responsywność na telefon, tablet i desktop",
        "bazę pod rozwój sklepu, platformy lub systemu dedykowanego",
        "przygotowanie do publikacji i dalszego skalowania",
      ],
      includedCtaLabel: "Chcę dostać wycenę rozwiązania",
      faqTitle:
        "FAQ o stronach, sklepach i platformach internetowych na sprzedaż",
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
        "Opisz branżę, model działania i zakres potrzebnego wdrożenia. Przygotuję propozycję rozwiązania oraz wycenę.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Realizacje stron, sklepów i platform dla firm ${c.fromGenitive}`,
    contact: {
      title: "Chcesz kupić gotową stronę, sklep lub platformę?",
      subtitle:
        "Opisz potrzeby firmy, a przygotuję propozycję rozwiązania i wycenę",
      imageAlt: `Gotowa strona internetowa, sklep lub platforma dla firmy ${c.fromGenitive}`,
    },
  });
}

export const HOME_LANDING_PAGE = createHomepageLandingPage();

export const SEO_LANDING_PAGES: LandingPageContent[] = [
  createWebsiteOverviewPage(),
  createWebDesignOverviewPage(),
  createLandingPageOverviewPage(),
  createStoreOverviewPage(),
  createSaleHomePage(),
  createSeoOverviewPage(),
  ...ALL_CITIES.flatMap((city) => [
    createWebsitePage(city),
    createWebDesignPage(city),
    createLandingPageServicePage(city),
    createStorePage(city),
    createSalePage(city),
    createSeoPage(city),
  ]),
];

const LANDING_PAGE_BY_SLUG = new Map(
  SEO_LANDING_PAGES.map((page) => [page.slug as string, page]),
);

const GENERIC_LANDING_PAGE_BY_SERVICE = new Map(
  SEO_LANDING_PAGES.filter((page) => page.serviceKey && !page.citySlug).map(
    (page) => [page.serviceKey as LandingPageServiceKey, page],
  ),
);

const LANDING_PAGE_BY_SERVICE_AND_CITY = new Map(
  SEO_LANDING_PAGES.map((page) => [
    `${page.serviceKey}:${page.citySlug}`,
    page,
  ]),
);

function getCitySlugForContext(currentSlug?: string): string {
  return LANDING_PAGE_BY_SLUG.get(currentSlug ?? "")?.citySlug ?? DEFAULT_CITY_SLUG;
}

export function getLandingPageBySlug(slug: string): LandingPageContent | null {
  return LANDING_PAGE_BY_SLUG.get(slug) ?? null;
}

export function getAllLandingPageSlugs(): string[] {
  return SEO_LANDING_PAGES.map((page) => page.slug as string);
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
        href: `/${page.slug}`,
        label: SERVICE_LABELS[page.serviceKey],
      },
    ];
  }

  if (!page?.slug || !page.citySlug || !page.cityName || !page.serviceKey) {
    return [];
  }

  const cityHubSlug = createSlug("website", page.citySlug);
  const currentPageLabel = `${SERVICE_LABELS[page.serviceKey]} ${page.cityName}`;

  if (page.serviceKey === "website") {
    return [
      {
        href: "/",
        label: "Start",
      },
      {
        href: `/${page.slug}`,
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
      href: `/${cityHubSlug}`,
      label: page.cityName,
    },
    {
      href: `/${page.slug}`,
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
        Boolean(page?.slug && page.cityName && page.serviceKey),
    )
    .filter((page) => includeCurrent || page.slug !== currentSlug)
    .map((page) => ({
      href: `/${page.slug}`,
      label: `${SERVICE_LABELS[page.serviceKey as LandingPageServiceKey]} ${page.cityName}`,
    }));
}

export function getSiblingCityLinks(
  currentSlug?: string,
  limit = 6,
): LandingPageLink[] {
  const currentPage = LANDING_PAGE_BY_SLUG.get(currentSlug ?? "");
  const serviceKey = currentPage?.serviceKey ?? "website";
  const currentCitySlug = currentPage?.citySlug;

  return ALL_CITIES.filter((city) => city.slug !== currentCitySlug)
    .map((city) =>
      LANDING_PAGE_BY_SERVICE_AND_CITY.get(`${serviceKey}:${city.slug}`),
    )
    .filter(
      (page): page is LandingPageContent =>
        Boolean(page?.slug && page.cityName && page.serviceKey),
    )
    .slice(0, limit)
    .map((page) => ({
      href: `/${page.slug}`,
      label: `${SERVICE_LABELS[serviceKey]} ${page.cityName}`,
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
  const currentPage = LANDING_PAGE_BY_SLUG.get(currentSlug ?? "");

  if (currentPage && !currentPage.citySlug) {
    const genericPage = GENERIC_LANDING_PAGE_BY_SERVICE.get(serviceKey);

    if (!genericPage?.slug) {
      return null;
    }

    return {
      href: `/${genericPage.slug}`,
      label: SERVICE_LABELS[serviceKey],
    };
  }

  const citySlug = getCitySlugForContext(currentSlug);
  const page = LANDING_PAGE_BY_SERVICE_AND_CITY.get(`${serviceKey}:${citySlug}`);

  if (!page?.slug || !page.cityName) {
    return null;
  }

  return {
    href: `/${page.slug}`,
    label: `${SERVICE_LABELS[serviceKey]} ${page.cityName}`,
  };
}

export function getPrimaryLandingPageLink(
  serviceKey: LandingPageServiceKey,
): LandingPageLink | null {
  const page = GENERIC_LANDING_PAGE_BY_SERVICE.get(serviceKey);

  if (!page?.slug) {
    return null;
  }

  return {
    href: `/${page.slug}`,
    label: SERVICE_LABELS[serviceKey],
  };
}

export function getPrimaryServiceLinks(): LandingPageLink[] {
  return ALL_SERVICE_KEYS.map((serviceKey) =>
    getPrimaryLandingPageLink(serviceKey),
  ).filter((link): link is LandingPageLink => Boolean(link));
}

export function getContextualLandingPageLinks(
  currentSlug?: string,
  limit = 3,
): LandingPageLink[] {
  const currentPage = LANDING_PAGE_BY_SLUG.get(currentSlug ?? "");

  return DEFAULT_CONTEXTUAL_SERVICE_KEYS.filter(
    (serviceKey) => serviceKey !== currentPage?.serviceKey,
  )
    .map((serviceKey) => getLandingPageLink(serviceKey, currentSlug))
    .filter((link): link is LandingPageLink => Boolean(link))
    .filter((link) => link.href !== `/${currentSlug}`)
    .slice(0, limit);
}

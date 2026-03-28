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
  | "creation"
  | "design"
  | "landing"
  | "business"
  | "store"
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

const SITE_URL = "https://wesselpawel.com";
const DEFAULT_CITY_SLUG = "grudziadz";
const ALL_SERVICE_KEYS: LandingPageServiceKey[] = [
  "website",
  "creation",
  "design",
  "landing",
  "business",
  "store",
  "seo",
];
const DEFAULT_CONTEXTUAL_SERVICE_KEYS: LandingPageServiceKey[] = [
  "website",
  "business",
  "design",
  "landing",
  "seo",
];

const SERVICE_LABELS: Record<LandingPageServiceKey, string> = {
  website: "Strony internetowe",
  creation: "Tworzenie stron www",
  design: "Projektowanie stron www",
  landing: "Landing page",
  business: "Strona internetowa dla firmy",
  store: "Sklepy internetowe",
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
          url: `${SITE_URL}/assets/donuts.png`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: page.seo.title,
      description: page.seo.description,
      images: [
        {
          url: `${SITE_URL}/assets/donuts.png`,
        },
      ],
    },
  };
}

function createSlug(serviceKey: LandingPageServiceKey, citySlug: string): string {
  switch (serviceKey) {
    case "website":
      return `strony-internetowe-${citySlug}`;
    case "creation":
      return `tworzenie-stron-www-${citySlug}`;
    case "design":
      return `projektowanie-stron-www-${citySlug}`;
    case "landing":
      return `landing-page-${citySlug}`;
    case "business":
      return `strona-internetowa-dla-firmy-${citySlug}`;
    case "store":
      return `sklepy-internetowe-${citySlug}`;
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
  const fallbackKeys: LandingPageServiceKey[] = ["business", "creation", "seo"];

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

function createWebsitePage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage("website", city, {
    seo: {
      title: `Strony internetowe ${city.name} - nowoczesne strony dla firm`,
      description: `Tworzę strony internetowe dla firm ${c.fromGenitive}. Nowoczesne strony www, które pomagają lepiej prezentować ofertę, budować zaufanie i zdobywać klientów.`,
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: `STRONY INTERNETOWE W ${c.locativeUpper}`,
      headingSuffix: " - NOWOCZEŚNIE, SKUTECZNIE I POD KLIENTÓW",
      description: `Pomagam firmom ${c.fromGenitive} budować strony internetowe, które dobrze pokazują ofertę, wzmacniają wiarygodność i prowadzą użytkownika do kontaktu.`,
      floatingPromptPrimary: `Chcesz stronę internetową ${c.inLocative}?`,
      floatingPromptSecondary: `Porozmawiajmy o stronie internetowej ${c.inLocative}`,
    },
    intent: {
      eyebrow: `Strony internetowe ${city.name}`,
      heading: `Strony internetowe ${c.inLocative}, które pomagają zdobywać klientów`,
      paragraphs: [
        `Tworzę strony internetowe dla firm ${c.fromGenitive} i okolic, które chcą lepiej prezentować ofertę, szybciej domykać zapytania i budować profesjonalny wizerunek w sieci.`,
        `Jeśli interesują Cię strony internetowe ${c.inLocative}, zaplanujmy rozwiązanie dopasowane do branży, budżetu i tego, jak Twoi klienci podejmują decyzję.`,
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
        `podstawy local SEO dla fraz typu "strony internetowe ${city.name}"`,
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
            createServiceLink("business", city),
            createServiceLink("landing", city),
            createServiceLink("store", city),
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
            createServiceLink("business", city),
          ],
        },
        {
          question: "Czy strona może wspierać SEO lokalne?",
          answer:
            "Tak. Dobrze zaplanowana strona może wspierać frazy lokalne, budować widoczność i ułatwiać rozwój kolejnych podstron SEO.",
          relatedLinks: [
            createServiceLink("seo", city),
            createServiceLink("creation", city),
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

function createWebsiteCreationPage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage("creation", city, {
    seo: {
      title: `Tworzenie stron www ${city.name} - projekt i wdrożenie`,
      description: `Tworzenie stron www ${c.inLocative} dla lokalnych firm. Projektuję i wdrażam strony nastawione na kontakt, sprzedaż i SEO lokalne.`,
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: `STRONY WWW W ${c.locativeUpper}`,
      headingSuffix: " - OD PROJEKTU PO WDROŻENIE",
      description: `Tworzę strony www dla firm ${c.fromGenitive}, które chcą uporządkować ofertę, lepiej wyglądać online i skuteczniej zamieniać ruch w zapytania.`,
      floatingPromptPrimary: "Chcesz zlecić stworzenie strony www?",
      floatingPromptSecondary:
        "Porozmawiajmy o wdrożeniu strony dla Twojej firmy",
    },
    intent: {
      eyebrow: `Tworzenie stron www - ${city.name}`,
      heading: `Tworzenie stron www ${c.inLocative}, które wspiera sprzedaż i kontakt`,
      paragraphs: [
        `Tworzę strony www dla firm ${c.fromGenitive} i okolic, które chcą mieć nowoczesną, szybką i czytelną stronę dopasowaną do realnych potrzeb klientów.`,
        `Jeśli interesuje Cię tworzenie stron www ${c.inLocative}, pomogę Ci przejść od pomysłu do gotowego wdrożenia, które będzie wspierać widoczność i pozyskiwanie zapytań.`,
      ],
      ctaTitle: "Chcesz stworzyć stronę www?",
      ctaDescription:
        "Przejdź do formularza i opisz, jakiej strony potrzebujesz oraz jaki ma mieć cel.",
      primaryCtaLabel: "Przejdź do formularza i opisz wdrożenie",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Landing page",
          description:
            "Dla jednej usługi lub kampanii. Prosta struktura, szybkie wdrożenie i mocny kontakt.",
        },
        {
          name: "Strona firmowa",
          description:
            "Najlepsza opcja dla firm, które chcą połączyć ofertę, proces i SEO lokalne w jednym spójnym wdrożeniu.",
          highlighted: true,
        },
        {
          name: "Rozbudowany serwis",
          description:
            "Dla firm, które potrzebują większej liczby podstron, bloga, bardziej rozbudowanej architektury i rozwoju etapami.",
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("creation", city),
      whyTitle: "Dlaczego warto zlecić mi tworzenie strony www",
      whyIntro:
        "Tworzenie strony www to nie tylko samo wdrożenie. Liczy się także właściwa struktura, treść i sposób prowadzenia użytkownika do kontaktu.",
      whyPoints: [
        "Połączenie projektu, wdrożenia i myślenia o konwersji",
        "Struktura dopasowana do branży i sposobu sprzedaży",
        "Szybka, responsywna strona gotowa na ruch mobilny",
        "Podstawy SEO lokalnego już na etapie budowy strony",
        "Bezpośredni kontakt i jasny proces współpracy",
      ],
      processTitle: "Jak wygląda tworzenie strony www",
      processSteps: [
        {
          title: "1. Brief i ustalenie celu",
          description:
            "Rozmawiamy o firmie, ofercie i tym, jaki efekt ma przynieść nowa strona.",
        },
        {
          title: "2. Struktura i plan wdrożenia",
          description:
            "Przygotowuję układ sekcji, priorytety treści i kierunek, w jakim powinna pójść strona.",
        },
        {
          title: "3. Realizacja i poprawki",
          description:
            "Tworzę stronę, podpinam formularze i wprowadzam uzgodnione poprawki przed publikacją.",
        },
        {
          title: "4. Publikacja i rozwój",
          description:
            "Po starcie strona jest gotowa do działania i może być dalej rozwijana o kolejne podstrony i treści.",
        },
      ],
      includedTitle: "Co otrzymujesz w ramach tworzenia strony www",
      includedParagraphs: [
        "Zakres dopasowuję do tego, czy potrzebujesz szybkiego landing page, strony firmowej czy bardziej rozbudowanego serwisu.",
        "Celem jest wdrożenie strony www, która dobrze wygląda, działa szybko i wspiera kontakt z klientem.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt i wdrożenie dopasowane do firmy",
        "pełną responsywność na telefon, tablet i desktop",
        "mocne CTA i formularz kontaktowy",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        "podstawy local SEO i przygotowanie do publikacji",
        "bazę pod dalszy rozwój strony",
      ],
      includedCtaLabel: "Chcę dostać wycenę stworzenia strony",
      faqTitle: "FAQ o tworzeniu stron www",
      faqIntro: `Najczęstsze pytania od firm, które planują tworzenie strony www ${c.inLocative}.`,
      faqItems: [
        {
          question: "Od czego zaczyna się tworzenie strony www?",
          answer:
            "Zaczynamy od rozmowy o firmie, ofercie i celu strony. Dzięki temu wiadomo, jaki zakres i jakie sekcje mają największy sens.",
        },
        {
          question: "Czy pomagasz też zaplanować treści i układ?",
          answer:
            "Tak. Pomagam uporządkować ofertę, sekcje i komunikaty, aby strona była czytelna i bardziej skuteczna.",
          relatedLinks: [
            createServiceLink("design", city),
            createServiceLink("website", city),
          ],
        },
        {
          question: "Czy strona będzie przygotowana pod SEO lokalne?",
          answer:
            "Tak. Już na etapie tworzenia strony można przygotować ją pod rozwój widoczności na lokalne frazy.",
          relatedLinks: [
            createServiceLink("seo", city),
            createServiceLink("business", city),
          ],
        },
        {
          question: "Czy stronę można później rozbudować?",
          answer:
            "Tak. To jeden z najczęstszych scenariuszy - najpierw powstaje solidna baza, a później rozwijane są kolejne sekcje i podstrony.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle: "Chcesz stworzyć stronę www bez chaotycznego procesu?",
      nextStepDescription:
        "Opisz firmę, ofertę i oczekiwania wobec strony. Wrócę z propozycją rozwiązania oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Realizacje wdrożeń stron www dla firm ${c.fromGenitive}`,
    contact: {
      title: "Chcesz stworzyć stronę www?",
      subtitle: "Opisz zakres i cel strony, a przygotuję propozycję wdrożenia",
      imageAlt: `Tworzenie strony www ${c.inLocative}`,
    },
  });
}

function createWebDesignPage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage("design", city, {
    seo: {
      title: `Projektowanie stron www ${city.name} - nowoczesne strony dla firm`,
      description: `Projektowanie stron www ${c.inLocative} dla lokalnych firm. Wdrażam nowoczesny i przemyślany design na strony internetowe, które dobrze prezentują ofertę i wspierają kontakt.`,
    },
    hero: {
      headingPrefix: "PROJEKTUJĘ ",
      headingHighlight: `STRONY WWW ${c.inLocative.toUpperCase()}`,
      headingSuffix: " - CZYTELNIE I SKUTECZNIE DLA FIRM",
      description: `Tworzę design i implementuję strony www dla firm ${c.fromGenitive}, które chcą wyglądać profesjonalnie, jasno komunikować ofertę i ułatwiać klientowi podjęcie decyzji.`,
      floatingPromptPrimary: "Chcesz zaprojektować stronę www dla firmy?",
      floatingPromptSecondary: `Porozmawiajmy o projekcie strony ${c.inLocative}`,
    },
    form: {
      requirementsPlaceholder:
        "Opisz branżę, zakres strony, styl wizualny i czego oczekujesz od projektu...",
    },
    intent: {
      eyebrow: `Projektowanie stron www - ${city.name}`,
      heading: "Projektowanie stron www, które porządkuje ofertę i zwiększa zaufanie",
      paragraphs: [
        `Projektuję strony www dla firm ${c.fromGenitive} i okolic, które chcą lepiej pokazać ofertę, wyróżnić się wizualnie i prowadzić użytkownika prosto do kontaktu.`,
        `Jeśli interesuje Cię projektowanie strony www ${c.inLocative}, zacznijmy od przemyślanego układu treści, hierarchii sekcji i komunikacji dopasowanej do Twojej firmy.`,
      ],
      ctaTitle: "Chcesz zaprojektować stronę www?",
      ctaDescription:
        "Przejdź do formularza i opisz branżę, zakres strony oraz oczekiwany styl.",
      primaryCtaLabel: "Przejdź do formularza i opisz projekt",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Design landing page",
          description:
            "Dla jednej oferty lub kampanii. Skupia się na przejrzystym układzie i mocnym CTA.",
        },
        {
          name: "Design strony firmowej",
          description:
            "Najlepsza opcja dla firm, które chcą uporządkować ofertę, proces współpracy i zbudować profesjonalny wizerunek.",
          highlighted: true,
        },
        {
          name: "Design rozbudowanego serwisu",
          description:
            "Dla firm, które potrzebują większej liczby podstron, bloga, rozbudowanej struktury lub rozwoju etapami.",
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("design", city),
      whyTitle: "Dlaczego warto zlecić mi projektowanie strony www",
      whyIntro:
        "Dobry design strony www to nie tylko estetyka. To przede wszystkim czytelny układ, właściwe komunikaty i wygodna ścieżka użytkownika.",
      whyPoints: [
        "Design dopasowany do branży, oferty i celu strony",
        "Przemyślana hierarchia sekcji i komunikatów sprzedażowych",
        "Układ wspierający kontakt, telefon lub zapytanie ofertowe",
        "Spójne połączenie estetyki, użyteczności i SEO lokalnego",
        "Bezpośredni kontakt od pomysłu po finalne wdrożenie",
      ],
      processTitle: "Jak wygląda projektowanie designu i wdrożenie strony www",
      processSteps: [
        {
          title: "1. Analiza celu i zakresu",
          description:
            "Ustalamy, do kogo ma trafiać design strony, jaki ma mieć cel i jakie sekcje są naprawdę potrzebne.",
        },
        {
          title: "2. Koncepcja układu i komunikacji",
          description:
            "Przygotowuję kierunek strony, strukturę sekcji i sposób prezentacji oferty.",
        },
        {
          title: "3. Projekt i wdrożenie",
          description:
            "Tworzę design strony, dbam o czytelność, responsywność i konfiguruję najważniejsze elementy kontaktowe.",
        },
        {
          title: "4. Publikacja i rozwój",
          description:
            "Po uruchomieniu strony wiesz, jak dalej ją rozwijać i jakie kolejne elementy można rozbudować.",
        },
      ],
      includedTitle: "Co otrzymujesz w ramach projektu strony www",
      includedParagraphs: [
        "Zakres dopasowuję do projektu - od prostego landing page po rozbudowaną stronę firmową.",
        "Celem jest strona www, która dobrze wygląda, ale przede wszystkim porządkuje ofertę i ułatwia klientowi kontakt.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt dopasowany do marki, odbiorcy i celu strony",
        "czytelną strukturę sekcji i komunikatów",
        "pełną responsywność na telefon, tablet i desktop",
        "mocne CTA prowadzące do kontaktu",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        "podstawy local SEO i przygotowanie do publikacji",
      ],
      includedCtaLabel: "Chcę dostać wycenę projektu",
      faqTitle: "FAQ o projektowaniu stron www",
      faqIntro: `Najczęstsze pytania od firm, które planują projektowanie strony www ${c.inLocative}.`,
      faqItems: [
        {
          question: "Czym różni się projektowanie strony od samego wdrożenia?",
          answer:
            "Projektowanie skupia się na strukturze, komunikacji, wyglądzie i doświadczeniu użytkownika. Wdrożenie to później przełożenie tego na działającą stronę.",
        },
        {
          question: "Czy pomagasz dobrać układ sekcji i treści?",
          answer:
            "Tak. Pomagam ułożyć sekcje, uporządkować ofertę i dobrać komunikaty tak, aby strona była czytelna i bardziej sprzedażowa.",
          relatedLinks: [
            createServiceLink("creation", city),
            createServiceLink("business", city),
          ],
        },
        {
          question: "Czy projekt będzie dopasowany do urządzeń mobilnych?",
          answer:
            "Tak. Już na etapie projektowania uwzględniam sposób, w jaki strona ma działać i wyglądać na telefonie.",
        },
        {
          question: "Czy projektowanie strony może wspierać SEO lokalne?",
          answer:
            "Tak. Dobrze zaplanowana struktura nagłówków, sekcji i treści pomaga później lepiej rozwijać stronę pod frazy lokalne.",
          relatedLinks: [
            createServiceLink("seo", city),
            createServiceLink("website", city),
          ],
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz zaprojektować stronę www, która naprawdę będzie pracować na wynik?",
      nextStepDescription:
        "Opisz, czym zajmuje się Twoja firma i czego oczekujesz od strony. Wrócę z propozycją rozwiązania i wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Realizacje projektów stron www dla firm ${c.fromGenitive}`,
    contact: {
      title: "Chcesz zaprojektować stronę www dla firmy?",
      subtitle: "Opisz projekt, a przygotuję kierunek i wycenę",
      imageAlt: `Projektowanie strony www ${c.inLocative}`,
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
            createServiceLink("business", city),
            createServiceLink("website", city),
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

function createBusinessWebsitePage(city: LandingPageCity): LandingPageContent {
  const c = getCityContext(city);

  return createCityLandingPage("business", city, {
    seo: {
      title: `Strona internetowa dla firmy ${city.name} - profesjonalna strona firmowa`,
      description: `Tworzę strony internetowe dla firm ${c.fromGenitive}. Profesjonalne strony firmowe, które porządkują ofertę, budują zaufanie i pomagają zdobywać klientów.`,
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: `STRONY INTERNETOWE DLA FIRM ${city.name.toUpperCase()}`,
      headingSuffix: " - PROFESJONALNE, CZYTELNE I SKUTECZNE",
      description:
        "Pomagam firmom zbudować stronę internetową, która dobrze pokazuje ofertę, wzmacnia wiarygodność i ułatwia klientom kontakt.",
      floatingPromptPrimary: "Chcesz stronę internetową dla firmy?",
      floatingPromptSecondary: `Porozmawiajmy o stronie firmowej ${c.inLocative}`,
    },
    form: {
      requirementsPlaceholder:
        "Opisz firmę, zakres oferty, grupę docelową i czego oczekujesz od strony...",
    },
    intent: {
      eyebrow: `Strona internetowa dla firmy - ${city.name}`,
      heading: "Strona internetowa dla firmy, która buduje zaufanie i wspiera sprzedaż",
      paragraphs: [
        `Tworzę strony internetowe dla firm ${c.fromGenitive} i okolic, które chcą wyglądać profesjonalnie, jasno komunikować ofertę i ułatwiać klientom podjęcie decyzji.`,
        `Jeśli potrzebna Ci strona internetowa dla firmy ${c.inLocative}, zaplanujmy ją tak, aby wspierała zarówno wizerunek marki, jak i codzienne pozyskiwanie zapytań.`,
      ],
      ctaTitle: "Chcesz stronę internetową dla firmy?",
      ctaDescription:
        "Przejdź do formularza i opisz swoją firmę, ofertę oraz cel nowej strony.",
      primaryCtaLabel: "Przejdź do formularza i opisz firmę",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Prosta strona firmowa",
          description:
            "Dla mniejszych firm, które chcą szybko uporządkować ofertę i uruchomić podstawową obecność online.",
        },
        {
          name: "Rozbudowana strona dla firmy",
          description:
            "Najlepsza opcja dla firm, które chcą połączyć ofertę, proces, argumenty sprzedażowe i SEO lokalne.",
          highlighted: true,
        },
        {
          name: "Strona rozwijana etapami",
          description:
            "Dla firm, które chcą zacząć od solidnej bazy i stopniowo dodawać nowe podstrony, treści i sekcje.",
        },
      ],
      offerSupportingLinks: createOfferSupportingLinks("business", city),
      whyTitle: "Dlaczego warto zlecić mi wykonanie strony dla firmy",
      whyIntro:
        "Strona firmowa powinna jednocześnie wyglądać profesjonalnie, porządkować ofertę i wspierać pozyskiwanie klientów.",
      whyPoints: [
        "Projekt dopasowany do branży, oferty i sposobu działania firmy",
        "Treści i układ budowane pod zaufanie oraz decyzję zakupową",
        "Sekcje pokazujące ofertę, proces współpracy i argumenty",
        "Podstawy SEO lokalnego od początku planowania strony",
        "Bezpośredni kontakt od strategii po wdrożenie",
      ],
      processTitle: "Jak wygląda tworzenie strony internetowej dla firmy",
      processSteps: [
        {
          title: "1. Poznanie firmy i celu strony",
          description:
            "Ustalamy, czym zajmuje się firma, jakie usługi chcesz pokazać i jaki cel ma spełniać strona.",
        },
        {
          title: "2. Struktura i komunikacja oferty",
          description:
            "Porządkuję sekcje, układ oferty i sposób komunikacji, aby klient szybciej zrozumiał, co proponujesz.",
        },
        {
          title: "3. Wdrożenie i dopracowanie detali",
          description:
            "Tworzę stronę, dbam o responsywność, formularz kontaktowy i uzgodnione poprawki.",
        },
        {
          title: "4. Publikacja i dalszy rozwój",
          description:
            "Po starcie strona jest gotowa do działania, a Ty możesz dalej rozwijać ofertę i lokalne podstrony SEO.",
        },
      ],
      includedTitle: "Co otrzymujesz w ramach strony internetowej dla firmy",
      includedParagraphs: [
        "Zakres dopasowuję do wielkości firmy, liczby usług i tego, jak rozbudowana ma być strona.",
        "Celem jest profesjonalna strona internetowa dla firmy, która wspiera sprzedaż i buduje wiarygodność.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt strony dopasowany do firmy i jej oferty",
        "pełną responsywność na telefon, tablet i desktop",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        "mocne CTA do telefonu, formularza i maila",
        "podstawy SEO lokalnego i przygotowanie do publikacji",
        "konfigurację formularza kontaktowego",
      ],
      includedCtaLabel: "Chcę dostać wycenę strony firmowej",
      faqTitle: "FAQ o stronie internetowej dla firmy",
      faqIntro: `Najczęstsze pytania od firm, które planują nową stronę internetową ${c.inLocative}.`,
      faqItems: [
        {
          question: "Jaka strona będzie najlepsza dla mojej firmy?",
          answer:
            "To zależy od liczby usług, sposobu sprzedaży i tego, jak dużo treści chcesz pokazać. Dla wielu lokalnych firm najlepszym wyborem jest rozbudowana strona firmowa.",
        },
        {
          question: "Czy pomagasz uporządkować ofertę i treści?",
          answer:
            "Tak. Pomagam ułożyć ofertę, sekcje i komunikaty tak, żeby strona była czytelna i bardziej przekonująca dla klienta.",
          relatedLinks: [
            createServiceLink("website", city),
            createServiceLink("design", city),
          ],
        },
        {
          question: "Czy taka strona może wspierać lokalne SEO?",
          answer:
            "Tak. Już na etapie planowania można przygotować strukturę i treści pod rozwój widoczności na lokalne frazy.",
          relatedLinks: [
            createServiceLink("seo", city),
            createServiceLink("creation", city),
          ],
        },
        {
          question: "Czy stronę można później rozbudować?",
          answer:
            "Tak. To bardzo częsty scenariusz - najpierw powstaje baza, a później dokładane są kolejne podstrony i sekcje.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz stronę internetową dla firmy bez przypadkowego układu i treści?",
      nextStepDescription:
        "Opisz swoją firmę, ofertę i cele. Wrócę z propozycją rozwiązania oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: `Realizacje stron internetowych dla firm ${c.fromGenitive}`,
    contact: {
      title: "Chcesz stronę internetową dla firmy?",
      subtitle:
        "Opisz firmę i zakres strony, a przygotuję propozycję rozwiązania",
      imageAlt: `Strona internetowa dla firmy ${c.fromGenitive}`,
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
      description: `Pomagam lokalnym firmom zwiększać widoczność w Google. Pozycjonowanie stron internetowych ${c.inLocative} z naciskiem na lokalne frazy i zapytania od klientów.`,
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
        `Jeśli interesuje Cię pozycjonowanie strony internetowej ${c.inLocative}, zacznijmy od analizy tego, co już masz i gdzie najszybciej można poprawić wyniki.`,
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
        "Skupienie na frazach lokalnych i intencjach zakupowych",
        "Poprawa układu treści, nagłówków i sekcji wspierających SEO",
        "Połączenie działań contentowych z doświadczeniem użytkownika",
        "Jasne rekomendacje zamiast chaotycznych zmian bez planu",
        "Bezpośredni kontakt i konkretne priorytety wdrożeniowe",
      ],
      processTitle: "Jak wygląda pozycjonowanie strony",
      processSteps: [
        {
          title: "1. Analiza strony i fraz",
          description:
            "Sprawdzam obecną widoczność, strukturę treści i potencjał lokalnych zapytań.",
        },
        {
          title: "2. Plan zmian",
          description:
            "Układam priorytety: co poprawić najpierw w treści, strukturze i komunikacji sprzedażowej.",
        },
        {
          title: "3. Wdrożenie rekomendacji",
          description:
            "Wprowadzam lub rozpisuję zmiany, które wspierają widoczność i lepszą konwersję ruchu.",
        },
        {
          title: "4. Dalszy rozwój",
          description:
            "Ustalamy kolejne kroki, jeśli chcesz rozwijać stronę o nowe treści i lokalne landing pages.",
        },
      ],
      includedTitle: "Co otrzymujesz w ramach pozycjonowania",
      includedParagraphs: [
        "Zakres dopasowuję do tego, czy potrzebujesz szybkiego audytu, lokalnego SEO czy dalszego rozwoju treści.",
        "Celem jest lepsza widoczność strony na frazy lokalne i większa liczba wartościowych zapytań.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "analizę obecnej strony i lokalnych fraz",
        "rekomendacje dotyczące struktury nagłówków i sekcji",
        "propozycje treści wspierających SEO lokalne",
        "wskazanie najważniejszych priorytetów wdrożeniowych",
        "lepsze dopasowanie strony do intencji użytkownika",
        "przygotowanie planu dalszego rozwoju",
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
            "Zaczynam od sprawdzenia strony, treści, struktury i potencjału fraz. Dzięki temu wiadomo, które działania mają największy sens na start.",
        },
        {
          question: "Czy trzeba przebudować całą stronę?",
          answer:
            "Nie zawsze. Czasem wystarczą poprawki treści i struktury, a czasem lepszym rozwiązaniem jest rozbudowa kilku kluczowych sekcji lub podstron.",
        },
        {
          question: "Czy można połączyć SEO z nową stroną?",
          answer:
            "Tak. To często najlepsze rozwiązanie, bo można od początku zaplanować stronę pod frazy lokalne, strukturę i konwersję.",
          relatedLinks: [
            createServiceLink("website", city),
            createServiceLink("business", city),
            createServiceLink("design", city),
          ],
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
    portfolioHeading: `Realizacje stron wspierających SEO lokalne ${c.fromGenitive}`,
    contact: {
      title: "Chcesz poprawić widoczność strony w Google?",
      subtitle: "Opisz obecną stronę i cele, a przygotuję kierunek działań",
      imageAlt: `Pozycjonowanie strony internetowej ${c.inLocative}`,
    },
  });
}

export const HOME_LANDING_PAGE = createHomepageLandingPage();

export const SEO_LANDING_PAGES: LandingPageContent[] = ALL_CITIES.flatMap(
  (city) => [
    createWebsitePage(city),
    createWebsiteCreationPage(city),
    createWebDesignPage(city),
    createLandingPageServicePage(city),
    createBusinessWebsitePage(city),
    createStorePage(city),
    createSeoPage(city),
  ],
);

const LANDING_PAGE_BY_SLUG = new Map(
  SEO_LANDING_PAGES.map((page) => [page.slug as string, page]),
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
  const currentCitySlug = currentPage?.citySlug ?? DEFAULT_CITY_SLUG;

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
      href: isHomepage ? "#contact" : "/#contact",
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

  if (!page?.slug || !page.cityName) {
    return null;
  }

  return {
    href: `/${page.slug}`,
    label: `${SERVICE_LABELS[serviceKey]} ${page.cityName}`,
  };
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

export type LandingPageTargetRecord = {
  key: string;
  slug: string;
  title: string;
  audienceLabel: string;
  businessLabel: string;
  categoryLabel: string;
  primaryGoal: string;
  trustSignals: string[];
  featureHighlights: string[];
  offerCards: [
    {
      image: string;
      imageAlt: string;
      price: number;
      highlighted?: boolean;
    },
    {
      image: string;
      imageAlt: string;
      price: number;
      highlighted?: boolean;
    },
    {
      image: string;
      imageAlt: string;
      price: number;
      highlighted?: boolean;
    },
  ];
};

const TARGET_LANDING_PAGE_RECORDS: LandingPageTargetRecord[] = [
  {
    key: "lawyer",
    slug: "prawnika",
    title: "Prawnik",
    audienceLabel: "prawnika",
    businessLabel: "kancelarii prawnej",
    categoryLabel: "usług prawnych",
    primaryGoal: "pozyskiwanie wartościowych zapytań od osób szukających pomocy prawnej",
    trustSignals: [
      "czytelny zakres specjalizacji i obszarów obsługi",
      "sekcja z doświadczeniem, publikacjami lub case studies",
      "prosty kontakt i szybkie umówienie konsultacji",
    ],
    featureHighlights: [
      "sekcję usług i specjalizacji kancelarii",
      "moduł opinii, referencji lub publikacji eksperckich",
      "treści pod lokalne frazy i pytania klientów",
    ],
    offerCards: [
      {
        image: "/images/projects/kancelariadeluga/hero.webp",
        imageAlt: "Strona internetowa kancelarii prawnej z czytelną ofertą usług",
        price: 1200,
        highlighted: true,
      },
      {
        image: "/images/projects/glazurnikgrudziadz/wspolpraca.png",
        imageAlt: "Sekcja zaufania z etapami współpracy i argumentami dla klienta",
        price: 1500,
      },
      {
        image: "/images/projects/dziendiety/faq.png",
        imageAlt: "Sekcja SEO lokalnego i FAQ wspierająca widoczność usług w Google",
        price: 1800,
      },
    ],
  },
  {
    key: "dentist",
    slug: "stomatologa",
    title: "Stomatolog",
    audienceLabel: "stomatologa",
    businessLabel: "gabinetu stomatologicznego",
    categoryLabel: "usług stomatologicznych",
    primaryGoal: "zwiększenie liczby zapisów i zapytań o konkretne zabiegi",
    trustSignals: [
      "jasny podział na zabiegi, ceny orientacyjne i przebieg wizyty",
      "zdjęcia gabinetu, zespołu i efektów leczenia",
      "wygodny formularz lub szybki kontakt telefoniczny",
    ],
    featureHighlights: [
      "podstrony zabiegów i najczęściej wybieranych usług",
      "sekcję opinii oraz odpowiedzi na obawy pacjentów",
      "lokalne treści SEO pod usługi i miasto",
    ],
    offerCards: [
      {
        image: "/images/projects/dziendiety/test.png",
        imageAlt: "Strona usługowa dla specjalisty z prostym układem i widocznym CTA",
        price: 1100,
        highlighted: true,
      },
      {
        image: "/images/projects/dziendiety/howitworks.png",
        imageAlt: "Sekcja zaufania pokazująca proces współpracy i kluczowe informacje",
        price: 1600,
      },
      {
        image: "/images/projects/glazurnikgrudziadz/cennik.png",
        imageAlt: "Widok strony przygotowanej pod lokalne SEO i prezentację oferty",
        price: 1900,
      },
    ],
  },
  {
    key: "physiotherapist",
    slug: "fizjoterapeuty",
    title: "Fizjoterapeuta",
    audienceLabel: "fizjoterapeuty",
    businessLabel: "gabinetu fizjoterapii",
    categoryLabel: "usług fizjoterapeutycznych",
    primaryGoal: "pozyskiwanie nowych pacjentów z poleceń i wyszukiwarki",
    trustSignals: [
      "czytelny opis terapii, specjalizacji i przebiegu współpracy",
      "pokazanie efektów pracy oraz podejścia do pacjenta",
      "łatwe zapisanie się na pierwszą konsultację",
    ],
    featureHighlights: [
      "sekcję terapii, problemów i wskazań do wizyty",
      "blok z opiniami pacjentów i najczęstszymi pytaniami",
      "strukturę gotową do rozbudowy o kolejne lokalne frazy",
    ],
    offerCards: [
      {
        image: "/images/projects/glazurnikgrudziadz/hero.png",
        imageAlt: "Strona usługowa z klarowną prezentacją oferty i szybką ścieżką kontaktu",
        price: 1400,
        highlighted: true,
      },
      {
        image: "/images/projects/glazurnikgrudziadz/underHero.png",
        imageAlt: "Sekcja zaufania z dodatkowymi argumentami i opiniami klientów",
        price: 1700,
      },
      {
        image: "/images/projects/dziendiety/faq.png",
        imageAlt: "Strona rozwijana pod lokalne SEO i odpowiedzi na pytania użytkowników",
        price: 2100,
      },
    ],
  },
  {
    key: "beautician",
    slug: "kosmetologa",
    title: "Kosmetolog",
    audienceLabel: "kosmetologa",
    businessLabel: "salonu kosmetologicznego",
    categoryLabel: "zabiegów kosmetologicznych",
    primaryGoal: "budowanie zaufania i zwiększenie liczby zapytań o zabiegi premium",
    trustSignals: [
      "estetyczna prezentacja oferty i efektów zabiegów",
      "jasne opisanie procesu, przeciwwskazań i korzyści",
      "szybka ścieżka do kontaktu lub rezerwacji konsultacji",
    ],
    featureHighlights: [
      "podstrony zabiegów z opisem efektów i przebiegu",
      "sekcję before/after, opinii i odpowiedzi na pytania klientek",
      "lokalne SEO pod najważniejsze zabiegi i miasto",
    ],
    offerCards: [
      {
        image: "/images/projects/blackbellart/hero.png",
        imageAlt: "Estetyczna strona usługowa dla marki premium z mocnym pierwszym wrażeniem",
        price: 1800,
        highlighted: true,
      },
      {
        image: "/images/projects/blackbellart/products.png",
        imageAlt: "Sekcja zaufania i prezentacji oferty w eleganckim układzie",
        price: 2400,
      },
      {
        image: "/images/projects/stickerka/checkout.png",
        imageAlt: "Rozbudowany widok strony przygotowany pod lokalne SEO i kolejne sekcje",
        price: 3200,
      },
    ],
  },
];

// Local seed data used as a temporary CMS-like source.
// This getter can later be replaced with Firebase reads without changing
// the page generation logic in `landingPages.ts`.
export function getLandingPageTargetRecords(): LandingPageTargetRecord[] {
  return TARGET_LANDING_PAGE_RECORDS;
}

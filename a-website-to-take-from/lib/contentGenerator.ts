import {
  polishCities,
  PolishCase,
  getCityInCase,
  generateCityContent,
  CityDeclension,
  getCityDeclension,
} from "./polishCities";

// Content template types for different page variations
export interface ContentTemplate {
  titleVariations: string[];
  descriptionVariations: string[];
  headingVariations: string[];
  contentBlocks: string[];
}

// Generate content variations for a city using all grammatical cases
export function generateContentVariations(
  citySlug: string
): ContentTemplate | null {
  const cityContent = generateCityContent(citySlug);
  const declension = getCityDeclension(citySlug);

  if (!cityContent || !declension) {
    return null;
  }

  const nominative = getCityInCase(citySlug, PolishCase.NOMINATIVE);
  const genitive = getCityInCase(citySlug, PolishCase.GENITIVE);
  const dative = getCityInCase(citySlug, PolishCase.DATIVE);
  const accusative = getCityInCase(citySlug, PolishCase.ACCUSATIVE);
  const instrumental = getCityInCase(citySlug, PolishCase.INSTRUMENTAL);
  const locative = getCityInCase(citySlug, PolishCase.LOCATIVE);
  const vocative = getCityInCase(citySlug, PolishCase.VOCATIVE);

  return {
    titleVariations: [
      `Strona Internetowa ${nominative} - Twoje Cyfrowe Rozwiązanie`,
      `Profesjonalne Strony WWW w ${locative}`,
      `${nominative}: Nowoczesne Strony Internetowe`,
      `Tworzenie Stron ${cityContent.contexts.location}`,
      `Web Design ${genitive} - Quixy Studio`,
      `Najlepsze Strony Internetowe w ${locative}`,
      `${nominative} - Responsive Web Design`,
      `Sklepy Internetowe w ${locative}`,
    ],

    descriptionVariations: [
      `Profesjonalne ${cityContent.phrases.webDesignService.toLowerCase()}. Tworzymy nowoczesne, responsywne strony WWW ${
        cityContent.contexts.target
      }.`,
      `${cityContent.phrases.localBusiness} specjalizująca się w tworzeniu stron internetowych. ${cityContent.phrases.servingCity} od 2020 roku.`,
      `Kompleksowe usługi web designu w ${locative}. ${cityContent.phrases.forResidents} oferujemy konkurencyjne ceny i szybką realizację.`,
      `Potrzebujesz strony internetowej w ${locative}? ${cityContent.phrases.workingWith} tworzymy strony, które sprzedają.`,
      `${cityContent.phrases.citySpecialist} w dziedzinie stron internetowych. Sprawdź naszą ofertę dla firm z ${genitive}.`,
      `Agencja web design obsługująca ${accusative}. Tworzymy strony wizytówkowe, sklepy internetowe i aplikacje webowe.`,
    ],

    headingVariations: [
      `Dlaczego ${nominative} Wybiera Nas?`,
      `Nasze Usługi w ${locative}`,
      `${cityContent.phrases.forResidents}`,
      `${cityContent.phrases.aboutCity}`,
      `Realizacje w ${locative}`,
      `Kontakt z ${instrumental}`,
      `Opinie Klientów z ${genitive}`,
      `${cityContent.phrases.welcomeCity}`,
      `Strony Internetowe ${genitive} na Miarę`,
      `Technologie Używane w ${locative}`,
    ],

    contentBlocks: [
      `<h3>Lokalna Obsługa w ${locative}</h3>
       <p>Jesteśmy ${cityContent.phrases.localBusiness}, która rozumie specyfikę lokalnego rynku. ${cityContent.phrases.workingWith} zapewniamy personalne podejście do każdego projektu.</p>`,

      `<h3>${cityContent.phrases.forResidents}</h3>
       <p>Oferujemy kompleksowe usługi tworzenia stron internetowych. ${cityContent.phrases.servingCity} z pasją i zaangażowaniem, dostarczając rozwiązania najwyższej jakości.</p>`,

      `<h3>Realizacje w ${locative}</h3>
       <p>Nasze portfolio obejmuje dziesiątki udanych projektów realizowanych dla firm z ${genitive}. Od prostych stron wizytówkowych po zaawansowane platformy e-commerce.</p>`,

      `<h3>Dlaczego Warto Wybrać Nas w ${locative}?</h3>
       <ul>
         <li><strong>Lokalne wsparcie</strong> - ${cityContent.phrases.forResidents} zapewniamy bezpośredni kontakt</li>
         <li><strong>Znajomość rynku</strong> - Rozumiemy specyfikę biznesu w ${locative}</li>
         <li><strong>Szybka realizacja</strong> - Krótkie terminy dostaw w ${locative}</li>
         <li><strong>Konkurencyjne ceny</strong> - Atrakcyjne oferty dla firm z ${genitive}</li>
       </ul>`,

      `<h3>Proces Współpracy</h3>
       <ol>
         <li><strong>Konsultacja</strong> - Poznajemy Twoje potrzeby i cele biznesowe w ${locative}</li>
         <li><strong>Projektowanie</strong> - Tworzymy unikalny design dla Twojej firmy z ${genitive}</li>
         <li><strong>Realizacja</strong> - Profesjonalnie kodujemy Twoją stronę</li>
         <li><strong>Wdrożenie</strong> - Publikujemy stronę i szkolimy zespół w ${locative}</li>
         <li><strong>Wsparcie</strong> - Zapewniamy ciągłe wsparcie techniczne dla klientów z ${genitive}</li>
       </ol>`,

      `<blockquote>
         <p>"${cityContent.phrases.welcomeCity} Dzięki współpracy z Quixy Studio nasza firma z ${genitive} zyskała profesjonalną obecność online. Polecamy wszystkim przedsiębiorcom w ${locative}!"</p>
         <footer>— Zadowolony klient z ${genitive}</footer>
       </blockquote>`,
    ],
  };
}

// Generate multiple page variations for A/B testing or different landing pages
export function generatePageVariations(citySlug: string, count: number = 3) {
  const variations = generateContentVariations(citySlug);
  if (!variations) return [];

  const pages = [];
  for (let i = 0; i < count; i++) {
    const titleIndex = i % variations.titleVariations.length;
    const descIndex = i % variations.descriptionVariations.length;
    const contentIndex = i % variations.contentBlocks.length;

    pages.push({
      id: `variation-${i + 1}`,
      title: variations.titleVariations[titleIndex],
      description: variations.descriptionVariations[descIndex],
      content: variations.contentBlocks[contentIndex],
      headings: variations.headingVariations.slice(i * 2, i * 2 + 2),
    });
  }

  return pages;
}

// Helper to generate bulk content for all cities
export function generateBulkContent(): Record<string, ContentTemplate> {
  const bulkContent: Record<string, ContentTemplate> = {};

  polishCities.forEach((citySlug) => {
    const variations = generateContentVariations(citySlug);
    if (variations) {
      bulkContent[citySlug] = variations;
    }
  });

  return bulkContent;
}

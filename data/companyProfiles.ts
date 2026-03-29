import citiesData from "@/data/cities.json";
import {
  getLandingPageBySlug,
  type LandingPageServiceKey,
} from "@/data/landingPages";

type CompanyCityCases = {
  mianownik: string;
  dopelniacz: string;
  celownik: string;
  biernik: string;
  narzednik: string;
  miejscownik: string;
  wolacz: string;
};

type CompanyCity = {
  slug: string;
  name: string;
  cases: CompanyCityCases;
};

export type CompanyProfile = {
  slug: string;
  name: string;
  title?: string;
  headline: string;
  shortDescription: string;
  citySlug: string;
  cityName: string;
  services: LandingPageServiceKey[];
  tags: string[];
  website?: string;
  email?: string;
  phone?: string;
  photoURL?: string;
  featured?: boolean;
};

export const COMPANY_SERVICE_LABELS: Record<LandingPageServiceKey, string> = {
  website: "Strony internetowe",
  design: "Projektowanie stron www",
  landing: "Landing page",
  store: "Sklepy internetowe",
  sale: "Strony internetowe na sprzedaż",
  seo: "Pozycjonowanie stron internetowych",
};

const GRUDZIADZ_CITY: CompanyCity = {
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

const ALL_CITIES: CompanyCity[] = [
  GRUDZIADZ_CITY,
  ...(citiesData as CompanyCity[]),
];

export const COMPANY_PROFILES: CompanyProfile[] = [
  {
    slug: "pawel-wessel",
    name: "Paweł Wessel",
    title: "Strony internetowe, landing page i SEO lokalne",
    headline:
      "Tworzę strony internetowe, landing page i lokalne struktury SEO dla firm.",
    shortDescription:
      "Pomagam uporządkować ofertę, zaprojektować komunikację i wdrożyć stronę, która prowadzi użytkownika do kontaktu. Współpracę można zacząć od jednego landing page albo od większej struktury pod usługi i miasta.",
    citySlug: "grudziadz",
    cityName: "Grudziądz",
    services: ["website", "design", "landing", "store", "sale", "seo"],
    tags: [
      "strony internetowe",
      "landing page",
      "projektowanie stron",
      "lokalne SEO",
    ],
    website: "https://wesselpawel.com",
    email: "hello@wesselpawel.com",
    phone: "+48 721 417 154",
    featured: true,
  },
];

function getCityLocativeName(citySlug: string): string | null {
  return (
    ALL_CITIES.find((city) => city.slug === citySlug)?.cases.miejscownik ?? null
  );
}

function getProfileScore(
  profile: CompanyProfile,
  currentSlug?: string,
): number {
  const currentPage = currentSlug ? getLandingPageBySlug(currentSlug) : null;
  let score = profile.featured ? 1 : 0;

  if (currentPage?.citySlug && profile.citySlug === currentPage.citySlug) {
    score += 4;
  }

  if (
    currentPage?.serviceKey &&
    profile.services.includes(currentPage.serviceKey)
  ) {
    score += 2;
  }

  return score;
}

export function getCompanyPromoHeading(currentSlug?: string): string {
  const currentPage = currentSlug ? getLandingPageBySlug(currentSlug) : null;

  if (!currentPage?.citySlug) {
    return "Współpracuj ze mną";
  }

  const locativeCityName = getCityLocativeName(currentPage.citySlug);

  if (!locativeCityName) {
    return "Współpracuj ze mną";
  }

  return `Współpracuj ze mną w ${locativeCityName}`;
}

export function getFeaturedCompanyProfiles(
  currentSlug?: string,
  limit = 3,
): CompanyProfile[] {
  return [...COMPANY_PROFILES]
    .sort((left, right) => {
      const scoreDifference =
        getProfileScore(right, currentSlug) - getProfileScore(left, currentSlug);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return left.name.localeCompare(right.name, "pl");
    })
    .slice(0, limit);
}

export function getCompanyProfileBySlug(slug: string): CompanyProfile | null {
  return COMPANY_PROFILES.find((profile) => profile.slug === slug) ?? null;
}

export function getCompanyProfileSlugs(): string[] {
  return COMPANY_PROFILES.map((profile) => profile.slug);
}

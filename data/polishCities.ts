import rawLocalities from "polskie-miejscowosci";
import legacyCityCases from "@/data/cities.json";

type PolishLocalityRecord = {
  Commune: string;
  District: string;
  Id: string;
  Latitude: number;
  Longitude: number;
  Name: string;
  Province: string;
  Type: "village" | "city";
};

export type LandingPageCityCases = {
  mianownik: string;
  dopelniacz: string;
  celownik: string;
  biernik: string;
  narzednik: string;
  miejscownik: string;
  wolacz: string;
};

export type LandingPageCity = {
  slug: string;
  name: string;
  cases: LandingPageCityCases;
  context: {
    inLocative: string;
    fromGenitive: string;
    locativeUpper: string;
  };
  province: string;
  district: string;
  commune: string;
  latitude: number;
  longitude: number;
  sourceId: string;
};

type LegacyCityCaseOverride = {
  slug: string;
  name: string;
  cases: LandingPageCityCases;
};

const LEGACY_CITY_CASES_BY_NAME = new Map<string, LegacyCityCaseOverride>(
  (legacyCityCases as LegacyCityCaseOverride[]).map((city) => [city.name, city]),
);

const POLISH_CITY_RECORDS = (rawLocalities as PolishLocalityRecord[]).filter(
  (locality) => locality.Type === "city",
);

const DUPLICATE_CITY_NAME_COUNTS = POLISH_CITY_RECORDS.reduce(
  (counts, locality) => {
    counts.set(locality.Name, (counts.get(locality.Name) ?? 0) + 1);
    return counts;
  },
  new Map<string, number>(),
);

function toSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createFallbackCases(name: string): LandingPageCityCases {
  return {
    mianownik: name,
    dopelniacz: name,
    celownik: name,
    biernik: name,
    narzednik: name,
    miejscownik: name,
    wolacz: name,
  };
}

function createCityContext(
  name: string,
  cases: LandingPageCityCases,
  hasTrustedCases: boolean,
) {
  const inLocative = hasTrustedCases ? `w ${cases.miejscownik}` : `w mieście ${name}`;
  const fromGenitive = hasTrustedCases ? `z ${cases.dopelniacz}` : `z miasta ${name}`;

  return {
    inLocative,
    fromGenitive,
    locativeUpper: inLocative.toUpperCase(),
  };
}

function createCitySlug(locality: PolishLocalityRecord, duplicateCount: number): string {
  const legacyOverride = LEGACY_CITY_CASES_BY_NAME.get(locality.Name);

  if (legacyOverride?.slug) {
    return legacyOverride.slug;
  }

  const baseSlug = toSlug(locality.Name);

  if (duplicateCount <= 1) {
    return baseSlug;
  }

  return `${baseSlug}-${toSlug(locality.Province)}`;
}

function createLandingPageCity(locality: PolishLocalityRecord): LandingPageCity {
  const legacyOverride = LEGACY_CITY_CASES_BY_NAME.get(locality.Name);
  const cases = legacyOverride?.cases ?? createFallbackCases(locality.Name);
  const hasTrustedCases = Boolean(legacyOverride);

  return {
    slug: createCitySlug(locality, DUPLICATE_CITY_NAME_COUNTS.get(locality.Name) ?? 1),
    name: locality.Name,
    cases,
    context: createCityContext(locality.Name, cases, hasTrustedCases),
    province: locality.Province,
    district: locality.District,
    commune: locality.Commune,
    latitude: locality.Latitude,
    longitude: locality.Longitude,
    sourceId: locality.Id,
  };
}

export const ALL_POLISH_CITIES: LandingPageCity[] = POLISH_CITY_RECORDS.map(
  createLandingPageCity,
).sort((left, right) => left.name.localeCompare(right.name, "pl"));

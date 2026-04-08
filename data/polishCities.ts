import citiesFromJson from "@/data/cities.json";

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
  hasTrustedCases: boolean;
  context: {
    inLocative: string;
    fromGenitive: string;
    locativeUpper: string;
  };
  province: string;
  district: string;
  commune: string;
  /** Współrzędne centrum (stopnie). `null` gdy brak wpisu w `CITY_GEO_BY_SLUG`. */
  latitude: number | null;
  longitude: number | null;
  sourceId: string;
};

type CityJsonRecord = {
  slug: string;
  name: string;
  cases: LandingPageCityCases;
  sourceId?: string;
};

/** Dane administracyjne i geodezyjne — słownik uzupełniający `cities.json` (odmiana tylko w JSON). */
const CITY_GEO_BY_SLUG: Record<
  string,
  { latitude: number; longitude: number; province: string; district?: string; commune?: string }
> = {
  warszawa: { latitude: 52.2297, longitude: 21.0122, province: "mazowieckie" },
  krakow: { latitude: 50.0647, longitude: 19.945, province: "małopolskie" },
  wroclaw: { latitude: 51.1079, longitude: 17.0385, province: "dolnośląskie" },
  poznan: { latitude: 52.4064, longitude: 16.9252, province: "wielkopolskie" },
  gdansk: { latitude: 54.352, longitude: 18.6466, province: "pomorskie" },
  lodz: { latitude: 51.7592, longitude: 19.456, province: "łódzkie" },
  szczecin: { latitude: 53.4285, longitude: 14.5528, province: "zachodniopomorskie" },
  bydgoszcz: { latitude: 53.1235, longitude: 18.0079, province: "kujawsko-pomorskie" },
  lublin: { latitude: 51.2465, longitude: 22.5684, province: "lubelskie" },
  katowice: { latitude: 50.2649, longitude: 19.0238, province: "śląskie" },
  gdynia: { latitude: 54.5189, longitude: 18.5305, province: "pomorskie" },
  grudziadz: { latitude: 53.4837, longitude: 18.7536, province: "kujawsko-pomorskie" },
  czestochowa: { latitude: 50.7965, longitude: 19.1241, province: "śląskie" },
  radom: { latitude: 51.4025, longitude: 21.1471, province: "mazowieckie" },
  torun: { latitude: 53.0138, longitude: 18.5981, province: "kujawsko-pomorskie" },
  sosnowiec: { latitude: 50.2862, longitude: 19.1042, province: "śląskie" },
  kielce: { latitude: 50.8661, longitude: 20.6286, province: "świętokrzyskie" },
  gliwice: { latitude: 50.2945, longitude: 18.6714, province: "śląskie" },
  zabrze: { latitude: 50.3249, longitude: 18.7857, province: "śląskie" },
  olsztyn: { latitude: 53.7784, longitude: 20.4801, province: "warmińsko-mazurskie" },
  rzeszow: { latitude: 50.0412, longitude: 21.9991, province: "podkarpackie" },
  rybnik: { latitude: 50.1022, longitude: 18.5463, province: "śląskie" },
  tychy: { latitude: 50.1233, longitude: 18.9876, province: "śląskie" },
  opole: { latitude: 50.6751, longitude: 17.9213, province: "opolskie" },
  elblag: { latitude: 54.1561, longitude: 19.4045, province: "warmińsko-mazurskie" },
  plock: { latitude: 52.5463, longitude: 19.7065, province: "mazowieckie" },
  walbrzych: { latitude: 50.7714, longitude: 16.2843, province: "dolnośląskie" },
  wloclawek: { latitude: 52.6482, longitude: 19.0678, province: "kujawsko-pomorskie" },
  tarnow: { latitude: 50.0125, longitude: 20.9881, province: "małopolskie" },
  chorzow: { latitude: 50.3055, longitude: 18.9482, province: "śląskie" },
  koszalin: { latitude: 54.1943, longitude: 16.1715, province: "zachodniopomorskie" },
  kalisz: { latitude: 51.7611, longitude: 18.0911, province: "wielkopolskie" },
  legnica: { latitude: 51.207, longitude: 16.1553, province: "dolnośląskie" },
  slupsk: { latitude: 54.4641, longitude: 17.0286, province: "pomorskie" },
  jaworzno: { latitude: 50.2053, longitude: 19.275, province: "śląskie" },
  "nowy-sacz": { latitude: 49.6175, longitude: 20.7151, province: "małopolskie" },
  siedlce: { latitude: 52.1676, longitude: 22.2901, province: "mazowieckie" },
  konin: { latitude: 52.2231, longitude: 18.2511, province: "wielkopolskie" },
  inowroclaw: { latitude: 52.7988, longitude: 18.2639, province: "kujawsko-pomorskie" },
  pila: { latitude: 53.148, longitude: 16.7376, province: "wielkopolskie" },
  ostroleka: { latitude: 53.0844, longitude: 21.5711, province: "mazowieckie" },
};

function createCityContext(cases: LandingPageCityCases) {
  const inLocative = `w ${cases.miejscownik}`;
  const fromGenitive = `z ${cases.dopelniacz}`;

  return {
    inLocative,
    fromGenitive,
    locativeUpper: inLocative.toUpperCase(),
  };
}

function createLandingPageCity(record: CityJsonRecord): LandingPageCity {
  const cases = record.cases;
  const geo = CITY_GEO_BY_SLUG[record.slug];

  return {
    slug: record.slug,
    name: record.name,
    cases,
    hasTrustedCases: true,
    context: createCityContext(cases),
    province: geo?.province ?? "",
    district: geo?.district ?? "",
    commune: geo?.commune ?? "",
    latitude: geo ? geo.latitude : null,
    longitude: geo ? geo.longitude : null,
    sourceId: record.sourceId ?? record.slug,
  };
}

const rawCities = citiesFromJson as CityJsonRecord[];

export const ALL_POLISH_CITIES: LandingPageCity[] = rawCities
  .map(createLandingPageCity)
  .sort((left, right) => left.name.localeCompare(right.name, "pl"));
